import { useState } from 'react'
import { Mail, MapPin, Send, MessageCircle, Phone, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { getDomain } from '../lib/domain'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [loading, setLoading] = useState(false)
  const domain = getDomain()
  const isYSDI = domain === 'ysdi'
  const accent = isYSDI ? 'text-gradient-ysdi' : 'text-gradient'
  const accentLabel = isYSDI ? 'text-ysdi-light' : 'text-primary-400'
  const accentBorder = isYSDI ? 'border-ysdi/20' : 'border-primary/20'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // In production, this would insert to Supabase or call an email service
    await new Promise(r => setTimeout(r, 1200))
    toast.success('Message sent! We\'ll be in touch soon.')
    setForm({ name:'', email:'', subject:'', message:'' })
    setLoading(false)
  }

  return (
    <>
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className={`orb w-80 h-80 -top-24 right-0 ${isYSDI ? 'bg-ysdi/12' : 'bg-primary/8'}`} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${accentLabel}`}>Contact</p>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Let's <span className={accent}>Connect</span>
          </h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto">Have a question, want to partner, or just want to say hello? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            {[
              { icon: Mail, title: 'Email Us', value: `info@${isYSDI ? 'ysdiinitiative' : 'ampliyouth'}.org`, sub: 'We reply within 24 hours' },
              { icon: MapPin, title: 'Location', value: 'Lagos, Nigeria', sub: 'Pan-African operations' },
              { icon: MessageCircle, title: 'Social Media', value: '@AmpliYouth', sub: 'Instagram · Twitter · LinkedIn' },
            ].map(({ icon: Icon, title, value, sub }) => (
              <div key={title} className={`glass p-6 rounded-2xl border ${accentBorder}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isYSDI ? 'bg-ysdi/20' : 'bg-primary/20'}`}>
                    <Icon size={18} className={accentLabel} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5">{title}</p>
                    <p className="text-white/70 text-sm">{value}</p>
                    <p className="text-white/35 text-xs mt-0.5">{sub}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className={`glass p-6 rounded-2xl border ${accentBorder} mt-4`}>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="space-y-2">
                {['Apply to Academy', 'Become a Campus Ambassador', 'Partner With Us', 'Media Inquiries'].map(l => (
                  <button key={l} className={`flex items-center gap-2 text-sm ${accentLabel} hover:gap-3 transition-all`}>
                    <ArrowRight size={13} /> {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="glass rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-7">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="label">Full Name</label>
                    <input className="input-glass" placeholder="Ayotunde Aboderin" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input type="email" className="input-glass" placeholder="you@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                  </div>
                </div>
                <div>
                  <label className="label">Subject</label>
                  <input className="input-glass" placeholder="How can we help?" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required />
                </div>
                <div>
                  <label className="label">Message</label>
                  <textarea rows={5} className="input-glass resize-none" placeholder="Tell us more..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
                </div>
                <button type="submit" disabled={loading} className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${isYSDI ? 'btn-ysdi' : 'btn-primary'} ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={15} />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
