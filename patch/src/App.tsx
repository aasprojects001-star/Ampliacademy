import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './layout/Layout'
import { getDomain } from './lib/domain'
import ProtectedRoute from './components/ProtectedRoute'

import Home        from './pages/Home'
import About       from './pages/About'
import Programs    from './pages/Programs'
import Events      from './pages/Events'
import Media       from './pages/Media'
import Resources   from './pages/Resources'
import GetInvolved from './pages/GetInvolved'
import Contact     from './pages/Contact'
import Mentorship  from './pages/Mentorship'
import TeamPage    from './pages/TeamPage'
import Login       from './pages/Login'
import Register    from './pages/Register'
// FIX: import ProfilePage so the /profile route works (Settings button was dead)
import ProfilePage from './pages/ProfilePage'

import AcademyHome    from './pages/academy/AcademyHome'
import AcademyCourses from './pages/academy/AcademyCourses'
import AcademyEbooks  from './pages/academy/AcademyEbooks'
import AcademyMentors from './pages/academy/AcademyMentors'
import AcademyNetwork from './pages/academy/AcademyNetwork'

import AmbassadorPortal from './pages/ambassador/AmbassadorPortal'

import AdminDashboard   from './pages/admin/AdminDashboard'
import AdminTeam        from './pages/admin/AdminTeam'
import AdminContent     from './pages/admin/AdminContent'
import AdminAcademy     from './pages/admin/AdminAcademy'
import AdminAmbassadors from './pages/admin/AdminAmbassadors'
import AdminTasks       from './pages/admin/AdminTasks'
import AdminChat        from './pages/admin/AdminChat'

const ADMIN_ROLES = ['admin', 'ceo', 'team_member']
const CEO_ROLES   = ['admin', 'ceo']

export default function App() {
  const domain = getDomain()
  useEffect(() => {
    document.title = domain === 'ysdi'
      ? 'YSDI Initiative — Youth Sustainable Development'
      : 'AmpliYouth Advocacy Academy'
  }, [domain])

  return (
    <Routes>
      <Route path="/"             element={<Layout><Home /></Layout>} />
      <Route path="/about"        element={<Layout><About /></Layout>} />
      <Route path="/programs"     element={<Layout><Programs /></Layout>} />
      <Route path="/events"       element={<Layout><Events /></Layout>} />
      <Route path="/media"        element={<Layout><Media /></Layout>} />
      <Route path="/resources"    element={<Layout><Resources /></Layout>} />
      <Route path="/get-involved" element={<Layout><GetInvolved /></Layout>} />
      <Route path="/contact"      element={<Layout><Contact /></Layout>} />
      <Route path="/mentorship"   element={<Layout><Mentorship /></Layout>} />
      <Route path="/team"         element={<Layout><TeamPage /></Layout>} />
      <Route path="/login"        element={<Login />} />
      <Route path="/register"     element={<Register />} />

      {/* FIX: /profile route was missing — caused Settings button to do nothing */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout><ProfilePage /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/academy"         element={<Layout><AcademyHome /></Layout>} />
      <Route path="/academy/courses" element={<ProtectedRoute><Layout><AcademyCourses /></Layout></ProtectedRoute>} />
      <Route path="/academy/ebooks"  element={<ProtectedRoute><Layout><AcademyEbooks /></Layout></ProtectedRoute>} />
      <Route path="/academy/mentors" element={<ProtectedRoute><Layout><AcademyMentors /></Layout></ProtectedRoute>} />
      <Route path="/academy/network" element={<ProtectedRoute><Layout><AcademyNetwork /></Layout></ProtectedRoute>} />

      <Route path="/ambassador" element={
        <ProtectedRoute roles={['campus_ambassador', 'admin', 'ceo']}>
          <AmbassadorPortal />
        </ProtectedRoute>
      } />

      <Route path="/admin"             element={<ProtectedRoute roles={ADMIN_ROLES}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/team"        element={<ProtectedRoute roles={CEO_ROLES}><AdminTeam /></ProtectedRoute>} />
      <Route path="/admin/content"     element={<ProtectedRoute roles={ADMIN_ROLES}><AdminContent /></ProtectedRoute>} />
      <Route path="/admin/academy"     element={<ProtectedRoute roles={CEO_ROLES}><AdminAcademy /></ProtectedRoute>} />
      <Route path="/admin/ambassadors" element={<ProtectedRoute roles={CEO_ROLES}><AdminAmbassadors /></ProtectedRoute>} />
      <Route path="/admin/tasks"       element={<ProtectedRoute roles={ADMIN_ROLES}><AdminTasks /></ProtectedRoute>} />
      <Route path="/admin/chat"        element={<ProtectedRoute roles={ADMIN_ROLES}><AdminChat /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
