import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Users, BookOpen, Star, TrendingUp } from 'lucide-react'
import { getDomain } from '../lib/domain'

const mentors = [
  { name: 'Dr. Chioma Adeyemi', role: 'Policy Analyst · UN', expertise: ['Policy','Public Health','Gender'], avatar: 'CA', rating: 4.9, mentees: 12 },
  { name: 'Emeka Okafor', role: 'Social Entrepreneur', expertise: ['Business','Innovation','Youth Dev'], avatar: 'EO', rating: 5.0, mentees: 8 },
  { name: 'Fatima Al-Hassan', role: 'Climate Activist & Author', expertise: ['Climate','Advocacy','Writing'], avatar: 'FA', rating: 4.8, mentees: 15 },
  { name: 'Prof. James Mwangi', role: 'Academic · University of Nairobi', expertise: ['Research','Leadership','Policy'], avatar: 'JM', rating: 4.9, mentees: 10 },
]

export default function Mentorship() {
  const domain = getDomain()
  const isYSDI = domain === 'ysdi'
  const accent = isYSDI ? 'text-gradient-ysdi' : 'text-gradient'
  const accentLabel = isYSDI ? 'text-ysdi-light' : 'text-primary-400'
  const accentBorder = isYSDI ? 'border-ysdi/20' : 'border-primary/20'
  const accentBg = isYSDI ? 'bg-ysdi/20' : 'bg-primary/20'

  return (
    <>
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        <div className={`orb w-96 h-96 -top-32 right-0 ${isYSDI ? 'bg-ysdi/15' : 'bg-primary/10'}`} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${accentLabel}`}>Mentorship</p>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Learn from Those Who <span className={accent}>Walked the Path</span>
          </h1>
          <p className="text-white/55 text-xl max-w-2xl mx-auto mb-10">
            Our structured mentorship program pairs ambitious young Africans with experienced leaders across business, policy, activism, and the arts.
          </p>
          <Link to="/academy/mentors" className={isYSDI ? 'btn-ysdi' : 'btn-primary'}>
            Find a Mentor <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">How the <span className={accent}>Mentorship</span> Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Apply & Match', desc: 'Tell us your goals and we match you with a mentor based on your field, interests, and personality.' },
              { step: '02', title: 'Onboarding', desc: 'Attend orientation, set your goals with your mentor, and agree on a communication rhythm.' },
              { step: '03', title: '6-Month Journey', desc: 'Meet monthly (minimum), complete assignments, attend group sessions, and track your progress.' },
              { step: '04', title: 'Graduate & Give Back', desc: 'Complete the program, receive your certificate, and optionally become a mentor yourself.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="glass-hover p-7 text-center">
                <div className={`text-5xl font-bold mb-5 ${accent}`}>{step}</div>
                <h3 className="font-semibold text-lg mb-3">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${accentLabel}`}>What You Get</p>
            <h2 className="text-4xl font-bold mb-8">Everything You Need to <span className={accent}>Grow</span></h2>
            <div className="space-y-4">
              {[
                'Dedicated mentor matched to your goals and sector',
                'Monthly 1-on-1 sessions (video or in-person)',
                'Access to AmpliYouth Academy courses and ebooks',
                'Peer cohort of fellow mentees for community',
                'Guest speaker sessions and workshops',
                'Accountability check-ins and progress tracking',
                'Certificate upon completion',
                'Alumni network access',
              ].map(item => (
                <div key={item} className="flex items-start gap-3 text-sm text-white/65">
                  <CheckCircle size={17} className={`mt-0.5 flex-shrink-0 ${accentLabel}`} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80" alt="Mentorship session" className="w-full h-[440px] object-cover opacity-85" />
          </div>
        </div>
      </section>

      {/* Featured mentors */}
      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Meet Some of Our <span className={accent}>Mentors</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {mentors.map(m => (
              <div key={m.name} className="glass-hover p-6 text-center">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-xl font-bold ${isYSDI ? 'bg-gradient-to-br from-ysdi to-ysdi-dark' : 'bg-gradient-to-br from-primary to-primary-700'}`}>
                  {m.avatar}
                </div>
                <h4 className="font-semibold mb-1">{m.name}</h4>
                <p className={`text-xs mb-3 ${accentLabel}`}>{m.role}</p>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {m.expertise.map(e => (
                    <span key={e} className="text-[10px] glass px-2 py-0.5 rounded-full text-white/50">{e}</span>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" /> {m.rating}</span>
                  <span className="flex items-center gap-1"><Users size={11} /> {m.mentees} mentees</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/academy/mentors" className={isYSDI ? 'btn-ysdi' : 'btn-primary'}>
              View All Mentors <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
