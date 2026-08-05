import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'

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
}

const emptyForm = { title: '', slug: '', excerpt: '', content: '', category: '', coverImage: '', readTime: '5 min read' }

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Article | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<Article | null>(null)

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

  const filtered = articles.filter(
    (a) =>
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.slug?.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (article: Article) => {
    setEditing(article)
    setForm({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      coverImage: article.coverImage,
      readTime: article.readTime,
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

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'readTime', label: 'Read Time' },
    { key: 'viewCount', label: 'Views' },
    { key: 'createdAt', label: 'Date', render: (v: string) => new Date(v).toLocaleDateString() },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <input
          type="text"
          className="form-input form-input--search"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn--primary" onClick={openCreate}>+ New Article</button>
      </div>
      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        emptyMessage="No articles found"
        onEdit={openEdit}
        onDelete={setDeleteConfirm}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Article' : 'New Article'}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Slug</label>
          <input className="form-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Excerpt</label>
          <input className="form-input" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select className="form-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="">Select Category</option>
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
        <div className="form-group">
          <label className="form-label">Cover Image URL</label>
          <input className="form-input" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Read Time</label>
          <input className="form-input" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} placeholder="e.g. 5 min read" />
        </div>
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea className="form-textarea" rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        </div>
        <div className="modal-actions">
          <button className="btn btn--outline" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn--primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Article">
        <p>Are you sure you want to delete <strong>{deleteConfirm?.title}</strong>?</p>
        <div className="modal-actions">
          <button className="btn btn--outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
          <button className="btn btn--danger" onClick={handleDelete}>Delete</button>
        </div>
      </Modal>
    </div>
  )
}
