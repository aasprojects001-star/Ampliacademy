# Patch 2 — How to Apply

## What this patch fixes

| # | Bug | File |
|---|-----|------|
| 1 | **Video upload ignored** — type selector switched to "video" but uploader still accepted images only; `media_url` was saved as `image_url` | `AdminContent.tsx` |
| 2 | **Gallery images blank** — public Media page read `post.image_url` but the DB column is `media_url` | `Media.tsx` |
| 3 | **Site freezes / U avatar on tab return** — added a `visibilitychange` listener that refreshes the Supabase session whenever the user returns to the tab | `AuthContext.tsx` |
| 4 | **Light mode text too faint / not bold enough** — added font-weight boost rules for all heading and body levels in light mode | `index.css` |
| 5 | **Admin dashboard fake data + emojis** — removed all hardcoded dummy users and emoji icons; stats and recent sign-ups now load live from the database | `AdminDashboard.tsx` |

---

## Step 1 — Run the SQL

Open **Supabase → SQL Editor**, paste `PATCH2_RUN_IN_SUPABASE.sql` and run it.
This adds the `media_url` column, migrates any old `image_url` data, and creates the `site-videos` bucket.

---

## Step 2 — Copy these 5 files

```bash
# from your project root, after unzipping the patch
cp patch2/src/context/AuthContext.tsx          src/context/AuthContext.tsx
cp patch2/src/pages/admin/AdminDashboard.tsx   src/pages/admin/AdminDashboard.tsx
cp patch2/src/pages/admin/AdminContent.tsx     src/pages/admin/AdminContent.tsx
cp patch2/src/pages/Media.tsx                  src/pages/Media.tsx
cp patch2/src/index.css                        src/index.css
```

---

## Step 3 — Rebuild

```bash
npm run build
```

---

## Notes

- **Videos**: when you set type = "Video" in Admin → Content → Media, the uploader now switches to a video picker (accepts mp4/webm/ogg). The uploaded URL is saved to `media_url`.
- **Gallery images**: the public Media page now correctly reads `media_url` so uploaded images will appear in the cards.
- **Session keepalive**: when you return to the browser tab after a break, the app silently checks whether the JWT is still valid and refreshes it if needed. You should no longer see the dashboard hang or the avatar revert to "U".
- **Light mode**: headings and body text are noticeably bolder and darker, making the site fully readable in light mode.
- **Admin dashboard**: all stat cards and the recent sign-ups table now pull live data from Supabase. No more dummy names or fake numbers.
