import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, FileText, Globe, Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const sections = [
  { icon: BookOpen, emoji: '🎓', title: 'Courses', desc: 'Video lessons, modules, and assignments taught by expert mentors.', href: '/academy/courses', locked: true },
  { icon: FileText, emoji: '📚', title: 'E-Library', desc: 'Hundreds of ebooks, guides, and research papers — all free.', href: '/academy/ebooks', locked: true },
  { icon: Users, emoji: '🤝', title: 'Mentors', desc: 'Browse mentors and request a mentorship match for your journey.', href: '/academy/mentors', locked: true },
  { icon: Globe, emoji: '🌍', title: 'Network', desc: 'Connect with peers, alumni, and fellow learners across Africa.', href: '/academy/network', locked: true },
]

export default function AcademyHome() {
  const { user, profile } = useAuth()

  return (
    <>
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        <div className="orb w-96 h-96 -top-32 -left-32 bg-primary/15" />
        <div className="orb w-72 h-72 bottom-0 right-0 bg-primary/8" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-5 text-primary-400">AmpliYouth Academy</p>
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            Your <span className="text-gradient">Learning</span><br />Journey Starts Here
          </h1>
          <p className="text-white/55 text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Courses, ebooks, mentors, and a Pan-African network — everything you need to become a next-generation changemaker, in one place.
          </p>
          {user ? (
            <Link to="/academy/courses" className="btn-primary text-base px-8 py-4">
              Enter Academy <ArrowRight size={18} />
            </Link>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register" className="btn-primary text-base px-8 py-4">Join for Free <ArrowRight size={18} /></Link>
              <Link to="/login" className="btn-ghost text-base px-8 py-4">Sign In</Link>
            </div>
          )}
        </div>
      </section>

      {/* Sections */}
      <section className="section pt-0">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {sections.map(({ emoji, title, desc, href, locked }) => (
            <div key={title} className="glass-hover p-8 text-center relative">
              <div className="text-5xl mb-5">{emoji}</div>
              <h3 className="font-bold text-xl mb-3">{title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-6">{desc}</p>
              {user ? (
                <Link to={href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400">
                  Explore <ArrowRight size={14} />
                </Link>
              ) : (
                <div className="flex items-center justify-center gap-1.5 text-sm text-white/30">
                  <Lock size={13} /> Sign in to access
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Campus ambassador banner */}
      <section className="section">
        <div className="max-w-5xl mx-auto glass-primary rounded-3xl p-10 grid lg:grid-cols-2 gap-10 items-center border border-primary/20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-400">Exclusive to ampliyouth.org</span>
            <h2 className="text-3xl font-bold mt-3 mb-5">Campus Ambassador Portal</h2>
            <p className="text-white/55 text-sm leading-relaxed mb-7">
              Already a campus ambassador? Log in to access your exclusive dashboard — receive announcements, chat with admin, and connect with fellow ambassadors.
            </p>
            <Link to={user ? '/ambassador' : '/login'} className="btn-primary">
              {user ? 'Go to Portal' : 'Login as Ambassador'} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="glass rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🌍</div>
            <p className="font-bold text-2xl text-gradient mb-2">200+</p>
            <p className="text-white/45 text-sm">Active campus ambassadors</p>
            <p className="text-white/30 text-xs mt-1">across 15 countries</p>
          </div>
        </div>
      </section>
    </>
  )
}
