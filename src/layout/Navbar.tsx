import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, LogOut, Settings, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getDomain } from '../lib/domain'

const navLinks = [
  { name: 'About',        path: '/about' },
  { name: 'Programs',     path: '/programs' },
  { name: 'Events',       path: '/events' },
  { name: 'Media',        path: '/media' },
  { name: 'Resources',    path: '/resources' },
  { name: 'Get Involved', path: '/get-involved' },
  { name: 'Contact',      path: '/contact' },
]

export default function Navbar() {
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const location = useLocation()
  const { user, profile, signOut } = useAuth()
  const domain   = getDomain()
  const isYSDI   = domain === 'ysdi'
  const dropRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => { setMobileOpen(false); setProfileOpen(false) }, [location])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const isActive = (path: string) => location.pathname === path
  const activeCls = isYSDI
    ? 'bg-ysdi/20 text-ysdi-light border border-ysdi/30'
    : 'bg-primary/20 text-primary-300 border border-primary/30'
  const brandGradient = isYSDI
    ? 'bg-gradient-to-br from-ysdi to-ysdi-dark'
    : 'bg-gradient-to-br from-primary to-primary-700'

  const handleSignOut = async () => {
    setProfileOpen(false)
    setMobileOpen(false)
    await signOut()
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      scrolled
        ? 'py-2 backdrop-blur-xl bg-dark-bg/80 border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
        : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg ${brandGradient}`}>
            {isYSDI ? 'Y' : 'A'}
          </div>
          <span className={`font-bold text-lg ${isYSDI ? 'text-gradient-ysdi' : 'text-gradient'}`}>
            {isYSDI ? 'YSDI Initiative' : 'AmpliYouth'}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(l => (
            <Link key={l.path} to={l.path}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(l.path) ? activeCls : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}>
              {l.name}
            </Link>
          ))}
          {!isYSDI && (
            <Link to="/academy"
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                location.pathname.startsWith('/academy') ? activeCls : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}>
              Academy
            </Link>
          )}
          {isYSDI && (
            <Link to="/team"
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive('/team') ? activeCls : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}>
              Our Team
            </Link>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropRef}>
              <button
                type="button"
                onClick={() => setProfileOpen(prev => !prev)}
                className="flex items-center gap-2.5 glass px-3.5 py-2 rounded-xl hover:bg-white/5 transition-all"
              >
                <div className={`w-7 h-7 rounded-lg ${brandGradient} flex items-center justify-center text-xs font-bold`}>
                  {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm text-white/80">{profile?.full_name?.split(' ')[0] || 'Account'}</span>
                <ChevronDown size={14} className={`text-white/50 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 z-50 bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-sm font-semibold truncate">{profile?.full_name}</p>
                    <p className="text-xs text-white/40 capitalize mt-0.5">{profile?.role?.replace(/_/g, ' ')}</p>
                  </div>
                  <div className="p-1.5 space-y-0.5">
                    {['ceo','admin','team_member'].includes(profile?.role || '') && (
                      <Link to="/admin" onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                        <LayoutDashboard size={15} /> Admin Dashboard
                      </Link>
                    )}
                    {profile?.role === 'campus_ambassador' && (
                      <Link to="/ambassador" onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                        <LayoutDashboard size={15} /> Ambassador Portal
                      </Link>
                    )}
                    <Link to="/profile" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                      <Settings size={15} /> Settings
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost text-sm py-2.5">Sign In</Link>
              <Link to="/register" className={isYSDI ? 'btn-ysdi text-sm py-2.5' : 'btn-primary text-sm py-2.5'}>
                Join Now
              </Link>
            </>
          )}
        </div>

        <button type="button" className="lg:hidden glass p-2.5 rounded-xl"
          onClick={() => setMobileOpen(prev => !prev)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0f1e]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 space-y-1 z-40">
          {navLinks.map(l => (
            <Link key={l.path} to={l.path}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(l.path) ? activeCls : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}>
              {l.name}
            </Link>
          ))}
          {!isYSDI && <Link to="/academy" className="block px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5">Academy</Link>}
          {isYSDI  && <Link to="/team"    className="block px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5">Our Team</Link>}
          <div className="pt-3 border-t border-white/5 space-y-2">
            {user ? (
              <>
                {['ceo','admin','team_member'].includes(profile?.role || '') && (
                  <Link to="/admin" className="block px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5">Admin Dashboard</Link>
                )}
                {profile?.role === 'campus_ambassador' && (
                  <Link to="/ambassador" className="block px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5">Ambassador Portal</Link>
                )}
                <button type="button" onClick={handleSignOut}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login"    className="block text-center btn-ghost text-sm">Sign In</Link>
                <Link to="/register" className={`block text-center ${isYSDI ? 'btn-ysdi' : 'btn-primary'} text-sm`}>Join Now</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
