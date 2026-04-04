import { useState } from 'react'
import { Star, Users, MessageCircle, Search, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const mentors = [
  { id:1, name:'Dr. Chioma Adeyemi', role:'Policy Analyst · UNDP', bio:'10 years in international development policy. Passionate about youth-led governance reform.', expertise:['Policy','Public Health','Gender Rights'], rating:4.9, mentees:12, available:true, avatar:'CA', country:'Nigeria' },
  { id:2, name:'Emeka Okafor', role:'Social Entrepreneur & Investor', bio:'Founded 3 youth-focused enterprises. Now mentoring the next generation of African entrepreneurs.', expertise:['Business','Innovation','Fundraising'], rating:5.0, mentees:8, available:true, avatar:'EO', country:'Nigeria' },
  { id:3, name:'Fatima Al-Hassan', role:'Climate Activist & Author', bio:'Published author and award-winning climate advocate. Led youth delegations at COP27 and COP28.', expertise:['Climate','Advocacy','Writing'], rating:4.8, mentees:15, available:false, avatar:'FA', country:'Ghana' },
  { id:4, name:'Prof. James Mwangi', role:'Academic · University of Nairobi', bio:'Professor of Political Science and author of 4 books on African governance and youth leadership.', expertise:['Research','Leadership','Policy'], rating:4.9, mentees:10, available:true, avatar:'JM', country:'Kenya' },
  { id:5, name:'Aisha Diallo', role:'Media Professional · BBC Africa', bio:'Journalist and media trainer helping young Africans amplify their stories through broadcast media.', expertise:['Journalism','Media','Storytelling'], rating:4.7, mentees:6, available:true, avatar:'AD', country:'Senegal' },
  { id:6, name:'Victor Nwosu', role:'Tech Entrepreneur · YC Alumni', bio:'Built and scaled two African startups. Mentor at Y Combinator and Google for Startups.', expertise:['Tech','Startups','Fundraising'], rating:4.9, mentees:9, available:true, avatar:'VN', country:'Nigeria' },
]

const avatarColors = ['from-emerald-500 to-teal-600','from-blue-500 to-indigo-600','from-rose-500 to-pink-600','from-purple-500 to-violet-600','from-amber-500 to-orange-500','from-cyan-500 to-sky-600']

export default function AcademyMentors() {
  const [search, setSearch] = useState('')
  const [requested, setRequested] = useState<number[]>([])

  const filtered = mentors.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.expertise.some(e => e.toLowerCase().includes(search.toLowerCase())) ||
    m.country.toLowerCase().includes(search.toLowerCase())
  )

  const handleRequest = (id: number, name: string) => {
    setRequested(prev => [...prev, id])
    toast.success(`Mentorship request sent to ${name}! We'll be in touch.`)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold mb-2">Find a <span className="text-gradient">Mentor</span></h1>
          <p className="text-white/45">Connect with experienced leaders ready to guide your journey.</p>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input className="input-glass pl-10 w-64" placeholder="Search mentors..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((m, i) => (
          <div key={m.id} className="glass-hover p-7">
            <div className="flex items-start gap-4 mb-5">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0 bg-gradient-to-br ${avatarColors[i % avatarColors.length]}`}>
                {m.avatar}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{m.name}</h3>
                <p className="text-primary-400 text-xs font-medium mt-0.5">{m.role}</p>
                <p className="text-white/35 text-xs mt-0.5">{m.country}</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">{m.bio}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {m.expertise.map(e => (
                <span key={e} className="text-xs px-2.5 py-1 glass rounded-full text-white/55">{e}</span>
              ))}
            </div>
            <div className="flex items-center gap-5 text-xs text-white/35 mb-5">
              <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" />{m.rating}</span>
              <span className="flex items-center gap-1"><Users size={12} />{m.mentees} mentees</span>
              <span className={`flex items-center gap-1 ${m.available ? 'text-emerald-400' : 'text-red-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${m.available ? 'bg-emerald-400' : 'bg-red-400'}`} />
                {m.available ? 'Available' : 'Full'}
              </span>
            </div>
            {requested.includes(m.id) ? (
              <div className="w-full flex items-center justify-center gap-2 glass py-2.5 rounded-xl text-sm text-emerald-400">
                <CheckCircle size={15} /> Request Sent
              </div>
            ) : (
              <button
                onClick={() => handleRequest(m.id, m.name)}
                disabled={!m.available}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  m.available ? 'btn-primary justify-center' : 'glass text-white/30 cursor-not-allowed'
                }`}
              >
                <MessageCircle size={14} />
                {m.available ? 'Request Mentorship' : 'Currently Unavailable'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
