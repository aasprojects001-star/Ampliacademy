import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, FileText, GraduationCap, Flag,
  CheckSquare, MessageCircle, LogOut, Menu, X, Bell,
  TrendingUp, UserCheck, Megaphone, Settings, ChevronRight
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const stats = [
  { label:'Total Users', value:'1,284', change:'+12%', icon:'👥', color:'from-blue-500/20 to-indigo-600/10', border:'border-blue-500/20' },
  { label:'Active Mentees', value:'342', change:'+8%', icon:'📚', color:'from-emerald-500/20 to-teal-600/10', border:'border-emerald-500/20' },
  { label:'Campus Ambassadors', value:'218', change:'+15%', icon:'🌍', color:'from-purple-500/20 to-violet-600/10', border:'border-purple-500/20' },
  { label:'Pending Approvals', value:'23', change:'Action needed', icon:'⏳', color:'from-amber-500/20 to-orange-600/10', border:'border-amber-500/20' },
]

const recentUsers = [
  { name:'Amina Sule', email:'amina@email.com', role:'Academy Applicant', status:'pending', time:'2h ago' },
  { name:'Joseph Kamau', email:'joseph@email.com', role:'Campus Ambassador', status:'approved', time:'5h ago' },
  { name:'Fatou Diallo', email:'fatou@email.com', role:'Academy Applicant', status:'pending', time:'1d ago' },
  { name:'Kwame Asante', email:'kwame@email.com', role:'Mentor Application', status:'review', time:'1d ago' },
]

const statusColors: Record<string, string> = {
  pending: 'text-amber-400 bg-amber-400/10',
  approved: 'text-emerald-400 bg-emerald-400/10',
  review: 'text-blue-400 bg-blue-400/10',
}

export function AdminSidebar({ active, onClose }: { active: string; onClose?: () => void }) {
  const { profile, signOut, isCEO, isAdmin } = useAuth()
  const navigate = useNavigate()

  const nav = [
    { href:'/admin',             icon:LayoutDashboard, label:'Dashboard',    roles:['ceo','admin','team_member'] },
    { href:'/admin/team',        icon:Users,          label:'Team Members', roles:['ceo','admin'] },
    { href:'/admin/content',     icon:FileText,       label:'Site Content', roles:['ceo','admin','team_member'] },
    { href:'/admin/academy',     icon:GraduationCap,  label:'Academy',      roles:['ceo','admin'] },
    { href:'/admin/ambassadors', icon:Flag,           label:'Ambassadors',  roles:['ceo','admin'] },
    { href:'/admin/tasks',       icon:CheckSquare,    label:'Tasks',        roles:['ceo','admin','team_member'] },
    { href:'/admin/chat',        icon:MessageCircle,  label:'Chat',         roles:['ceo','admin','team_member'] },
  ]

  const allowed = nav.filter(n => profile && n.roles.includes(profile.role))

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ysdi to-ysdi-dark shadow-ysdi flex items-center justify-center font-bold text-lg">Y</div>
            <div>
              <p className="font-bold text-sm text-gradient-ysdi">YSDI Admin</p>
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
        <Link to="/" className="flex items-center gap-2 text-xs text-white/30 hover:text-white px-4 py-2 transition-colors">
          ← Back to website
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
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 border-r border-white/5 backdrop-blur-xl bg-dark-bg/60 flex-shrink-0 sticky top-0 h-screen">
        <AdminSidebar active={current} />
      </aside>

      {/* Mobile sidebar */}
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
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-ysdi rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ysdi to-ysdi-dark flex items-center justify-center text-sm font-bold">
              {profile?.full_name?.charAt(0)}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard" current="/admin">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, change, icon, color, border }) => (
          <div key={label} className={`glass p-5 rounded-2xl border ${border} relative overflow-hidden`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl`} />
            <div className="relative z-10">
              <div className="text-3xl mb-3">{icon}</div>
              <p className="text-2xl font-bold mb-1">{value}</p>
              <p className="text-white/45 text-xs">{label}</p>
              <p className="text-white/30 text-[10px] mt-1">{change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent signups */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold flex items-center gap-2"><UserCheck size={17} className="text-ysdi-light" /> Recent Sign-Ups</h3>
            <Link to="/admin/ambassadors" className="text-xs text-ysdi-light hover:text-white transition-colors">View all →</Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map(u => (
              <div key={u.email} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ysdi/60 to-ysdi-dark/60 flex items-center justify-center text-xs font-bold">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-xs text-white/35">{u.role} · {u.time}</p>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[u.status]}`}>
                  {u.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold mb-5 flex items-center gap-2"><TrendingUp size={17} className="text-ysdi-light" /> Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label:'Create Team Member', href:'/admin/team', icon:'👤' },
              { label:'Publish Announcement', href:'/admin/ambassadors', icon:'📢' },
              { label:'Update Site Content', href:'/admin/content', icon:'✏️' },
              { label:'Assign Tasks', href:'/admin/tasks', icon:'✅' },
              { label:'Review Ambassadors', href:'/admin/ambassadors', icon:'🌍' },
              { label:'Academy Oversight', href:'/admin/academy', icon:'🎓' },
            ].map(({ label, href, icon }) => (
              <Link key={label} to={href}
                className="w-full flex items-center justify-between glass px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
                <span className="flex items-center gap-2.5"><span>{icon}</span>{label}</span>
                <ChevronRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
