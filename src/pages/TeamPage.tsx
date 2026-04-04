import { Linkedin, Twitter, Mail } from 'lucide-react'

const departments = [
  {
    name: 'Leadership',
    members: [
      { name: 'Ayotunde Aboderin', role: 'CEO & Founder', dept: 'Leadership', bio: 'Youth advocate and social impact leader driving Pan-African youth development.', avatar: 'AA', socials: true },
    ]
  },
  {
    name: 'Programs',
    members: [
      { name: 'Programs Director', role: 'Head of Programs', dept: 'Programs', bio: 'Overseeing all academy and mentorship programming across the organisation.', avatar: 'PD', socials: false },
      { name: 'Events Manager', role: 'Events & Partnerships', dept: 'Programs', bio: 'Coordinating flagship events, summits, and partnership activations.', avatar: 'EM', socials: false },
    ]
  },
  {
    name: 'Media & Communications',
    members: [
      { name: 'Media Manager', role: 'Head of Communications', dept: 'Media', bio: 'Driving brand storytelling, social media, and media relations.', avatar: 'MM', socials: false },
    ]
  },
  {
    name: 'Technology',
    members: [
      { name: 'Tech Lead', role: 'Head of Technology', dept: 'Tech', bio: 'Building and maintaining the digital infrastructure that powers our programs.', avatar: 'TL', socials: false },
    ]
  },
]

const colors = ['from-emerald-500 to-teal-600','from-blue-500 to-indigo-600','from-purple-500 to-violet-600','from-amber-500 to-orange-500','from-rose-500 to-pink-600']

export default function TeamPage() {
  return (
    <>
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className="orb w-80 h-80 -top-24 right-0 bg-ysdi/15" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-5 text-ysdi-light">Our People</p>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Meet the <span className="text-gradient-ysdi">Team</span>
          </h1>
          <p className="text-white/55 text-xl max-w-xl mx-auto">
            The dedicated individuals behind YSDI Initiative and AmpliYouth Advocacy Academy.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="max-w-7xl mx-auto space-y-16">
          {departments.map(dept => (
            <div key={dept.name}>
              <h2 className="text-2xl font-bold mb-8 text-gradient-ysdi">{dept.name}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {dept.members.map((m, i) => (
                  <div key={m.name} className="glass-hover p-6 text-center group">
                    <div className={`w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold bg-gradient-to-br ${colors[i % colors.length]}`}>
                      {m.avatar}
                    </div>
                    <h4 className="font-semibold text-lg mb-1">{m.name}</h4>
                    <p className="text-ysdi-light text-xs font-medium mb-3">{m.role}</p>
                    <p className="text-white/45 text-xs leading-relaxed mb-5">{m.bio}</p>
                    {m.socials && (
                      <div className="flex items-center justify-center gap-2">
                        {[Linkedin, Twitter, Mail].map((Icon, j) => (
                          <a key={j} href="#" className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all">
                            <Icon size={13} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Coming soon slot */}
                <div className="glass p-6 text-center border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center min-h-48">
                  <div className="w-16 h-16 rounded-2xl border border-dashed border-white/15 flex items-center justify-center text-2xl mx-auto mb-3 text-white/20">+</div>
                  <p className="text-white/25 text-sm">Join Our Team</p>
                  <p className="text-white/15 text-xs mt-1">Open positions available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="section">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-12 text-center border border-ysdi/20 relative overflow-hidden">
          <div className="orb w-48 h-48 -top-12 left-1/2 -translate-x-1/2 bg-ysdi/20" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-5">Want to Join Our <span className="text-gradient-ysdi">Team?</span></h2>
            <p className="text-white/50 mb-8">We're always looking for passionate people to join the YSDI Initiative.</p>
            <a href="mailto:jobs@ysdiinitiative.org" className="btn-ysdi">View Open Roles</a>
          </div>
        </div>
      </section>
    </>
  )
}
