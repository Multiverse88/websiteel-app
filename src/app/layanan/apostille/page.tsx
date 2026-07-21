"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Clock,
  ShieldCheck,
  Check,
  Home,
  ChevronRight,
  FileText,
  Globe,
  Info,
  Star,
} from "lucide-react";
import Image from "next/image";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing, { PricingPackage } from "@/components/Pricing";
import FadeIn from "@/components/FadeIn";
import MediaCoverage from "@/components/MediaCoverage";
import PricingFooter from "@/components/PricingFooter";
import { getWhatsAppLink } from "@/lib/config";
import BottomPromoSection from "@/components/home/BottomPromoSection";

// --- FAQ & pricing data from PDF brief ---
const faqs = [
  {
    q: "Apa bedanya Apostille dengan legalisasi biasa?",
    a: "Legalisasi konvensional memerlukan beberapa tahap: notaris → Kemenkumham → Kemlu → Kedubes negara tujuan. Apostille hanya memerlukan satu langkah di Kemenkumham dan langsung diakui di 129+ negara anggota Konvensi Hague.",
  },
  {
    q: "Apakah semua negara menerima Apostille dari Indonesia?",
    a: "Ya, untuk 129 negara anggota Konvensi Hague. Indonesia telah resmi bergabung sejak 2022. Daftar lengkap negara tujuan tersedia di halaman ini.",
  },
  {
    q: "Berapa lama proses Apostille selesai?",
    a: "Maksimal 3 hari kerja setelah dokumen dinyatakan 100% lengkap dan di-submit ke sistem AHU, dihitung sejak verifikasi selesai. SLA tidak termasuk waktu pengiriman dokumen fisik jika diperlukan.",
  },
  {
    q: "Apakah dokumen asli harus dikirim ke EasyLegal?",
    a: "Untuk Apostille dokumen asli (cetak sertifikat melekat pada dokumen fisik): ya, dokumen asli harus dikirim ke alamat EasyLegal. PIC kami akan membawa dokumen asli beserta surat kuasa ke loket Kanwil Kemenkumham.",
  },
  {
    q: "Bagaimana jika pejabat penandatangan dokumen belum terdaftar di AHU?",
    a: "Ada 2 jalur: (1) Legalisasi via notaris seperti waarmeerking, atau (2) Permintaan spesimen tanda tangan & cap stempel ke instansi terkait. AHU akan mengirimkan surat pengantar yang perlu ditandatangani pejabat berwenang. Setelah spesimen diverifikasi, proses Apostille dapat dilanjutkan.",
  },
  {
    q: "Apakah bisa refund jika proses sudah masuk ke sistem AHU?",
    a: "Tidak. Sesuai kebijakan layanan legalitas, setelah dokumen masuk ke antrean sistem pemerintahan, tidak dapat dilakukan revisi, pembatalan, maupun pengembalian dana dari pihak klien. Pastikan semua data sudah benar sebelum konfirmasi akhir.",
  },
];

const pricingPackages: PricingPackage[] = [
  {
    title: "PAKET APOSTILLE EASYLEGAL",
    price: "Rp 1.300.000",
    strikePrice: "Rp 1.800.000",
    subLabel: "PER DOKUMEN · TERMASUK PNBP",
    isPopular: true,
    badgeText: "POPULER",
    buttonText: "Pesan Sekarang",
    buttonLink: getWhatsAppLink("Halo EasyLegal, saya ingin memesan layanan Jasa Apostille Dokumen. Mohon info biaya dan prosesnya."),
    groups: [
      {
        title: "BIAYA & PROSES",
        items: [
          { text: "PNBP Resmi Kemenkumham (Rp 150.000)", checked: true },
          { text: "Proses Cepat (Maks. 3 Hari Kerja)", checked: true },
          { text: "Gratis Konsultasi dengan Tim PLA", checked: true }
        ]
      },
      {
        title: "LAYANAN & JAMINAN",
        items: [
          { text: "Verifikasi Kelengkapan Dokumen", checked: true },
          { text: "Keamanan Dokumen 100% Terjamin", checked: true },
          { text: "Pengantaran Dokumen Fisik Aman", checked: true },
          { text: "Monitoring Status AHU Online Real-time", checked: true }
        ]
      }
    ]
  }
];

export default function ApostillePage() {
  const [railProgress, setRailProgress] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!railRef.current) return;
      const rect = railRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      const elementTop = rect.top;

      // Calculate progress based on scroll position within the element
      const visibleStart = windowHeight * 0.85;
      const visibleEnd = windowHeight * 0.15;
      const totalScrollable = visibleStart - visibleEnd;

      const elementProgress = (visibleStart - elementTop) / (totalScrollable + elementHeight);
      const clamped = Math.max(0, Math.min(100, elementProgress * 130)); // slightly scale up for faster drawing
      setRailProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="has-service-cta bg-white min-h-screen">

      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white py-8 sm:py-20 border-b border-gray-200/40 overflow-hidden relative">
        {/* Radial glows matching other pages */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-[16px] sm:text-[16px] font-medium text-gray-500 mb-8 sm:mb-12">
            <Link href="/" className="flex items-center gap-1 hover:text-[#990202] transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
            <span className="text-gray-300 font-normal">&gt;</span>
            <span className="text-gray-500 font-medium">Layanan</span>
            <span className="text-gray-300 font-normal">&gt;</span>
            <span className="font-bold text-gray-900">Apostille</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1 px-3 sm:py-1.5 sm:px-3.5 rounded-full border border-red-100 shadow-sm animate-pulse-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[16px] sm:text-[16px] font-bold text-[#990202] tracking-wide">Layanan Jasa Apostille Dokumen</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading font-extrabold text-[40px] sm:text-[48px] lg:text-[56px] text-gray-950 leading-[1.12] tracking-tight">
                Legalisasi Dokumen {" "}
                <span className="text-[#990202]">Internasional</span>
              </h1>

              {/* Subtitle Line 3 from HTML Mockup */}
              <p className="text-[16px] font-medium tracking-tight text-gray-500 mt-2">
                Dokumen Anda sah di 129+ Negara Anggota Konvensi Hague.
              </p>

              {/* Description */}
              <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed max-w-2xl font-normal">
                Proses mudah, cepat, dan bisa 100% online — tanpa perlu datang ke kantor.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-row flex-wrap gap-3 pt-2">
                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai layanan Jasa Apostille Dokumen.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center flex-1 sm:flex-initial text-center px-4 sm:px-7 py-3 sm:py-4 bg-[#990202] text-white font-bold text-[16px] sm:text-[16px] rounded-xl hover:bg-[#800000] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                >
                  <span>Konsultasi Gratis</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1.5 sm:ml-2 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <button
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center flex-1 sm:flex-initial text-center px-4 sm:px-7 py-3 sm:py-4 shadow-md border border-black/[0.04] text-gray-800 font-bold text-[16px] sm:text-[16px] rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 shadow-sm cursor-pointer"
                >
                  Lihat Paket Harga
                </button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100 max-w-[580px]">
                {[
                  { icon: Globe, num: "129+", label: "Negara Anggota" },
                  { icon: FileText, num: "5", label: "Jenis Dokumen" },
                  { icon: Clock, num: "≤3 Hari", label: "Proses Kerja SLA" }
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                      <stat.icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <div className="text-[16px] sm:text-[16px] font-extrabold text-gray-950 leading-tight">{stat.num}</div>
                      <div className="text-[16px] text-gray-500 mt-0.5">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Apostille Certificate Mockup */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-[460px] aspect-[1.05] sm:aspect-square lg:aspect-[1.05]">

                {/* Main Dark Backdrop */}
                <div className="w-full h-full rounded-[36px] bg-gradient-to-br from-[#121E36] via-[#0C1221] to-[#600C0F] p-7 shadow-2xl relative border border-gray-800 flex flex-col justify-between overflow-hidden">

                  {/* Glowing accent */}
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#990202]/30 rounded-full blur-3xl pointer-events-none" />

                  {/* Mockup Header */}
                  <div className="flex items-center justify-between border-b border-gray-800 pb-4 relative z-10">
                    <div className="flex space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[16px] font-extrabold text-gray-500 tracking-wider uppercase">KEMENKUMHAM RI</span>
                  </div>

                  {/* Mockup Body: Certificate */}
                  <div className="my-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-gray-200/20 shadow-inner text-left relative z-10">
                    {/* Seal watermark */}
                    <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-[#990202]/8 flex items-center justify-center">
                      <ShieldCheck className="w-7 h-7 text-[#990202]/40" />
                    </div>

                    <div className="flex items-center space-x-1.5 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[16px] font-extrabold text-emerald-600 tracking-wider uppercase">SERTIFIKAT APOSTILLE</span>
                    </div>

                    <h4 className="text-[16px] font-black text-gray-900 leading-snug pr-12">
                      Convention de La Haye
                    </h4>
                    <p className="text-[16px] text-gray-500 leading-relaxed font-semibold mt-2">
                      Pengesahan dokumen publik untuk keabsahan internasional di 129+ negara anggota Konvensi Hague.
                    </p>

                    {/* Mini doc details */}
                    <div className="flex gap-3 mt-4">
                      <div className="flex-1 bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                        <div className="text-[16px] font-bold text-gray-400 uppercase tracking-wider">Jenis</div>
                        <div className="text-[16px] font-black text-gray-900 mt-0.5">Akta Notaris</div>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                        <div className="text-[16px] font-bold text-gray-400 uppercase tracking-wider">SLA</div>
                        <div className="text-[16px] font-black text-gray-900 mt-0.5">≤ 3 Hari</div>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                        <div className="text-[16px] font-bold text-gray-400 uppercase tracking-wider">Negara</div>
                        <div className="text-[16px] font-black text-gray-900 mt-0.5">129+</div>
                      </div>
                    </div>
                  </div>

                  {/* Mockup footer */}
                  <div className="flex justify-between items-center text-[16px] text-gray-500 font-bold border-t border-gray-800/50 pt-4 relative z-10">
                    <span>APOSTILLE ONLINE</span>
                    <span className="flex items-center gap-1.5 text-[#990202]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#990202] animate-pulse" />
                      AHU Verified
                    </span>
                  </div>
                </div>

                {/* Floating Badge 1: Top Left */}
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex items-center space-x-3 w-[220px] hover:-translate-y-1 transition-transform duration-300 z-20">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[16px] font-black text-gray-950 leading-none">Apostille Resmi</div>
                    <div className="text-[16px] text-gray-500 font-semibold mt-1">Kemenkumham RI</div>
                  </div>
                </div>

                {/* Floating Badge 2: Bottom Right */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex items-center space-x-3 w-[215px] hover:-translate-y-1 transition-transform duration-300 z-20">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[16px] font-black text-gray-950 leading-none">129+ Negara</div>
                    <div className="text-[16px] text-gray-500 font-semibold mt-1">Konvensi Hague</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 2. LIPUTAN MEDIA ─── */}
      <MediaCoverage />

      {/* ─── 3. SERTIFIKASI & LEGALITAS (3-COL WITH RULES) ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-[900px] mx-auto px-6 sm:px-12 text-center">
          <span className="inline-block text-[16px] font-black text-[#990202] uppercase tracking-[0.25em] mb-4">
            SERTIFIKASI &amp; LEGALITAS EASYLEGAL
          </span>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 mt-12">
            <Image 
              src="/images/badges/iso-sertifikat.png" 
              alt="Sertifikat ISO" 
              width={600} 
              height={200} 
              className="object-contain h-32 sm:h-48 w-auto"
            />
            <Image 
              src="/images/badges/pse-terdaftar.png" 
              alt="PSE Terdaftar Kominfo" 
              width={600} 
              height={200} 
              className="object-contain h-32 sm:h-48 w-auto"
            />
          </div>
        </div>
      </section>

      {/* ─── 4. MENGAPA PILIH EASYLEGAL ─── */}
      <section className="py-20 sm:py-28 bg-white border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-[16px] font-black text-[#990202] uppercase tracking-[0.2em] mb-4">
              MENGAPA PILIH EASYLEGAL?
            </span>
            <h2 className="font-heading text-[32px] sm:text-[40px] font-extrabold text-gray-950 tracking-tight">
              Keuntungan Menggunakan Layanan Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⚡", title: "Praktis & Cepat", desc: "Proses online penuh, tidak perlu antre ke kantor" },
              { icon: "⏱", title: "Efisien Waktu", desc: "Serahkan ke tim profesional EasyLegal" },
              { icon: "🔒", title: "Data Aman", desc: "Keamanan dokumen dan data klien terjamin" },
              { icon: "💬", title: "Konsultasi Gratis", desc: "Didampingi PLA sebelum & selama proses" },
            ].map((item, idx) => (
              <div key={idx} className="group bg-white rounded-3xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#990202]/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-heading font-black text-[16px] text-gray-950 mb-2">{item.title}</h3>
                <p className="text-[16px] text-gray-500 leading-relaxed font-semibold">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[660px] mx-auto mt-6">
            {[
              { icon: "💰", title: "Biaya Terjangkau", desc: "Transparan, tidak ada biaya tersembunyi" },
              { icon: "🛡", title: "Transaksi Aman", desc: "Tersedia via marketplace (Tokopedia/Shopee)" }
            ].map((item, idx) => (
              <div key={idx} className="group bg-white rounded-3xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#990202]/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-heading font-black text-[16px] text-gray-950 mb-2">{item.title}</h3>
                <p className="text-[16px] text-gray-500 leading-relaxed font-semibold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. BIAYA JASA APOSTILLE (PRICING) ─── */}
      <div id="paket-harga">
        <BottomPromoSection />

      <Pricing hideFooter={true}
          sectionTitleTag="BIAYA JASA APOSTILLE"
          sectionTitle="Paket Jasa Apostille"
          sectionSubtitle={
            <span>
              PNBP Pemerintah: Rp 150.000 / dokumen. Biaya sudah termasuk PNBP pemerintah. Hubungi konsultan untuk info promo &amp; diskon volume.
            </span>
          }
          packages={pricingPackages}
        />
      </div>

      {/* ─── 6. ALUR PROSES (SIGNATURE SECTION - FULL BLEED) ─── */}
      <section ref={railRef} className="py-24 sm:py-32 bg-gradient-to-b from-[oklch(0.32_0.15_25)] to-[oklch(0.26_0.13_25)] text-white overflow-hidden relative">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-[16px] font-black text-white/70 uppercase tracking-[0.25em] mb-4">
              ALUR PROSES APOSTILLE
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Bagaimana Cara Kerjanya?
            </h2>
            <p className="text-[16px] text-white/80 font-semibold uppercase tracking-wider">
              SLA dihitung sejak dokumen klien dinyatakan 100% lengkap
            </p>
          </div>

          {/* Desktop Horizontal Rail Layout */}
          <div className="relative hidden lg:block py-20">
            {/* The Horizontal Line */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/20 -translate-y-1/2 z-0" />

            {/* Active Drawing Line based on Scroll */}
            <div
              className="absolute top-1/2 left-0 h-[2px] bg-white -translate-y-1/2 z-10 transition-all duration-300 ease-out"
              style={{ width: `${railProgress}%` }}
            />

            <div className="grid grid-cols-5 relative z-20">
              {[
                { step: "1", title: "Konsultasi & Pengumpulan", desc: "Klien kirim dokumen & data ke tim PLA EasyLegal" },
                { step: "2", title: "Verifikasi Data", desc: "LO verifikasi nomor, nama pejabat & instansi di dokumen" },
                { step: "3", title: "Submit ke AHU", desc: "LO input data ke sistem AHU Online & unggah dokumen" },
                { step: "4", title: "Verifikasi Pemerintah", desc: "Verifikator Kemenkumham proses maks. 3 hari kerja" },
                { step: "5", title: "Cetak Sertifikat", desc: "Sertifikat Apostille dicetak di loket Kanwil Kemenkumham" }
              ].map((item, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <div key={idx} className="relative flex flex-col items-center">

                    {/* Staggered box positioning */}
                    <div className={`absolute w-56 text-center ${isEven ? 'top-12' : 'bottom-12'}`}>
                      <h3 className="font-heading font-black text-[16px] mb-2">{item.title}</h3>
                      <p className="text-[16px] text-white/70 leading-relaxed font-semibold">{item.desc}</p>
                    </div>

                    {/* Step Node Circle */}
                    <div className="w-10 h-10 bg-white text-[#990202] rounded-full flex items-center justify-center font-black text-[16px] z-30 shadow-lg relative my-auto">
                      {item.step}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Vertical Rail Layout */}
          <div className="relative lg:hidden pl-8 space-y-12">
            {/* Vertical Line */}
            <div className="absolute top-0 left-3 w-[2px] h-full bg-white/20 z-0" />

            {[
              { step: "1", title: "Konsultasi & Pengumpulan", desc: "Klien kirim dokumen & data ke tim PLA EasyLegal" },
              { step: "2", title: "Verifikasi Data", desc: "LO verifikasi nomor, nama pejabat & instansi di dokumen" },
              { step: "3", title: "Submit ke AHU", desc: "LO input data ke sistem AHU Online & unggah dokumen" },
              { step: "4", title: "Verifikasi Pemerintah", desc: "Verifikator Kemenkumham proses maks. 3 hari kerja" },
              { step: "5", title: "Cetak Sertifikat", desc: "Sertifikat Apostille dicetak di loket Kanwil Kemenkumham" }
            ].map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-6">
                {/* Step Node Circle */}
                <div className="w-8 h-8 bg-white text-[#990202] rounded-full flex items-center justify-center font-black text-[16px] z-10 shadow-md flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-heading font-black text-[16px] mb-1">{item.title}</h3>
                  <p className="text-[16px] text-white/70 leading-relaxed font-semibold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SLA Info & Local Warnings */}
          <div className="mt-20 border-t border-white/10 pt-10 text-center flex flex-col md:flex-row items-center justify-center gap-4 text-[16px] font-semibold text-white/80 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl">
              <Info className="w-4 h-4 text-white/90 flex-shrink-0" />
              <p className="text-left">
                <strong>Catatan Bandung:</strong> Pencetakan sertifikat Apostille untuk wilayah Bandung hanya bisa dilakukan di Kantor Wilayah Kemenkumham Jabar — belum tersedia di Mall Pelayanan Publik Kota Bandung.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 7. APA ITU APOSTILLE ─── */}
      <section className="py-20 sm:py-28 bg-white border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Image + Floating Badge */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center">
              <div className="relative w-full max-w-[480px] lg:max-w-none px-4 sm:px-0">
                <div className="relative overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-white group aspect-[1.1]">
                  <Image
                    src="/cerita-kami-team.webp"
                    alt="Tim EasyLegal - Proses Legalisasi Dokumen Apostille"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                  />
                </div>

                {/* Floating Badge: Dasar Hukum */}
                <div className="absolute -bottom-6 left-2 sm:left-6 bg-white rounded-2xl p-3.5 pr-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] shadow-sm border border-black/[0.02] flex items-center space-x-3.5 w-[220px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-[16px] font-black text-gray-900 leading-none">Konvensi Hague</div>
                    <div className="text-[16px] text-gray-400 font-bold mt-1.5">Sejak 2022 · 129+ negara</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Definition Text */}
            <div className="lg:col-span-7">
              <div className="mb-10">
                <span className="inline-block text-[16px] font-black text-[#990202] uppercase tracking-[0.2em] mb-4">
                  APA ITU APOSTILLE?
                </span>
                <h2 className="font-heading text-[32px] sm:text-[40px] lg:text-[42px] font-extrabold text-gray-950 tracking-tight leading-[1.15] mb-6">
                  Legalisasi Dokumen <span className="text-[#990202]">Internasional</span>
                </h2>
                <p className="text-[16px] text-gray-500 leading-relaxed font-semibold">
                  Apostille adalah tindakan pengesahan yang memverifikasi keaslian tanda tangan pejabat, cap/segel resmi, serta nama jabatan dan instansi penerbit pada dokumen publik.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Berlaku di 129+ Negara", desc: "Termasuk AS, Australia, Jepang, Eropa, dan negara anggota Konvensi Hague lainnya." },
                  { title: "Untuk Siapa?", desc: "WNI yang akan bekerja, studi, menikah, atau berbisnis di luar negeri." },
                  { title: "Lebih Ringkas", desc: "Satu langkah di Kemenkumham — tidak perlu legalisir Kemlu atau kedubes." },
                  { title: "Proses 100% Online", desc: "Melalui Sistem AHU Online (layanan.ahu.go.id) — bisa diurus dari mana saja." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-[#FAF9F9] rounded-2xl border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4" strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-[16px] text-gray-950 mb-1">{item.title}</h3>
                      <p className="text-[16px] text-gray-500 leading-relaxed font-semibold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 8. DOKUMEN APA SAJA ─── */}
      <section className="py-20 sm:py-28 bg-[#F9FAFB] border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-[16px] font-black text-[#990202] uppercase tracking-[0.2em] mb-4">
              DOKUMEN APA SAJA YANG BISA DI-APOSTILLE?
            </span>
            <h2 className="font-heading text-[32px] sm:text-[40px] font-extrabold text-gray-950 tracking-tight">
              Jenis Dokumen yang Dapat Diproses
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              {
                num: "01",
                title: "Dokumen Hukum & Notaris",
                desc: "Surat Kuasa, Akta Pendirian Perusahaan, Sertifikat Saham, Dokumen Kontrak, Dokumen Pengadilan",
                icon: "📋"
              },
              {
                num: "02",
                title: "Dokumen Kependudukan & Sipil",
                desc: "Akta Kelahiran, Akta Perkawinan (Buku Nikah), Akta Perceraian, Akta Kematian, KTP, Kartu Keluarga",
                icon: "🏠"
              },
              {
                num: "03",
                title: "Dokumen Pendidikan",
                desc: "Ijazah, Transkrip Nilai, Surat Keterangan Hasil Ujian (umumnya perlu legalisir Kemendikbud/Notaris terlebih dahulu)",
                icon: "🎓"
              },
              {
                num: "04",
                title: "Dokumen Kepolisian & Kesehatan",
                desc: "SKCK, Surat Keterangan Sehat, Sertifikat Vaksinasi/Karantina",
                icon: "🏥"
              },
              {
                num: "05",
                title: "Dokumen Terjemahan",
                desc: "Dokumen yang telah diterjemahkan oleh Penerjemah Tersumpah (sworn translator)",
                icon: "🌐"
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative bg-white rounded-3xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#990202]/20 transition-all duration-300">
                <div className="text-2xl mb-4">{item.icon}</div>
                <span className="font-heading font-black text-[16px] text-[#990202]/40 block mb-3 tracking-wider">
                  {item.num}
                </span>
                <h3 className="font-heading font-black text-[16px] text-gray-950 leading-snug mb-3">
                  {item.title}
                </h3>
                <p className="text-[16px] text-gray-500 leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. SYARAT DOKUMEN ─── */}
      <section className="py-20 sm:py-28 bg-[#F9FAFB] border-b border-gray-200/40">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-[16px] font-black text-[#990202] uppercase tracking-[0.2em] mb-4">
              SYARAT DOKUMEN
            </span>
            <h2 className="font-heading text-[32px] sm:text-[40px] font-extrabold text-gray-950 tracking-tight">
              Persyaratan Dokumen Klien
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: Dokumen Fisik & Digital */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-[16px] text-gray-950">Dokumen Fisik & Digital</h3>
                  <p className="text-[16px] text-gray-400 font-semibold">Yang perlu disiapkan</p>
                </div>
              </div>
              <div className="h-px bg-gray-100 mb-6" />
              <ul className="space-y-3.5">
                {[
                  "Akun Email aktif",
                  "Akun AHU Online (layanan.ahu.go.id)",
                  "KTP (WNI) atau Passport (WNA)",
                  "KTP/Passport penerima kuasa (jika dikuasakan)",
                  "Negara tujuan penggunaan dokumen"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[16px] text-gray-700 font-semibold leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Informasi Tambahan */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202]">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-[16px] text-gray-950">Informasi Tambahan</h3>
                  <p className="text-[16px] text-gray-400 font-semibold">Data dokumen yang dibutuhkan</p>
                </div>
              </div>
              <div className="h-px bg-gray-100 mb-6" />
              <ul className="space-y-3.5">
                {[
                  "Jenis dokumen yang diajukan Apostille",
                  "Nama & nomor dokumen serta nama pemilik",
                  "Nama Pejabat yang menandatangani dokumen",
                  "Nama jabatan pejabat",
                  "Nama instansi penerbit dokumen"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[16px] text-gray-700 font-semibold leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Warning Alert */}
          <div className="mt-8 bg-[#FFF5F5] border border-red-100 rounded-2xl p-5 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#990202] flex-shrink-0 mt-0.5" />
            <p className="text-[16px] text-gray-600 font-semibold leading-relaxed">
              <strong className="text-[#990202]">Catatan Pejabat Belum Terdaftar:</strong> Jika data pejabat belum ada di database AHU, terdapat 2 jalur: (1) legalisasi melalui notaris seperti waarmeerking, atau (2) permintaan spesimen tanda tangan, paraf & cap stempel dari instansi pejabat bersangkutan.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 10. TESTIMONI ─── */}
      <section className="py-20 sm:py-28 bg-white border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-[16px] font-black text-[#990202] uppercase tracking-[0.2em] mb-4">
              TESTIMONI KLIEN
            </span>
            <h2 className="font-heading text-[32px] sm:text-[40px] font-extrabold text-gray-950 tracking-tight">
              Mereka Sudah Merasakannya!
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "Prosesnya cepat banget! Dokumen apostille saya selesai dalam 3 hari. Tim EasyLegal sangat membantu dan komunikatif.",
                author: "Ahmad R.",
                location: "Jakarta",
                rating: 5
              },
              {
                text: "Awalnya bingung apostille itu apa, tapi setelah konsultasi gratis langsung paham. Recommended banget untuk yang mau kerja di luar negeri.",
                author: "Siti N.",
                location: "Bandung",
                rating: 5
              },
              {
                text: "Urusan apostille ijazah untuk beasiswa di Eropa jadi mudah. Tidak perlu bolak-balik kantor, semua diurus EasyLegal.",
                author: "Budi S.",
                location: "Surabaya",
                rating: 5
              }
            ].map((item, idx) => (
              <div key={idx} className="group bg-[#FAF9F9] rounded-3xl p-7 border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#990202]/15 transition-all duration-300 flex flex-col justify-between">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[16px] text-gray-600 leading-relaxed font-semibold italic mb-6">
                  &quot;{item.text}&quot;
                </p>

                {/* Author */}
                <div className="pt-5 border-t border-gray-200/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#990202] text-white flex items-center justify-center font-black text-[16px]">
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[16px] font-black text-gray-950">{item.author}</div>
                    <div className="text-[16px] text-gray-400 font-semibold">{item.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 text-[16px] text-gray-500 font-semibold">
            Google Review EasyLegal: <strong className="text-gray-900">4.8/5</strong> dari 420+ ulasan | <span className="text-[#990202] cursor-pointer hover:underline">Lihat Semua Review</span>
          </div>
        </div>
      </section>

      {/* ─── 11. FAQ ─── */}
      <FAQ
        title="Pertanyaan yang Sering Diajukan"
        subtitle="Temukan jawaban atas beberapa pertanyaan umum seputar pengurusan Apostille dokumen."
        items={faqs}
      />

      {/* ─── 12. CTA ─── */}
      <CTA
        title={
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-gray-950 leading-tight tracking-tight">
            Siap Mengurus Apostille Dokumen Anda?
          </h2>
        }
        description="Konsultasikan kebutuhan apostille Anda sekarang — GRATIS, tanpa komitmen. Hubungi kami melalui WA di wa.me/62817770048 atau via email care@easylegal.id."
        whatsappLink={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai layanan Jasa Apostille Dokumen.")}
        whatsappText="Hubungi Konsultan EasyLegal Sekarang"
      />

    </div>
  );
}
