# Ampliacademy Patch — How to Apply

## What this patch fixes

| # | Bug | File(s) changed |
|---|-----|-----------------|
| 1 | **YSDI content not saving/showing** — About page queried without domain filter and looked for keys like `mission` but DB has `ysdi_mission` | `src/pages/About.tsx` |
| 2 | **Session freeze / avatar resets to "U"** — ProtectedRoute redirected to /login while auth was still loading; profile cleared during token refresh | `src/context/AuthContext.tsx`, `src/components/ProtectedRoute.tsx` |
| 3 | **Settings button dead** — `/profile` route was missing from App.tsx | `src/App.tsx` |
| 4 | **Programs page hardcoded** — not reading from DB | `src/pages/Programs.tsx` |
| 5 | **Rich text editor not wired up** — AdminContent used plain `<textarea>` instead of the `RichEditor` component | `src/pages/admin/AdminContent.tsx` |
| 6 | **Image upload not working** — no Supabase Storage integration | `src/pages/admin/AdminContent.tsx` + SQL |

---

## Step 1 — Run the SQL (one time only)

1. Open your **Supabase dashboard → SQL Editor**
2. Paste the contents of **`PATCH_RUN_IN_SUPABASE.sql`** and hit Run
3. This creates the `site-images` storage bucket and adds `image_url` columns to `programs` and `media_posts`

---

## Step 2 — Copy the source files

Replace these files in your project with the versions from this patch folder:

```
patch/src/App.tsx                          → src/App.tsx
patch/src/context/AuthContext.tsx          → src/context/AuthContext.tsx
patch/src/components/ProtectedRoute.tsx    → src/components/ProtectedRoute.tsx
patch/src/pages/About.tsx                 → src/pages/About.tsx
patch/src/pages/Programs.tsx              → src/pages/Programs.tsx
patch/src/pages/admin/AdminContent.tsx    → src/pages/admin/AdminContent.tsx
```

Your existing files (`RichEditor.tsx`, `supabase.ts`, `domain.ts`, etc.) are **unchanged** — no need to touch them.

---

## Step 3 — Rebuild & deploy

```bash
npm run build
# then deploy dist/ to Netlify / your host as usual
```

---

## Notes

- **Programs page**: If you have programs in the DB (created via Admin → Content → Programs), they will now show on the public Programs page. If the DB is empty, the original hardcoded programs are shown as fallback.
- **About page**: YSDI content (`ysdi_mission`, `ysdi_vision`, etc.) and AmpliYouth content (`ampliyouth_mission`, etc.) are now completely separated — editing one domain won't affect the other.
- **Image uploads**: Go to Admin → Content → Media or Programs, click "Add", and you'll see a drag-and-drop image uploader. Images are stored in your Supabase `site-images` bucket.
- **Rich editor**: All text areas in AdminContent now use the full RichEditor with bold, italic, underline, alignment, and list support. The formatted HTML is saved to Supabase and rendered correctly on the public pages.
