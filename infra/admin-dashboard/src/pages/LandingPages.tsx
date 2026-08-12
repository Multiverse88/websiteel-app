import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import Modal from '../components/Modal'
import PageBuilder from '../components/PageBuilder'

interface Domain {
  id: string
  name: string
  hostname: string
}

interface LandingPage {
  id: string
  title: string
  slug: string
  description: string
  status: string
  sections?: any
  createdAt: string
  domainId?: string | null
  Domain?: Domain | null
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const emptyForm = { title: '', slug: '', description: '', status: 'draft', domainId: '' }

export default function LandingPages() {
  const [pages, setPages] = useState<LandingPage[]>([])
  const [domains, setDomains] = useState<Domain[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<LandingPage | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<LandingPage | null>(null)
  const [designingPage, setDesigningPage] = useState<LandingPage | null>(null)
  const [addingDomain, setAddingDomain] = useState(false)
  const [newDomain, setNewDomain] = useState({ name: '', hostname: '' })

  const load = async () => {
    setLoading(true)
    try {
      const [pagesData, domainsData] = await Promise.all([api.getLandingPages(), api.getDomains()])
      setPages(Array.isArray(pagesData) ? pagesData : [])
      setDomains(Array.isArray(domainsData) ? domainsData : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleAddDomain = async () => {
    if (!newDomain.name || !newDomain.hostname) return
    try {
      await api.createDomain(newDomain)
      const domainsData = await api.getDomains()
      setDomains(Array.isArray(domainsData) ? domainsData : [])
      setNewDomain({ name: '', hostname: '' })
      setAddingDomain(false)
    } catch (e: any) {
      alert(e.message || 'Gagal menambah domain')
    }
  }

  const publicUrlFor = (page: LandingPage) =>
    `https://${page.Domain?.hostname || 'easylegal.biz.id'}/lp/${page.slug}`

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

  const openEdit = (page: LandingPage) => {
    setEditing(page)
    setForm({
      title: page.title,
      slug: page.slug,
      description: page.description || '',
      status: page.status || 'draft',
      domainId: page.domainId || '',
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (editing) {
        await api.updateLandingPage(editing.id, form)
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
      await api.deleteLandingPage(deleteConfirm.id)
      setDeleteConfirm(null)
      load()
    } catch (e: any) {
      alert(e.message)
    }
  }

  const handleSaveDesign = async (blocks: any[], status?: string) => {
    if (!designingPage) return
    try {
      const payload: any = { sections: blocks }
      if (status) payload.status = status
      await api.updateLandingPage(designingPage.id, payload)
      // Update local state without kicking user out immediately if they are still editing
      setDesigningPage((prev) => (prev ? { ...prev, sections: blocks, status: status || prev.status } : null))
      load()
    } catch (e: any) {
      alert("Gagal menyimpan desain: " + (e?.message || e))
    }
  }

  const handleDuplicate = async (page: LandingPage) => {
    try {
      const newSlug = `${page.slug}-copy-${Date.now().toString().slice(-4)}`
      await api.createLandingPage({
        title: `${page.title} (Salinan)`,
        slug: newSlug,
        description: page.description || '',
        status: 'draft',
        sections: page.sections || []
      })
      load()
    } catch (e: any) {
      alert("Gagal menduplikat halaman: " + (e?.message || e))
    }
  }

  if (designingPage) {
    return (
      <PageBuilder 
        initialBlocks={designingPage.sections}
        onSave={handleSaveDesign}
        onCancel={() => {
          setDesigningPage(null)
          load()
        }}
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-[32px] pb-12">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] font-sans text-gray-900">Landing Page Builder</h1>
          <p className="text-[14px] leading-[22px] font-sans text-gray-500 mt-1">Buat, kustomisasi visual drag-and-drop, dan publikasikan halaman penawaran khusus.</p>
        </div>
        <button 
          onClick={openCreate}
          className="bg-[#6f0000] hover:bg-[#7A0101] text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm text-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Buat Halaman Baru
        </button>
      </section>

      {/* Data Table Panel */}
      <section className="bg-white border border-gray-200 rounded-xl flex flex-col flex-1 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#f8f9fa]">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] outline-none" 
              placeholder="Cari landing page atau slug..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f8f9fa] text-[12px] font-bold text-gray-500 uppercase border-b border-gray-200 tracking-wider">
              <tr>
                <th className="py-3.5 px-6 font-medium">Judul Halaman</th>
                <th className="py-3.5 px-6 font-medium">URL Slug</th>
                <th className="py-3.5 px-6 font-medium">Domain</th>
                <th className="py-3.5 px-6 font-medium">Status</th>
                <th className="py-3.5 px-6 font-medium">Visual Builder</th>
                <th className="py-3.5 px-6 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-[14px]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
                    <p className="mt-2 text-sm">Memuat halaman...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-40">web</span>
                    <p>Belum ada landing page yang dibuat.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FEF2F2]/30 transition-colors h-[52px] group">
                    <td className="py-3.5 px-6 font-semibold text-gray-900">
                      {item.title}
                      {item.description && <p className="text-xs font-normal text-gray-400 line-clamp-1">{item.description}</p>}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-xs text-gray-600">
                      /lp/{item.slug}
                    </td>
                    <td className="py-3.5 px-6 text-xs">
                      {item.Domain ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                          {item.Domain.hostname}
                        </span>
                      ) : (
                        <span className="text-gray-400">Semua domain</span>
                      )}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase ${item.status === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                        {item.status || 'DRAFT'}
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <button 
                        onClick={() => setDesigningPage(item)}
                        className="flex items-center gap-1.5 text-[#6f0000] bg-[#FEF2F2] hover:bg-[#6f0000] hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-xs"
                      >
                        <span className="material-symbols-outlined text-sm">view_quilt</span> Buka Visual Builder
                      </button>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(publicUrlFor(item))
                            alert(`Link disalin: ${publicUrlFor(item)}`)
                          }}
                          className="p-1.5 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-100" 
                          title="Salin Link Publik"
                        >
                          <span className="material-symbols-outlined text-[18px]">content_copy</span>
                        </button>
                        <button 
                          onClick={() => handleDuplicate(item)}
                          className="p-1.5 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-100" 
                          title="Duplikat Halaman"
                        >
                          <span className="material-symbols-outlined text-[18px]">file_copy</span>
                        </button>
                        <button 
                          onClick={() => openEdit(item)}
                          className="p-1.5 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-100" 
                          title="Edit Pengaturan"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm(item)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50" 
                          title="Hapus Halaman"
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

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-[#f8f9fa] flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Total {pages.length} landing pages
          </span>
        </div>
      </section>

      {/* Edit/Create Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Info Landing Page' : 'Buat Landing Page Baru'}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Judul Halaman</label>
            <input 
              className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] outline-none" 
              value={form.title} 
              onChange={(e) => handleTitleChange(e.target.value)} 
              placeholder="Contoh: Promo Pendirian PT Kilat" 
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold uppercase text-gray-500">Slug URL</label>
              <button 
                type="button" 
                onClick={regenerateSlug} 
                className="text-[11px] text-[#6f0000] hover:underline flex items-center gap-1"
                title="Generate ulang slug dari judul"
              >
                <span className="material-symbols-outlined text-[14px]">sync</span> Auto-generate
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">/</span>
              <input 
                className="w-full pl-6 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000] outline-none" 
                value={form.slug} 
                onChange={(e) => setForm({ ...form, slug: e.target.value })} 
                placeholder="promo-pendirian-pt-kilat" 
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Deskripsi Singkat</label>
            <input className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi untuk internal admin atau meta description" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Status Publikasi</label>
            <select className="w-full p-2.5 border border-gray-200 rounded-lg text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="draft">Draft (Private)</option>
              <option value="published">Published (Publik)</option>
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold uppercase text-gray-500">Domain</label>
              <button
                type="button"
                onClick={() => setAddingDomain((v) => !v)}
                className="text-[11px] text-[#6f0000] hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">add</span> Domain baru
              </button>
            </div>
            <select
              className="w-full p-2.5 border border-gray-200 rounded-lg text-sm"
              value={form.domainId}
              onChange={(e) => setForm({ ...form, domainId: e.target.value })}
            >
              <option value="">Semua domain (tidak dikunci)</option>
              {domains.map((d) => (
                <option key={d.id} value={d.id}>{d.name} — {d.hostname}</option>
              ))}
            </select>
            <p className="text-[11px] text-gray-400 mt-1">
              Kalau dikunci ke satu domain, halaman ini 404 di domain lain.
            </p>
            {addingDomain && (
              <div className="mt-3 p-3 bg-[#f8f9fa] border border-gray-200 rounded-lg space-y-2">
                <input
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                  placeholder="Nama (contoh: EasyLegal MY.ID)"
                  value={newDomain.name}
                  onChange={(e) => setNewDomain({ ...newDomain, name: e.target.value })}
                />
                <input
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm font-mono"
                  placeholder="Hostname (contoh: easylegal.my.id)"
                  value={newDomain.hostname}
                  onChange={(e) => setNewDomain({ ...newDomain, hostname: e.target.value })}
                />
                <button
                  type="button"
                  onClick={handleAddDomain}
                  className="w-full py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold"
                >
                  Simpan Domain
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700" onClick={() => setModalOpen(false)}>Batal</button>
            <button className="px-4 py-2 bg-[#6f0000] text-white rounded-lg text-sm font-semibold" onClick={handleSave} disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Hapus Landing Page">
        <p className="text-sm text-gray-600">Apakah Anda yakin ingin menghapus halaman <strong>{deleteConfirm?.title}</strong>?</p>
        <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-200">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700" onClick={() => setDeleteConfirm(null)}>Batal</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold" onClick={handleDelete}>Hapus</button>
        </div>
      </Modal>
    </div>
  )
}
