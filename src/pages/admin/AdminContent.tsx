import { useState } from 'react'
import { AdminLayout } from './AdminDashboard'
import { Edit, Save, Plus, Trash2, Image, Upload, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

type PageSection = 'about' | 'events' | 'media' | 'programs' | 'resources'

const sections: { key: PageSection; label: string; icon: string; permission: string }[] = [
  { key:'about',     label:'About Page',     icon:'🏛️', permission:'edit_about' },
  { key:'events',    label:'Events',         icon:'📅', permission:'edit_events' },
  { key:'media',     label:'Media Posts',    icon:'📸', permission:'edit_media' },
  { key:'programs',  label:'Programs',       icon:'🎓', permission:'edit_programs' },
  { key:'resources', label:'Resources',      icon:'📚', permission:'edit_resources' },
]

const mockContent: Record<PageSection, any[]> = {
  about: [
    { id:1, field:'Mission Statement', value:'To educate, empower, and amplify socially conscious young people...', type:'textarea' },
    { id:2, field:'Vision Statement', value:'A generation of principled, resilient, and creative youth leaders...', type:'textarea' },
    { id:3, field:'Founder Bio', value:'Ayotunde Aboderin is a youth advocate and social impact leader...', type:'textarea' },
  ],
  events: [
    { id:1, title:'AmpliYouth Leadership Summit 2025', date:'2025-03-15', location:'Lagos', status:'published' },
    { id:2, title:'Advocacy Masterclass', date:'2025-02-20', location:'Online', status:'published' },
  ],
  media: [
    { id:1, title:'Why Africa\'s Youth Must Lead the Climate Conversation', type:'article', status:'published' },
    { id:2, title:'Leadership Summit 2024 Highlights', type:'video', status:'published' },
  ],
  programs: [
    { id:1, title:'Leadership Academy', description:'12-week intensive...', status:'active' },
    { id:2, title:'Mentorship Hub', description:'6-month mentorship...', status:'active' },
  ],
  resources: [
    { id:1, title:'Youth Advocacy Handbook', category:'Advocacy', downloads:1240 },
    { id:2, title:'Leadership Across Cultures', category:'Leadership', downloads:890 },
  ],
}

export default function AdminContent() {
  const [section, setSection] = useState<PageSection>('about')
  const [editing, setEditing] = useState<number|null>(null)
  const [editValues, setEditValues] = useState<Record<number,string>>({})
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [showAddMedia, setShowAddMedia] = useState(false)
  const [newEvent, setNewEvent] = useState({ title:'', date:'', location:'', desc:'', virtual:false })
  const [newMedia, setNewMedia] = useState({ title:'', content:'', type:'article' })
  const { hasPermission } = useAuth()

  const canEdit = (permission: string) => hasPermission(permission)

  const handleSaveField = (id: number) => {
    toast.success('Content saved successfully!')
    setEditing(null)
  }

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault()
    mockContent.events.push({ id: Date.now(), ...newEvent, status:'published' })
    toast.success('Event published!')
    setShowAddEvent(false)
    setNewEvent({ title:'', date:'', location:'', desc:'', virtual:false })
  }

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault()
    mockContent.media.push({ id: Date.now(), ...newMedia, status:'published' })
    toast.success('Media post published!')
    setShowAddMedia(false)
    setNewMedia({ title:'', content:'', type:'article' })
  }

  const currentSection = sections.find(s => s.key === section)!

  return (
    <AdminLayout title="Site Content" current="/admin/content">
      <div className="flex gap-6">
        {/* Section tabs */}
        <div className="w-48 flex-shrink-0">
          <div className="glass rounded-2xl p-3 space-y-1">
            {sections.map(s => (
              <button key={s.key} onClick={() => setSection(s.key)}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  section === s.key
                    ? 'bg-ysdi/20 text-ysdi-light border border-ysdi/30'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                } ${!canEdit(s.permission) ? 'opacity-40 cursor-not-allowed' : ''}`}
                disabled={!canEdit(s.permission)}
              >
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">{currentSection.icon} {currentSection.label}</h2>
              <p className="text-white/35 text-sm">Edit and manage {currentSection.label.toLowerCase()} content</p>
            </div>
            {section === 'events' && canEdit('edit_events') && (
              <button onClick={() => setShowAddEvent(true)} className="btn-ysdi text-sm"><Plus size={15} /> Add Event</button>
            )}
            {section === 'media' && canEdit('edit_media') && (
              <button onClick={() => setShowAddMedia(true)} className="btn-ysdi text-sm"><Plus size={15} /> Add Post</button>
            )}
          </div>

          {/* ABOUT */}
          {section === 'about' && (
            <div className="space-y-4">
              {mockContent.about.map(field => (
                <div key={field.id} className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-white/70">{field.field}</label>
                    <div className="flex gap-2">
                      {editing === field.id ? (
                        <button onClick={() => handleSaveField(field.id)} className="flex items-center gap-1.5 text-xs text-emerald-400 glass px-3 py-1.5 rounded-lg">
                          <Save size={12} /> Save
                        </button>
                      ) : (
                        <button onClick={() => { setEditing(field.id); setEditValues({[field.id]: field.value}) }}
                          className="flex items-center gap-1.5 text-xs text-ysdi-light glass px-3 py-1.5 rounded-lg">
                          <Edit size={12} /> Edit
                        </button>
                      )}
                    </div>
                  </div>
                  {editing === field.id ? (
                    <textarea
                      rows={4}
                      className="input-glass resize-none w-full"
                      value={editValues[field.id] ?? field.value}
                      onChange={e => setEditValues(v => ({...v, [field.id]: e.target.value}))}
                    />
                  ) : (
                    <p className="text-white/55 text-sm leading-relaxed">{field.value}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* EVENTS */}
          {section === 'events' && (
            <>
              {showAddEvent && (
                <form onSubmit={handleAddEvent} className="glass rounded-2xl p-6 mb-5 border border-ysdi/20 space-y-4">
                  <h3 className="font-semibold">Create New Event</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className="label">Event Title</label><input className="input-glass" value={newEvent.title} onChange={e=>setNewEvent(n=>({...n,title:e.target.value}))} required /></div>
                    <div><label className="label">Date</label><input type="date" className="input-glass" value={newEvent.date} onChange={e=>setNewEvent(n=>({...n,date:e.target.value}))} required /></div>
                    <div><label className="label">Location</label><input className="input-glass" placeholder="Lagos / Online" value={newEvent.location} onChange={e=>setNewEvent(n=>({...n,location:e.target.value}))} required /></div>
                  </div>
                  <div><label className="label">Description</label><textarea rows={3} className="input-glass resize-none w-full" value={newEvent.desc} onChange={e=>setNewEvent(n=>({...n,desc:e.target.value}))} /></div>
                  <div className="flex gap-3">
                    <button type="submit" className="btn-ysdi text-sm">Publish Event</button>
                    <button type="button" onClick={() => setShowAddEvent(false)} className="btn-ghost text-sm">Cancel</button>
                  </div>
                </form>
              )}
              <div className="space-y-3">
                {mockContent.events.map(event => (
                  <div key={event.id} className="glass rounded-2xl p-5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-white/40 text-xs mt-1">{event.date} · {event.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full">{event.status}</span>
                      <button className="glass p-1.5 rounded-lg text-white/30 hover:text-white"><Edit size={13} /></button>
                      <button className="glass p-1.5 rounded-lg text-red-400/60 hover:text-red-400"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* MEDIA */}
          {section === 'media' && (
            <>
              {showAddMedia && (
                <form onSubmit={handleAddMedia} className="glass rounded-2xl p-6 mb-5 border border-ysdi/20 space-y-4">
                  <h3 className="font-semibold">Create Media Post</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><label className="label">Title</label><input className="input-glass" value={newMedia.title} onChange={e=>setNewMedia(n=>({...n,title:e.target.value}))} required /></div>
                    <div>
                      <label className="label">Type</label>
                      <select className="input-glass" value={newMedia.type} onChange={e=>setNewMedia(n=>({...n,type:e.target.value}))}>
                        <option value="article">Article</option>
                        <option value="video">Video</option>
                        <option value="gallery">Gallery</option>
                        <option value="flyer">Flyer</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="label">Content / Description</label>
                    <textarea rows={4} className="input-glass resize-none w-full" value={newMedia.content} onChange={e=>setNewMedia(n=>({...n,content:e.target.value}))} />
                  </div>
                  <div>
                    <label className="label">Upload Media (image / video)</label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-ysdi/30 transition-colors cursor-pointer">
                      <Upload size={24} className="mx-auto mb-2 text-white/25" />
                      <p className="text-white/30 text-sm">Click to upload or drag & drop</p>
                      <p className="text-white/20 text-xs mt-1">PNG, JPG, MP4 up to 50MB</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="btn-ysdi text-sm">Publish</button>
                    <button type="button" onClick={() => setShowAddMedia(false)} className="btn-ghost text-sm">Cancel</button>
                  </div>
                </form>
              )}
              <div className="space-y-3">
                {mockContent.media.map(post => (
                  <div key={post.id} className="glass rounded-2xl p-5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{post.title}</p>
                      <p className="text-white/40 text-xs mt-1 capitalize">{post.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="glass p-1.5 rounded-lg text-white/30 hover:text-white"><Eye size={13} /></button>
                      <button className="glass p-1.5 rounded-lg text-white/30 hover:text-white"><Edit size={13} /></button>
                      <button className="glass p-1.5 rounded-lg text-red-400/60 hover:text-red-400"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* PROGRAMS & RESOURCES - simple list */}
          {(section === 'programs' || section === 'resources') && (
            <div className="space-y-3">
              {mockContent[section].map((item: any) => (
                <div key={item.id} className="glass rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-white/40 text-xs mt-1">{item.description || item.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="glass p-1.5 rounded-lg text-white/30 hover:text-white"><Edit size={13} /></button>
                  </div>
                </div>
              ))}
              <button className="w-full glass rounded-2xl p-4 text-white/30 hover:text-white border border-dashed border-white/10 hover:border-white/20 transition-all text-sm flex items-center justify-center gap-2">
                <Plus size={15} /> Add {currentSection.label.slice(0,-1)}
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
