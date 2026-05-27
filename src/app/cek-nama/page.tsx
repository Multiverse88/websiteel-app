"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  Database,
  Clock,
  Lock,
  MessageCircle,
  X,
  FileText,
} from "lucide-react";

export default function CekNama() {
  const [activeTab, setActiveTab] = useState<"pt" | "merek">("pt");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    bidangUsaha: "",
    alt1: "",
    alt2: "",
    alt3: "",
    merekName: "",
    merekClass: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const closeSuccessModal = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      whatsapp: "",
      bidangUsaha: "",
      alt1: "",
      alt2: "",
      alt3: "",
      merekName: "",
      merekClass: "",
    });
  };

  const trustBadges = [
    {
      Icon: Database,
      label: "Database",
      sub: "resmi AHU & DJKI",
    },
    {
      Icon: Clock,
      label: "Hasil",
      sub: "10 menit",
    },
    {
      Icon: Lock,
      label: "Data Anda",
      sub: "aman",
    },
  ];

  const caraKerja = [
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
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* ─── 1. HERO ─── */}
      <section className="bg-bg-light py-16 lg:py-20 border-b border-border/40">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[12.5px] font-semibold text-primary">Tools Gratis</span>
          </div>
          <h1 className="text-[48px] sm:text-[52px] font-black text-dark tracking-tight leading-none mb-5">
            Cek nama PT & Merek
          </h1>
          <p className="text-[17px] text-muted leading-relaxed max-w-xl mx-auto">
            Cek ketersediaan nama di database resmi AHU & DJKI. Hasil dikirim langsung ke WhatsApp kamu dalam 10 menit.
          </p>
        </div>
      </section>

      {/* ─── 2. TAB + FORM ─── */}
      <section className="bg-white py-12 relative">
        <div className="max-w-[640px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tab Pills */}
          <div className="flex bg-bg-light rounded-xl p-1 mb-8 border border-border/60">
            <button
              onClick={() => setActiveTab("pt")}
              className={`flex-1 py-2.5 text-[14.5px] font-bold rounded-lg transition-all duration-200 ${
                activeTab === "pt"
                  ? "bg-white text-dark shadow-sm"
                  : "text-muted hover:text-dark"
              }`}
            >
              Cek Nama PT
            </button>
            <button
              onClick={() => setActiveTab("merek")}
              className={`flex-1 py-2.5 text-[14.5px] font-bold rounded-lg transition-all duration-200 ${
                activeTab === "merek"
                  ? "bg-white text-dark shadow-sm"
                  : "text-muted hover:text-dark"
              }`}
            >
              Cek Nama Merek
            </button>
          </div>

          {/* Form card */}
          <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm relative">
            {/* Red accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

            <div className="p-7 md:p-8">
              {activeTab === "pt" ? (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <h2 className="text-[22px] font-extrabold text-dark">Cek Ketersediaan Nama PT</h2>
                    <p className="text-[13.5px] text-muted mt-1 leading-relaxed">
                      Nama PT wajib minimal 3 suku kata & belum dipakai. Berikan 3 alternatif untuk peluang persetujuan maksimal.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-dark mb-1.5">
                      Nama Alternatif 1 <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="alt1"
                      required
                      value={formData.alt1}
                      onChange={handleInputChange}
                      placeholder="Contoh: Maju Jaya Bersama"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm bg-bg-light/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-dark mb-1.5">
                      Nama Alternatif 2 <span className="text-muted font-normal">(opsional)</span>
                    </label>
                    <input
                      type="text"
                      name="alt2"
                      value={formData.alt2}
                      onChange={handleInputChange}
                      placeholder="Contoh: Sinergi Jaya Abadi"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm bg-bg-light/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-dark mb-1.5">
                      Nama Alternatif 3 <span className="text-muted font-normal">(opsional)</span>
                    </label>
                    <input
                      type="text"
                      name="alt3"
                      value={formData.alt3}
                      onChange={handleInputChange}
                      placeholder="Contoh: Cipta Solusi Nusantara"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm bg-bg-light/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-dark mb-1.5">
                      Bidang Usaha <span className="text-muted font-normal">(opsional)</span>
                    </label>
                    <input
                      type="text"
                      name="bidangUsaha"
                      value={formData.bidangUsaha}
                      onChange={handleInputChange}
                      placeholder="Contoh: Jasa konsultasi digital"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm bg-bg-light/40"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <h2 className="text-[22px] font-extrabold text-dark">Cek Ketersediaan Nama Merek</h2>
                    <p className="text-[13.5px] text-muted mt-1 leading-relaxed">
                      Merek dagang dilindungi berdasarkan kelas barang/jasa. Tuliskan nama merek dan jenis produk Anda.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-dark mb-1.5">
                      Nama Merek / Brand <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="merekName"
                      required
                      value={formData.merekName}
                      onChange={handleInputChange}
                      placeholder="Contoh: Kopiku Mantap"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm bg-bg-light/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-dark mb-1.5">
                      Jenis Barang & Jasa <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="merekClass"
                      required
                      value={formData.merekClass}
                      onChange={handleInputChange}
                      placeholder="Contoh: Kedai kopi, biji kopi kemasan"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm bg-bg-light/40"
                    />
                  </div>
                </div>
              )}

              {/* Shared: Kontak */}
              <div className="mt-5 pt-5 border-t border-border/60 space-y-4">
                <p className="text-[13px] font-extrabold text-dark uppercase tracking-wider">Kontak Anda</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-dark mb-1.5">
                      Nama <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nama Anda"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm bg-bg-light/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-dark mb-1.5">
                      WhatsApp <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="08xxxxxxxxxx"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm bg-bg-light/40"
                    />
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#1EA760] text-white font-bold text-[17px] rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex justify-center items-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                  <span>Cek via WhatsApp</span>
                </button>
                <p className="text-center text-[11.5px] text-muted mt-3 font-semibold">
                  ✓ 100% Gratis · Hasil dalam 10 menit · Senin–Sabtu 08:00–20:00
                </p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            {trustBadges.map(({ Icon, label, sub }, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-border/60 flex flex-col items-center text-center space-y-1.5 shadow-sm">
                <Icon className="w-5 h-5 text-primary" />
                <div className="text-[12px] font-bold text-dark">{label}</div>
                <div className="text-[11px] text-muted font-semibold">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. CARA KERJA ─── */}
      <section className="bg-bg-light py-16 border-t border-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[12.5px] font-bold text-primary uppercase tracking-wider mb-3">Cara Kerja</p>
            <h2 className="text-[34px] font-extrabold text-dark leading-tight">
              3 langkah, hasil 10 menit.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {caraKerja.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-border/60 p-7 relative shadow-sm flex flex-col items-center text-center"
              >
                {/* Step number */}
                <div className="h-12 w-12 rounded-full bg-primary text-white font-black text-[22px] flex items-center justify-center mb-5">
                  {step.num}
                </div>
                <h3 className="text-[17px] font-extrabold text-dark mb-2">{step.title}</h3>
                <p className="text-[13.5px] text-muted leading-relaxed">{step.desc}</p>

                {/* Connector arrow (not on last) */}
                {idx < 2 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-muted text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SUCCESS MODAL ─── */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-border rounded-2xl max-w-md w-full p-8 text-center space-y-5 relative shadow-2xl animate-slide-down">
            <button
              onClick={closeSuccessModal}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-bg-light text-muted"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9 text-green-500" />
            </div>

            <div>
              <h2 className="text-[22px] font-black text-dark mb-2">Permintaan Dikirim!</h2>
              <p className="text-[13.5px] text-muted leading-relaxed">
                Terima kasih <strong className="text-dark">{formData.name}</strong>, tim legal EasyLegal akan mengirim hasil cek ke WhatsApp Anda dalam 10 menit.
              </p>
            </div>

            <div className="bg-bg-light rounded-xl p-4 border border-border/60 text-left space-y-2">
              <div className="flex items-center space-x-2 text-[12px] font-bold text-dark">
                <FileText className="w-4 h-4 text-primary" />
                <span>Detail Permintaan:</span>
              </div>
              <div className="text-[12px] text-muted space-y-1 pl-6">
                {activeTab === "pt" ? (
                  <>
                    {formData.alt1 && <div>· Alt 1: <span className="text-dark font-semibold">{formData.alt1}</span></div>}
                    {formData.alt2 && <div>· Alt 2: <span className="text-dark font-semibold">{formData.alt2}</span></div>}
                    {formData.alt3 && <div>· Alt 3: <span className="text-dark font-semibold">{formData.alt3}</span></div>}
                  </>
                ) : (
                  <>
                    <div>· Merek: <span className="text-dark font-semibold">{formData.merekName}</span></div>
                    <div>· Produk: <span className="text-dark font-semibold">{formData.merekClass}</span></div>
                  </>
                )}
                <div>· WhatsApp: <span className="text-dark font-semibold">{formData.whatsapp}</span></div>
              </div>
            </div>

            <p className="text-[12px] font-bold text-primary">✓ Hasil dikirim ke WhatsApp dalam 10 menit!</p>

            <button
              onClick={closeSuccessModal}
              className="w-full py-3 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-hover transition-colors"
            >
              Kembali ke Halaman
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
