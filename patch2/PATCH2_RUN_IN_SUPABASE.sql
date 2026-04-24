-- ============================================================
-- PATCH 2 SQL — Run this ONCE in your Supabase SQL Editor
-- ============================================================

-- 1. Add media_url column to media_posts (replaces the wrongly-named image_url)
--    We add it as a new column and copy any existing image_url data across.
ALTER TABLE media_posts ADD COLUMN IF NOT EXISTS media_url TEXT;

-- If you previously saved image_url data, migrate it:
UPDATE media_posts SET media_url = image_url WHERE media_url IS NULL AND image_url IS NOT NULL;

-- 2. Create a public storage bucket for site videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-videos',
  'site-videos',
  true,
  104857600,   -- 100 MB max per video file
  ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo']
)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage policies for site-videos
CREATE POLICY IF NOT EXISTS "Public read site-videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-videos');

CREATE POLICY IF NOT EXISTS "Auth upload site-videos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'site-videos' AND auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Auth delete site-videos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'site-videos' AND auth.uid() = owner);

-- 4. Ensure site-images bucket still exists (from patch 1)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-images',
  'site-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Done. Both buckets are ready.
-- ============================================================
