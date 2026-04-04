import { useState } from 'react'
import { AdminLayout } from './AdminDashboard'
import { Plus, CheckSquare, Clock, AlertCircle, CheckCircle, Circle, Edit, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

const mockTasks = [
  { id:1, title:'Review January ambassador reports', desc:'Go through all 18 submitted reports and provide feedback.', assignedTo:'Ngozi Eze', assignedBy:'CEO', status:'in_progress', priority:'high', due:'Feb 5, 2025' },
  { id:2, title:'Publish summit recap article', desc:'Write and publish the article about the Leadership Summit 2024.', assignedTo:'Tunde Ibrahim', assignedBy:'CEO', status:'pending', priority:'medium', due:'Feb 10, 2025' },
  { id:3, title:'Update events page for March events', desc:'Add the bootcamp and summit events to the site.', assignedTo:'Tunde Ibrahim', assignedBy:'CEO', status:'completed', priority:'low', due:'Feb 1, 2025' },
  { id:4, title:'Onboard Cohort 5 mentees', desc:'Set up mentorship groups for all 42 new Cohort 5 mentees.', assignedTo:'Ngozi Eze', assignedBy:'CEO', status:'pending', priority:'high', due:'Feb 15, 2025' },
]

const teamMembers = ['Tunde Ibrahim', 'Ngozi Eze', 'Kofi Mensah']
const priorityColors: Record<string, string> = {
  high:   'text-red-400 bg-red-400/10',
  medium: 'text-amber-400 bg-amber-400/10',
  low:    'text-emerald-400 bg-emerald-400/10',
}
const statusIcons: Record<string, any> = {
  pending:     { icon: Circle, color:'text-white/30' },
  in_progress: { icon: Clock,  color:'text-amber-400' },
  completed:   { icon: CheckCircle, color:'text-emerald-400' },
}

export default function AdminTasks() {
  const [tasks, setTasks] = useState(mockTasks)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title:'', desc:'', assignedTo:'', priority:'medium', due:'' })
  const { profile, isCEO, isAdmin } = useAuth()

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    setTasks(prev => [...prev, { id: Date.now(), ...form, assignedBy: profile?.full_name || 'Admin', status:'pending' }])
    toast.success('Task assigned!')
    setShowForm(false)
    setForm({ title:'', desc:'', assignedTo:'', priority:'medium', due:'' })
  }

  const updateStatus = (id: number, status: string) => {
    setTasks(prev => prev.map(t => t.id === id ? {...t, status} : t))
    toast.success('Task status updated!')
  }

  const myTasks = profile ? tasks.filter(t => t.assignedTo === profile.full_name || isCEO() || isAdmin()) : tasks

  const counts = {
    pending:     tasks.filter(t=>t.status==='pending').length,
    in_progress: tasks.filter(t=>t.status==='in_progress').length,
    completed:   tasks.filter(t=>t.status==='completed').length,
  }

  return (
    <AdminLayout title="Task Management" current="/admin/tasks">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label:'Pending', count:counts.pending, color:'text-white/50', bg:'bg-white/5' },
          { label:'In Progress', count:counts.in_progress, color:'text-amber-400', bg:'bg-amber-400/10' },
          { label:'Completed', count:counts.completed, color:'text-emerald-400', bg:'bg-emerald-400/10' },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className="glass rounded-2xl p-5 text-center">
            <p className={`text-3xl font-bold ${color} mb-1`}>{count}</p>
            <p className="text-white/40 text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-white/45 text-sm">Showing {myTasks.length} tasks</p>
        {(isCEO() || isAdmin()) && (
          <button onClick={() => setShowForm(true)} className="btn-ysdi text-sm"><Plus size={15} /> Assign Task</button>
        )}
      </div>

      {/* Create task form */}
      {showForm && (
        <form onSubmit={handleCreate} className="glass rounded-2xl p-6 mb-6 border border-ysdi/20 space-y-4">
          <h3 className="font-semibold">Assign New Task</h3>
          <div>
            <label className="label">Task Title</label>
            <input className="input-glass" placeholder="What needs to be done?" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} required />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea rows={2} className="input-glass resize-none w-full" placeholder="More details..." value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="label">Assign To</label>
              <select className="input-glass" value={form.assignedTo} onChange={e=>setForm(f=>({...f,assignedTo:e.target.value}))} required>
                <option value="">Select member...</option>
                {teamMembers.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Priority</label>
              <select className="input-glass" value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="label">Due Date</label>
              <input type="date" className="input-glass" value={form.due} onChange={e=>setForm(f=>({...f,due:e.target.value}))} />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-ysdi text-sm"><CheckSquare size={14} /> Assign Task</button>
            <button type="button" onClick={()=>setShowForm(false)} className="btn-ghost text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {myTasks.map(task => {
          const { icon: StatusIcon, color } = statusIcons[task.status]
          return (
            <div key={task.id} className={`glass rounded-2xl p-5 flex items-start gap-4 ${task.status === 'completed' ? 'opacity-60' : ''}`}>
              <button onClick={() => {
                const next = task.status === 'pending' ? 'in_progress' : task.status === 'in_progress' ? 'completed' : 'pending'
                updateStatus(task.id, next)
              }} className="mt-0.5 flex-shrink-0">
                <StatusIcon size={20} className={color} />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`font-semibold ${task.status === 'completed' ? 'line-through text-white/40' : ''}`}>{task.title}</p>
                    <p className="text-white/40 text-xs mt-1">{task.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${priorityColors[task.priority]}`}>{task.priority}</span>
                    {(isCEO() || isAdmin()) && (
                      <button className="glass p-1.5 rounded-lg text-red-400/60 hover:text-red-400"><Trash2 size={12} /></button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
                  <span>Assigned to: <span className="text-white/50">{task.assignedTo}</span></span>
                  {task.due && <span className="flex items-center gap-1"><Clock size={11} />{task.due}</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </AdminLayout>
  )
}
