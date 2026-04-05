import { useState, useEffect, useRef, useCallback } from 'react'
import { Send } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

interface Message {
  id: string; from_id: string; to_id: string | null
  thread_id: string | null; content: string; created_at: string; sender_name?: string
}

export default function ChatWidget({ threadId, toId, placeholder = 'Type a message...', height = 'h-96' }: { threadId: string; toId?: string; placeholder?: string; height?: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const { user, profile } = useAuth()
  const bottomRef = useRef<HTMLDivElement>(null)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('messages').select('id,from_id,to_id,thread_id,content,created_at')
      .eq('thread_id', threadId).order('created_at', { ascending: true }).limit(100)
    if (error) { console.error('Chat fetch:', error.message); setLoading(false); return }
    if (!data?.length) { setMessages([]); setLoading(false); return }
    const ids = [...new Set(data.map(m => m.from_id))]
    const { data: profiles } = await supabase.from('profiles').select('id,full_name').in('id', ids)
    const map: Record<string,string> = {}
    profiles?.forEach(p => { map[p.id] = p.full_name })
    setMessages(data.map(m => ({ ...m, sender_name: map[m.from_id] || 'Unknown' })))
    setLoading(false)
  }, [threadId])

  useEffect(() => {
    fetchMessages()
    const ch = supabase.channel(`chat_${threadId}`)
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'messages', filter:`thread_id=eq.${threadId}` },
        async (payload) => {
          const msg = payload.new as Message
          const { data: p } = await supabase.from('profiles').select('full_name').eq('id', msg.from_id).single()
          setMessages(prev => [...prev, { ...msg, sender_name: p?.full_name || 'Unknown' }])
        }).subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [threadId, fetchMessages])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || !user || sending) return
    setSending(true)
    const { error } = await supabase.from('messages').insert({ from_id: user.id, to_id: toId || null, thread_id: threadId, content: input.trim() })
    if (error) console.error('Send:', error.message)
    else setInput('')
    setSending(false)
  }

  const isMe = (id: string) => id === user?.id

  return (
    <div className={`flex flex-col ${height} glass rounded-2xl overflow-hidden`}>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-full"><div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-white/25 text-sm">No messages yet. Say hello! 👋</div>
        ) : messages.map(msg => {
          const me = isMe(msg.from_id)
          const name = me ? (profile?.full_name || 'You') : (msg.sender_name || 'Unknown')
          return (
            <div key={msg.id} className={`flex items-end gap-2 ${me ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${me ? 'bg-gradient-to-br from-primary to-primary-700' : 'bg-gradient-to-br from-ysdi to-ysdi-dark'}`}>{name.charAt(0).toUpperCase()}</div>
              <div className={`flex flex-col gap-0.5 max-w-xs ${me ? 'items-end' : 'items-start'}`}>
                {!me && <span className="text-[10px] text-white/30 px-1">{name}</span>}
                <div className={`rounded-2xl px-4 py-2.5 text-sm ${me ? 'glass-primary rounded-tr-sm' : 'glass rounded-tl-sm'}`}>
                  <p>{msg.content}</p>
                  <p className="text-[10px] text-white/30 mt-1 text-right">{new Date(msg.created_at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-white/5 px-4 py-3 flex items-center gap-2">
        <input className="input-glass flex-1 text-sm py-2.5" placeholder={user ? placeholder : 'Sign in to chat'} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()} }} disabled={!user||sending} />
        <button onClick={sendMessage} disabled={!input.trim()||sending||!user} className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center flex-shrink-0 disabled:opacity-40 shadow-glow">
          {sending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={15} />}
        </button>
      </div>
    </div>
  )
}
