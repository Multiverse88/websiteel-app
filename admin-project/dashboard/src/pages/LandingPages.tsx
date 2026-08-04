import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'

interface LandingPage {
  _id: string
  title: string
  slug: string
  content: string
  status: string
  createdAt: string
}

const emptyForm = { title: '', slug: '', content: '', status: 'draft' }

export default function LandingPages() {
  const [pages, setPages] = useState<LandingPage[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<LandingPage | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<LandingPage | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getLandingPages()
      setPages(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = pages.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.slug?.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (page: LandingPage) => {
    setEditing(page)
    setForm({ title: page.title, slug: page.slug, content: page.content, status: page.status })
    setModalOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (editing) {
        await api.updateLandingPage(editing._id, form)
      } else {
        await api.createLandingPage(form)
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
      await api.deleteLandingPage(deleteConfirm._id)
      setDeleteConfirm(null)
      load()
    } catch (e: any) {
      alert(e.message)
    }
  }

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'slug', label: 'Slug' },
    { key: 'status', label: 'Status', render: (v: string) => <span className={`badge badge--${v === 'published' ? 'success' : 'warning'}`}>{v}</span> },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <input
          type="text"
          className="form-input form-input--search"
          placeholder="Search landing pages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn--primary" onClick={openCreate}>+ New Landing Page</button>
      </div>
      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        emptyMessage="No landing pages found"
        onEdit={openEdit}
        onDelete={setDeleteConfirm}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Landing Page' : 'New Landing Page'}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Slug</label>
          <input className="form-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea className="form-textarea" rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Status</label>
          <select className="form-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="modal-actions">
          <button className="btn btn--outline" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn--primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Landing Page">
        <p>Are you sure you want to delete <strong>{deleteConfirm?.title}</strong>?</p>
        <div className="modal-actions">
          <button className="btn btn--outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
          <button className="btn btn--danger" onClick={handleDelete}>Delete</button>
        </div>
      </Modal>
    </div>
  )
}
