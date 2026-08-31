import { useCallback, useState, useEffect } from 'react'
import { api } from '../lib/api'

interface WaNumber {
  id: string
  number: string
  label: string | null
  isActive: boolean
  clickCount: number
  sharePercent: number
  createdAt: string
}

interface WaPageConfig {
  id: string
  path: string
  ctaId: string // "" = whole-page override; otherwise a specific button's stable id
  message: string | null
  numberIds: string[]
  updatedAt: string
}

interface WaKnownButton {
  ctaId: string
  sample: string | null
}

interface WaLead {
  id: string
  leadCode: string
  domain: string | null
  source: string | null
  sourceCode: string
  channel: string
  product: string | null
  service: string | null
  status: string
  notes: string | null
  temperature: 'COLD' | 'WARM' | 'HOT'
  lostReason: string | null
  orderValue: number | null
  createdAt: string
  number: { number: string; label: string | null }
}

const SOURCE_LABELS: Record<string, string> = {
  gads: 'Google Ads',
  metaads: 'Meta Ads',
  googleseo: 'Google SEO/Organik',
  referral: 'Referral',
  direct: 'Langsung',
  other: 'Lainnya',
  unknown: 'Tidak diketahui',
}

const STATUS_LABELS: Record<string, string> = {
  NEW: 'Baru',
  CONTACTED: 'Dihubungi',
  QUALIFIED: 'Terkualifikasi',
  PROPOSAL: 'Penawaran/Nego',
  WON: 'Closing',
  LOST: 'Tidak Jadi',
}

const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-blue-50 text-blue-700',
  CONTACTED: 'bg-amber-50 text-amber-700',
  QUALIFIED: 'bg-indigo-50 text-indigo-700',
  PROPOSAL: 'bg-purple-50 text-purple-700',
  WON: 'bg-emerald-50 text-emerald-700',
  LOST: 'bg-gray-100 text-gray-500',
}

const TEMPERATURE_COLORS: Record<string, string> = {
  COLD: 'bg-sky-50 text-sky-700',
  WARM: 'bg-amber-50 text-amber-700',
  HOT: 'bg-red-50 text-red-700',
}

const NEXT_STAGES: Record<string, string[]> = {
  NEW: ['NEW', 'CONTACTED', 'LOST'],
  CONTACTED: ['CONTACTED', 'QUALIFIED', 'LOST'],
  QUALIFIED: ['QUALIFIED', 'PROPOSAL', 'LOST'],
  PROPOSAL: ['PROPOSAL', 'WON', 'LOST'],
  WON: ['WON'],
  LOST: ['LOST', 'CONTACTED'],
}

// Manage the in-house WhatsApp CTA rotator (apps/api/src/routes/whatsapp.ts,
// getWhatsAppLink() in apps/web) — replaces mauorder.online. Every WA CTA
// click site-wide always goes to whichever active number has the fewest
// clicks so far. Two tabs: fairness per number, and every click as a
// trackable lead (source/product/status) up to closing.
export default function WhatsAppRotator({ initialTab = 'numbers' }: { initialTab?: 'numbers' | 'pages' | 'leads' }) {
  const [tab, setTab] = useState<'numbers' | 'pages' | 'leads'>(initialTab)

  const [pages, setPages] = useState<WaPageConfig[]>([])
  const [pagesLoading, setPagesLoading] = useState(false)
  const [knownPaths, setKnownPaths] = useState<string[]>([])
  const [knownButtons, setKnownButtons] = useState<WaKnownButton[]>([])
  const [buttonsLoading, setButtonsLoading] = useState(false)
  const [selectedPath, setSelectedPath] = useState('')
  // "" (empty ctaId) = the "Semua Tombol (Halaman ini)" row; null = nothing expanded.
  const [expandedCtaId, setExpandedCtaId] = useState<string | null>(null)
  const [rowMessage, setRowMessage] = useState('')
  const [rowNumberIds, setRowNumberIds] = useState<string[]>([])
  const [rowNote, setRowNote] = useState('')
  const [savingRow, setSavingRow] = useState(false)

  const [numbers, setNumbers] = useState<WaNumber[]>([])
  const [totalClicks, setTotalClicks] = useState(0)
  const [loading, setLoading] = useState(true)
  const [newNumber, setNewNumber] = useState('')
  const [newLabel, setNewLabel] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const [editingNumberId, setEditingNumberId] = useState('')
  const [editNumberValue, setEditNumberValue] = useState('')
  const [editLabelValue, setEditLabelValue] = useState('')
  const [savingNumber, setSavingNumber] = useState(false)

  const [leads, setLeads] = useState<WaLead[]>([])
  const [funnel, setFunnel] = useState<Record<string, number>>({})
  const [bySource, setBySource] = useState<Record<string, number>>({})
  const [leadsLoading, setLeadsLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.getWaNumbers()
      setNumbers(res.data || [])
      setTotalClicks(res.meta?.totalClicks || 0)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadLeads = useCallback(async () => {
    try {
      setLeadsLoading(true)
      const res = await api.getWaLeads({ status: statusFilter, source: sourceFilter })
      setLeads(res.data || [])
      setFunnel(res.meta?.funnel || {})
      setBySource(res.meta?.bySource || {})
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLeadsLoading(false)
    }
  }, [sourceFilter, statusFilter])

  const loadPages = useCallback(async () => {
    try {
      setPagesLoading(true)
      const [pagesRes, pathsRes] = await Promise.all([api.getWaPages(), api.getWaKnownPaths()])
      setPages(pagesRes.data || [])
      setKnownPaths(pathsRes.data || [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setPagesLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])
  useEffect(() => { if (tab === 'leads') loadLeads() }, [loadLeads, tab])
  useEffect(() => { if (tab === 'pages') loadPages() }, [loadPages, tab])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!newNumber.trim()) return
    setAdding(true)
    try {
      await api.createWaNumber({ number: newNumber, label: newLabel || undefined })
      setNewNumber('')
      setNewLabel('')
      await load()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setAdding(false)
    }
  }

  const toggleActive = async (n: WaNumber) => {
    await api.updateWaNumber(n.id, { isActive: !n.isActive })
    await load()
  }

  const startEditNumber = (n: WaNumber) => {
    setEditingNumberId(n.id)
    setEditNumberValue(n.number)
    setEditLabelValue(n.label || '')
  }

  const handleSaveNumber = async (id: string) => {
    setError('')
    if (!editNumberValue.trim()) return
    setSavingNumber(true)
    try {
      await api.updateWaNumber(id, { number: editNumberValue, label: editLabelValue })
      setEditingNumberId('')
      await load()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSavingNumber(false)
    }
  }

  const loadKnownButtons = async (path: string) => {
    try {
      setButtonsLoading(true)
      const res = await api.getWaKnownButtons(path)
      setKnownButtons(res.data || [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setButtonsLoading(false)
    }
  }

  // Every button on the selected page, "Semua Tombol" pinned first — the
  // whole list renders at once so admin can compare/edit every package's
  // autotext side by side instead of hunting through a dropdown one at a
  // time. Reads what's already logged (known-buttons), no new instrumentation.
  const pageRows: WaKnownButton[] = selectedPath
    ? [{ ctaId: '', sample: null }, ...knownButtons]
    : []

  const rowConfigFor = (ctaId: string) => pages.find((p) => p.path === selectedPath && p.ctaId === ctaId)

  // Loads what a row is actually sending right now (from the most recent
  // matching lead), so the editor starts from the real current text instead
  // of blank — otherwise there's no way to "edit" the existing autotext,
  // only blindly type a brand new override over it.
  const loadRowPreview = async (path: string, ctaId: string) => {
    try {
      const res = await api.getWaPagePreview(path, ctaId || undefined)
      const msg = res.data?.message || ''
      setRowMessage(msg)
      setRowNote(msg
        ? `Ini teks yang sekarang jalan di ${ctaId ? 'tombol ini' : 'halaman ini'} (dari lead terakhir, mungkin terpotong ~200 karakter). Edit lalu Simpan untuk menimpanya.`
        : `Belum ada data teks untuk ${ctaId ? 'tombol' : 'halaman'} ini — isi manual kalau mau bikin override.`)
    } catch {
      setRowNote('')
    }
  }

  const openRow = async (path: string, ctaId: string) => {
    setSelectedPath(path)
    setExpandedCtaId(ctaId)
    const existing = pages.find((p) => p.path === path && p.ctaId === ctaId)
    setRowNumberIds(existing?.numberIds || [])
    if (existing?.message) {
      setRowMessage(existing.message)
      setRowNote(ctaId ? 'Override tersimpan untuk tombol ini.' : 'Override tersimpan untuk halaman ini.')
      return
    }
    setRowMessage('')
    await loadRowPreview(path, ctaId)
  }

  const handlePathSelect = async (path: string) => {
    setSelectedPath(path)
    setExpandedCtaId(null)
    setKnownButtons([])
    if (path) await loadKnownButtons(path)
  }

  const toggleRow = async (ctaId: string) => {
    if (expandedCtaId === ctaId) { setExpandedCtaId(null); return }
    await openRow(selectedPath, ctaId)
  }

  const toggleRowNumber = (id: string) => {
    setRowNumberIds((prev) => prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id])
  }

  const handleSaveRow = async () => {
    if (expandedCtaId === null) return
    setError('')
    setSavingRow(true)
    try {
      await api.saveWaPage({ path: selectedPath, ctaId: expandedCtaId, message: rowMessage, numberIds: expandedCtaId === '' ? rowNumberIds : [] })
      await loadPages()
      if (expandedCtaId) await loadKnownButtons(selectedPath)
      setRowNote(expandedCtaId ? 'Override tersimpan untuk tombol ini.' : 'Override tersimpan untuk halaman ini.')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSavingRow(false)
    }
  }

  const handleDeleteRowOverride = async () => {
    if (expandedCtaId === null) return
    const config = rowConfigFor(expandedCtaId)
    if (!config) return
    if (!window.confirm('Hapus override ini? Akan kembali pakai teks bawaan tombol.')) return
    try {
      await api.deleteWaPage(config.id)
      await loadPages()
      await loadRowPreview(selectedPath, expandedCtaId)
    } catch (e: any) {
      setError(e.message)
    }
  }

  const handleDeletePage = async (page: WaPageConfig) => {
    if (!window.confirm(`Hapus konfigurasi khusus untuk "${page.path}"? Halaman ini akan kembali pakai teks & rotasi nomor default.`)) return
    try {
      await api.deleteWaPage(page.id)
      await loadPages()
    } catch (e: any) {
      setError(e.message)
    }
  }

  const handleStatusChange = async (lead: WaLead, status: string) => {
    const payload: { status: string; lostReason?: string; orderValue?: number } = { status }
    if (status === 'LOST') {
      const lostReason = window.prompt('Alasan lead tidak jadi:')?.trim()
      if (!lostReason) return
      payload.lostReason = lostReason
    }
    if (status === 'WON') {
      const input = window.prompt('Nilai order/closing (Rupiah):')
      if (input === null) return
      const orderValue = Number(input.replace(/[^0-9]/g, ''))
      if (!Number.isFinite(orderValue) || orderValue < 0) return
      payload.orderValue = orderValue
    }
    const previous = leads
    setLeads(leads.map(l => l.id === lead.id ? { ...l, status } : l))
    try {
      await api.updateWaLead(lead.id, payload)
      await loadLeads()
    } catch (e: any) {
      setLeads(previous)
      setError(e.message)
    }
  }

  const activeCount = numbers.filter(n => n.isActive).length
  const fairSharePercent = activeCount > 0 ? Math.round((100 / activeCount) * 10) / 10 : 0
  const totalLeads = Object.values(funnel).reduce((a, b) => a + b, 0)
  const closedWon = funnel.WON || 0
  const conversionRate = totalLeads > 0 ? Math.round((closedWon / totalLeads) * 1000) / 10 : 0

  if (loading) {
    return <div className="max-w-6xl mx-auto py-12 text-center text-gray-500">Memuat data rotator...</div>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-[24px] pb-12">
      <div>
        <h1 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] font-sans text-gray-900">{tab === 'leads' ? 'Leads WhatsApp' : 'Rotator WhatsApp'}</h1>
        <p className="text-[14px] leading-[22px] font-sans text-gray-500 mt-1">
          Setiap tombol WA di website (semua domain) selalu diarahkan ke nomor aktif dengan klik paling sedikit — otomatis merata. Tiap klik juga tercatat sebagai lead yang bisa dilacak sampai closing.
        </p>
      </div>

      <div className="flex gap-1 border-b border-gray-200">
        <button
          onClick={() => setTab('numbers')}
          className={`px-4 py-2.5 text-[14px] font-bold border-b-2 transition-colors ${tab === 'numbers' ? 'border-[#990202] text-[#990202]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Nomor & Fairness
        </button>
        <button
          onClick={() => setTab('pages')}
          className={`px-4 py-2.5 text-[14px] font-bold border-b-2 transition-colors ${tab === 'pages' ? 'border-[#990202] text-[#990202]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Per Halaman
        </button>
        <button
          onClick={() => setTab('leads')}
          className={`px-4 py-2.5 text-[14px] font-bold border-b-2 transition-colors ${tab === 'leads' ? 'border-[#990202] text-[#990202]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Leads
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-[13px] font-semibold border border-red-100">{error}</div>
      )}

      {tab === 'numbers' && (
        <>
          <form onSubmit={handleAdd} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 flex flex-col gap-1.5 w-full">
              <label className="text-[14px] font-bold text-gray-700">Nomor WhatsApp</label>
              <input
                type="text"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
                placeholder="628123456789 (format internasional, tanpa +)"
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#990202]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1.5 w-full">
              <label className="text-[14px] font-bold text-gray-700">Label (opsional)</label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="misal: CS 1 - Budi"
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#990202]"
              />
            </div>
            <button
              type="submit"
              disabled={adding}
              className="px-5 py-2.5 rounded-lg text-white font-bold bg-[#990202] hover:bg-[#7a0101] shadow-sm transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {adding ? 'Menambah...' : '+ Tambah Nomor'}
            </button>
          </form>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-[16px]">Traffic per Nomor</h3>
                <p className="text-[14px] text-gray-500 mt-1">Total {totalClicks} klik tercatat · target adil per nomor aktif: ~{fairSharePercent}%</p>
              </div>
            </div>
            <table className="w-full text-[14px]">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 text-[12px] uppercase tracking-wider">
                  <th className="px-6 py-3">Nomor</th>
                  <th className="px-6 py-3">Label</th>
                  <th className="px-6 py-3">Klik</th>
                  <th className="px-6 py-3">Share</th>
                  <th className="px-6 py-3">Distribusi</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {numbers.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-400">Belum ada nomor. Tambahkan minimal 1 nomor di atas.</td></tr>
                )}
                {numbers.map((n) => {
                  const isUnfair = n.isActive && activeCount > 1 && Math.abs(n.sharePercent - fairSharePercent) > fairSharePercent * 0.25
                  const isEditing = editingNumberId === n.id
                  if (isEditing) {
                    return (
                      <tr key={n.id} className="border-t border-gray-100 bg-gray-50">
                        <td className="px-6 py-2.5">
                          <input
                            type="text"
                            value={editNumberValue}
                            onChange={(e) => setEditNumberValue(e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-[14px] font-mono focus:outline-none focus:border-[#990202]"
                          />
                        </td>
                        <td className="px-6 py-2.5">
                          <input
                            type="text"
                            value={editLabelValue}
                            onChange={(e) => setEditLabelValue(e.target.value)}
                            placeholder="Label (opsional)"
                            className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#990202]"
                          />
                        </td>
                        <td className="px-6 py-3.5 text-gray-400" colSpan={3}>Klik & fairness tidak berubah saat mengedit nomor/label.</td>
                        <td className="px-6 py-3.5 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleSaveNumber(n.id)}
                            disabled={savingNumber}
                            className="text-[13px] font-bold text-[#990202] hover:text-[#7a0101] transition-colors mr-3 disabled:opacity-50"
                          >
                            {savingNumber ? 'Menyimpan...' : 'Simpan'}
                          </button>
                          <button onClick={() => setEditingNumberId('')} className="text-[13px] font-bold text-gray-500 hover:text-gray-800 transition-colors">
                            Batal
                          </button>
                        </td>
                      </tr>
                    )
                  }
                  return (
                    <tr key={n.id} className="border-t border-gray-100">
                      <td className="px-6 py-3.5 font-mono font-semibold text-gray-900">{n.number}</td>
                      <td className="px-6 py-3.5 text-gray-600">{n.label || '—'}</td>
                      <td className="px-6 py-3.5 font-bold text-gray-900">{n.clickCount}</td>
                      <td className={`px-6 py-3.5 font-bold ${isUnfair ? 'text-amber-600' : 'text-gray-700'}`}>
                        {n.sharePercent}%{isUnfair && <span className="ml-1 text-[11px] font-normal">⚠ tidak rata</span>}
                      </td>
                      <td className="px-6 py-3.5 w-40">
                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isUnfair ? 'bg-amber-500' : 'bg-[#990202]'}`}
                            style={{ width: `${Math.min(n.sharePercent, 100)}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2 py-1 rounded-full text-[12px] font-bold ${n.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                          {n.isActive ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => startEditNumber(n)}
                          className="text-[13px] font-bold text-gray-600 hover:text-[#990202] transition-colors mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleActive(n)}
                          className="text-[13px] font-bold text-gray-600 hover:text-[#990202] transition-colors"
                        >
                          {n.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <p className="text-[13px] text-gray-400">
            Nomor yang dinonaktifkan berhenti menerima klik baru tapi riwayat kliknya tetap tersimpan (tidak dihapus permanen dari halaman ini).
          </p>
        </>
      )}

      {tab === 'pages' && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-bold text-gray-700">Path Halaman</label>
              <select
                value={selectedPath}
                onChange={(e) => handlePathSelect(e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-[14px] font-mono bg-white focus:outline-none focus:border-[#990202]"
              >
                <option value="">-- pilih halaman --</option>
                {knownPaths.map((p) => (
                  <option key={p} value={p}>{p}{pages.some((cfg) => cfg.path === p && cfg.ctaId === '') ? ' (sudah dikonfigurasi)' : ''}</option>
                ))}
              </select>
              <p className="text-[12px] text-gray-400">Daftar diambil dari halaman yang sudah pernah dapat klik WA. Setelah dipilih, semua tombol/paket di halaman itu muncul di bawah — klik satu buat lihat & edit autotext-nya.</p>
            </div>

            {selectedPath && buttonsLoading && (
              <p className="text-[13px] text-gray-400">Memuat daftar tombol...</p>
            )}

            {selectedPath && !buttonsLoading && (
              <div className="flex flex-col gap-2">
                {pageRows.map((row) => {
                  const isWholePage = row.ctaId === ''
                  const config = rowConfigFor(row.ctaId)
                  const isExpanded = expandedCtaId === row.ctaId
                  const hasOverride = !!config?.message
                  return (
                    <div key={row.ctaId || '__page__'} className={`border rounded-lg overflow-hidden transition-colors ${isExpanded ? 'border-[#990202]' : 'border-gray-200'}`}>
                      <button
                        type="button"
                        onClick={() => toggleRow(row.ctaId)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left bg-white hover:bg-gray-50 transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 text-[14px]">{isWholePage ? 'Semua Tombol (Halaman ini)' : row.ctaId}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${hasOverride ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                              {hasOverride ? 'Override tersimpan' : 'Pakai teks bawaan'}
                            </span>
                          </div>
                          <p className="text-[13px] text-gray-500 truncate mt-0.5">
                            {config?.message || row.sample || (isWholePage ? 'Belum ada override level-halaman' : 'Belum ada data teks tercatat')}
                          </p>
                        </div>
                        <span className="text-gray-400 text-[18px] shrink-0">{isExpanded ? '−' : '+'}</span>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-gray-100 bg-gray-50 p-4 flex flex-col gap-3">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-bold text-gray-700">Autotext WA (opsional)</label>
                            <textarea
                              value={rowMessage}
                              onChange={(e) => { setRowMessage(e.target.value); setRowNote('') }}
                              placeholder="Kosongkan untuk pakai teks bawaan tombol"
                              rows={3}
                              className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-[14px] bg-white focus:outline-none focus:border-[#990202]"
                            />
                            {rowNote ? (
                              <p className="text-[12px] text-amber-600 font-semibold">{rowNote}</p>
                            ) : (
                              <p className="text-[12px] text-gray-400">
                                {isWholePage
                                  ? 'Kalau diisi, menimpa teks bawaan semua tombol WA di halaman ini (tombol dengan override sendiri tetap menang).'
                                  : 'Kalau diisi, menimpa teks bawaan tombol ini saja — tombol lain di halaman yang sama gak kepengaruh.'}
                              </p>
                            )}
                          </div>

                          {isWholePage && (
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[13px] font-bold text-gray-700">Nomor Rotator (opsional)</label>
                              <div className="flex flex-wrap gap-2">
                                {numbers.length === 0 && <span className="text-[13px] text-gray-400">Belum ada nomor — tambah dulu di tab "Nomor & Fairness".</span>}
                                {numbers.map((n) => (
                                  <label key={n.id} className={`px-3 py-1.5 rounded-lg border text-[13px] font-semibold cursor-pointer transition-colors ${rowNumberIds.includes(n.id) ? 'bg-[#990202] text-white border-[#990202]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
                                    <input type="checkbox" className="hidden" checked={rowNumberIds.includes(n.id)} onChange={() => toggleRowNumber(n.id)} />
                                    {n.label || n.number}
                                  </label>
                                ))}
                              </div>
                              <p className="text-[12px] text-gray-400">Kosongkan = tetap rotasi ke semua nomor aktif seperti biasa. Dicentang = klik di halaman ini hanya rotasi ke nomor yang dipilih.</p>
                            </div>
                          )}

                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={handleSaveRow}
                              disabled={savingRow}
                              className="px-4 py-2 rounded-lg text-white font-bold text-[13px] bg-[#990202] hover:bg-[#7a0101] shadow-sm transition-colors disabled:opacity-50"
                            >
                              {savingRow ? 'Menyimpan...' : 'Simpan'}
                            </button>
                            {config && (
                              <button type="button" onClick={handleDeleteRowOverride} className="px-4 py-2 rounded-lg font-bold text-[13px] text-gray-600 hover:text-red-600 transition-colors">
                                Hapus Override
                              </button>
                            )}
                            <button type="button" onClick={() => setExpandedCtaId(null)} className="px-4 py-2 rounded-lg font-bold text-[13px] text-gray-500 hover:text-gray-800 transition-colors">
                              Tutup
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
                {pageRows.length === 1 && (
                  <p className="text-[13px] text-gray-400">Belum ada tombol dengan id spesifik yang tercatat di halaman ini — cuma bisa atur override level-halaman ("Semua Tombol") dulu.</p>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-[16px]">Konfigurasi per Halaman</h3>
              <p className="text-[14px] text-gray-500 mt-1">Halaman tanpa konfigurasi di sini otomatis pakai teks bawaan tombol + rotasi semua nomor aktif.</p>
            </div>
            <table className="w-full text-[14px]">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 text-[12px] uppercase tracking-wider">
                  <th className="px-6 py-3">Path</th>
                  <th className="px-6 py-3">Autotext</th>
                  <th className="px-6 py-3">Nomor</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {pagesLoading && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">Memuat...</td></tr>
                )}
                {!pagesLoading && pages.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">Belum ada halaman dengan konfigurasi khusus.</td></tr>
                )}
                {!pagesLoading && pages.map((p) => (
                  <tr key={p.id} className="border-t border-gray-100">
                    <td className="px-6 py-3.5 font-mono text-gray-900">
                      {p.path}
                      <div className="text-[11px] font-sans font-normal text-gray-400">{p.ctaId ? `Tombol: ${p.ctaId}` : 'Semua tombol (halaman ini)'}</div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-600 max-w-[280px] truncate" title={p.message || ''}>{p.message || <span className="text-gray-400">bawaan tombol</span>}</td>
                    <td className="px-6 py-3.5 text-gray-600">
                      {p.ctaId ? <span className="text-gray-400">— (level halaman)</span> : p.numberIds.length === 0 ? <span className="text-gray-400">semua aktif</span> : p.numberIds.map((id) => numbers.find((n) => n.id === id)?.label || numbers.find((n) => n.id === id)?.number || id).join(', ')}
                    </td>
                    <td className="px-6 py-3.5 text-right whitespace-nowrap">
                      <button onClick={async () => { await loadKnownButtons(p.path); await openRow(p.path, p.ctaId) }} className="text-[13px] font-bold text-gray-600 hover:text-[#990202] transition-colors mr-3">Edit</button>
                      <button onClick={() => handleDeletePage(p)} className="text-[13px] font-bold text-gray-600 hover:text-red-600 transition-colors">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'leads' && (
        <>
          {/* Funnel + conversion summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST'] as const).map((s) => (
              <div key={s} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">{STATUS_LABELS[s]}</div>
                <div className="text-[24px] font-black text-gray-900 mt-1">{funnel[s] || 0}</div>
              </div>
            ))}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">Conversion Rate</div>
              <div className="text-[24px] font-black text-[#990202] mt-1">{conversionRate}%</div>
            </div>
          </div>

          {/* Source breakdown */}
          {Object.keys(bySource).length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 text-[16px] mb-3">Leads per Sumber Trafik</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(bySource).map(([src, count]) => (
                  <div key={src} className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-[13px]">
                    <span className="font-bold text-gray-800">{SOURCE_LABELS[src] || src}</span>
                    <span className="text-gray-500"> · {count} lead</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-[14px] bg-white"
            >
              <option value="">Semua status</option>
              {Object.entries(STATUS_LABELS).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-[14px] bg-white"
            >
              <option value="">Semua sumber</option>
              {Object.entries(SOURCE_LABELS).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          {/* Leads table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 text-[12px] uppercase tracking-wider">
                  <th className="px-6 py-3">Kode</th>
                  <th className="px-6 py-3">Layanan/Paket</th>
                  <th className="px-6 py-3">Halaman</th>
                  <th className="px-6 py-3">Sumber</th>
                  <th className="px-6 py-3">Nomor Tujuan</th>
                  <th className="px-6 py-3">Tanggal</th>
                  <th className="px-6 py-3">Temperature</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {leadsLoading && (
                  <tr><td colSpan={8} className="px-6 py-8 text-center text-gray-400">Memuat leads...</td></tr>
                )}
                {!leadsLoading && leads.length === 0 && (
                  <tr><td colSpan={8} className="px-6 py-8 text-center text-gray-400">Belum ada lead yang cocok dengan filter.</td></tr>
                )}
                {!leadsLoading && leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-gray-100">
                    <td className="px-6 py-3.5 font-mono font-bold text-gray-900">{lead.leadCode}</td>
                    <td className="px-6 py-3.5 text-gray-800 max-w-[260px] truncate font-medium" title={lead.service || ''}>{lead.service || '—'}</td>
                    <td className="px-6 py-3.5 text-gray-500 max-w-[180px] truncate" title={lead.product || ''}>{lead.product || '—'}</td>
                    <td className="px-6 py-3.5 text-gray-600">{SOURCE_LABELS[lead.sourceCode || lead.source || 'unknown'] || lead.sourceCode || lead.source || '—'}</td>
                    <td className="px-6 py-3.5 text-gray-600">{lead.number?.label || lead.number?.number || '—'}</td>
                    <td className="px-6 py-3.5 text-gray-500 whitespace-nowrap">{new Date(lead.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2 py-1 rounded-full text-[11px] font-bold ${TEMPERATURE_COLORS[lead.temperature] || 'bg-gray-100 text-gray-600'}`}>{lead.temperature}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead, e.target.value)}
                        className={`px-2 py-1 rounded-full text-[12px] font-bold border-0 ${STATUS_COLORS[lead.status] || 'bg-gray-100 text-gray-600'}`}
                      >
                        {(NEXT_STAGES[lead.status] || [lead.status]).map((val) => (
                          <option key={val} value={val}>{STATUS_LABELS[val] || val}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[13px] text-gray-400">
            Cocokkan "Kode" dan source dengan <code className="font-mono">[Ref: EL-XXXXXX | Source: gads]</code> pada pesan WhatsApp, lalu update status sesuai progres.
          </p>
        </>
      )}
    </div>
  )
}
