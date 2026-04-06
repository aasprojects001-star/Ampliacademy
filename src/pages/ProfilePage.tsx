import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { getDomain } from '../lib/domain'

export default function ProfilePage() {
  const { profile, refreshProfile, signOut } = useAuth()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const domain   = getDomain()
  const isYSDI   = domain === 'ysdi'

  const [name,    setName]    = useState(profile?.full_name || '')
  const [bio,     setBio]     = useState(profile?.bio || '')
  const [saving,  setSaving]  = useState(false)
  const [pwForm,  setPwForm]  = useState({ current: '', next: '', confirm: '' })
  const [showPw,  setShowPw]  = useState(false)
  const [savingPw,setSavingPw]= useState(false)

  const accentBg  = isYSDI ? 'bg-gradient-to-br from-ysdi to-ysdi-dark' : 'bg-gradient-to-br from-primary to-primary-700'
  const accentLabel = isYSDI ? 'text-ysdi-light' : 'text-primary-400'
  const accentBorder= isYSDI ? 'border-ysdi/20' : 'border-primary/20'

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    const { error } = await supabase.from('profiles').update({ full_name: name, bio }).eq('id', profile?.id)
    if (error) toast.error(error.message)
    else { await refreshProfile(); toast.success('Profile updated!') }
    setSaving(false)
  }

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (pwForm.next !== pwForm.confirm) { toast.error('New passwords do not match'); return }
    if (pwForm.next.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setSavingPw(true)
    const { error } = await supabase.auth.updateUser({ password: pwForm.next })
    if (error) toast.error(error.message)
    else { toast.success('Password changed!'); setPwForm({ current:'', next:'', confirm:'' }) }
    setSavingPw(false)
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex items-center gap-4 mb-10">
          <div className={`w-16 h-16 rounded-2xl ${accentBg} flex items-center justify-center text-2xl font-bold`}>
            {profile?.full_name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile?.full_name}</h1>
            <p className={`text-sm font-medium capitalize ${accentLabel}`}>{profile?.role?.replace(/_/g,' ')}</p>
          </div>
        </div>

        {/* Appearance */}
        <div className={`glass rounded-2xl p-6 mb-5 border ${accentBorder}`}>
          <h3 className="font-semibold mb-5 flex items-center gap-2">🎨 Appearance</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-white/35 text-xs mt-0.5">Switch between dark and light mode</p>
            </div>
            <button onClick={toggle}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${theme === 'light' ? (isYSDI ? 'bg-ysdi' : 'bg-primary') : 'bg-white/15'}`}>
              <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${theme === 'light' ? 'left-8' : 'left-1'}`} />
            </button>
          </div>
          <p className="text-white/25 text-xs mt-3">Currently: <span className="text-white/50 font-medium capitalize">{theme} mode</span></p>
        </div>

        {/* Profile */}
        <form onSubmit={saveProfile} className={`glass rounded-2xl p-6 mb-5 border ${accentBorder}`}>
          <h3 className="font-semibold mb-5 flex items-center gap-2"><User size={16} className={accentLabel} /> Edit Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input className="input-glass w-full" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input-glass w-full opacity-50 cursor-not-allowed" value={profile?.email || ''} disabled />
              <p className="text-white/25 text-xs mt-1">Email cannot be changed here</p>
            </div>
            <div>
              <label className="label">Bio</label>
              <textarea rows={3} className="input-glass w-full resize-none" value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell us about yourself..." />
            </div>
            <div>
              <label className="label">Role</label>
              <input className="input-glass w-full opacity-50 cursor-not-allowed capitalize" value={profile?.role?.replace(/_/g,' ') || ''} disabled />
            </div>
          </div>
          <button type="submit" disabled={saving} className={`mt-5 ${isYSDI ? 'btn-ysdi' : 'btn-primary'} text-sm disabled:opacity-50`}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>

        {/* Password */}
        <form onSubmit={changePassword} className={`glass rounded-2xl p-6 border ${accentBorder}`}>
          <h3 className="font-semibold mb-5 flex items-center gap-2"><Lock size={16} className={accentLabel} /> Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="label">New Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} className="input-glass w-full pr-11" value={pwForm.next} onChange={e => setPwForm(p => ({ ...p, next: e.target.value }))} placeholder="Min. 8 characters" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className="label">Confirm New Password</label>
              <input type="password" className="input-glass w-full" value={pwForm.confirm} onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))} placeholder="Repeat new password" />
            </div>
          </div>
          <button type="submit" disabled={savingPw} className={`mt-5 ${isYSDI ? 'btn-ysdi' : 'btn-primary'} text-sm disabled:opacity-50`}>
            {savingPw ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
            {savingPw ? 'Changing...' : 'Change Password'}
          </button>
        </form>

        {/* Danger zone */}
        <div className="glass rounded-2xl p-6 mt-5 border border-red-500/20">
          <h3 className="font-semibold mb-3 text-red-400">Sign Out</h3>
          <p className="text-white/40 text-sm mb-4">You will be signed out of your account on this device.</p>
          <button onClick={signOut} className="bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
