import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, Globe, Lightbulb, Mic, Shield } from 'lucide-react'
import { getDomain } from '../lib/domain'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'

// Fallback hardcoded programs — shown only if no DB programs exist
const FALLBACK_PROGRAMS = [
  {
    icon: BookOpen,
    emoji: '📚',
    title: 'Leadership Academy',
    subtitle: 'Flagship Program',
    desc: 'A comprehensive 12-week intensive program covering advocacy, policy analysis, public speaking, community organizing, and strategic leadership. Cohorts are accepted twice yearly.',
    features: ['12-week curriculum', 'Live workshops', 'Guest speakers', 'Certificate of completion'],
    color: 'from-emerald-500/15 to-teal-600/5',
    border: 'border-emerald-500/20',
    labelColor: 'text-emerald-400',
  },
  {
    icon: Users,
    emoji: '🤝',
    title: 'Mentorship Hub',
    subtitle: 'Mentee-to-Mentor',
    desc: 'A structured 6-month mentorship experience pairing young leaders with experienced professionals across sectors including law, business, public service, and social enterprise.',
    features: ['Personal mentor matching', 'Monthly check-ins', 'Goal tracking', 'Peer cohorts'],
    color: 'from-blue-500/15 to-indigo-600/5',
    border: 'border-blue-500/20',
    labelColor: 'text-blue-400',
  },
  {
    icon: Globe,
    emoji: '🌍',
    title: 'Campus Ambassador Network',
    subtitle: 'For Students',
    desc: 'A structured program for university students to represent AmpliYouth on their campuses, organize events, recruit members, and lead community projects.',
    features: ['Campus chapter support', 'Training & resources', 'Event funding', 'Leadership track'],
    color: 'from-purple-500/15 to-violet-600/5',
    border: 'border-purple-500/20',
    labelColor: 'text-purple-400',
  },
  {
    icon: Lightbulb,
    emoji: '💡',
    title: 'Innovation Lab',
    subtitle: 'Project Incubator',
    desc: 'A problem-solving and project development program that helps young people transform community challenges into funded, actionable development projects.',
    features: ['Project ideation', 'Pitch training', 'Funding support', 'Mentorship'],
    color: 'from-amber-500/15 to-orange-600/5',
    border: 'border-amber-500/20',
    labelColor: 'text-amber-400',
  },
  {
    icon: Mic,
    emoji: '🎤',
    title: 'Advocacy & Storytelling',
    subtitle: 'Voice Training',
    desc: 'Equipping young people with the skills to communicate powerfully — from writing op-eds and policy briefs to media appearances and public campaigns.',
    features: ['Media training', 'Writing workshops', 'Op-ed publishing', 'Campaign design'],
    color: 'from-rose-500/15 to-pink-600/5',
    border: 'border-rose-500/20',
    labelColor: 'text-rose-400',
  },
  {
    icon: Shield,
    emoji: '🛡️',
    title: 'Youth Policy Fellowship',
    subtitle: 'Policy Track',
    desc: 'A policy-focused fellowship connecting young Africans with government institutions, think tanks, and international organizations for hands-on policy development experience.',
    features: ['Policy placements', 'Research support', 'Expert access', '3-month track'],
    color: 'from-cyan-500/15 to-sky-600/5',
    border: 'border-cyan-500/20',
    labelColor: 'text-cyan-400',
  },
]

const PALETTE = [
  { color: 'from-emerald-500/15 to-teal-600/5',  border: 'border-emerald-500/20', labelColor: 'text-emerald-400' },
  { color: 'from-blue-500/15 to-indigo-600/5',   border: 'border-blue-500/20',    labelColor: 'text-blue-400'    },
  { color: 'from-purple-500/15 to-violet-600/5', border: 'border-purple-500/20',  labelColor: 'text-purple-400'  },
  { color: 'from-amber-500/15 to-orange-600/5',  border: 'border-amber-500/20',   labelColor: 'text-amber-400'   },
  { color: 'from-rose-500/15 to-pink-600/5',     border: 'border-rose-500/20',    labelColor: 'text-rose-400'    },
  { color: 'from-cyan-500/15 to-sky-600/5',      border: 'border-cyan-500/20',    labelColor: 'text-cyan-400'    },
]

export default function Programs() {
  const domain  = getDomain()
  const isYSDI  = domain === 'ysdi'
  const accent       = isYSDI ? 'text-gradient-ysdi' : 'text-gradient'
  const accentLabel  = isYSDI ? 'text-ysdi-light'    : 'text-primary-400'
  const accentBorder = isYSDI ? 'border-ysdi/20'     : 'border-primary/20'

  const [dbPrograms, setDbPrograms] = useState<any[] | null>(null)

  useEffect(() => {
    // FIX: load programs from DB — these are what the admin creates in AdminContent
    supabase
      .from('programs')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: true })
      .then(({ data }) => setDbPrograms(data ?? []))
  }, [])

  // If DB has programs use them, otherwise fall back to hardcoded list
  const useDb    = dbPrograms !== null && dbPrograms.length > 0
  const programs = useDb ? dbPrograms : FALLBACK_PROGRAMS

  return (
    <>
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className={`orb w-96 h-96 -top-32 -right-20 ${isYSDI ? 'bg-ysdi/15' : 'bg-primary/10'}`} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${accentLabel}`}>Programs</p>
          <h1 className="text-5xl lg:text-6xl font-bold mb-8">
            Programs Built to <span className={accent}>Empower</span>
          </h1>
          <p className="text-white/55 text-xl leading-relaxed max-w-2xl mx-auto">
            From intensive leadership academies to campus ambassador networks — every program is designed to meet young people where they are.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useDb
            ? programs.map((prog, i) => {
                const pal = PALETTE[i % PALETTE.length]
                return (
                  <div key={prog.id} className={`glass-hover relative overflow-hidden p-8 border ${pal.border}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${pal.color} rounded-2xl`} />
                    <div className="relative z-10">
                      {/* If the program has an uploaded image, show it */}
                      {prog.image_url && (
                        <img src={prog.image_url} alt={prog.title}
                          className="w-full h-36 object-cover rounded-xl mb-6 opacity-90" />
                      )}
                      <div className="flex items-start justify-between mb-6">
                        <span className="text-4xl">🎓</span>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full glass ${pal.labelColor}`}>{prog.level}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{prog.title}</h3>
                      <div className="text-white/50 text-sm leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{ __html: prog.description || '' }} />
                      {prog.category && (
                        <span className={`text-xs px-3 py-1 rounded-full glass ${pal.labelColor} mr-2`}>{prog.category}</span>
                      )}
                      <Link to="/get-involved" className={`inline-flex items-center gap-1.5 text-sm font-semibold mt-4 ${pal.labelColor} hover:gap-3 transition-all`}>
                        Apply Now <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )
              })
            : (FALLBACK_PROGRAMS as typeof FALLBACK_PROGRAMS).map(({ emoji, title, subtitle, desc, features, color, border, labelColor }) => (
                <div key={title} className={`glass-hover relative overflow-hidden p-8 border ${border}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl`} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-4xl">{emoji}</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full glass ${labelColor}`}>{subtitle}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-6">{desc}</p>
                    <ul className="space-y-2 mb-6">
                      {features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                          <span className={`w-1.5 h-1.5 rounded-full ${labelColor.replace('text', 'bg')}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link to="/get-involved" className={`inline-flex items-center gap-1.5 text-sm font-semibold ${labelColor} hover:gap-3 transition-all`}>
                      Apply Now <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </section>

      <section className="section">
        <div className={`max-w-4xl mx-auto glass rounded-3xl p-12 text-center border ${accentBorder} relative overflow-hidden`}>
          <div className={`orb w-48 h-48 -top-12 left-1/2 -translate-x-1/2 ${isYSDI ? 'bg-ysdi/20' : 'bg-primary/15'}`} />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-5">Not Sure Where to Start?</h2>
            <p className="text-white/50 mb-8">Reach out and our team will help you find the best program fit for your goals and background.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className={isYSDI ? 'btn-ysdi' : 'btn-primary'}>Talk to Us <ArrowRight size={16} /></Link>
              <Link to="/get-involved" className="btn-ghost">See All Opportunities</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
