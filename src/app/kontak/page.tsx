"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Offices from "@/components/Offices";
import FAQ from "@/components/FAQ";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  CheckCircle,
  ChevronDown,
  X,
  Home,
  Loader2,
} from "lucide-react";
import { getWhatsAppLink } from "@/lib/config";
import { submitContactForm } from "./actions";

export default function Kontak() {
  const [isPending, startTransition] = useTransition();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    whatsapp: "",
    topic: "",
    message: "",
    consent: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
    if (formError) setFormError(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi.";
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi.";
    if (!formData.whatsapp.trim()) newErrors.whatsapp = "No. WhatsApp wajib diisi.";
    if (!formData.topic) newErrors.topic = "Topik konsultasi wajib dipilih.";
    if (!formData.message.trim()) newErrors.message = "Pesan wajib diisi.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormError(null);
    const submittedNameValue = formData.name;

    startTransition(async () => {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("businessName", formData.businessName);
      fd.append("email", formData.email);
      fd.append("whatsapp", formData.whatsapp);
      fd.append("topic", formData.topic);
      fd.append("message", formData.message);

      const result = await submitContactForm(null, fd);
      if (result && result.error) {
        setFormError(result.error);
      } else if (result && result.success) {
        setSubmittedName(submittedNameValue);
        setFormSubmitted(true);
      }
    });
  };

  const closeToast = () => {
    setFormSubmitted(false);
    setFormData({
      name: "",
      businessName: "",
      email: "",
      whatsapp: "",
      topic: "",
      message: "",
      consent: true,
    });
  };



  const faqs = [
    {
      q: "Berapa lama proses pendirian PT di EasyLegal?",
      a: "Rata-rata 7–14 hari kerja sejak dokumen lengkap diterima. Untuk PT Perorangan bisa lebih cepat (3–5 hari kerja). Anda akan mendapat tracking status real-time dari dashboard setiap tahap.",
    },
    {
      q: "Apakah harga sudah termasuk biaya pemerintah?",
      a: "Ya, semua harga paket EasyLegal bersifat All-In. Sudah termasuk biaya PNBP Kemenkumham, jasa notaris, SK Kemenkumham, dan NIB. Tidak ada biaya tersembunyi di kemudian hari.",
    },
    {
      q: "Apakah saya harus datang ke kantor EasyLegal?",
      a: "Tidak perlu. Seluruh proses kami dirancang 100% online & paperless. Anda cukup mengunggah berkas melalui dashboard kami. Namun jika ingin berkonsultasi langsung, kantor kami selalu terbuka.",
    },
    {
      q: "Bagaimana kalau dokumen saya kurang lengkap?",
      a: "Tim compliance kami akan memeriksa kembali seluruh berkas Anda sebelum diproses. Jika ada yang kurang atau perlu revisi, kami akan segera mengabari Anda via WhatsApp dan memandu Anda.",
    },
    {
      q: "Apakah EasyLegal terdaftar resmi?",
      a: "Ya, EasyLegal terdaftar resmi sebagai Penyelenggara Sistem Elektronik (PSE) di Kominfo dan bermitra dengan Notaris terpercaya di Indonesia.",
    },
    {
      q: "Bagaimana metode pembayarannya?",
      a: "Kami menerima transfer bank (VA BCA, Mandiri, BNI, BRI), kartu kredit, dan cicilan. Pembayaran bisa dilakukan DP 50% di awal atau cicilan sesuai kesepakatan.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* ─── 1. HERO & CONTACT CHANNELS ─── */}
      <section className="bg-white py-8 sm:py-20 border-b border-border/40 overflow-hidden relative">
        {/* Subtle top-right radial glow for premium aesthetics */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-[11px] sm:text-[13px] font-medium text-gray-500 mb-4 sm:mb-6">
            <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
            <span className="text-gray-300 font-normal">&gt;</span>
            <span className="text-[11px] sm:text-[13px] font-bold text-gray-900">Kontak</span>
          </nav>

          {/* Title & Subtitle */}
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1 px-3 sm:py-1.5 sm:px-3.5 rounded-full border border-red-100 shadow-sm animate-pulse-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
              <span className="text-[10px] sm:text-[12.5px] font-bold text-[#990202] tracking-wide">Hubungi Kami</span>
            </div>

            <h1 className="font-heading text-[20px] sm:text-[44px] lg:text-[48px] font-extrabold text-gray-950 leading-[1.25] sm:leading-tight tracking-tight mt-4 sm:mt-6">
              Mari Bicarakan Kebutuhan <span className="text-[#990202]">Legal Bisnis</span> Anda.
            </h1>
              
            <p className="text-[12.5px] sm:text-[16.5px] text-gray-500 leading-relaxed max-w-2xl font-normal">
              Tim kami akan menjelaskan semua yang Anda butuhkan. Pilih cara yang paling nyaman untuk Anda.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            
            {/* WhatsApp Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-md border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.008)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group min-h-[220px] sm:min-h-[320px]">
              <div>
                {/* Icon Container */}
                <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-[#25D366] flex items-center justify-center mb-4 sm:mb-6 transition-transform group-hover:scale-105 duration-300 shadow-sm">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-6 sm:h-6 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436 0 9.86-4.42 9.863-9.855.001-2.63-1.024-5.101-2.887-6.968C16.38 1.916 13.9 .893 11.272.893c-5.44 0-9.866 4.418-9.87 9.853-.001 1.77.463 3.5 1.34 5.013l-.974 3.561 3.659-.96c1.507.82 3.193 1.258 4.63 1.257z" />
                    <path d="M17.487 14.397c-.298-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m0 0" />
                  </svg>
                </div>
                
                {/* Tag */}
                <span className="text-[9px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-widest block">
                  WhatsApp · Tercepat
                </span>
                
                {/* Title */}
                <h3 className="font-heading text-sm sm:text-[22px] font-extrabold text-gray-950 mt-1 sm:mt-2 leading-snug">
                  0811-2345-6789
                </h3>
                
                {/* Subtext */}
                <p className="text-[11px] sm:text-[13px] text-gray-500 leading-relaxed mt-2 sm:mt-3">
                  Respons rata-rata kurang dari 5 menit. Tersedia Senin–Sabtu, 08:00–20:00 WIB.
                </p>
              </div>

              {/* Action Link */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 sm:mt-6 flex items-center text-[12px] sm:text-[13.5px] font-extrabold text-[#990202] hover:text-[#800000] hover:translate-x-1 transition-all duration-200"
              >
                Mulai chat →
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-md border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.008)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group min-h-[220px] sm:min-h-[320px]">
              <div>
                {/* Icon Container */}
                <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-[#990202] flex items-center justify-center mb-4 sm:mb-6 transition-transform group-hover:scale-105 duration-300 shadow-sm">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                
                {/* Tag */}
                <span className="text-[9px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-widest block">
                  Email · Formal
                </span>
                
                {/* Title */}
                <h3 className="font-heading text-sm sm:text-[22px] font-extrabold text-gray-950 mt-1 sm:mt-2 leading-snug">
                  info@easylegal.id
                </h3>
                
                {/* Subtext */}
                <p className="text-[11px] sm:text-[13px] text-gray-500 leading-relaxed mt-2 sm:mt-3">
                  Untuk pertanyaan detail, dokumentasi, atau kerjasama. Dibalas dalam 24 jam kerja.
                </p>
              </div>

              {/* Action Link */}
              <a
                href="mailto:info@easylegal.id"
                className="mt-4 sm:mt-6 flex items-center text-[12px] sm:text-[13.5px] font-extrabold text-[#990202] hover:text-[#800000] hover:translate-x-1 transition-all duration-200"
              >
                Kirim email →
              </a>
            </div>

            {/* Telepon Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-md border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.008)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group min-h-[220px] sm:min-h-[320px]">
              <div>
                {/* Icon Container */}
                <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-[#111827] flex items-center justify-center mb-4 sm:mb-6 transition-transform group-hover:scale-105 duration-300 shadow-sm">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                
                {/* Tag */}
                <span className="text-[9px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-widest block">
                  Telepon · Kantor
                </span>
                
                {/* Title */}
                <h3 className="font-heading text-sm sm:text-[22px] font-extrabold text-gray-950 mt-1 sm:mt-2 leading-snug">
                  (022) 1234-5678
                </h3>
                
                {/* Subtext */}
                <p className="text-[11px] sm:text-[13px] text-gray-500 leading-relaxed mt-2 sm:mt-3">
                  Hubungi kantor pusat Bandung. Tim operations siap menjawab di jam kerja.
                </p>
              </div>

              {/* Action Link */}
              <a
                href="tel:02212345678"
                className="mt-4 sm:mt-6 flex items-center text-[12px] sm:text-[13.5px] font-extrabold text-[#990202] hover:text-[#800000] hover:translate-x-1 transition-all duration-200"
              >
                Telepon kami →
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 3. FORM + SIDEBAR ─── */}
      <section className="bg-white py-8 sm:py-20 border-b border-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Form */}
            <div className="lg:col-span-7 bg-white shadow-md border border-black/[0.04] rounded-2xl sm:rounded-3xl shadow-sm p-5 sm:p-10">
              <div>
                <h2 className="text-[20px] sm:text-[24px] font-extrabold text-gray-950 mb-1 tracking-tight">Kirim pertanyaan Anda</h2>
                <p className="text-[12.5px] sm:text-[14px] text-gray-500 leading-relaxed font-normal">
                  Isi form berikut dan tim kami akan menghubungi Anda kembali dalam 1×24 jam kerja.
                </p>
                
                {/* Thin dividing line under header */}
                <div className="border-b border-gray-100 my-6" />

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {/* Error message */}
                  {formError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-red-700 font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 animate-ping" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Nama Lengkap + Nama Bisnis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="text-[13px] font-bold text-gray-900 mb-2 block">Nama Lengkap*</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Mis. Budi Santoso"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-[#990202] focus:ring-1 focus:ring-[#990202] text-[14px] bg-white transition-all text-gray-900`}
                      />
                      {errors.name && <p className="absolute -bottom-5 left-1 text-[11px] text-red-500 font-medium">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-gray-900 mb-2 block">Nama Bisnis / Perusahaan</label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Mis. PT Maju Bersama"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#990202] focus:ring-1 focus:ring-[#990202] text-[14px] bg-white transition-all text-gray-900"
                      />
                    </div>
                  </div>

                  {/* Email + WA */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="text-[13px] font-bold text-gray-900 mb-2 block">Email*</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="nama@email.com"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-[#990202] focus:ring-1 focus:ring-[#990202] text-[14px] bg-white transition-all text-gray-900`}
                      />
                      {errors.email && <p className="absolute -bottom-5 left-1 text-[11px] text-red-500 font-medium">{errors.email}</p>}
                    </div>
                    <div className="relative">
                      <label className="text-[13px] font-bold text-gray-900 mb-2 block">No. WhatsApp*</label>
                      <input
                        type="tel"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="0812-3456-7890"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.whatsapp ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-[#990202] focus:ring-1 focus:ring-[#990202] text-[14px] bg-white transition-all text-gray-900`}
                      />
                      {errors.whatsapp && <p className="absolute -bottom-5 left-1 text-[11px] text-red-500 font-medium">{errors.whatsapp}</p>}
                    </div>
                  </div>

                  {/* Topik */}
                  <div className="relative">
                    <label className="text-[13px] font-bold text-gray-900 mb-2 block">
                      Topik Konsultasi*
                    </label>
                    <div className="relative">
                      <select
                        name="topic"
                        required
                        value={formData.topic}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.topic ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-[#990202] focus:ring-1 focus:ring-[#990202] text-[14px] bg-white transition-all appearance-none cursor-pointer text-gray-700`}
                      >
                        <option value="" disabled>Pilih Topik Konsultasi</option>
                        <option value="Pendirian PT / CV">Pendirian PT / CV</option>
                        <option value="Pendaftaran Merek & HAKI">Pendaftaran Merek & HAKI</option>
                        <option value="NIB, OSS RBA & KBLI">NIB, OSS RBA & KBLI</option>
                        <option value="Sertifikasi ISO">Sertifikasi ISO</option>
                        <option value="Pengajuan PKP">Pengajuan PKP</option>
                        <option value="Visa & KITAS">Visa & KITAS</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                    {errors.topic && <p className="absolute -bottom-5 left-1 text-[11px] text-red-500 font-medium">{errors.topic}</p>}
                  </div>

                  {/* Pesan */}
                  <div className="relative">
                    <label className="text-[13px] font-bold text-gray-900 mb-2 block">Pesan / Pertanyaan*</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Ceritakan kebutuhan legalitas bisnis Anda — kami akan bantu rekomendasikan solusi yang sesuai."
                      className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-[#990202] focus:ring-1 focus:ring-[#990202] text-[14px] bg-white transition-all text-gray-900 resize-none leading-relaxed`}
                    />
                    {errors.message && <p className="absolute -bottom-5 left-1 text-[11px] text-red-500 font-medium">{errors.message}</p>}
                  </div>

                  {/* Consent Text Statement */}
                  <div className="text-[13px] text-gray-500 leading-relaxed mt-6">
                    Saya setuju data yang saya kirim akan diproses sesuai{" "}
                    <Link href="/" className="text-[#990202] font-semibold underline hover:text-[#800000]">
                      Kebijakan Privasi
                    </Link>{" "}
                    EasyLegal.id.
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[15px] rounded-xl shadow-sm hover:shadow transition-all duration-200 flex justify-center items-center gap-2 group cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Mengirim...</span>
                      </>
                    ) : (
                      <>
                        <span>Kirim Pertanyaan</span>
                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Respons cepat card */}
              <div className="bg-[#EBF7EE] border border-[#D2ECD6] rounded-2xl p-5 flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-[#0F763E] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[#0F763E]">Respons cepat</div>
                  <div className="text-[12px] text-[#1E5C39] font-medium mt-0.5">Rata-rata kurang dari 5 menit via WhatsApp.</div>
                </div>
              </div>

              {/* Jam Operasional */}
              <div className="bg-white shadow-md border border-black/[0.04] rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-5">
                  <Clock className="w-5 h-5 text-[#990202]" />
                  <span className="text-[15px] font-bold text-gray-900">Jam Operasional</span>
                </div>
                
                <div className="space-y-0 text-[13.5px] text-gray-600 font-medium">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span>Senin – Jumat</span>
                    <span className="text-gray-900 font-semibold">08:00 – 20:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span>Sabtu</span>
                    <span className="text-gray-900 font-semibold">09:00 – 17:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span>Minggu & Libur</span>
                    <span className="text-[#990202] font-semibold">Tutup</span>
                  </div>
                </div>
              </div>

              {/* Kantor Pusat */}
              <div className="bg-white shadow-md border border-black/[0.04] rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-5 h-5 text-[#990202]" />
                  <span className="text-[15px] font-bold text-gray-900">Kantor Pusat</span>
                </div>
                <p className="text-[13.5px] text-gray-500 leading-relaxed pl-8">
                  Jl. Asia Afrika No. 1, Sumur Bandung, Kota Bandung, Jawa Barat 40111
                </p>
                <div className="mt-5 pl-8">
                  <Link
                    href="/tentang-kami"
                    className="inline-flex items-center text-[13px] font-extrabold text-[#990202] hover:text-[#800000] gap-1 group transition-all duration-200"
                  >
                    <span>Lihat semua kantor</span>
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 4. KANTOR KAMI ─── */}
      <Offices
        title="Kantor Kami"
        subtitle="Kunjungi kami di 3 kota."
        description="Walaupun proses 100% online, kantor fisik kami terbuka untuk konsultasi tatap muka."
      />

      {/* ─── 5. FAQ ACCORDION ─── */}
      <FAQ items={faqs} />

      {/* Toast notification */}
      {formSubmitted && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-down">
          <div className="bg-white shadow-sm border border-black/[0.03] rounded-2xl p-5 shadow-2xl max-w-xs flex items-start space-x-3 relative">
            <button onClick={closeToast} className="absolute top-3 right-3 p-1 rounded-full hover:bg-bg-light text-muted">
              <X className="w-4 h-4" />
            </button>
            <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-dark mb-1">Pertanyaan Dikirim!</div>
              <p className="text-[11.5px] text-muted leading-relaxed">
                Tim kami akan menghubungi <strong>{submittedName}</strong> secepatnya.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
