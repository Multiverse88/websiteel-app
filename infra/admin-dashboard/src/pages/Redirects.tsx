import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'

interface Redirect {
  id: string
  domain: string
  slug: string
  destination: string
  clicks: number
  createdAt: string
}

const emptyForm = { domain: 'easylegal.my.id', slug: '', destination: '' }

export default function Redirects() {
  const [redirects, setRedirects] = useState<Redirect[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Redirect | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<Redirect | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getRedirects()
      setRedirects(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      if (editing) {
        await api.updateRedirect(editing.id, form)
      } else {
        await api.createRedirect(form)
      }
      setModalOpen(false)
      setEditing(null)
      setForm(emptyForm)
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
      await api.deleteRedirect(deleteConfirm.id)
      setDeleteConfirm(null)
      load()
    } catch (e: any) {
      alert(e.message)
    }
  }

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (redirect: Redirect) => {
    setEditing(redirect)
    setForm({ domain: redirect.domain || 'easylegal.my.id', slug: redirect.slug, destination: redirect.destination })
    setModalOpen(true)
  }

  const columns = [
    { key: 'domain', label: 'Domain' },
    { key: 'slug', label: 'Slug' },
    { 
      key: 'destination', 
      label: 'Destination',
      render: (val: string) => (
        <div className="max-w-xs md:max-w-md lg:max-w-lg truncate" title={val}>
          <a href={val} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
            {val}
          </a>
        </div>
      )
    },
    { key: 'clicks', label: 'Clicks' },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <div />
        <button className="btn btn--primary" onClick={openCreate}>
          + New Redirect
        </button>
      </div>
      <DataTable
        columns={columns}
        data={redirects}
        loading={loading}
        emptyMessage="No redirects found"
        onEdit={openEdit}
        onDelete={setDeleteConfirm}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Redirect' : 'New Redirect'}>
        <div className="form-group">
          <label className="form-label">Domain</label>
          <select className="form-input" value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })}>
            <option value="easylegal.my.id">easylegal.my.id</option>
            <option value="easylegal.biz.id">easylegal.biz.id</option>
            
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Slug / From Path</label>
          <input className="form-input" placeholder="/old-path" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Destination / To URL</label>
          <input className="form-input" placeholder="/new-path or https://..." value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
        </div>
        <div className="modal-actions">
          <button className="btn btn--outline" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn--primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
          </button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Redirect">
        <p>Are you sure you want to delete the redirect {deleteConfirm?.slug}?</p>
        <div className="modal-actions">
          <button className="btn btn--outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
          <button className="btn btn--danger" onClick={handleDelete}>Delete</button>
        </div>
      </Modal>
    </div>
  )
}
