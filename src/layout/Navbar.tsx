import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, User, LogOut, Settings, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getDomain } from '../lib/domain'

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Programs', path: '/programs' },
  { name: 'Events', path: '/events' },
  { name: 'Media', path: '/media' },
  { name: 'Resources', path: '/resources' },
  { name: 'Get Involved', path: '/get-involved' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const location = useLocation()
  const { user, profile, signOut } = useAuth()
  const domain = getDomain()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const isActive = (path: string) => location.pathname === path

  const brandColor = domain === 'ysdi' ? 'text-gradient-ysdi' : 'text-gradient'
  const activeBg = domain === 'ysdi'
    ? 'bg-ysdi/20 text-ysdi-light border border-ysdi/30'
    : 'bg-primary/20 text-primary-300 border border-primary/30'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2 backdrop-blur-xl bg-dark-bg/80 border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg ${
            domain === 'ysdi'
              ? 'bg-gradient-to-br from-ysdi to-ysdi-dark shadow-ysdi'
              : 'bg-gradient-to-br from-primary to-primary-700 shadow-glow'
          }`}>
            {domain === 'ysdi' ? 'Y' : 'A'}
          </div>
          <span className={`font-bold text-lg ${brandColor}`}>
            {domain === 'ysdi' ? 'YSDI Initiative' : 'AmpliYouth'}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(l.path)
                  ? activeBg
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.name}
            </Link>
          ))}
          {domain === 'ampliyouth' && (
            <Link
              to="/academy"
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                location.pathname.startsWith('/academy')
                  ? activeBg
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Academy
            </Link>
          )}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 glass px-3.5 py-2 rounded-xl hover:bg-white/5 transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center text-xs font-bold">
                  {profile?.full_name?.charAt(0) || 'U'}
                </div>
                <span className="text-sm text-white/80">{profile?.full_name?.split(' ')[0]}</span>
                <ChevronDown size={14} className="text-white/50" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 glass border border-white/10 rounded-2xl shadow-glass overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-sm font-medium">{profile?.full_name}</p>
                    <p className="text-xs text-white/40 capitalize">{profile?.role?.replace('_', ' ')}</p>
                  </div>
                  <div className="p-1.5">
                    {(profile?.role === 'ceo' || profile?.role === 'admin' || profile?.role === 'team_member') && (
                      <Link to="/admin" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                        <LayoutDashboard size={15} /> Admin Dashboard
                      </Link>
                    )}
                    {profile?.role === 'campus_ambassador' && (
                      <Link to="/ambassador" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                        <LayoutDashboard size={15} /> Ambassador Portal
                      </Link>
                    )}
                    <Link to="/profile" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                      <Settings size={15} /> Settings
                    </Link>
                    <button
                      onClick={() => { signOut(); setProfileOpen(false) }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
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
              <Link to="/register" className={domain === 'ysdi' ? 'btn-ysdi text-sm py-2.5' : 'btn-primary text-sm py-2.5'}>
                Join Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu btn */}
        <button
          className="lg:hidden glass p-2.5 rounded-xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-dark-bg/95 border-b border-white/5 px-6 py-4 space-y-1">
          {navLinks.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(l.path)
                  ? activeBg
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.name}
            </Link>
          ))}
          {domain === 'ampliyouth' && (
            <Link to="/academy" className="block px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5">
              Academy
            </Link>
          )}
          <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
            {user ? (
              <button onClick={signOut} className="btn-ghost text-sm w-full justify-center">Sign Out</button>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm text-center">Sign In</Link>
                <Link to="/register" className={`text-center ${domain === 'ysdi' ? 'btn-ysdi' : 'btn-primary'} text-sm`}>Join Now</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
