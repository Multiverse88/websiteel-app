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

export default function EmailBlastForm({ initialHeader = "", initialFooter = "" }: { initialHeader?: string; initialFooter?: string }) {
  const [headerHtml, setHeaderHtml] = useState(initialHeader);
  const [bodyHtml, setBodyHtml] = useState("");
  const [footerHtml, setFooterHtml] = useState(initialFooter);
  
  const [saveHeader, setSaveHeader] = useState(false);
  const [saveFooter, setSaveFooter] = useState(false);
  
  const router = useRouter();

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const { uploadInlineImageAction } = await import("../actions");
    const result = await uploadInlineImageAction(formData);
    if (result.error) {
      alert(result.error);
      return null;
    }
    return result.url || null;
  };

  return (
    <form 
      action={async (formData) => {
        // Combine all parts for the final email
        const finalHtml = `
          <div style="max-w: 600px; margin: 0 auto; font-family: sans-serif; background-color: #ffffff;">
            ${headerHtml ? `<div>${headerHtml}</div>` : ''}
            <div style="padding: 20px;">
              ${bodyHtml}
            </div>
            ${footerHtml ? `<div>${footerHtml}</div>` : ''}
          </div>
        `;
        
        formData.set("bodyHtml", finalHtml);
        
        // Save templates if requested
        if (saveHeader || saveFooter) {
          const { saveEmailBlastTemplateAction } = await import("../actions");
          if (saveHeader) await saveEmailBlastTemplateAction("header", headerHtml);
          if (saveFooter) await saveEmailBlastTemplateAction("footer", footerHtml);
        }

        const result = await createCampaignAction(formData);
        if (result?.error) {
          alert(`Gagal: ${result.error}`);
        } else if (result?.success) {
          alert("Berhasil! Campaign email telah diproses/dikirim.");
          router.push("/dashboard/email-blast");
        }
      }} 
      className="space-y-8"
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

      {/* Header */}
      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[14px] font-bold text-gray-900">
            Header Email (Banner / Logo)
          </label>
          <label className="flex items-center gap-2 text-[13px] font-bold text-gray-600 cursor-pointer">
            <input type="checkbox" checked={saveHeader} onChange={(e) => setSaveHeader(e.target.checked)} className="w-4 h-4 rounded text-[#d62828] focus:ring-[#d62828]" />
            Simpan sebagai template default
          </label>
        </div>
        <RichTextEditor 
          content={headerHtml} 
          onChange={setHeaderHtml} 
          onImageUpload={handleImageUpload}
        />
        <p className="text-[13px] text-gray-500 mt-2">
          Gunakan untuk mengunggah gambar banner F1 atau kop surat (Drag & Drop gambar ke sini).
        </p>
      </div>

      {/* Body */}
      <div>
        <label className="block text-[14px] font-bold text-gray-900 mb-2">
          Isi Utama Email (Pesan Anda)
        </label>
        <RichTextEditor 
          content={bodyHtml} 
          onChange={setBodyHtml} 
          onImageUpload={handleImageUpload}
        />
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[14px] font-bold text-gray-900">
            Footer Email (Informasi & Social Media)
          </label>
          <label className="flex items-center gap-2 text-[13px] font-bold text-gray-600 cursor-pointer">
            <input type="checkbox" checked={saveFooter} onChange={(e) => setSaveFooter(e.target.checked)} className="w-4 h-4 rounded text-[#d62828] focus:ring-[#d62828]" />
            Simpan sebagai template default
          </label>
        </div>
        <RichTextEditor 
          content={footerHtml} 
          onChange={setFooterHtml} 
          onImageUpload={handleImageUpload}
        />
        <p className="text-[13px] text-gray-500 mt-2">
          Cocok untuk disclaimer, alamat kantor, tombol unsubscribe, atau deretan logo media sosial.
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

      {/* Submit */}
      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <SubmitButton />
      </div>

    </form>
  );
}
