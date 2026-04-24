import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface Profile {
  id: string; email: string; full_name: string; avatar_url: string | null
  role: string; permissions: string[]; approved: boolean; position: string | null; bio: string | null
}

interface AuthContextType {
  user: User | null; session: Session | null; profile: Profile | null; loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string, intent?: string) => Promise<{ error: any }>
  signOut: () => Promise<void>; refreshProfile: () => Promise<void>
  hasPermission: (perm: string) => boolean; isCEO: () => boolean; isAdmin: () => boolean
  isMentor: () => boolean; isAmbassador: () => boolean; isTeamMember: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function intentToRole(intent: string) {
  if (intent === 'ambassador') return 'campus_ambassador'
  if (intent === 'mentor') return 'mentor'
  return 'user'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const fetchingRef   = useRef(false)
  const currentUserId = useRef<string | null>(null)

  const fetchProfile = async (userId: string) => {
    if (fetchingRef.current) return
    fetchingRef.current = true
    try {
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
      // Only update if data arrived AND the user hasn't changed while we were fetching
      if (data && currentUserId.current === userId) setProfile(data)
    } catch {
      // Profile row may not exist yet for brand-new signups
    } finally {
      fetchingRef.current = false
    }
  }

  useEffect(() => {
    // ── 1. Initial session load ───────────────────────────────────────────
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      currentUserId.current = session?.user?.id ?? null
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false))
      } else {
        setLoading(false)
      }
    })

    // ── 2. Auth state listener ────────────────────────────────────────────
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      currentUserId.current = session?.user?.id ?? null

      if (session?.user) {
        // Do NOT clear profile here — clearing causes the "U" avatar flash on
        // every TOKEN_REFRESHED event. The existing profile is still valid.
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }

      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'INITIAL_SESSION') {
        setLoading(false)
      }
    })

    // ── 3. Visibility-based keepalive ─────────────────────────────────────
    // When the user returns to the tab after a long absence the browser may
    // have silently expired the Supabase JWT. We proactively refresh the
    // session whenever the tab becomes visible again so the dashboard never
    // hangs or shows a "U" avatar on return.
    const handleVisibilityChange = async () => {
      if (document.visibilityState !== 'visible') return
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        // Session still alive — just make sure profile is loaded
        if (!profile && !fetchingRef.current) {
          await fetchProfile(session.user.id)
        }
      } else {
        // Session truly expired — force a refresh attempt
        const { data: refreshed } = await supabase.auth.refreshSession()
        if (!refreshed.session) {
          // Genuine expiry — clear state (the onAuthStateChange will handle redirect)
          setProfile(null)
          setUser(null)
          setSession(null)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      subscription.unsubscribe()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signUp = async (email: string, password: string, fullName: string, intent = 'academy') => {
    const role = intentToRole(intent)
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })
    if (!error && data.user && role !== 'user') {
      setTimeout(async () => {
        await supabase.from('profiles').update({ role, full_name: fullName }).eq('id', data.user!.id)
      }, 2000)
    }
    return { error }
  }

  const signOut = async () => {
    currentUserId.current = null
    setProfile(null)
    setUser(null)
    setSession(null)
    await supabase.auth.signOut()
  }

  const refreshProfile = async () => { if (user) await fetchProfile(user.id) }

  const hasPermission = (perm: string) => {
    if (!profile) return false
    if (['ceo', 'admin'].includes(profile.role)) return true
    return profile.permissions?.includes(perm) || false
  }

  const isCEO        = () => profile?.role === 'ceo'
  const isAdmin      = () => ['ceo', 'admin'].includes(profile?.role || '')
  const isMentor     = () => ['ceo', 'admin', 'mentor'].includes(profile?.role || '')
  const isAmbassador = () => profile?.role === 'campus_ambassador'
  const isTeamMember = () => ['ceo', 'admin', 'team_member'].includes(profile?.role || '')

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signIn, signUp, signOut, refreshProfile, hasPermission, isCEO, isAdmin, isMentor, isAmbassador, isTeamMember }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
