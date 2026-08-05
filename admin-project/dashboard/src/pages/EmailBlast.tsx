import { useEffect, useState } from 'react'
import { api } from '../lib/api'
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
  _count?: { recipients: number }
}

const emptyContactForm = { email: '', name: '', tags: '' }

export default function EmailBlast() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'contacts' | 'settings'>('campaigns')
  const [contacts, setContacts] = useState<BlastContact[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)



  // Contacts Modal
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<BlastContact | null>(null)
  const [contactForm, setContactForm] = useState(emptyContactForm)
  const [savingContact, setSavingContact] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<BlastContact | null>(null)

  // SMTP Settings
  const [smtpForm, setSmtpForm] = useState({ host: '', port: 587, user: '', password: '', secure: false })
  const [savingSmtp, setSavingSmtp] = useState(false)

  const loadData = async () => {
    setLoading(true)
    try {
      const [contactsData, campaignsData] = await Promise.all([
        api.getBlastContacts().catch(() => []),
        api.getCampaigns().catch(() => [])
      ])
      setContacts(Array.isArray(contactsData) ? contactsData : [])
      setCampaigns(Array.isArray(campaignsData) ? campaignsData : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const loadSmtp = async () => {
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
    }
  }

  useEffect(() => {
    loadData()
    loadSmtp()
  }, [])

  const handleSaveContact = async () => {
    setSavingContact(true)
    try {
      if (editingContact) {
        await api.updateBlastContact(editingContact.id, contactForm)
      } else {
        await api.createBlastContact(contactForm)
      }
      setContactModalOpen(false)
      setEditingContact(null)
      setContactForm(emptyContactForm)
      loadData()
    } catch (e: any) {
      alert(e.message)
    } finally {
      setSavingContact(false)
    }
  }

  const handleDeleteContact = async () => {
    if (!deleteConfirm) return
    try {
      await api.deleteBlastContact(deleteConfirm.id)
      setDeleteConfirm(null)
      loadData()
    } catch (e: any) {
      alert(e.message)
    }
  }



  const handleSaveSmtp = async () => {
    setSavingSmtp(true)
    try {
      await api.saveSmtpSettings(smtpForm)
      alert('Konfigurasi SMTP berhasil disimpan!')
    } catch (e: any) {
      alert(e.message)
    } finally {
      setSavingSmtp(false)
    }
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-[32px] pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] font-sans text-gray-900">Email Blasting</h1>
          <p className="text-[14px] leading-[22px] font-sans text-gray-500 mt-1">Kelola dan pantau kampanye email blast legalitas Anda.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${activeTab === 'campaigns' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Campaigns
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${activeTab === 'contacts' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Blast Contacts ({contacts.length})
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${activeTab === 'settings' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            SMTP Config
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat 1 */}
        <div className="bg-white rounded-xl border border-gray-200 p-[20px] shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider">Total Kontak Blast</span>
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#6f0000]">
              <span className="material-symbols-outlined">send</span>
            </div>
          </div>
          <div className="text-[32px] leading-[40px] font-bold tracking-[-0.02em] font-sans text-gray-900">{contacts.length}</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-emerald-600 text-xs flex items-center font-bold">
              <span className="material-symbols-outlined text-[16px] mr-0.5">trending_up</span> Siap Blast
            </span>
            <span className="text-gray-500 text-xs">kontak aktif</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white rounded-xl border border-gray-200 p-[20px] shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider">Avg. Open Rate</span>
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#6f0000]">
              <span className="material-symbols-outlined">visibility</span>
            </div>
          </div>
          <div className="text-[32px] leading-[40px] font-bold tracking-[-0.02em] font-sans text-gray-900">48.2%</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-emerald-600 text-xs flex items-center font-bold">
              <span className="material-symbols-outlined text-[16px] mr-0.5">trending_up</span> +3.1%
            </span>
            <span className="text-gray-500 text-xs">vs bulan lalu</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white rounded-xl border border-gray-200 p-[20px] shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider">Total Campaigns</span>
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#6f0000]">
              <span className="material-symbols-outlined">campaign</span>
            </div>
          </div>
          <div className="text-[32px] leading-[40px] font-bold tracking-[-0.02em] font-sans text-gray-900">{campaigns.length}</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-emerald-600 text-xs flex items-center font-bold">
              <span className="material-symbols-outlined text-[16px] mr-0.5">check_circle</span> Live data
            </span>
            <span className="text-gray-500 text-xs">tersimpan</span>
          </div>
        </div>
      </div>

      {activeTab === 'campaigns' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Campaign Management Table (Spans 8 cols) */}
          <div className="xl:col-span-8 bg-white rounded-[32px] border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-[#f8f9fa]">
              <h2 className="text-[18px] leading-[24px] font-semibold text-gray-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#6f0000]">list_alt</span>
                Daftar Riwayat Kampanye
              </h2>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8f9fa] border-b border-gray-200">
                    <th className="px-6 py-3.5 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Nama Kampanye</th>
                    <th className="px-6 py-3.5 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3.5 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-3.5 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Penerima</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-gray-400">
                        <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
                        <p className="mt-2 text-sm">Memuat data...</p>
                      </td>
                    </tr>
                  ) : campaigns.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-gray-400">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-40">campaign</span>
                        <p>Belum ada kampanye email tersimpan.</p>
                      </td>
                    </tr>
                  ) : (
                    campaigns.map((c) => (
                      <tr key={c.id} className="hover:bg-[#FEF2F2]/30 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-900">{c.internalName || c.subject}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {c.status || 'Sent'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{c.createdAt ? new Date(c.createdAt).toLocaleDateString('id-ID') : '-'}</td>
                        <td className="px-6 py-4 font-mono">{c._count?.recipients || 0}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Campaign Creator (Spans 4 cols) */}
          <div className="xl:col-span-4 bg-white rounded-[32px] border border-gray-200 shadow-sm p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#6f0000] mb-4">
              <span className="material-symbols-outlined text-3xl">mark_email_read</span>
            </div>
            <h2 className="text-[18px] leading-[24px] font-semibold text-gray-900 mb-2">
              Buat Kampanye Email
            </h2>
            <p className="text-sm text-gray-500 mb-6 px-4">
              Gunakan editor email lengkap untuk menyusun pesan, menambahkan gambar, dan melihat pratinjau langsung sebelum mengirim blast ke subscriber.
            </p>
            <a 
              href="#/email-blast/tambah"
              className="w-full py-3 bg-[#6f0000] text-white rounded-xl font-semibold text-sm hover:bg-[#7A0101] shadow-sm transition active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">edit_document</span>
              Mulai Buat Kampanye Baru
            </a>
          </div>
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 className="text-[18px] font-semibold text-gray-900">Blast Contacts Directory</h3>
              <p className="text-xs text-gray-500 mt-0.5">Daftar kontak target untuk kampanye email broadcast.</p>
            </div>
            <button 
              onClick={() => { setEditingContact(null); setContactForm(emptyContactForm); setContactModalOpen(true); }}
              className="bg-[#6f0000] hover:bg-[#7A0101] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition"
            >
              <span className="material-symbols-outlined text-[18px]">add</span> Tambah Kontak
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-gray-200">
                  <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase">Nama</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase">Tags</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-400">
                      <span className="material-symbols-outlined text-4xl mb-2 opacity-40">contacts</span>
                      <p>Belum ada kontak blast.</p>
                    </td>
                  </tr>
                ) : (
                  contacts.map((c) => (
                    <tr key={c.id} className="hover:bg-[#FEF2F2]/30 transition-colors">
                      <td className="px-6 py-3.5 font-semibold text-gray-900">{c.email}</td>
                      <td className="px-6 py-3.5 text-gray-500">{c.name || '-'}</td>
                      <td className="px-6 py-3.5">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{c.tags || 'General'}</span>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <div className="flex justify-end gap-1">
                          <button 
                            onClick={() => { setEditingContact(c); setContactForm({ email: c.email, name: c.name || '', tags: c.tags || '' }); setContactModalOpen(true); }}
                            className="p-1 text-gray-400 hover:text-gray-700"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button 
                            onClick={() => setDeleteConfirm(c)}
                            className="p-1 text-gray-400 hover:text-red-600"
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
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 max-w-2xl">
          <h3 className="text-[18px] font-semibold text-gray-900 mb-2">Konfigurasi SMTP Mail Server</h3>
          <p className="text-sm text-gray-500 mb-6">Atur koneksi mail server untuk pengiriman email broadcast dan notifikasi sistem.</p>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">SMTP Host</label>
                <input className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" value={smtpForm.host} onChange={(e) => setSmtpForm({ ...smtpForm, host: e.target.value })} placeholder="smtp.gmail.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Port</label>
                <input type="number" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" value={smtpForm.port} onChange={(e) => setSmtpForm({ ...smtpForm, port: Number(e.target.value) })} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Username / Email</label>
              <input className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" value={smtpForm.user} onChange={(e) => setSmtpForm({ ...smtpForm, user: e.target.value })} placeholder="admin@easylegal.my.id" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Password / App Password</label>
              <input type="password" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" value={smtpForm.password} onChange={(e) => setSmtpForm({ ...smtpForm, password: e.target.value })} placeholder="••••••••" />
            </div>
            <div className="pt-2">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={smtpForm.secure} onChange={(e) => setSmtpForm({ ...smtpForm, secure: e.target.checked })} />
                Gunakan SSL/TLS aman (Port 465)
              </label>
            </div>
            <div className="pt-4 border-t border-gray-200 flex justify-end">
              <button 
                onClick={handleSaveSmtp}
                disabled={savingSmtp}
                className="px-5 py-2.5 bg-[#6f0000] hover:bg-[#7A0101] text-white rounded-lg text-sm font-semibold transition"
              >
                {savingSmtp ? 'Menyimpan...' : 'Simpan Konfigurasi SMTP'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <Modal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} title={editingContact ? 'Edit Kontak' : 'Tambah Kontak Baru'}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Email</label>
            <input className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder="nama@perusahaan.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Nama Lengkap</label>
            <input className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} placeholder="Budi Santoso" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Tags / Label</label>
            <input className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" value={contactForm.tags} onChange={(e) => setContactForm({ ...contactForm, tags: e.target.value })} placeholder="VIP, Legal, Corporate" />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700" onClick={() => setContactModalOpen(false)}>Batal</button>
            <button className="px-4 py-2 bg-[#6f0000] text-white rounded-lg text-sm font-semibold" onClick={handleSaveContact} disabled={savingContact}>
              {savingContact ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Contact Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Hapus Kontak">
        <p className="text-sm text-gray-600">Apakah Anda yakin ingin menghapus kontak <strong>{deleteConfirm?.email}</strong>?</p>
        <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-200">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700" onClick={() => setDeleteConfirm(null)}>Batal</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold" onClick={handleDeleteContact}>Hapus</button>
        </div>
      </Modal>
    </div>
  )
}
