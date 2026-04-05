import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          role: 'user' | 'mentor' | 'mentee' | 'campus_ambassador' | 'team_member' | 'admin' | 'ceo'
          domain_access: string[]
          position: string | null
          bio: string | null
          permissions: string[]
          approved: boolean
          created_at: string
        }
      }
      messages: {
        Row: {
          id: string
          from_id: string
          to_id: string
          content: string
          read: boolean
          created_at: string
        }
      }
      courses: { Row: any }
      ebooks: { Row: any }
      tasks: { Row: any }
      team_members: { Row: any }
      events: { Row: any }
      media_posts: { Row: any }
      mentorship_groups: { Row: any }
      ambassador_announcements: { Row: any }
    }
  }
}

// ✅ Add this for TS to know Vite env variables
declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_ANON_KEY: string
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}