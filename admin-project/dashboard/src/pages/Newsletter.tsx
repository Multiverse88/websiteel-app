import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'

interface Subscriber {
  _id: string
  email: string
  name: string
  createdAt: string
}

export default function Newsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<Subscriber | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getNewsletter()
      setSubscribers(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = subscribers.filter(
    (s) =>
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.name?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async () => {
    if (!deleteConfirm) return
    try {
      await api.deleteSubscriber(deleteConfirm._id)
      setDeleteConfirm(null)
      load()
    } catch (e: any) {
      alert(e.message)
    }
  }

  const columns = [
    { key: 'email', label: 'Email' },
    { key: 'name', label: 'Name' },
    { key: 'createdAt', label: 'Date', render: (v: string) => new Date(v).toLocaleDateString() },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <input
          type="text"
          className="form-input form-input--search"
          placeholder="Search subscribers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        emptyMessage="No subscribers found"
        onDelete={setDeleteConfirm}
      />

      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Subscriber">
        <p>Are you sure you want to remove <strong>{deleteConfirm?.email}</strong> from the newsletter?</p>
        <div className="modal-actions">
          <button className="btn btn--outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
          <button className="btn btn--danger" onClick={handleDelete}>Delete</button>
        </div>
      </Modal>
    </div>
  )
}
