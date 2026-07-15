
"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, Trash2, ToggleLeft, ToggleRight, X, Mail } from "lucide-react";
import { sendBroadcast, deleteSubscriber, toggleSubscriber } from "./actions";

export function BroadcastButton({ articleId, articleTitle }: { articleId: string; articleTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState(`Artikel Baru: ${articleTitle}`);
  const [customText, setCustomText] = useState(
    `Halo! Ada pembaruan legalitas baru yang sangat informatif untuk mendukung perkembangan bisnis Anda. Mari baca pembahasan lengkap artikel kami di bawah ini.`
  );

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await sendBroadcast(articleId, subject, customText);

    if (result.success) {
      setStatus("success");
      setMessage(result.message || "Broadcast berhasil dikirim!");
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
        setMessage("");
      }, 2000);
    } else {
      setStatus("error");
      setMessage(result.error || "Gagal mengirim broadcast.");
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[14px] font-bold bg-[#990202] text-white hover:bg-[#800000] border border-[#990202] transition-all shadow-sm"
      >
        <Send className="w-3 h-3" />
        Broadcast
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-xl shadow-2xl shadow-sm border border-black/[0.02] w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/70">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#990202]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Atur Template Newsletter</h3>
                  <p className="text-[14px] text-gray-500">Sesuaikan subjek dan isi pesan sebelum dikirim</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleBroadcast} className="p-6 flex flex-col gap-5">
              {/* Subject Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-gray-700">Subjek Email</label>
                <input 
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Masukkan subjek email..."
                  required
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#990202]/10 focus:border-[#990202] transition-colors"
                />
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-gray-700">Pesan Pengantar (Greeting)</label>
                <textarea 
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Tulis pesan greeting/pembuka kustom di sini..."
                  rows={4}
                  required
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#990202]/10 focus:border-[#990202] transition-colors resize-none"
                />
              </div>

              {/* Email Live Preview (Desktop View Design) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-gray-500 uppercase tracking-wider">Live Preview Tampilan Email</label>
                <div className="shadow-md border border-black/[0.04] rounded-lg overflow-hidden bg-gray-50">
                  <div className="bg-white px-4 py-2 border-b border-gray-200 text-[14px] text-gray-400 flex items-center gap-1.5">
                    <span className="font-semibold text-gray-600">Subjek:</span> {subject || <span className="italic text-gray-300">Kosong</span>}
                  </div>
                  <div className="p-5 font-sans text-sm text-gray-800 bg-white m-3 rounded shadow-sm shadow-md border border-black/[0.03] max-h-[180px] overflow-y-auto">
                    <div className="mb-4 text-[#990202] font-bold text-base border-b border-red-100 pb-2">Easy Legal</div>
                    <p className="whitespace-pre-wrap text-gray-600 leading-relaxed mb-4 text-[14px]">
                      {customText || <span className="italic text-gray-300">Tulis pesan untuk melihat preview...</span>}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-3 shadow-sm border border-black/[0.02] flex flex-col gap-1">
                      <div className="text-[14px] uppercase font-bold text-[#990202]">{`Kategori: ${articleTitle ? 'Legalitas' : ''}`}</div>
                      <div className="font-bold text-gray-900 text-[14px]">{articleTitle}</div>
                      <div className="text-[14px] text-gray-400 mt-1">✓ Klik di email untuk membaca selengkapnya</div>
                    </div>
                    <div className="mt-5 pt-3 border-t border-gray-100 text-[14px] text-center text-gray-400">
                      © {new Date().getFullYear()} Easy Legal. Semua hak dilindungi. <br />
                      <span className="underline cursor-not-allowed">Batal Berlangganan (Unsubscribe)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback messages */}
              {status === "success" && (
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-[14px] font-semibold flex items-center gap-2 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  {message}
                </div>
              )}
              {status === "error" && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-[14px] font-semibold flex items-center gap-2 border border-red-100">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  {message}
                </div>
              )}

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4 mt-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={status === "loading" || status === "success"}
                  className="px-4 py-2 text-[14px] font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[14px] font-bold bg-[#990202] text-white hover:bg-[#800000] border border-[#990202] transition-all disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Kirim Sekarang
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function SubscriberActions({ id, isActive }: { id: string; isActive: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    await toggleSubscriber(id);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("Hapus subscriber ini?")) return;
    setLoading(true);
    await deleteSubscriber(id);
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={handleToggle}
        disabled={loading}
        className="p-1.5 rounded-lg text-gray-400 hover:text-[#990202] hover:bg-red-50 transition-colors"
        title={isActive ? "Nonaktifkan" : "Aktifkan"}
      >
        {isActive ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4" />}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        title="Hapus"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
