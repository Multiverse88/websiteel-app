import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import Modal from '../components/Modal'
import ImagePicker from '../components/ImagePicker'


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
  seoTitle?: string
  seoDesc?: string
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Helper to simulate Yoast SEO Score based on article fields (Sync with ArticleEditor analyzeSEO)
function getSeoScore(article: Article): { score: number, color: string, dot: string, label: string } {
  let score = 0;
  let totalChecks = 7;
  
  const contentText = (article.content || "").toLowerCase();
  const titleText = (article.title || "").toLowerCase();
  const excerptText = (article.excerpt || "").toLowerCase();

  // 1. Content length
  const wordCount = contentText.split(/\s+/).filter(w => w.length > 0).length;
  if (wordCount >= 300) score++;

  // 2. Title length
  if (titleText.length >= 30 && titleText.length <= 60) score++;

  // 3. Excerpt length
  if (excerptText.length >= 120 && excerptText.length <= 160) score++;

  // 4. Headings
  if (contentText.includes("### ") || contentText.includes("<h3")) score++;

  // 5. Links
  if (contentText.includes("](") || contentText.includes("<a ")) score++;

  // 6. Images
  if (contentText.includes("![") || contentText.includes("<img ") || article.coverImage) score++;

  const percentage = Math.round((score / totalChecks) * 100);

  if (percentage >= 80) return { score: percentage, color: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500', label: 'Good' };
  if (percentage >= 50) return { score: percentage, color: 'text-amber-700 bg-amber-50 border-amber-200', dot: 'bg-amber-500', label: 'OK' };
  return { score: percentage, color: 'text-red-700 bg-red-50 border-red-200', dot: 'bg-red-500', label: 'Needs Imprv' };
}

const emptyForm = { title: '', slug: '', excerpt: '', content: '', category: '', coverImage: '', readTime: '5 min read', status: 'published' }

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [sortView, setSortView] = useState('newest')
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

  let filtered = articles.filter((a) => {
    const matchesSearch =
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.slug?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory ? a.category === selectedCategory : true
    const matchesStatus = selectedStatus ? (a.status || 'published') === selectedStatus : true
    return matchesSearch && matchesCategory && matchesStatus
  })

  filtered = filtered.sort((a, b) => {
    if (sortView === 'views_desc') {
      return (b.viewCount || 0) - (a.viewCount || 0)
    } else if (sortView === 'views_asc') {
      return (a.viewCount || 0) - (b.viewCount || 0)
    } else if (sortView === 'seo_desc') {
      return getSeoScore(b).score - getSeoScore(a).score
    } else if (sortView === 'seo_asc') {
      return getSeoScore(a).score - getSeoScore(b).score
    }
    // fallback or 'newest'
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const openCreate = () => {
    window.location.hash = "#/articles/tambah"
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
    // Navigate to editor with ID (to be handled in editor)
    window.location.hash = `#/articles/tambah?id=${article.id}`
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
            <div className="relative w-full md:w-52">
              <select 
                value={sortView}
                onChange={(e) => setSortView(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] text-[14px] text-gray-700 cursor-pointer"
              >
                <option value="newest">Terbaru</option>
                <option value="views_desc">Views Tertinggi</option>
                <option value="views_asc">Views Terendah</option>
                <option value="seo_desc">SEO Score Tertinggi</option>
                <option value="seo_asc">SEO Score Terendah</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">sort</span>
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
                <th className="py-3.5 px-6 font-medium">SEO Score</th>
                <th className="py-3.5 px-6 font-medium">Waktu Baca</th>
                <th className="py-3.5 px-6 font-medium">Views</th>
                <th className="py-3.5 px-6 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-[14px]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
                    <p className="mt-2 text-sm">Memuat artikel...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
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
                    <td className="py-3 px-6 whitespace-nowrap">
                      {(() => {
                        const seo = getSeoScore(item);
                        return (
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${seo.color}`}>
                            <span className={`w-2 h-2 rounded-full ${seo.dot}`}></span>
                            {seo.score}/100
                          </div>
                        )
                      })()}
                    </td>
                    <td className="py-3 px-6 text-gray-500 text-[13px] whitespace-nowrap">
                      {item.readTime || '5 min read'}
                    </td>
                    <td className="py-3 px-6 text-gray-700 font-mono text-sm whitespace-nowrap">
                      {item.viewCount || 0}
                    </td>
                    <td className="py-3 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <a 
                          href={`https://easylegal.my.id/artikel/${item.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-500 hover:text-blue-600 rounded hover:bg-blue-50 transition-colors" 
                          title="Lihat Artikel"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </a>
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
