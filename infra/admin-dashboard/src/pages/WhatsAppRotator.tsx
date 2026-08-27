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

// Manage the in-house WhatsApp CTA rotator (apps/api/src/routes/whatsapp.ts,
// getWhatsAppLink() in apps/web) — replaces mauorder.online. Every WA CTA
// click site-wide always goes to whichever active number has the fewest
// clicks so far, so this page is mainly a fairness dashboard: click count +
// share % per number, at a glance.
export default function WhatsAppRotator() {
  const [numbers, setNumbers] = useState<WaNumber[]>([])
  const [totalClicks, setTotalClicks] = useState(0)
  const [loading, setLoading] = useState(true)
  const [newNumber, setNewNumber] = useState('')
  const [newLabel, setNewLabel] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

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

  useEffect(() => { load() }, [load])

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

  const activeCount = numbers.filter(n => n.isActive).length
  const fairSharePercent = activeCount > 0 ? Math.round((100 / activeCount) * 10) / 10 : 0

  if (loading) {
    return <div className="max-w-5xl mx-auto py-12 text-center text-gray-500">Memuat data rotator...</div>
  }

  return (
    <div className="max-w-5xl mx-auto space-y-[24px] pb-12">
      <div>
        <h1 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] font-sans text-gray-900">Rotator WhatsApp</h1>
        <p className="text-[14px] leading-[22px] font-sans text-gray-500 mt-1">
          Setiap tombol WA di website (semua domain) selalu diarahkan ke nomor aktif dengan klik paling sedikit — otomatis merata, tidak perlu urutan manual.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-[13px] font-semibold border border-red-100">{error}</div>
      )}

      {/* Add number */}
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

      {/* Fairness table */}
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
                  <td className="px-6 py-3.5 text-right">
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
    </div>
  )
}
