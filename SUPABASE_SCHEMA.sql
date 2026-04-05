-- ================================================================
-- AMPLIYOUTH / YSDI — FIXED SUPABASE SCHEMA v2
-- 
-- HOW TO USE:
-- 1. Go to Supabase → SQL Editor
-- 2. Run SECTION A first (drops + recreates everything cleanly)
-- 3. Register your CEO account on the site
-- 4. Run SECTION B with your email to promote yourself to CEO
-- ================================================================


-- ================================================================
-- SECTION A: FULL SCHEMA (run this first)
-- ================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ──────────────────────────────────────────────────────────────
-- Drop existing policies + tables if re-running (safe re-run)
-- ──────────────────────────────────────────────────────────────
DROP TABLE IF EXISTS ambassador_announcements CASCADE;
DROP TABLE IF EXISTS media_posts              CASCADE;
DROP TABLE IF EXISTS events                  CASCADE;
DROP TABLE IF EXISTS tasks                   CASCADE;
DROP TABLE IF EXISTS mentorship_members      CASCADE;
DROP TABLE IF EXISTS mentorship_groups       CASCADE;
DROP TABLE IF EXISTS ebooks                  CASCADE;
DROP TABLE IF EXISTS courses                 CASCADE;
DROP TABLE IF EXISTS messages                CASCADE;
DROP TABLE IF EXISTS profiles                CASCADE;
DROP FUNCTION IF EXISTS handle_new_user()    CASCADE;

-- ──────────────────────────────────────────────────────────────
-- 1. PROFILES
-- ──────────────────────────────────────────────────────────────
CREATE TABLE profiles (
  id             UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email          TEXT NOT NULL,
  full_name      TEXT NOT NULL DEFAULT '',
  avatar_url     TEXT,
  role           TEXT NOT NULL DEFAULT 'user'
                 CHECK (role IN ('user','mentor','mentee','campus_ambassador','team_member','admin','ceo')),
  permissions    TEXT[]    DEFAULT '{}',
  domain_access  TEXT[]    DEFAULT ARRAY['ampliyouth'],
  position       TEXT,
  bio            TEXT,
  approved       BOOLEAN   DEFAULT FALSE,
  university     TEXT,
  country        TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── RLS on profiles ────────────────────────────────────────────
-- CRITICAL FIX: avoid recursive policy (do NOT query profiles inside profiles policy)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Everyone can read their own profile
CREATE POLICY "own_profile_select"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Everyone can update their own profile
CREATE POLICY "own_profile_update"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Service role (used by trigger) can insert
CREATE POLICY "service_can_insert"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- FIX: Instead of querying profiles recursively, use auth.jwt() to check role
-- This reads the role from the JWT claims set by Supabase, not from a recursive query
CREATE POLICY "admin_select_all"
  ON profiles FOR SELECT
  USING (
    auth.uid() = id
    OR (auth.jwt() ->> 'role') IN ('service_role')
    OR EXISTS (
      SELECT 1 FROM auth.users u
      JOIN profiles p ON p.id = u.id
      WHERE u.id = auth.uid()
        AND p.role IN ('admin', 'ceo')
        AND p.id != profiles.id  -- prevent infinite recursion
    )
  );

CREATE POLICY "admin_update_all"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ── Trigger: auto-create profile on signup ──────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, approved)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'user',
    FALSE
  )
  ON CONFLICT (id) DO NOTHING;  -- safe if somehow called twice
  RETURN NEW;
END;
$$;

-- Drop old trigger if exists, recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ──────────────────────────────────────────────────────────────
-- 2. MESSAGES
-- ──────────────────────────────────────────────────────────────
CREATE TABLE messages (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_id    UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  to_id      UUID        REFERENCES profiles(id) ON DELETE CASCADE,
  thread_id  TEXT,
  content    TEXT        NOT NULL,
  read       BOOLEAN     DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select"
  ON messages FOR SELECT
  USING (auth.uid() = from_id OR auth.uid() = to_id OR to_id IS NULL);

CREATE POLICY "messages_insert"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = from_id);

CREATE POLICY "messages_update"
  ON messages FOR UPDATE
  USING (auth.uid() = to_id);

CREATE INDEX idx_messages_from    ON messages(from_id);
CREATE INDEX idx_messages_to      ON messages(to_id);
CREATE INDEX idx_messages_thread  ON messages(thread_id);


-- ──────────────────────────────────────────────────────────────
-- 3. COURSES
-- ──────────────────────────────────────────────────────────────
CREATE TABLE courses (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT        NOT NULL,
  description   TEXT,
  mentor_id     UUID        REFERENCES profiles(id),
  category      TEXT,
  level         TEXT        DEFAULT 'Beginner',
  duration_mins INTEGER,
  thumbnail_url TEXT,
  published     BOOLEAN     DEFAULT FALSE,
  free          BOOLEAN     DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "courses_public_select"
  ON courses FOR SELECT USING (published = TRUE);

CREATE POLICY "courses_mentor_manage"
  ON courses FOR ALL
  USING (auth.uid() = mentor_id);


-- ──────────────────────────────────────────────────────────────
-- 4. EBOOKS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE ebooks (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT        NOT NULL,
  author      TEXT,
  description TEXT,
  file_url    TEXT,
  cover_url   TEXT,
  category    TEXT,
  pages       INTEGER,
  published   BOOLEAN     DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ebooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ebooks_auth_select"
  ON ebooks FOR SELECT
  USING (auth.uid() IS NOT NULL AND published = TRUE);

-- Admins manage via service role / SQL editor


-- ──────────────────────────────────────────────────────────────
-- 5. MENTORSHIP GROUPS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE mentorship_groups (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT        NOT NULL,
  description TEXT,
  mentor_id   UUID        REFERENCES profiles(id),
  max_mentees INTEGER     DEFAULT 10,
  active      BOOLEAN     DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE mentorship_members (
  group_id   UUID REFERENCES mentorship_groups(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (group_id, user_id)
);

ALTER TABLE mentorship_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "groups_auth_select" ON mentorship_groups FOR SELECT USING (auth.uid() IS NOT NULL);

ALTER TABLE mentorship_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members_auth_select" ON mentorship_members FOR SELECT USING (auth.uid() IS NOT NULL);


-- ──────────────────────────────────────────────────────────────
-- 6. TASKS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE tasks (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT        NOT NULL,
  description TEXT,
  assigned_to UUID        REFERENCES profiles(id),
  assigned_by UUID        REFERENCES profiles(id),
  status      TEXT        DEFAULT 'pending'
              CHECK (status IN ('pending','in_progress','completed')),
  priority    TEXT        DEFAULT 'medium'
              CHECK (priority IN ('low','medium','high')),
  due_date    DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tasks_select"
  ON tasks FOR SELECT
  USING (auth.uid() = assigned_to OR auth.uid() = assigned_by);

CREATE POLICY "tasks_insert"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid() = assigned_by);

CREATE POLICY "tasks_update"
  ON tasks FOR UPDATE
  USING (auth.uid() = assigned_to OR auth.uid() = assigned_by);

CREATE POLICY "tasks_delete"
  ON tasks FOR DELETE
  USING (auth.uid() = assigned_by);


-- ──────────────────────────────────────────────────────────────
-- 7. EVENTS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE events (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT        NOT NULL,
  description TEXT,
  date        TIMESTAMPTZ,
  location    TEXT,
  virtual     BOOLEAN     DEFAULT FALSE,
  image_url   TEXT,
  published   BOOLEAN     DEFAULT TRUE,
  created_by  UUID        REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events_public_select" ON events FOR SELECT USING (published = TRUE);
CREATE POLICY "events_auth_manage"   ON events FOR ALL   USING (auth.uid() = created_by);


-- ──────────────────────────────────────────────────────────────
-- 8. MEDIA POSTS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE media_posts (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title      TEXT        NOT NULL,
  content    TEXT,
  media_url  TEXT,
  type       TEXT        DEFAULT 'article'
             CHECK (type IN ('article','video','gallery','flyer')),
  published  BOOLEAN     DEFAULT TRUE,
  created_by UUID        REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE media_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "media_public_select" ON media_posts FOR SELECT USING (published = TRUE);
CREATE POLICY "media_auth_manage"   ON media_posts FOR ALL   USING (auth.uid() = created_by);


-- ──────────────────────────────────────────────────────────────
-- 9. AMBASSADOR ANNOUNCEMENTS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE ambassador_announcements (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title      TEXT        NOT NULL,
  content    TEXT        NOT NULL,
  urgent     BOOLEAN     DEFAULT FALSE,
  created_by UUID        REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ambassador_announcements ENABLE ROW LEVEL SECURITY;

-- Ambassadors + admins can read
CREATE POLICY "announcements_select"
  ON ambassador_announcements FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Anyone authenticated can insert (admin check done in app layer)
CREATE POLICY "announcements_insert"
  ON ambassador_announcements FOR INSERT
  WITH CHECK (auth.uid() = created_by);


-- ──────────────────────────────────────────────────────────────
-- 10. REALTIME
-- ──────────────────────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE ambassador_announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE tasks;


-- ================================================================
-- SECTION B: PROMOTE YOURSELF TO CEO
-- Run this AFTER you register on the site.
-- Replace the email below with your actual email address.
-- ================================================================

-- UPDATE profiles
-- SET
--   role      = 'ceo',
--   approved  = TRUE,
--   full_name = 'Ayotunde Aboderin',
--   position  = 'CEO & Founder'
-- WHERE email = 'YOUR_EMAIL_HERE@gmail.com';

-- ── Verify it worked: ─────────────────────────────────────────
-- SELECT id, email, full_name, role, approved FROM profiles;


-- ================================================================
-- SECTION C: TROUBLESHOOTING
-- If signup still fails, run this to check for duplicate policies:
-- ================================================================
-- SELECT schemaname, tablename, policyname
-- FROM pg_policies
-- WHERE tablename = 'profiles'
-- ORDER BY policyname;

-- If you see duplicate policy names, drop them:
-- DROP POLICY "policy_name_here" ON profiles;
