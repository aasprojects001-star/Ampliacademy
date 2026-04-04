import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { getDomain } from '../lib/domain'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const domain = getDomain()
  const isYSDI = domain === 'ysdi'
  const accent = isYSDI ? 'text-gradient-ysdi' : 'text-gradient'
  const accentLabel = isYSDI ? 'text-ysdi-light' : 'text-primary-400'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.')
    } else {
      toast.success('Welcome back!')
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div className={`orb w-96 h-96 -top-32 -left-32 ${isYSDI ? 'bg-ysdi/20' : 'bg-primary/15'}`} />
      <div className={`orb w-72 h-72 -bottom-24 -right-24 ${isYSDI ? 'bg-ysdi/10' : 'bg-primary/8'}`} />

      <div className="w-full max-w-md relative z-10">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to site
        </Link>

        <div className="glass rounded-3xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold ${
              isYSDI ? 'bg-gradient-to-br from-ysdi to-ysdi-dark shadow-ysdi' : 'bg-gradient-to-br from-primary to-primary-700 shadow-glow'
            }`}>
              {isYSDI ? 'Y' : 'A'}
            </div>
            <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
            <p className="text-white/40 text-sm">Sign in to your {isYSDI ? 'YSDI' : 'AmpliYouth'} account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className="input-glass"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  className="input-glass pr-11"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-white/50 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 accent-green-500" />
                Remember me
              </label>
              <button type="button" className={`text-sm ${accentLabel}`}>Forgot password?</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                isYSDI ? 'btn-ysdi' : 'btn-primary'
              } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <LogIn size={16} />}
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className={`${accentLabel} font-medium`}>Create one</Link>
          </p>

          {/* CEO login note */}
          <div className="mt-6 p-3 glass rounded-xl">
            <p className="text-[11px] text-white/25 text-center">
              Admin / CEO access: Use your assigned credentials to access the dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
