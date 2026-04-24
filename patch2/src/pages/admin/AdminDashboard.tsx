import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, FileText, GraduationCap, Flag,
  CheckSquare, MessageCircle, LogOut, Menu, X, Bell,
  TrendingUp, UserCheck, ChevronRight, RefreshCw,
  Settings
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'

export function AdminSidebar({ active, onClose }: { active: string; onClose?: () => void }) {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()

  const nav = [
    { href: '/admin',             icon: LayoutDashboard, label: 'Dashboard',    roles: ['ceo','admin','team_member'] },
    { href: '/admin/team',        icon: Users,           label: 'Team Members', roles: ['ceo','admin'] },
    { href: '/admin/content',     icon: FileText,        label: 'Site Content', roles: ['ceo','admin','team_member'] },
    { href: '/admin/academy',     icon: GraduationCap,   label: 'Academy',      roles: ['ceo','admin'] },
    { href: '/admin/ambassadors', icon: Flag,            label: 'Ambassadors',  roles: ['ceo','admin'] },
    { href: '/admin/tasks',       icon: CheckSquare,     label: 'Tasks',        roles: ['ceo','admin','team_member'] },
    { href: '/admin/chat',        icon: MessageCircle,   label: 'Chat',         roles: ['ceo','admin','team_member'] },
  ]

  const allowed = nav.filter(n => profile && n.roles.includes(profile.role))

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ysdi to-ysdi-dark shadow-ysdi flex items-center justify-center font-bold text-lg">Y</div>
            <div>
              <p className="font-bold text-sm text-gradient-ysdi">Admin Panel</p>
              <p className="text-white/35 text-xs capitalize">{profile?.role?.replace('_', ' ')}</p>
            </div>
          </div>
          {onClose && <button onClick={onClose}><X size={18} /></button>}
        </div>
      </div>

      <nav className="p-4 flex-1 space-y-1">
        {allowed.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            to={href}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              active === href
                ? 'bg-ysdi/20 text-ysdi-light border border-ysdi/30'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={17} /> {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        <Link to="/profile" className="flex items-center gap-2 text-xs text-white/30 hover:text-white px-4 py-2 transition-colors">
          <Settings size={13} /> Settings
        </Link>
        <Link to="/" className="flex items-center gap-2 text-xs text-white/30 hover:text-white px-4 py-2 transition-colors">
          Back to website
        </Link>
        <div className="glass rounded-xl p-3">
          <p className="text-xs font-semibold truncate">{profile?.full_name}</p>
          <p className="text-white/35 text-[11px] capitalize">{profile?.role?.replace('_', ' ')}</p>
        </div>
        <button onClick={() => { signOut(); navigate('/login') }}
          className="w-full flex items-center gap-2 text-sm text-red-400 hover:bg-red-400/10 py-2 px-3 rounded-xl transition-all">
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  )
}

export function AdminLayout({ children, title, current }: { children: React.ReactNode; title: string; current: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { profile } = useAuth()

  return (
    <div className="min-h-screen flex bg-dark-bg">
      <aside className="hidden lg:block w-64 border-r border-white/5 backdrop-blur-xl bg-dark-bg/60 flex-shrink-0 sticky top-0 h-screen">
        <AdminSidebar active={current} />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 backdrop-blur-xl bg-dark-bg/95 border-r border-white/5">
            <AdminSidebar active={current} onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 backdrop-blur-xl bg-dark-bg/80 z-10">
          <div className="flex items-center gap-3">
            <button className="lg:hidden glass p-2 rounded-xl" onClick={() => setSidebarOpen(true)}><Menu size={18} /></button>
            <h1 className="font-semibold text-lg">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="glass p-2.5 rounded-xl relative">
              <Bell size={17} />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ysdi to-ysdi-dark flex items-center justify-center text-sm font-bold">
              {profile?.full_name?.charAt(0) ?? '?'}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color, border }: { label: string; value: string | number; sub?: string; color: string; border: string }) {
  return (
    <div className={`glass p-5 rounded-2xl border ${border} relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl`} />
      <div className="relative z-10">
        <p className="text-2xl font-bold mb-1">{value}</p>
        <p className="text-white/55 text-sm">{label}</p>
        {sub && <p className="text-white/30 text-[11px] mt-1">{sub}</p>}
      </div>
    </div>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────
const roleColors: Record<string, string> = {
  ceo:               'text-purple-400 bg-purple-400/10',
  admin:             'text-blue-400 bg-blue-400/10',
  team_member:       'text-teal-400 bg-teal-400/10',
  mentor:            'text-amber-400 bg-amber-400/10',
  campus_ambassador: 'text-emerald-400 bg-emerald-400/10',
  user:              'text-white/40 bg-white/5',
}

export default function AdminDashboard() {
  const [stats,       setStats]       = useState({ users: 0, ambassadors: 0, mentors: 0, pending: 0 })
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [loading,     setLoading]     = useState(true)

  const load = async () => {
    setLoading(true)
    const [
      { count: users },
      { count: ambassadors },
      { count: mentors },
      { count: pending },
      { data: recent },
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'campus_ambassador'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'mentor'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('approved', false),
      supabase.from('profiles').select('id, full_name, email, role, approved, created_at').order('created_at', { ascending: false }).limit(6),
    ])
    setStats({
      users:       users       ?? 0,
      ambassadors: ambassadors ?? 0,
      mentors:     mentors     ?? 0,
      pending:     pending     ?? 0,
    })
    setRecentUsers(recent ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const quickLinks = [
    { label: 'Add Team Member',      href: '/admin/team'        },
    { label: 'Publish Announcement', href: '/admin/ambassadors'  },
    { label: 'Update Site Content',  href: '/admin/content'     },
    { label: 'Assign Tasks',         href: '/admin/tasks'       },
    { label: 'Review Ambassadors',   href: '/admin/ambassadors' },
    { label: 'Academy Oversight',    href: '/admin/academy'     },
  ]

  return (
    <AdminLayout title="Dashboard" current="/admin">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Users"         value={loading ? '—' : stats.users}       color="from-blue-500/20 to-indigo-600/10"   border="border-blue-500/20"   />
        <StatCard label="Campus Ambassadors"  value={loading ? '—' : stats.ambassadors} color="from-purple-500/20 to-violet-600/10" border="border-purple-500/20" />
        <StatCard label="Mentors"             value={loading ? '—' : stats.mentors}     color="from-emerald-500/20 to-teal-600/10"  border="border-emerald-500/20" />
        <StatCard label="Pending Approval"    value={loading ? '—' : stats.pending}     color="from-amber-500/20 to-orange-600/10"  border="border-amber-500/20"   sub={stats.pending > 0 ? 'Action needed' : undefined} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent sign-ups — real DB data */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold flex items-center gap-2"><UserCheck size={17} className="text-ysdi-light" /> Recent Sign-Ups</h3>
            <div className="flex items-center gap-2">
              <button onClick={load} className="text-white/30 hover:text-white transition-colors">
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              </button>
              <Link to="/admin/ambassadors" className="text-xs text-ysdi-light hover:text-white transition-colors">View all</Link>
            </div>
          </div>
          {loading ? (
            <div className="py-8 text-center"><div className="w-5 h-5 border-2 border-ysdi/30 border-t-ysdi rounded-full animate-spin mx-auto" /></div>
          ) : recentUsers.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-8">No users yet.</p>
          ) : (
            <div className="space-y-3">
              {recentUsers.map(u => (
                <div key={u.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ysdi/60 to-ysdi-dark/60 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {u.full_name?.charAt(0) ?? '?'}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{u.full_name || 'Unnamed'}</p>
                      <p className="text-xs text-white/35">{u.email}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${roleColors[u.role] ?? roleColors.user}`}>
                    {u.role?.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold mb-5 flex items-center gap-2"><TrendingUp size={17} className="text-ysdi-light" /> Quick Actions</h3>
          <div className="space-y-2">
            {quickLinks.map(({ label, href }) => (
              <Link key={label} to={href}
                className="w-full flex items-center justify-between glass px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
                <span>{label}</span>
                <ChevronRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
