"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Check,
  Clock,
  Home,
  TrendingUp,
  ChevronRight,
  FileText
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import FAQ from "@/components/FAQ";
import Offices from "@/components/Offices";
import MediaCoverage from "@/components/MediaCoverage";
import TrustStatsBar from "@/components/TrustStatsBar";
import BottomPromoSection from "@/components/home/BottomPromoSection";
import IsoPseBadges from "@/components/IsoPseBadges";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/home/Testimonials";
import { getWhatsAppLink } from "@/lib/config";

const aktaBenefits = [
  {
    icon: <ShieldCheck className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Perubahan Pengurus (RUPS)",
    desc: "Wajib dilaporkan ke Kemenkumham jika terjadi pergantian direktur, komisaris, atau keluar masuk pemegang saham."
  },
  {
    icon: <Award className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Peningkatan Modal Kerja",
    desc: "Mencatat peningkatan modal disetor untuk keperluan pendanaan proyek besar atau restrukturisasi."
  },
  {
    icon: <TrendingUp className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Penyelarasan KBLI Baru",
    desc: "Menambah kategori bidang usaha baru pada akta agar bisa menerbitkan izin operasional baru di OSS."
  }
];

const faqs = [
  {
    q: "Berapa lama proses pembuatan akta perubahan selesai?",
    a: "Proses penyusunan draft hingga akta notaris ditandatangani dan mendapat persetujuan Kemenkumham rata-rata membutuhkan waktu 3 hingga 5 hari kerja."
  },
  {
    q: "Apakah seluruh pemegang saham harus hadir saat tanda tangan?",
    a: "Tanda tangan dapat diwakilkan menggunakan Surat Kuasa resmi dari pemegang saham yang tidak dapat hadir, atau melalui sirkuler RUPS."
  }
];

export default function PerubahanAktaPage() {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="has-service-cta flex flex-col min-h-screen">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white py-8 sm:py-20 border-b border-gray-200/40 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-[16px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-gray-500 font-medium">Layanan</span>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[16px] font-bold text-gray-900">Perubahan Akta</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1 px-3 sm:py-1.5 sm:px-3.5 rounded-full border border-red-100/60 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[16px] font-bold text-[#990202] tracking-wide">Biro Jasa Akta · Perubahan Data PT</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-[32px] sm:text-[50px] lg:text-[56px] font-extrabold text-gray-950 leading-[1.12] tracking-tight">
                Urus Perubahan Akta<br />
                <span className="text-[#990202]">PT & CV Kilat.</span>
              </h1>

              {/* Description */}
              <p className="text-[16px] sm:text-[18px] text-gray-500 leading-relaxed max-w-2xl font-medium">
                Ubah susunan pemegang saham, direksi/komisaris, nama perusahaan, alamat domisili, tujuan KBLI, hingga peningkatan modal dasar secara resmi dengan Notaris & Kemenkumham.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-row gap-3 pt-2">
                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai perubahan akta perusahaan.", "ingin-konsultasi-mengenai-perubahan-akta-perusahaan")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center flex-1 sm:flex-initial px-4 sm:px-7 py-3 sm:py-4 bg-[#990202] text-white font-bold text-[16px] rounded-xl hover:bg-[#800000] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer group"
                >
                  <span>Konsultasi Gratis</span>
                  <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <a
                  href="#paket-harga"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center flex-1 sm:flex-initial px-4 sm:px-7 py-3 sm:py-4 shadow-md border border-black/[0.04] text-gray-800 font-bold text-[16px] rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer bg-white"
                >
                  Lihat Paket Harga
                </a>
              </div>

              {/* Features Row */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-8 border-t border-gray-100 max-w-[580px]">
                
                {/* Info 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-[#FFF5F5] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[16px] font-black text-gray-950 leading-tight">Notaris Resmi</p>
                    <p className="text-[14px] font-bold text-gray-400">Berkekuatan Hukum</p>
                  </div>
                </div>

                {/* Info 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-[#FFF5F5] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[16px] font-black text-gray-950 leading-tight">3-5 Hari</p>
                    <p className="text-[14px] font-bold text-gray-400">Proses Cepat AHU</p>
                  </div>
                </div>

                {/* Info 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-[#FFF5F5] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[16px] font-black text-gray-950 leading-tight">SK Kemenkumham</p>
                    <p className="text-[14px] font-bold text-gray-400">Persetujuan Resmi Negara</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Hero Graphic/Stats */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/3]">
                
                {/* Photo container */}
                <div className="w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative bg-gray-50">
                  <Image
                    src="/images/layanan/nib-1.jpg"
                    alt="Penyusunan dokumen perubahan akta"
                    fill
                    sizes="(max-width: 768px) 100vw, 460px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Overlay Badge 1 */}
                <div className="absolute -top-4 -left-6 sm:-left-10 bg-white rounded-2xl p-3 sm:p-4 shadow-xl flex items-center gap-3 z-20">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-red-50 text-[#990202] rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[16px] font-black text-gray-950">Drafting Akta</p>
                    <p className="text-[14px] font-bold text-gray-400">Notaris Cepat</p>
                  </div>
                </div>

                {/* Overlay Badge 2 */}
                <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white rounded-2xl p-3 sm:p-4 shadow-xl flex items-center gap-3 z-20">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[16px] font-black text-gray-950">Terbit SK AHU</p>
                    <p className="text-[14px] font-bold text-gray-400">Legalitas Baru Siap</p>
                  </div>
                </div>
              </div>

              {/* ISO and PSE Badges */}
              <div className="mt-12 flex justify-center w-full relative z-20">
                <IsoPseBadges />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. TRUST SIGNALS & MEDIA COVERAGE ─── */}
      <TrustStatsBar />

      {/* ─── 3. VALUE PROPOSITION ─── */}
      <Benefits sectionTitleTag="KEUNGGULAN KAMI" sectionTitle="Kapan Harus Melakukan Perubahan Akta?" sectionSubtitle="Menyesuaikan legalitas dengan dinamika perkembangan bisnis Anda" items={aktaBenefits} />
      <BottomPromoSection />

      {/* ─── 4. PRICING SECTION ─── */}
      <section id="paket-harga" className="bg-[#FAF9F9] py-8 sm:py-20 border-b border-gray-200/40 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-10">
            <div className="max-w-2xl space-y-2 sm:space-y-3 text-left">
              <p className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">BIAYA PERUBAHAN AKTA</p>
              <h2 className="font-heading text-[28px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
                Paket Perubahan Akta Perusahaan
              </h2>
              <p className="text-[16px] text-gray-500 font-medium">
                Biaya jasa Notaris & Kemenkumham all-in, transparan tanpa ada biaya tersembunyi.
              </p>
            </div>
            <div className="flex-shrink-0 flex justify-start md:justify-end">
              <Image 
                src="/images/badges/promo-50.png" 
                alt="Promo 50% Off Legal Deals" 
                width={280} 
                height={120}
                className="w-[220px] sm:w-[280px] object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch justify-center max-w-4xl mx-auto">
            
            {/* Paket 1: Perubahan Data PT */}
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              <div className="rounded-[20px] p-[28px_26px_30px] h-full flex flex-col bg-[oklch(0.2_0.01_90)] shadow-[0_8px_20px_oklch(0.2_0.02_90/0.12)]">
                
                <div className="text-center mb-[18px]">
                  <div className="text-[16px] font-[800] tracking-[0.04em] text-[oklch(0.98_0.003_90)] uppercase">PERUBAHAN DATA PT</div>
                  <div className="text-[14px] font-[700] tracking-[0.03em] text-[oklch(0.62_0.15_25)] uppercase mt-1">PERUBAHAN PENGURUS / SAHAM</div>
                </div>
                
                <div className="text-center mb-[20px]">
                  <div className="text-[16px] text-[oklch(0.62_0.01_90)] line-through mb-[2px]">Rp 6.000.000</div>
                  <div className="text-[32px] font-[800] text-[oklch(0.98_0.003_90)] leading-[1.2]">Rp 3.999.000</div>
                  <div className="text-[14px] font-[700] tracking-[0.03em] text-[oklch(0.62_0.15_25)] mt-[6px]">TANPA TAMBAHAN BIAYA APAPUN</div>
                </div>

                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya ingin melakukan Perubahan Data PT. Mohon info prosesnya.", "ingin-melakukan-perubahan-data-pt")}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full py-[14px] rounded-[10px] text-[16px] font-[700] block text-center bg-[oklch(0.98_0.003_90)] text-[oklch(0.2_0.01_90)] hover:scale-[1.02] transition-transform"
                >Pilih Perubahan Data</a>
                
                <div className="h-[1px] bg-[oklch(0.35_0.01_90)] my-[24px]" />
                
                <div className="text-[14px] font-[800] tracking-[0.06em] text-[oklch(0.62_0.01_90)] mb-[16px] uppercase">YANG DIPEROLEH</div>
                
                <div className="flex flex-col gap-[12px] flex-1">
                  {[
                    "Drafting Risalah RUPS / Keputusan Pemegang Saham",
                    "Akta Notaris Perubahan Resmi",
                    "Penerimaan Laporan SK Kemenkumham (AHU)"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-[10px] text-[16px] text-[oklch(0.92_0.005_90)] leading-[1.4]">
                      <span className="text-[oklch(0.7_0.15_145)] font-[700] flex-shrink-0">✓</span><span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Paket 2: Perubahan Anggaran Dasar PT */}
            <div className="relative group h-full md:-translate-y-2">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[oklch(0.72_0.19_70)] text-[oklch(0.2_0.02_70)] text-[14px] font-[800] tracking-[0.06em] px-[18px] py-[8px] rounded-full whitespace-nowrap shadow-[0_4px_12px_oklch(0.3_0.1_70/0.35)] uppercase">
                TERLARIS
              </div>
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              <div className="rounded-[20px] p-[34px_26px_30px] h-full flex flex-col bg-gradient-to-b from-[oklch(0.32_0.15_25)] to-[oklch(0.26_0.13_25)] shadow-[0_20px_40px_oklch(0.3_0.15_25/0.35),0_0_0_1px_oklch(0.4_0.16_25/0.4)]">
                
                <div className="text-center mb-[18px]">
                  <div className="text-[16px] font-[800] tracking-[0.04em] text-[oklch(0.98_0.003_90)] uppercase">PERUBAHAN AD PT</div>
                  <div className="text-[14px] font-[700] tracking-[0.03em] text-[oklch(0.85_0.1_70)] uppercase mt-1">PERUBAHAN MODAL / NAMA / DOMISILI</div>
                </div>
                
                <div className="text-center mb-[20px]">
                  <div className="text-[16px] text-[oklch(0.8_0.03_25)] line-through mb-[2px]">Rp 8.000.000</div>
                  <div className="text-[32px] font-[800] text-[oklch(0.98_0.003_90)] leading-[1.2]">Rp 5.499.000</div>
                  <div className="text-[14px] font-[700] tracking-[0.03em] text-[oklch(0.85_0.1_70)] mt-[6px]">TANPA TAMBAHAN BIAYA APAPUN</div>
                </div>

                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya ingin melakukan Perubahan Anggaran Dasar PT. Mohon info prosesnya.", "ingin-melakukan-perubahan-anggaran-dasar-pt")}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full py-[14px] rounded-[10px] text-[16px] font-[700] block text-center bg-[oklch(0.72_0.19_70)] text-[oklch(0.2_0.02_70)] hover:scale-[1.02] transition-transform shadow-lg"
                >Pilih Perubahan AD</a>
                
                <div className="h-[1px] bg-[oklch(0.45_0.1_25/0.5)] my-[24px]" />
                
                <div className="text-[14px] font-[800] tracking-[0.06em] text-[oklch(0.8_0.03_25)] mb-[16px] uppercase">DOKUMEN INTEGRAL</div>
                
                <div className="flex flex-col gap-[12px] flex-1">
                  {[
                    "Akta Notaris Perubahan Anggaran Dasar",
                    "SK Persetujuan Kemenkumham (Bukan sekadar lapor)",
                    "Sinkronisasi perubahan data ke sistem OSS RBA"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-[10px] text-[16px] text-[oklch(0.92_0.005_90)] leading-[1.4]">
                      <span className="text-[oklch(0.78_0.15_145)] font-[700] flex-shrink-0">✓</span><span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Offices />

      {/* ─── 7. TESTIMONIALS ─── */}
      <MediaCoverage />
      <Testimonials />

      {/* ─── 8. FAQ SECTION ─── */}
      <FAQ title="Pertanyaan seputar Perubahan Akta." subtitle="Belum yakin? Mungkin jawabannya ada di sini." items={faqs} />

      {/* ─── 9. CTA BANNER (Mockup Clean White) ─── */}
      <section className="bg-white py-8 sm:py-20 border-t border-gray-100/60 relative">
        <div className="max-w-[1140px] mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          
          {/* Left Column */}
          <div className="space-y-4 max-w-2xl text-left">
            <h2 className="font-heading text-[28px] sm:text-[40px] font-bold leading-tight tracking-tight text-gray-900">
              Bisnis Anda Mengalami <span className="text-[#990202]">Perubahan Struktur?</span>
            </h2>
            <p className="text-[16px] text-gray-500 leading-relaxed font-medium">
              Konsultasikan rencana perubahan pengurus atau modal perusahaan Anda bersama konsultan hukum kami.
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-auto flex flex-col gap-3 min-w-[340px] sm:min-w-[360px]">
            {/* Button WhatsApp */}
            <a
              href={getWhatsAppLink("Halo EasyLegal, saya ingin berkonsultasi mengenai perubahan akta perusahaan.", "ingin-berkonsultasi-mengenai-perubahan-akta-perusahaan")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[16px] rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.122.953 11.5.953c-5.439 0-9.859 4.37-9.864 9.8-.001 1.73.457 3.41 1.32 4.927l-.982 3.58 3.673-.956zm11.517-5.595c-.3-.15-1.774-.875-2.048-.975-.274-.1-.474-.15-.674.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.463.13-.612.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.625-.924-2.225-.244-.588-.491-.508-.674-.518-.174-.01-.374-.012-.574-.012-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.116 4.52 1.228.531 2.186.848 2.93 1.083.755.238 1.44.205 1.984.124.606-.091 1.774-.725 2.024-1.425.25-.7.25-1.299.175-1.425-.076-.125-.275-.2-.575-.35z"/>
              </svg>
              <span>Konsultasi via WhatsApp</span>
            </a>

            {/* Button Hubungi Tim Kami */}
            <a
              href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai layanan perubahan akta.", "ingin-konsultasi-mengenai-layanan-perubahan-akta")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-800 border border-black/[0.04] hover:border-gray-300 font-extrabold text-[16px] rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              <span>Hubungi Tim Kami</span>
              <span className="text-[16px] font-normal">→</span>
            </a>

            {/* Fast Response Badge */}
            <div className="flex items-center gap-1.5 text-[14px] text-gray-500 font-medium pt-1 px-1">
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
