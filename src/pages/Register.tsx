import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, UserPlus, ArrowLeft, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { getDomain } from '../lib/domain'

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'', intent:'academy' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const domain = getDomain()
  const isYSDI = domain === 'ysdi'
  const accentLabel = isYSDI ? 'text-ysdi-light' : 'text-primary-400'

  const intents = [
    { value:'academy', label:'Join the Academy', icon:'🎓' },
    { value:'ambassador', label:'Campus Ambassador', icon:'🌍' },
    { value:'mentor', label:'Become a Mentor', icon:'🤝' },
    { value:'partner', label:'Partner / Organisation', icon:'🏢' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setLoading(true)
    const { error } = await signUp(form.email, form.password, form.name)
    if (error) {
      toast.error(error.message || 'Registration failed.')
    } else {
      setDone(true)
    }
    setLoading(false)
  }

  if (done) return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass rounded-3xl p-12 max-w-md w-full text-center">
        <CheckCircle size={56} className={`mx-auto mb-6 ${accentLabel}`} />
        <h2 className="text-2xl font-bold mb-4">Account Created!</h2>
        <p className="text-white/55 text-sm mb-8">
          Please check your email to verify your account. Once verified, your application will be reviewed by our team.
        </p>
        <Link to="/login" className={isYSDI ? 'btn-ysdi' : 'btn-primary'}>Go to Login</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className={`orb w-96 h-96 -top-32 -right-32 ${isYSDI ? 'bg-ysdi/20' : 'bg-primary/15'}`} />
      <div className={`orb w-72 h-72 bottom-0 -left-24 ${isYSDI ? 'bg-ysdi/10' : 'bg-primary/8'}`} />

      <div className="w-full max-w-lg relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to site
        </Link>

        <div className="glass rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold ${
              isYSDI ? 'bg-gradient-to-br from-ysdi to-ysdi-dark' : 'bg-gradient-to-br from-primary to-primary-700'
            }`}>
              {isYSDI ? 'Y' : 'A'}
            </div>
            <h1 className="text-2xl font-bold mb-1">Join AmpliYouth</h1>
            <p className="text-white/40 text-sm">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Intent selection */}
            <div>
              <label className="label">I want to...</label>
              <div className="grid grid-cols-2 gap-2">
                {intents.map(i => (
                  <button
                    key={i.value}
                    type="button"
                    onClick={() => setForm({...form, intent: i.value})}
                    className={`p-3 rounded-xl text-sm flex items-center gap-2 transition-all border ${
                      form.intent === i.value
                        ? isYSDI ? 'border-ysdi/50 bg-ysdi/10 text-ysdi-light' : 'border-primary/50 bg-primary/10 text-primary-400'
                        : 'border-white/5 glass text-white/50 hover:border-white/15'
                    }`}
                  >
                    <span>{i.icon}</span>
                    <span className="text-xs font-medium">{i.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Full Name</label>
              <input className="input-glass" placeholder="Ayotunde Aboderin" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input type="email" className="input-glass" placeholder="you@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <input type={show ? 'text' : 'password'} className="input-glass pr-11" placeholder="Min. 8 chars" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30">
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="label">Confirm Password</label>
                <input type="password" className="input-glass" placeholder="Repeat password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} required />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm ${
                isYSDI ? 'btn-ysdi' : 'btn-primary'
              } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <UserPlus size={16} />}
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="text-center text-xs text-white/30">
              By registering you agree to our{' '}
              <Link to="/terms" className={accentLabel}>Terms of Use</Link>
              {' '}and{' '}
              <Link to="/privacy" className={accentLabel}>Privacy Policy</Link>
            </p>
          </form>

          <p className="text-center text-sm text-white/40 mt-5">
            Already have an account?{' '}
            <Link to="/login" className={`${accentLabel} font-medium`}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}