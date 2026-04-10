import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PageLoader } from './ChatUI'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  roles?: string[]
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()

  // FIX: Always show loader while auth is initialising — never redirect prematurely.
  // Previously, when `loading` was still true and `profile` hadn't loaded yet after
  // a token refresh, the route would hit `!user` and redirect to /login, causing
  // the "site hangs / avatar turns to U / can't log out" symptom.
  if (loading) return <PageLoader />

  if (!user) return <Navigate to="/login" replace />

  // If roles are required but profile is still null (e.g. slow DB), keep showing
  // the loader rather than redirecting away — profile will arrive shortly.
  if (roles) {
    if (!profile) return <PageLoader />
    if (!roles.includes(profile.role)) return <Navigate to="/" replace />
  }

  return <>{children}</>
}
