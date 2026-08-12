import React, { useState, useEffect } from 'react'
import { api } from '../lib/api'

export default function Newsletter() {
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [broadcasts, setBroadcasts] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [emailLogs, setEmailLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sendingId, setSendingId] = useState<string | null>(null)
  const [templateSettings, setTemplateSettings] = useState<any>(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const [subsData, broadsData, artsData, logsData, templateData] = await Promise.all([
        api.getNewsletter().catch(() => []),
        api.getNewsletterBroadcasts().catch(() => []),
        api.getArticles().catch(() => []),
        api.getEmailLogs().catch(() => []),
        api.getEmailTemplate('newsletter').catch(() => null)
      ])
      
      setSubscribers(Array.isArray(subsData) ? subsData : [])
      setBroadcasts(Array.isArray(broadsData) ? broadsData : [])
      setArticles(Array.isArray(artsData) ? artsData.slice(0, 5) : [])
      setEmailLogs(Array.isArray(logsData) ? logsData : [])
      
      if (templateData && templateData.length > 0) {
        try {
          setTemplateSettings(JSON.parse(templateData[0].value))
        } catch(e){}
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const activeCount = subscribers.filter(s => s.isActive !== false).length
  const inactiveCount = subscribers.length - activeCount

  const handleBroadcast = async (article: any) => {
    if (!confirm(`Kirim broadcast untuk artikel "${article.title}" ke ${activeCount} subscriber aktif?`)) return
    
    setSendingId(article.id)
    try {
      // Build from template
      const defaultSubject = templateSettings?.subject || "[Newsletter Terbaru] {{title}}"
      const defaultMessage = templateSettings?.message || "Halo, ada artikel terbaru untuk Anda: {{title}} di kategori {{category}}.\n\n{{coverImage}}\n\nSilakan baca selengkapnya di website kami."
      
      let finalSubject = defaultSubject.replace(/{{title}}/g, article.title)
      let finalMessage = defaultMessage
        .replace(/{{title}}/g, `<strong>${article.title}</strong>`)
        .replace(/{{category}}/g, `<em>${article.category || 'Artikel'}</em>`)
      
      if (finalMessage.includes("{{coverImage}}")) {
        const imgTag = article.coverImage 
          ? `<div style="margin: 12px 0;"><img src="${article.coverImage}" alt="Cover" style="max-width: 100%; border-radius: 8px; border: 1px solid #eee;" /></div>`
          : ""
        finalMessage = finalMessage.replace(/{{coverImage}}/g, imgTag)
      }
      
      const bodyHtml = `<div style="font-family: sans-serif; line-height: 1.6; color: #374151;">${finalMessage.replace(/\\n/g, '<br/>')}</div><br/><a href="https://easylegal.my.id/artikel/${article.slug || ''}" style="display: inline-block; padding: 10px 20px; background-color: #990202; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Baca Selengkapnya</a>`

      // Create broadcast record
      await api.sendNewsletterBroadcast({
        subject: finalSubject,
        bodyHtml,
        articleId: article.id
      })
      alert('Broadcast berhasil dikirim!')
      loadData()
    } catch (e: any) {
      alert(e.message || 'Gagal mengirim broadcast')
    } finally {
      setSendingId(null)
    }
  }

  const broadcastArticleIds = new Set(broadcasts.map(b => b.articleId))
  const broadcastCountMap = new Map<string, number>()
  for (const b of broadcasts) {
    if (b.articleId) {
      broadcastCountMap.set(b.articleId, (broadcastCountMap.get(b.articleId) || 0) + 1)
    }
  }

  return (
    <div className="max-w-[1240px] mx-auto space-y-[24px] pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] font-sans text-gray-900">Newsletter</h1>
          <p className="text-[14px] leading-[22px] font-sans text-gray-500 mt-1">Kelola subscriber dan kirim broadcast artikel terbaru.</p>
        </div>
        <a href="#/newsletter/settings" className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">settings</span> Atur Otomatisasi
        </a>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 text-green-600">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 leading-none">{activeCount.toLocaleString('id-ID')}</div>
            <div className="text-[13px] text-gray-500 mt-1 font-medium">Subscriber Aktif</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 text-[#990202]">
            <span className="material-symbols-outlined">mail</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 leading-none">{subscribers.length.toLocaleString('id-ID')}</div>
            <div className="text-[13px] text-gray-500 mt-1 font-medium">Total Subscriber</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-600">
            <span className="material-symbols-outlined">send</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 leading-none">{broadcasts.length.toLocaleString('id-ID')}</div>
            <div className="text-[13px] text-gray-500 mt-1 font-medium">Broadcast Terkirim</div>
          </div>
        </div>
      </div>

      {/* Subscriber List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-semibold text-gray-900">Daftar Subscriber</h2>
          <span className="text-[12px] text-gray-500">{activeCount} aktif &middot; {inactiveCount} nonaktif</span>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {loading ? (
             <div className="p-8 text-center text-sm text-gray-500">Memuat...</div>
          ) : subscribers.length === 0 ? (
             <div className="p-12 text-center">
               <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">mail</span>
               <h3 className="text-sm font-semibold text-gray-900">Belum ada subscriber</h3>
               <p className="text-xs text-gray-500">Subscriber akan muncul di sini ketika pengunjung mendaftar newsletter.</p>
             </div>
          ) : (
             <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto">
               {subscribers.map((sub: any) => (
                 <div key={sub.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[12px] font-bold text-gray-700 flex-shrink-0">
                     {sub.email.charAt(0).toUpperCase()}
                   </div>
                   <div className="flex-1 min-w-0">
                     <span className="text-[13px] font-medium text-gray-900 truncate block">{sub.email}</span>
                     <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                       <span className="material-symbols-outlined text-[12px]">calendar_today</span>
                       <span>{new Date(sub.subscribedAt || Date.now()).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                     </div>
                   </div>
                   <span className={`px-2 py-0.5 text-[11px] font-medium rounded-md border ${sub.isActive !== false ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                     {sub.isActive !== false ? "Aktif" : "Nonaktif"}
                   </span>
                   <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#990202] rounded-lg hover:bg-red-50 transition-colors">
                     <span className="material-symbols-outlined text-[16px]">close</span>
                   </button>
                 </div>
               ))}
             </div>
          )}
        </div>
      </div>

      {/* Broadcast & History Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kirim Broadcast */}
        <div>
          <h2 className="text-[15px] font-semibold text-gray-900 mb-3">Kirim Broadcast</h2>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <p className="text-[13px] text-gray-500 mb-3">
              Kirim ke <strong className="text-gray-900">{activeCount} subscriber</strong> aktif:
            </p>
            
            {articles.length === 0 ? (
              <p className="text-[13px] text-gray-500 italic">Belum ada artikel.</p>
            ) : (
              <div className="space-y-2">
                {articles.map((article: any) => {
                  const alreadySent = broadcastArticleIds.has(article.id)
                  const count = broadcastCountMap.get(article.id) || 0
                  const isSending = sendingId === article.id

                  return (
                    <div key={article.id} className="flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-medium rounded">{article.category || 'Artikel'}</span>
                          {alreadySent && (
                            <span className="px-1.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-medium rounded flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[10px]">check_circle</span> {count}x
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] font-medium text-gray-900 line-clamp-1">{article.title}</p>
                      </div>
                      <button 
                        onClick={() => handleBroadcast(article)}
                        disabled={isSending || activeCount === 0}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 flex items-center gap-1 shadow-sm transition"
                      >
                        {isSending ? (
                          <span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span>
                        ) : (
                          <span className="material-symbols-outlined text-[14px]">send</span>
                        )}
                        Broadcast
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Riwayat Broadcast */}
        <div>
          <h2 className="text-[15px] font-semibold text-gray-900 mb-3">Riwayat Broadcast</h2>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-[320px] flex flex-col">
            {broadcasts.length === 0 ? (
              <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-gray-300 mb-2">history</span>
                <p className="text-[13px] text-gray-500">Belum ada broadcast yang dikirim.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
                {broadcasts.map((b: any) => (
                  <div key={b.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[16px] text-[#990202]">send</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-gray-900 line-clamp-1">{b.articleTitle || 'Untitled'}</p>
                      <div className="flex items-center gap-3 text-[11px] text-gray-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">group</span>
                          {b.totalSent || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">schedule</span>
                          {new Date(b.sentAt || Date.now()).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Log Pengiriman */}
      <div>
        <h2 className="text-[15px] font-semibold text-gray-900 mb-3">Log Pengiriman</h2>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {emailLogs.length === 0 ? (
             <div className="p-8 text-center">
               <span className="material-symbols-outlined text-3xl text-gray-300 mb-2">receipt_long</span>
               <p className="text-[13px] text-gray-500">Belum ada log pengiriman email.</p>
             </div>
          ) : (
            <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto">
              {emailLogs.map((log: any) => (
                <div key={log.id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
                  <span className="text-[13px] font-medium text-gray-900 truncate flex-1">{log.recipient || 'Unknown'}</span>
                  <span className="px-2 py-0.5 text-[11px] font-medium bg-gray-100 border border-gray-200 text-gray-600 rounded-md">
                    {log.source === "broadcast" ? "Manual" : log.source === 'automation' ? "Otomatis" : "Manual"}
                  </span>
                  <span className={`px-2 py-0.5 text-[11px] font-medium rounded-md border ${
                    log.status === "sent" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    log.status === "simulated" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-700 border-red-200"
                  }`}>
                    {log.status === "sent" ? "Terkirim" : log.status === "simulated" ? "Simulasi" : log.status || "Error"}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-500 whitespace-nowrap">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    {new Date(log.sentAt || Date.now()).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
