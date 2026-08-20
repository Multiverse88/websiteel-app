import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'

// cache-bust: forces a new Vite content hash so Cloudflare's stale-404-cached
// asset filename from a prior deploy race doesn't get reused. Actual side
// effect (not just a comment) since comments are stripped by the minifier
// and don't change the output hash.
console.debug('[build] redirects-ui rev 2026-08-20-02')

interface Redirect {
  id: string
  domain: string
  slug: string
  destination: string
  clicks: number
  createdAt: string
}

const emptyForm = { domain: 'easylegal.my.id', slug: '', destination: '' }

function shortLinkUrl(redirect: Redirect) {
  return `https://${redirect.domain}/${redirect.slug.replace(/^\/+/, '')}`
}

function ShortLinkCell({ redirect }: { redirect: Redirect }) {
  const [copied, setCopied] = useState(false)
  const url = shortLinkUrl(redirect)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard API unavailable — silently ignore, link is still clickable
    }
  }

  return (
    <div className="short-link">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="short-link__url"
        title={url}
      >
        {url}
      </a>
      <button
        type="button"
        className={`short-link__copy${copied ? ' short-link__copy--copied' : ''}`}
        onClick={copy}
        title="Copy link"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

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
    {
      key: 'link',
      label: 'Short Link',
      render: (_val: unknown, row: Redirect) => <ShortLinkCell redirect={row} />,
    },
    {
      key: 'destination',
      label: 'Destination',
      render: (val: string) => (
        <div className="short-link__url short-link__url--dest" title={val}>
          <a href={val} target="_blank" rel="noreferrer">
            {val}
          </a>
        </div>
      )
    },
    {
      key: 'clicks',
      label: 'Clicks',
      render: (val: number) => <span className="badge-count">{val ?? 0}</span>,
    },
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
