import { useState } from 'react'
import { Calendar, MapPin, Clock, ArrowRight, Filter } from 'lucide-react'
import { getDomain } from '../lib/domain'

const events = [
  {
    id: 1, category: 'upcoming',
    title: 'AmpliYouth Leadership Summit 2025',
    date: '2025-03-15', time: '9:00 AM WAT',
    location: 'Lagos, Nigeria', virtual: false,
    desc: 'Our flagship annual summit bringing together young leaders, mentors, policymakers, and change agents from across Africa for two days of intensive learning and networking.',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    tag: 'Summit',
  },
  {
    id: 2, category: 'upcoming',
    title: 'Advocacy Masterclass: Policy & Public Voice',
    date: '2025-02-20', time: '3:00 PM WAT',
    location: 'Online', virtual: true,
    desc: 'A practical deep-dive into how young people can engage with policymakers, write compelling briefs, and use media to influence public discourse.',
    img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
    tag: 'Masterclass',
  },
  {
    id: 3, category: 'upcoming',
    title: 'Campus Ambassador Bootcamp',
    date: '2025-02-28', time: '10:00 AM WAT',
    location: 'Abuja, Nigeria', virtual: false,
    desc: 'Intensive two-day training for campus ambassador leads, covering community organizing, event planning, and leadership development frameworks.',
    img: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&q=80',
    tag: 'Training',
  },
  {
    id: 4, category: 'past',
    title: 'Youth & Climate Action Forum',
    date: '2024-11-10', time: '9:00 AM WAT',
    location: 'Nairobi, Kenya', virtual: false,
    desc: 'A cross-border forum exploring how African youth can lead sustainable development and climate solutions in their communities.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    tag: 'Forum',
  },
  {
    id: 5, category: 'past',
    title: 'Mentorship Matching Day — Cohort 4',
    date: '2024-10-05', time: '2:00 PM WAT',
    location: 'Online', virtual: true,
    desc: 'The official launch event for Cohort 4 of the AmpliYouth Mentorship Program, where mentees met their assigned mentors for the first time.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    tag: 'Program',
  },
]

export default function Events() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')
  const domain = getDomain()
  const isYSDI = domain === 'ysdi'
  const accent = isYSDI ? 'text-gradient-ysdi' : 'text-gradient'
  const accentLabel = isYSDI ? 'text-ysdi-light' : 'text-primary-400'
  const accentBg = isYSDI ? 'bg-ysdi' : 'bg-primary'
  const accentBorder = isYSDI ? 'border-ysdi/30' : 'border-primary/30'

  const filtered = filter === 'all' ? events : events.filter(e => e.category === filter)

  return (
    <>
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className={`orb w-80 h-80 top-0 right-0 ${isYSDI ? 'bg-ysdi/12' : 'bg-primary/10'}`} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${accentLabel}`}>Events</p>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Where <span className={accent}>Change</span> Happens
          </h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto">Summits, workshops, bootcamps, and forums — join us in person or online.</p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="max-w-7xl mx-auto">
          {/* Filter */}
          <div className="flex items-center gap-2 mb-10">
            <Filter size={16} className="text-white/30" />
            {(['all', 'upcoming', 'past'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                  filter === f
                    ? `${accentBg} text-white shadow-glow`
                    : 'glass text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(event => (
              <div key={event.id} className="glass-hover overflow-hidden group">
                <div className="relative overflow-hidden h-48">
                  <img src={event.img} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${event.category === 'upcoming' ? `${accentBg} text-white` : 'glass text-white/60'}`}>
                      {event.tag}
                    </span>
                    {event.virtual && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full glass text-white/60">Virtual</span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-3 leading-snug">{event.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-5 line-clamp-2">{event.desc}</p>
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <Calendar size={13} className={accentLabel} />
                      {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <Clock size={13} className={accentLabel} />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <MapPin size={13} className={accentLabel} />
                      {event.location}
                    </div>
                  </div>
                  {event.category === 'upcoming' && (
                    <button className={`w-full text-sm font-semibold py-2.5 rounded-xl transition-all ${isYSDI ? 'btn-ysdi' : 'btn-primary'} justify-center`}>
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/30">
              <Calendar size={48} className="mx-auto mb-4 opacity-30" />
              <p>No events found for this filter.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
