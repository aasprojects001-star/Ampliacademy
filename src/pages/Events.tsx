import { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Wifi } from 'lucide-react'
import { getDomain } from '../lib/domain'
import { supabase } from '../lib/supabase'

export default function Events() {
  const [filter, setFilter] = useState<'all'|'upcoming'|'past'>('all')
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const domain = getDomain()
  const isYSDI = domain === 'ysdi'
  const accent      = isYSDI ? 'text-gradient-ysdi' : 'text-gradient'
  const accentLabel = isYSDI ? 'text-ysdi-light'    : 'text-primary-400'
  const accentBg    = isYSDI ? 'bg-ysdi'            : 'bg-primary'

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('published', true)
        .order('date', { ascending: true })
      setEvents(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const now = new Date()
  const filtered = events.filter(e => {
    if (filter === 'all') return true
    if (!e.date) return filter === 'upcoming'
    const d = new Date(e.date)
    return filter === 'upcoming' ? d >= now : d < now
  })

  return (
    <>
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className={`orb w-80 h-80 top-0 right-0 ${isYSDI ? 'bg-ysdi/12' : 'bg-primary/10'}`} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${accentLabel}`}>Events</p>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Where <span className={accent}>Change</span> Happens</h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto">Summits, workshops, bootcamps, and forums — join us in person or online.</p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-10">
            {(['all','upcoming','past'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${filter===f ? `${accentBg} text-white` : 'glass text-white/50 hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-24"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"/></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 glass rounded-3xl">
              <div className="text-5xl mb-4">📅</div>
              <p className="text-white/40 font-medium">No events found.</p>
              <p className="text-white/20 text-sm mt-2">Check back soon or switch filter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(event => {
                const isUpcoming = event.date ? new Date(event.date) >= now : true
                return (
                  <div key={event.id} className="glass-hover overflow-hidden group">
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      {event.image_url
                        ? <img src={event.image_url} alt={event.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"/>
                        : <span className="text-6xl">📅</span>
                      }
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isUpcoming ? `${accentBg} text-white` : 'glass text-white/60'}`}>
                          {isUpcoming ? 'Upcoming' : 'Past'}
                        </span>
                        {event.virtual && <span className="text-xs font-semibold px-3 py-1 rounded-full glass text-white/60 flex items-center gap-1"><Wifi size={10}/> Virtual</span>}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-3 leading-snug">{event.title}</h3>
                      {event.description && <p className="text-white/45 text-sm leading-relaxed mb-4 line-clamp-2">{event.description}</p>}
                      <div className="space-y-2 mb-5">
                        {event.date && (
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <Calendar size={13} className={accentLabel}/>
                            {new Date(event.date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <MapPin size={13} className={accentLabel}/>{event.location}
                          </div>
                        )}
                      </div>
                      {isUpcoming && (
                        <button className={`w-full text-sm font-semibold py-2.5 rounded-xl transition-all ${isYSDI ? 'btn-ysdi' : 'btn-primary'} justify-center`}>
                          Register Now
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
