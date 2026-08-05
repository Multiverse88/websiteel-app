import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import Modal from '../components/Modal'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  whatsapp?: string
  businessName?: string
  topic?: string
  message: string
  createdAt: string
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<Contact | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getContacts()
      setContacts(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = contacts.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      (c.whatsapp && c.whatsapp.toLowerCase().includes(search.toLowerCase())) ||
      (c.phone && c.phone.toLowerCase().includes(search.toLowerCase())) ||
      (c.businessName && c.businessName.toLowerCase().includes(search.toLowerCase()))
  )

  const handleDelete = async () => {
    if (!deleteConfirm) return
    try {
      await api.deleteContact(deleteConfirm.id)
      setDeleteConfirm(null)
      load()
    } catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-[32px] pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] font-sans text-gray-900">Leads & Inquiries</h2>
          <p className="text-[14px] leading-[22px] font-sans text-gray-500 mt-1">Pesan konsultasi dan data prospek yang masuk dari website publik.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center text-gray-500 text-xs font-mono font-semibold uppercase">
            <span>Total Inquiries</span>
            <span className="material-symbols-outlined text-[#6f0000] bg-[#FEF2F2] p-1.5 rounded-lg text-sm">mail</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{contacts.length}</div>
          <p className="text-xs text-gray-400 mt-1">Semua pesan masuk</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center text-gray-500 text-xs font-mono font-semibold uppercase">
            <span>Pending Follow-up</span>
            <span className="material-symbols-outlined text-amber-600 bg-amber-50 p-1.5 rounded-lg text-sm">schedule</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{contacts.length}</div>
          <p className="text-xs text-emerald-600 mt-1 font-semibold">Siap dihubungi</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center text-gray-500 text-xs font-mono font-semibold uppercase">
            <span>Konversi Lead</span>
            <span className="material-symbols-outlined text-emerald-600 bg-emerald-50 p-1.5 rounded-lg text-sm">check_circle</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-2">100%</div>
          <p className="text-xs text-gray-400 mt-1">Status sistem aktif</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#f8f9fa]">
          <h3 className="text-base font-semibold text-gray-900">Daftar Formulir Kontak</h3>
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
            <input 
              className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] outline-none" 
              placeholder="Cari nama, email, no HP..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-200">
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase">Nama Lengkap</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase">Nomor HP / WA</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase">Pesan Singkat</th>
                <th className="px-6 py-3.5 text-xs font-bold text-gray-500 uppercase text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
                    <p className="mt-2 text-sm">Memuat pesan...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-40">inbox</span>
                    <p>Tidak ada pesan yang cocok.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FEF2F2]/30 transition-colors">
                    <td className="px-6 py-3.5 font-semibold text-gray-900">
                      {item.name}
                      {item.businessName && <span className="block text-xs text-gray-400 font-normal">{item.businessName}</span>}
                    </td>
                    <td className="px-6 py-3.5 text-gray-600">{item.email}</td>
                    <td className="px-6 py-3.5 text-gray-600 font-mono">{item.whatsapp || item.phone || '-'}</td>
                    <td className="px-6 py-3.5 text-gray-500 max-w-xs truncate">{item.message}</td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => setSelectedContact(item)}
                          className="p-1.5 text-gray-500 hover:text-[#6f0000] rounded hover:bg-gray-100" 
                          title="Lihat Detail Pesan"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm(item)}
                          className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-red-50" 
                          title="Hapus"
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

      {/* Message Detail Modal */}
      <Modal isOpen={!!selectedContact} onClose={() => setSelectedContact(null)} title="Detail Pesan Inkuiri">
        {selectedContact && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
              <div><span className="text-gray-400 font-mono text-xs uppercase block">Pengirim:</span> <strong className="text-gray-900">{selectedContact.name}</strong> {selectedContact.businessName && <span className="text-gray-500 font-normal">({selectedContact.businessName})</span>}</div>
              <div><span className="text-gray-400 font-mono text-xs uppercase block">Email:</span> {selectedContact.email}</div>
              <div><span className="text-gray-400 font-mono text-xs uppercase block">Nomor HP/WA:</span> {selectedContact.whatsapp || selectedContact.phone || '-'}</div>
              {selectedContact.topic && <div><span className="text-gray-400 font-mono text-xs uppercase block">Topik:</span> {selectedContact.topic}</div>}
              <div><span className="text-gray-400 font-mono text-xs uppercase block">Waktu Pengiriman:</span> {selectedContact.createdAt ? new Date(selectedContact.createdAt).toLocaleString('id-ID') : '-'}</div>
            </div>
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-gray-500 mb-1">Isi Pesan:</label>
              <div className="p-4 border border-gray-200 rounded-xl text-sm bg-white text-gray-800 leading-relaxed whitespace-pre-wrap">
                {selectedContact.message}
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              {(selectedContact.whatsapp || selectedContact.phone) ? (
                <a 
                  href={`https://wa.me/${(selectedContact.whatsapp || selectedContact.phone || '').replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#25D366] text-white font-semibold rounded-lg text-sm flex items-center gap-2 hover:bg-[#1EBE5D] transition"
                >
                  <span className="material-symbols-outlined text-sm">chat</span> Balas via WhatsApp
                </a>
              ) : <div/>}
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-semibold transition" onClick={() => setSelectedContact(null)}>Tutup</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Hapus Pesan Inkuiri">
        <p className="text-sm text-gray-600">Apakah Anda yakin ingin menghapus pesan dari <strong>{deleteConfirm?.name}</strong>?</p>
        <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-200">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition" onClick={() => setDeleteConfirm(null)}>Batal</button>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition shadow-sm" onClick={handleDelete}>Hapus</button>
        </div>
      </Modal>
    </div>
  )
}
