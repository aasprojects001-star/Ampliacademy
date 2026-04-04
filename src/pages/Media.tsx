import { useState } from 'react'
import { Play, Image, FileText, Newspaper, ArrowRight, ExternalLink } from 'lucide-react'
import { getDomain } from '../lib/domain'

const mediaItems = [
  { id:1, type:'article', title:'Why Africa\'s Youth Must Lead the Climate Conversation', excerpt:'Young people are disproportionately affected by climate change, yet rarely represented in decision-making rooms...', img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', date:'Jan 2025', author:'AmpliYouth Team' },
  { id:2, type:'video', title:'Leadership Summit 2024 Highlights', excerpt:'Relive the energy from our biggest summit yet — featuring keynotes, panels, and breakthrough moments.', img:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', date:'Dec 2024', author:'AmpliYouth Media' },
  { id:3, type:'gallery', title:'Campus Ambassador Bootcamp — Lagos 2024', excerpt:'Photos from our intensive two-day bootcamp for campus leads across Nigeria.', img:'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&q=80', date:'Nov 2024', author:'AmpliYouth' },
  { id:4, type:'article', title:'The Power of Youth Advocacy in Policy Reform', excerpt:'How young people are increasingly shaping legislation across the African continent...', img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80', date:'Oct 2024', author:'Ayotunde Aboderin' },
  { id:5, type:'flyer', title:'Apply Now — Cohort 5 Open', excerpt:'Applications are now open for the AmpliYouth Leadership Academy Cohort 5. Deadline March 1, 2025.', img:'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80', date:'Jan 2025', author:'AmpliYouth' },
  { id:6, type:'video', title:'Student Voices: What AmpliYouth Meant to Me', excerpt:'Five alumni share how the academy transformed their perspective and opened unexpected doors.', img:'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80', date:'Sep 2024', author:'AmpliYouth Media' },
]

const typeConfig: Record<string, { icon: any; label: string; color: string }> = {
  article: { icon: Newspaper, label: 'Article', color: 'text-blue-400' },
  video:   { icon: Play,      label: 'Video',   color: 'text-rose-400' },
  gallery: { icon: Image,     label: 'Gallery',  color: 'text-amber-400' },
  flyer:   { icon: FileText,  label: 'Flyer',    color: 'text-purple-400' },
}

export default function Media() {
  const [filter, setFilter] = useState<'all'|'article'|'video'|'gallery'|'flyer'>('all')
  const domain = getDomain()
  const isYSDI = domain === 'ysdi'
  const accent = isYSDI ? 'text-gradient-ysdi' : 'text-gradient'
  const accentLabel = isYSDI ? 'text-ysdi-light' : 'text-primary-400'
  const accentBg = isYSDI ? 'bg-ysdi' : 'bg-primary'

  const filtered = filter === 'all' ? mediaItems : mediaItems.filter(m => m.type === filter)

  return (
    <>
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className={`orb w-80 h-80 -top-24 right-0 ${isYSDI ? 'bg-ysdi/12' : 'bg-primary/8'}`} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${accentLabel}`}>Media</p>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Stories, <span className={accent}>Impact</span> & Insight
          </h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto">Articles, videos, galleries, and announcements from across the AmpliYouth community.</p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {(['all', 'article', 'video', 'gallery', 'flyer'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                  filter === f ? `${accentBg} text-white` : 'glass text-white/50 hover:text-white'
                }`}
              >
                {f === 'all' ? 'All Media' : f}
              </button>
            ))}
          </div>

          {/* Featured article */}
          {filter === 'all' && (
            <div className="glass-hover overflow-hidden grid lg:grid-cols-2 mb-6 group">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img src={mediaItems[0].img} alt={mediaItems[0].title} className="w-full h-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-bg/50" />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <span className={`text-xs font-semibold uppercase tracking-wider mb-4 ${accentLabel}`}>Featured</span>
                <h2 className="text-2xl font-bold mb-4 leading-snug">{mediaItems[0].title}</h2>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{mediaItems[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{mediaItems[0].author}</p>
                    <p className="text-xs text-white/35">{mediaItems[0].date}</p>
                  </div>
                  <button className={`inline-flex items-center gap-1.5 text-sm font-semibold ${accentLabel}`}>
                    Read More <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(filter === 'all' ? filtered.slice(1) : filtered).map(item => {
              const { icon: TypeIcon, label, color } = typeConfig[item.type]
              return (
                <div key={item.id} className="glass-hover overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent" />
                    <div className={`absolute top-3 left-3 flex items-center gap-1.5 glass px-3 py-1 rounded-full text-xs font-medium ${color}`}>
                      <TypeIcon size={12} />
                      {label}
                    </div>
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                          <Play size={20} className="fill-white ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold leading-snug mb-2">{item.title}</h3>
                    <p className="text-white/40 text-sm line-clamp-2 mb-4">{item.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-white/30">
                      <span>{item.author}</span>
                      <div className="flex items-center gap-1">
                        <span>{item.date}</span>
                        <ExternalLink size={11} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
