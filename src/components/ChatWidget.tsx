import { useState, useEffect, useRef, useCallback } from 'react'
import { Send, Paperclip, Smile } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Avatar from './Avatar'

interface Message {
  id: string
  from_id: string
  to_id: string | null
  content: string
  created_at: string
  from_profile?: { full_name: string; avatar_url: string | null }
}

interface ChatWidgetProps {
  threadId: string
  toId?: string
  placeholder?: string
  height?: string | number // <- fixed TS2322 error
  showHeader?: boolean
  recipientName?: string
}

export default function ChatWidget({
  threadId,
  toId,
  placeholder = 'Type a message...',
  height = 'h-96',
  showHeader = false,
  recipientName,
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const { user, profile } = useAuth()
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('messages')
      .select('*, from_profile:profiles!from_id(full_name, avatar_url)')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true })
      .limit(100)

    if (!error && data) setMessages(data as any)
    setLoading(false)
  }, [threadId])

  useEffect(() => {
    fetchMessages()

    const channel = supabase
      .channel(`chat:${threadId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `thread_id=eq.${threadId}`,
      }, async (payload) => {
        const { data: prof } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', payload.new.from_id)
          .single()

        setMessages(prev => [...prev, { ...payload.new, from_profile: prof } as Message])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [threadId, fetchMessages])

  useEffect(() => { scrollBottom() }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || !user || sending) return
    setSending(true)
    const { error } = await supabase.from('messages').insert({
      from_id: user.id,
      to_id: toId || null,
      thread_id: threadId,
      content: input.trim(),
    })
    if (!error) setInput('')
    setSending(false)
  }

  const isMe = (fromId: string) => fromId === user?.id

  return (
    <div className={`flex flex-col ${height} glass rounded-2xl overflow-hidden`}>
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-white/25 text-sm">
            No messages yet. Say hello! 👋
          </div>
        ) : (
          messages.map((msg) => {
            const me = isMe(msg.from_id)
            const senderName = me ? (profile?.full_name || 'You') : (msg.from_profile?.full_name || 'Unknown')
            return (
              <div key={msg.id} className={`flex items-end gap-2 ${me ? 'flex-row-reverse' : 'flex-row'}`}>
                {!me && (
                  <Avatar name={senderName} size="xs" rounded="lg" />
                )}
                <div className={`max-w-xs lg:max-w-sm ${me ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  {!me && <span className="text-[10px] text-white/30 px-1">{senderName}</span>}
                  <div className={me ? 'chat-bubble-out' : 'chat-bubble-in'}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <p className="text-[10px] text-white/30 mt-1 text-right">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/5 px-4 py-3 flex items-center gap-2">
        <input
          className="input-glass flex-1 text-sm py-2.5"
          placeholder={placeholder}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
          disabled={!user}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || sending}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:opacity-90 transition-all"
        >
          {sending
            ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <Send size={15} />
          }
        </button>
      </div>
    </div>
  )
}