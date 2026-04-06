import { useRef, useEffect, useCallback } from 'react'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered } from 'lucide-react'

interface RichEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  rows?: number
}

export default function RichEditor({ value, onChange, placeholder = 'Write here...', rows = 6 }: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [])

  const exec = useCallback((cmd: string, val?: string) => {
    document.execCommand(cmd, false, val)
    editorRef.current?.focus()
    onChange(editorRef.current?.innerHTML || '')
  }, [onChange])

  const tools = [
    { icon: Bold,          cmd: 'bold',           title: 'Bold' },
    { icon: Italic,        cmd: 'italic',          title: 'Italic' },
    { icon: Underline,     cmd: 'underline',       title: 'Underline' },
    { icon: AlignLeft,     cmd: 'justifyLeft',     title: 'Align Left' },
    { icon: AlignCenter,   cmd: 'justifyCenter',   title: 'Align Center' },
    { icon: AlignRight,    cmd: 'justifyRight',    title: 'Align Right' },
    { icon: AlignJustify,  cmd: 'justifyFull',     title: 'Justify' },
    { icon: List,          cmd: 'insertUnorderedList', title: 'Bullet List' },
    { icon: ListOrdered,   cmd: 'insertOrderedList',   title: 'Numbered List' },
  ]

  return (
    <div className="rich-editor glass rounded-xl overflow-hidden border border-white/10">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-white/8 bg-white/3">
        {tools.map(({ icon: Icon, cmd, title }) => (
          <button key={cmd} type="button" title={title}
            onMouseDown={e => { e.preventDefault(); exec(cmd) }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <Icon size={13} />
          </button>
        ))}
        <div className="w-px h-4 bg-white/10 mx-1" />
        {/* Font size */}
        <select onMouseDown={e => e.stopPropagation()} onChange={e => exec('fontSize', e.target.value)}
          className="text-xs bg-transparent border border-white/10 rounded-lg px-2 py-1 text-white/50 hover:text-white outline-none"
          style={{ background: '#111827' }}
          defaultValue="3">
          <option value="1" style={{ background: '#111827' }}>Small</option>
          <option value="3" style={{ background: '#111827' }}>Normal</option>
          <option value="5" style={{ background: '#111827' }}>Large</option>
          <option value="7" style={{ background: '#111827' }}>Huge</option>
        </select>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={() => onChange(editorRef.current?.innerHTML || '')}
        className="px-4 py-3 text-sm text-white/80 leading-relaxed outline-none"
        style={{ minHeight: `${rows * 1.75}rem` }}
      />
    </div>
  )
}
