import { useState } from 'react'
import { Play, Clock, Users, Star, Lock, BookOpen } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const courses = [
  { id:1, title:'Introduction to Advocacy', mentor:'Dr. Chioma Adeyemi', category:'Advocacy', level:'Beginner', duration:'4h 30m', students:342, rating:4.9, modules:8, img:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80', free:true },
  { id:2, title:'Leadership Foundations for Young Africans', mentor:'Emeka Okafor', category:'Leadership', level:'Beginner', duration:'6h 15m', students:289, rating:4.8, modules:12, img:'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=400&q=80', free:true },
  { id:3, title:'Policy Writing & Analysis', mentor:'Prof. James Mwangi', category:'Policy', level:'Intermediate', duration:'5h', students:198, rating:4.9, modules:10, img:'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80', free:false },
  { id:4, title:'Community Organizing 101', mentor:'Fatima Al-Hassan', category:'Community', level:'Beginner', duration:'3h 45m', students:415, rating:5.0, modules:7, img:'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&q=80', free:true },
  { id:5, title:'Public Speaking for Change-Makers', mentor:'Dr. Chioma Adeyemi', category:'Communication', level:'All Levels', duration:'4h', students:521, rating:4.9, modules:9, img:'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80', free:false },
  { id:6, title:'Social Media & Digital Advocacy', mentor:'Emeka Okafor', category:'Digital', level:'Intermediate', duration:'3h 30m', students:376, rating:4.7, modules:8, img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80', free:false },
]

const categories = ['All', 'Advocacy', 'Leadership', 'Policy', 'Community', 'Communication', 'Digital']
const levelColors: Record<string, string> = { Beginner:'text-emerald-400', Intermediate:'text-amber-400', 'All Levels':'text-blue-400' }

export default function AcademyCourses() {
  const [cat, setCat] = useState('All')
  const { isMentor } = useAuth()
  const filtered = cat === 'All' ? courses : courses.filter(c => c.category === cat)

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold mb-2">Academy <span className="text-gradient">Courses</span></h1>
          <p className="text-white/45">Learn from expert mentors — at your own pace.</p>
        </div>
        {isMentor() && (
          <button className="btn-primary text-sm">+ Add Course</button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${cat === c ? 'bg-primary text-white' : 'glass text-white/50 hover:text-white'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(course => (
          <div key={course.id} className="glass-hover overflow-hidden group">
            <div className="relative h-44 overflow-hidden">
              <img src={course.img} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/70 to-transparent" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full glass ${levelColors[course.level]}`}>{course.level}</span>
                {course.free && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/80 text-white">Free</span>}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full glass flex items-center justify-center">
                  {course.free ? <Play size={22} className="fill-white ml-1" /> : <Lock size={18} />}
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-xs text-primary-400 font-semibold mb-2">{course.category}</p>
              <h3 className="font-bold text-lg leading-snug mb-2">{course.title}</h3>
              <p className="text-white/40 text-sm mb-4">by {course.mentor}</p>
              <div className="flex items-center gap-4 text-xs text-white/35 mb-5">
                <span className="flex items-center gap-1"><Clock size={12} />{course.duration}</span>
                <span className="flex items-center gap-1"><BookOpen size={12} />{course.modules} modules</span>
                <span className="flex items-center gap-1"><Users size={12} />{course.students}</span>
                <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" />{course.rating}</span>
              </div>
              <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${course.free ? 'btn-primary justify-center' : 'glass text-white/60 hover:text-white'}`}>
                {course.free ? 'Start Course' : '🔒 Enrolled Users Only'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
