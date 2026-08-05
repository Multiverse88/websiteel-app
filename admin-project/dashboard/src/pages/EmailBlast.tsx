import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'

interface BlastContact {
  id: string
  email: string
  name: string | null
  tags: string | null
  isActive: boolean
  createdAt: string
}

interface Campaign {
  id: string
  internalName: string | null
  subject: string
  status: string
  createdAt: string
  _count: { recipients: number }
}

const emptyContactForm = { email: '', name: '', tags: '' }

export default function EmailBlast() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'campaigns' | 'settings'>('contacts')
  const [contacts, setContacts] = useState<BlastContact[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  // Contacts state
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<BlastContact | null>(null)
  const [contactForm, setContactForm] = useState(emptyContactForm)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<BlastContact | null>(null)

  // Campaign state
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [testEmail, setTestEmail] = useState('')

  // Settings state
  const [smtpForm, setSmtpForm] = useState({ host: '', port: 587, user: '', password: '', secure: false })

  const loadContacts = async () => {
    setLoading(true)
    try {
      const data = await api.getBlastContacts()
      setContacts(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const loadCampaigns = async () => {
    setLoading(true)
    try {
      const data = await api.getCampaigns()
      setCampaigns(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const loadSmtpSettings = async () => {
    setLoading(true)
    try {
      const data = await api.getSmtpSettings()
      if (data) {
        setSmtpForm({
          host: data.smtp_host || '',
          port: Number(data.smtp_port) || 587,
          user: data.smtp_user || '',
          password: data.smtp_password || '',
          secure: data.smtp_secure === 'true',
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'contacts') loadContacts()
    else if (activeTab === 'campaigns') loadCampaigns()
    else if (activeTab === 'settings') loadSmtpSettings()
  }, [activeTab])

  const handleSaveContact = async () => {
    setSaving(true)
    try {
      if (editingContact) {
        await api.updateBlastContact(editingContact.id, contactForm)
      } else {
        await api.createBlastContact(contactForm)
      }
      setContactModalOpen(false)
      setEditingContact(null)
      setContactForm(emptyContactForm)
      loadContacts()
    } catch (e: any) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteContact = async () => {
    if (!deleteConfirm) return
    try {
      await api.deleteBlastContact(deleteConfirm.id)
      setDeleteConfirm(null)
      loadContacts()
    } catch (e: any) {
      alert(e.message)
    }
  }

  const handleToggleStatus = async (contact: BlastContact) => {
    try {
      await api.updateBlastContact(contact.id, { isActive: !contact.isActive })
      loadContacts()
    } catch (e: any) {
      alert(e.message)
    }
  }

  const handleSaveSmtp = async () => {
    setSaving(true)
    try {
      await api.saveSmtpSettings(smtpForm)
      alert('SMTP settings saved')
      loadSmtpSettings()
    } catch (e: any) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleTestSend = async () => {
    if (!testEmail) {
      alert('Masukkan email tujuan')
      return
    }
    setSaving(true)
    try {
      await api.testSendEmail({ subject: emailSubject, bodyHtml: emailBody, to: testEmail })
      alert('Email berhasil dikirim')
    } catch (e: any) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  const contactColumns = [
    { key: 'email', label: 'Email' },
    { key: 'name', label: 'Name' },
    { key: 'tags', label: 'Tags' },
    { key: 'isActive', label: 'Status', render: (v: boolean, row: BlastContact) => (
      <button
        className={`btn btn--sm ${v ? 'btn--success' : 'btn--outline'}`}
        onClick={() => handleToggleStatus(row)}
      >
        {v ? 'Active' : 'Inactive'}
      </button>
    ) },
    { key: 'createdAt', label: 'Created', render: (v: string) => new Date(v).toLocaleDateString() },
  ]

  const campaignColumns = [
    { key: 'internalName', label: 'Name', render: (v: string | null, row: Campaign) => v || row.subject },
    { key: 'subject', label: 'Subject' },
    { key: 'status', label: 'Status', render: (v: string) => (
      <span className={`badge badge--${
        v === 'completed' ? 'success' : v === 'failed' ? 'danger' : v === 'processing' ? 'info' : 'warning'
      }`}>{v}</span>
    )},
    { key: '_count', label: 'Recipients', render: (v: { recipients: number }) => v.recipients },
    { key: 'createdAt', label: 'Created', render: (v: string) => new Date(v).toLocaleDateString() },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'contacts' ? 'tab--active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            Blast Contacts
          </button>
          <button
            className={`tab ${activeTab === 'campaigns' ? 'tab--active' : ''}`}
            onClick={() => setActiveTab('campaigns')}
          >
            Campaigns
          </button>
          <button
            className={`tab ${activeTab === 'settings' ? 'tab--active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            SMTP Settings
          </button>
        </div>
        <div className={activeTab === 'contacts' ? '' : 'hidden'}>
          <button className="btn btn--primary" onClick={() => { setEditingContact(null); setContactForm(emptyContactForm); setContactModalOpen(true) }}>
            + New Contact
          </button>
        </div>
      </div>

      {activeTab === 'contacts' && (
        <DataTable
          columns={contactColumns}
          data={contacts}
          loading={loading}
          emptyMessage="No contacts found"
          onEdit={(c) => { setEditingContact(c); setContactForm({ email: c.email, name: c.name || '', tags: c.tags || '' }); setContactModalOpen(true) }}
          onDelete={setDeleteConfirm}
        />
      )}

      {activeTab === 'campaigns' && (
        <>
          <DataTable
            columns={campaignColumns}
            data={campaigns}
            loading={loading}
            emptyMessage="No campaigns found"
            onDelete={(c) => alert(`Delete campaign: ${c.subject}`)}
          />
          <div className="mt-4">
            <h3>Test Email</h3>
            <div className="form-group">
              <label className="form-label">To</label>
              <input className="form-input" placeholder="recipient@example.com" value={testEmail} onChange={(e) => setTestEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input className="form-input" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Body (HTML)</label>
              <textarea className="form-textarea" rows={8} value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder="<p>Email content...</p>" />
            </div>
            <button className="btn btn--primary" onClick={handleTestSend} disabled={saving}>
              {saving ? 'Sending...' : 'Send Test Email'}
            </button>
          </div>
        </>
      )}

      {activeTab === 'settings' && (
        <div className="form-section">
          <h3>SMTP Settings</h3>
          <div className="form-group">
            <label className="form-label">Host</label>
            <input className="form-input" value={smtpForm.host} onChange={(e) => setSmtpForm({ ...smtpForm, host: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Port</label>
            <input type="number" className="form-input" value={smtpForm.port} onChange={(e) => setSmtpForm({ ...smtpForm, port: Number(e.target.value) })} />
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" value={smtpForm.user} onChange={(e) => setSmtpForm({ ...smtpForm, user: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" value={smtpForm.password} onChange={(e) => setSmtpForm({ ...smtpForm, password: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">
              <input type="checkbox" checked={smtpForm.secure} onChange={(e) => setSmtpForm({ ...smtpForm, secure: e.target.checked })} />
              {' '} Use TLS (port 465)
            </label>
          </div>
          <button className="btn btn--primary" onClick={handleSaveSmtp} disabled={saving}>
            {saving ? 'Saving...' : 'Save SMTP Settings'}
          </button>
        </div>
      )}

      <Modal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} title={editingContact ? 'Edit Contact' : 'New Contact'}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input className="form-input" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Tags</label>
          <input className="form-input" value={contactForm.tags} onChange={(e) => setContactForm({ ...contactForm, tags: e.target.value })} placeholder="e.g. VIP, marketing" />
        </div>
        <div className="modal-actions">
          <button className="btn btn--outline" onClick={() => setContactModalOpen(false)}>Cancel</button>
          <button className="btn btn--primary" onClick={handleSaveContact} disabled={saving}>
            {saving ? 'Saving...' : editingContact ? 'Update' : 'Create'}
          </button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Contact">
        <p>Are you sure you want to delete <strong>{deleteConfirm?.email}</strong>?</p>
        <div className="modal-actions">
          <button className="btn btn--outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
          <button className="btn btn--danger" onClick={handleDeleteContact}>Delete</button>
        </div>
      </Modal>
    </div>
  )
}
