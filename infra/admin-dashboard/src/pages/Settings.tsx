import { useState, useEffect } from 'react'
import { api } from '../lib/api'

// Global template wrapped around every article on the public site
// (apps/web/src/app/(site)/artikel/[slug]/page.tsx), stored as raw HTML in
// SystemSetting rows "article_header" / "article_footer". Per-article
// content (FAQ, title, body) is still edited in the article itself —
// this page only controls the shared wrapper shown on every article.
export default function Settings() {
  const [header, setHeader] = useState('')
  const [footer, setFooter] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [h, f] = await Promise.all([
          api.getSetting('article_header').catch(() => []),
          api.getSetting('article_footer').catch(() => []),
        ])
        if (Array.isArray(h) && h[0]) setHeader(h[0].value)
        if (Array.isArray(f) && f[0]) setFooter(f[0].value)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await Promise.all([
        api.saveSetting('article_header', header),
        api.saveSetting('article_footer', footer),
      ])
      setSaveMessage('Berhasil menyimpan pengaturan.')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (e: any) {
      alert('Gagal menyimpan: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="max-w-4xl mx-auto py-12 text-center text-gray-500">Memuat pengaturan...</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-[24px] pb-12">
      <div>
        <h1 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] font-sans text-gray-900">Pengaturan Website</h1>
        <p className="text-[14px] leading-[22px] font-sans text-gray-500 mt-1">Header &amp; footer di bawah ini muncul di SEMUA halaman artikel — sekali diubah di sini, langsung berlaku ke semua artikel.</p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-3">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-[16px]">Header Artikel (Global)</h3>
            <p className="text-[14px] text-gray-500 mt-1">HTML yang tampil di atas judul setiap artikel. Kosongkan untuk tidak menampilkan apa-apa.</p>
          </div>
          <textarea
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            rows={6}
            placeholder="<p>Contoh: pengumuman, banner promo, dsb.</p>"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] font-mono focus:outline-none focus:ring-2 focus:ring-[#990202]/10 focus:border-[#990202] transition-colors resize-y"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-3">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-[16px]">Footer Artikel (Global)</h3>
            <p className="text-[14px] text-gray-500 mt-1">HTML yang tampil di bawah setiap artikel, setelah semua konten.</p>
          </div>
          <textarea
            value={footer}
            onChange={(e) => setFooter(e.target.value)}
            rows={6}
            placeholder="<p>Contoh: disclaimer, ajakan konsultasi, dsb.</p>"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[14px] font-mono focus:outline-none focus:ring-2 focus:ring-[#990202]/10 focus:border-[#990202] transition-colors resize-y"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg text-white font-bold bg-[#990202] hover:bg-[#7a0101] shadow-sm transition-colors disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
          </button>
          {saveMessage && <span className="ml-4 text-emerald-600 text-sm font-semibold">{saveMessage}</span>}
        </div>
      </form>

      <p className="text-[13px] text-gray-400">
        FAQ per artikel (bukan global) diatur langsung di halaman edit artikel masing-masing.
      </p>
    </div>
  )
}
