# AmpliYouth / YSDI Initiative Platform

A full-stack React + Supabase platform serving two domain names with shared and exclusive features.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS (glassmorphism dark UI)
- **Auth & DB**: Supabase
- **Routing**: React Router v7
- **Hosting**: Netlify
- **Domains**: ampliyouth.org · ysdiinitiative.org

---

## Quick Start (GitHub Codespaces / Local)

```bash
# 1. Navigate into the project
cd ampliyouth-platform

# 2. Install dependencies
npm install

# 3. Copy env file and fill in your Supabase credentials
cp .env.example .env

# 4. Run dev server
npm run dev
```

---

## Environment Variables

Create `.env` in project root:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to **SQL Editor** → run everything in `SUPABASE_SCHEMA.sql`
3. In **Authentication > Settings**: Enable email confirmations (or disable for dev)
4. Copy your **Project URL** and **anon key** into `.env`
5. After your first signup, run this SQL to make yourself CEO:
   ```sql
   UPDATE profiles
   SET role = 'ceo', approved = TRUE, full_name = 'Ayotunde Aboderin'
   WHERE email = 'your@email.com';
   ```

---

## Domain Logic

The platform auto-detects which domain it's on:
- `ampliyouth.org` → Shows AmpliYouth branding + Academy + Ambassador portal
- `ysdiinitiative.org` → Shows YSDI branding + Team page + no Academy section

**During development**, append `?domain=ysdi` to the URL to preview YSDI mode.

---

## Netlify Deployment

1. Push to GitHub
2. Connect repo in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add env variables in Netlify dashboard
6. In Namecheap: point both domains to your Netlify site
7. Add both custom domains in Netlify → Site settings → Domain management

---

## Feature Overview

### Public (both domains)
- Home, About, Programs, Events, Media, Resources, Get Involved, Contact, Mentorship

### ampliyouth.org exclusive
- Academy (Courses, Ebooks, Mentors, Network)
- Campus Ambassador Portal (with chat, announcements, resources)

### ysdiinitiative.org exclusive
- Team Members page

### Admin Dashboard (via ysdi, controls both)
- CEO login → full control
- Team member creation with custom permissions
- Site content CMS (About, Events, Media, Programs, Resources)
- Academy oversight (approve mentees, assign mentors, manage groups)
- Ambassador management (approve/reject, send announcements)
- Task management
- Real-time team chat

---

## User Roles

| Role | Access |
|------|--------|
| `user` | Public site only |
| `mentee` | Academy courses, ebooks, mentors |
| `mentor` | + Add courses & materials |
| `campus_ambassador` | + Ambassador portal, chat |
| `team_member` | + Admin dashboard (limited by permissions) |
| `admin` | + Full admin except CEO actions |
| `ceo` | Full platform control |
