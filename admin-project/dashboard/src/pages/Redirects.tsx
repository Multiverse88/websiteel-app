import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'

interface Redirect {
  _id: string
  from: string
  to: string
  statusCode: number
  createdAt: string
}

const emptyForm = { from: '', to: '', statusCode: 301 }

export default function Redirects() {
  const [redirects, setRedirects] = useState<Redirect[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
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
      await api.createRedirect({ ...form, statusCode: Number(form.statusCode) })
      setModalOpen(false)
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
      await api.deleteRedirect(deleteConfirm._id)
      setDeleteConfirm(null)
      load()
    } catch (e: any) {
      alert(e.message)
    }
  }

  const columns = [
    { key: 'from', label: 'From' },
    { key: 'to', label: 'To' },
    { key: 'statusCode', label: 'Status Code' },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <div />
        <button className="btn btn--primary" onClick={() => { setForm(emptyForm); setModalOpen(true) }}>
          + New Redirect
        </button>
      </div>
      <DataTable
        columns={columns}
        data={redirects}
        loading={loading}
        emptyMessage="No redirects found"
        onDelete={setDeleteConfirm}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="New Redirect">
        <div className="form-group">
          <label className="form-label">From Path</label>
          <input className="form-input" placeholder="/old-path" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">To URL</label>
          <input className="form-input" placeholder="/new-path or https://..." value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Status Code</label>
          <select className="form-input" value={form.statusCode} onChange={(e) => setForm({ ...form, statusCode: Number(e.target.value) })}>
            <option value={301}>301 - Permanent</option>
            <option value={302}>302 - Temporary</option>
          </select>
        </div>
        <div className="modal-actions">
          <button className="btn btn--outline" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn--primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Create'}
          </button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Redirect">
        <p>Are you sure you want to delete the redirect from <strong>{deleteConfirm?.from}</strong>?</p>
        <div className="modal-actions">
          <button className="btn btn--outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
          <button className="btn btn--danger" onClick={handleDelete}>Delete</button>
        </div>
      </Modal>
    </div>
  )
}
