-- ===================================================
-- AMPLIYOUTH / YSDI INITIATIVE — SUPABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ===================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ───────────────────────────────────────────────────
-- 1. PROFILES (extends auth.users)
-- ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id             UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email          TEXT NOT NULL,
  full_name      TEXT NOT NULL DEFAULT '',
  avatar_url     TEXT,
  role           TEXT NOT NULL DEFAULT 'user'
                 CHECK (role IN ('user','mentor','mentee','campus_ambassador','team_member','admin','ceo')),
  permissions    TEXT[] DEFAULT '{}',
  domain_access  TEXT[] DEFAULT '{"ampliyouth"}',
  position       TEXT,
  bio            TEXT,
  approved       BOOLEAN DEFAULT FALSE,
  university     TEXT,
  country        TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','ceo'))
);
CREATE POLICY "Admins can update any profile" ON profiles FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','ceo'))
);

-- Trigger: auto-create profile on auth.users insert
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ───────────────────────────────────────────────────
-- 2. MESSAGES (1-to-1 and group chat)
-- ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  to_id      UUID REFERENCES profiles(id) ON DELETE CASCADE,   -- NULL = broadcast
  thread_id  TEXT,  -- group thread identifier
  content    TEXT NOT NULL,
  read       BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own messages" ON messages FOR SELECT USING (
  auth.uid() = from_id OR auth.uid() = to_id OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','ceo'))
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = from_id);

CREATE INDEX ON messages (from_id);
CREATE INDEX ON messages (to_id);
CREATE INDEX ON messages (thread_id);

-- ───────────────────────────────────────────────────
-- 3. COURSES
-- ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  description   TEXT,
  mentor_id     UUID REFERENCES profiles(id),
  category      TEXT,
  level         TEXT DEFAULT 'Beginner',
  duration_mins INTEGER,
  thumbnail_url TEXT,
  published     BOOLEAN DEFAULT FALSE,
  free          BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published courses" ON courses FOR SELECT USING (published = TRUE);
CREATE POLICY "Mentors can manage own courses" ON courses FOR ALL USING (
  auth.uid() = mentor_id OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','ceo'))
);

-- ───────────────────────────────────────────────────
-- 4. EBOOKS
-- ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ebooks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  author      TEXT,
  description TEXT,
  file_url    TEXT,
  cover_url   TEXT,
  category    TEXT,
  pages       INTEGER,
  published   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ebooks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view ebooks" ON ebooks FOR SELECT USING (auth.uid() IS NOT NULL AND published = TRUE);
CREATE POLICY "Admins can manage ebooks" ON ebooks FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','ceo','mentor'))
);

-- ───────────────────────────────────────────────────
-- 5. MENTORSHIP GROUPS
-- ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mentorship_groups (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  description TEXT,
  mentor_id   UUID REFERENCES profiles(id),
  max_mentees INTEGER DEFAULT 10,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mentorship_members (
  group_id   UUID REFERENCES mentorship_groups(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (group_id, user_id)
);

ALTER TABLE mentorship_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users view groups" ON mentorship_groups FOR SELECT USING (auth.uid() IS NOT NULL);

-- ───────────────────────────────────────────────────
-- 6. TASKS
-- ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tasks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES profiles(id),
  assigned_by UUID REFERENCES profiles(id),
  status      TEXT DEFAULT 'pending' CHECK (status IN ('pending','in_progress','completed')),
  priority    TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high')),
  due_date    DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own tasks" ON tasks FOR SELECT USING (
  auth.uid() = assigned_to OR auth.uid() = assigned_by OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','ceo'))
);
CREATE POLICY "Admins can create tasks" ON tasks FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','ceo'))
);
CREATE POLICY "Task owners can update status" ON tasks FOR UPDATE USING (
  auth.uid() = assigned_to OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','ceo'))
);

-- ───────────────────────────────────────────────────
-- 7. EVENTS
-- ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT,
  date        TIMESTAMPTZ,
  location    TEXT,
  virtual     BOOLEAN DEFAULT FALSE,
  image_url   TEXT,
  published   BOOLEAN DEFAULT TRUE,
  created_by  UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published events" ON events FOR SELECT USING (published = TRUE);
CREATE POLICY "Admins manage events" ON events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','ceo'))
  OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND 'edit_events' = ANY(permissions))
);

-- ───────────────────────────────────────────────────
-- 8. MEDIA POSTS
-- ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS media_posts (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title      TEXT NOT NULL,
  content    TEXT,
  media_url  TEXT,
  type       TEXT DEFAULT 'article' CHECK (type IN ('article','video','gallery','flyer')),
  published  BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE media_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published media" ON media_posts FOR SELECT USING (published = TRUE);
CREATE POLICY "Media managers can manage posts" ON media_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','ceo'))
  OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND 'edit_media' = ANY(permissions))
);

-- ───────────────────────────────────────────────────
-- 9. AMBASSADOR ANNOUNCEMENTS
-- ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ambassador_announcements (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title      TEXT NOT NULL,
  content    TEXT NOT NULL,
  urgent     BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ambassador_announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ambassadors can view announcements" ON ambassador_announcements FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('campus_ambassador','admin','ceo'))
);
CREATE POLICY "Admins create announcements" ON ambassador_announcements FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','ceo'))
);

-- ───────────────────────────────────────────────────
-- 10. CEO / ADMIN SEED (run once after first signup)
-- Replace 'YOUR_CEO_USER_UUID' with real UUID from auth.users
-- ───────────────────────────────────────────────────
-- UPDATE profiles
-- SET role = 'ceo', approved = TRUE, full_name = 'Ayotunde Aboderin', position = 'CEO & Founder'
-- WHERE id = 'YOUR_CEO_USER_UUID';

-- ───────────────────────────────────────────────────
-- 11. REALTIME (enable for live chat)
-- ───────────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE ambassador_announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
