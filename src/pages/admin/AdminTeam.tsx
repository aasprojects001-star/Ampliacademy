import { useState } from 'react'
import { AdminLayout } from './AdminDashboard'
import { Plus, Edit, Trash2, Shield, Eye, EyeOff, Copy, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const PERMISSIONS = [
  { key:'edit_about',    label:'Edit About Page' },
  { key:'edit_events',   label:'Manage Events' },
  { key:'edit_media',    label:'Manage Media' },
  { key:'edit_programs', label:'Manage Programs' },
  { key:'edit_resources',label:'Manage Resources' },
  { key:'manage_mentors',label:'Manage Mentors' },
  { key:'manage_ambassadors', label:'Approve Ambassadors' },
  { key:'manage_academy',label:'Oversee Academy' },
  { key:'assign_tasks',  label:'Assign Tasks' },
  { key:'view_analytics',label:'View Analytics' },
]

const POSITIONS = ['Media Manager','Events Coordinator','Programs Officer','Tech Lead','Communications Officer','Finance Officer','Operations Manager','Content Editor']

const mockTeam = [
  { id:'1', name:'Tunde Ibrahim', email:'tunde@ysdi.org', position:'Media Manager', permissions:['edit_media','edit_events'], active:true },
  { id:'2', name:'Ngozi Eze', email:'ngozi@ysdi.org', position:'Programs Officer', permissions:['edit_programs','manage_mentors','manage_academy'], active:true },
  { id:'3', name:'Kofi Mensah', email:'kofi@ysdi.org', position:'Events Coordinator', permissions:['edit_events'], active:true },
]

interface NewMember {
  name: string; email: string; position: string; permissions: string[]; password: string
}

export default function AdminTeam() {
  const [team, setTeam] = useState(mockTeam)
  const [showForm, setShowForm] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [generatedCreds, setGeneratedCreds] = useState<{email:string;password:string}|null>(null)
  const [form, setForm] = useState<NewMember>({ name:'', email:'', position:'', permissions:[], password:'' })
  const [loading, setLoading] = useState(false)
  const { isCEO } = useAuth()

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$!'
    return Array.from({length:12}, () => chars[Math.floor(Math.random()*chars.length)]).join('')
  }

  const handleGenPassword = () => {
    const pw = generatePassword()
    setForm(f => ({...f, password: pw}))
  }

  const togglePermission = (key: string) => {
    setForm(f => ({
      ...f,
      permissions: f.permissions.includes(key)
        ? f.permissions.filter(p => p !== key)
        : [...f.permissions, key]
    }))
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.password) { toast.error('Generate or set a password first'); return }
    setLoading(true)
    // In production: supabase.auth.admin.createUser + profiles insert
    await new Promise(r => setTimeout(r, 1200))
    setTeam(prev => [...prev, { id: Date.now().toString(), name: form.name, email: form.email, position: form.position, permissions: form.permissions, active: true }])
    setGeneratedCreds({ email: form.email, password: form.password })
    setForm({ name:'', email:'', position:'', permissions:[], password:'' })
    setLoading(false)
    toast.success(`Team member ${form.name} created!`)
  }

  const copyText = (text: string) => { navigator.clipboard.writeText(text); toast.success('Copied!') }

  return (
    <AdminLayout title="Team Members" current="/admin/team">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-white/45 text-sm">Manage team members, roles, and site permissions.</p>
        </div>
        {isCEO() && (
          <button onClick={() => setShowForm(true)} className="btn-ysdi text-sm">
            <Plus size={16} /> Add Team Member
          </button>
        )}
      </div>

      {/* Generated credentials display */}
      {generatedCreds && (
        <div className="glass rounded-2xl p-6 mb-6 border border-emerald-500/30">
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-emerald-400 mb-3">Team Member Created Successfully</p>
              <p className="text-sm text-white/60 mb-3">Share these login credentials securely with the new team member:</p>
              <div className="space-y-2">
                {[
                  { label:'Email', value: generatedCreds.email },
                  { label:'Password', value: generatedCreds.password },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-3 glass px-4 py-2.5 rounded-xl">
                    <span className="text-xs text-white/40 w-16">{label}:</span>
                    <span className="text-sm font-mono flex-1">{value}</span>
                    <button onClick={() => copyText(value)} className="text-white/30 hover:text-white">
                      <Copy size={13} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => setGeneratedCreds(null)} className="text-xs text-white/30 mt-3 hover:text-white">Dismiss</button>
            </div>
          </div>
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <div className="glass rounded-2xl p-6 mb-6 border border-ysdi/20">
          <h3 className="font-semibold mb-6 flex items-center gap-2"><Shield size={17} className="text-ysdi-light" /> Create New Team Member</h3>
          <form onSubmit={handleCreate} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name</label>
                <input className="input-glass" placeholder="John Doe" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} required />
              </div>
              <div>
                <label className="label">Email Address</label>
                <input type="email" className="input-glass" placeholder="john@ysdi.org" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} required />
              </div>
            </div>

            <div>
              <label className="label">Position / Title</label>
              <select className="input-glass" value={form.position} onChange={e => setForm(f=>({...f,position:e.target.value}))} required>
                <option value="">Select position...</option>
                {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label className="label">Login Password</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input type={showPw ? 'text':'password'} className="input-glass pr-10" placeholder="Enter or generate a password" value={form.password} onChange={e => setForm(f=>({...f,password:e.target.value}))} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <button type="button" onClick={handleGenPassword} className="btn-ghost text-xs px-4 whitespace-nowrap">Generate</button>
              </div>
            </div>

            <div>
              <label className="label">Site Permissions</label>
              <div className="grid grid-cols-2 gap-2">
                {PERMISSIONS.map(({ key, label }) => (
                  <label key={key} className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-all border ${
                    form.permissions.includes(key)
                      ? 'border-ysdi/40 bg-ysdi/10 text-ysdi-light'
                      : 'border-white/5 glass text-white/50 hover:border-white/15'
                  }`}>
                    <input type="checkbox" className="hidden" checked={form.permissions.includes(key)} onChange={() => togglePermission(key)} />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                      form.permissions.includes(key) ? 'bg-ysdi border-ysdi' : 'border-white/20'
                    }`}>
                      {form.permissions.includes(key) && <CheckCircle size={11} className="text-white" />}
                    </div>
                    <span className="text-xs">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="btn-ysdi text-sm">
                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus size={15} />}
                {loading ? 'Creating...' : 'Create Member'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-ghost text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Team list */}
      <div className="space-y-3">
        {team.map(member => (
          <div key={member.id} className="glass rounded-2xl p-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ysdi to-ysdi-dark flex items-center justify-center font-bold text-lg flex-shrink-0">
              {member.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-white/40 text-sm">{member.email}</p>
                  <p className="text-ysdi-light text-xs font-medium mt-1">{member.position}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${member.active ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'}`}>
                    {member.active ? 'Active' : 'Inactive'}
                  </span>
                  {isCEO() && (
                    <>
                      <button className="glass p-1.5 rounded-lg text-white/30 hover:text-white"><Edit size={13} /></button>
                      <button className="glass p-1.5 rounded-lg text-red-400/60 hover:text-red-400"><Trash2 size={13} /></button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {member.permissions.map(p => {
                  const label = PERMISSIONS.find(x => x.key === p)?.label || p
                  return <span key={p} className="text-[10px] glass px-2 py-0.5 rounded-full text-ysdi-light">{label}</span>
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
