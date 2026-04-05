import { useState } from 'react'
import { AdminLayout } from './AdminDashboard'
import { Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import ChatWidget from '../../components/ChatWidget'
import Avatar from '../../components/Avatar'

const teamMembers = [
  { id:'tm-tunde',  name:'Tunde Ibrahim',  role:'Media Manager',        online:true,  unread:2 },
  { id:'tm-ngozi',  name:'Ngozi Eze',       role:'Programs Officer',     online:true,  unread:0 },
  { id:'tm-kofi',   name:'Kofi Mensah',     role:'Events Coordinator',   online:false, unread:1 },
]

export default function AdminChat() {
  const [selected, setSelected] = useState<string>('broadcast')
  const [search, setSearch]     = useState('')
  const { profile }             = useAuth()

  const contacts = [
    { id:'broadcast', name:'📢 All Team', role:'Broadcast channel', online:true, unread:0 },
    ...teamMembers,
  ]
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
  const current  = contacts.find(c => c.id === selected)!

  const threadKey = selected === 'broadcast'
    ? 'admin-broadcast'
    : `dm_${[profile?.id || 'admin', selected].sort().join('_')}`

  return (
    <AdminLayout title="Team Chat" current="/admin/chat">
      <div className="flex h-[calc(100vh-160px)] gap-4">
        {/* Contacts */}
        <div className="w-64 flex-shrink-0 glass rounded-2xl flex flex-col overflow-hidden">
          <div className="p-3 border-b border-white/5">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input className="input-glass text-xs py-2 pl-8 w-full" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filtered.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${selected === c.id ? 'bg-ysdi/20 border border-ysdi/30' : 'hover:bg-white/5'}`}>
                {c.id === 'broadcast'
                  ? <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ysdi to-ysdi-dark flex items-center justify-center text-lg flex-shrink-0">📢</div>
                  : <Avatar name={c.name} size="sm" online={c.online} />
                }
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">{c.name}</p>
                  <p className="text-white/30 text-xs truncate">{c.role}</p>
                </div>
                {c.unread > 0 && <span className="w-5 h-5 rounded-full bg-ysdi text-white text-[10px] flex items-center justify-center">{c.unread}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col min-w-0 gap-4">
          <div className="glass rounded-2xl px-5 py-4 flex items-center gap-3">
            {current.id === 'broadcast'
              ? <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ysdi to-ysdi-dark flex items-center justify-center text-xl">📢</div>
              : <Avatar name={current.name} size="sm" online={(current as any).online} />
            }
            <div>
              <p className="font-semibold text-sm">{current.name}</p>
              <p className="text-xs text-white/35">{current.role}</p>
            </div>
          </div>
          <ChatWidget
            threadId={threadKey}
            toId={selected === 'broadcast' ? undefined : selected}
            placeholder={selected === 'broadcast' ? 'Broadcast to all team members...' : `Message ${current.name}...`}
            height="flex-1" // TS fixed: ChatWidget now accepts string | number
          />
        </div>
      </div>
    </AdminLayout>
  )
}