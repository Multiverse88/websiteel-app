
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
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-[13px] font-bold bg-[var(--color-primary)] text-white hover:bg-[#B91C1C] transition-all min-h-[36px]"
      >
        <Send className="w-3.5 h-3.5" />
        Broadcast
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-[var(--color-surface)] rounded-[8px] border border-[var(--color-border)] shadow-large w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[8px] bg-[#FEF2F2] border border-[var(--color-tertiary)] flex items-center justify-center text-[var(--color-primary)]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-main)] text-[18px]">Atur Template Newsletter</h3>
                  <p className="text-[14px] text-[var(--color-text-muted)]">Sesuaikan subjek dan isi pesan sebelum dikirim</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] p-1.5 rounded-[8px] hover:bg-[#F8FAFC] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleBroadcast} className="p-6 flex flex-col gap-6">
              {/* Subject Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-[var(--color-text-main)]">Subjek Email</label>
                <input 
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Masukkan subjek email..."
                  required
                  className="w-full px-4 py-2.5 bg-white border border-[var(--color-border)] rounded-[8px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-primary)] transition-all shadow-subtle"
                />
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-[var(--color-text-main)]">Pesan Pengantar (Greeting)</label>
                <textarea 
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Tulis pesan greeting/pembuka kustom di sini..."
                  rows={4}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-[var(--color-border)] rounded-[8px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-primary)] transition-all shadow-subtle resize-none"
                />
              </div>

              {/* Email Live Preview (Desktop View Design) */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.08em]">Live Preview Tampilan Email</label>
                <div className="shadow-subtle border border-[var(--color-border)] rounded-[8px] overflow-hidden bg-[#F8FAFC]">
                  <div className="bg-white px-4 py-2.5 border-b border-[var(--color-border)] text-[14px] text-[var(--color-text-muted)] flex items-center gap-1.5">
                    <span className="font-semibold text-[var(--color-text-main)]">Subjek:</span> {subject || <span className="italic text-[var(--color-text-disabled)]">Kosong</span>}
                  </div>
                  <div className="p-5 text-[15px] text-[var(--color-text-main)] bg-white m-4 rounded-[8px] shadow-subtle border border-[var(--color-border)] max-h-[220px] overflow-y-auto">
                    <div className="mb-4 text-[var(--color-primary)] font-bold text-[18px] border-b border-[var(--color-border)] pb-2">EasyLegal</div>
                    <p className="whitespace-pre-wrap text-[var(--color-text-muted)] leading-relaxed mb-4 text-[15px]">
                      {customText || <span className="italic text-[var(--color-text-disabled)]">Tulis pesan untuk melihat preview...</span>}
                    </p>
                    <div className="bg-[#F8FAFC] rounded-[8px] p-4 border border-[var(--color-border)] flex flex-col gap-1.5">
                      <div className="text-[12px] uppercase font-bold tracking-[0.05em] text-[var(--color-primary)]">{`Kategori: ${articleTitle ? 'Legalitas' : ''}`}</div>
                      <div className="font-semibold text-[var(--color-text-main)] text-[16px]">{articleTitle}</div>
                      <div className="text-[14px] text-[var(--color-text-muted)] mt-1">✓ Klik di email untuk membaca selengkapnya</div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-[var(--color-border)] text-[13px] text-center text-[var(--color-text-disabled)]">
                      © {new Date().getFullYear()} EasyLegal. Semua hak dilindungi. <br />
                      <span className="underline cursor-not-allowed">Batal Berlangganan (Unsubscribe)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback messages */}
              {status === "success" && (
                <div className="p-4 bg-[#ECFDF5] text-[var(--color-success)] rounded-[8px] text-[14px] font-semibold flex items-center gap-2 border border-[#A7F3D0]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] shrink-0" />
                  {message}
                </div>
              )}
              {status === "error" && (
                <div className="p-4 bg-[#FEF2F2] text-[var(--color-error)] rounded-[8px] text-[14px] font-semibold flex items-center gap-2 border border-[#FECACA]">
                  <AlertCircle className="w-5 h-5 text-[var(--color-error)] shrink-0" />
                  {message}
                </div>
              )}

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-[var(--color-border)] pt-5 mt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={status === "loading" || status === "success"}
                  className="px-5 py-2.5 text-[14px] font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[#F8FAFC] rounded-[8px] transition-all min-h-[44px]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[8px] text-[14px] font-semibold bg-[var(--color-primary)] text-white hover:bg-[#B91C1C] transition-all disabled:opacity-50 min-h-[44px]"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
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
    <div className="flex items-center gap-1">
      <button
        onClick={handleToggle}
        disabled={loading}
        className="p-2 rounded-[8px] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[#F8FAFC] transition-colors"
        title={isActive ? "Nonaktifkan" : "Aktifkan"}
      >
        {isActive ? <ToggleRight className="w-5 h-5 text-[var(--color-success)]" /> : <ToggleLeft className="w-5 h-5 text-[var(--color-text-disabled)]" />}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="p-2 rounded-[8px] text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[#FEF2F2] transition-colors"
        title="Hapus"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
