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
      courses: {
        Row: {
          id: string
          title: string
          description: string
          mentor_id: string
          category: string
          thumbnail_url: string | null
          created_at: string
        }
      }
      ebooks: {
        Row: {
          id: string
          title: string
          author: string
          description: string
          file_url: string
          cover_url: string | null
          created_at: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string
          assigned_to: string
          assigned_by: string
          status: 'pending' | 'in_progress' | 'completed'
          due_date: string | null
          created_at: string
        }
      }
      team_members: {
        Row: {
          id: string
          user_id: string
          position: string
          permissions: string[]
          department: string | null
          created_at: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          location: string
          image_url: string | null
          created_by: string
          created_at: string
        }
      }
      media_posts: {
        Row: {
          id: string
          title: string
          content: string
          media_url: string | null
          type: 'article' | 'video' | 'gallery' | 'flyer'
          created_by: string
          created_at: string
        }
      }
      mentorship_groups: {
        Row: {
          id: string
          name: string
          mentor_id: string
          description: string
          created_at: string
        }
      }
      ambassador_announcements: {
        Row: {
          id: string
          title: string
          content: string
          created_by: string
          created_at: string
        }
      }
    }
  }
}
