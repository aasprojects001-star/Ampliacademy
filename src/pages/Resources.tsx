import { BookOpen, Download, ExternalLink, Search, FileText, Video, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'
import { getDomain } from '../lib/domain'

const resources = [
  { id:1, type:'guide', title:'Youth Advocacy Starter Pack', desc:'A comprehensive guide to understanding policy processes, building coalitions, and communicating your cause.', icon:'📋', tags:['Advocacy','Beginner'], downloadable:true },
  { id:2, type:'ebook', title:'Leadership Across Cultures: African Perspectives', desc:'An exploration of indigenous leadership models and how they can inform modern community organizing.', icon:'📖', tags:['Leadership','Culture'], downloadable:true },
  { id:3, type:'template', title:'Community Project Proposal Template', desc:'A ready-to-use template for writing compelling project proposals to funders and government bodies.', icon:'📝', tags:['Templates','Funding'], downloadable:true },
  { id:4, type:'video', title:'Public Speaking for Advocacy — Masterclass', desc:'A 3-part video series on how to craft and deliver compelling speeches at events and forums.', icon:'🎬', tags:['Public Speaking','Video'], downloadable:false },
  { id:5, type:'guide', title:'Social Media for Social Change', desc:'How to use Instagram, X (Twitter), and LinkedIn to amplify advocacy campaigns and build movements.', icon:'📱', tags:['Digital','Social Media'], downloadable:true },
  { id:6, type:'ebook', title:'Funding Your Youth Initiative', desc:'A practical guide to grants, crowdfunding, partnerships, and other funding mechanisms available to African youth orgs.', icon:'💰', tags:['Funding','Finance'], downloadable:true },
  { id:7, type:'template', title:'Campus Ambassador Event Kit', desc:'Everything you need to plan, run, and report on an AmpliYouth campus event, from logistics to documentation.', icon:'🎪', tags:['Ambassador','Events'], downloadable:true },
  { id:8, type:'video', title:'Policy Brief Writing Workshop Recording', desc:'Watch our policy writing workshop featuring guest trainers from the UN Youth Division.', icon:'🎥', tags:['Policy','Writing'], downloadable:false },
]

const typeColors: Record<string, string> = {
  guide: 'text-emerald-400', ebook: 'text-blue-400',
  template: 'text-purple-400', video: 'text-rose-400',
}

export default function Resources() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('all')
  const domain = getDomain()
  const isYSDI = domain === 'ysdi'
  const accent = isYSDI ? 'text-gradient-ysdi' : 'text-gradient'
  const accentLabel = isYSDI ? 'text-ysdi-light' : 'text-primary-400'
  const accentBg = isYSDI ? 'bg-ysdi' : 'bg-primary'

  const filtered = resources.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || r.type === filter
    return matchSearch && matchFilter
  })

  return (
    <>
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className={`orb w-80 h-80 -top-24 right-0 ${isYSDI ? 'bg-ysdi/12' : 'bg-primary/8'}`} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${accentLabel}`}>Resources</p>
          <h1 className="text-5xl font-bold mb-6">Free <span className={accent}>Learning</span> Resources</h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto mb-10">Guides, ebooks, templates, and videos to accelerate your leadership journey — all free.</p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-glass pl-11 w-full"
            />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {(['all','guide','ebook','template','video'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm capitalize font-medium transition-all ${
                  filter === f ? `${accentBg} text-white` : 'glass text-white/50 hover:text-white'
                }`}
              >
                {f === 'all' ? 'All Resources' : f + 's'}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map(r => (
              <div key={r.id} className="glass-hover p-6">
                <div className="text-3xl mb-4">{r.icon}</div>
                <div className={`text-xs font-semibold capitalize mb-2 ${typeColors[r.type]}`}>{r.type}</div>
                <h3 className="font-semibold mb-2 leading-snug">{r.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-4">{r.desc}</p>
                <div className="flex flex-wrap gap-1 mb-5">
                  {r.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 glass rounded-full text-white/40">{t}</span>
                  ))}
                </div>
                <button className={`w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl transition-all ${
                  r.downloadable
                    ? `${isYSDI ? 'glass-ysdi border-ysdi/30 text-ysdi-light' : 'glass-primary border-primary/30 text-primary-400'} border`
                    : 'glass text-white/50 hover:text-white'
                }`}>
                  {r.downloadable ? <><Download size={12} /> Download Free</> : <><Video size={12} /> Watch Now</>}
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/30">
              <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p>No resources found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
