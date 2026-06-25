"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Check,
  Building,
  Clock,
  Home,
  Zap,
  Star,
  CheckCircle,
  TrendingUp,
  FileText,
  User,
  BookOpen,
  Compass,
  Shield,
  DollarSign,
  CreditCard,
  MapPin,
  AlertCircle,
  UploadCloud,
  Briefcase,
  Clipboard,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import FAQ from "@/components/FAQ";
import { getWhatsAppLink } from "@/lib/config";

export default function PengajuanPkp() {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const faqs = [
    {
      q: "Kapan saya harus daftar PKP?",
      a: "Wajib daftar PKP jika omset bruto bisnis Anda <strong class=\"font-extrabold text-gray-900\">melebihi Rp 4,8 miliar dalam 1 tahun pajak</strong>. Pendaftaran harus dilakukan paling lambat <strong class=\"font-extrabold text-gray-900\">30 hari</strong> setelah lewat batas tersebut. Jika tidak, Anda bisa kena sanksi administratif & denda. Untuk omset di bawah Rp 4,8 miliar, daftar bersifat <strong class=\"font-extrabold text-gray-900\">sukarela</strong> — bisa Anda pilih kalau memang menguntungkan (misal karena banyak transaksi B2B)."
    },
    {
      q: "Berapa lama proses pendaftaran PKP?",
      a: "Proses verifikasi berkisar antara <strong class=\"font-extrabold text-gray-950\">3 hingga 7 hari kerja</strong> setelah seluruh berkas persyaratan perpajakan diserahkan secara lengkap ke Kantor Pelayanan Pajak (KPP) terkait."
    },
    {
      q: "Apa beda PKP vs Non-PKP?",
      a: "Perbedaan utama adalah pada <strong class=\"font-extrabold text-gray-950\">pemungutan PPN</strong>. Perusahaan PKP wajib memungut PPN dari pembeli dan menerbitkan e-Faktur, serta dapat mengkreditkan PPN masukan dari supplier. Sedangkan Non-PKP tidak boleh memungut PPN dan tidak bisa menerbitkan e-Faktur."
    },
    {
      q: "Apa itu survei PKP & kenapa harus dilakukan?",
      a: "Survei PKP adalah verifikasi lapangan oleh petugas pajak (KPP) ke alamat domisili usaha. Tujuannya untuk memastikan <strong class=\"font-extrabold text-gray-950\">kebenaran keberadaan usaha</strong> dan melihat apakah alamat serta aktivitas usaha sesuai dengan dokumen yang diajukan sebelum aktivasi e-Faktur disetujui."
    },
    {
      q: "Apakah usaha online (e-commerce) bisa daftar PKP?",
      a: "Sangat bisa. Selama Anda memiliki badan usaha (PT/CV) atau terdaftar sebagai WP perorangan dengan domisili usaha yang jelas, Anda berhak mengajukan PKP untuk dapat menerbitkan faktur pajak kepada pelanggan korporat Anda."
    },
    {
      q: "Setelah jadi PKP, apa kewajiban saya?",
      a: "Setelah berstatus PKP, perusahaan wajib menerbitkan Faktur Pajak resmi (e-Faktur) atas penyerahan barang/jasa kena pajak, memungut PPN dari pembeli, dan wajib melaporkan SPT Masa PPN secara bulanan paling lambat akhir bulan berikutnya."
    },
    {
      q: "Apakah pengajuan saya pasti disetujui DJP?",
      a: "Persetujuan sepenuhnya merupakan kewenangan KPP setempat berdasarkan kelengkapan berkas fisik dan hasil survei lapangan. Namun, dengan layanan EasyLegal, kami memastikan seluruh <strong class=\"font-extrabold text-gray-950\">dokumen dan persyaratan valid</strong> sebelum diajukan, sehingga persentase keberhasilan sangat tinggi."
    }
  ];

  return (
    <div className="has-service-cta flex flex-col min-h-screen">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-8 sm:py-20 border-b border-gray-200/40 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-[11px] sm:text-[11px] sm:text-[13px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-gray-500 font-medium">Layanan</span>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[13px] font-bold text-gray-900">Pengukuhan PKP</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1 px-3 sm:py-1.5 sm:px-3.5 rounded-full border border-red-100/60 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[10px] sm:text-[10px] sm:text-[12.5px] font-bold text-[#990202] tracking-wide">Pajak Perusahaan · e-Faktur</span>
              </div>

              {/* Headline */}
              <h1 className="font-inter text-[26px] sm:text-[50px] lg:text-[56px] font-extrabold text-gray-950 leading-[1.12] tracking-tight">
                Pengurusan PKP resmi,<br />
                <span className="text-[#990202]">cepat & bergaransi.</span>
              </h1>

              {/* Description */}
              <p className="text-[15.5px] sm:text-[16px] text-gray-500 leading-relaxed max-w-2xl font-medium">
                Dapatkan status Pengusaha Kena Pajak (PKP) resmi untuk menerbitkan Faktur Pajak, bertransaksi dengan korporasi/BUMN, dan memenangkan tender besar perpajakan. Mulai Rp 1.499.000.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-row gap-3 pt-2">
                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya tertarik ingin berkonsultasi mengenai layanan pengukuhan PKP perusahaan.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center flex-1 sm:flex-initial text-center justify-center px-4 sm:px-7 py-3 sm:py-4 bg-[#990202] text-white font-bold text-[12px] sm:text-[15px] rounded-xl hover:bg-[#800000] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer group"
                >
                  <span>Konsultasi Gratis</span>
                  <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <a
                  href="#paket-harga"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center flex-1 sm:flex-initial text-center justify-center px-4 sm:px-7 py-3 sm:py-4 border border-gray-200 text-gray-800 font-bold text-[12px] sm:text-[15px] rounded-xl hover:bg-gray-55 hover:border-gray-305 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer bg-white"
                >
                  Lihat Paket Harga
                </a>
              </div>

              {/* Features Row */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-8 border-t border-gray-100 max-w-[580px]">
                
                {/* Info 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-[#FFF5F5] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[13.5px] font-black text-gray-950 leading-tight">3-7 hari</p>
                    <p className="text-[11px] font-bold text-gray-400">Lama proses</p>
                  </div>
                </div>

                {/* Info 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-[#FFF5F5] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <span className="text-[16px] font-black leading-none">%</span>
                  </div>
                  <div>
                    <p className="text-[13.5px] font-black text-gray-950 leading-tight">Faktur Pajak</p>
                    <p className="text-[11px] font-bold text-gray-400">Siap terbitkan</p>
                  </div>
                </div>

                {/* Info 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-[#FFF5F5] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13.5px] font-black text-gray-950 leading-tight">100% Lolos</p>
                    <p className="text-[11px] font-bold text-gray-400">Survey KPP pajak</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Hero Graphic/Stats */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/3]">
                
                {/* Photo container */}
                <div className="w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative bg-gray-55">
                  <Image
                    src="/cerita-kami-team.webp"
                    alt="EasyLegal Tax Consultants"
                    fill
                    sizes="(max-width: 768px) 100vw, 460px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Overlay Badge 1: Top-Left */}
                <div className="absolute -top-4 -left-6 sm:-left-10 bg-white rounded-2xl p-3 sm:p-4 shadow-xl flex items-center gap-3 z-20">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-red-50 text-[#990202] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg>
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[12.5px] font-black text-gray-950">SPPKP Terbit</p>
                    <p className="text-[10px] font-bold text-gray-400">Resmi Ditjen Pajak</p>
                  </div>
                </div>

                {/* Overlay Badge 2: Bottom-Right */}
                <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white rounded-2xl p-3 sm:p-4 shadow-xl flex items-center gap-3 z-20">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[12.5px] font-black text-gray-950">e-Faktur Aktif</p>
                    <p className="text-[10px] font-bold text-gray-400">Siap transaksi</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. APA ITU PKP & PENGUKUHAN PENGUSAHA KENA PAJAK ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          {/* Header */}
          <div className="text-left mb-8 sm:mb-16 space-y-3">
            <p className="text-[12px] font-black text-[#990202] uppercase tracking-[0.2em]">PENGERTIAN PKP & PPN</p>
            <h2 className="font-inter text-[32px] sm:text-[40px] font-extrabold text-gray-950 leading-tight tracking-tight">
              Apa itu Pengusaha Kena Pajak (PKP)?
            </h2>
            <p className="text-[15px] text-gray-500 leading-relaxed font-medium">
              Sebelum mulai, kenali dulu sistem PKP & PPN yang berlaku di Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Mockup Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/3]">
                {/* Photo container */}
                <div className="w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative bg-gray-55">
                  <Image
                    src="/nib-desk-mockup.webp"
                    alt="Tax Consultation Desk Documents"
                    fill
                    sizes="(max-width: 768px) 100vw, 460px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Law Info Badge */}
                <div className="absolute bottom-4 left-4 bg-white rounded-2xl p-3 shadow-md flex items-center gap-3 z-20">
                  <div className="w-9 h-9 bg-[#990202] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[12px] font-bold text-gray-900">Dasar Hukum</p>
                    <p className="text-[9.5px] font-medium text-gray-500">UU No. 42 Tahun 2009 tentang PPN</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Side: Redesigned Description Cards */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Card 1: Pengertian PKP */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-200 text-left space-y-3">
                <div className="flex items-center gap-2.5 text-[#990202]">
                  <User className="w-4.5 h-4.5" />
                  <h4 className="text-[12px] font-extrabold tracking-wider uppercase">PENGERTIAN PKP</h4>
                </div>
                <p className="text-[11px] sm:text-[11px] sm:text-[13.5px] text-gray-500 leading-relaxed font-medium">
                  <strong className="font-bold text-gray-900">PKP (Pengusaha Kena Pajak)</strong> adalah status pengusaha — perorangan maupun badan — yang melakukan penyerahan Barang/Jasa Kena Pajak. PKP <strong className="font-bold text-gray-900">wajib memungut, menyetor, dan melaporkan PPN</strong> kepada negara melalui sistem DJP.
                </p>
              </div>

              {/* Card 2: Pengertian PPN */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-200 text-left space-y-3">
                <div className="flex items-center gap-2.5 text-[#990202]">
                  <DollarSign className="w-4.5 h-4.5" />
                  <h4 className="text-[12px] font-extrabold tracking-wider uppercase">PENGERTIAN PPN</h4>
                </div>
                <p className="text-[11px] sm:text-[11px] sm:text-[13.5px] text-gray-500 leading-relaxed font-medium">
                  <strong className="font-bold text-gray-900">PPN (Pajak Pertambahan Nilai)</strong> adalah pajak konsumsi yang dikenakan pada barang/jasa yang diserahkan. Tarif PPN saat ini <strong className="font-bold text-gray-900">11%</strong> (akan jadi 12% mulai 2026). PKP wajib menerbitkan <strong className="font-bold text-gray-900">e-Faktur</strong> untuk setiap transaksi kena PPN.
                </p>
              </div>

              {/* Card 3: Kewajiban Wajib Pajak */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-200 text-left space-y-3">
                <div className="flex items-center gap-2.5 text-[#990202]">
                  <Clock className="w-4.5 h-4.5" />
                  <h4 className="text-[12px] font-extrabold tracking-wider uppercase">KEWAJIBAN WAJIB PAJAK</h4>
                </div>
                <p className="text-[11px] sm:text-[11px] sm:text-[13.5px] text-gray-500 leading-relaxed font-medium">
                  Setelah jadi PKP, Anda wajib: <strong className="font-bold text-gray-900">(1) memungut PPN</strong> dari pelanggan, <strong className="font-bold text-gray-900">(2) menerbitkan e-Faktur</strong> untuk setiap transaksi, <strong className="font-bold text-gray-900">(3) melaporkan SPT Masa PPN</strong> setiap bulan, dan <strong className="font-bold text-gray-900">(4) menyetorkan PPN</strong> ke kas negara tepat waktu.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. WAJIB VS SUKARELA ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">KAPAN DAFTAR PKP?</p>
            <h2 className="font-inter text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Wajib vs Sukarela.
            </h2>
            <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Pendaftaran PKP bisa wajib (jika omset sudah memenuhi syarat) atau sukarela (kalau ingin klaim PPN masukan).
            </p>
          </div>

          {/* 2 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[960px] mx-auto items-stretch">
            
            {/* Card 1: Wajib Daftar (Border Red Accent) */}
            <div className="bg-white rounded-3xl p-8 border-[2px] border-[#990202] shadow-[0_12px_45px_rgba(153,2,2,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left space-y-6">
              <div className="space-y-5">
                {/* Tag */}
                <div className="bg-[#990202] text-white py-1 px-3 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
                  <Clock className="w-3 h-3" />
                  <span>WAJIB DAFTAR</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm sm:text-[17px] sm:text-[22px] font-black text-gray-950">Omset &gt; Rp 4,8 Miliar/Tahun</h3>
                  <p className="text-[11px] sm:text-[11px] sm:text-[13.5px] text-gray-500 leading-relaxed font-medium">
                    Sesuai PMK 197/2013, pengusaha dengan omset bruto melebihi <strong className="font-extrabold text-gray-900">Rp 4,8 Miliar dalam 1 tahun pajak</strong> wajib didaftarkan sebagai PKP.
                  </p>
                </div>

                {/* Checklist */}
                <ul className="space-y-3 pt-2">
                  {[
                    "Wajib daftar dalam 30 hari setelah lewat batas",
                    "Denda jika telat: 2% dari PPN tertunggak",
                    "Berlaku untuk perorangan & badan usaha"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-[13px] font-semibold text-gray-800 leading-relaxed">
                      <span className="text-[#990202] text-[15px] font-black mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card 2: Sukarela (Gray Border) */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left space-y-6">
              <div className="space-y-5">
                {/* Tag */}
                <div className="bg-gray-100 text-gray-500 py-1 px-3 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 w-fit">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span>SUKARELA</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm sm:text-[17px] sm:text-[22px] font-black text-gray-950">Omset di Bawah Rp 4,8 Miliar</h3>
                  <p className="text-[11px] sm:text-[11px] sm:text-[13.5px] text-gray-500 leading-relaxed font-medium">
                    Pengusaha kecil bisa <strong className="font-extrabold text-gray-900">daftar sukarela</strong> agar bisa keluarkan e-Faktur &amp; klaim PPN masukan — strategi bagus jika klien Anda adalah PKP juga.
                  </p>
                </div>

                {/* Checklist */}
                <ul className="space-y-3 pt-2">
                  {[
                    "Bisa ikut tender pemerintah & korporasi besar",
                    "Bisa kreditkan PPN masukan dari supplier",
                    "Meningkatkan kredibilitas bisnis Anda"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-[13px] font-semibold text-gray-800 leading-relaxed">
                      <span className="text-[#990202] text-[15px] font-black mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3.5. BENEFITS SECTION (Kenapa daftar PKP penting) ─── */}
      <section className="bg-[#FAF9F9] py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">MANFAAT JADI PKP</p>
            <h2 className="font-inter text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Kenapa daftar PKP penting untuk bisnis Anda?
            </h2>
            <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Status PKP membuka akses ke pasar &amp; peluang yang tidak dimiliki non-PKP.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-[1140px] mx-auto items-stretch">
            
            {/* Card 1: Terbitkan Faktur Pajak */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between text-left space-y-5">
              <div className="space-y-4">
                <div className="w-8 h-8 sm:w-11 sm:h-11 bg-[#FFF5F5] text-[#990202] rounded-xl flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-[15.5px] font-bold text-gray-900 leading-tight">Terbitkan Faktur Pajak</h3>
                <p className="text-[12.5px] text-gray-500 leading-relaxed font-medium">
                  Bisa keluarkan e-Faktur resmi untuk setiap transaksi — wajib untuk B2B dengan klien korporat.
                </p>
              </div>
            </div>

            {/* Card 2: Klaim PPN Masukan */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between text-left space-y-5">
              <div className="space-y-4">
                <div className="w-8 h-8 sm:w-11 sm:h-11 bg-[#FFF5F5] text-[#990202] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-[15.5px] font-bold text-gray-900 leading-tight">Klaim PPN Masukan</h3>
                <p className="text-[12.5px] text-gray-500 leading-relaxed font-medium">
                  PPN yang Anda bayar ke supplier bisa dikreditkan — hemat cash flow signifikan untuk bisnis dengan banyak vendor.
                </p>
              </div>
            </div>

            {/* Card 3: Win Tender Korporat */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between text-left space-y-5">
              <div className="space-y-4">
                <div className="w-8 h-8 sm:w-11 sm:h-11 bg-[#FFF5F5] text-[#990202] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-[15.5px] font-bold text-gray-900 leading-tight">Win Tender Korporat</h3>
                <p className="text-[12.5px] text-gray-500 leading-relaxed font-medium">
                  Banyak tender pemerintah &amp; BUMN mensyaratkan supplier sudah berstatus PKP untuk verifikasi pajak.
                </p>
              </div>
            </div>

            {/* Card 4: Kredibilitas Bisnis */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between text-left space-y-5">
              <div className="space-y-4">
                <div className="w-8 h-8 sm:w-11 sm:h-11 bg-[#FFF5F5] text-[#990202] rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-[15.5px] font-bold text-gray-900 leading-tight">Kredibilitas Bisnis</h3>
                <p className="text-[12.5px] text-gray-500 leading-relaxed font-medium">
                  Status PKP menunjukkan bisnis Anda matang, taat pajak, &amp; siap bekerjasama dengan perusahaan besar.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3.75. DOKUMEN PERSYARATAN ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">DOKUMEN PERSYARATAN</p>
            <h2 className="font-inter text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Yang perlu Anda siapkan.
            </h2>
            <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Berikut dokumen yang dibutuhkan untuk pendaftaran PKP. Tim kami akan memandu pengumpulan &amp; verifikasi sebelum diajukan ke KPP.
            </p>
          </div>

          {/* Grid 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[960px] mx-auto mb-8">
            
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-start gap-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-[#FFF5F5] text-[#990202] rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-left">
                <h3 className="text-[14px] font-bold text-gray-900 leading-tight">Akta Pendirian Perusahaan</h3>
                <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed">
                  Akta notaris pendirian PT/CV beserta SK Kemenkumham &amp; akta perubahan terakhir.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-start gap-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-[#FFF5F5] text-[#990202] rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-left">
                <h3 className="text-[14px] font-bold text-gray-900 leading-tight">NPWP Perusahaan &amp; Direktur</h3>
                <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed">
                  Kartu NPWP badan usaha &amp; NPWP direktur/pemilik (untuk PT perorangan).
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-start gap-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-[#FFF5F5] text-[#990202] rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-left">
                <h3 className="text-[14px] font-bold text-gray-900 leading-tight">KTP Direktur / Pemilik</h3>
                <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed">
                  Fotokopi KTP yang masih berlaku dari seluruh direktur &amp; komisaris.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-start gap-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-[#FFF5F5] text-[#990202] rounded-lg flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-left">
                <h3 className="text-[14px] font-bold text-gray-900 leading-tight">Bukti Kepemilikan / Sewa Kantor</h3>
                <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed">
                  Sertifikat / PBB / surat sewa kantor + surat keterangan domisili dari kelurahan.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-start gap-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-[#FFF5F5] text-[#990202] rounded-lg flex items-center justify-center flex-shrink-0">
                <Clipboard className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-left">
                <h3 className="text-[14px] font-bold text-gray-900 leading-tight">NIB / SIUP</h3>
                <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed">
                  Nomor Induk Berusaha (NIB) dari OSS RBA atau SIUP lama (jika belum punya NIB).
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-start gap-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-[#FFF5F5] text-[#990202] rounded-lg flex items-center justify-center flex-shrink-0">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-left">
                <h3 className="text-[14px] font-bold text-gray-900 leading-tight">Laporan Keuangan Terbaru</h3>
                <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed">
                  Neraca, laba/rugi, &amp; daftar piutang/utang dari periode terakhir.
                </p>
              </div>
            </div>

            {/* Card 7 */}
            <div className="bg-white rounded-xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-start gap-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-[#FFF5F5] text-[#990202] rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-left">
                <h3 className="text-[14px] font-bold text-gray-900 leading-tight">Foto Kantor &amp; Kegiatan Usaha</h3>
                <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed">
                  Foto tampak depan kantor, ruang kerja, papan nama, &amp; aktivitas operasional.
                </p>
              </div>
            </div>

            {/* Card 8 */}
            <div className="bg-white rounded-xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-start gap-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-[#FFF5F5] text-[#990202] rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-left">
                <h3 className="text-[14px] font-bold text-gray-900 leading-tight">Koordinat Lokasi (Google Maps)</h3>
                <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed">
                  Titik koordinat lokasi kantor untuk verifikasi survei lapangan oleh petugas DJP.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Alert Note */}
          <div className="max-w-[960px] mx-auto bg-[#FFF5F5] rounded-xl p-5 border border-red-100 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#990202] flex-shrink-0 mt-0.5" />
            <p className="text-[13px] text-gray-700 font-medium leading-relaxed text-left">
              <strong className="font-bold text-gray-900">Tidak perlu repot urus sendiri.</strong> Tim kami akan kirim checklist lengkap &amp; bantu verifikasi setiap dokumen sebelum diajukan, sehingga peluang disetujui DJP maksimal. Dokumen kurang? Kami pandu cara melengkapinya.
            </p>
          </div>

        </div>
      </section>

      {/* ─── 4. PRICING SECTION ─── */}
      <section id="paket-harga" className="bg-[#FAF9F9] py-8 sm:py-8 sm:py-20 border-b border-gray-200/40 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">BIAYA JASA DAFTAR PKP</p>
            <h2 className="font-inter text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              2 paket sesuai lokasi kantor Anda.
            </h2>
            <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 font-medium leading-relaxed">
              Harga sudah include konsultasi, pendaftaran, pendampingan survei DJP, sampai aktivasi e-Faktur. Tanpa tambahan biaya apapun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[860px] mx-auto items-stretch">
            
            {/* Paket 1: PKP PULAU JAWA */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[16px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full justify-between border-[2.5px] border-[#990202] shadow-[0_20px_50px_rgba(0,0,0,0.045)] group-hover:shadow-[0_20px_50px_rgba(153,2,2,0.12)] transition-all duration-300">
                <div>
                  {/* Header */}
                  <div className="bg-[#990202] px-4 py-5 sm:px-6 sm:py-8 text-center text-white relative">
                    <div className="absolute top-0 left-0 right-0 bg-[#7a0101] text-white text-[9px] font-bold tracking-widest uppercase px-4 py-1.5 flex justify-center w-full">
                      PALING POPULER
                    </div>
                    <h3 className="text-[11.5px] sm:text-[14px] font-black tracking-widest text-white/90 mt-4 uppercase">PKP PULAU JAWA</h3>
                    <div className="mt-4 text-[12px] text-white/60 line-through">Rp 3.000.000</div>
                    <div className="mt-0.5 text-[32px] font-black flex items-start justify-center gap-1">
                      <span className="text-[16px] mt-2">Rp</span>
                      <span>1.499.000</span>
                    </div>
                    <p className="text-[10px] font-bold text-white/70 uppercase mt-2 tracking-widest">TANPA TAMBAHAN BIAYA APAPUN</p>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 space-y-6">
                    {/* Yang Diperoleh */}
                    <div className="space-y-4 text-left">
                      <h4 className="text-[12px] font-black text-[#990202] tracking-wider uppercase">YANG DIPEROLEH</h4>
                      <ul className="space-y-3">
                        {[
                          "Konsultasi tentang PKP / PPN",
                          "Pengecekan status wajib pajak",
                          "Pendaftaran PKP ke DJP",
                          "Persiapan & korespondensi survei PKP",
                          "Pendampingan sertifikat elektronik",
                          "Aktivasi e-Faktur"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start text-[13.5px] font-medium text-gray-700 leading-relaxed">
                            <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bonus */}
                    <div className="bg-gray-55 rounded-xl p-5 space-y-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-left">
                      <h4 className="text-[12px] font-black text-gray-900 tracking-wider uppercase">BONUS</h4>
                      <ul className="space-y-2.5">
                        <li className="flex items-start text-[13px] font-medium text-gray-700 leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                          <span>Layanan Personal Legal Assistance</span>
                        </li>
                        <li className="flex items-start text-[13px] font-medium text-gray-700 leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                          <span><strong className="font-bold text-gray-900">1 Kupon</strong> Undian iPhone</span>
                        </li>
                      </ul>
                    </div>

                    {/* Extra Bonus */}
                    <div className="bg-gray-55 rounded-xl p-5 space-y-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-left">
                      <h4 className="text-[12px] font-black text-gray-900 tracking-wider uppercase">EXTRA BONUS</h4>
                      <ul className="space-y-2.5">
                        <li className="flex items-start text-[13px] font-medium text-gray-700 leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                          <span>Voucher EasyLegal <strong className="font-bold text-gray-900">Rp 250.000</strong></span>
                        </li>
                        <li className="flex items-start text-[13px] font-medium text-gray-700 leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                          <span>Dokumen SOP Karyawan</span>
                        </li>
                        <li className="flex items-start text-[13px] font-medium text-gray-700 leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                          <span>Dokumen SOP Perusahaan</span>
                        </li>
                        <li className="flex items-start text-[13px] font-medium text-gray-700 leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                          <span>Dokumen Kontrak Bisnis</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Footer Button */}
                <div className="p-8 pt-0">
                  <a
                    href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket PKP Pulau Jawa.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 text-center font-bold text-[14px] text-white bg-[#990202] hover:bg-[#800000] rounded-xl transition-all duration-200 shadow-sm"
                  >
                    Pilih PKP Pulau Jawa
                  </a>
                </div>
              </div>
            </div>

            {/* Paket 2: PKP LUAR JAWA */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[16px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full justify-between border border-gray-200 shadow-[0_4px_25px_rgba(0,0,0,0.01)] group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300">
                <div>
                  {/* Header */}
                  <div className="bg-[#1A1A1A] px-4 py-5 sm:px-6 sm:py-8 text-center text-white relative">
                    <h3 className="text-[11.5px] sm:text-[14px] font-black tracking-widest text-white/90 mt-4 uppercase">PKP LUAR JAWA</h3>
                    <div className="mt-4 text-[12px] text-white/60 line-through">Rp 4.000.000</div>
                    <div className="mt-0.5 text-[32px] font-black flex items-start justify-center gap-1">
                      <span className="text-[16px] mt-2">Rp</span>
                      <span>1.999.000</span>
                    </div>
                    <p className="text-[10px] font-bold text-white/70 uppercase mt-2 tracking-widest">TANPA TAMBAHAN BIAYA APAPUN</p>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 space-y-6">
                    {/* Yang Diperoleh */}
                    <div className="space-y-4 text-left">
                      <h4 className="text-[12px] font-black text-[#990202] tracking-wider uppercase">YANG DIPEROLEH</h4>
                      <ul className="space-y-3">
                        {[
                          "Konsultasi tentang PKP / PPN",
                          "Pengecekan status wajib pajak",
                          "Pendaftaran PKP ke DJP",
                          "Persiapan & korespondensi survei PKP",
                          "Pendampingan sertifikat elektronik",
                          "Aktivasi e-Faktur"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start text-[13.5px] font-medium text-gray-700 leading-relaxed">
                            <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bonus */}
                    <div className="bg-gray-55 rounded-xl p-5 space-y-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-left">
                      <h4 className="text-[12px] font-black text-gray-900 tracking-wider uppercase">BONUS</h4>
                      <ul className="space-y-2.5">
                        <li className="flex items-start text-[13px] font-medium text-gray-700 leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                          <span>Layanan Personal Legal Assistance</span>
                        </li>
                        <li className="flex items-start text-[13px] font-medium text-gray-700 leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                          <span><strong className="font-bold text-gray-900">1 Kupon</strong> Undian iPhone</span>
                        </li>
                      </ul>
                    </div>

                    {/* Extra Bonus */}
                    <div className="bg-gray-55 rounded-xl p-5 space-y-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-left">
                      <h4 className="text-[12px] font-black text-gray-900 tracking-wider uppercase">EXTRA BONUS</h4>
                      <ul className="space-y-2.5">
                        <li className="flex items-start text-[13px] font-medium text-gray-700 leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                          <span>Voucher EasyLegal <strong className="font-bold text-gray-900">Rp 250.000</strong></span>
                        </li>
                        <li className="flex items-start text-[13px] font-medium text-gray-700 leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                          <span>Dokumen SOP Karyawan</span>
                        </li>
                        <li className="flex items-start text-[13px] font-medium text-gray-700 leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                          <span>Dokumen SOP Perusahaan</span>
                        </li>
                        <li className="flex items-start text-[13px] font-medium text-gray-700 leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                          <span>Dokumen Kontrak Bisnis</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Footer Button */}
                <div className="p-8 pt-0">
                  <a
                    href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket PKP Luar Jawa.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 text-center font-bold text-[14px] text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 shadow-sm"
                  >
                    Pilih PKP Luar Jawa
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Footnote disclaimers */}
          <div className="max-w-[860px] mx-auto mt-5 sm:mt-10 bg-[#FAF9F9] border border-gray-200/80 rounded-2xl p-6 text-[12px] text-gray-500 leading-relaxed font-medium text-left">
            <strong className="font-extrabold text-gray-800 mr-1.5">Keterangan:</strong>
            <span>Perbedaan harga karena KPP di luar Pulau Jawa membutuhkan biaya akomodasi tambahan untuk pendampingan survei lapangan. <strong className="font-bold text-gray-700">Persetujuan &amp; pengesahan PKP sepenuhnya berada di bawah kewenangan KPP setempat</strong> — kami mendampingi proses, namun keputusan akhir ada di tangan petugas DJP.</span>
          </div>

        </div>
      </section>

      {/* ─── 5. FAQ SECTION ─── */}
      <FAQ title="Pertanyaan seputar pendaftaran PKP." subtitle="Belum yakin? Mungkin jawabannya ada di sini." items={faqs} />

      {/* ─── 6. CTA BANNER (Mockup Clean White) ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-t border-gray-100/60 relative">
        <div className="max-w-[1140px] mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          
          {/* Left Column */}
          <div className="space-y-4 max-w-2xl text-left">
            <h2 className="font-inter text-[20px] sm:text-[40px] font-bold leading-tight tracking-tight text-gray-900">
              Siap jadi <span className="text-[#990202]">PKP resmi?</span>
            </h2>
            <p className="text-[12.5px] sm:text-[16px] text-gray-500 leading-relaxed font-medium">
              Konsultasi gratis untuk cek status pajak &amp; rekomendasi paket — tanpa komitmen.
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-auto flex flex-col gap-3 min-w-[340px] sm:min-w-[360px]">
            {/* Button WhatsApp */}
            <a
              href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Jasa Pengurusan PKP perusahaan.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[14.5px] rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.122.953 11.5.953c-5.439 0-9.859 4.37-9.864 9.8-.001 1.73.457 3.41 1.32 4.927l-.982 3.58 3.673-.956zm11.517-5.595c-.3-.15-1.774-.875-2.048-.975-.274-.1-.474-.15-.674.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.463.13-.612.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.625-.924-2.225-.244-.588-.491-.508-.674-.518-.174-.01-.374-.012-.574-.012-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.116 4.52 1.228.531 2.186.848 2.93 1.083.755.238 1.44.205 1.984.124.606-.091 1.774-.725 2.024-1.425.25-.7.25-1.299.175-1.425-.076-.125-.275-.2-.575-.35z"/>
              </svg>
              <span>Konsultasi via WhatsApp</span>
            </a>

            {/* Button Hubungi Tim Kami */}
            <a
              href={getWhatsAppLink("Halo EasyLegal, saya tertarik ingin konsultasi mengenai layanan pengukuhan PKP perusahaan.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-55 text-gray-800 border border-gray-200 hover:border-gray-300 font-extrabold text-[14.5px] rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              <span>Hubungi Tim Kami</span>
              <span className="text-[15px] font-normal">→</span>
            </a>

            {/* Fast Response Badge */}
            <div className="flex items-center gap-1.5 text-[12px] text-gray-500 font-medium pt-1 px-1">
              <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Respons dalam 5 menit · Senin–Sabtu 08:00–20:00</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
