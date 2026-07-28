"use client";

import React, { useState } from "react";
import { Send, Settings, Loader2 } from "lucide-react";
import RichTextEditor from "@/components/dashboard/RichTextEditor";
import { createCampaignAction } from "../actions";
import { useFormStatus } from "react-dom";

import { useRouter } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[16px] font-bold bg-[#d62828] text-white hover:bg-[#b20112] shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Memproses...
        </>
      ) : (
        <>
          <Send className="w-5 h-5" />
          Kirim / Simpan Campaign
        </>
      )}
    </button>
  );
}

export default function EmailBlastForm() {
  const [bodyHtml, setBodyHtml] = useState("");
  const [showSmtp, setShowSmtp] = useState(false);
  const router = useRouter();

  return (
    <form 
      action={async (formData) => {
        formData.set("bodyHtml", bodyHtml);
        const result = await createCampaignAction(formData);
        if (result?.error) {
          alert(`Gagal: ${result.error}`);
        } else if (result?.success) {
          alert("Berhasil! Campaign email telah diproses/dikirim.");
          router.push("/dashboard/email-blast");
        }
      }} 
      className="space-y-6"
    >
      
      {/* Subject */}
      <div>
        <label className="block text-[14px] font-bold text-gray-900 mb-2">
          Subjek Email
        </label>
        <input
          type="text"
          name="subject"
          required
          placeholder="Contoh: Promo Spesial Pendaftaran Merek Bulan Ini!"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[16px] focus:outline-none focus:border-[#d62828] focus:ring-1 focus:ring-[#d62828] transition-colors"
        />
      </div>

      {/* Body */}
      <div>
        <label className="block text-[14px] font-bold text-gray-900 mb-2">
          Isi Email
        </label>
        <RichTextEditor 
          content={bodyHtml} 
          onChange={setBodyHtml} 
          onImageUpload={async (file) => {
            const formData = new FormData();
            formData.append("image", file);
            const { uploadInlineImageAction } = await import("../actions");
            const result = await uploadInlineImageAction(formData);
            if (result.error) {
              alert(result.error);
              return null;
            }
            return result.url || null;
          }}
        />
        <p className="text-[14px] text-gray-500 mt-2">
          Gunakan editor di atas untuk mengatur format tulisan dan menyisipkan gambar (bisa via Drag & Drop atau klik tombol gambar).
        </p>
      </div>

      {/* Schedule */}
      <div>
        <label className="block text-[14px] font-bold text-gray-900 mb-2">
          Jadwal Pengiriman (Opsional)
        </label>
        <input
          type="datetime-local"
          name="scheduledAt"
          className="w-full sm:w-[300px] px-4 py-3 border border-gray-200 rounded-xl text-[16px] focus:outline-none focus:border-[#d62828] focus:ring-1 focus:ring-[#d62828] transition-colors"
        />
        <p className="text-[14px] text-gray-500 mt-2">
          Kosongkan jika ingin segera dikirim (Pastikan SMTP sudah diset).
        </p>
      </div>

      {/* Recipient Choice */}
      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
        <input
          type="checkbox"
          id="sendToAll"
          name="sendToAll"
          defaultChecked
          className="w-5 h-5 rounded text-[#d62828] focus:ring-[#d62828] cursor-pointer"
        />
        <label htmlFor="sendToAll" className="text-[16px] font-bold text-gray-900 cursor-pointer select-none">
          Kirim ke semua Kontak Blast aktif
        </label>
      </div>

      {/* Custom SMTP Config Toggle */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowSmtp(!showSmtp)}
          className="w-full bg-gray-50 flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="font-bold text-[14px] text-gray-900">Pengaturan Pengirim & SMTP (Opsional)</span>
          </div>
          <span className="text-[14px] font-bold text-[#d62828]">
            {showSmtp ? "Tutup" : "Buka"}
          </span>
        </button>
        {showSmtp && (
          <div className="p-5 space-y-4 bg-white border-t border-gray-200">
            <p className="text-[13px] text-gray-500 mb-4">
              Isi bagian ini HANYA jika Anda ingin menggunakan email pengirim yang berbeda dari default `.env` Anda.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Email Pengirim (Sender Email)</label>
                <input type="text" name="customSmtpFrom" placeholder='"EasyLegal Promo" <promo@easylegal.id>' className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">SMTP Host</label>
                <input type="text" name="customSmtpHost" placeholder="smtp.gmail.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">SMTP Port</label>
                <input type="number" name="customSmtpPort" placeholder="465" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">SMTP Username</label>
                <input type="text" name="customSmtpUser" placeholder="email@gmail.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">SMTP Password</label>
                <input type="password" name="customSmtpPass" placeholder="App Password" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <SubmitButton />
      </div>

    </form>
  );
}
