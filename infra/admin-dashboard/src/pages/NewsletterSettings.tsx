import React, { useState, useEffect } from 'react'
import { api } from '../lib/api'

export default function NewsletterSettings() {
  const [autoBroadcast, setAutoBroadcast] = useState(false)
  const [defaultSubject, setDefaultSubject] = useState("[Newsletter Terbaru] {{title}}")
  const [defaultMessage, setDefaultMessage] = useState("Halo, ada artikel terbaru untuk Anda: {{title}} di kategori {{category}}.\n\n{{coverImage}}\n\nSilakan baca selengkapnya di website kami.")
  
  const [testEmail, setTestEmail] = useState("")
  const [testStatus, setTestStatus] = useState<"idle"|"loading"|"success"|"error">("idle")
  const [testFeedback, setTestFeedback] = useState("")

  const [savingSettings, setSavingSettings] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const [activeSubscribers, setActiveSubscribers] = useState(0)
  const [totalBroadcasts, setTotalBroadcasts] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [subsData, broadsData] = await Promise.all([
          api.getNewsletter().catch(() => []),
          api.getNewsletterBroadcasts().catch(() => [])
        ])
        
        const subs = Array.isArray(subsData) ? subsData : []
        setActiveSubscribers(subs.filter(s => s.isActive !== false).length)
        
        const broads = Array.isArray(broadsData) ? broadsData : []
        setTotalBroadcasts(broads.length)

        // Mock load settings
        const t = await api.getEmailTemplate('newsletter').catch(() => null)
        if (t && t.length > 0) {
          try {
            const parsed = JSON.parse(t[0].value)
            if (parsed.subject) setDefaultSubject(parsed.subject)
            if (parsed.message) setDefaultMessage(parsed.message)
            if (parsed.autoBroadcast !== undefined) setAutoBroadcast(parsed.autoBroadcast)
          } catch(e){}
        }
      } catch (e) {
        console.error(e)
      }
    }
    loadData()
  }, [])

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingSettings(true)
    try {
      await api.saveEmailTemplate('newsletter', JSON.stringify({
        autoBroadcast,
        subject: defaultSubject,
        message: defaultMessage
      }))
      setSaveMessage("Berhasil menyimpan pengaturan.")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (e: any) {
      alert("Gagal menyimpan: " + e.message)
    } finally {
      setSavingSettings(false)
    }
  }

  const handleTestSmtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setTestStatus("loading")
    try {
      const finalSubject = defaultSubject.replace(/{{title}}/g, sampleArticleTitle)
      const messageHtml = renderMessagePreview()
      const bodyHtml = `<div style="font-family: sans-serif; line-height: 1.6; color: #374151;">${messageHtml}</div><br/><a href="https://easylegal.my.id" style="display: inline-block; padding: 10px 20px; background-color: #990202; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Baca Selengkapnya</a>`
      
      await api.testSendEmail({
        subject: finalSubject,
        bodyHtml: bodyHtml,
        to: testEmail
      })
      setTestStatus("success")
      setTestFeedback("Email test berhasil dikirim!")
    } catch(e: any) {
      setTestStatus("error")
      setTestFeedback("Gagal mengirim email: " + e.message)
    }
    setTimeout(() => {
      setTestStatus("idle")
      setTestFeedback("")
    }, 5000)
  }

  const sampleArticleTitle = "Mengenal Perbedaan PT Biasa dan PT Perorangan"
  const sampleArticleCategory = "Legalitas Korporasi"
  const sampleArticleCover = "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"

  const renderMessagePreview = () => {
    let text = defaultMessage
      .replace(/{{title}}/g, `<strong>${sampleArticleTitle}</strong>`)
      .replace(/{{category}}/g, `<em>${sampleArticleCategory}</em>`)
    
    if (text.includes("{{coverImage}}")) {
      text = text.replace(/{{coverImage}}/g, `<div style="margin: 12px 0;"><img src="${sampleArticleCover}" alt="Cover" style="max-width: 100%; border-radius: 8px; border: 1px solid #eee;" /></div>`)
    }
    return text.replace(/\n/g, '<br/>')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-[24px] pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] font-sans text-gray-900">Pengaturan Otomatisasi</h1>
          <p className="text-[14px] leading-[22px] font-sans text-gray-500 mt-1">Atur alur pengiriman email otomatis newsletter</p>
        </div>
        <a href="#/newsletter" className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition">
          Kembali
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <form onSubmit={handleSaveSettings} className="flex flex-col gap-6">
            
            {/* Status Otomatisasi */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-[16px]">Status Otomatisasi</h3>
                  <p className="text-[14px] text-gray-500 mt-1">
                    Kirim email otomatis ke semua subscriber aktif setiap kali artikel baru dipublikasikan
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoBroadcast(!autoBroadcast)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                    autoBroadcast ? "bg-[#990202]" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      autoBroadcast ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className={`p-4 rounded-lg text-[14px] flex gap-3 border ${
                autoBroadcast 
                  ? "bg-emerald-50 text-emerald-800 border-emerald-100" 
                  : "bg-amber-50 text-amber-800 border-amber-100"
              }`}>
                {autoBroadcast ? (
                  <div>
                    <span className="font-bold block mb-1">Otomatisasi Aktif:</span> Setiap artikel baru yang Anda simpan akan langsung memicu pengiriman newsletter ke seluruh subscriber aktif secara otomatis.
                  </div>
                ) : (
                  <div>
                    <span className="font-bold block mb-1">Otomatisasi Mati:</span> Artikel baru tidak akan mengirimkan email secara otomatis. Anda harus mengirimkannya manual via tombol "Broadcast".
                  </div>
                )}
              </div>
            </div>

            {/* Template */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-5 transition-opacity duration-300 ${
              autoBroadcast ? "opacity-100" : "opacity-60 pointer-events-none"
            }`}>
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-bold text-gray-900 text-[16px]">Template Auto-Broadcast</h3>
                <p className="text-[14px] text-gray-500 mt-1">
                  Sesuaikan subjek dan pesan pembuka yang digunakan sistem
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-gray-700">Subjek Default</label>
                <input
                  type="text"
                  value={defaultSubject}
                  onChange={(e) => setDefaultSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#990202]/10 focus:border-[#990202] transition-colors"
                />
                <div className="text-[12px] text-gray-500 mt-1 bg-gray-50 p-2 rounded border border-gray-100">
                  <span className="font-semibold block mb-1">Preview Subjek:</span>
                  {defaultSubject.replace("{{title}}", sampleArticleTitle)}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-gray-700">Pesan Pengantar Default</label>
                <textarea
                  value={defaultMessage}
                  onChange={(e) => setDefaultMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#990202]/10 focus:border-[#990202] transition-colors resize-none"
                />
                <div 
                  className="text-[12px] text-gray-500 mt-2 bg-gray-50 p-3 rounded-lg border border-gray-100"
                  dangerouslySetInnerHTML={{ __html: `<span style="font-weight: 600; display: block; margin-bottom: 8px; color: #374151;">Preview Pesan:</span>${renderMessagePreview()}` }}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-6 py-2.5 rounded-lg text-white font-bold bg-[#990202] hover:bg-[#7a0101] shadow-sm transition-colors disabled:opacity-50"
                >
                  {savingSettings ? "Menyimpan..." : "Simpan Pengaturan"}
                </button>
                {saveMessage && <span className="ml-4 text-emerald-600 text-sm font-semibold">{saveMessage}</span>}
              </div>
            </div>

          </form>
        </div>

        {/* Right Column - SMTP & Info */}
        <div className="flex flex-col gap-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-[16px] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#990202]">send</span>
                Test Koneksi SMTP
              </h3>
              <p className="text-[14px] text-gray-500 mt-1">
                Kirim email test untuk memverifikasi pengaturan.
              </p>
            </div>

            <form onSubmit={handleTestSmtp} className="flex flex-col gap-3">
              <label className="text-[14px] font-bold text-gray-700">Email Penerima</label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="contoh: nama@gmail.com"
                required
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#990202]"
              />
              <button
                type="submit"
                disabled={testStatus === "loading" || testStatus === "success"}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-[14px] font-bold bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {testStatus === "loading" ? "Mengirim..." : "Kirim Email Test"}
              </button>
            </form>

            {testStatus === "success" && (
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-[13px] font-semibold flex items-center gap-2 border border-emerald-100">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                {testFeedback}
              </div>
            )}
            {testStatus === "error" && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-[13px] font-semibold flex items-center gap-2 border border-red-100">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {testFeedback}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
            <h3 className="font-bold text-gray-900 text-[16px] border-b border-gray-100 pb-2">Ringkasan Newsletter</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-gray-500 font-medium">Subscriber Aktif</span>
                <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-full">{activeSubscribers} orang</span>
              </div>
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-gray-500 font-medium">Total Broadcast Sent</span>
                <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-full">{totalBroadcasts} kali</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-3 text-[14px] leading-relaxed text-gray-600">
            <h3 className="font-bold text-gray-900 text-[16px] border-b border-gray-100 pb-2">💡 Panduan Placeholder</h3>
            <p>Gunakan tag berikut untuk menyisipkan info artikel secara dinamis:</p>
            <ul className="list-disc pl-4 space-y-1 text-gray-500 mt-2">
              <li><code className="text-[#990202] font-semibold">{"{{title}}"}</code>: Judul artikel</li>
              <li><code className="text-[#990202] font-semibold">{"{{category}}"}</code>: Kategori artikel</li>
              <li><code className="text-[#990202] font-semibold">{"{{coverImage}}"}</code>: Menampilkan foto/gambar utama (headline) dari artikel</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}
