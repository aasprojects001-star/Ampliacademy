import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface Profile {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  role: string
  permissions: string[]
  approved: boolean
  position: string | null
  bio: string | null
}

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string, intent?: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  hasPermission: (perm: string) => boolean
  isCEO: () => boolean
  isAdmin: () => boolean
  isMentor: () => boolean
  isAmbassador: () => boolean
  isTeamMember: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function intentToRole(intent: string): string {
  if (intent === 'ambassador') return 'campus_ambassador'
  if (intent === 'mentor')     return 'mentor'
  return 'user'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (data) setProfile(data)
    } catch { /* profile may not exist yet */ }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  // KEY FIX: Do NOT insert into profiles manually.
  // The DB trigger handle_new_user() handles it automatically.
  // We only update role/name after, if needed.
  const signUp = async (email: string, password: string, fullName: string, intent = 'academy') => {
    const role = intentToRole(intent)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    })

    // Trigger fires and creates profile with role='user'.
    // If they registered as ambassador/mentor, update after trigger settles.
    if (!error && data.user && role !== 'user') {
      setTimeout(async () => {
        await supabase
          .from('profiles')
          .update({ role, full_name: fullName })
          .eq('id', data.user!.id)
      }, 2000)
    }

    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id)
  }

  const hasPermission = (perm: string) => {
    if (!profile) return false
    if (profile.role === 'ceo' || profile.role === 'admin') return true
    return profile.permissions?.includes(perm) || false
  }

  const isCEO        = () => profile?.role === 'ceo'
  const isAdmin      = () => ['ceo', 'admin'].includes(profile?.role || '')
  const isMentor     = () => ['ceo', 'admin', 'mentor'].includes(profile?.role || '')
  const isAmbassador = () => profile?.role === 'campus_ambassador'
  const isTeamMember = () => ['ceo', 'admin', 'team_member'].includes(profile?.role || '')

  return (
    <AuthContext.Provider value={{
      user, session, profile, loading,
      signIn, signUp, signOut, refreshProfile,
      hasPermission, isCEO, isAdmin, isMentor, isAmbassador, isTeamMember,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
