import { useState } from 'react'
import { AdminLayout } from './AdminDashboard'
import { Users, BookOpen, UserCheck, Plus, Edit, CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const menteeRequests = [
  { id:1, name:'Amina Sule', email:'amina@email.com', country:'Nigeria', interest:'Policy & Advocacy', date:'Jan 28, 2025', status:'pending' },
  { id:2, name:'Joseph Kamau', email:'joseph@email.com', country:'Kenya', interest:'Community Organizing', date:'Jan 25, 2025', status:'pending' },
  { id:3, name:'Fatou Diallo', email:'fatou@email.com', country:'Senegal', interest:'Media & Storytelling', date:'Jan 20, 2025', status:'approved' },
]

const mentors = [
  { id:1, name:'Dr. Chioma Adeyemi', specialty:'Policy', mentees:12, groups:2, active:true },
  { id:2, name:'Emeka Okafor', specialty:'Business', mentees:8, groups:1, active:true },
  { id:3, name:'Prof. James Mwangi', specialty:'Research', mentees:10, groups:2, active:true },
]

const groups = [
  { id:1, name:'Policy & Governance Track', mentor:'Dr. Chioma Adeyemi', mentees:6, status:'active' },
  { id:2, name:'Entrepreneurship Track', mentor:'Emeka Okafor', mentees:5, status:'active' },
  { id:3, name:'Research & Academia', mentor:'Prof. James Mwangi', mentees:7, status:'active' },
]

type Tab = 'overview' | 'mentees' | 'mentors' | 'groups'

export default function AdminAcademy() {
  const [tab, setTab] = useState<Tab>('overview')
  const [requests, setRequests] = useState(menteeRequests)

  const approveUser = (id: number) => {
    setRequests(prev => prev.map(r => r.id === id ? {...r, status:'approved'} : r))
    toast.success('User approved and notified!')
  }
  const rejectUser = (id: number) => {
    setRequests(prev => prev.map(r => r.id === id ? {...r, status:'rejected'} : r))
    toast.error('User rejected.')
  }

  const tabs = ['overview','mentees','mentors','groups'] as const

  return (
    <AdminLayout title="Academy Oversight" current="/admin/academy">
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all whitespace-nowrap ${
              tab === t ? 'bg-ysdi/20 text-ysdi-light border border-ysdi/30' : 'glass text-white/50 hover:text-white'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { label:'Total Enrolled Mentees', value:'342', icon:'👥', sub:'+18 this month' },
            { label:'Active Mentors', value:'14', icon:'🎓', sub:'Across 6 specialties' },
            { label:'Mentorship Groups', value:'8', icon:'🤝', sub:'Currently running' },
            { label:'Pending Approvals', value: requests.filter(r=>r.status==='pending').length.toString(), icon:'⏳', sub:'Awaiting your review' },
            { label:'Courses Published', value:'12', icon:'📚', sub:'4 new this quarter' },
            { label:'Ebooks in Library', value:'28', icon:'📖', sub:'All free to access' },
          ].map(({ label, value, icon, sub }) => (
            <div key={label} className="glass rounded-2xl p-5">
              <div className="text-3xl mb-3">{icon}</div>
              <p className="text-2xl font-bold text-gradient mb-1">{value}</p>
              <p className="text-white/50 text-sm">{label}</p>
              <p className="text-white/25 text-xs mt-1">{sub}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'mentees' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/45 text-sm">{requests.filter(r=>r.status==='pending').length} pending approval</p>
          </div>
          {requests.map(r => (
            <div key={r.id} className="glass rounded-2xl p-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center font-bold flex-shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-white/40 text-xs">{r.email} · {r.country}</p>
                  <p className="text-white/30 text-xs mt-0.5">Interest: {r.interest}</p>
                  <p className="text-white/20 text-xs">Applied: {r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {r.status === 'pending' ? (
                  <>
                    <button onClick={() => approveUser(r.id)} className="flex items-center gap-1.5 glass px-3 py-2 rounded-xl text-xs text-emerald-400 hover:bg-emerald-400/10 transition-all">
                      <CheckCircle size={13} /> Approve
                    </button>
                    <button onClick={() => rejectUser(r.id)} className="flex items-center gap-1.5 glass px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-400/10 transition-all">
                      <XCircle size={13} /> Reject
                    </button>
                  </>
                ) : (
                  <span className={`text-xs px-2.5 py-1 rounded-full capitalize ${
                    r.status === 'approved' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'
                  }`}>{r.status}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'mentors' && (
        <div className="space-y-3">
          <button className="btn-ysdi text-sm mb-4"><Plus size={15} /> Assign New Mentor</button>
          {mentors.map(m => (
            <div key={m.id} className="glass rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center font-bold">
                  {m.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-white/40 text-xs">{m.specialty} · {m.mentees} mentees · {m.groups} groups</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${m.active ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'}`}>{m.active ? 'Active' : 'Inactive'}</span>
                <button className="glass p-1.5 rounded-lg text-white/30 hover:text-white"><Edit size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'groups' && (
        <div className="space-y-3">
          <button className="btn-ysdi text-sm mb-4"><Plus size={15} /> Create Group</button>
          {groups.map(g => (
            <div key={g.id} className="glass rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="font-semibold">{g.name}</p>
                <p className="text-white/40 text-xs mt-1">Mentor: {g.mentor} · {g.mentees} mentees</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full">{g.status}</span>
                <button className="glass p-1.5 rounded-lg text-white/30 hover:text-white"><Edit size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
