import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Users, Handshake, Heart } from 'lucide-react'
import { getDomain } from '../lib/domain'

const paths = [
  {
    icon: GraduationCap,
    emoji: '🎓',
    title: 'Join the Academy',
    desc: 'Apply to become a full participant in the AmpliYouth Leadership Academy. Join a cohort of peers and build real skills.',
    steps: ['Submit your application', 'Complete a short interview', 'Join your cohort', 'Start learning'],
    cta: 'Apply Now',
    href: '/academy',
    color: 'from-emerald-500/15 to-teal-600/5',
    border: 'border-emerald-500/20',
    tag: 'Most Popular',
  },
  {
    icon: Users,
    emoji: '🌍',
    title: 'Campus Ambassador',
    desc: 'Represent AmpliYouth at your university. Lead events, recruit members, and earn recognition and support.',
    steps: ['Must be an enrolled student', 'Apply via this page', 'Complete ambassador training', 'Launch your chapter'],
    cta: 'Apply as Ambassador',
    href: '/register',
    color: 'from-purple-500/15 to-violet-600/5',
    border: 'border-purple-500/20',
    tag: 'For Students',
  },
  {
    icon: Handshake,
    emoji: '🤝',
    title: 'Partner With Us',
    desc: 'Organizations, governments, and funders: partner with us to scale impact for young Africans.',
    steps: ['Reach out via contact form', 'Discovery call with our team', 'Partnership agreement', 'Co-create programs'],
    cta: 'Become a Partner',
    href: '/contact',
    color: 'from-blue-500/15 to-indigo-600/5',
    border: 'border-blue-500/20',
    tag: 'Organisations',
  },
  {
    icon: Heart,
    emoji: '💛',
    title: 'Volunteer',
    desc: 'Give your time and skills. Volunteer as a facilitator, mentor, event coordinator, or communications support.',
    steps: ['Fill in your volunteer interest form', 'Get matched to a role', 'Complete onboarding', 'Start contributing'],
    cta: 'Volunteer',
    href: '/contact',
    color: 'from-amber-500/15 to-orange-600/5',
    border: 'border-amber-500/20',
    tag: 'Give Back',
  },
]

export default function GetInvolved() {
  const domain = getDomain()
  const isYSDI = domain === 'ysdi'
  const accent = isYSDI ? 'text-gradient-ysdi' : 'text-gradient'
  const accentLabel = isYSDI ? 'text-ysdi-light' : 'text-primary-400'
  const accentBg = isYSDI ? 'btn-ysdi' : 'btn-primary'

  return (
    <>
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className={`orb w-96 h-96 -top-32 right-0 ${isYSDI ? 'bg-ysdi/15' : 'bg-primary/10'}`} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${accentLabel}`}>Get Involved</p>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Your Place in the <span className={accent}>Movement</span>
          </h1>
          <p className="text-white/55 text-xl max-w-xl mx-auto">There are many ways to be part of AmpliYouth. Find yours.</p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {paths.map(({ emoji, title, desc, steps, cta, href, color, border, tag }) => (
            <div key={title} className={`glass-hover p-8 relative overflow-hidden border ${border}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <span className="text-4xl">{emoji}</span>
                  <span className="glass text-xs font-semibold px-3 py-1 rounded-full text-white/60">{tag}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-6">{desc}</p>

                <div className="mb-7">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">How it works</p>
                  <div className="space-y-2">
                    {steps.map((step, i) => (
                      <div key={step} className="flex items-start gap-3 text-sm text-white/60">
                        <span className="w-5 h-5 rounded-full glass flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i+1}</span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                <Link to={href} className={`inline-flex items-center gap-2 text-sm font-semibold ${accentLabel} hover:gap-3 transition-all`}>
                  {cta} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ambassador CTA banner */}
      <section className="section">
        <div className="max-w-5xl mx-auto glass rounded-3xl overflow-hidden grid lg:grid-cols-2 items-center">
          <img src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&q=80" alt="campus" className="h-64 lg:h-full w-full object-cover opacity-70" />
          <div className="p-10">
            <span className={`text-xs font-semibold uppercase tracking-wider ${accentLabel}`}>Campus Ambassador Program</span>
            <h2 className="text-3xl font-bold mt-3 mb-5">Bring AmpliYouth to Your Campus</h2>
            <p className="text-white/55 text-sm leading-relaxed mb-7">
              Represent us at your university. Get access to resources, event funding, direct support from our team, and the recognition of leading change on your campus.
            </p>
            <Link to="/register" className={`inline-flex items-center gap-2 font-semibold text-sm ${isYSDI ? 'btn-ysdi' : 'btn-primary'}`}>
              Apply Now <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
