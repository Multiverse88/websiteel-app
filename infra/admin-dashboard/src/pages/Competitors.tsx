import { useState, useEffect, useCallback, useRef } from 'react'
import { api } from '../lib/api'
import Modal from '../components/Modal'
import { Plus, Play, Eye, Trash2, Globe, CheckCircle2, AlertTriangle, XCircle, Clock, Loader2, RefreshCw } from 'lucide-react'

interface LatestCrawl {
  id: string
  status: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'PARTIAL' | 'FAILED' | 'CANCELLED'
  startedAt: string | null
  finishedAt: string | null
  pagesScraped: number
  pagesFailed: number
  errorMessage: string | null
  createdAt: string
}

interface Competitor {
  id: string
  name: string
  baseUrl: string
  hostname: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  crawlCount: number
  latestCrawl: LatestCrawl | null
}

export default function Competitors() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Add competitor modal
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [formName, setFormName] = useState('')
  const [formUrl, setFormUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)

  // Triggering crawls
  const [crawlingId, setCrawlingId] = useState<string | null>(null)

  const pollingRef = useRef<number | null>(null)

  const loadCompetitors = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    setError(null)
    try {
      const data = await api.getCompetitors()
      setCompetitors(data || [])
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal memuat kompetitor'
      setError(msg)
    } finally {
      if (!silent) setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCompetitors()
    return () => {
      if (pollingRef.current) window.clearInterval(pollingRef.current)
    }
  }, [loadCompetitors])

  // Polling if any competitor has a PENDING or RUNNING crawl
  useEffect(() => {
    const hasActiveCrawl = competitors.some(
      (c) => c.latestCrawl?.status === 'PENDING' || c.latestCrawl?.status === 'RUNNING'
    )

    if (hasActiveCrawl) {
      if (!pollingRef.current) {
        pollingRef.current = window.setInterval(() => {
          loadCompetitors(true)
        }, 4000)
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
  }, [competitors, loadCompetitors])

  const handleAddCompetitor = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddError(null)
    setSaving(true)
    try {
      await api.createCompetitor({
        name: formName,
        baseUrl: formUrl,
      })
      setFormName('')
      setFormUrl('')
      setIsAddOpen(false)
      loadCompetitors()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal menambahkan kompetitor'
      setAddError(msg)
    } finally {
      setSaving(false)
    }
  }

  const handleTriggerCrawl = async (id: string) => {
    setCrawlingId(id)
    try {
      await api.triggerCompetitorCrawl(id)
      await loadCompetitors(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal menjadwalkan crawl'
      alert(msg)
    } finally {
      setCrawlingId(null)
    }
  }

  const handleDelete = async (comp: Competitor) => {
    const confirmed = window.confirm(`Hapus kompetitor '${comp.name}' (${comp.hostname}) beserta seluruh histori crawl?`)
    if (!confirmed) return
    try {
      await api.deleteCompetitor(comp.id)
      loadCompetitors()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal menghapus kompetitor'
      alert(msg)
    }
  }

  const renderStatusBadge = (crawl: LatestCrawl | null) => {
    if (!crawl) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          Belum di-crawl
        </span>
      )
    }

    switch (crawl.status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
            Antrean worker...
          </span>
        )
      case 'RUNNING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
            Sedang crawling...
          </span>
        )
      case 'SUCCEEDED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Selesai ({crawl.pagesScraped} hal)
          </span>
        )
      case 'PARTIAL':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
            Sebagian ({crawl.pagesScraped} hal, {crawl.pagesFailed} gagal)
          </span>
        )
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200" title={crawl.errorMessage || ''}>
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Gagal
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            {crawl.status}
          </span>
        )
    }
  }

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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" />
            Monitoring Website Kompetitor
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Scraping halaman layanan, struktur SEO, dan harga kompetitor secara aman via worker Scrapy.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadCompetitors()}
            disabled={loading}
            className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            title="Muat ulang"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover font-medium text-sm transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Tambah Kompetitor
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200 flex items-center gap-2">
          <XCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading && competitors.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span>Memuat daftar kompetitor...</span>
          </div>
        ) : competitors.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-3">
            <Globe className="w-10 h-10 text-gray-300" />
            <p className="font-medium text-gray-700">Belum ada website kompetitor yang dipantau.</p>
            <p className="text-xs text-gray-400 max-w-md">
              Tambahkan URL website kompetitor legalitas untuk mulai mengumpulkan data halaman, struktur SEO, dan perbandingan harga.
            </p>
            <button
              onClick={() => setIsAddOpen(true)}
              className="mt-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-hover transition"
            >
              + Tambah Sekarang
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/75 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Nama & Domain</th>
                  <th className="py-3.5 px-4">Status Crawl Terakhir</th>
                  <th className="py-3.5 px-4">Waktu Terakhir</th>
                  <th className="py-3.5 px-4 text-center">Total Run</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {competitors.map((comp) => {
                  const isCrawling =
                    crawlingId === comp.id ||
                    comp.latestCrawl?.status === 'PENDING' ||
                    comp.latestCrawl?.status === 'RUNNING'

                  return (
                    <tr key={comp.id} className="hover:bg-gray-50/60 transition">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-900">
                          <a
                            href={`#/competitors/${comp.id}`}
                            className="hover:text-primary transition inline-flex items-center gap-1.5"
                          >
                            {comp.name}
                          </a>
                        </div>
                        <div className="text-xs text-gray-500 font-mono flex items-center gap-2 mt-0.5">
                          <a
                            href={comp.baseUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-gray-400 hover:text-gray-600 underline flex items-center gap-1"
                          >
                            {comp.hostname}
                          </a>
                        </div>
                      </td>
                      <td className="py-4 px-4">{renderStatusBadge(comp.latestCrawl)}</td>
                      <td className="py-4 px-4 text-xs text-gray-500">
                        {formatDate(comp.latestCrawl?.finishedAt || comp.latestCrawl?.createdAt)}
                      </td>
                      <td className="py-4 px-4 text-xs text-center font-medium text-gray-600">
                        {comp.crawlCount}x
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleTriggerCrawl(comp.id)}
                            disabled={isCrawling}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                              isCrawling
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-primary/10 text-primary hover:bg-primary/20'
                            }`}
                            title="Jalankan crawl Scrapy manual"
                          >
                            {isCrawling ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                Crawling...
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5 fill-current" />
                                Crawl
                              </>
                            )}
                          </button>
                          <a
                            href={`#/competitors/${comp.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                            title="Lihat halaman dan perubahan"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Detail
                          </a>
                          <button
                            onClick={() => handleDelete(comp)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Hapus kompetitor"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Tambah Website Kompetitor">
        <form onSubmit={handleAddCompetitor} className="space-y-4">
          {addError && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs border border-red-200">
              {addError}
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Kompetitor</label>
            <input
              type="text"
              required
              placeholder="Contoh: LegalIn / Sahabat Legal"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">URL Website</label>
            <input
              type="text"
              required
              placeholder="https://kompetitor.com"
              value={formUrl}
              onChange={(e) => setFormUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Gunakan URL utama kompetitor. Worker hanya akan meng-crawl domain ini (maksimal 500 halaman, kedalaman 5 level).
            </p>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {saving ? 'Menyimpan...' : 'Simpan & Daftarkan'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
