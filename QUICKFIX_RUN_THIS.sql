-- ================================================================
-- QUICKFIX SQL — Run this if your schema is already applied
-- and you just want to fix the signup + RLS issues
-- WITHOUT dropping everything
-- ================================================================

-- ── Step 1: Fix the trigger (ON CONFLICT DO NOTHING prevents 500) ──
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
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- ── Step 2: Drop ALL existing policies on profiles (prevents conflicts) ──
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies WHERE tablename = 'profiles'
  LOOP
    EXECUTE 'DROP POLICY IF EXISTS "' || pol.policyname || '" ON profiles';
  END LOOP;
END $$;

-- ── Step 3: Recreate clean non-recursive policies ──
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can read their own row
CREATE POLICY "profiles_own_select"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Anyone can update their own row
CREATE POLICY "profiles_own_update"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger / service role can insert
CREATE POLICY "profiles_insert_any"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- ── Step 4: Fix messages policy (allow broadcast messages where to_id IS NULL) ──
DO $$
DECLARE pol RECORD;
BEGIN
  FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'messages'
  LOOP EXECUTE 'DROP POLICY IF EXISTS "' || pol.policyname || '" ON messages'; END LOOP;
END $$;

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

-- ── Step 5: Fix ambassador_announcements (allow all authenticated users to read) ──
DO $$
DECLARE pol RECORD;
BEGIN
  FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'ambassador_announcements'
  LOOP EXECUTE 'DROP POLICY IF EXISTS "' || pol.policyname || '" ON ambassador_announcements'; END LOOP;
END $$;

ALTER TABLE ambassador_announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "announcements_select"
  ON ambassador_announcements FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "announcements_insert"
  ON ambassador_announcements FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- ── Step 6: Fix tasks policies ──
DO $$
DECLARE pol RECORD;
BEGIN
  FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'tasks'
  LOOP EXECUTE 'DROP POLICY IF EXISTS "' || pol.policyname || '" ON tasks'; END LOOP;
END $$;

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


-- ── Step 7: VERIFY — check all profiles ──
SELECT id, email, full_name, role, approved, created_at
FROM profiles
ORDER BY created_at DESC
LIMIT 20;


-- ================================================================
-- AFTER RUNNING THE ABOVE:
-- Register your account on the site, then run this to make CEO:
-- (Replace the email with yours)
-- ================================================================

-- UPDATE profiles
-- SET role = 'ceo', approved = TRUE, position = 'CEO & Founder'
-- WHERE email = 'YOUR_EMAIL@example.com';
