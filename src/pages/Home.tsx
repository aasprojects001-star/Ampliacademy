import { Link } from 'react-router-dom'
import { ArrowRight, Play, Users, Globe, Lightbulb, Award, ChevronRight, Star } from 'lucide-react'
import { getDomain } from '../lib/domain'

const stats = [
  { value: '5,000+', label: 'Youth Reached', icon: Users },
  { value: '20+',    label: 'Communities',   icon: Globe },
  { value: '15+',    label: 'Countries',     icon: Globe },
  { value: '100+',   label: 'Initiatives',   icon: Lightbulb },
]

const programs = [
  {
    icon: '🎯',
    title: 'Leadership Academy',
    desc: 'Intensive training in advocacy, policy, and community leadership for young changemakers.',
    color: 'from-emerald-500/20 to-green-600/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: '🤝',
    title: 'Mentorship Hub',
    desc: 'Connect with seasoned mentors who guide your personal and professional growth journey.',
    color: 'from-blue-500/20 to-cyan-600/10',
    border: 'border-blue-500/20',
  },
  {
    icon: '🌍',
    title: 'Campus Network',
    desc: 'Join a Pan-African network of campus ambassadors driving change on their campuses.',
    color: 'from-purple-500/20 to-violet-600/10',
    border: 'border-purple-500/20',
  },
  {
    icon: '💡',
    title: 'Innovation Lab',
    desc: 'Turn your community ideas into funded, actionable projects with our support framework.',
    color: 'from-amber-500/20 to-orange-600/10',
    border: 'border-amber-500/20',
  },
]

const testimonials = [
  {
    text: "Before AmpliYouth, I had passion but no structure. The Academy gave me tools to turn community problems into real solutions.",
    name: "Amina S.",
    role: "Northern Nigeria · Cohort 3",
    avatar: "AS",
  },
  {
    text: "This is not motivational talk. It is practical, grounded leadership training that respects where young people are coming from.",
    name: "Joseph K.",
    role: "Kenya · Campus Ambassador",
    avatar: "JK",
  },
  {
    text: "The mentorship I received here changed the trajectory of my career. My mentor opened doors I didn't even know existed.",
    name: "Fatima A.",
    role: "Ghana · Mentorship Program",
    avatar: "FA",
  },
]

export default function Home() {
  const domain = getDomain()
  const isYSDI = domain === 'ysdi'

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background orbs */}
        <div className={`orb w-[600px] h-[600px] -top-48 -left-48 ${isYSDI ? 'bg-ysdi/20' : 'bg-primary/15'}`} />
        <div className={`orb w-[400px] h-[400px] top-1/2 -right-32 ${isYSDI ? 'bg-ysdi/10' : 'bg-primary/8'}`} />
        <div className="orb w-72 h-72 bottom-0 left-1/3 bg-accent/8" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-32 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-medium mb-8 ${
                isYSDI ? 'text-ysdi-light border-ysdi/30' : 'text-primary-400 border-primary/30'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isYSDI ? 'bg-ysdi-light' : 'bg-primary-400'}`} />
                {isYSDI ? 'Driving Sustainable Development Across Africa' : 'Applications Open — Cohort 2025'}
                <ChevronRight size={12} />
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05] mb-8 tracking-tight">
                {isYSDI ? (
                  <>
                    Driving Change,<br />
                    <span className="text-gradient-ysdi">Building</span><br />
                    <span className="text-gradient-ysdi">Futures</span>
                  </>
                ) : (
                  <>
                    Building Africa's<br />
                    <span className="text-gradient">Next Generation</span><br />
                    of Changemakers
                  </>
                )}
              </h1>

              <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-lg">
                {isYSDI
                  ? 'YSDI Initiative empowers youth across Africa with the tools, networks, and platforms to drive sustainable development in their communities.'
                  : 'AmpliYouth Advocacy Academy equips young people from underserved communities with skills, confidence, and platforms to influence systems and shape narratives across Africa and beyond.'}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to={isYSDI ? '/programs' : '/academy'} className={isYSDI ? 'btn-ysdi' : 'btn-primary'}>
                  {isYSDI ? 'Explore Programs' : 'Apply to the Academy'}
                  <ArrowRight size={16} />
                </Link>
                <Link to="/about" className="btn-ghost">
                  <Play size={15} className="fill-current" />
                  Our Story
                </Link>
              </div>

              {/* Mini social proof */}
              <div className="flex items-center gap-4 mt-10">
                <div className="flex -space-x-3">
                  {['JA','MO','KF','AT','BS'].map((init, i) => (
                    <div key={i} className={`w-9 h-9 rounded-full border-2 border-dark-bg flex items-center justify-center text-xs font-bold ${
                      ['bg-emerald-500','bg-blue-500','bg-purple-500','bg-amber-500','bg-rose-500'][i]
                    }`}>{init}</div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-white/40 text-xs mt-0.5">5,000+ young leaders trust us</p>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block">
              {/* Main card */}
              <div className="glass rounded-3xl p-1 shadow-glass relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=700&q=80"
                  alt="Youth leadership"
                  className="w-full h-[480px] object-cover rounded-[calc(1.5rem-4px)]"
                  style={{ filter: 'brightness(0.85) saturate(1.1)' }}
                />
                {/* Floating stats card */}
                <div className="absolute -bottom-6 -left-6 glass px-5 py-4 rounded-2xl shadow-glass">
                  <p className={`text-3xl font-bold ${isYSDI ? 'text-gradient-ysdi' : 'text-gradient'}`}>5,000+</p>
                  <p className="text-white/50 text-xs">Youth empowered</p>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 glass px-4 py-3 rounded-2xl shadow-glass flex items-center gap-2">
                  <Award size={18} className={isYSDI ? 'text-ysdi-light' : 'text-primary-400'} />
                  <div>
                    <p className="text-xs font-semibold">Pan-African</p>
                    <p className="text-white/40 text-[10px]">15+ countries</p>
                  </div>
                </div>
              </div>

              {/* Glow behind card */}
              <div className={`absolute inset-0 rounded-3xl blur-3xl opacity-30 ${isYSDI ? 'bg-ysdi' : 'bg-primary'}`} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-16 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className={`text-4xl font-bold mb-2 ${isYSDI ? 'text-gradient-ysdi' : 'text-gradient'}`}>{value}</p>
                <p className="text-white/45 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROGRAMS ═══ */}
      <section className="section relative overflow-hidden">
        <div className="orb w-80 h-80 top-0 right-0 bg-primary/8" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className={`text-sm font-semibold uppercase tracking-widest mb-4 ${isYSDI ? 'text-ysdi-light' : 'text-primary-400'}`}>
              What We Offer
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-5">Programs Built to <span className={isYSDI ? 'text-gradient-ysdi' : 'text-gradient'}>Transform</span></h2>
            <p className="text-white/45 max-w-xl mx-auto leading-relaxed">
              Every program is designed to meet young people where they are and take them where they need to go.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map(({ icon, title, desc, color, border }) => (
              <div key={title} className={`glass-hover relative overflow-hidden p-6 border ${border}`}>
                {/* Gradient bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-40 rounded-2xl`} />
                <div className="relative z-10">
                  <div className="text-4xl mb-5">{icon}</div>
                  <h3 className="font-semibold text-lg mb-3">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">{desc}</p>
                  <Link to="/programs" className={`inline-flex items-center gap-1.5 text-sm font-medium ${isYSDI ? 'text-ysdi-light' : 'text-primary-400'}`}>
                    Learn more <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY ═══ */}
      <section className="section relative overflow-hidden">
        <div className="orb w-96 h-96 -left-48 top-1/2 -translate-y-1/2 bg-primary/8" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="relative order-2 lg:order-1">
            <div className="glass rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=700&q=80"
                alt="Community dialogue"
                className="w-full h-[420px] object-cover opacity-90"
              />
            </div>
            {/* floating card */}
            <div className="absolute -bottom-6 -right-6 glass px-6 py-4 rounded-2xl shadow-glass max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isYSDI ? 'bg-ysdi-light' : 'bg-primary-400'}`} />
                <span className="text-xs text-white/50">Founded by</span>
              </div>
              <p className="font-semibold text-sm">Ayotunde Aboderin</p>
              <p className="text-white/40 text-xs mt-0.5">Youth Advocate & Social Impact Leader</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className={`text-sm font-semibold uppercase tracking-widest mb-4 ${isYSDI ? 'text-ysdi-light' : 'text-primary-400'}`}>
              Our Purpose
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              Why <span className={isYSDI ? 'text-gradient-ysdi' : 'text-gradient'}>{isYSDI ? 'YSDI' : 'AmpliYouth'}</span> Exists
            </h2>

            {[
              { title: 'Bridging the Gap', text: 'Extraordinary leadership potential exists across Africa, yet access to platforms, mentorship, and support remains deeply unequal.' },
              { title: 'Our Approach', text: 'We work at the intersection of advocacy, leadership development, storytelling, and community action — practical, not theoretical.' },
              { title: 'Pan-African Vision', text: 'From Nigeria to Kenya, Ghana to South Africa — we believe talent and purpose should never be limited by geography.' },
            ].map(({ title, text }) => (
              <div key={title} className="flex gap-4 mb-6">
                <div className={`w-1 rounded-full flex-shrink-0 mt-1 ${isYSDI ? 'bg-ysdi' : 'bg-primary'}`} style={{ height: 'auto', minHeight: '52px' }} />
                <div>
                  <h4 className="font-semibold mb-1.5">{title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}

            <Link to="/about" className={`mt-4 inline-flex items-center gap-2 font-semibold text-sm ${isYSDI ? 'text-ysdi-light' : 'text-primary-400'} hover:gap-3 transition-all`}>
              Read our full story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section relative overflow-hidden">
        <div className="orb w-80 h-80 top-0 right-1/4 bg-accent/6" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className={`text-sm font-semibold uppercase tracking-widest mb-4 ${isYSDI ? 'text-ysdi-light' : 'text-primary-400'}`}>
              Voices from the Community
            </p>
            <h2 className="text-4xl font-bold">What Our Alumni Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ text, name, role, avatar }) => (
              <div key={name} className="glass-hover p-8">
                <div className="flex mb-5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-white/65 text-sm leading-relaxed mb-6">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                    isYSDI ? 'bg-gradient-to-br from-ysdi to-ysdi-dark' : 'bg-gradient-to-br from-primary to-primary-700'
                  }`}>{avatar}</div>
                  <div>
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-white/35 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`glass rounded-3xl p-14 relative overflow-hidden border ${isYSDI ? 'border-ysdi/20' : 'border-primary/20'}`}>
            <div className={`orb w-64 h-64 -top-20 -right-20 ${isYSDI ? 'bg-ysdi/25' : 'bg-primary/20'}`} />
            <div className={`orb w-48 h-48 -bottom-16 -left-16 ${isYSDI ? 'bg-ysdi/15' : 'bg-primary/15'}`} />
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to <span className={isYSDI ? 'text-gradient-ysdi' : 'text-gradient'}>Amplify</span> Your Impact?
              </h2>
              <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
                Join thousands of young changemakers already transforming their communities across Africa.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to={isYSDI ? '/programs' : '/academy'} className={isYSDI ? 'btn-ysdi' : 'btn-primary'}>
                  Get Started Today <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-ghost">Partner With Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
