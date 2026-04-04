import { useState, useRef, useEffect } from 'react'
import { Send, Search, Circle, Phone, Video, MoreHorizontal } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// -------------------- PageLoader Component --------------------
export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-white/50 text-sm">Loading...</p>
    </div>
  )
}
// --------------------------------------------------------------

export interface ChatContact {
  id: string
  name: string
  role?: string
  avatar: string
  online?: boolean
  unread?: number
  lastMessage?: string
}

export interface ChatMessage {
  id: number | string
  from: string
  content: string
  time: string
  isMe: boolean
}

interface ChatUIProps {
  contacts: ChatContact[]
  initialMessages?: Record<string, ChatMessage[]>
  accentColor?: 'green' | 'purple'
  onSend?: (toId: string, message: string) => void
  compact?: boolean
}

export default function ChatUI({
  contacts,
  initialMessages = {},
  accentColor = 'green',
  onSend,
  compact = false,
}: ChatUIProps) {
  const [selected, setSelected] = useState(contacts[0]?.id || '')
  const [threads, setThreads] = useState<Record<string, ChatMessage[]>>(initialMessages)
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const msgEnd = useRef<HTMLDivElement>(null)
  const { profile } = useAuth()

  const accent = accentColor === 'purple'
    ? { active: 'bg-ysdi/20 text-ysdi-light border-ysdi/30', bubble: 'glass-ysdi', btn: 'btn-ysdi', text: 'text-ysdi-light' }
    : { active: 'bg-primary/20 text-primary-300 border-primary/30', bubble: 'glass-primary', btn: 'btn-primary', text: 'text-primary-400' }

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [threads, selected])

  const sendMessage = () => {
    if (!input.trim()) return
    const msg: ChatMessage = {
      id: Date.now(),
      from: profile?.full_name || 'Me',
      content: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    }
    setThreads(prev => ({ ...prev, [selected]: [...(prev[selected] || []), msg] }))
    onSend?.(selected, input.trim())
    setInput('')
  }

  const currentContact = contacts.find(c => c.id === selected)
  const messages = threads[selected] || []
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const avatarBg = accentColor === 'purple'
    ? 'bg-gradient-to-br from-ysdi to-ysdi-dark'
    : 'bg-gradient-to-br from-primary to-primary-700'

  return (
    <div className={`flex ${compact ? 'h-96' : 'h-[calc(100vh-200px)]'} gap-0 glass rounded-2xl overflow-hidden`}>
      {/* Contact list */}
      <div className="w-60 border-r border-white/5 flex flex-col flex-shrink-0">
        <div className="p-3 border-b border-white/5">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              className="input-glass text-xs py-2 pl-9 w-full"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {filteredContacts.map(contact => (
            <button
              key={contact.id}
              onClick={() => setSelected(contact.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left border ${
                selected === contact.id
                  ? `${accent.active} border`
                  : 'border-transparent hover:bg-white/5'
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className={`w-9 h-9 rounded-xl ${avatarBg} flex items-center justify-center text-xs font-bold`}>
                  {contact.avatar}
                </div>
                {contact.online !== undefined && (
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-dark-bg ${
                    contact.online ? 'bg-emerald-400' : 'bg-white/20'
                  }`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{contact.name}</p>
                {contact.role && <p className="text-white/30 text-[10px] truncate">{contact.role}</p>}
                {contact.lastMessage && <p className="text-white/25 text-[10px] truncate">{contact.lastMessage}</p>}
              </div>
              {contact.unread && contact.unread > 0 && (
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white flex-shrink-0 ${
                  accentColor === 'purple' ? 'bg-ysdi' : 'bg-primary'
                }`}>
                  {contact.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {currentContact ? (
          <>
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${avatarBg} flex items-center justify-center text-xs font-bold`}>
                  {currentContact.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{currentContact.name}</p>
                  <p className={`text-xs flex items-center gap-1 ${
                    currentContact.online ? 'text-emerald-400' : 'text-white/30'
                  }`}>
                    <Circle size={6} className={currentContact.online ? 'fill-emerald-400' : 'fill-white/30'} />
                    {currentContact.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-white/20 text-sm">Start a conversation with {currentContact.name}</p>
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                      msg.isMe
                        ? `${accent.bubble} rounded-tr-sm`
                        : 'glass rounded-tl-sm'
                    }`}>
                      <p>{msg.content}</p>
                      <p className="text-[10px] text-white/30 mt-1 text-right">{msg.time}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={msgEnd} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/5 flex gap-2">
              <input
                className="input-glass flex-1 text-sm"
                placeholder={`Message ${currentContact.name}...`}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className={`${accent.btn} px-4 py-2.5 rounded-xl flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                <Send size={15} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/20">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  )
}