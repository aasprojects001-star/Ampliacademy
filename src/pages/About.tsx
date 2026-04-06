import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Target, Eye, Zap } from 'lucide-react'
import { getDomain } from '../lib/domain'
import { supabase } from '../lib/supabase'

const values = [
  { icon: Heart,  title: 'Equity First',   desc: 'We believe geography and background should never determine a young person\'s ability to lead.' },
  { icon: Target, title: 'Impact-Driven',  desc: 'Every program, initiative, and resource is designed with measurable, real-world impact in mind.' },
  { icon: Eye,    title: 'Transparency',   desc: 'We operate with full accountability to our community, our partners, and the young people we serve.' },
  { icon: Zap,    title: 'Innovation',     desc: 'We embrace creative problem-solving and bold new approaches to development and advocacy.' },
]

export default function About() {
  const domain = getDomain()
  const isYSDI = domain === 'ysdi'
  const accent      = isYSDI ? 'text-gradient-ysdi' : 'text-gradient'
  const accentLabel = isYSDI ? 'text-ysdi-light'    : 'text-primary-400'
  const accentBorder= isYSDI ? 'border-ysdi/20'     : 'border-primary/20'

  const [content, setContent] = useState<Record<string,string>>({
    mission:     'To educate, empower, and amplify socially conscious young people by providing leadership training, advocacy skills, mentorship, and access to platforms that enable them to drive justice, equity, and sustainable development.',
    vision:      'A generation of principled, resilient, and creative youth leaders shaping policies, narratives, and communities at local, national, and global levels.',
    founder_bio: 'Ayotunde Aboderin is a youth advocate and social impact leader committed to expanding access to leadership development and advocacy platforms for young people across Africa.',
    about_body:  'The Academy operates as both a training platform and a movement — supporting young people to develop the knowledge, skills, and confidence required to influence systems, shape public discourse, and lead community-driven solutions.',
  })

  useEffect(() => {
    supabase.from('site_content').select('key, value').then(({ data }) => {
      if (data && data.length > 0) {
        const map: Record<string,string> = {}
        data.forEach(row => { map[row.key] = row.value })
        setContent(prev => ({ ...prev, ...map }))
      }
    })
  }, [])

  return (
    <>
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        <div className={`orb w-96 h-96 -top-32 right-0 ${isYSDI ? 'bg-ysdi/15' : 'bg-primary/12'}`} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${accentLabel}`}>Who We Are</p>
          <h1 className="text-5xl lg:text-6xl font-bold mb-8">
            About <span className={accent}>{isYSDI ? 'YSDI Initiative' : 'AmpliYouth'}</span>
          </h1>
          <p className="text-white/55 text-xl leading-relaxed max-w-2xl mx-auto">{content.about_body}</p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${accentLabel}`}>Our Story</p>
            <h2 className="text-4xl font-bold mb-8">Built from a <span className={accent}>Deep Belief</span> in Youth Potential</h2>
            <div className="space-y-5 text-white/55 leading-relaxed">
              <p>{content.about_body}</p>
              <p>Across Africa, extraordinary leadership potential exists in rural communities, informal settlements, conflict-affected regions, and overlooked spaces. Yet access to platforms, mentorship, and institutional support remains deeply unequal.</p>
              <p>AmpliYouth was created to bridge this gap — ensuring that talent, integrity, and purpose are not limited by geography or socioeconomic background.</p>
            </div>
          </div>
          <div className="relative">
            <div className="glass rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80" alt="Leadership" className="w-full h-96 object-cover opacity-90" />
            </div>
            <div className={`absolute -bottom-6 -left-6 glass px-6 py-5 rounded-2xl border ${accentBorder}`}>
              <p className={`text-3xl font-bold ${accent}`}>2020</p>
              <p className="text-white/45 text-sm">Year founded</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          <div className={`glass-primary p-10 rounded-3xl border ${accentBorder}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-6 ${isYSDI ? 'bg-ysdi/20' : 'bg-primary/20'}`}>🎯</div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-white/55 leading-relaxed">{content.mission}</p>
          </div>
          <div className="glass p-10 rounded-3xl">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-6 ${isYSDI ? 'bg-ysdi/20' : 'bg-primary/20'}`}>👁️</div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-white/55 leading-relaxed">{content.vision}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className={`text-sm font-semibold uppercase tracking-widest mb-4 ${accentLabel}`}>What We Stand For</p>
            <h2 className="text-4xl font-bold">Our Core <span className={accent}>Values</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-hover p-7">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${isYSDI ? 'bg-ysdi/20' : 'bg-primary/20'}`}>
                  <Icon size={22} className={accentLabel} />
                </div>
                <h4 className="font-semibold text-lg mb-3">{title}</h4>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto text-center">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${accentLabel}`}>Founding Story</p>
          <h2 className="text-4xl font-bold mb-8">Founded By</h2>
          <div className={`glass rounded-3xl p-10 border ${accentBorder}`}>
            <div className={`w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl font-bold ${isYSDI ? 'bg-gradient-to-br from-ysdi to-ysdi-dark' : 'bg-gradient-to-br from-primary to-primary-700'}`}>AA</div>
            <h3 className="text-2xl font-bold mb-2">Ayotunde Aboderin</h3>
            <p className={`text-sm font-medium mb-5 ${accentLabel}`}>Founder & CEO</p>
            <p className="text-white/55 leading-relaxed max-w-2xl mx-auto">{content.founder_bio}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`max-w-3xl mx-auto glass rounded-3xl p-12 text-center border ${accentBorder} relative overflow-hidden`}>
          <div className={`orb w-48 h-48 -top-12 -right-12 ${isYSDI ? 'bg-ysdi/20' : 'bg-primary/15'}`} />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-5">Be Part of the <span className={accent}>Movement</span></h2>
            <p className="text-white/50 mb-8">Join us in building the next generation of African changemakers.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/get-involved" className={isYSDI ? 'btn-ysdi' : 'btn-primary'}>Get Involved <ArrowRight size={16} /></Link>
              <Link to="/contact" className="btn-ghost">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
