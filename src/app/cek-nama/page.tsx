"use client";

import React, { useState } from "react";
import { Building2, Search, MessageCircle, Check } from "lucide-react";

export default function CekNama() {
  const [activeTab, setActiveTab] = useState<"pt" | "merek">("pt");
  const [formData, setFormData] = useState({
    alt1: "",
    alt2: "",
    alt3: "",
    bidangUsaha: "",
    merekName: "",
    merekClass: "",
    merekDesc: "",
    namaAnda: "",
    whatsapp: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct message based on active tab
    let message = "";
    if (activeTab === "pt") {
      message = `Halo EasyLegal, saya ingin cek ketersediaan nama PT:\n\n` +
                `- Alternatif 1: ${formData.alt1 || "-"}\n` +
                `- Alternatif 2: ${formData.alt2 || "-"}\n` +
                `- Alternatif 3: ${formData.alt3 || "-"}\n` +
                `- Bidang Usaha: ${formData.bidangUsaha || "-"}\n\n` +
                `Data Kontak:\n` +
                `- Nama: ${formData.namaAnda || "-"}\n` +
                `- WhatsApp: ${formData.whatsapp || "-"}`;
    } else {
      message = `Halo EasyLegal, saya ingin cek ketersediaan nama Merek:\n\n` +
                `- Nama Merek: ${formData.merekName || "-"}\n` +
                `- Jenis Barang/Jasa: ${formData.merekClass || "-"}\n` +
                `- Deskripsi: ${formData.merekDesc || "-"}\n\n` +
                `Data Kontak:\n` +
                `- Nama: ${formData.namaAnda || "-"}\n` +
                `- WhatsApp: ${formData.whatsapp || "-"}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/6281123456789?text=${encodedMessage}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="relative min-h-screen bg-[#FFFDFB] overflow-hidden flex flex-col items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Ambient background glows */}
      <div className="absolute left-[-200px] top-[15%] w-[550px] h-[550px] rounded-full bg-[#F5C2C4]/35 blur-[110px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute right-[-250px] bottom-[-100px] w-[700px] h-[700px] rounded-full bg-[#FEEDDC]/40 blur-[130px] pointer-events-none animate-pulse-subtle" />

      {/* ─── HEADER ─── */}
      <div className="text-center max-w-[800px] mx-auto z-10 mb-10 flex flex-col items-center">
        {/* Tools Gratis Badge */}
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] mb-6 text-[12.5px] font-semibold text-[#B91C1C]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C]" />
          Tools Gratis
        </div>

        {/* Heading */}
        <h1 className="text-[32px] xs:text-[38px] sm:text-[52px] font-black text-[#111111] tracking-tight leading-tight mb-4">
          Cek nama PT & Merek
        </h1>

        {/* Subtitle */}
        <p className="text-[15.5px] text-[#666666] leading-relaxed max-w-[580px] mx-auto">
          Cek ketersediaan nama di database resmi AHU & DJKI. Hasil dikirim langsung ke WhatsApp kamu dalam 10 menit.
        </p>
      </div>

      {/* ─── MAIN CARD CONTAINER ─── */}
      <div className="w-full max-w-[760px] bg-white rounded-[32px] border border-gray-100 shadow-[0_15px_60px_rgba(0,0,0,0.04)] overflow-hidden z-10 mb-8">
        
        {/* Tab Switcher Header */}
        <div className="bg-[#F5F4F0]/50 border-b border-gray-100 p-2 flex gap-2">
          {/* Cek Nama PT Tab */}
          <button
            onClick={() => setActiveTab("pt")}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-[14.5px] font-extrabold transition-all duration-200 ${
              activeTab === "pt"
                ? "bg-white text-[#B91C1C] shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
                : "text-[#666666] hover:text-[#111111]"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Cek Nama PT
          </button>

          {/* Cek Nama Merek Tab */}
          <button
            onClick={() => setActiveTab("merek")}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-[14.5px] font-extrabold transition-all duration-200 ${
              activeTab === "merek"
                ? "bg-white text-[#B91C1C] shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
                : "text-[#666666] hover:text-[#111111]"
            }`}
          >
            <Search className="w-4 h-4" />
            Cek Nama Merek
          </button>
        </div>

        {/* Card Content Form */}
        <form onSubmit={handleWhatsAppSubmit} className="p-5 sm:p-10">
          
          {activeTab === "pt" ? (
            /* ─── PT FORM SECTION ─── */
            <div className="space-y-6">
              <div>
                <h2 className="text-[22px] font-extrabold text-[#111111]">Cek Ketersediaan Nama PT</h2>
                <p className="text-[13.5px] text-[#666666] mt-1 leading-relaxed">
                  Nama PT wajib minimal <b>3 suku kata</b> & belum dipakai. Berikan 3 alternatif untuk peluang persetujuan maksimal.
                </p>
              </div>

              {/* Alt Name #1 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[13.5px] font-bold text-[#111111]">
                    Alternatif Nama PT #1
                  </label>
                  <span className="bg-[#FFF0F0] text-[#B91C1C] text-[9.5px] font-black px-2 py-0.5 rounded-[4px] tracking-wide uppercase">
                    Wajib
                  </span>
                </div>
                <input
                  type="text"
                  name="alt1"
                  required
                  value={formData.alt1}
                  onChange={handleInputChange}
                  placeholder="PT Nama Utama Bersama"
                  className="w-full bg-[#F7F6F3] border-none text-[#111111] font-semibold text-[14px] rounded-2xl px-5 py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 transition-all"
                />
              </div>

              {/* Alt Name #2 */}
              <div>
                <label className="block text-[13.5px] font-bold text-[#111111] mb-2">
                  Alternatif Nama PT #2
                </label>
                <input
                  type="text"
                  name="alt2"
                  value={formData.alt2}
                  onChange={handleInputChange}
                  placeholder="PT Nama Alternatif Kedua"
                  className="w-full bg-[#F7F6F3] border-none text-[#111111] font-semibold text-[14px] rounded-2xl px-5 py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 transition-all"
                />
              </div>

              {/* Alt Name #3 */}
              <div>
                <label className="block text-[13.5px] font-bold text-[#111111] mb-2">
                  Alternatif Nama PT #3
                </label>
                <input
                  type="text"
                  name="alt3"
                  value={formData.alt3}
                  onChange={handleInputChange}
                  placeholder="PT Nama Alternatif Ketiga"
                  className="w-full bg-[#F7F6F3] border-none text-[#111111] font-semibold text-[14px] rounded-2xl px-5 py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 transition-all"
                />
                <span className="block text-[11.5px] text-[#666666] mt-2 font-medium">
                  Rekomendasi: minimal 3 alternatif agar cepat dapat yang lolos.
                </span>
              </div>

              {/* Bidang Usaha */}
              <div>
                <label className="block text-[13.5px] font-bold text-[#111111] mb-2">
                  Bidang Usaha
                </label>
                <input
                  type="text"
                  name="bidangUsaha"
                  value={formData.bidangUsaha}
                  onChange={handleInputChange}
                  placeholder="Misal: konsultan IT, F&B, properti, dll"
                  className="w-full bg-[#F7F6F3] border-none text-[#111111] font-semibold text-[14px] rounded-2xl px-5 py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 transition-all"
                />
              </div>
            </div>
          ) : (
            /* ─── MEREK FORM SECTION ─── */
            <div className="space-y-6">
              <div>
                <h2 className="text-[22px] font-extrabold text-[#111111]">Cek Ketersediaan Nama Merek</h2>
                <p className="text-[13.5px] text-[#666666] mt-1 leading-relaxed">
                  Merek dagang dilindungi berdasarkan kelas barang/jasa. Tuliskan nama merek dan jenis produk Anda.
                </p>
              </div>

              {/* Brand Name */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[13.5px] font-bold text-[#111111]">
                    Nama Merek / Brand
                  </label>
                  <span className="bg-[#FFF0F0] text-[#B91C1C] text-[9.5px] font-black px-2 py-0.5 rounded-[4px] tracking-wide uppercase">
                    Wajib
                  </span>
                </div>
                <input
                  type="text"
                  name="merekName"
                  required
                  value={formData.merekName}
                  onChange={handleInputChange}
                  placeholder="Contoh: Kopiku Mantap"
                  className="w-full bg-[#F7F6F3] border-none text-[#111111] font-semibold text-[14px] rounded-2xl px-5 py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 transition-all"
                />
              </div>

              {/* Jenis Barang/Jasa */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-[13.5px] font-bold text-[#111111]">
                    Jenis Barang & Jasa
                  </label>
                  <span className="bg-[#FFF0F0] text-[#B91C1C] text-[9.5px] font-black px-2 py-0.5 rounded-[4px] tracking-wide uppercase">
                    Wajib
                  </span>
                </div>
                <input
                  type="text"
                  name="merekClass"
                  required
                  value={formData.merekClass}
                  onChange={handleInputChange}
                  placeholder="Contoh: Kedai kopi, biji kopi kemasan, dll"
                  className="w-full bg-[#F7F6F3] border-none text-[#111111] font-semibold text-[14px] rounded-2xl px-5 py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 transition-all"
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-[13.5px] font-bold text-[#111111] mb-2">
                  Deskripsi Bisnis (opsional)
                </label>
                <input
                  type="text"
                  name="merekDesc"
                  value={formData.merekDesc}
                  onChange={handleInputChange}
                  placeholder="Misal: kedai kopi susu kekinian dengan konsep booth modern"
                  className="w-full bg-[#F7F6F3] border-none text-[#111111] font-semibold text-[14px] rounded-2xl px-5 py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 transition-all"
                />
              </div>
            </div>
          )}

          {/* ─── SHARED KONTAK SECTION ─── */}
          <div className="mt-8 pt-8 border-t border-gray-100/70">
            <h3 className="text-[12px] font-black text-[#B91C1C] tracking-widest uppercase mb-4">
              Kontak Anda
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nama */}
              <div>
                <label className="block text-[13.5px] font-bold text-[#111111] mb-2">
                  Nama Anda <span className="text-[#B91C1C]">*</span>
                </label>
                <input
                  type="text"
                  name="namaAnda"
                  required
                  value={formData.namaAnda}
                  onChange={handleInputChange}
                  placeholder="Nama lengkap"
                  className="w-full bg-[#F7F6F3] border-none text-[#111111] font-semibold text-[14px] rounded-2xl px-5 py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 transition-all"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-[13.5px] font-bold text-[#111111] mb-2">
                  WhatsApp <span className="text-[#B91C1C]">*</span>
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="0812xxxxxxxx"
                  className="w-full bg-[#F7F6F3] border-none text-[#111111] font-semibold text-[14px] rounded-2xl px-5 py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 transition-all"
                />
              </div>
            </div>
          </div>

          {/* ─── BUTTON AND BOTTOM LEGAL SUBTITLE ─── */}
          <div className="mt-8 flex flex-col items-center">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#25D366] hover:bg-[#1EA760] text-white font-extrabold text-[16px] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.99]"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Cek via WhatsApp
            </button>

            <span className="block text-[12.5px] text-[#666666] font-medium mt-4">
              ✓ <b>100% Gratis</b> · Hasil dalam 10 menit · Senin–Sabtu 08:00–20:00
            </span>
          </div>

        </form>
      </div>      {/* ─── TRUST BADGES BELOW CARD ─── */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 z-10 mb-20">
        {/* Badge 1 */}
        <div className="bg-white rounded-full border border-gray-150/70 px-5 py-2.5 flex items-center gap-2 shadow-sm text-[13px] text-[#111111]">
          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Check className="w-2.5 h-2.5 stroke-[3px]" />
          </div>
          <span>
            <b>Database</b> resmi AHU & DJKI
          </span>
        </div>

        {/* Badge 2 */}
        <div className="bg-white rounded-full border border-gray-150/70 px-5 py-2.5 flex items-center gap-2 shadow-sm text-[13px] text-[#111111]">
          <div className="w-4 h-4 rounded-full bg-[#FFF0F0] text-[#B91C1C] flex items-center justify-center flex-shrink-0 text-[10px]">
            🕒
          </div>
          <span>
            Hasil <b>10 menit</b>
          </span>
        </div>

        {/* Badge 3 */}
        <div className="bg-white rounded-full border border-gray-150/70 px-5 py-2.5 flex items-center gap-2 shadow-sm text-[13px] text-[#111111]">
          <div className="w-4 h-4 rounded-full bg-[#EBF5FF] text-blue-600 flex items-center justify-center flex-shrink-0 text-[10px]">
            🛡️
          </div>
          <span>
            Data Anda <b>aman</b>
          </span>
        </div>
      </div>

      {/* ─── CARA KERJA SECTION ─── */}
      <section className="w-full max-w-[1040px] mx-auto px-4 z-10 mt-10 mb-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[12px] font-black text-[#B91C1C] tracking-[0.2em] uppercase mb-4">
            Cara Kerja
          </p>
          <h2 className="text-[34px] sm:text-[40px] font-black text-[#111111] leading-tight">
            3 langkah, <span className="text-[#B91C1C]">hasil 10 menit.</span>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch relative">
          {[
            {
              num: "1",
              title: "Isi Form",
              desc: "Tulis nama yang ingin dicek & kontak WhatsApp Anda.",
            },
            {
              num: "2",
              title: "Tim Cek Database",
              desc: "Tim cek di sistem AHU (untuk PT) atau DJKI (untuk merek).",
            },
            {
              num: "3",
              title: "Hasil via WhatsApp",
              desc: "Hasil cek + rekomendasi langsung dikirim ke WhatsApp Anda.",
            },
          ].map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Card Container */}
              <div className="w-full h-full bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100/60 p-8 sm:p-10 flex flex-col items-center text-center">
                {/* Red Circle Number */}
                <div className="w-12 h-12 rounded-full bg-[#B91C1C] flex items-center justify-center text-white text-[17px] font-black shadow-[0_4px_16px_rgba(185,28,28,0.25)] mb-6">
                  {step.num}
                </div>
                
                {/* Step Title */}
                <h3 className="text-[17px] font-bold text-[#111111] mb-3">
                  {step.title}
                </h3>
                
                {/* Step Description */}
                <p className="text-[13.5px] text-[#666666] leading-relaxed max-w-[240px]">
                  {step.desc}
                </p>
              </div>

              {/* Arrow Connector (Hidden on Mobile) */}
              {idx < 2 && (
                <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-[18px] lg:-right-[22px] z-20 items-center justify-center pointer-events-none">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-gray-300"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
