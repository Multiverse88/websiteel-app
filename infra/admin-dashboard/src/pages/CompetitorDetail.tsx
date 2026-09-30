import { useState, useEffect, useCallback, useRef } from 'react'
import { api } from '../lib/api'
import Modal from '../components/Modal'
import {
  ArrowLeft,
  Play,
  Globe,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Search,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Tag,
  FileText,
  Layers,
  ArrowUpRight,
  DollarSign,
} from 'lucide-react'

interface CompetitorDetailProps {
  competitorId: string
}

interface CompetitorData {
  id: string
  name: string
  baseUrl: string
  hostname: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  crawls: CrawlItem[]
}

interface CrawlItem {
  id: string
  status: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'PARTIAL' | 'FAILED' | 'CANCELLED'
  startedAt: string | null
  finishedAt: string | null
  pagesScraped: number
  pagesFailed: number
  errorMessage: string | null
  createdAt: string
}

interface PageSnapshot {
  id: string
  url: string
  path: string
  statusCode: number
  contentType: string | null
  canonicalUrl: string | null
  title: string | null
  metaDescription: string | null
  h1: string | null
  keywords?: string | null
  headings: { level: number; text: string }[]
  priceTexts: string[]
  ctas: { label: string; url: string }[]
  contentHash: string
  classification: 'CONTENT' | 'SERVICE' | 'ARTICLE' | 'OTHER' | 'UNSUPPORTED_DYNAMIC'
  scrapedAt: string
}

interface DiffDetail {
  field: string
  before: unknown
  after: unknown
}

interface DiffItem {
  url: string
  changeTypes: ('ADDED_PAGE' | 'REMOVED_PAGE' | 'SEO_CHANGED' | 'PRICE_CHANGED' | 'CTA_CHANGED' | 'STATUS_CHANGED' | 'CONTENT_CHANGED')[]
  details: DiffDetail[]
}

interface DiffData {
  currentCrawlId: string
  previousCrawlId: string | null
  summary: {
    added: number
    removed: number
    changed: number
    unchanged: number
  }
  changes: DiffItem[]
}

export default function CompetitorDetail({ competitorId }: CompetitorDetailProps) {
  const [competitor, setCompetitor] = useState<CompetitorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Selected crawl
  const [selectedCrawlId, setSelectedCrawlId] = useState<string | null>(null)
  const [triggering, setTriggering] = useState(false)

  // Active Tab: 'pages' | 'changes' | 'history'
  const [activeTab, setActiveTab] = useState<'pages' | 'changes' | 'history'>('pages')

  // Pages tab state
  const [pages, setPages] = useState<PageSnapshot[]>([])
  const [pagesLoading, setPagesLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [classificationFilter, setClassificationFilter] = useState('')
  const [selectedPage, setSelectedPage] = useState<PageSnapshot | null>(null)

  // Changes tab state
  const [diffData, setDiffData] = useState<DiffData | null>(null)
  const [diffLoading, setDiffLoading] = useState(false)

  const pollingRef = useRef<number | null>(null)

  const loadCompetitor = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    setError(null)
    try {
      const data = await api.getCompetitor(competitorId)
      setCompetitor(data)
      if (data?.crawls?.length > 0 && !selectedCrawlId) {
        setSelectedCrawlId(data.crawls[0].id)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal memuat detail kompetitor'
      setError(msg)
    } finally {
      if (!silent) setLoading(false)
    }
  }, [competitorId, selectedCrawlId])

  useEffect(() => {
    loadCompetitor()
    return () => {
      if (pollingRef.current) window.clearInterval(pollingRef.current)
    }
  }, [loadCompetitor])

  // Polling when latest crawl is PENDING or RUNNING
  const latestCrawl = competitor?.crawls?.[0]
  const isActiveCrawlRunning =
    latestCrawl?.status === 'PENDING' || latestCrawl?.status === 'RUNNING'

  useEffect(() => {
    if (isActiveCrawlRunning) {
      if (!pollingRef.current) {
        pollingRef.current = window.setInterval(() => {
          loadCompetitor(true)
        }, 3000)
      }
    } else {
      if (pollingRef.current) {
        window.clearInterval(pollingRef.current)
        pollingRef.current = null
      }
    }
    return () => {
      if (pollingRef.current) {
        window.clearInterval(pollingRef.current)
        pollingRef.current = null
      }
    }
  }, [isActiveCrawlRunning, loadCompetitor])

  // Load pages when selectedCrawlId, pageNumber, search, or classification changes
  useEffect(() => {
    if (!selectedCrawlId || activeTab !== 'pages') return
    let isCancelled = false

    const fetchPages = async () => {
      setPagesLoading(true)
      try {
        const res = await api.getCompetitorCrawlPages(selectedCrawlId, {
          page: pageNumber,
          limit: 20,
          search: search || undefined,
          classification: classificationFilter || undefined,
        })
        if (!isCancelled) {
          setPages(res.data || [])
          setTotalPages(res.pagination?.totalPages || 1)
        }
      } catch (err: unknown) {
        if (!isCancelled) setPages([])
      } finally {
        if (!isCancelled) setPagesLoading(false)
      }
    }

    const timer = setTimeout(fetchPages, 200)
    return () => {
      isCancelled = true
      clearTimeout(timer)
    }
  }, [selectedCrawlId, pageNumber, search, classificationFilter, activeTab])

  // Load diff when changes tab is opened
  useEffect(() => {
    if (!selectedCrawlId || activeTab !== 'changes') return
    let isCancelled = false

    const fetchDiff = async () => {
      setDiffLoading(true)
      try {
        const data = await api.getCompetitorCrawlChanges(selectedCrawlId)
        if (!isCancelled) {
          setDiffData(data)
        }
      } catch (err: unknown) {
        if (!isCancelled) setDiffData(null)
      } finally {
        if (!isCancelled) setDiffLoading(false)
      }
    }

    fetchDiff()
    return () => {
      isCancelled = true
    }
  }, [selectedCrawlId, activeTab])

  const handleTriggerCrawl = async () => {
    setTriggering(true)
    try {
      const res = await api.triggerCompetitorCrawl(competitorId)
      await loadCompetitor(true)
      if (res?.id) setSelectedCrawlId(res.id)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal menjadwalkan crawl'
      alert(msg)
    } finally {
      setTriggering(false)
    }
  }

  const selectedCrawl = competitor?.crawls?.find((c) => c.id === selectedCrawlId) || latestCrawl

  const formatDate = (isoString?: string | null) => {
    if (!isoString) return '-'
    const d = new Date(isoString)
    return d.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
    })
  }

  const renderBadge = (status?: string) => {
    switch (status) {
      case 'SUCCEEDED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
          </span>
        )
      case 'RUNNING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Sedang Crawling...
          </span>
        )
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" /> Antrean Worker
          </span>
        )
      case 'PARTIAL':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
            <AlertTriangle className="w-3.5 h-3.5" /> Selesai Sebagian
          </span>
        )
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
            <XCircle className="w-3.5 h-3.5" /> Gagal
          </span>
        )
      default:
        return null
    }
  }

  const renderClassificationBadge = (cls: string) => {
    switch (cls) {
      case 'SERVICE':
        return <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[11px] font-semibold">Layanan</span>
      case 'ARTICLE':
        return <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-[11px] font-semibold">Artikel</span>
      case 'CONTENT':
        return <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[11px] font-semibold">Konten</span>
      case 'UNSUPPORTED_DYNAMIC':
        return <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[11px] font-semibold">JS Dinamis</span>
      default:
        return <span className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded text-[11px]">{cls}</span>
    }
  }

  if (loading && !competitor) {
    return (
      <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span>Memuat data kompetitor...</span>
      </div>
    )
  }

  if (!competitor) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <a href="#/competitors" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4" /> Kembali ke daftar
        </a>
        <div className="p-6 bg-red-50 text-red-700 rounded-xl border border-red-200">
          Kompetitor tidak ditemukan atau telah dihapus.
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <a
            href="#/competitors"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-primary transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Daftar Kompetitor
          </a>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
            <Globe className="w-6 h-6 text-primary" />
            {competitor.name}
          </h1>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 font-mono">
            <a
              href={competitor.baseUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              {competitor.baseUrl} <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span>Domain: {competitor.hostname}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadCompetitor(true)}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleTriggerCrawl}
            disabled={triggering || isActiveCrawlRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition shadow-sm ${
              triggering || isActiveCrawlRunning
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-hover'
            }`}
          >
            {triggering || isActiveCrawlRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sedang Crawling...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Jalankan Crawl Sekarang
              </>
            )}
          </button>
        </div>
      </div>

      {/* Running Banner */}
      {isActiveCrawlRunning && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-4 text-blue-900 animate-pulse">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Crawl sedang berlangsung</p>
              <p className="text-xs text-blue-700">
                Worker Scrapy sedang menjelajah sitemap dan halaman website. Halaman snapshot akan bertambah secara real-time.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono bg-blue-100/80 px-2 py-1 rounded text-blue-800">
            {latestCrawl?.status}
          </span>
        </div>
      )}

      {/* Crawl Run Selector & Overview */}
      {competitor.crawls.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-gray-700">Pilih Run Crawl:</label>
            <select
              value={selectedCrawlId || ''}
              onChange={(e) => {
                setSelectedCrawlId(e.target.value)
                setPageNumber(1)
              }}
              className="px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {competitor.crawls.map((c, idx) => (
                <option key={c.id} value={c.id}>
                  Run #{competitor.crawls.length - idx} — {formatDate(c.createdAt)} ({c.status} - {c.pagesScraped} hal)
                </option>
              ))}
            </select>
            {selectedCrawl && renderBadge(selectedCrawl.status)}
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Mulai: {formatDate(selectedCrawl?.startedAt || selectedCrawl?.createdAt)}</span>
            {selectedCrawl?.finishedAt && (
              <>
                <span>•</span>
                <span>Selesai: {formatDate(selectedCrawl.finishedAt)}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 flex gap-4">
        <button
          onClick={() => setActiveTab('pages')}
          className={`pb-3 px-1 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'pages'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          Daftar Halaman Snapshot ({selectedCrawl?.pagesScraped || 0})
        </button>
        <button
          onClick={() => setActiveTab('changes')}
          className={`pb-3 px-1 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'changes'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Perubahan & Diff
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-1 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'history'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          Histori Crawl ({competitor.crawls.length})
        </button>
      </div>

      {/* TAB 1: Pages Snapshot */}
      {activeTab === 'pages' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari URL atau judul halaman..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPageNumber(1)
                }}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">Tipe:</label>
              <select
                value={classificationFilter}
                onChange={(e) => {
                  setClassificationFilter(e.target.value)
                  setPageNumber(1)
                }}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-white text-gray-700"
              >
                <option value="">Semua Klasifikasi</option>
                <option value="SERVICE">Layanan</option>
                <option value="ARTICLE">Artikel</option>
                <option value="CONTENT">Konten</option>
                <option value="UNSUPPORTED_DYNAMIC">JS Dinamis</option>
                <option value="OTHER">Lainnya</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {pagesLoading ? (
              <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-xs">Memuat halaman snapshot...</span>
              </div>
            ) : pages.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs">
                Tidak ada halaman yang ditemukan pada run crawl ini.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">Halaman & Title</th>
                      <th className="py-3 px-4">Header H1 & Keywords</th>
                      <th className="py-3 px-4">Klasifikasi</th>
                      <th className="py-3 px-4">Harga Terdeteksi</th>
                      <th className="py-3 px-4">CTA / Kontak</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pages.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition">
                        <td className="py-3.5 px-4 max-w-sm">
                          <button
                            type="button"
                            onClick={() => setSelectedPage(p)}
                            className="font-semibold text-left text-gray-900 hover:text-primary hover:underline transition truncate block max-w-full"
                            title={`Lihat detail: ${p.title || p.path}`}
                          >
                            {p.title || p.path}
                          </button>
                          <div className="text-[11px] text-gray-400 font-mono truncate mt-0.5">
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="hover:text-primary hover:underline inline-flex items-center gap-1"
                            >
                              {p.path} <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 max-w-sm">
                          <div className="font-medium text-gray-800 text-xs truncate" title={p.h1 || '-'}>
                            {p.h1 ? (
                              <span className="flex items-center gap-1.5">
                                <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded shrink-0">H1</span>
                                <span className="truncate">{p.h1}</span>
                              </span>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </div>
                          {p.keywords && (
                            <div className="text-[11px] text-gray-500 truncate mt-1 flex items-center gap-1" title={p.keywords}>
                              <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1 py-0.2 rounded shrink-0">KW</span>
                              <span className="truncate">{p.keywords}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">{renderClassificationBadge(p.classification)}</td>
                        <td className="py-3.5 px-4 max-w-xs">
                          {p.priceTexts && p.priceTexts.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {p.priceTexts.slice(0, 3).map((price, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[11px]"
                                >
                                  {price}
                                </span>
                              ))}
                              {p.priceTexts.length > 3 && (
                                <span className="text-[10px] text-gray-400 self-center">
                                  +{p.priceTexts.length - 3} lagi
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          {p.ctas && p.ctas.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {p.ctas.slice(0, 2).map((cta, i) => (
                                <a
                                  key={i}
                                  href={cta.url}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[11px] truncate max-w-[150px] inline-flex items-center gap-0.5"
                                  title={cta.url}
                                >
                                  {cta.label}
                                </a>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                              p.statusCode >= 200 && p.statusCode < 300
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-red-50 text-red-700'
                            }`}
                          >
                            {p.statusCode}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>
                  Halaman {pageNumber} dari {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    className="px-3 py-1 border border-gray-200 rounded disabled:opacity-40"
                  >
                    Sebelumnya
                  </button>
                  <button
                    disabled={pageNumber >= totalPages}
                    onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
                    className="px-3 py-1 border border-gray-200 rounded disabled:opacity-40"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Changes & Diff */}
      {activeTab === 'changes' && (
        <div className="space-y-4">
          {diffLoading ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-2 bg-white rounded-xl border border-gray-200">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-xs">Menghitung perbandingan perubahan...</span>
            </div>
          ) : !diffData || !diffData.previousCrawlId ? (
            <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
              <TrendingUp className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="font-medium text-gray-800 text-sm">Ini adalah crawl pertama untuk kompetitor ini.</p>
              <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                Setelah crawl berikutnya selesai dijalankan, Anda dapat melihat highlight halaman baru, halaman yang dihapus, perubahan judul SEO, dan pembaruan harga layanan.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-[11px] font-semibold text-emerald-700 uppercase">Halaman Baru</span>
                  <div className="text-2xl font-bold text-emerald-900 mt-0.5">+{diffData.summary.added}</div>
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                  <span className="text-[11px] font-semibold text-rose-700 uppercase">Halaman Dihapus</span>
                  <div className="text-2xl font-bold text-rose-900 mt-0.5">-{diffData.summary.removed}</div>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <span className="text-[11px] font-semibold text-amber-700 uppercase">Halaman Berubah</span>
                  <div className="text-2xl font-bold text-amber-900 mt-0.5">~{diffData.summary.changed}</div>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <span className="text-[11px] font-semibold text-gray-500 uppercase">Tidak Berubah</span>
                  <div className="text-2xl font-bold text-gray-700 mt-0.5">{diffData.summary.unchanged}</div>
                </div>
              </div>

              {/* Changes Detail List */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
                {diffData.changes.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-xs">
                    Tidak ditemukan perubahan pada crawl ini dibanding crawl sebelumnya.
                  </div>
                ) : (
                  diffData.changes.map((item, idx) => (
                    <div key={idx} className="p-4 space-y-2 hover:bg-gray-50/50 transition">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="font-mono text-xs font-semibold text-gray-900 hover:text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {item.url} <ExternalLink className="w-3 h-3 text-gray-400" />
                        </a>
                        <div className="flex flex-wrap gap-1">
                          {item.changeTypes.map((type, tIdx) => {
                            const badgeColor =
                              type === 'ADDED_PAGE'
                                ? 'bg-emerald-100 text-emerald-800'
                                : type === 'REMOVED_PAGE'
                                ? 'bg-rose-100 text-rose-800'
                                : type === 'PRICE_CHANGED'
                                ? 'bg-blue-100 text-blue-800'
                                : type === 'CTA_CHANGED'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-amber-100 text-amber-800'
                            return (
                              <span key={tIdx} className={`px-2 py-0.5 rounded text-[10px] font-bold ${badgeColor}`}>
                                {type.replace('_', ' ')}
                              </span>
                            )
                          })}
                        </div>
                      </div>

                      {/* Detail diffs */}
                      {item.details.length > 0 && (
                        <div className="mt-2 text-xs space-y-1 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                          {item.details.map((detail, dIdx) => (
                            <div key={dIdx} className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                              <div>
                                <span className="font-semibold text-gray-500 uppercase text-[10px] block">
                                  Sebelum ({detail.field})
                                </span>
                                <span className="text-gray-700 bg-red-50/70 p-1 rounded border border-red-100 block break-words">
                                  {typeof detail.before === 'object' ? JSON.stringify(detail.before) : String(detail.before ?? '-')}
                                </span>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-500 uppercase text-[10px] block">
                                  Sesudah ({detail.field})
                                </span>
                                <span className="text-gray-900 bg-emerald-50/70 p-1 rounded border border-emerald-100 block break-words font-medium">
                                  {typeof detail.after === 'object' ? JSON.stringify(detail.after) : String(detail.after ?? '-')}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: History */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Run ID</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Halaman Ter-scrape</th>
                <th className="py-3 px-4 text-center">Halaman Gagal</th>
                <th className="py-3 px-4">Waktu Mulai</th>
                <th className="py-3 px-4">Waktu Selesai</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {competitor.crawls.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition">
                  <td className="py-3.5 px-4 font-mono text-gray-600">{c.id.slice(0, 10)}...</td>
                  <td className="py-3.5 px-4">{renderBadge(c.status)}</td>
                  <td className="py-3.5 px-4 text-center font-semibold text-gray-800">{c.pagesScraped}</td>
                  <td className="py-3.5 px-4 text-center text-gray-500">{c.pagesFailed}</td>
                  <td className="py-3.5 px-4 text-gray-500">{formatDate(c.startedAt || c.createdAt)}</td>
                  <td className="py-3.5 px-4 text-gray-500">{formatDate(c.finishedAt)}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedCrawlId(c.id)
                        setActiveTab('pages')
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-primary hover:bg-primary/10 rounded transition"
                    >
                      Buka Snapshot
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        isOpen={!!selectedPage}
        onClose={() => setSelectedPage(null)}
        title="Detail Snapshot Halaman"
      >
        {selectedPage && (
          <div className="space-y-5 text-sm">
            <a
              href={selectedPage.url}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-xs text-primary hover:underline break-all"
            >
              <Globe className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{selectedPage.url}</span>
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            </a>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Klasifikasi</div>
                <div className="mt-1">{renderClassificationBadge(selectedPage.classification)}</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">HTTP Status</div>
                <div className={`mt-1 font-mono font-bold ${selectedPage.statusCode >= 200 && selectedPage.statusCode < 300 ? 'text-emerald-700' : 'text-red-700'}`}>
                  {selectedPage.statusCode}
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Content Type</div>
                <div className="mt-1 break-all text-xs text-gray-700">{selectedPage.contentType || '-'}</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Waktu Scrape</div>
                <div className="mt-1 text-xs text-gray-700">{formatDate(selectedPage.scrapedAt)}</div>
              </div>
            </div>

            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Title</div>
              <div className="rounded-lg border border-gray-200 p-3 font-semibold text-gray-900">{selectedPage.title || '-'}</div>
            </div>

            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Meta Description</div>
              <div className="min-h-12 rounded-lg border border-gray-200 bg-amber-50/40 p-3 leading-relaxed text-gray-700">
                {selectedPage.metaDescription || <span className="italic text-gray-400">Meta description tidak tersedia.</span>}
              </div>
            </div>

            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">H1</div>
              <div className="rounded-lg border border-gray-200 p-3 text-gray-800">{selectedPage.h1 || '-'}</div>
            </div>

            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Keywords</div>
              <div className="rounded-lg border border-gray-200 p-3 text-gray-700">{selectedPage.keywords || '-'}</div>
            </div>

            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Canonical URL</div>
              {selectedPage.canonicalUrl ? (
                <a
                  href={selectedPage.canonicalUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block rounded-lg border border-gray-200 p-3 font-mono text-xs text-primary hover:underline break-all"
                >
                  {selectedPage.canonicalUrl}
                </a>
              ) : (
                <div className="rounded-lg border border-gray-200 p-3 text-gray-400">-</div>
              )}
            </div>

            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Headings</div>
              {selectedPage.headings?.length ? (
                <div className="space-y-1.5 rounded-lg border border-gray-200 p-3">
                  {selectedPage.headings.map((heading, index) => (
                    <div key={`${heading.level}-${index}`} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono font-bold text-gray-500">H{heading.level}</span>
                      <span className="pt-0.5">{heading.text}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 p-3 text-gray-400">-</div>
              )}
            </div>

            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Harga Terdeteksi</div>
              {selectedPage.priceTexts?.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {selectedPage.priceTexts.map((price, index) => (
                    <span key={index} className="rounded bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">{price}</span>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">-</div>
              )}
            </div>

            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">CTA / Kontak</div>
              {selectedPage.ctas?.length ? (
                <div className="space-y-1.5">
                  {selectedPage.ctas.map((cta, index) => (
                    <a
                      key={index}
                      href={cta.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 p-2.5 text-xs text-gray-700 hover:border-primary/30 hover:text-primary"
                    >
                      <span>{cta.label || 'Buka CTA'}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400">-</div>
              )}
            </div>
          </div>
        )}
      </Modal>

    </div>
  )
}
