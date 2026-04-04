import { useState, useEffect, useRef } from 'react'
import { Bell, MessageCircle, BookOpen, Users, Send, Megaphone, LogOut, Menu, X, Home } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const announcements = [
  { id:1, title:'Ambassador Bootcamp — March 2025', content:'All ambassadors are invited to attend the upcoming 2-day bootcamp in Lagos. Travel stipends available for out-of-Lagos ambassadors. Register by Feb 15.', date:'Jan 28, 2025', urgent:true },
  { id:2, title:'Monthly Report Deadline', content:'Please submit your January activity reports by February 5th. Use the template in the resources section.', date:'Jan 25, 2025', urgent:false },
  { id:3, title:'New Resource: Event Planning Kit', content:'We\'ve uploaded a comprehensive event planning kit to help you organise campus activations. Download it from the Resources section.', date:'Jan 20, 2025', urgent:false },
]

const mockMessages = [
  { id:1, from:'Admin', content:'Hi! Welcome to the ambassador portal. How is your campus chapter coming along?', time:'10:30 AM', isMe:false },
  { id:2, from:'Me', content:'It\'s going great! We just had our first meeting with 15 students attending.', time:'10:35 AM', isMe:true },
  { id:3, from:'Admin', content:'Excellent! Make sure to log your activities in the monthly report. We\'re proud of you! 🎉', time:'10:36 AM', isMe:false },
]

type Tab = 'home' | 'announcements' | 'chat' | 'resources' | 'community'

export default function AmbassadorPortal() {
  const [tab, setTab] = useState<Tab>('home')
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { profile, signOut } = useAuth()
  const msgEnd = useRef<HTMLDivElement>(null)

  useEffect(() => { msgEnd.current?.scrollIntoView({ behavior:'smooth' }) }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), from:'Me', content: input.trim(), time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}), isMe:true }])
    setInput('')
  }

  const tabs: { key: Tab; icon: any; label: string }[] = [
    { key:'home', icon:Home, label:'Dashboard' },
    { key:'announcements', icon:Megaphone, label:'Announcements' },
    { key:'chat', icon:MessageCircle, label:'Messages' },
    { key:'resources', icon:BookOpen, label:'Resources' },
    { key:'community', icon:Users, label:'Community' },
  ]

  const Sidebar = () => (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center font-bold">A</div>
          <div>
            <p className="font-bold text-sm text-gradient">AmpliYouth</p>
            <p className="text-white/35 text-xs">Ambassador Portal</p>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1">
        {tabs.map(({ key, icon: Icon, label }) => (
          <button key={key} onClick={() => { setTab(key); setSidebarOpen(false) }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mb-1 transition-all ${
              tab === key ? 'bg-primary/20 text-primary-300 border border-primary/30' : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}>
            <Icon size={17} /> {label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="glass rounded-xl p-3 mb-3">
          <p className="text-xs font-semibold">{profile?.full_name || 'Ambassador'}</p>
          <p className="text-white/35 text-xs">Campus Ambassador</p>
        </div>
        <button onClick={() => { signOut() }} className="w-full flex items-center gap-2 text-sm text-red-400 hover:bg-red-400/10 py-2 px-3 rounded-xl transition-all">
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex bg-dark-bg">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 border-r border-white/5 backdrop-blur-xl bg-dark-bg/60 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 backdrop-blur-xl bg-dark-bg/95 border-r border-white/5">
            <div className="p-4 flex justify-end">
              <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
            </div>
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden glass p-2 rounded-xl" onClick={() => setSidebarOpen(true)}><Menu size={18} /></button>
            <h2 className="font-semibold capitalize">{tab === 'home' ? 'Dashboard' : tabs.find(t => t.key === tab)?.label}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="glass p-2.5 rounded-xl relative">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            <Link to="/" className="glass px-3 py-2 rounded-xl text-xs text-white/50 hover:text-white transition-all">← Back to Site</Link>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">

          {/* DASHBOARD */}
          {tab === 'home' && (
            <div className="max-w-4xl">
              <div className="glass-primary rounded-3xl p-8 mb-6 border border-primary/20">
                <h1 className="text-2xl font-bold mb-2">Welcome back, {profile?.full_name?.split(' ')[0]} 👋</h1>
                <p className="text-white/55">You're making a difference. Keep up the great work as an AmpliYouth Campus Ambassador!</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label:'Events Hosted', value:'3', icon:'🎪' },
                  { label:'Students Reached', value:'124', icon:'👥' },
                  { label:'Reports Submitted', value:'2', icon:'📋' },
                  { label:'Rank', value:'#12', icon:'🏆' },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="glass rounded-2xl p-5 text-center">
                    <div className="text-3xl mb-2">{icon}</div>
                    <p className="text-2xl font-bold text-gradient">{value}</p>
                    <p className="text-white/35 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Megaphone size={16} className="text-primary-400" /> Latest Announcement</h3>
                {announcements[0] && (
                  <div>
                    {announcements[0].urgent && <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full mb-2 inline-block">Urgent</span>}
                    <h4 className="font-semibold mb-2">{announcements[0].title}</h4>
                    <p className="text-white/50 text-sm">{announcements[0].content}</p>
                    <button onClick={() => setTab('announcements')} className="text-primary-400 text-xs mt-3 hover:text-white transition-colors">View all announcements →</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANNOUNCEMENTS */}
          {tab === 'announcements' && (
            <div className="max-w-3xl space-y-4">
              {announcements.map(a => (
                <div key={a.id} className={`glass rounded-2xl p-6 border ${a.urgent ? 'border-amber-500/30' : 'border-white/5'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {a.urgent && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-400">Urgent</span>}
                      <h3 className="font-semibold">{a.title}</h3>
                    </div>
                    <span className="text-xs text-white/30 flex-shrink-0 ml-4">{a.date}</span>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{a.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* CHAT */}
          {tab === 'chat' && (
            <div className="max-w-2xl h-[calc(100vh-200px)] flex flex-col">
              <div className="glass rounded-2xl p-4 mb-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center text-sm font-bold">A</div>
                <div>
                  <p className="text-sm font-semibold">AmpliYouth Admin</p>
                  <p className="text-xs text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />Online</p>
                </div>
              </div>

              <div className="flex-1 glass rounded-2xl p-5 overflow-y-auto space-y-4 mb-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs ${msg.isMe ? 'chat-bubble-out' : 'chat-bubble-in'}`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-[10px] text-white/30 mt-1.5 text-right">{msg.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={msgEnd} />
              </div>

              <div className="flex gap-3">
                <input
                  className="input-glass flex-1"
                  placeholder="Type a message..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="btn-primary px-5 py-3 rounded-xl">
                  <Send size={16} />
                </button>
              </div>
            </div>
          )}

          {/* RESOURCES */}
          {tab === 'resources' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Ambassador <span className="text-gradient">Resources</span></h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title:'Monthly Report Template', desc:'Use this template to submit your monthly campus activity report.', icon:'📋', action:'Download' },
                  { title:'Event Planning Kit', desc:'Everything you need to plan and run a successful campus event.', icon:'🎪', action:'Download' },
                  { title:'Brand Guidelines', desc:'Official AmpliYouth visual identity, logos, and usage rules.', icon:'🎨', action:'Download' },
                  { title:'Ambassador Handbook', desc:'Your complete guide to being an effective AmpliYouth ambassador.', icon:'📖', action:'Download' },
                  { title:'Social Media Templates', desc:'Ready-made Canva templates for promoting your campus chapter.', icon:'📱', action:'Open in Canva' },
                  { title:'Training Recordings', desc:'Recordings from all past ambassador training sessions.', icon:'🎬', action:'Watch' },
                ].map(r => (
                  <div key={r.title} className="glass-hover p-5 flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{r.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-1">{r.title}</h4>
                      <p className="text-white/40 text-xs mb-3 leading-relaxed">{r.desc}</p>
                      <button className="text-xs font-semibold text-primary-400 hover:text-white transition-colors">{r.action} →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COMMUNITY */}
          {tab === 'community' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Fellow <span className="text-gradient">Ambassadors</span></h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name:'Joseph Kamau', uni:'University of Nairobi', country:'Kenya', avatar:'JK' },
                  { name:'Fatou Diallo', uni:'Cheikh Anta Diop University', country:'Senegal', avatar:'FD' },
                  { name:'Kwame Asante', uni:'University of Ghana', country:'Ghana', avatar:'KA' },
                  { name:'Zara Mohammed', uni:'University of Khartoum', country:'Sudan', avatar:'ZM' },
                  { name:'Musa Traore', uni:'Université de Bamako', country:'Mali', avatar:'MT' },
                  { name:'Ayana Bekele', uni:'Addis Ababa University', country:'Ethiopia', avatar:'AB' },
                ].map((a, i) => (
                  <div key={a.name} className="glass-hover p-5 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold flex-shrink-0 ${['bg-emerald-500','bg-blue-500','bg-purple-500','bg-rose-500','bg-amber-500','bg-cyan-500'][i]}`}>
                      {a.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{a.name}</p>
                      <p className="text-white/40 text-xs truncate">{a.uni}</p>
                      <p className="text-white/25 text-xs">{a.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
