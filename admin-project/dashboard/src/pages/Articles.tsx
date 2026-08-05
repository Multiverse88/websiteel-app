import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import Modal from '../components/Modal'
import ImagePicker from '../components/ImagePicker'
import TiptapEditor from '../components/TiptapEditor'
import ArticleLivePreview from '../components/ArticleLivePreview'
import { Image as ImageIcon, Upload, Loader2, X, Save } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  coverImage: string
  readTime: string
  viewCount: number
  createdAt: string
  status?: string
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const emptyForm = { title: '', slug: '', excerpt: '', content: '', category: '', coverImage: '', readTime: '5 min read', status: 'published' }

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Article | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<Article | null>(null)
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const handleDirectUpload = async (file: File) => {
    setUploadingImage(true)
    try {
      const res = await api.uploadMedia(file)
      if (res && res.data && res.data.url) {
        setForm(prev => ({ ...prev, coverImage: res.data.url }))
      }
    } catch (err: any) {
      alert('Gagal mengunggah & kompres gambar ke MinIO CDN: ' + (err.message || 'Error'))
    } finally {
      setUploadingImage(false)
    }
  }

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getArticles()
      setArticles(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.slug?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory ? a.category === selectedCategory : true
    const matchesStatus = selectedStatus ? (a.status || 'published') === selectedStatus : true
    return matchesSearch && matchesCategory && matchesStatus
  })

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const handleTitleChange = (newTitle: string) => {
    if (!editing) {
      setForm((prev) => ({
        ...prev,
        title: newTitle,
        slug: slugify(newTitle),
      }))
    } else {
      setForm((prev) => ({ ...prev, title: newTitle }))
    }
  }

  const regenerateSlug = () => {
    setForm((prev) => ({ ...prev, slug: slugify(prev.title) }))
  }

  const openEdit = (article: Article) => {
    setEditing(article)
    setForm({
      title: article.title || '',
      slug: article.slug || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      category: article.category || '',
      coverImage: article.coverImage || '',
      readTime: article.readTime || '5 min read',
      status: article.status || 'published',
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (editing) {
        await api.updateArticle(editing.id, form)
      } else {
        await api.createArticle(form)
      }
      setModalOpen(false)
      load()
    } catch (e: any) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteConfirm) return
    try {
      await api.deleteArticle(deleteConfirm.id)
      setDeleteConfirm(null)
      load()
    } catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-[32px] pb-12">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] font-sans text-gray-900">Manajemen Artikel</h1>
          <p className="text-[14px] leading-[22px] font-sans text-gray-500 mt-1">Kelola, edit, dan publikasikan artikel hukum terbaru.</p>
        </div>
        <button 
          onClick={openCreate}
          className="bg-[#6f0000] hover:bg-[#7A0101] text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm text-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Buat Artikel Baru
        </button>
      </section>

      {/* Data Table Panel */}
      <section className="bg-white border border-gray-200 rounded-xl flex flex-col flex-1 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        {/* Toolbar: Search & Filters */}
        <div className="p-[20px] border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-[#f8f9fa]">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] text-[14px] transition-all placeholder:text-gray-400" 
              placeholder="Cari judul artikel..." 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-48">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] text-[14px] text-gray-700 cursor-pointer"
              >
                <option value="">Semua Kategori</option>
                <option value="Pendirian PT">Pendirian PT</option>
                <option value="Legalitas PT">Legalitas PT</option>
                <option value="Merek & HAKI">Merek & HAKI</option>
                <option value="Sertifikasi ISO">Sertifikasi ISO</option>
                <option value="Perizinan">Perizinan</option>
                <option value="NIB">NIB</option>
                <option value="Pajak">Pajak</option>
                <option value="Branding">Branding</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">expand_more</span>
            </div>
            <div className="relative w-full md:w-36">
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] text-[14px] text-gray-700 cursor-pointer"
              >
                <option value="">Semua Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">expand_more</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f8f9fa] text-[12px] font-bold text-gray-500 uppercase border-b border-gray-200 tracking-wider">
              <tr>
                <th className="py-3.5 px-6 font-medium">Judul Artikel</th>
                <th className="py-3.5 px-6 font-medium">Kategori</th>
                <th className="py-3.5 px-6 font-medium">Status</th>
                <th className="py-3.5 px-6 font-medium">Waktu Baca</th>
                <th className="py-3.5 px-6 font-medium">Views</th>
                <th className="py-3.5 px-6 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-[14px]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
                    <p className="mt-2 text-sm">Memuat artikel...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-40">description</span>
                    <p>Tidak ada artikel yang ditemukan.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FEF2F2]/30 transition-colors h-[52px] group">
                    <td className="py-3 px-6">
                      <span className="font-semibold text-gray-900 block truncate max-w-sm" title={item.title}>
                        {item.title}
                      </span>
                      <span className="text-xs text-gray-400">{item.slug}</span>
                    </td>
                    <td className="py-3 px-6 text-gray-500 whitespace-nowrap">
                      {item.category || '-'}
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                        {item.status || 'PUBLISHED'}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-gray-500 whitespace-nowrap">
                      {item.readTime || '5 min read'}
                    </td>
                    <td className="py-3 px-6 text-gray-700 font-mono text-sm whitespace-nowrap">
                      {item.viewCount || 0}
                    </td>
                    <td className="py-3 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEdit(item)}
                          className="p-1.5 text-gray-500 hover:text-[#6f0000] rounded hover:bg-gray-100 transition-colors" 
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm(item)}
                          className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-red-50 transition-colors" 
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 border-t border-gray-200 bg-[#f8f9fa] flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Menampilkan {filtered.length} dari {articles.length} artikel
          </span>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-200 rounded-md text-gray-400 hover:bg-gray-100 transition disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#6f0000] text-white font-semibold text-sm">1</button>
            <button className="p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-100 transition">
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Edit/Create Fullscreen Studio */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-100 flex flex-col overflow-hidden">
          {/* Top Navbar & Metadata Form */}
          <div className="border-b border-gray-200 bg-white p-4 shrink-0 shadow-sm z-20 flex flex-col gap-3">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <button onClick={() => setModalOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                     <X size={20} />
                   </button>
                   <h2 className="font-semibold text-lg text-gray-800">{editing ? 'Edit Artikel' : 'Buat Artikel Baru'}</h2>
                </div>
                <div className="flex items-center gap-3">
                   <button onClick={() => setModalOpen(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">Batal</button>
                   <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#6f0000] hover:bg-[#7A0101] text-white rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-sm">
                      <Save size={16} />
                      {saving ? 'Menyimpan...' : 'Simpan Artikel'}
                   </button>
                </div>
             </div>
             
             <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Judul Artikel</label>
                  <input className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] transition-all" value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Masukkan judul artikel..." />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1 flex justify-between">
                    Slug 
                    <button type="button" onClick={regenerateSlug} className="text-[10px] text-[#6f0000] hover:underline flex items-center gap-1" title="Generate ulang slug dari judul">
                      <span className="material-symbols-outlined text-[13px]">sync</span> Auto
                    </button>
                  </label>
                  <input className="w-full p-2.5 border border-gray-200 rounded-lg text-sm font-mono outline-none focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] transition-all" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="slug-artikel" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Kategori</label>
                  <select className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] transition-all cursor-pointer bg-white" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option value="">Pilih Kategori</option>
                    <option value="Pendirian PT">Pendirian PT</option>
                    <option value="Legalitas PT">Legalitas PT</option>
                    <option value="Merek & HAKI">Merek & HAKI</option>
                    <option value="Sertifikasi ISO">Sertifikasi ISO</option>
                    <option value="Perizinan">Perizinan</option>
                    <option value="NIB">NIB</option>
                    <option value="Pajak">Pajak</option>
                    <option value="Branding">Branding</option>
                  </select>
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1 flex justify-between">
                    Cover Image URL
                    <span className="text-[10px] font-semibold text-[#990202]">MinIO CDN</span>
                  </label>
                  <div className="flex gap-1.5 items-center">
                    <input className="w-full p-2.5 border border-gray-200 rounded-lg text-xs font-mono outline-none focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] transition-all" value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})} placeholder="https://cdn..." />
                    <button type="button" onClick={() => setIsImagePickerOpen(true)} className="p-2.5 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors shrink-0" title="Media Library CDN"><ImageIcon size={16} /></button>
                    <label className={`p-2.5 bg-red-50 border border-red-200 text-[#990202] rounded-lg cursor-pointer hover:bg-red-100 flex items-center justify-center transition-colors shrink-0 ${uploadingImage ? 'opacity-70 pointer-events-none' : ''}`} title="Upload & Kompres ke MinIO CDN">
                      {uploadingImage ? <Loader2 size={16} className="animate-spin text-[#990202]" /> : <Upload size={16} />}
                      <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if(f) handleDirectUpload(f); }} />
                    </label>
                  </div>
                </div>
             </div>
             
             <div className="grid grid-cols-12 gap-4">
                <div className="col-span-9">
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Excerpt / Ringkasan</label>
                  <input className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] transition-all" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} placeholder="Ringkasan singkat artikel..." />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Waktu Baca</label>
                  <input className="w-full p-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] transition-all" value={form.readTime} onChange={e => setForm({...form, readTime: e.target.value})} placeholder="e.g. 5 min read" />
                </div>
             </div>
          </div>

          {/* Split Pane: Editor and Preview */}
          <div className="flex-1 flex overflow-hidden">
             <div className="w-1/2 border-r border-gray-200 bg-white flex flex-col relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="p-2.5 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-widest flex justify-between items-center shrink-0">
                   <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-[16px]">edit_document</span>
                     Editor Konten
                   </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                   <TiptapEditor content={form.content} onChange={(content) => setForm({ ...form, content })} />
                </div>
             </div>
             <div className="w-1/2 bg-[#f8f9fa] flex flex-col relative">
                <div className="p-2.5 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-widest flex justify-between items-center shrink-0">
                   <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-[16px]">preview</span>
                     Live Preview
                   </div>
                </div>
                <div className="flex-1 overflow-y-auto relative">
                   <ArticleLivePreview 
                      title={form.title} 
                      content={form.content} 
                      coverImage={form.coverImage} 
                      category={form.category} 
                      readTime={form.readTime} 
                   />
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Hapus Artikel">
        <p className="text-sm text-gray-600">Apakah Anda yakin ingin menghapus artikel <strong>{deleteConfirm?.title}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
        <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-200">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition" onClick={() => setDeleteConfirm(null)}>Batal</button>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition shadow-sm" onClick={handleDelete}>Hapus</button>
        </div>
      </Modal>

      <ImagePicker
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onSelect={(url) => setForm(prev => ({ ...prev, coverImage: url }))}
      />
    </div>
  )
}
