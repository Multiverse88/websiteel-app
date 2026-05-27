"use client";

import React, { useState } from "react";
import { Save, Loader2, CheckCircle2, AlertCircle, HelpCircle, ArrowLeft, RefreshCw, Send } from "lucide-react";
import { updateNewsletterSettings, testSmtpConnection, type NewsletterSettings } from "./actions";
import Link from "next/link";

export function SmtpTestCard() {
  const [testEmail, setTestEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const result = await testSmtpConnection(testEmail);

    if (result.success) {
      setStatus("success");
      setFeedback(result.message || "Email test berhasil dikirim!");
    } else {
      setStatus("error");
      setFeedback(result.error || "Gagal mengirim email test.");
    }

    setTimeout(() => setStatus("idle"), 8000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm flex flex-col gap-4">
      <div className="flex flex-col gap-1 border-b border-gray-100 pb-3">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
          <Send className="w-4 h-4 text-[#990202]" />
          Test Koneksi SMTP
        </h3>
        <p className="text-xs text-gray-500">
          Kirim email test untuk memverifikasi bahwa pengaturan SMTP berfungsi dengan benar.
        </p>
      </div>

      <form onSubmit={handleTest} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">Email Penerima</label>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="contoh: nama@gmail.com"
            required
            className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#990202]/10 focus:border-[#990202] transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold bg-white text-gray-700 hover:text-gray-900 border border-gray-200/80 hover:bg-gray-50 shadow-sm transition-all disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              Kirim Email Test
            </>
          )}
        </button>
      </form>

      {status === "success" && (
        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold flex items-center gap-2 border border-emerald-100">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          {feedback}
        </div>
      )}
      {status === "error" && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2 border border-red-100">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          {feedback}
        </div>
      )}
    </div>
  );
}

export function SettingsForm({ initialSettings }: { initialSettings: NewsletterSettings }) {
  const [autoBroadcast, setAutoBroadcast] = useState(initialSettings.autoBroadcast);
  const [defaultSubject, setDefaultSubject] = useState(initialSettings.defaultSubject);
  const [defaultMessage, setDefaultMessage] = useState(initialSettings.defaultMessage);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  // Contoh judul artikel untuk live preview
  const sampleArticleTitle = "Mengenal Perbedaan PT Biasa dan PT Perorangan";
  const sampleArticleCategory = "Legalitas Korporasi";

  // Fungsi untuk menggantikan placeholder {{title}} dll
  const getSubjectPreview = () => {
    return defaultSubject.replace("{{title}}", sampleArticleTitle);
  };

  const getMessagePreview = () => {
    return defaultMessage
      .replace("{{title}}", sampleArticleTitle)
      .replace("{{category}}", sampleArticleCategory);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    const result = await updateNewsletterSettings({
      autoBroadcast,
      defaultSubject,
      defaultMessage,
    });

    if (result.success) {
      setStatus("success");
      setFeedback(result.message || "Berhasil menyimpan pengaturan.");
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } else {
      setStatus("error");
      setFeedback(result.error || "Gagal menyimpan pengaturan.");
    }
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6">
      {/* Kartu Status Otomatisasi */}
      <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-gray-900 text-sm">Status Otomatisasi</h3>
            <p className="text-xs text-gray-500">
              Kirim email otomatis ke semua subscriber aktif setiap kali artikel baru dipublikasikan
            </p>
          </div>
          {/* Custom Toggle Switch */}
          <button
            type="button"
            onClick={() => setAutoBroadcast(!autoBroadcast)}
            className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
              autoBroadcast ? "bg-[#990202]" : "bg-gray-250"
            }`}
          >
            <div
              className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform duration-300 ${
                autoBroadcast ? "translate-x-5.5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Info Box */}
        <div className={`p-4 rounded-lg text-xs flex gap-3 border ${
          autoBroadcast 
            ? "bg-emerald-50/50 text-emerald-800 border-emerald-100" 
            : "bg-amber-50/50 text-amber-800 border-amber-100"
        }`}>
          {autoBroadcast ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Otomatisasi Aktif:</span> Setiap artikel baru yang Anda simpan di menu <b>&quot;Tulis Baru&quot;</b> akan langsung memicu pengiriman newsletter ke kotak masuk seluruh subscriber aktif secara otomatis.
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Otomatisasi Mati:</span> Artikel baru yang dipublikasikan tidak akan mengirimkan email apa pun secara otomatis. Anda harus mengirimkannya secara manual via tombol &quot;Broadcast&quot; di dashboard utama newsletter.
              </div>
            </>
          )}
        </div>
      </div>

      {/* Kartu Desain Template default */}
      <div className={`bg-white rounded-xl border border-gray-150 p-6 shadow-sm flex flex-col gap-5 transition-opacity duration-300 ${
        autoBroadcast ? "opacity-100" : "opacity-60 pointer-events-none"
      }`}>
        <div className="flex flex-col gap-1 border-b border-gray-100 pb-3">
          <h3 className="font-bold text-gray-900 text-sm">Template Auto-Broadcast</h3>
          <p className="text-xs text-gray-500">
            Sesuaikan subjek dan pesan pembuka yang digunakan oleh sistem ketika mengirim broadcast otomatis
          </p>
        </div>

        {/* Input Subject */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-700">Subjek Default</label>
            <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
              <HelpCircle className="w-3 h-3" /> Gunakan <code>{"{{title}}"}</code> untuk menyisipkan judul artikel
            </span>
          </div>
          <input
            type="text"
            value={defaultSubject}
            onChange={(e) => setDefaultSubject(e.target.value)}
            disabled={!autoBroadcast}
            placeholder="Masukkan subjek default email..."
            required={autoBroadcast}
            className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#990202]/10 focus:border-[#990202] transition-colors"
          />
        </div>

        {/* Input Message */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-700">Pesan Pengantar Default (Greeting)</label>
            <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
              <HelpCircle className="w-3 h-3" /> Gunakan <code>{"{{category}}"}</code> untuk menyisipkan kategori
            </span>
          </div>
          <textarea
            value={defaultMessage}
            onChange={(e) => setDefaultMessage(e.target.value)}
            disabled={!autoBroadcast}
            placeholder="Masukkan isi greeting/pembuka email..."
            rows={5}
            required={autoBroadcast}
            className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#990202]/10 focus:border-[#990202] transition-colors resize-none"
          />
        </div>

        {/* Preview Live */}
        <div className="flex flex-col gap-1.5">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5" /> Preview Hasil Auto-Broadcast
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 text-xs">
            <div className="bg-white px-4 py-2 border-b border-gray-200 text-gray-400">
              <span className="font-semibold text-gray-600">Subjek:</span> {getSubjectPreview()}
            </div>
            <div className="p-4 bg-white m-3 rounded border border-gray-150 max-h-[160px] overflow-y-auto">
              <div className="mb-3 text-[#990202] font-bold text-sm pb-1.5 border-b border-red-50">Easy Legal</div>
              <p className="whitespace-pre-wrap text-gray-600 leading-relaxed mb-4 text-[11px]">
                {getMessagePreview()}
              </p>
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100 flex flex-col gap-0.5">
                <div className="text-[9px] uppercase font-bold text-[#990202]">{sampleArticleCategory}</div>
                <div className="font-bold text-gray-900 text-xs">{sampleArticleTitle}</div>
                <div className="text-[10px] text-gray-400 mt-1">✓ Klik di email untuk membaca selengkapnya</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tampilan Status Simpan */}
      {status === "success" && (
        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold flex items-center gap-2 border border-emerald-100">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          {feedback}
        </div>
      )}
      {status === "error" && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2 border border-red-100">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          {feedback}
        </div>
      )}

      {/* Button Simpan */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-1">
        <Link
          href="/dashboard/newsletter"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Newsletter
        </Link>

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#990202] text-white hover:bg-[#800000] border border-[#990202] transition-all disabled:opacity-50 shadow-sm"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              Simpan Pengaturan
            </>
          )}
        </button>
      </div>
    </form>
  );
}
