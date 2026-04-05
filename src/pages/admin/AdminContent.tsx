import { useState, useEffect } from 'react'
import { AdminLayout } from './AdminDashboard'
import { Edit, Save, Plus, Trash2, Upload, X, RefreshCw, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
type Tab = 'about' | 'events' | 'media'
export default function AdminContent() {
  const [tab, setTab] = useState<Tab>('about')
  const { user } = useAuth()
  const [aboutFields, setAboutFields] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string|null>(null)
  const [editVal, setEditVal] = useState('')
  const [savingAbout, setSavingAbout] = useState(false)
  const [loadingAbout, setLoadingAbout] = useState(true)
  const loadAbout = async () => {
    setLoadingAbout(true)
    const { data } = await supabase.from('site_content').select('*').order('sort_order')
    if (data && data.length > 0) { setAboutFields(data) } else {
      const defaults = [
        { key:'mission', label:'Mission Statement', value:'To educate, empower, and amplify socially conscious young people by providing leadership training, advocacy skills, mentorship, and access to platforms.', sort_order:1 },
        { key:'vision', label:'Vision Statement', value:'A generation of principled, resilient, and creative youth leaders shaping policies, narratives, and communities at local, national, and global levels.', sort_order:2 },
        { key:'founder_bio', label:'Founder Bio', value:'Ayotunde Aboderin is a youth advocate and social impact leader committed to expanding access to leadership development for young people across Africa.', sort_order:3 },
        { key:'about_body', label:'About Body Text', value:'AmpliYouth Advocacy Academy is a leadership institution committed to identifying, grooming, and amplifying young changemakers from underserved communities.', sort_order:4 },
      ]
      const { data: ins } = await supabase.from('site_content').insert(defaults).select()
      setAboutFields(ins || defaults)
    }
    setLoadingAbout(false)
  }
  const saveAboutField = async (row: any) => {
    setSavingAbout(true)
    const { error } = await supabase.from('site_content').upsert({ ...row, value: editVal })
    if (error) { toast.error(error.message) } else { setAboutFields(p => p.map(f => f.key===row.key?{...f,value:editVal}:f)); toast.success('Saved!'); setEditingId(null) }
    setSavingAbout(false)
  }
  const [events, setEvents] = useState<any[]>([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [savingEvent, setSavingEvent] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any|null>(null)
  const [newEvent, setNewEvent] = useState({ title:'', date:'', location:'', description:'', virtual:false })
  const loadEvents = async () => { setLoadingEvents(true); const { data } = await supabase.from('events').select('*').order('created_at',{ascending:false}); setEvents(data||[]); setLoadingEvents(false) }
  const saveEvent = async (e: React.FormEvent) => {
    e.preventDefault(); setSavingEvent(true)
    try {
      if (editingEvent) { const {error} = await supabase.from('events').update({title:newEvent.title,date:newEvent.date||null,location:newEvent.location,description:newEvent.description,virtual:newEvent.virtual}).eq('id',editingEvent.id); if(error)throw error; toast.success('Updated!') }
      else { const {error} = await supabase.from('events').insert({title:newEvent.title,date:newEvent.date||null,location:newEvent.location,description:newEvent.description,virtual:newEvent.virtual,published:true,created_by:user?.id}); if(error)throw error; toast.success('Published!') }
      setShowAddEvent(false); setEditingEvent(null); setNewEvent({title:'',date:'',location:'',description:'',virtual:false}); loadEvents()
    } catch(err:any){toast.error(err.message)} setSavingEvent(false)
  }
  const deleteEvent = async (id:string) => { if(!confirm('Delete?'))return; await supabase.from('events').delete().eq('id',id); toast.success('Deleted'); loadEvents() }
  const [media, setMedia] = useState<any[]>([])
  const [loadingMedia, setLoadingMedia] = useState(true)
  const [showAddMedia, setShowAddMedia] = useState(false)
  const [savingMedia, setSavingMedia] = useState(false)
  const [editingMedia, setEditingMedia] = useState<any|null>(null)
  const [newMedia, setNewMedia] = useState({ title:'', content:'', type:'article' })
  const loadMedia = async () => { setLoadingMedia(true); const {data} = await supabase.from('media_posts').select('*').order('created_at',{ascending:false}); setMedia(data||[]); setLoadingMedia(false) }
  const saveMedia = async (e: React.FormEvent) => {
    e.preventDefault(); setSavingMedia(true)
    try {
      if (editingMedia) { const {error} = await supabase.from('media_posts').update({title:newMedia.title,content:newMedia.content,type:newMedia.type}).eq('id',editingMedia.id); if(error)throw error; toast.success('Updated!') }
      else { const {error} = await supabase.from('media_posts').insert({title:newMedia.title,content:newMedia.content,type:newMedia.type,published:true,created_by:user?.id}); if(error)throw error; toast.success('Published!') }
      setShowAddMedia(false); setEditingMedia(null); setNewMedia({title:'',content:'',type:'article'}); loadMedia()
    } catch(err:any){toast.error(err.message)} setSavingMedia(false)
  }
  const deleteMedia = async (id:string) => { if(!confirm('Delete?'))return; await supabase.from('media_posts').delete().eq('id',id); toast.success('Deleted'); loadMedia() }
  useEffect(() => { if(tab==='about')loadAbout(); if(tab==='events')loadEvents(); if(tab==='media')loadMedia() }, [tab])
  const tabs = [{key:'about' as Tab,label:'About Page',icon:'🏛️'},{key:'events' as Tab,label:'Events',icon:'📅'},{key:'media' as Tab,label:'Media Posts',icon:'📸'}]
  return (
    <AdminLayout title="Site Content" current="/admin/content">
      <div className="flex gap-6">
        <div className="w-44 flex-shrink-0">
          <div className="glass rounded-2xl p-3 space-y-1">
            {tabs.map(t=>(
              <button key={t.key} onClick={()=>setTab(t.key)} className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${tab===t.key?'bg-ysdi/20 text-ysdi-light border border-ysdi/30':'text-white/50 hover:text-white hover:bg-white/5'}`}>
                <span>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
          <p className="text-white/20 text-xs mt-4 px-2 leading-relaxed">All changes save to the database and go live on the site instantly.</p>
        </div>
        <div className="flex-1 min-w-0">
          {tab==='about'&&(
            <div>
              <div className="flex items-center justify-between mb-6">
                <div><h2 className="text-xl font-bold">🏛️ About Page</h2><p className="text-white/35 text-sm">Edit text shown on the About page</p></div>
                <button onClick={loadAbout} className="glass p-2.5 rounded-xl text-white/40 hover:text-white"><RefreshCw size={15} className={loadingAbout?'animate-spin':''}/></button>
              </div>
              {loadingAbout?<div className="text-center py-16"><div className="w-6 h-6 border-2 border-ysdi/30 border-t-ysdi rounded-full animate-spin mx-auto"/></div>:(
                <div className="space-y-4">
                  {aboutFields.map(field=>(
                    <div key={field.key} className="glass rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-semibold text-white/70">{field.label}</label>
                        {editingId===field.key?(
                          <div className="flex gap-2">
                            <button onClick={()=>saveAboutField(field)} disabled={savingAbout} className="flex items-center gap-1.5 text-xs text-emerald-400 glass px-3 py-1.5 rounded-lg disabled:opacity-50">
                              {savingAbout?<Loader2 size={11} className="animate-spin"/>:<Save size={11}/>} Save
                            </button>
                            <button onClick={()=>setEditingId(null)} className="flex items-center gap-1.5 text-xs text-white/30 glass px-3 py-1.5 rounded-lg"><X size={11}/> Cancel</button>
                          </div>
                        ):(
                          <button onClick={()=>{setEditingId(field.key);setEditVal(field.value)}} className="flex items-center gap-1.5 text-xs text-ysdi-light glass px-3 py-1.5 rounded-lg"><Edit size={11}/> Edit</button>
                        )}
                      </div>
                      {editingId===field.key?<textarea rows={5} className="input-glass resize-none w-full" value={editVal} onChange={e=>setEditVal(e.target.value)} autoFocus/>:<p className="text-white/55 text-sm leading-relaxed">{field.value}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {tab==='events'&&(
            <div>
              <div className="flex items-center justify-between mb-6">
                <div><h2 className="text-xl font-bold">📅 Events</h2><p className="text-white/35 text-sm">Create and manage public events</p></div>
                <div className="flex gap-2">
                  <button onClick={loadEvents} className="glass p-2.5 rounded-xl text-white/40 hover:text-white"><RefreshCw size={15} className={loadingEvents?'animate-spin':''}/></button>
                  <button onClick={()=>{setEditingEvent(null);setNewEvent({title:'',date:'',location:'',description:'',virtual:false});setShowAddEvent(true)}} className="btn-ysdi text-sm"><Plus size={15}/> Add Event</button>
                </div>
              </div>
              {showAddEvent&&(
                <form onSubmit={saveEvent} className="glass rounded-2xl p-6 mb-5 border border-ysdi/20 space-y-4">
                  <div className="flex items-center justify-between"><h3 className="font-semibold">{editingEvent?'Edit Event':'New Event'}</h3><button type="button" onClick={()=>{setShowAddEvent(false);setEditingEvent(null)}} className="text-white/30 hover:text-white"><X size={16}/></button></div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><label className="label">Title</label><input className="input-glass w-full" value={newEvent.title} onChange={e=>setNewEvent(n=>({...n,title:e.target.value}))} required/></div>
                    <div><label className="label">Date</label><input type="date" className="input-glass w-full" value={newEvent.date} onChange={e=>setNewEvent(n=>({...n,date:e.target.value}))}/></div>
                    <div><label className="label">Location</label><input className="input-glass w-full" placeholder="Lagos / Online" value={newEvent.location} onChange={e=>setNewEvent(n=>({...n,location:e.target.value}))} required/></div>
                    <div className="md:col-span-2"><label className="label">Description</label><textarea rows={3} className="input-glass resize-none w-full" value={newEvent.description} onChange={e=>setNewEvent(n=>({...n,description:e.target.value}))}/></div>
                    <div><label className="flex items-center gap-2 cursor-pointer text-sm text-white/60"><input type="checkbox" checked={newEvent.virtual} onChange={e=>setNewEvent(n=>({...n,virtual:e.target.checked}))} className="w-4 h-4 accent-purple-500"/> Virtual event</label></div>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={savingEvent} className="btn-ysdi text-sm disabled:opacity-50">{savingEvent?<Loader2 size={14} className="animate-spin"/>:<Plus size={14}/>}{savingEvent?'Saving...':editingEvent?'Save Changes':'Publish'}</button>
                    <button type="button" onClick={()=>{setShowAddEvent(false);setEditingEvent(null)}} className="btn-ghost text-sm">Cancel</button>
                  </div>
                </form>
              )}
              {loadingEvents?<div className="text-center py-16"><div className="w-6 h-6 border-2 border-ysdi/30 border-t-ysdi rounded-full animate-spin mx-auto"/></div>:events.length===0?<div className="text-center py-16 glass rounded-2xl"><div className="text-4xl mb-3">📅</div><p className="text-white/40">No events yet.</p></div>:(
                <div className="space-y-3">
                  {events.map(ev=>(
                    <div key={ev.id} className="glass rounded-2xl p-5 flex items-center justify-between">
                      <div><p className="font-semibold">{ev.title}</p><p className="text-white/40 text-xs mt-1">{ev.date?new Date(ev.date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}):'No date'} · {ev.location||'No location'}{ev.virtual?' · Virtual':''}</p></div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${ev.published?'bg-emerald-400/10 text-emerald-400':'bg-amber-400/10 text-amber-400'}`}>{ev.published?'Live':'Draft'}</span>
                        <button onClick={()=>{setEditingEvent(ev);setNewEvent({title:ev.title,date:ev.date?.slice(0,10)||'',location:ev.location||'',description:ev.description||'',virtual:ev.virtual||false});setShowAddEvent(true)}} className="glass p-1.5 rounded-lg text-white/30 hover:text-white"><Edit size={13}/></button>
                        <button onClick={()=>deleteEvent(ev.id)} className="glass p-1.5 rounded-lg text-red-400/50 hover:text-red-400"><Trash2 size={13}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {tab==='media'&&(
            <div>
              <div className="flex items-center justify-between mb-6">
                <div><h2 className="text-xl font-bold">📸 Media Posts</h2><p className="text-white/35 text-sm">Articles, videos, galleries, and flyers</p></div>
                <div className="flex gap-2">
                  <button onClick={loadMedia} className="glass p-2.5 rounded-xl text-white/40 hover:text-white"><RefreshCw size={15} className={loadingMedia?'animate-spin':''}/></button>
                  <button onClick={()=>{setEditingMedia(null);setNewMedia({title:'',content:'',type:'article'});setShowAddMedia(true)}} className="btn-ysdi text-sm"><Plus size={15}/> Add Post</button>
                </div>
              </div>
              {showAddMedia&&(
                <form onSubmit={saveMedia} className="glass rounded-2xl p-6 mb-5 border border-ysdi/20 space-y-4">
                  <div className="flex items-center justify-between"><h3 className="font-semibold">{editingMedia?'Edit Post':'New Post'}</h3><button type="button" onClick={()=>{setShowAddMedia(false);setEditingMedia(null)}} className="text-white/30 hover:text-white"><X size={16}/></button></div>
                  <div><label className="label">Title</label><input className="input-glass w-full" value={newMedia.title} onChange={e=>setNewMedia(n=>({...n,title:e.target.value}))} required/></div>
                  <div><label className="label">Type</label><select className="input-glass w-full" style={{background:'#111827',color:'white'}} value={newMedia.type} onChange={e=>setNewMedia(n=>({...n,type:e.target.value}))}><option value="article" style={{background:'#111827'}}>Article</option><option value="video" style={{background:'#111827'}}>Video</option><option value="gallery" style={{background:'#111827'}}>Gallery</option><option value="flyer" style={{background:'#111827'}}>Flyer</option></select></div>
                  <div><label className="label">Content</label><textarea rows={5} className="input-glass resize-none w-full" value={newMedia.content} onChange={e=>setNewMedia(n=>({...n,content:e.target.value}))} placeholder="Write content here..."/></div>
                  <div><label className="label">Media File (optional)</label><div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-ysdi/30 transition-colors cursor-pointer"><Upload size={20} className="mx-auto mb-2 text-white/25"/><p className="text-white/30 text-sm">Click to upload</p></div></div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={savingMedia} className="btn-ysdi text-sm disabled:opacity-50">{savingMedia?<Loader2 size={14} className="animate-spin"/>:<Plus size={14}/>}{savingMedia?'Publishing...':editingMedia?'Save Changes':'Publish'}</button>
                    <button type="button" onClick={()=>{setShowAddMedia(false);setEditingMedia(null)}} className="btn-ghost text-sm">Cancel</button>
                  </div>
                </form>
              )}
              {loadingMedia?<div className="text-center py-16"><div className="w-6 h-6 border-2 border-ysdi/30 border-t-ysdi rounded-full animate-spin mx-auto"/></div>:media.length===0?<div className="text-center py-16 glass rounded-2xl"><div className="text-4xl mb-3">📸</div><p className="text-white/40">No posts yet.</p></div>:(
                <div className="space-y-3">
                  {media.map(post=>(
                    <div key={post.id} className="glass rounded-2xl p-5 flex items-center justify-between">
                      <div><p className="font-semibold">{post.title}</p><p className="text-white/40 text-xs mt-1 capitalize">{post.type} · {new Date(post.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</p></div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${post.published?'bg-emerald-400/10 text-emerald-400':'bg-amber-400/10 text-amber-400'}`}>{post.published?'Live':'Draft'}</span>
                        <button onClick={()=>{setEditingMedia(post);setNewMedia({title:post.title,content:post.content||'',type:post.type});setShowAddMedia(true)}} className="glass p-1.5 rounded-lg text-white/30 hover:text-white"><Edit size={13}/></button>
                        <button onClick={()=>deleteMedia(post.id)} className="glass p-1.5 rounded-lg text-red-400/50 hover:text-red-400"><Trash2 size={13}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
