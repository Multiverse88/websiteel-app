import { useEffect, useState, useCallback, useMemo } from 'react'
import { api } from '../lib/api'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts'
import {
  Users,
  Zap,
  Flame,
  Search,
  TrendingUp,
  ExternalLink,
  Bot,
  RefreshCw,
  Globe,
  Calendar,
  FileText,
  Layers,
  Clock,
  CalendarDays,
  Briefcase,
  Headphones,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'

export type DatePreset = 'all' | 'today' | 'yesterday' | '7d' | '30d' | 'month' | 'lastmonth' | 'custom'
export type TimeGrouping = 'day' | 'week' | 'month'

const DOMAINS: { value: string; label: string }[] = [
  { value: 'all', label: 'Semua Domain' },
  { value: 'easylegal.id', label: 'easylegal.id' },
  { value: 'easylegal.biz.id', label: 'easylegal.biz.id' },
  { value: 'easylegal.co.id', label: 'easylegal.co.id' },
]

const DATE_PRESETS: { value: DatePreset; label: string }[] = [
  { value: 'today', label: 'Hari Ini' },
  { value: 'yesterday', label: 'Kemarin' },
  { value: '7d', label: '7 Hari Terakhir' },
  { value: '30d', label: '30 Hari Terakhir' },
  { value: 'month', label: 'Bulan Ini' },
  { value: 'lastmonth', label: 'Bulan Lalu' },
  { value: 'all', label: 'Semua Waktu' },
  { value: 'custom', label: 'Custom' },
]

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6b7280', '#06b6d4']

function ymd(d: Date): string {
  return new Date(d.getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

function computeDateRange(preset: DatePreset, customFrom: string, customTo: string): { from?: string; to?: string } {
  const now = new Date()
  if (preset === 'all') return {}
  if (preset === 'today') return { from: ymd(now), to: ymd(now) }
  if (preset === 'yesterday') { const d = new Date(now); d.setDate(d.getDate() - 1); return { from: ymd(d), to: ymd(d) } }
  if (preset === '7d') { const d = new Date(now); d.setDate(d.getDate() - 6); return { from: ymd(d), to: ymd(now) } }
  if (preset === '30d') { const d = new Date(now); d.setDate(d.getDate() - 29); return { from: ymd(d), to: ymd(now) } }
  if (preset === 'month') { const d = new Date(now.getFullYear(), now.getMonth(), 1); return { from: ymd(d), to: ymd(now) } }
  if (preset === 'lastmonth') {
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const end = new Date(now.getFullYear(), now.getMonth(), 0)
    return { from: ymd(start), to: ymd(end) }
  }
  return { from: customFrom || undefined, to: customTo || undefined }
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detail'>('overview')
  const [domain, setDomain] = useState<string>('all')
  const [preset, setPreset] = useState<DatePreset>('30d')
  const [customFrom, setCustomFrom] = useState<string>('')
  const [customTo, setCustomTo] = useState<string>('')
  const [excludeBot, setExcludeBot] = useState<boolean>(true)
  const [groupBy, setGroupBy] = useState<TimeGrouping>('day')

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [overviewData, setOverviewData] = useState<any | null>(null)
  const [detailData, setDetailData] = useState<any | null>(null)

  // Table search & pagination in detail tab
  const [pageSearch, setPageSearch] = useState<string>('')
  const [tablePage, setTablePage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(25)

  // Sync tab with URL hash
  useEffect(() => {
    const syncTabFromHash = () => {
      const hash = window.location.hash || ''
      if (hash.includes('/analytics/detail')) {
        setActiveTab('detail')
      } else {
        setActiveTab('overview')
      }
    }
    syncTabFromHash()
    window.addEventListener('hashchange', syncTabFromHash)
    return () => window.removeEventListener('hashchange', syncTabFromHash)
  }, [])

  const switchTab = (tab: 'overview' | 'detail') => {
    setActiveTab(tab)
    window.location.hash = tab === 'detail' ? '#/analytics/detail' : '#/analytics'
  }

  // Load Overview Data
  const loadOverview = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { from, to } = computeDateRange(preset, customFrom, customTo)
      const res = await api.getAnalyticsOverview({
        domain,
        from,
        to,
        excludeBot,
      })
      setOverviewData(res.data)
    } catch (err: any) {
      console.error('Failed to load overview analytics:', err)
      setError(err.message || 'Gagal memuat data ringkasan analytics')
    } finally {
      setLoading(false)
    }
  }, [domain, preset, customFrom, customTo, excludeBot])

  // Load Detail Data
  const loadDetail = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { from, to } = computeDateRange(preset, customFrom, customTo)
      const res = await api.getAnalyticsDetail({
        domain,
        from,
        to,
        groupBy,
        excludeBot,
      })
      setDetailData(res.data)
    } catch (err: any) {
      console.error('Failed to load detail analytics:', err)
      setError(err.message || 'Gagal memuat data detail analytics')
    } finally {
      setLoading(false)
    }
  }, [domain, preset, customFrom, customTo, groupBy, excludeBot])

  useEffect(() => {
    if (activeTab === 'overview') {
      loadOverview()
    } else {
      loadDetail()
    }
  }, [activeTab, loadOverview, loadDetail])

  const handleJumpToCrm = (productPath: string) => {
    sessionStorage.setItem('preferred_lead_product', productPath)
    window.location.hash = '#/wa-rotator'
  }

  // Filtered pages for the detail table
  const allPages = detailData?.allPages || []
  const filteredPages = useMemo(() => {
    if (!pageSearch.trim()) return allPages
    const q = pageSearch.toLowerCase().trim()
    return allPages.filter((p: any) => p.path.toLowerCase().includes(q) || p.domain.toLowerCase().includes(q))
  }, [allPages, pageSearch])

  const totalPagesCount = Math.max(1, Math.ceil(filteredPages.length / pageSize))
  const paginatedPages = useMemo(() => {
    const start = (tablePage - 1) * pageSize
    return filteredPages.slice(start, start + pageSize)
  }, [filteredPages, tablePage, pageSize])

  // Overview data fallbacks
  const funnel = overviewData?.funnel || {
    totalClicks: 0,
    organicLeads: 0,
    botFiltered: 0,
    todayLeads: 0,
    organicSeoLeads: 0,
    organicSeoPercent: 0,
    topPageName: '-',
  }
  const timeline = overviewData?.timeline || []
  const channels = overviewData?.channels || []
  const topPages = overviewData?.topPages || []
  const topArticles = overviewData?.topArticles || []

  // Detail data fallbacks
  const hourly = detailData?.hourly || []
  const dayOfWeek = detailData?.dayOfWeek || []
  const trend = detailData?.trend || []
  const services = detailData?.services || []
  const csNumbers = detailData?.csNumbers || []

  // Find peak hour
  const peakHour = useMemo(() => {
    if (!hourly.length) return null
    return [...hourly].sort((a: any, b: any) => b.leads - a.leads)[0]
  }, [hourly])

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* 1. Top Bar & Tab Navigation */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="p-2 bg-red-50 text-red-600 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </span>
              Analytics & Leads Intelligence
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Pemantauan performa trafik multi-domain, pola jam sibuk, dan efektivitas halaman
            </p>
          </div>

          {/* Global Filter Controllers */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Domain selector */}
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-sm">
              <Globe className="w-4 h-4 text-gray-500" />
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="bg-transparent border-none text-gray-800 font-medium focus:ring-0 cursor-pointer"
              >
                {DOMAINS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date preset selector */}
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={preset}
                onChange={(e) => setPreset(e.target.value as DatePreset)}
                className="bg-transparent border-none text-gray-800 font-medium focus:ring-0 cursor-pointer"
              >
                {DATE_PRESETS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Date Range */}
            {preset === 'custom' && (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={customFrom}
                  onChange={(e) => setCustomFrom(e.target.value)}
                  className="px-2.5 py-1.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-800"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="date"
                  value={customTo}
                  onChange={(e) => setCustomTo(e.target.value)}
                  className="px-2.5 py-1.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-800"
                />
              </div>
            )}

            {/* Bot filter toggle */}
            <label className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl cursor-pointer select-none">
              <input
                type="checkbox"
                checked={excludeBot}
                onChange={(e) => setExcludeBot(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
              />
              <span className="flex items-center gap-1.5 text-gray-700 font-medium">
                <Bot className="w-4 h-4 text-gray-500" />
                Filter Bot
              </span>
            </label>

            {/* Refresh button */}
            <button
              onClick={() => (activeTab === 'overview' ? loadOverview() : loadDetail())}
              disabled={loading}
              className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors disabled:opacity-50"
              title="Muat ulang data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Tab Buttons & Granularity Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => switchTab('overview')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Ringkasan & Funnel
            </button>
            <button
              onClick={() => switchTab('detail')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'detail'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>Laporan Detail & Grafik Lengkap</span>
              <span className="px-1.5 py-0.2 bg-red-100 text-red-700 text-[10px] font-mono rounded-full font-bold">
                Deep Dive
              </span>
            </button>
          </div>

          {/* Granularity Switcher (Active on Detail Tab) */}
          {activeTab === 'detail' && (
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
              <span className="text-gray-400 px-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Granulasi:
              </span>
              <button
                onClick={() => setGroupBy('day')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  groupBy === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Per Hari
              </button>
              <button
                onClick={() => setGroupBy('week')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  groupBy === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Per Minggu
              </button>
              <button
                onClick={() => setGroupBy('month')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  groupBy === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Per Bulan
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW & FUNNEL                                                  */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <>
          {/* Quick Banner to Detail */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Ingin eksplorasi grafik jam sibuk, pola hari, dan kategori layanan?</h2>
                <p className="text-xs text-slate-300">
                  Lihat visualisasi 24 jam, hari kerja vs akhir pekan, dan tabel seluruh halaman tanpa batas 20 halaman.
                </p>
              </div>
            </div>
            <button
              onClick={() => switchTab('detail')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap"
            >
              <span>Buka Laporan Detail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Leads */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-500 text-sm font-medium">
                <span>Total Lead Organik</span>
                <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Users className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-extrabold text-gray-900 font-mono">
                  {funnel.organicLeads.toLocaleString('id-ID')}
                </div>
                <div className="text-xs text-gray-400 mt-1 flex items-center justify-between">
                  <span>Total interaksi: {funnel.totalClicks.toLocaleString('id-ID')}</span>
                  {funnel.botFiltered > 0 && (
                    <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-mono font-medium">
                      -{funnel.botFiltered} bot
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card 2: Trafik Hari Ini */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-500 text-sm font-medium">
                <span>Trafik Hari Ini</span>
                <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Zap className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-extrabold text-emerald-600 font-mono">
                  {funnel.todayLeads > 0 ? `+${funnel.todayLeads.toLocaleString('id-ID')}` : funnel.todayLeads}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Lead baru masuk hari ini (WIB)
                </div>
              </div>
            </div>

            {/* Card 3: Trafik Google SEO */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-500 text-sm font-medium">
                <span>Trafik Google SEO</span>
                <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Search className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-extrabold text-gray-900 font-mono">
                  {funnel.organicSeoLeads.toLocaleString('id-ID')}
                </div>
                <div className="text-xs text-blue-600 mt-1 font-medium">
                  Pangsa: <b className="font-mono font-bold">{funnel.organicSeoPercent}%</b> dari total lead
                </div>
              </div>
            </div>

            {/* Card 4: Top Service Halaman #1 */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-500 text-sm font-medium">
                <span>Halaman Teratas (#1)</span>
                <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                  <Flame className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-4">
                <div className="text-lg lg:text-xl font-bold text-gray-900 font-mono truncate" title={funnel.topPageName}>
                  {funnel.topPageName}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Penyumbang interaksi terbanyak
                </div>
              </div>
            </div>
          </div>

          {/* Charts: Tren & Channels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Tren Lead Harian per Domain</h2>
                  <p className="text-xs text-gray-500">Volume lead per hari (WIB) yang masuk ke masing-masing domain</p>
                </div>
              </div>
              <div className="h-72 w-full">
                {timeline.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorId" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorBiz" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorCo" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="id" name="easylegal.id" stroke="#ef4444" fillOpacity={1} fill="url(#colorId)" />
                      <Area type="monotone" dataKey="biz" name="easylegal.biz.id" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBiz)" />
                      <Area type="monotone" dataKey="co" name="easylegal.co.id" stroke="#10b981" fillOpacity={1} fill="url(#colorCo)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Belum ada data tren untuk periode ini
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">Saluran Akuisisi</h2>
                <p className="text-xs text-gray-500">Distribusi sumber kedatangan lead</p>
              </div>
              <div className="h-56 w-full my-2">
                {channels.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channels}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="count"
                        nameKey="label"
                      >
                        {channels.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Tidak ada data saluran
                  </div>
                )}
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {channels.map((c: any, idx: number) => (
                  <div key={c.channel} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                      <span className="text-gray-700 font-medium truncate">{c.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-gray-500">
                      <span>{c.count}</span>
                      <span className="text-gray-400">({c.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top 20 Converting Pages Table */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-red-600" />
                  Performa Halaman (Top 20 Pages)
                </h2>
                <p className="text-xs text-gray-500">
                  Halaman yang paling banyak menyumbang lead interaksi WhatsApp
                </p>
              </div>
              <button
                onClick={() => switchTab('detail')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                <span>Lihat Seluruh Halaman ({allPages.length || 'Lengkap'})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold border-y border-gray-100">
                  <tr>
                    <th className="py-3 px-4">URL Halaman</th>
                    <th className="py-3 px-4">Domain</th>
                    <th className="py-3 px-4 text-center">Total Lead</th>
                    <th className="py-3 px-4 text-center">Pangsa Trafik (%)</th>
                    <th className="py-3 px-4 text-center">Sumber Utama</th>
                    <th className="py-3 px-4 text-center">Hari Ini</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topPages.map((page: any, idx: number) => (
                    <tr key={`${page.path}-${idx}`} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-900 max-w-xs truncate" title={page.path}>
                        {page.path}
                      </td>
                      <td className="py-3 px-4 text-xs font-mono text-gray-500">
                        {page.domain}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-gray-800">
                        {page.totalLeads}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{ width: `${Math.min((page.sharePercent || 0) * 3, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-semibold text-gray-700">
                            {page.sharePercent || 0}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          (page.topSource || '').includes('SEO')
                            ? 'bg-blue-50 text-blue-700'
                            : (page.topSource || '').includes('Ads')
                            ? 'bg-emerald-50 text-emerald-700'
                            : (page.topSource || '').includes('Instagram')
                            ? 'bg-pink-50 text-pink-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {page.topSource || 'Organik'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-semibold text-gray-800">
                        {page.todayLeads > 0 ? (
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                            +{page.todayLeads}
                          </span>
                        ) : (
                          <span className="text-gray-300">0</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleJumpToCrm(page.path)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-colors"
                          title="Lihat semua kontak leads dari halaman ini di CRM"
                        >
                          <span>CRM</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {topPages.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-400 text-sm">
                        Belum ada data halaman untuk filter ini
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Articles Performance */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Statistik Artikel & Konten Edukasi
                </h2>
                <p className="text-xs text-gray-500">
                  Artikel paling banyak dibaca dan kontribusinya terhadap lead masuk
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topArticles.map((art: any) => (
                <div
                  key={art.slug}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 flex flex-col justify-between hover:border-gray-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5 font-mono">
                      <span>{art.site}</span>
                      <span className="text-gray-500 font-sans">{art.viewCount} pembaca</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2" title={art.title}>
                      {art.title}
                    </h3>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      Menghasilkan <b className="text-gray-800 font-mono">{art.leadsGenerated}</b> lead
                    </span>
                    <a
                      href={`https://${art.site}/artikel/${art.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <span>Baca</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
              {topArticles.length === 0 && (
                <div className="col-span-2 py-8 text-center text-gray-400 text-sm">
                  Belum ada data artikel yang tercatat
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DEEP DIVE & COMPLETE CHARTS                                        */}
      {/* ========================================================================= */}
      {activeTab === 'detail' && (
        <div className="space-y-6">
          {/* Section 1: Pola Waktu Kunjungan (Jam Sibuk 24 Jam & Hari Kunjungan) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1.1 Distribusi Jam Sibuk 24 Jam */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Distribusi Jam Sibuk (00:00 - 23:00 WIB)
                  </h2>
                  {peakHour && peakHour.leads > 0 && (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-mono font-bold">
                      Jam Puncak: {peakHour.label} ({peakHour.leads} lead)
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Waktu paling aktif calon klien mengklik tombol WhatsApp untuk konsultasi
                </p>
              </div>

              <div className="h-64 w-full">
                {hourly.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={2} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                        formatter={(val: any) => [`${val} lead`, 'Volume']}
                      />
                      <Bar dataKey="leads" name="Jumlah Lead" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Belum ada data jam kunjungan
                  </div>
                )}
              </div>
            </div>

            {/* 1.2 Pola Hari dalam Seminggu (Senin - Minggu) */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-1">
                  <CalendarDays className="w-5 h-5 text-emerald-600" />
                  Pola Hari dalam Seminggu
                </h2>
                <p className="text-xs text-gray-500 mb-4">
                  Perbandingan volume lead antara hari kerja (Senin–Jumat) dan akhir pekan
                </p>
              </div>

              <div className="h-64 w-full">
                {dayOfWeek.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dayOfWeek} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="dayName" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                        formatter={(val: any) => [`${val} lead`, 'Volume']}
                      />
                      <Bar dataKey="leads" name="Jumlah Lead" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Belum ada data hari kunjungan
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Tren Utama Sesuai Granulasi & Kurva Bot */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 2.1 Tren Utama (Harian/Mingguan/Bulanan) */}
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-red-600" />
                    Tren Trafik Terkelompok ({groupBy === 'day' ? 'Harian' : groupBy === 'week' ? 'Mingguan' : 'Bulanan'})
                  </h2>
                  <p className="text-xs text-gray-500">
                    Akumulasi lead per {groupBy === 'day' ? 'hari' : groupBy === 'week' ? 'minggu' : 'bulan'} di ketiga domain
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                  {trend.length} periode data
                </span>
              </div>

              <div className="h-72 w-full">
                {trend.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="detailId" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="detailBiz" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="detailCo" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="bucket" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="id" name="easylegal.id" stroke="#ef4444" fillOpacity={1} fill="url(#detailId)" />
                      <Area type="monotone" dataKey="biz" name="easylegal.biz.id" stroke="#3b82f6" fillOpacity={1} fill="url(#detailBiz)" />
                      <Area type="monotone" dataKey="co" name="easylegal.co.id" stroke="#10b981" fillOpacity={1} fill="url(#detailCo)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Belum ada data tren untuk granulasi ini
                  </div>
                )}
              </div>
            </div>

            {/* 2.2 Kurva Kebersihan Trafik (Organik vs Bot) */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Kebersihan Trafik (Lead vs Bot)
                </h2>
                <p className="text-xs text-gray-500 mb-3">
                  Perbandingan lead manusia organik vs crawler/bot tersaring
                </p>
              </div>

              <div className="h-60 w-full my-2">
                {trend.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="bucket" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="total" name="Lead Organik" stroke="#10b981" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="bot" name="Bot Tersaring" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Tidak ada data bot
                  </div>
                )}
              </div>

              <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-500 border border-gray-100 flex items-center justify-between">
                <span>Total Bot Tersaring:</span>
                <span className="font-mono font-bold text-amber-700">
                  {trend.reduce((acc: number, r: any) => acc + (r.bot || 0), 0).toLocaleString('id-ID')} klik
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Popularitas Kategori Layanan & Beban Nomor CS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 3.1 Kategori Layanan */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    Popularitas Kategori Layanan
                  </h2>
                  <p className="text-xs text-gray-500">
                    Klasifikasi bidang hukum yang paling banyak ditanyakan calon klien
                  </p>
                </div>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {services.map((s: any) => (
                  <div key={s.serviceName} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-gray-900">{s.serviceName}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-gray-900 font-bold">{s.leads} lead</span>
                        <span className="text-gray-400">({s.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(s.percentage * 2.5, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
                {services.length === 0 && (
                  <div className="py-8 text-center text-gray-400 text-sm">
                    Belum ada data kategori layanan
                  </div>
                )}
              </div>
            </div>

            {/* 3.2 Aliran Lead ke Nomor WhatsApp CS */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-emerald-600" />
                    Aliran Lead ke Nomor WhatsApp CS
                  </h2>
                  <p className="text-xs text-gray-500">
                    Distribusi perputaran lead yang diterima oleh masing-masing nomor admin CS
                  </p>
                </div>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {csNumbers.map((cs: any) => (
                  <div key={cs.numberId || cs.number} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">{cs.label}</span>
                        <span className="text-gray-400 font-mono text-[11px]">{cs.number}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-emerald-700 font-bold">{cs.leads} lead</span>
                        <span className="text-gray-400">({cs.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(cs.percentage * 2.5, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
                {csNumbers.length === 0 && (
                  <div className="py-8 text-center text-gray-400 text-sm">
                    Belum ada data nomor CS
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Eksplorasi Seluruh Halaman (Full Paginated Table) */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-red-600" />
                  Eksplorasi Seluruh Halaman ({filteredPages.length} Halaman)
                </h2>
                <p className="text-xs text-gray-500">
                  Daftar lengkap seluruh URL halaman yang pernah menghasilkan interaksi WhatsApp
                </p>
              </div>

              {/* Search & Page Size Controller */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari URL halaman..."
                    value={pageSearch}
                    onChange={(e) => {
                      setPageSearch(e.target.value)
                      setTablePage(1)
                    }}
                    className="pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:bg-white text-gray-900 w-56"
                  />
                </div>

                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                    setTablePage(1)
                  }}
                  className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-xl bg-gray-50 text-gray-800 font-medium cursor-pointer"
                >
                  <option value={25}>25 baris</option>
                  <option value={50}>50 baris</option>
                  <option value={100}>100 baris</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold border-y border-gray-100">
                  <tr>
                    <th className="py-3 px-4">URL Halaman</th>
                    <th className="py-3 px-4">Domain</th>
                    <th className="py-3 px-4 text-center">Total Lead</th>
                    <th className="py-3 px-4 text-center">Pangsa Trafik (%)</th>
                    <th className="py-3 px-4 text-center">Sumber Utama</th>
                    <th className="py-3 px-4 text-center">Hari Ini</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedPages.map((page: any, idx: number) => (
                    <tr key={`${page.path}-${idx}`} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-900 max-w-sm truncate" title={page.path}>
                        {page.path}
                      </td>
                      <td className="py-3 px-4 text-xs font-mono text-gray-500">
                        {page.domain}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-gray-800">
                        {page.totalLeads}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{ width: `${Math.min((page.sharePercent || 0) * 3, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-semibold text-gray-700">
                            {page.sharePercent || 0}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          (page.topSource || '').includes('SEO')
                            ? 'bg-blue-50 text-blue-700'
                            : (page.topSource || '').includes('Ads')
                            ? 'bg-emerald-50 text-emerald-700'
                            : (page.topSource || '').includes('Instagram')
                            ? 'bg-pink-50 text-pink-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {page.topSource || 'Organik'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-semibold text-gray-800">
                        {page.todayLeads > 0 ? (
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                            +{page.todayLeads}
                          </span>
                        ) : (
                          <span className="text-gray-300">0</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleJumpToCrm(page.path)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-colors"
                          title="Lihat semua kontak leads dari halaman ini di CRM"
                        >
                          <span>CRM</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedPages.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-400 text-sm">
                        Tidak ada halaman yang cocok dengan pencarian &quot;{pageSearch}&quot;
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPagesCount > 1 && (
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <span className="text-gray-500">
                  Menampilkan {(tablePage - 1) * pageSize + 1} - {Math.min(tablePage * pageSize, filteredPages.length)} dari {filteredPages.length} halaman
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setTablePage((p) => Math.max(1, p - 1))}
                    disabled={tablePage === 1}
                    className="p-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1 font-mono font-semibold text-gray-800 bg-gray-100 rounded-lg">
                    {tablePage} / {totalPagesCount}
                  </span>
                  <button
                    onClick={() => setTablePage((p) => Math.min(totalPagesCount, p + 1))}
                    disabled={tablePage === totalPagesCount}
                    className="p-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
