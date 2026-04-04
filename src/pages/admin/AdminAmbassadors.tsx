import { useState } from 'react'
import { AdminLayout } from './AdminDashboard'
import { CheckCircle, XCircle, Send, Bell, Search, Filter, MapPin, University } from 'lucide-react'
import toast from 'react-hot-toast'

const ambassadors = [
  { id:1, name:'Joseph Kamau', email:'joseph@email.com', university:'University of Nairobi', country:'Kenya', appliedDate:'Jan 15, 2025', status:'approved', eventsHosted:3, studentsReached:124 },
  { id:2, name:'Fatou Diallo', email:'fatou@email.com', university:'Cheikh Anta Diop University', country:'Senegal', appliedDate:'Jan 18, 2025', status:'approved', eventsHosted:2, studentsReached:87 },
  { id:3, name:'Amina Sule', email:'amina@email.com', university:'Ahmadu Bello University', country:'Nigeria', appliedDate:'Jan 20, 2025', status:'pending', eventsHosted:0, studentsReached:0 },
  { id:4, name:'Kwame Asante', email:'kwame@email.com', university:'University of Ghana', country:'Ghana', appliedDate:'Jan 22, 2025', status:'pending', eventsHosted:0, studentsReached:0 },
  { id:5, name:'Zara Mohammed', email:'zara@email.com', university:'University of Khartoum', country:'Sudan', appliedDate:'Jan 10, 2025', status:'approved', eventsHosted:5, studentsReached:210 },
]

const statusColors: Record<string, string> = {
  approved: 'bg-emerald-400/10 text-emerald-400',
  pending:  'bg-amber-400/10 text-amber-400',
  rejected: 'bg-red-400/10 text-red-400',
}

export default function AdminAmbassadors() {
  const [list, setList] = useState(ambassadors)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all'|'pending'|'approved'>('all')
  const [announcement, setAnnouncement] = useState('')
  const [showAnnounce, setShowAnnounce] = useState(false)

  const filtered = list.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.country.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || a.status === filter
    return matchSearch && matchFilter
  })

  const approve = (id: number) => {
    setList(prev => prev.map(a => a.id === id ? {...a, status:'approved'} : a))
    toast.success('Ambassador approved! They can now access the portal.')
  }
  const reject = (id: number) => {
    setList(prev => prev.map(a => a.id === id ? {...a, status:'rejected'} : a))
    toast.error('Application rejected.')
  }

  const sendAnnouncement = () => {
    if (!announcement.trim()) return
    toast.success(`Announcement sent to ${list.filter(a=>a.status==='approved').length} ambassadors!`)
    setAnnouncement('')
    setShowAnnounce(false)
  }

  const pending = list.filter(a => a.status === 'pending').length

  return (
    <AdminLayout title="Campus Ambassadors" current="/admin/ambassadors">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label:'Total Ambassadors', value: list.filter(a=>a.status==='approved').length, icon:'🌍' },
          { label:'Pending Review', value: pending, icon:'⏳' },
          { label:'Countries', value: new Set(list.map(a=>a.country)).size, icon:'🗺️' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="glass rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <p className="text-2xl font-bold text-gradient">{value}</p>
            <p className="text-white/40 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <input className="input-glass pl-10 w-full" placeholder="Search ambassadors..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {(['all','pending','approved'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium capitalize transition-all ${
                filter === f ? 'bg-ysdi/20 text-ysdi-light border border-ysdi/30' : 'glass text-white/50 hover:text-white'
              }`}>
              {f} {f==='pending' && pending > 0 ? `(${pending})` : ''}
            </button>
          ))}
        </div>
        <button onClick={() => setShowAnnounce(!showAnnounce)} className="btn-ysdi text-sm">
          <Bell size={15} /> Announce
        </button>
      </div>

      {/* Announcement box */}
      {showAnnounce && (
        <div className="glass rounded-2xl p-5 mb-6 border border-ysdi/20">
          <h3 className="font-semibold mb-3 text-ysdi-light">Send Announcement to All Ambassadors</h3>
          <textarea
            rows={3}
            className="input-glass resize-none w-full mb-3"
            placeholder="Type your announcement here..."
            value={announcement}
            onChange={e => setAnnouncement(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={sendAnnouncement} className="btn-ysdi text-sm"><Send size={14} /> Send to All</button>
            <button onClick={() => setShowAnnounce(false)} className="btn-ghost text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-4 text-white/35 text-xs font-medium uppercase tracking-wider">Ambassador</th>
                <th className="text-left px-5 py-4 text-white/35 text-xs font-medium uppercase tracking-wider">University</th>
                <th className="text-left px-5 py-4 text-white/35 text-xs font-medium uppercase tracking-wider">Applied</th>
                <th className="text-left px-5 py-4 text-white/35 text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-4 text-white/35 text-xs font-medium uppercase tracking-wider">Activity</th>
                <th className="text-left px-5 py-4 text-white/35 text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ysdi/60 to-ysdi-dark/60 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {a.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{a.name}</p>
                        <p className="text-white/30 text-xs">{a.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-white/60 text-xs">{a.university}</p>
                    <p className="text-white/30 text-xs flex items-center gap-1 mt-0.5"><MapPin size={10} />{a.country}</p>
                  </td>
                  <td className="px-5 py-4 text-white/40 text-xs">{a.appliedDate}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="px-5 py-4 text-xs text-white/40">
                    {a.eventsHosted} events · {a.studentsReached} reached
                  </td>
                  <td className="px-5 py-4">
                    {a.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => approve(a.id)} className="flex items-center gap-1 text-xs text-emerald-400 glass px-2.5 py-1.5 rounded-lg hover:bg-emerald-400/10 transition-all">
                          <CheckCircle size={12} /> Approve
                        </button>
                        <button onClick={() => reject(a.id)} className="flex items-center gap-1 text-xs text-red-400 glass px-2.5 py-1.5 rounded-lg hover:bg-red-400/10 transition-all">
                          <XCircle size={12} /> Reject
                        </button>
                      </div>
                    ) : (
                      <button className="text-xs text-ysdi-light glass px-2.5 py-1.5 rounded-lg hover:bg-ysdi/10 transition-all">
                        Message
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
