"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Upload } from "lucide-react";
import RichTextEditor from "@/components/dashboard/RichTextEditor";
import { updateCampaignAction } from "../../../actions";

export default function EditCampaignForm({ campaign }: { campaign: any }) {
  const [bodyHtml, setBodyHtml] = useState(campaign.bodyHtml);
  const router = useRouter();

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const { uploadInlineImageAction } = await import("../../../actions");
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
        formData.set("bodyHtml", bodyHtml);
        
        const result = await updateCampaignAction(campaign.id, formData);
        if (result?.error) {
          alert(`Gagal: ${result.error}`);
        } else if (result?.success) {
          alert("Berhasil diperbarui!");
          router.push(`/dashboard/email-blast/riwayat/${campaign.id}`);
        }
      }} 
      className="space-y-8"
    >
      <div className="space-y-6 bg-[#F7F6F3] p-6 rounded-[8px] border border-[#EAEAEA]">
        <div>
          <label className="block text-[13px] font-semibold text-[#111111] mb-2">Nama Internal (Opsional)</label>
          <input 
            type="text" 
            name="internalName" 
            defaultValue={campaign.internalName || ""}
            placeholder="Contoh: Promo Akhir Tahun 2026"
            className="w-full border border-[#EAEAEA] rounded-md px-4 py-2.5 text-[14px] text-[#111111] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] outline-none"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-[#111111] mb-2">Subjek Email *</label>
          <input 
            type="text" 
            name="subject" 
            required 
            defaultValue={campaign.subject}
            className="w-full border border-[#EAEAEA] rounded-md px-4 py-2.5 text-[14px] text-[#111111] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] outline-none"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-[#111111] mb-2">Preview Text / Preheader (Opsional)</label>
          <input 
            type="text" 
            name="previewText" 
            defaultValue={campaign.previewText || ""}
            placeholder="Teks singkat yang muncul setelah subjek di notifikasi"
            className="w-full border border-[#EAEAEA] rounded-md px-4 py-2.5 text-[14px] text-[#111111] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[13px] font-semibold text-[#111111] mb-2 flex items-center justify-between">
            <span>Konten Email *</span>
            <span className="text-[12px] font-normal text-[#787774]">Variabel: {"{{nama}}"}, {"{{email}}"}</span>
          </label>
          <div className="rounded-[8px] overflow-hidden border border-[#EAEAEA]">
            <RichTextEditor 
              content={bodyHtml} 
              onChange={setBodyHtml} 
              onImageUpload={handleImageUpload}
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#EAEAEA] flex items-center justify-end gap-3">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="px-6 py-2.5 text-[14px] font-semibold text-[#787774] bg-[#F7F6F3] border border-[#EAEAEA] rounded-md hover:text-[#111111] transition-colors"
        >
          Batal
        </button>
        <button 
          type="submit" 
          className="px-6 py-2.5 text-[14px] font-semibold text-white bg-[#111111] rounded-md hover:bg-[#333333] transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
}
