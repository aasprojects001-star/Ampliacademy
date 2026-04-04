import { useState } from 'react'
import { Search, MessageCircle, MapPin, Users } from 'lucide-react'

const members = [
  { id:1, name:'Amina Sule', role:'Academy Graduate', country:'Nigeria', cohort:'Cohort 3', avatar:'AS', tags:['Advocacy','Policy'], online:true },
  { id:2, name:'Joseph Kamau', role:'Campus Ambassador', country:'Kenya', cohort:'Ambassador', avatar:'JK', tags:['Organising','Leadership'], online:false },
  { id:3, name:'Fatou Diallo', role:'Academy Member', country:'Senegal', cohort:'Cohort 4', avatar:'FD', tags:['Media','Storytelling'], online:true },
  { id:4, name:'Kwame Asante', role:'Academy Graduate', country:'Ghana', cohort:'Cohort 2', avatar:'KA', tags:['Business','Innovation'], online:false },
  { id:5, name:'Zara Mohammed', role:'Campus Ambassador', country:'Sudan', cohort:'Ambassador', avatar:'ZM', tags:['Policy','Gender'], online:true },
  { id:6, name:'Chidi Obi', role:'Mentee', country:'Nigeria', cohort:'Cohort 5', avatar:'CO', tags:['Tech','Advocacy'], online:true },
  { id:7, name:'Ayana Bekele', role:'Academy Graduate', country:'Ethiopia', cohort:'Cohort 3', avatar:'AB', tags:['Community','Health'], online:false },
  { id:8, name:'Musa Traore', role:'Academy Member', country:'Mali', cohort:'Cohort 5', avatar:'MT', tags:['Climate','Agriculture'], online:false },
]

const colors = ['from-emerald-500 to-teal-600','from-blue-500 to-indigo-600','from-rose-500 to-pink-600','from-purple-500 to-violet-600','from-amber-500 to-orange-500','from-cyan-500 to-sky-600','from-lime-500 to-green-600','from-fuchsia-500 to-pink-600']

export default function AcademyNetwork() {
  const [search, setSearch] = useState('')
  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.country.toLowerCase().includes(search.toLowerCase()) ||
    m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold mb-2">The <span className="text-gradient">Network</span></h1>
          <p className="text-white/45">Connect with fellow learners, alumni, and ambassadors across Africa.</p>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input className="input-glass pl-10 w-64" placeholder="Search by name, country, skills..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { value:'5,200+', label:'Community Members' },
          { value:'15', label:'Countries Represented' },
          { value:'200+', label:'Campus Ambassadors' },
        ].map(({ value, label }) => (
          <div key={label} className="glass rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-gradient mb-1">{value}</p>
            <p className="text-white/40 text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((m, i) => (
          <div key={m.id} className="glass-hover p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold bg-gradient-to-br ${colors[i % colors.length]}`}>
                  {m.avatar}
                </div>
                {m.online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-dark-bg" />}
              </div>
              <div>
                <p className="font-semibold text-sm">{m.name}</p>
                <p className="text-white/35 text-xs">{m.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/35 mb-3">
              <MapPin size={11} />{m.country}
              <span className="text-white/20">·</span>
              <Users size={11} />{m.cohort}
            </div>
            <div className="flex flex-wrap gap-1 mb-4">
              {m.tags.map(t => <span key={t} className="text-[10px] glass px-2 py-0.5 rounded-full text-white/45">{t}</span>)}
            </div>
            <button className="w-full flex items-center justify-center gap-1.5 glass py-2 rounded-xl text-xs text-white/50 hover:text-white transition-all">
              <MessageCircle size={12} /> Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
