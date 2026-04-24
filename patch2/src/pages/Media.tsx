import { useState, useEffect } from 'react'
import { Play, Image, FileText, Newspaper } from 'lucide-react'
import { getDomain } from '../lib/domain'
import { supabase } from '../lib/supabase'

const typeConfig: Record<string, { icon: any; label: string; color: string }> = {
  article: { icon: Newspaper, label: 'Article', color: 'text-blue-400'   },
  video:   { icon: Play,      label: 'Video',   color: 'text-rose-400'   },
  gallery: { icon: Image,     label: 'Gallery', color: 'text-amber-400'  },
  flyer:   { icon: FileText,  label: 'Flyer',   color: 'text-purple-400' },
}

export default function Media() {
  const [filter,  setFilter]  = useState<'all' | 'article' | 'video' | 'gallery' | 'flyer'>('all')
  const [posts,   setPosts]   = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const domain  = getDomain()
  const isYSDI  = domain === 'ysdi'
  const accent      = isYSDI ? 'text-gradient-ysdi' : 'text-gradient'
  const accentLabel = isYSDI ? 'text-ysdi-light'    : 'text-primary-400'
  const accentBg    = isYSDI ? 'bg-ysdi'            : 'bg-primary'

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      let q = supabase.from('media_posts').select('*').eq('published', true).order('created_at', { ascending: false })
      if (filter !== 'all') q = q.eq('type', filter)
      const { data } = await q
      setPosts(data || [])
      setLoading(false)
    }
    load()
  }, [filter])

  return (
    <>
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className={`orb w-80 h-80 -top-24 right-0 ${isYSDI ? 'bg-ysdi/12' : 'bg-primary/8'}`} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-5 ${accentLabel}`}>Media</p>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Stories, <span className={accent}>Impact</span> & Insight</h1>
          <p className="text-white/55 text-lg max-w-xl mx-auto">Articles, videos, galleries, and announcements from across the community.</p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-10">
            {(['all', 'article', 'video', 'gallery', 'flyer'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${filter === f ? `${accentBg} text-white` : 'glass text-white/50 hover:text-white'}`}>
                {f === 'all' ? 'All Media' : f}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-24"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" /></div>
          ) : posts.length === 0 ? (
            <div className="text-center py-24 glass rounded-3xl">
              <p className="text-white/40 font-medium">No media posts yet.</p>
              <p className="text-white/20 text-sm mt-2">Content published from the admin dashboard will appear here.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map(post => {
                const cfg = typeConfig[post.type] || typeConfig.article
                const TypeIcon = cfg.icon
                // FIX: use media_url (the correct column name), not image_url
                const mediaUrl = post.media_url

                return (
                  <div key={post.id} className="glass-hover overflow-hidden group">
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-white/5 to-white/2 flex items-center justify-center">
                      {/* FIX: video type gets a <video> element, image types get <img> */}
                      {mediaUrl && post.type === 'video' ? (
                        <video
                          src={mediaUrl}
                          className="w-full h-full object-cover opacity-80"
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ) : mediaUrl ? (
                        <img
                          src={mediaUrl}
                          alt={post.title}
                          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      ) : (
                        // Placeholder when no media uploaded
                        <div className="flex flex-col items-center gap-2 opacity-20">
                          <TypeIcon size={32} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent" />
                      <div className={`absolute top-3 left-3 flex items-center gap-1.5 glass px-3 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
                        <TypeIcon size={12} />{cfg.label}
                      </div>
                      {post.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                            <Play size={20} className="fill-white ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold leading-snug mb-2">{post.title}</h3>
                      {post.content && (
                        <div
                          className="text-white/40 text-sm line-clamp-2 mb-4"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                      )}
                      <div className="flex items-center justify-between text-xs text-white/30">
                        <span className="capitalize">{post.type}</span>
                        <span>{new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
