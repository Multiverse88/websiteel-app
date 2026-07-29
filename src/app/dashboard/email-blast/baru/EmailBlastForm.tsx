"use client";

import React, { useState } from "react";
import { Send, Loader2, Save, FileText, FlaskConical, Eye, X } from "lucide-react";
import RichTextEditor from "@/components/dashboard/RichTextEditor";
import { createCampaignAction, testSendCampaignAction } from "../actions";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

function SubmitButton({ label, icon: Icon, isTest = false }: { label: string, icon: any, isTest?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      formAction={isTest ? async (fd) => {
        const testEmail = prompt("Masukkan email untuk test send:");
        if (testEmail) {
          fd.append("testEmail", testEmail);
          const result = await testSendCampaignAction(fd);
          if (result.error) alert(result.error);
          else alert("Test email berhasil dikirim!");
        }
      } : undefined}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[14px] font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
        isTest 
        ? "bg-[#F7F6F3] text-[#111111] hover:bg-[#EAEAEA] border border-[#EAEAEA]"
        : "bg-[#111111] text-white hover:bg-[#333333] active:scale-[0.98]"
      }`}
    >
      {pending && !isTest ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Icon className="w-4 h-4" />
      )}
      {label}
    </button>
  );
}

export default function EmailBlastForm({ 
  initialHeader = "", 
  initialFooter = "", 
  segments = [] 
}: { 
  initialHeader?: string; 
  initialFooter?: string;
  segments?: any[];
}) {
  const [headerHtml, setHeaderHtml] = useState(initialHeader);
  const [headerMode, setHeaderMode] = useState<'visual'|'html'>('visual');
  const [bodyHtml, setBodyHtml] = useState("");
  const [footerHtml, setFooterHtml] = useState(initialFooter);
  
  const [saveHeader, setSaveHeader] = useState(false);
  const [saveFooter, setSaveFooter] = useState(false);
  const [isTemplate, setIsTemplate] = useState(false);
  
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
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_600px] gap-8 items-start">
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
        formData.set("isTemplate", isTemplate ? "true" : "false");
        
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
          alert("Berhasil! Campaign email telah disimpan ke antrian.");
          router.push("/dashboard/email-blast");
        }
        }} 
        className="space-y-8 bg-white p-8 rounded-[12px] shadow-sm border border-[#EAEAEA]"
      >
      
      {/* Configuration Group */}
      <div className="space-y-6 bg-[#F7F6F3] p-6 rounded-[8px] border border-[#EAEAEA]">
        <div>
          <label className="block text-[13px] font-semibold text-[#111111] mb-2">
            Nama Internal (Hanya untuk tracking)
          </label>
          <input
            type="text"
            name="internalName"
            required
            placeholder="Contoh: Promo Merek Q3 - Gelombang 1"
            className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-[6px] text-[14px] focus:outline-none focus:border-[#111111] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-[#111111] mb-2">
            Subjek Email
          </label>
          <input
            type="text"
            name="subject"
            required
            placeholder="Contoh: Promo Spesial Pendaftaran Merek Bulan Ini!"
            className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-[6px] text-[14px] focus:outline-none focus:border-[#111111] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-[#111111] mb-2">
            Preview Text (Preheader)
          </label>
          <input
            type="text"
            name="previewText"
            placeholder="Teks singkat yang muncul setelah subjek di notifikasi inbox..."
            className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-[6px] text-[14px] focus:outline-none focus:border-[#111111] transition-colors"
          />
        </div>
      </div>

      {/* Editor Group */}
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <label className="block text-[13px] font-semibold text-[#111111]">
                Header Banner
              </label>
              <div className="flex bg-[#EAEAEA] p-0.5 rounded text-[11px]">
                <button type="button" onClick={() => setHeaderMode('visual')} className={`px-2 py-0.5 rounded transition-all ${headerMode === 'visual' ? 'bg-white shadow-sm font-medium text-[#111111]' : 'text-[#787774] hover:text-[#111111]'}`}>Visual</button>
                <button type="button" onClick={() => setHeaderMode('html')} className={`px-2 py-0.5 rounded transition-all ${headerMode === 'html' ? 'bg-white shadow-sm font-medium text-[#111111]' : 'text-[#787774] hover:text-[#111111]'}`}>HTML Code</button>
              </div>
            </div>
            <label className="flex items-center gap-2 text-[12px] text-[#787774] cursor-pointer">
              <input type="checkbox" checked={saveHeader} onChange={(e) => setSaveHeader(e.target.checked)} className="w-3.5 h-3.5 rounded border-[#EAEAEA] text-[#111111] focus:ring-[#111111]" />
              Simpan sbg default
            </label>
          </div>
          <div className="border border-[#EAEAEA] rounded-[6px] overflow-hidden">
            {headerMode === 'visual' ? (
              <RichTextEditor content={headerHtml} onChange={setHeaderHtml} onImageUpload={handleImageUpload} />
            ) : (
              <textarea 
                value={headerHtml} 
                onChange={(e) => setHeaderHtml(e.target.value)}
                className="w-full h-[180px] p-3 font-mono text-[12.5px] text-[#111111] focus:outline-none bg-[#FDFDFC] resize-y"
                placeholder="<!-- Paste your custom HTML here -->&#10;<img src='...' style='width:100%;' />"
              />
            )}
          </div>
        </div>

        {/* Body */}
        <div>
          <label className="block text-[13px] font-semibold text-[#111111] mb-2 flex items-center justify-between">
            <span>Konten Email</span>
            <span className="font-mono text-[11px] bg-[#EAEAEA] px-2 py-0.5 rounded text-[#111111]">Merge Tags: {"{{nama}}"}, {"{{email}}"}</span>
          </label>
          <div className="border border-[#EAEAEA] rounded-[6px] overflow-hidden">
            <RichTextEditor content={bodyHtml} onChange={setBodyHtml} onImageUpload={handleImageUpload} />
          </div>
        </div>

        {/* Footer */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-[13px] font-semibold text-[#111111]">
              Footer (Disclaimer & Sosial)
            </label>
            <label className="flex items-center gap-2 text-[12px] text-[#787774] cursor-pointer">
              <input type="checkbox" checked={saveFooter} onChange={(e) => setSaveFooter(e.target.checked)} className="w-3.5 h-3.5 rounded border-[#EAEAEA] text-[#111111] focus:ring-[#111111]" />
              Simpan sbg default
            </label>
          </div>
          <div className="border border-[#EAEAEA] rounded-[6px] overflow-hidden">
            <RichTextEditor content={footerHtml} onChange={setFooterHtml} onImageUpload={handleImageUpload} />
          </div>
        </div>
      </div>

      {/* Target & Schedule Group */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FBFBFA] p-6 rounded-[8px] border border-[#EAEAEA]">
        <div>
          <label className="block text-[13px] font-semibold text-[#111111] mb-2">
            Target Segmen Penerima
          </label>
          <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
            <label className="flex items-center gap-2 text-[14px] text-[#111111] cursor-pointer p-2 hover:bg-[#F7F6F3] rounded-md transition-colors">
              <input type="checkbox" name="sendToAll" defaultChecked className="w-4 h-4 rounded border-[#EAEAEA] text-[#111111] focus:ring-[#111111]" />
              Semua Kontak Aktif
            </label>
            {segments.map((s) => (
              <label key={s.id} className="flex items-center gap-2 text-[14px] text-[#111111] cursor-pointer p-2 hover:bg-[#F7F6F3] rounded-md transition-colors">
                <input type="checkbox" name="segments" value={s.id} className="w-4 h-4 rounded border-[#EAEAEA] text-[#111111] focus:ring-[#111111]" />
                {s.name} <span className="text-[#787774] text-[12px]">({s._count.contacts})</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-[#111111] mb-2">
            Jadwal Kirim
          </label>
          <input
            type="datetime-local"
            name="scheduledAt"
            className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-[6px] text-[14px] focus:outline-none focus:border-[#111111] transition-colors"
          />
          <p className="text-[12px] text-[#787774] mt-2">
            Biarkan kosong untuk langsung masuk antrian pengiriman (Throttled processing).
          </p>

          <label className="flex items-center gap-2 mt-4 text-[13px] font-medium text-[#111111] cursor-pointer">
            <input type="checkbox" checked={isTemplate} onChange={(e) => setIsTemplate(e.target.checked)} className="w-4 h-4 rounded border-[#EAEAEA] text-[#111111] focus:ring-[#111111]" />
            Simpan sebagai Template Campaign (Draft)
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-[#EAEAEA] flex items-center justify-between">
        <SubmitButton label="Kirim Test Email" icon={FlaskConical} isTest={true} />
        <SubmitButton label="Submit Campaign" icon={Send} />
      </div>

    </form>

    {/* STICKY LIVE PREVIEW ON RIGHT */}
    <div className="sticky top-8 bg-white border border-[#EAEAEA] rounded-[12px] overflow-hidden flex flex-col shadow-sm h-[calc(100vh-80px)] min-h-[600px]">
      <div className="flex items-center p-4 border-b border-[#EAEAEA] bg-[#FBFBFA]">
        <h3 className="font-semibold text-[14px] text-[#111111] flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#8A867D]" /> Live Preview
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#F7F5F1] p-4 lg:p-6 flex justify-center">
        <div 
          className="w-full max-w-[600px] bg-white shadow-sm border border-[#EAEAEA] min-h-[400px] overflow-hidden"
          style={{ alignSelf: 'flex-start' }}
          dangerouslySetInnerHTML={{ __html: `
            <div style="max-w: 600px; margin: 0 auto; font-family: sans-serif; background-color: #ffffff;">
              ${headerHtml ? `<div>${headerHtml}</div>` : ''}
              <div style="padding: 20px; font-size: 14px; line-height: 1.6; color: #333333;">
                ${bodyHtml || '<p style="color: #999; margin: 0;">[Konten Email Kosong]</p>'}
              </div>
              ${footerHtml ? `<div>${footerHtml}</div>` : ''}
            </div>
          `}}
        />
      </div>
    </div>
  </div>
  );
}
