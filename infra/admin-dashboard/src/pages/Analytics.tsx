import { useEffect, useState, useCallback } from 'react'
import { api } from '../lib/api'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
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
} from 'lucide-react'

export type DatePreset = 'all' | 'today' | 'yesterday' | '7d' | '30d' | 'month' | 'lastmonth' | 'custom'

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
  const [domain, setDomain] = useState<string>('all')
  const [preset, setPreset] = useState<DatePreset>('30d')
  const [customFrom, setCustomFrom] = useState<string>('')
  const [customTo, setCustomTo] = useState<string>('')
  const [excludeBot, setExcludeBot] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any | null>(null)

  const loadData = useCallback(async () => {
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
      setData(res.data)
    } catch (err: any) {
      console.error('Failed to load analytics:', err)
      setError(err.message || 'Gagal memuat data analytics')
    } finally {
      setLoading(false)
    }
  }, [domain, preset, customFrom, customTo, excludeBot])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleJumpToCrm = (productPath: string) => {
    // Navigate to WhatsAppRotator's leads tab with this product pre-filtered
    sessionStorage.setItem('preferred_lead_product', productPath)
    window.location.hash = '#/wa-rotator'
  }

  const funnel = data?.funnel || {
    totalClicks: 0,
    organicLeads: 0,
    botFiltered: 0,
    todayLeads: 0,
    organicSeoLeads: 0,
    organicSeoPercent: 0,
    topPageName: '-',
  }

  const timeline = data?.timeline || []
  const channels = data?.channels || []
  const topPages = data?.topPages || []
  const topArticles = data?.topArticles || []

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* 1. Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
            <span className="p-2 bg-red-50 text-red-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </span>
            Analytics & Leads Intelligence
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Pemantauan performa trafik multi-domain, funnel konversi CRM, dan efektivitas halaman
          </p>
        </div>

        {/* Global Controllers */}
        <div className="flex flex-wrap items-center gap-3">
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

          {/* Custom Date Range if preset is custom */}
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
            onClick={loadData}
            disabled={loading}
            className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors disabled:opacity-50"
            title="Muat ulang data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* 2. Funnel KPI Summary Cards */}
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
                <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-mono">
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

        {/* Card 3: Trafik Organik Google SEO */}
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

      {/* 3. Recharts Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tren Harian per Domain (2 Kolom) */}
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

        {/* Komposisi Saluran Akuisisi (1 Kolom) */}
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
          {/* Channel Legend List */}
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

      {/* 4. Top Converting Pages Table */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-red-600" />
              Performa Halaman (Top Converting Pages)
            </h2>
            <p className="text-xs text-gray-500">
              Halaman yang paling banyak menghasilkan lead interaksi WhatsApp dan closing transaksi
            </p>
          </div>
          <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
            Top {topPages.length} Halaman
          </span>
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

      {/* 5. Top Articles Performance */}
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
    </div>
  )
}
