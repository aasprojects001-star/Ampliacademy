import { useState } from 'react'
import { BookOpen, Download, Search, Eye } from 'lucide-react'

const ebooks = [
  { id:1, title:'Youth Advocacy Handbook', author:'AmpliYouth Editorial', pages:124, category:'Advocacy', cover:'📋', year:2024, downloads:1240 },
  { id:2, title:'Leadership Across Cultures: African Perspectives', author:'Prof. James Mwangi', pages:210, category:'Leadership', cover:'🌍', year:2024, downloads:890 },
  { id:3, title:'Policy Brief Writing for Young Africans', author:'Dr. Chioma Adeyemi', pages:88, category:'Policy', cover:'📜', year:2023, downloads:765 },
  { id:4, title:'The Campus Organiser\'s Bible', author:'AmpliYouth Team', pages:96, category:'Organising', cover:'🏫', year:2024, downloads:543 },
  { id:5, title:'Digital Advocacy in the 21st Century', author:'Emeka Okafor', pages:142, category:'Digital', cover:'📱', year:2024, downloads:698 },
  { id:6, title:'Funding Youth Initiatives: A Practical Guide', author:'AmpliYouth Finance Team', pages:78, category:'Funding', cover:'💰', year:2023, downloads:1102 },
  { id:7, title:'Storytelling for Social Change', author:'Fatima Al-Hassan', pages:116, category:'Communication', cover:'✍️', year:2024, downloads:421 },
  { id:8, title:'Understanding African Governance Systems', author:'Prof. James Mwangi', pages:188, category:'Policy', cover:'🏛️', year:2023, downloads:334 },
]

const categories = ['All', 'Advocacy', 'Leadership', 'Policy', 'Organising', 'Digital', 'Funding', 'Communication']

export default function AcademyEbooks() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = ebooks.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())
    const matchCat = cat === 'All' || b.category === cat
    return matchSearch && matchCat
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">E-<span className="text-gradient">Library</span></h1>
        <p className="text-white/45">Free ebooks, guides, and research papers for your leadership journey.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input className="input-glass pl-11 w-full" placeholder="Search titles or authors..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${cat === c ? 'bg-primary text-white' : 'glass text-white/50 hover:text-white'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map(book => (
          <div key={book.id} className="glass-hover p-6">
            <div className="w-full h-40 glass rounded-xl flex items-center justify-center text-6xl mb-5">
              {book.cover}
            </div>
            <p className="text-xs text-primary-400 font-semibold mb-1.5">{book.category}</p>
            <h3 className="font-semibold leading-snug mb-1.5 text-sm">{book.title}</h3>
            <p className="text-white/35 text-xs mb-1">{book.author}</p>
            <p className="text-white/25 text-xs mb-4">{book.pages} pages · {book.year}</p>
            <div className="flex items-center justify-between text-xs text-white/30 mb-4">
              <span className="flex items-center gap-1"><Download size={11} />{book.downloads.toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 glass py-2 rounded-xl text-xs text-white/60 hover:text-white transition-all">
                <Eye size={12} /> Preview
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 btn-primary py-2 text-xs rounded-xl justify-center">
                <Download size={12} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/30">
          <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
          <p>No books found matching your search.</p>
        </div>
      )}
    </div>
  )
}
