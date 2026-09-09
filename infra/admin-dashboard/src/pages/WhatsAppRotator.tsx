import { useCallback, useState, useEffect } from 'react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { api } from '../lib/api'
import Modal from '../components/Modal'

// Crimson-first palette for chart segments (source donut, etc.) — #990202
// first since it's the brand color, rest picked for contrast against it and
// against each other on a white background.
const CHART_COLORS = ['#990202', '#f59e0b', '#0ea5e9', '#10b981', '#8b5cf6', '#ec4899', '#6b7280']

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
  domain: string // "" = applies to every domain; otherwise one hostname (e.g. easylegal.biz.id)
  message: string | null
  numberIds: string[]
  updatedAt: string
}

interface WaSlug {
  id: string
  slug: string
  domain: string
  source: string
  message: string | null
  numberIds: string[]
  description: string | null
  clicks: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const DOMAINS: { value: string; label: string }[] = [
  { value: '', label: 'Semua Domain' },
  { value: 'easylegal.id', label: 'easylegal.id' },
  { value: 'easylegal.co.id', label: 'easylegal.co.id' },
  { value: 'easylegal.biz.id', label: 'easylegal.biz.id' },
]

type DatePreset = 'all' | 'today' | '7d' | '30d' | 'month' | 'lastmonth' | 'custom'

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
  tiktok: 'TikTok Ads',
  instagram: 'Instagram',
  offline: 'Offline / Brosur',
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

const STATS_GROUP_LABELS: Record<'day' | 'week' | 'month' | 'number' | 'source' | 'service', string> = {
  day: 'Per Hari',
  week: 'Per Minggu',
  month: 'Per Bulan',
  number: 'Per Nomor',
  source: 'Per Sumber',
  service: 'Per Layanan',
}

const DATE_PRESETS: { value: DatePreset; label: string }[] = [
  { value: 'all', label: 'Semua Waktu' },
  { value: 'today', label: 'Hari Ini' },
  { value: '7d', label: '7 Hari Terakhir' },
  { value: '30d', label: '30 Hari Terakhir' },
  { value: 'month', label: 'Bulan Ini' },
  { value: 'lastmonth', label: 'Bulan Lalu' },
  { value: 'custom', label: 'Custom' },
]

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10)
}

// Turns a preset (or explicit custom from/to) into concrete "YYYY-MM-DD"
// bounds for the API. `to` is inclusive of the whole day server-side.
function computeDateRange(preset: DatePreset, customFrom: string, customTo: string): { from?: string; to?: string } {
  const now = new Date()
  if (preset === 'all') return {}
  if (preset === 'today') return { from: ymd(now), to: ymd(now) }
  if (preset === '7d') { const d = new Date(now); d.setDate(d.getDate() - 6); return { from: ymd(d), to: ymd(now) } }
  if (preset === '30d') { const d = new Date(now); d.setDate(d.getDate() - 29); return { from: ymd(d), to: ymd(now) } }
  if (preset === 'month') { const d = new Date(now.getFullYear(), now.getMonth(), 1); return { from: ymd(d), to: ymd(now) } }
  if (preset === 'lastmonth') {
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const end = new Date(now.getFullYear(), now.getMonth(), 0)
    return { from: ymd(start), to: ymd(end) }
  }
  // custom
  return { from: customFrom || undefined, to: customTo || undefined }
}

// day/week/month buckets come back as ISO timestamps (date_trunc); number/
// source/service buckets already have a human label from the API.
function formatStatKey(groupBy: string, key: string): string {
  if (groupBy === 'source') return SOURCE_LABELS[key] || key
  if (groupBy !== 'day' && groupBy !== 'week' && groupBy !== 'month') return key
  const d = new Date(key)
  if (Number.isNaN(d.getTime())) return key
  if (groupBy === 'day') return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  if (groupBy === 'month') return d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
  // week: date_trunc('week', ...) returns the Monday of that ISO week — show as a range.
  const end = new Date(d)
  end.setDate(end.getDate() + 6)
  const fmt = (x: Date) => x.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
  return `${fmt(d)} – ${fmt(end)}`
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
export default function WhatsAppRotator({ initialTab = 'numbers' }: { initialTab?: 'numbers' | 'pages' | 'slugs' | 'leads' }) {
  const [tab, setTab] = useState<'numbers' | 'pages' | 'slugs' | 'leads'>(initialTab)

  // Slugs tab state
  const [slugs, setSlugs] = useState<WaSlug[]>([])
  const [slugsLoading, setSlugsLoading] = useState(false)
  const [slugFilterDomain, setSlugFilterDomain] = useState('')
  const [slugFilterSource, setSlugFilterSource] = useState('')
  const [slugSearchInput, setSlugSearchInput] = useState('')
  const [slugSearch, setSlugSearch] = useState('')
  const [slugModalOpen, setSlugModalOpen] = useState(false)
  const [editingSlug, setEditingSlug] = useState<WaSlug | null>(null)
  const [formSlug, setFormSlug] = useState('')
  const [formDomain, setFormDomain] = useState('easylegal.id')
  const [formSource, setFormSource] = useState('metaads')
  const [formMessage, setFormMessage] = useState('')
  const [formNumberIds, setFormNumberIds] = useState<string[]>([])
  const [formDescription, setFormDescription] = useState('')
  const [formIsActive, setFormIsActive] = useState(true)
  const [savingSlug, setSavingSlug] = useState(false)
  const [slugModalError, setSlugModalError] = useState('')
  const [copiedSlugId, setCopiedSlugId] = useState<string | null>(null)
  const [deleteSlugConfirm, setDeleteSlugConfirm] = useState<WaSlug | null>(null)

  const [pages, setPages] = useState<WaPageConfig[]>([])
  const [pagesLoading, setPagesLoading] = useState(false)
  const [knownPaths, setKnownPaths] = useState<string[]>([])
  const [knownButtons, setKnownButtons] = useState<WaKnownButton[]>([])
  const [buttonsLoading, setButtonsLoading] = useState(false)
  const [selectedPath, setSelectedPath] = useState('')
  const [selectedDomain, setSelectedDomain] = useState('') // "" = Semua Domain
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
  const [domainFilter, setDomainFilter] = useState('')
  const [numberFilter, setNumberFilter] = useState('')
  const [searchInput, setSearchInput] = useState('') // raw input, debounced into searchFilter below
  const [searchFilter, setSearchFilter] = useState('')
  const [datePreset, setDatePreset] = useState<DatePreset>('all')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')

  // Debounce the lead-code search box — fires a request per keystroke
  // otherwise, and the leads table is the one thing here with free-text input.
  useEffect(() => {
    const id = setTimeout(() => setSearchFilter(searchInput.trim()), 400)
    return () => clearTimeout(id)
  }, [searchInput])

  // Detail views: same status/source filters as the leads table above, but
  // aggregated server-side (leads/list is paginated so a client-side
  // breakdown would only ever reflect whichever page happens to be loaded).
  const [statsGroupBy, setStatsGroupBy] = useState<'day' | 'week' | 'month' | 'number' | 'source' | 'service'>('day')
  const [statsData, setStatsData] = useState<{ key: string; label: string; count: number }[]>([])
  const [statsLoading, setStatsLoading] = useState(false)

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
      const { from, to } = computeDateRange(datePreset, customFrom, customTo)
      const res = await api.getWaLeads({ status: statusFilter, source: sourceFilter, domain: domainFilter, numberId: numberFilter, search: searchFilter, from, to })
      setLeads(res.data || [])
      setFunnel(res.meta?.funnel || {})
      setBySource(res.meta?.bySource || {})
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLeadsLoading(false)
    }
  }, [sourceFilter, statusFilter, domainFilter, numberFilter, searchFilter, datePreset, customFrom, customTo])

  const loadStats = useCallback(async () => {
    try {
      setStatsLoading(true)
      const { from, to } = computeDateRange(datePreset, customFrom, customTo)
      const res = await api.getWaLeadsStats(statsGroupBy, { status: statusFilter, source: sourceFilter, domain: domainFilter, numberId: numberFilter, from, to })
      setStatsData(res.data || [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setStatsLoading(false)
    }
  }, [statsGroupBy, statusFilter, sourceFilter, domainFilter, numberFilter, datePreset, customFrom, customTo])

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

  // Debounce slug search input
  useEffect(() => {
    const id = setTimeout(() => setSlugSearch(slugSearchInput.trim()), 400)
    return () => clearTimeout(id)
  }, [slugSearchInput])

  const loadSlugs = useCallback(async () => {
    try {
      setSlugsLoading(true)
      const res = await api.getWaSlugs({
        domain: slugFilterDomain,
        source: slugFilterSource,
        search: slugSearch,
      })
      setSlugs(res.data || [])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSlugsLoading(false)
    }
  }, [slugFilterDomain, slugFilterSource, slugSearch])

  useEffect(() => { load() }, [load])
  useEffect(() => { if (tab === 'leads') loadLeads() }, [loadLeads, tab])
  useEffect(() => { if (tab === 'leads') loadStats() }, [loadStats, tab])
  useEffect(() => { if (tab === 'pages') loadPages() }, [loadPages, tab])
  useEffect(() => { if (tab === 'slugs') loadSlugs() }, [loadSlugs, tab])

  const openCreateSlug = () => {
    setEditingSlug(null)
    setFormSlug('')
    setFormDomain('easylegal.id')
    setFormSource('metaads')
    setFormMessage('')
    setFormNumberIds([])
    setFormDescription('')
    setFormIsActive(true)
    setSlugModalError('')
    setSlugModalOpen(true)
  }

  const openEditSlug = (s: WaSlug) => {
    setEditingSlug(s)
    setFormSlug(s.slug)
    setFormDomain(s.domain || '')
    setFormSource(s.source || 'direct')
    setFormMessage(s.message || '')
    setFormNumberIds(s.numberIds || [])
    setFormDescription(s.description || '')
    setFormIsActive(s.isActive)
    setSlugModalError('')
    setSlugModalOpen(true)
  }

  const handleSaveSlug = async (e: React.FormEvent) => {
    e.preventDefault()
    setSlugModalError('')
    const cleaned = formSlug.trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-')
    if (!cleaned) {
      setSlugModalError('Slug wajib diisi (hanya huruf, angka, tanda hubung).')
      return
    }
    setSavingSlug(true)
    try {
      const payload = {
        slug: cleaned,
        domain: formDomain,
        source: formSource || 'direct',
        message: formMessage.trim() || undefined,
        numberIds: formNumberIds,
        description: formDescription.trim() || undefined,
        isActive: formIsActive,
      }
      if (editingSlug) {
        await api.updateWaSlug(editingSlug.id, payload)
      } else {
        await api.createWaSlug(payload)
      }
      setSlugModalOpen(false)
      await loadSlugs()
    } catch (err: any) {
      setSlugModalError(err.message || 'Gagal menyimpan slug')
    } finally {
      setSavingSlug(false)
    }
  }

  const handleDeleteSlug = async () => {
    if (!deleteSlugConfirm) return
    try {
      await api.deleteWaSlug(deleteSlugConfirm.id)
      setDeleteSlugConfirm(null)
      await loadSlugs()
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus slug')
    }
  }

  const handleToggleSlugActive = async (s: WaSlug) => {
    try {
      await api.updateWaSlug(s.id, { isActive: !s.isActive })
      await loadSlugs()
    } catch (err: any) {
      alert(err.message || 'Gagal mengubah status slug')
    }
  }

  const copySlugUrl = async (s: WaSlug) => {
    const domain = s.domain || 'easylegal.id'
    const url = `https://${domain}/wa/${s.slug}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiedSlugId(s.id)
      setTimeout(() => setCopiedSlugId(null), 1500)
    } catch {
      // fallback
    }
  }

  // Auto-refresh the two live-data tabs every 15s while they're active.
  useEffect(() => {
    if (tab !== 'numbers' && tab !== 'leads') return
    const id = setInterval(() => {
      if (tab === 'numbers') load()
      else loadLeads()
    }, 15000)
    return () => clearInterval(id)
  }, [tab, load, loadLeads])

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

  // Exact match on domain too (not falling back to "") — each domain tab is
  // its own independent editable slot, distinct from the "Semua Domain" row.
  const rowConfigFor = (ctaId: string) => pages.find((p) => p.path === selectedPath && p.ctaId === ctaId && p.domain === selectedDomain)

  const rowNoteFor = (ctaId: string, domain: string) => domain
    ? (ctaId ? 'tombol ini di' : 'halaman ini di') + ` ${domain}`
    : (ctaId ? 'tombol ini (semua domain)' : 'halaman ini (semua domain)')

  // Loads what a row is actually sending right now (from the most recent
  // matching lead), so the editor starts from the real current text instead
  // of blank — otherwise there's no way to "edit" the existing autotext,
  // only blindly type a brand new override over it.
  const loadRowPreview = async (path: string, ctaId: string, domain: string) => {
    try {
      const res = await api.getWaPagePreview(path, ctaId || undefined, domain || undefined)
      const msg = res.data?.message || ''
      setRowMessage(msg)
      setRowNote(msg
        ? `Ini teks yang sekarang jalan di ${rowNoteFor(ctaId, domain)} (dari lead terakhir, mungkin terpotong ~200 karakter). Edit lalu Simpan untuk menimpanya.`
        : `Belum ada data teks untuk ${rowNoteFor(ctaId, domain)} — isi manual kalau mau bikin override.`)
    } catch {
      setRowNote('')
    }
  }

  const openRow = async (path: string, ctaId: string, domain: string) => {
    setSelectedPath(path)
    setSelectedDomain(domain)
    setExpandedCtaId(ctaId)
    const existing = pages.find((p) => p.path === path && p.ctaId === ctaId && p.domain === domain)
    setRowNumberIds(existing?.numberIds || [])
    if (existing?.message) {
      setRowMessage(existing.message)
      setRowNote(`Override tersimpan untuk ${rowNoteFor(ctaId, domain)}.`)
      return
    }
    setRowMessage('')
    await loadRowPreview(path, ctaId, domain)
  }

  const handlePathSelect = async (path: string) => {
    setSelectedPath(path)
    setExpandedCtaId(null)
    setKnownButtons([])
    if (path) await loadKnownButtons(path)
  }

  const handleDomainSelect = (domain: string) => {
    setSelectedDomain(domain)
    setExpandedCtaId(null)
  }

  const toggleRow = async (ctaId: string) => {
    if (expandedCtaId === ctaId) { setExpandedCtaId(null); return }
    await openRow(selectedPath, ctaId, selectedDomain)
  }

  const toggleRowNumber = (id: string) => {
    setRowNumberIds((prev) => prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id])
  }

  const handleSaveRow = async () => {
    if (expandedCtaId === null) return
    setError('')
    setSavingRow(true)
    try {
      await api.saveWaPage({ path: selectedPath, ctaId: expandedCtaId, domain: selectedDomain, message: rowMessage, numberIds: expandedCtaId === '' ? rowNumberIds : [] })
      await loadPages()
      if (expandedCtaId) await loadKnownButtons(selectedPath)
      setRowNote(`Override tersimpan untuk ${rowNoteFor(expandedCtaId, selectedDomain)}.`)
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
      await loadRowPreview(selectedPath, expandedCtaId, selectedDomain)
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
          onClick={() => setTab('slugs')}
          className={`px-4 py-2.5 text-[14px] font-bold border-b-2 transition-colors ${tab === 'slugs' ? 'border-[#990202] text-[#990202]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Link / Slug
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

            {selectedPath && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-gray-700">Domain</label>
                <div className="flex flex-wrap gap-2">
                  {DOMAINS.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => handleDomainSelect(d.value)}
                      className={`px-3 py-1.5 rounded-lg border text-[13px] font-semibold transition-colors ${selectedDomain === d.value ? 'bg-[#990202] text-white border-[#990202]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
                <p className="text-[12px] text-gray-400">"Semua Domain" berlaku ke biz.id & co.id sekaligus kecuali ada override khusus di domain tertentu (override domain spesifik selalu menang).</p>
              </div>
            )}

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
                  <th className="px-6 py-3">Domain</th>
                  <th className="px-6 py-3">Autotext</th>
                  <th className="px-6 py-3">Nomor</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {pagesLoading && (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">Memuat...</td></tr>
                )}
                {!pagesLoading && pages.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">Belum ada halaman dengan konfigurasi khusus.</td></tr>
                )}
                {!pagesLoading && pages.map((p) => (
                  <tr key={p.id} className="border-t border-gray-100">
                    <td className="px-6 py-3.5 font-mono text-gray-900">
                      {p.path}
                      <div className="text-[11px] font-sans font-normal text-gray-400">{p.ctaId ? `Tombol: ${p.ctaId}` : 'Semua tombol (halaman ini)'}</div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-600">{p.domain || <span className="text-gray-400">semua domain</span>}</td>
                    <td className="px-6 py-3.5 text-gray-600 max-w-[280px] truncate" title={p.message || ''}>{p.message || <span className="text-gray-400">bawaan tombol</span>}</td>
                    <td className="px-6 py-3.5 text-gray-600">
                      {p.ctaId ? <span className="text-gray-400">— (level halaman)</span> : p.numberIds.length === 0 ? <span className="text-gray-400">semua aktif</span> : p.numberIds.map((id) => numbers.find((n) => n.id === id)?.label || numbers.find((n) => n.id === id)?.number || id).join(', ')}
                    </td>
                    <td className="px-6 py-3.5 text-right whitespace-nowrap">
                      <button onClick={async () => { await loadKnownButtons(p.path); await openRow(p.path, p.ctaId, p.domain) }} className="text-[13px] font-bold text-gray-600 hover:text-[#990202] transition-colors mr-3">Edit</button>
                      <button onClick={() => handleDeletePage(p)} className="text-[13px] font-bold text-gray-600 hover:text-red-600 transition-colors">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'slugs' && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <input
                type="text"
                placeholder="Cari slug, deskripsi, atau pesan..."
                value={slugSearchInput}
                onChange={(e) => setSlugSearchInput(e.target.value)}
                className="px-3.5 py-2 border border-gray-200 rounded-lg text-[13px] bg-white w-full sm:w-64 focus:outline-none focus:border-[#990202]"
              />
              <select
                value={slugFilterDomain}
                onChange={(e) => setSlugFilterDomain(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-[13px] bg-white focus:outline-none focus:border-[#990202]"
              >
                {DOMAINS.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
              <select
                value={slugFilterSource}
                onChange={(e) => setSlugFilterSource(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-[13px] bg-white focus:outline-none focus:border-[#990202]"
              >
                <option value="">Semua Sumber</option>
                <option value="metaads">Meta Ads</option>
                <option value="gads">Google Ads</option>
                <option value="tiktok">TikTok Ads</option>
                <option value="instagram">Instagram</option>
                <option value="offline">Offline / Brosur</option>
                <option value="googleseo">Google SEO</option>
                <option value="referral">Referral</option>
                <option value="direct">Langsung</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
            <button
              type="button"
              onClick={openCreateSlug}
              className="px-4 py-2 bg-[#990202] hover:bg-[#7a0202] text-white rounded-lg text-[13px] font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              + Tambah Link Slug
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {slugsLoading ? (
              <div className="p-8 text-center text-gray-500 text-[14px]">Memuat link slug...</div>
            ) : slugs.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-[16px] font-bold text-gray-800">Belum ada link slug</div>
                <p className="text-[13px] text-gray-500 mt-1 max-w-md mx-auto">
                  Buat link WhatsApp berbasis slug untuk kampanye marketing. Anda bisa menetapkan domain, sumber statis (Google Ads, Meta Ads, TikTok), dan pesan otomatis per link.
                </p>
                <button
                  type="button"
                  onClick={openCreateSlug}
                  className="mt-4 px-4 py-2 bg-[#990202] text-white rounded-lg text-[13px] font-bold"
                >
                  Buat Link Pertama
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] text-left border-collapse">
                  <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3.5">Slug & Link URL</th>
                      <th className="px-4 py-3.5">Domain</th>
                      <th className="px-4 py-3.5">Sumber Statis</th>
                      <th className="px-4 py-3.5">Pesan WhatsApp</th>
                      <th className="px-4 py-3.5">CS Pool</th>
                      <th className="px-4 py-3.5 text-center">Klik</th>
                      <th className="px-4 py-3.5 text-center">Status</th>
                      <th className="px-6 py-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {slugs.map((s) => {
                      const displayDomain = s.domain || 'easylegal.id'
                      const fullUrl = `https://${displayDomain}/wa/${s.slug}`
                      const isCopied = copiedSlugId === s.id
                      return (
                        <tr key={s.id} className="hover:bg-gray-50/75 transition-colors">
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-gray-900 text-[14px]">/{s.slug}</span>
                              <button
                                type="button"
                                onClick={() => copySlugUrl(s)}
                                className={`px-2 py-0.5 text-[11px] font-bold rounded transition-colors ${isCopied ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                title="Salin link lengkap"
                              >
                                {isCopied ? 'Tersalin!' : 'Salin'}
                              </button>
                            </div>
                            <div className="mt-0.5">
                              <a
                                href={fullUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[12px] text-[#990202] hover:underline font-mono truncate max-w-[240px] inline-block"
                              >
                                {fullUrl}
                              </a>
                            </div>
                            {s.description && (
                              <div className="text-[11px] text-gray-400 mt-0.5">{s.description}</div>
                            )}
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold ${s.domain ? 'bg-zinc-100 text-zinc-800' : 'bg-gray-100 text-gray-600'}`}>
                              {s.domain || 'Semua Domain'}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                              s.source === 'metaads' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              s.source === 'gads' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              s.source === 'tiktok' ? 'bg-neutral-900 text-white border-neutral-900' :
                              s.source === 'instagram' ? 'bg-pink-50 text-pink-700 border-pink-200' :
                              s.source === 'offline' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                              s.source === 'googleseo' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              'bg-gray-50 text-gray-700 border-gray-200'
                            }`}>
                              {SOURCE_LABELS[s.source] || s.source}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 max-w-[260px]">
                            {s.message ? (
                              <div className="text-gray-700 text-[12px] line-clamp-2" title={s.message}>
                                {s.message}
                              </div>
                            ) : (
                              <span className="text-gray-400 italic text-[12px]">(Bawaan umum)</span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">
                            {s.numberIds.length === 0 ? (
                              <span className="text-emerald-700 font-semibold text-[11px]">Semua CS Aktif</span>
                            ) : (
                              <span className="text-gray-700 text-[11px]">
                                {s.numberIds.length} CS terpilih
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-center whitespace-nowrap">
                            <span className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-800 rounded font-bold text-[12px]">
                              {s.clicks}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-center whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleToggleSlugActive(s)}
                              className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${s.isActive ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                            >
                              {s.isActive ? 'Aktif' : 'Nonaktif'}
                            </button>
                          </td>
                          <td className="px-6 py-3.5 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => openEditSlug(s)}
                              className="text-[13px] font-bold text-gray-600 hover:text-[#990202] transition-colors mr-3"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteSlugConfirm(s)}
                              className="text-[13px] font-bold text-gray-500 hover:text-red-600 transition-colors"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Modal Tambah / Edit Slug */}
          <Modal
            isOpen={slugModalOpen}
            onClose={() => setSlugModalOpen(false)}
            title={editingSlug ? 'Edit Link Slug WhatsApp' : 'Tambah Link Slug WhatsApp'}
          >
            <form onSubmit={handleSaveSlug} className="space-y-4">
              {slugModalError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-[13px] font-semibold border border-red-100">
                  {slugModalError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-700">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="contoh: promo-pt, gads-merek"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-[13px] font-mono bg-white focus:outline-none focus:border-[#990202]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-700">Domain Terkait</label>
                  <select
                    value={formDomain}
                    onChange={(e) => setFormDomain(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-[13px] bg-white focus:outline-none focus:border-[#990202]"
                  >
                    {DOMAINS.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preview Link URL */}
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-[12px]">
                <span className="text-gray-500 font-medium">Preview Link Publik: </span>
                <span className="font-mono font-bold text-[#990202]">
                  https://{formDomain || 'easylegal.id'}/wa/{formSlug ? formSlug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-') : 'slug-anda'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-700">
                    Sumber Statis (Static Source) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-[13px] bg-white focus:outline-none focus:border-[#990202]"
                  >
                    <option value="metaads">Meta Ads (Facebook & Instagram Ads)</option>
                    <option value="gads">Google Ads (Search & Display)</option>
                    <option value="tiktok">TikTok Ads</option>
                    <option value="instagram">Instagram Organik (Bio/DM/Story)</option>
                    <option value="offline">Offline / Brosur / Event / Banner</option>
                    <option value="googleseo">Google SEO / Organik</option>
                    <option value="referral">Referral / Mitra Bisnis</option>
                    <option value="direct">Langsung / Direct</option>
                    <option value="other">Lainnya / Other</option>
                  </select>
                  <p className="text-[11px] text-gray-400">
                    Sumber lead ini akan otomatis tercatat secara statis di database lead WhatsApp saat link dibuka.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-gray-700">Nama Kampanye / Catatan (Opsional)</label>
                  <input
                    type="text"
                    placeholder="misal: Campaign IG Story Q1 2026"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-[13px] bg-white focus:outline-none focus:border-[#990202]"
                  />
                  <p className="text-[11px] text-gray-400">
                    Catatan internal untuk memudahkan monitoring tim marketing.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-bold text-gray-700">Teks Pesan WhatsApp</label>
                <textarea
                  rows={3}
                  placeholder="Halo EasyLegal, saya tertarik konsultasi promo paket pendirian PT..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-[13px] bg-white focus:outline-none focus:border-[#990202]"
                />
                <p className="text-[11px] text-gray-400">
                  Pesan yang otomatis muncul di aplikasi WhatsApp visitor. Sistem akan otomatis menyematkan sapaan CS dan kode lead unik <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">[Ref: EL-XXXXXX]</code> di akhir pesan.
                </p>
              </div>

              {/* Pool Pembatasan Nomor CS */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-bold text-gray-700">Rotasi Nomor CS (Opsional)</label>
                  <span className="text-[11px] text-gray-400">
                    {formNumberIds.length === 0 ? 'Semua nomor aktif (Default)' : `${formNumberIds.length} nomor terpilih`}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-36 overflow-y-auto space-y-1.5">
                  {numbers.filter((n) => n.isActive).map((n) => {
                    const checked = formNumberIds.includes(n.id)
                    return (
                      <label key={n.id} className="flex items-center gap-2 text-[13px] cursor-pointer hover:text-[#990202]">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormNumberIds([...formNumberIds, n.id])
                            } else {
                              setFormNumberIds(formNumberIds.filter((id) => id !== n.id))
                            }
                          }}
                          className="rounded border-gray-300 text-[#990202] focus:ring-[#990202]"
                        />
                        <span className="font-bold">{n.label || 'Tanpa Label'}</span>
                        <span className="font-mono text-gray-500 text-[12px]">{n.number}</span>
                      </label>
                    )
                  })}
                </div>
                <p className="text-[11px] text-gray-400">
                  Biarkan kosong jika ingin link ini merotasikan semua CS aktif. Centang nama CS tertentu jika ingin link khusus ke CS pilihan.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="formIsActive"
                  checked={formIsActive}
                  onChange={(e) => setFormIsActive(e.target.checked)}
                  className="rounded border-gray-300 text-[#990202] focus:ring-[#990202]"
                />
                <label htmlFor="formIsActive" className="text-[13px] font-semibold text-gray-700 cursor-pointer">
                  Aktifkan link ini (bisa diakses publik)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSlugModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingSlug}
                  className="px-5 py-2 bg-[#990202] hover:bg-[#7a0202] text-white rounded-lg text-[13px] font-bold transition-colors disabled:opacity-50"
                >
                  {savingSlug ? 'Menyimpan...' : editingSlug ? 'Perbarui Link' : 'Buat Link'}
                </button>
              </div>
            </form>
          </Modal>

          {/* Modal Konfirmasi Hapus Slug */}
          <Modal
            isOpen={Boolean(deleteSlugConfirm)}
            onClose={() => setDeleteSlugConfirm(null)}
            title="Hapus Link Slug WhatsApp"
          >
            <div className="space-y-4">
              <p className="text-[14px] text-gray-600">
                Apakah Anda yakin ingin menghapus link slug <span className="font-mono font-bold text-gray-900">/{deleteSlugConfirm?.slug}</span>?
              </p>
              <p className="text-[12px] text-gray-400">
                Setelah dihapus, link ini tidak akan lagi mengarahkan ke WhatsApp rotator. Riwayat lead yang sudah masuk sebelumnya tetap aman.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteSlugConfirm(null)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-[13px] font-semibold hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleDeleteSlug}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[13px] font-bold"
                >
                  Hapus Permanen
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}

      {tab === 'leads' && (
        <>
          {/* Filters — semua di sini mempengaruhi funnel, sumber, rincian, DAN
              tabel leads di bawah sekaligus (bukan cuma tabel). */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {DATE_PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setDatePreset(p.value)}
                  className={`px-3 py-1.5 rounded-lg border text-[13px] font-semibold transition-colors ${datePreset === p.value ? 'bg-[#990202] text-white border-[#990202]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                >
                  {p.label}
                </button>
              ))}
              {datePreset === 'custom' && (
                <span className="flex items-center gap-1.5 ml-1">
                  <input
                    type="date"
                    value={customFrom}
                    onChange={(e) => setCustomFrom(e.target.value)}
                    className="px-2.5 py-1.5 border border-gray-200 rounded-lg text-[13px]"
                  />
                  <span className="text-gray-400 text-[13px]">–</span>
                  <input
                    type="date"
                    value={customTo}
                    onChange={(e) => setCustomTo(e.target.value)}
                    className="px-2.5 py-1.5 border border-gray-200 rounded-lg text-[13px]"
                  />
                </span>
              )}
            </div>

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
              <select
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-[14px] bg-white"
              >
                {DOMAINS.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
              <select
                value={numberFilter}
                onChange={(e) => setNumberFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-[14px] bg-white"
              >
                <option value="">Semua Nomor</option>
                {numbers.map((n) => (
                  <option key={n.id} value={n.id}>{n.label || n.number}</option>
                ))}
              </select>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari kode lead (EL-XXXXXX)"
                className="px-3 py-2 border border-gray-200 rounded-lg text-[14px] bg-white font-mono w-[200px]"
              />
              {(statusFilter || sourceFilter || domainFilter || numberFilter || searchInput || datePreset !== 'all') && (
                <button
                  type="button"
                  onClick={() => { setStatusFilter(''); setSourceFilter(''); setDomainFilter(''); setNumberFilter(''); setSearchInput(''); setDatePreset('all') }}
                  className="px-3 py-2 text-[13px] font-bold text-gray-500 hover:text-red-600 transition-colors"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

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

          {/* Rincian leads: perhari/perminggu/perbulan/per nomor/per sumber/per layanan.
              Ikut filter status & sumber di atas. Dihitung server-side karena
              tabel leads di bawah cuma nampilin 1 halaman (paginated). */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h3 className="font-bold text-gray-900 text-[16px]">Rincian Leads</h3>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(STATS_GROUP_LABELS) as (keyof typeof STATS_GROUP_LABELS)[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setStatsGroupBy(g)}
                    className={`px-3 py-1.5 rounded-lg border text-[13px] font-semibold transition-colors ${statsGroupBy === g ? 'bg-[#990202] text-white border-[#990202]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                  >
                    {STATS_GROUP_LABELS[g]}
                  </button>
                ))}
              </div>
            </div>

            {(() => {
              const isTrend = ['day', 'week', 'month'].includes(statsGroupBy)
              const columnLabel = statsGroupBy === 'number' ? 'Nomor'
                : statsGroupBy === 'source' ? 'Sumber'
                : statsGroupBy === 'service' ? 'Layanan'
                : 'Periode'
              // day/week/month come back newest-first from the API (ORDER BY
              // bucket DESC) — flip to chronological for a left-to-right
              // reading trend; number/source/service stay sorted by count.
              const rows = isTrend ? [...statsData].reverse() : statsData
              const totalCount = statsData.reduce((sum, r) => sum + r.count, 0)
              const chartData = rows.map((r) => ({
                name: statsGroupBy === 'service' ? (r.label.length > 40 ? r.label.slice(0, 40) + '…' : r.label) : formatStatKey(statsGroupBy, r.label),
                value: r.count,
              }))
              return (
                <>
                  {!statsLoading && rows.length > 0 && (
                    <div className="mb-5" style={{ width: '100%', height: statsGroupBy === 'source' ? 260 : isTrend ? 260 : Math.max(rows.length * 34, 120) }}>
                      <ResponsiveContainer>
                        {isTrend ? (
                          <AreaChart data={chartData} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
                            <defs>
                              <linearGradient id="leadsTrendFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#990202" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#990202" stopOpacity={0.02} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ fontSize: 13, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                            <Area type="monotone" dataKey="value" name="Lead" stroke="#990202" strokeWidth={2} fill="url(#leadsTrendFill)" />
                          </AreaChart>
                        ) : statsGroupBy === 'source' ? (
                          <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                              {chartData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ fontSize: 13, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                            <Legend wrapperStyle={{ fontSize: 13 }} formatter={(v) => SOURCE_LABELS[v] || v} />
                          </PieChart>
                        ) : (
                          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 24, left: 8, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f1f1" />
                            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                            <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 12, fill: '#374151' }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ fontSize: 13, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                            <Bar dataKey="value" name="Lead" fill="#990202" radius={[0, 4, 4, 0]} maxBarSize={22} />
                          </BarChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  )}

                <div className="border border-gray-100 rounded-lg overflow-hidden overflow-x-auto max-h-[420px] overflow-y-auto">
                  <table className="w-full text-[14px]">
                    <thead className="sticky top-0">
                      <tr className="bg-gray-50 text-left text-gray-500 text-[12px] uppercase tracking-wider">
                        <th className="px-4 py-2.5">{columnLabel}</th>
                        <th className="px-4 py-2.5 text-right">Jumlah Lead</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statsLoading && (
                        <tr><td colSpan={2} className="px-4 py-6 text-center text-gray-400">Memuat rincian...</td></tr>
                      )}
                      {!statsLoading && rows.length === 0 && (
                        <tr><td colSpan={2} className="px-4 py-6 text-center text-gray-400">Belum ada data untuk rincian ini.</td></tr>
                      )}
                      {!statsLoading && rows.map((row) => (
                        <tr key={row.key} className="border-t border-gray-100">
                          <td className="px-4 py-2.5 text-gray-700" title={statsGroupBy === 'service' ? row.label : undefined}>
                            {statsGroupBy === 'service' ? (row.label.length > 80 ? row.label.slice(0, 80) + '…' : row.label) : formatStatKey(statsGroupBy, row.label)}
                          </td>
                          <td className="px-4 py-2.5 text-right font-bold text-gray-900">{row.count}</td>
                        </tr>
                      ))}
                    </tbody>
                    {!statsLoading && rows.length > 0 && (
                      <tfoot>
                        <tr className="border-t-2 border-gray-200 bg-gray-50">
                          <td className="px-4 py-2.5 font-bold text-gray-700">Total</td>
                          <td className="px-4 py-2.5 text-right font-bold text-gray-900">{totalCount}</td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                  </div>
                </>
              )
            })()}
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
