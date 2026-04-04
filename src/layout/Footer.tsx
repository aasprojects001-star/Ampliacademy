import { Link } from 'react-router-dom'
import { Instagram, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import { getDomain } from '../lib/domain'

export default function Footer() {
  const domain = getDomain()
  const isYSDI = domain === 'ysdi'

  return (
    <footer className="relative overflow-hidden border-t border-white/5 pt-20 pb-8">
      {/* Glow */}
      <div className={`orb w-96 h-96 -bottom-48 left-1/2 -translate-x-1/2 ${isYSDI ? 'bg-ysdi/15' : 'bg-primary/10'}`} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg ${
                isYSDI
                  ? 'bg-gradient-to-br from-ysdi to-ysdi-dark'
                  : 'bg-gradient-to-br from-primary to-primary-700'
              }`}>
                {isYSDI ? 'Y' : 'A'}
              </div>
              <span className={`font-bold text-xl ${isYSDI ? 'text-gradient-ysdi' : 'text-gradient'}`}>
                {isYSDI ? 'YSDI Initiative' : 'AmpliYouth'}
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {isYSDI
                ? 'Youth Sustainable Development Initiative — driving change, building futures, and empowering the next generation of African leaders.'
                : 'A leadership and advocacy academy amplifying youth voices from underserved communities across Africa and beyond.'}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Mail, href: `mailto:info@${isYSDI ? 'ysdiinitiative' : 'ampliyouth'}.org` },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4">Platform</h4>
            <ul className="space-y-3">
              {['About', 'Programs', 'Events', 'Media', 'Resources'].map(item => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4">Get Involved</h4>
            <ul className="space-y-3">
              {[
                { name: 'Join Academy', href: '/academy' },
                { name: 'Campus Ambassador', href: '/get-involved' },
                { name: 'Mentor Program', href: '/mentorship' },
                { name: 'Partner With Us', href: '/contact' },
                { name: 'Volunteer', href: '/get-involved' },
              ].map(({ name, href }) => (
                <li key={name}>
                  <Link to={href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="text-sm text-white/40">info@{isYSDI ? 'ysdiinitiative' : 'ampliyouth'}.org</li>
              <li className="text-sm text-white/40">Lagos, Nigeria</li>
            </ul>
            <Link to="/contact"
              className={`inline-flex items-center gap-1.5 mt-5 text-sm font-medium transition-colors ${
                isYSDI ? 'text-ysdi-light hover:text-white' : 'text-primary-400 hover:text-white'
              }`}>
              Send a message <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} {isYSDI ? 'YSDI Initiative' : 'AmpliYouth Advocacy Academy'}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-white/25 hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-white/25 hover:text-white/50 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
