-- ============================================================
-- PATCH SQL — Run this ONCE in your Supabase SQL Editor
-- ============================================================

-- 1. Create a public storage bucket for site images (programs, media posts)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-images',
  'site-images',
  true,
  5242880,   -- 5 MB max per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow anyone to read (GET) images
CREATE POLICY "Public read site-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-images');

-- 3. Allow authenticated admins/team/ceo to upload images
CREATE POLICY "Admin upload site-images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'site-images'
    AND auth.role() = 'authenticated'
  );

-- 4. Allow authenticated users to delete their own uploads
CREATE POLICY "Admin delete site-images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'site-images'
    AND auth.uid() = owner
  );

-- 5. Add image_url column to programs table (if not already there)
ALTER TABLE programs
  ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 6. Add image_url column to media_posts table (if not already there)
ALTER TABLE media_posts
  ADD COLUMN IF NOT EXISTS image_url TEXT;

-- ============================================================
-- That's it. Your site-images bucket is ready.
-- ============================================================
