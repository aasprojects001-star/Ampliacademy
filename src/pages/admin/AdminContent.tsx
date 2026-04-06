import { useState, useEffect } from 'react'
import { AdminLayout } from './AdminDashboard'
import { Edit, Save, Plus, Trash2, Upload, X, RefreshCw, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { getDomain } from '../../lib/domain'
type Tab = 'about'|'events'|'media'|'programs'
const DOMAIN = getDomain()==='ysdi' ? 'ysdi' : 'ampliyouth'
const DEFAULTS:any = {
  ampliyouth: [
    {key:'ampliyouth_mission',label:'Mission Statement',value:'To educate, empower, and amplify socially conscious young people by providing leadership training, advocacy skills, mentorship, and access to platforms.',sort_order:1,domain:'ampliyouth'},
    {key:'ampliyouth_vision',label:'Vision Statement',value:'A generation of principled, resilient, and creative youth leaders shaping policies, narratives, and communities.',sort_order:2,domain:'ampliyouth'},
    {key:'ampliyouth_founder_bio',label:'Founder Bio',value:'Ayotunde Aboderin is a youth advocate and social impact leader committed to expanding access to leadership development across Africa.',sort_order:3,domain:'ampliyouth'},
    {key:'ampliyouth_about_body',label:'About Body Text',value:'AmpliYouth Advocacy Academy is a leadership institution dedicated to identifying, grooming, and amplifying young changemakers from underserved communities.',sort_order:4,domain:'ampliyouth'},
  ],
  ysdi:[
    {key:'ysdi_mission',label:'Mission Statement',value:'To drive sustainable development across Africa through youth empowerment, innovation, and community action.',sort_order:1,domain:'ysdi'},
    {key:'ysdi_vision',label:'Vision Statement',value:'An Africa where every young person has the tools, platform, and support to drive meaningful change in their community.',sort_order:2,domain:'ysdi'},
    {key:'ysdi_about_body',label:'About Body Text',value:'YSDI Initiative is a Pan-African youth development organisation dedicated to empowering young leaders to drive sustainable change.',sort_order:3,domain:'ysdi'},
    {key:'ysdi_team_intro',label:'Team Section Intro',value:'Our team is made up of passionate young Africans committed to driving change through programs, advocacy, and technology.',sort_order:4,domain:'ysdi'},
  ]
}
const ss = {background:'#111827',color:'white'}
export default function AdminContent() {
  const [tab,setTab]=useState<Tab>('about')
  const {user}=useAuth()
  const [aboutFields,setAboutFields]=useState<any[]>([])
  const [editingId,setEditingId]=useState<string|null>(null)
  const [editVal,setEditVal]=useState('')
  const [savingAbout,setSavingAbout]=useState(false)
  const [loadingAbout,setLoadingAbout]=useState(true)
  const loadAbout=async()=>{
    setLoadingAbout(true)
    const{data}=await supabase.from('site_content').select('*').eq('domain',DOMAIN).order('sort_order')
    if(data&&data.length>0){setAboutFields(data)}else{
      const rows=DEFAULTS[DOMAIN]||DEFAULTS.ampliyouth
      const{data:ins}=await supabase.from('site_content').upsert(rows).select()
      setAboutFields(ins||rows)
    }
    setLoadingAbout(false)
  }
  const saveAboutField=async(row:any)=>{
    setSavingAbout(true)
    const{error}=await supabase.from('site_content').update({value:editVal}).eq('key',row.key).eq('domain',DOMAIN)
    if(error){toast.error(error.message)}else{setAboutFields(p=>p.map(f=>f.key===row.key?{...f,value:editVal}:f));toast.success('Saved! Live on site now.');setEditingId(null)}
    setSavingAbout(false)
  }
  const [events,setEvents]=useState<any[]>([])
  const [loadingEvents,setLoadingEvents]=useState(true)
  const [showAddEvent,setShowAddEvent]=useState(false)
  const [savingEvent,setSavingEvent]=useState(false)
  const [editingEvent,setEditingEvent]=useState<any|null>(null)
  const [newEvent,setNewEvent]=useState({title:'',date:'',location:'',description:'',virtual:false})
  const loadEvents=async()=>{setLoadingEvents(true);const{data}=await supabase.from('events').select('*').order('date',{ascending:true});setEvents(data||[]);setLoadingEvents(false)}
  const saveEvent=async(e:React.FormEvent)=>{
    e.preventDefault();setSavingEvent(true)
    try{
      const p={title:newEvent.title,date:newEvent.date||null,location:newEvent.location,description:newEvent.description,virtual:newEvent.virtual,published:true}
      if(editingEvent){const{error}=await supabase.from('events').update(p).eq('id',editingEvent.id);if(error)throw error;toast.success('Updated!')}
      else{const{error}=await supabase.from('events').insert({...p,created_by:user?.id});if(error)throw error;toast.success('Published!')}
      setShowAddEvent(false);setEditingEvent(null);setNewEvent({title:'',date:'',location:'',description:'',virtual:false});loadEvents()
    }catch(err:any){toast.error(err.message)}
    setSavingEvent(false)
  }
  const deleteEvent=async(id:string)=>{if(!confirm('Delete?'))return;await supabase.from('events').delete().eq('id',id);toast.success('Deleted');loadEvents()}
  const [media,setMedia]=useState<any[]>([])
  const [loadingMedia,setLoadingMedia]=useState(true)
  const [showAddMedia,setShowAddMedia]=useState(false)
  const [savingMedia,setSavingMedia]=useState(false)
  const [editingMedia,setEditingMedia]=useState<any|null>(null)
  const [newMedia,setNewMedia]=useState({title:'',content:'',type:'article'})
  const loadMedia=async()=>{setLoadingMedia(true);const{data}=await supabase.from('media_posts').select('*').order('created_at',{ascending:false});setMedia(data||[]);setLoadingMedia(false)}
  const saveMedia=async(e:React.FormEvent)=>{
    e.preventDefault();setSavingMedia(true)
    try{
      const p={title:newMedia.title,content:newMedia.content,type:newMedia.type,published:true}
      if(editingMedia){const{error}=await supabase.from('media_posts').update(p).eq('id',editingMedia.id);if(error)throw error;toast.success('Updated!')}
      else{const{error}=await supabase.from('media_posts').insert({...p,created_by:user?.id});if(error)throw error;toast.success('Published!')}
      setShowAddMedia(false);setEditingMedia(null);setNewMedia({title:'',content:'',type:'article'});loadMedia()
    }catch(err:any){toast.error(err.message)}
    setSavingMedia(false)
  }
  const deleteMedia=async(id:string)=>{if(!confirm('Delete?'))return;await supabase.from('media_posts').delete().eq('id',id);toast.success('Deleted');loadMedia()}
  const [programs,setPrograms]=useState<any[]>([])
  const [loadingPrograms,setLoadingPrograms]=useState(true)
  const [showAddProgram,setShowAddProgram]=useState(false)
  const [savingProgram,setSavingProgram]=useState(false)
  const [editingProgram,setEditingProgram]=useState<any|null>(null)
  const [newProgram,setNewProgram]=useState({title:'',description:'',category:'',level:'Beginner',active:true})
  const loadPrograms=async()=>{setLoadingPrograms(true);const{data}=await supabase.from('programs').select('*').order('created_at',{ascending:false});setPrograms(data||[]);setLoadingPrograms(false)}
  const saveProgram=async(e:React.FormEvent)=>{
    e.preventDefault();setSavingProgram(true)
    try{
      const p={title:newProgram.title,description:newProgram.description,category:newProgram.category,level:newProgram.level,active:newProgram.active}
      if(editingProgram){const{error}=await supabase.from('programs').update(p).eq('id',editingProgram.id);if(error)throw error;toast.success('Updated!')}
      else{const{error}=await supabase.from('programs').insert({...p,created_by:user?.id});if(error)throw error;toast.success('Created!')}
      setShowAddProgram(false);setEditingProgram(null);setNewProgram({title:'',description:'',category:'',level:'Beginner',active:true});loadPrograms()
    }catch(err:any){toast.error(err.message)}
    setSavingProgram(false)
  }
  const deleteProgram=async(id:string)=>{if(!confirm('Delete?'))return;await supabase.from('programs').delete().eq('id',id);toast.success('Deleted');loadPrograms()}
  useEffect(()=>{if(tab==='about')loadAbout();if(tab==='events')loadEvents();if(tab==='media')loadMedia();if(tab==='programs')loadPrograms()},[tab])
  const tabs=[{key:'about' as Tab,label:'About Page',icon:'🏛️'},{key:'events' as Tab,label:'Events',icon:'📅'},{key:'media' as Tab,label:'Media',icon:'📸'},{key:'programs' as Tab,label:'Programs',icon:'🎓'}]
  return(
    <AdminLayout title="Site Content" current="/admin/content">
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium mb-6 ${DOMAIN==='ysdi'?'bg-ysdi/20 text-ysdi-light border border-ysdi/30':'bg-primary/20 text-primary-400 border border-primary/30'}`}>
        <span className={`w-2 h-2 rounded-full animate-pulse ${DOMAIN==='ysdi'?'bg-ysdi-light':'bg-primary-400'}`}/>
        Editing: <strong>{DOMAIN==='ysdi'?'YSDI Initiative':'AmpliYouth'}</strong> — separate from the other domain
      </div>
      <div className="flex gap-6">
        <div className="w-44 flex-shrink-0">
          <div className="glass rounded-2xl p-3 space-y-1">
            {tabs.map(t=><button key={t.key} onClick={()=>setTab(t.key)} className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${tab===t.key?'bg-ysdi/20 text-ysdi-light border border-ysdi/30':'text-white/50 hover:text-white hover:bg-white/5'}`}><span>{t.icon}</span>{t.label}</button>)}
          </div>
          <p className="text-white/20 text-xs mt-4 px-2 leading-relaxed">All changes go live on the site instantly.</p>
        </div>
        <div className="flex-1 min-w-0">
          {tab==='about'&&(<div>
            <div className="flex items-center justify-between mb-6"><div><h2 className="text-xl font-bold">🏛️ About Page</h2><p className="text-white/35 text-sm">Edit text on the public About page</p></div><button onClick={loadAbout} className="glass p-2.5 rounded-xl text-white/40 hover:text-white"><RefreshCw size={15} className={loadingAbout?'animate-spin':''}/></button></div>
            {loadingAbout?<div className="text-center py-16"><div className="w-6 h-6 border-2 border-ysdi/30 border-t-ysdi rounded-full animate-spin mx-auto"/></div>:<div className="space-y-4">{aboutFields.map(field=>(
              <div key={field.key} className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-white/70">{field.label}</label>
                  {editingId===field.key?<div className="flex gap-2"><button onClick={()=>saveAboutField(field)} disabled={savingAbout} className="flex items-center gap-1.5 text-xs text-emerald-400 glass px-3 py-1.5 rounded-lg disabled:opacity-50">{savingAbout?<Loader2 size={11} className="animate-spin"/>:<Save size={11}/>} Save</button><button onClick={()=>setEditingId(null)} className="flex items-center gap-1.5 text-xs text-white/30 glass px-3 py-1.5 rounded-lg"><X size={11}/> Cancel</button></div>:<button onClick={()=>{setEditingId(field.key);setEditVal(field.value)}} className="flex items-center gap-1.5 text-xs text-ysdi-light glass px-3 py-1.5 rounded-lg"><Edit size={11}/> Edit</button>}
                </div>
                {editingId===field.key?<textarea rows={5} className="input-glass resize-none w-full" value={editVal} onChange={e=>setEditVal(e.target.value)} autoFocus/>:<p className="text-white/55 text-sm leading-relaxed">{field.value}</p>}
              </div>
            ))}</div>}
          </div>)}
          {tab==='events'&&(<div>
            <div className="flex items-center justify-between mb-6"><div><h2 className="text-xl font-bold">📅 Events</h2><p className="text-white/35 text-sm">Create and manage public events</p></div><div className="flex gap-2"><button onClick={loadEvents} className="glass p-2.5 rounded-xl text-white/40 hover:text-white"><RefreshCw size={15} className={loadingEvents?'animate-spin':''}/></button><button onClick={()=>{setEditingEvent(null);setNewEvent({title:'',date:'',location:'',description:'',virtual:false});setShowAddEvent(true)}} className="btn-ysdi text-sm"><Plus size={15}/> Add Event</button></div></div>
            {showAddEvent&&<form onSubmit={saveEvent} className="glass rounded-2xl p-6 mb-5 border border-ysdi/20 space-y-4"><div className="flex items-center justify-between"><h3 className="font-semibold">{editingEvent?'Edit Event':'New Event'}</h3><button type="button" onClick={()=>{setShowAddEvent(false);setEditingEvent(null)}} className="text-white/30 hover:text-white"><X size={16}/></button></div><div className="grid md:grid-cols-2 gap-4"><div className="md:col-span-2"><label className="label">Title</label><input className="input-glass w-full" value={newEvent.title} onChange={e=>setNewEvent(n=>({...n,title:e.target.value}))} required/></div><div><label className="label">Date</label><input type="date" className="input-glass w-full" value={newEvent.date} onChange={e=>setNewEvent(n=>({...n,date:e.target.value}))}/></div><div><label className="label">Location</label><input className="input-glass w-full" placeholder="Lagos / Online" value={newEvent.location} onChange={e=>setNewEvent(n=>({...n,location:e.target.value}))} required/></div><div className="md:col-span-2"><label className="label">Description</label><textarea rows={3} className="input-glass resize-none w-full" value={newEvent.description} onChange={e=>setNewEvent(n=>({...n,description:e.target.value}))}/></div><label className="flex items-center gap-2 cursor-pointer text-sm text-white/60"><input type="checkbox" checked={newEvent.virtual} onChange={e=>setNewEvent(n=>({...n,virtual:e.target.checked}))} className="accent-purple-500 w-4 h-4"/> Virtual</label></div><div className="flex gap-3"><button type="submit" disabled={savingEvent} className="btn-ysdi text-sm disabled:opacity-50">{savingEvent?<Loader2 size={14} className="animate-spin"/>:<Plus size={14}/>}{savingEvent?'Saving...':editingEvent?'Save Changes':'Publish'}</button><button type="button" onClick={()=>{setShowAddEvent(false);setEditingEvent(null)}} className="btn-ghost text-sm">Cancel</button></div></form>}
            {loadingEvents?<div className="text-center py-16"><div className="w-6 h-6 border-2 border-ysdi/30 border-t-ysdi rounded-full animate-spin mx-auto"/></div>:events.length===0?<div className="text-center py-16 glass rounded-2xl"><div className="text-4xl mb-3">📅</div><p className="text-white/40">No events yet.</p></div>:<div className="space-y-3">{events.map(ev=><div key={ev.id} className="glass rounded-2xl p-5 flex items-center justify-between"><div><p className="font-semibold">{ev.title}</p><p className="text-white/40 text-xs mt-1">{ev.date?new Date(ev.date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}):'No date'} · {ev.location||'—'}{ev.virtual?' · Virtual':''}</p></div><div className="flex items-center gap-2"><span className="text-xs bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full">Live</span><button onClick={()=>{setEditingEvent(ev);setNewEvent({title:ev.title,date:ev.date?.slice(0,10)||'',location:ev.location||'',description:ev.description||'',virtual:ev.virtual||false});setShowAddEvent(true)}} className="glass p-1.5 rounded-lg text-white/30 hover:text-white"><Edit size={13}/></button><button onClick={()=>deleteEvent(ev.id)} className="glass p-1.5 rounded-lg text-red-400/50 hover:text-red-400"><Trash2 size={13}/></button></div></div>)}</div>}
          </div>)}
          {tab==='media'&&(<div>
            <div className="flex items-center justify-between mb-6"><div><h2 className="text-xl font-bold">📸 Media Posts</h2><p className="text-white/35 text-sm">Articles, videos, galleries, flyers</p></div><div className="flex gap-2"><button onClick={loadMedia} className="glass p-2.5 rounded-xl text-white/40 hover:text-white"><RefreshCw size={15} className={loadingMedia?'animate-spin':''}/></button><button onClick={()=>{setEditingMedia(null);setNewMedia({title:'',content:'',type:'article'});setShowAddMedia(true)}} className="btn-ysdi text-sm"><Plus size={15}/> Add Post</button></div></div>
            {showAddMedia&&<form onSubmit={saveMedia} className="glass rounded-2xl p-6 mb-5 border border-ysdi/20 space-y-4"><div className="flex items-center justify-between"><h3 className="font-semibold">{editingMedia?'Edit Post':'New Post'}</h3><button type="button" onClick={()=>{setShowAddMedia(false);setEditingMedia(null)}} className="text-white/30 hover:text-white"><X size={16}/></button></div><div><label className="label">Title</label><input className="input-glass w-full" value={newMedia.title} onChange={e=>setNewMedia(n=>({...n,title:e.target.value}))} required/></div><div><label className="label">Type</label><select className="input-glass w-full" style={ss} value={newMedia.type} onChange={e=>setNewMedia(n=>({...n,type:e.target.value}))}><option style={ss}>article</option><option style={ss}>video</option><option style={ss}>gallery</option><option style={ss}>flyer</option></select></div><div><label className="label">Content</label><textarea rows={5} className="input-glass resize-none w-full" value={newMedia.content} onChange={e=>setNewMedia(n=>({...n,content:e.target.value}))}/></div><div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-ysdi/30 cursor-pointer"><Upload size={20} className="mx-auto mb-2 text-white/25"/><p className="text-white/30 text-sm">Upload media (optional)</p></div><div className="flex gap-3"><button type="submit" disabled={savingMedia} className="btn-ysdi text-sm disabled:opacity-50">{savingMedia?<Loader2 size={14} className="animate-spin"/>:<Plus size={14}/>}{savingMedia?'Publishing...':editingMedia?'Save Changes':'Publish'}</button><button type="button" onClick={()=>{setShowAddMedia(false);setEditingMedia(null)}} className="btn-ghost text-sm">Cancel</button></div></form>}
            {loadingMedia?<div className="text-center py-16"><div className="w-6 h-6 border-2 border-ysdi/30 border-t-ysdi rounded-full animate-spin mx-auto"/></div>:media.length===0?<div className="text-center py-16 glass rounded-2xl"><div className="text-4xl mb-3">📸</div><p className="text-white/40">No posts yet.</p></div>:<div className="space-y-3">{media.map(post=><div key={post.id} className="glass rounded-2xl p-5 flex items-center justify-between"><div><p className="font-semibold">{post.title}</p><p className="text-white/40 text-xs mt-1 capitalize">{post.type} · {new Date(post.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</p></div><div className="flex items-center gap-2"><span className="text-xs bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full">Live</span><button onClick={()=>{setEditingMedia(post);setNewMedia({title:post.title,content:post.content||'',type:post.type});setShowAddMedia(true)}} className="glass p-1.5 rounded-lg text-white/30 hover:text-white"><Edit size={13}/></button><button onClick={()=>deleteMedia(post.id)} className="glass p-1.5 rounded-lg text-red-400/50 hover:text-red-400"><Trash2 size={13}/></button></div></div>)}</div>}
          </div>)}
          {tab==='programs'&&(<div>
            <div className="flex items-center justify-between mb-6"><div><h2 className="text-xl font-bold">🎓 Programs</h2><p className="text-white/35 text-sm">Create and manage programs on the Programs page</p></div><div className="flex gap-2"><button onClick={loadPrograms} className="glass p-2.5 rounded-xl text-white/40 hover:text-white"><RefreshCw size={15} className={loadingPrograms?'animate-spin':''}/></button><button onClick={()=>{setEditingProgram(null);setNewProgram({title:'',description:'',category:'',level:'Beginner',active:true});setShowAddProgram(true)}} className="btn-ysdi text-sm"><Plus size={15}/> Add Program</button></div></div>
            {showAddProgram&&<form onSubmit={saveProgram} className="glass rounded-2xl p-6 mb-5 border border-ysdi/20 space-y-4"><div className="flex items-center justify-between"><h3 className="font-semibold">{editingProgram?'Edit Program':'New Program'}</h3><button type="button" onClick={()=>{setShowAddProgram(false);setEditingProgram(null)}} className="text-white/30 hover:text-white"><X size={16}/></button></div><div><label className="label">Program Title</label><input className="input-glass w-full" value={newProgram.title} onChange={e=>setNewProgram(n=>({...n,title:e.target.value}))} required/></div><div><label className="label">Description</label><textarea rows={4} className="input-glass resize-none w-full" value={newProgram.description} onChange={e=>setNewProgram(n=>({...n,description:e.target.value}))}/></div><div className="grid md:grid-cols-2 gap-4"><div><label className="label">Category</label><input className="input-glass w-full" placeholder="e.g. Leadership, Advocacy..." value={newProgram.category} onChange={e=>setNewProgram(n=>({...n,category:e.target.value}))}/></div><div><label className="label">Level</label><select className="input-glass w-full" style={ss} value={newProgram.level} onChange={e=>setNewProgram(n=>({...n,level:e.target.value}))}><option style={ss}>Beginner</option><option style={ss}>Intermediate</option><option style={ss}>Advanced</option><option style={ss}>All Levels</option></select></div></div><label className="flex items-center gap-2 cursor-pointer text-sm text-white/60"><input type="checkbox" checked={newProgram.active} onChange={e=>setNewProgram(n=>({...n,active:e.target.checked}))} className="accent-green-500 w-4 h-4"/> Active / Visible on site</label><div className="flex gap-3"><button type="submit" disabled={savingProgram} className="btn-ysdi text-sm disabled:opacity-50">{savingProgram?<Loader2 size={14} className="animate-spin"/>:<Plus size={14}/>}{savingProgram?'Saving...':editingProgram?'Save Changes':'Create Program'}</button><button type="button" onClick={()=>{setShowAddProgram(false);setEditingProgram(null)}} className="btn-ghost text-sm">Cancel</button></div></form>}
            {loadingPrograms?<div className="text-center py-16"><div className="w-6 h-6 border-2 border-ysdi/30 border-t-ysdi rounded-full animate-spin mx-auto"/></div>:programs.length===0?<div className="text-center py-16 glass rounded-2xl"><div className="text-4xl mb-3">🎓</div><p className="text-white/40">No programs yet.</p></div>:<div className="space-y-3">{programs.map(prog=><div key={prog.id} className="glass rounded-2xl p-5 flex items-center justify-between"><div><p className="font-semibold">{prog.title}</p><p className="text-white/40 text-xs mt-1">{prog.category} · {prog.level}</p>{prog.description&&<p className="text-white/30 text-xs mt-1 line-clamp-1">{prog.description}</p>}</div><div className="flex items-center gap-2"><span className={`text-xs px-2 py-0.5 rounded-full ${prog.active?'bg-emerald-400/10 text-emerald-400':'bg-red-400/10 text-red-400'}`}>{prog.active?'Active':'Hidden'}</span><button onClick={()=>{setEditingProgram(prog);setNewProgram({title:prog.title,description:prog.description||'',category:prog.category||'',level:prog.level||'Beginner',active:prog.active});setShowAddProgram(true)}} className="glass p-1.5 rounded-lg text-white/30 hover:text-white"><Edit size={13}/></button><button onClick={()=>deleteProgram(prog.id)} className="glass p-1.5 rounded-lg text-red-400/50 hover:text-red-400"><Trash2 size={13}/></button></div></div>)}</div>}
          </div>)}
        </div>
      </div>
    </AdminLayout>
  )
}
