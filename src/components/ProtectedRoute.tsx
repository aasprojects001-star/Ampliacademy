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

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/login" replace />
  if (roles && profile && !roles.includes(profile.role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
