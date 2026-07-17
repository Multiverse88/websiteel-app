"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Check,
  Globe,
  Home,
  ShieldCheck,
  FileText,
  Award,
  Clock,
  ArrowRight,
  User,
  Star,
  Activity,
  Download,
  AlertCircle,
  MapPin,
  Compass,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import Pricing, { PricingPackage } from "@/components/Pricing";
import PricingFooter from "@/components/PricingFooter";
import MediaCoverage from "@/components/MediaCoverage";
import { getWhatsAppLink } from "@/lib/config";
import BottomPromoSection from "@/components/home/BottomPromoSection";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/home/Testimonials";

export default function VisaKitas() {
  // State for interactive Pricing filter tabs
  const [activeCategory, setActiveCategory] = useState<"visa" | "investor" | "tka">("visa");
  



  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Pricing packages matching the user's mockup exactly
  const pricingData = {
    visa: [
      {
        title: "SEKALI MASUK · SINGLE ENTRY",
        subtitle: "Untuk kunjungan bisnis & rapat singkat",
        originalPrice: "IDR 10.300.000",
        price: "5.149.000",
        isPopular: true,
        labelBtn: "Pilih Single Entry",
        lamaProses: "7-10 hari kerja",
        yangDiperoleh: "Visa Bisnis Sekali Masuk (Berlaku 60 hari)",
        waText: "Halo EasyLegal, saya ingin memesan Paket Visa Bisnis Sekali Masuk (Single Entry)."
      },
      {
        title: "BERKALI-KALI · MULTIPLE ENTRY",
        subtitle: "Untuk perjalanan bisnis berulang",
        originalPrice: "IDR 15.400.000",
        price: "7.699.000",
        isPopular: false,
        labelBtn: "Pilih Multiple Entry",
        lamaProses: "7-10 hari kerja",
        yangDiperoleh: "Visa Bisnis Berkali-Kali Masuk (Berlaku 60 hari)",
        waText: "Halo EasyLegal, saya ingin memesan Paket Visa Bisnis Berkali-Kali Masuk (Multiple Entry)."
      }
    ],
    investor: [
      {
        title: "KITAS INVESTOR 1 TAHUN (C313)",
        subtitle: "Untuk penanam modal asing jangka pendek",
        originalPrice: "IDR 20.000.000",
        price: "12.500.000",
        isPopular: true,
        labelBtn: "Pilih KITAS 1 Tahun",
        lamaProses: "14-21 hari kerja",
        yangDiperoleh: "E-KITAS Investor 1 Tahun & Izin Kerja Terkait",
        waText: "Halo EasyLegal, saya ingin memesan Paket KITAS Investor 1 Tahun."
      },
      {
        title: "KITAS INVESTOR 2 TAHUN (C314)",
        subtitle: "Masa tinggal terpanjang untuk penanam modal",
        originalPrice: "IDR 30.000.000",
        price: "15.500.000",
        isPopular: false,
        labelBtn: "Pilih KITAS 2 Tahun",
        lamaProses: "14-21 hari kerja",
        yangDiperoleh: "E-KITAS Investor 2 Tahun & Izin Kerja Terkait",
        waText: "Halo EasyLegal, saya ingin memesan Paket KITAS Investor 2 Tahun."
      }
    ],
    tka: [
      {
        title: "KITAS TKA 6 BULAN (C312)",
        subtitle: "Untuk pekerja asing jangka pendek",
        originalPrice: "IDR 18.000.000",
        price: "11.500.000",
        isPopular: true,
        labelBtn: "Pilih KITAS TKA 6 Bulan",
        lamaProses: "14-21 hari kerja",
        yangDiperoleh: "RPTKA, Notifikasi, E-Visa & E-KITAS 6 Bulan",
        waText: "Halo EasyLegal, saya ingin memesan Paket KITAS TKA 6 Bulan."
      },
      {
        title: "KITAS TKA 12 BULAN (C312)",
        subtitle: "Untuk pekerja ahli jangka panjang",
        originalPrice: "IDR 24.000.000",
        price: "14.500.000",
        isPopular: false,
        labelBtn: "Pilih KITAS TKA 12 Bulan",
        lamaProses: "14-21 hari kerja",
        yangDiperoleh: "RPTKA, Notifikasi, E-Visa & E-KITAS 12 Bulan",
        waText: "Halo EasyLegal, saya ingin memesan Paket KITAS TKA 12 Bulan."
      }
    ]
  };

  const visaKitasBenefits = [
    {
      icon: <Clock className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Proses Cepat & Efisien",
      desc: "Visa Bisnis selesai dalam 7–10 hari kerja, KITAS 14–21 hari kerja — tanpa perlu bolak-balik ke Kantor Imigrasi."
    },
    {
      icon: <FileText className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Dokumentasi Lengkap",
      desc: "Tim kami mengurus RPTKA, IMTA/Notifikasi Kerja, MERP, hingga pendampingan biometrik secara end-to-end."
    },
    {
      icon: <ShieldCheck className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Konsultan Imigrasi Berpengalaman",
      desc: "Sesuai UU No. 6/2011 tentang Keimigrasian &mdash; ditangani konsultan yang paham regulasi visa & KITAS terbaru."
    },
    {
      icon: <Award className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Harga Transparan",
      desc: "Biaya sudah termasuk PNBP negara, pendampingan dokumen, & konsultasi penuh sampai izin terbit."
    }
  ];

  const faqs = [
    {
      q: "Apa beda Visa Bisnis dengan KITAS?",
      a: "<strong>Visa Bisnis</strong> adalah izin kunjungan jangka pendek (60 hari) untuk kegiatan bisnis seperti meeting, audit, & kunjungan klien — <strong>tidak boleh untuk bekerja</strong>. <strong>KITAS</strong> adalah izin tinggal jangka menengah (6–24 bulan) untuk WNA yang ingin tinggal & beraktivitas resmi di Indonesia (investor, tenaga kerja, pelajar, pasangan WNI). KITAS lebih kompleks & membutuhkan sponsor (perusahaan/keluarga WNI)."
    },
    {
      q: "Berapa lama proses pengurusan Visa & KITAS?",
      a: "Untuk <strong>Visa Bisnis B211A</strong>, proses normal memakan waktu <strong>7 hingga 10 hari kerja</strong>. Sedangkan untuk <strong>KITAS (Kerja/Investor)</strong>, proses lengkap berkisar antara <strong>14 hingga 21 hari kerja</strong> sejak dokumen persyaratan lengkap diunggah dan diverifikasi."
    },
    {
      q: "Apa itu MERP & kenapa penting?",
      a: "<strong>MERP (Multiple Exit Re-entry Permit)</strong> adalah izin khusus bagi pemegang KITAS untuk keluar-masuk Indonesia berkali-kali tanpa membatalkan status tinggal KITAS mereka. Semua paket KITAS kami sudah menyertakan MERP secara otomatis."
    },
    {
      q: "Apa syarat dapat KITAS Investor?",
      a: "Syarat utama KITAS Investor adalah WNA harus tercatat sebagai pemegang saham di perusahaan PT PMA di Indonesia dengan nilai saham minimal <strong>Rp 10 Miliar</strong>, serta memiliki jabatan formal sebagai Direktur atau Komisaris di akta perusahaan."
    },
    {
      q: "Apa itu RPTKA & IMTA?",
      a: "<strong>RPTKA (Rencana Penggunaan Tenaga Kerja Asing)</strong> adalah izin kelayakan jabatan yang harus dimiliki oleh perusahaan penjamin sebelum merekrut WNA. <strong>IMTA (Notifikasi Kerja Kemenaker)</strong> adalah izin kerja personal WNA tersebut. Keduanya merupakan prasyarat wajib untuk pengurusan KITAS Kerja."
    },
    {
      q: "Apa itu DPKK & siapa yang bayar?",
      a: "<strong>DPKK (Dana Kompensasi Penggunaan Tenaga Kerja Asing)</strong> adalah iuran wajib sebesar <strong>USD 100 per bulan</strong> (dibayarkan ke kas negara) yang wajib dibayarkan oleh perusahaan sponsor (penjamin) sebagai kontribusi pengembangan keahlian lokal atas mempekerjakan TKA."
    },
    {
      q: "Apakah perlu datang untuk biometrik?",
      a: "Ya. Untuk pengurusan KITAS baru maupun perpanjangan, WNA wajib datang satu kali ke Kantor Imigrasi setempat di Indonesia untuk proses pengambilan data biometrik (foto wajah dan sidik jari). Tim EasyLegal siap mendampingi penuh di lokasi."
    },
    {
      q: "Bisa konversi Visa Bisnis ke KITAS tanpa keluar Indonesia?",
      a: "<strong>Sangat bisa.</strong> Regulasi keimigrasian terbaru memungkinkan konversi Visa Kunjungan atau Visa Bisnis (B211A) menjadi KITAS Kerja atau Investor secara langsung di dalam negeri tanpa mengharuskan WNA keluar dari Indonesia."
    },
    {
      q: "Berapa lama paspor harus valid untuk apply Visa/KITAS?",
      a: "Untuk pengajuan Visa Bisnis B211A, paspor minimal harus berlaku selama <strong>6 bulan</strong>. Sedangkan untuk pengurusan KITAS (1 atau 2 Tahun), paspor WNA wajib valid minimal selama <strong>18 bulan</strong>."
    }
  ];


  const mappedPackages: PricingPackage[] = pricingData[activeCategory as keyof typeof pricingData].map((pkg: any) => ({
    title: pkg.title,
    price: pkg.price,
    strikePrice: pkg.originalPrice,
    subLabel: pkg.subtitle,
    isPopular: pkg.isPopular,
    buttonText: pkg.labelBtn,
    buttonLink: getWhatsAppLink(pkg.waText),
    groups: [
      {
        title: "LAMA PROSES",
        items: [{ text: pkg.lamaProses, checked: true }]
      },
      {
        title: "YANG DIPEROLEH",
        items: [{ text: pkg.yangDiperoleh, checked: true }]
      },
      {
        title: "BONUS",
        items: [
          { text: "Layanan Personal Legal Assistance", checked: true },
          { text: "1 Kupon: <strong>Undian iPhone</strong>", checked: true }
        ]
      },
      {
        title: "EXTRA BONUS",
        items: [
          { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true },
          { text: "Dokumen SOP Karyawan", checked: true },
          { text: "Dokumen SOP Perusahaan", checked: true },
          { text: "Dokumen Kontrak Bisnis", checked: true }
        ]
      }
    ]
  }));

  return (
    <div className="has-service-cta flex flex-col min-h-screen bg-[#FCFBFA] text-gray-900 font-sans">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white pt-8 lg:pt-12 py-8 sm:py-8 sm:py-8 sm:py-20 border-b border-gray-200/50 overflow-hidden relative">
        {/* Glow detail */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-[14px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-gray-500 font-medium">Layanan</span>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[14px] font-bold text-gray-900">Visa &amp; KITAS</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1.5 px-4 rounded-full border border-red-100 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[14px] sm:text-[14px] sm:text-[14px] font-bold text-[#990202] tracking-wide">Imigrasi - WNA</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-[42px] sm:text-[50px] lg:text-[58px] font-extrabold text-gray-950 leading-[1.1] tracking-tight">
                Visa Bisnis &amp; <span className="text-[#990202]">KITAS</span> <br />
                resmi untuk WNA di <br className="hidden sm:block" /> Indonesia
              </h1>

              {/* Description */}
              <p className="text-[14px] sm:text-[16.5px] text-gray-500 leading-relaxed max-w-2xl font-semibold">
                Bantuan pengurusan visa bisnis, KITAS investor &amp; KITAS Tenaga Kerja Asing — proses cepat, dokumentasi lengkap, &amp; sesuai regulasi Direktorat Jenderal Imigrasi.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="#paket-harga"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center px-7 py-4 bg-[#990202] text-white font-extrabold text-[15px] rounded-xl hover:bg-[#800000] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer"
                >
                  Lihat Paket Visa &amp; KITAS
                </a>
                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya ingin berkonsultasi mengenai pembuatan Visa atau KITAS.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-4 border-2 border-gray-150 text-gray-800 font-extrabold text-[15px] rounded-xl bg-white hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer"
                >
                  Konsultasi Gratis
                </a>
              </div>

              {/* Checkpoints Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-150 max-w-[620px]">
                {/* Checkpoint 1 */}
                <div className="flex items-center space-x-3 bg-gray-50/50 p-2.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                  <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[14px] font-black text-gray-950">3-10 Hari</div>
                    <div className="text-[14px] text-gray-500 font-semibold">Proses cepat</div>
                  </div>
                </div>

                {/* Checkpoint 2 */}
                <div className="flex items-center space-x-3 bg-gray-50/50 p-2.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                  <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[14px] font-black text-gray-950">3 Kategori</div>
                    <div className="text-[14px] text-gray-500 font-semibold">Bisnis - Investor - TKA</div>
                  </div>
                </div>

                {/* Checkpoint 3 */}
                <div className="flex items-center space-x-3 bg-gray-50/50 p-2.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                  <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[14px] font-black text-gray-950">100% Resmi</div>
                    <div className="text-[14px] text-gray-500 font-semibold">Sesuai Ditjen Imigrasi</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-[460px] aspect-[1.05] sm:aspect-square lg:aspect-[1.05]">
                
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white group aspect-[1.1] sm:aspect-square lg:aspect-[1.1]">
                  <Image
                    src="/images/layanan/visa-kitas-1.jpg"
                    alt="Layanan Visa & KITAS Resmi"
                    fill
                    sizes="(max-width: 768px) 100vw, 460px"
                    className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                  />
                </div>

                {/* Floating Badge 1: Top Right */}
                <div className="absolute -top-6 -right-6 sm:-right-8 bg-white rounded-2xl p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex items-center space-x-3 w-[215px] hover:-translate-y-1 transition-transform duration-300 z-20">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4.5 h-4.5" strokeWidth={3} />
                  </div>
                  <div className="text-left">
                    <div className="text-[14px] font-black text-gray-950 leading-none">e-Visa Digital</div>
                    <div className="text-[14px] text-gray-500 font-semibold mt-1">Tanpa antri di kedutaan</div>
                  </div>
                </div>

                {/* Floating Badge 2: Bottom Left */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex items-center space-x-3 w-[220px] hover:-translate-y-1 transition-transform duration-300 z-20">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                    <Home className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[14px] font-black text-gray-950 leading-none">Untuk Bisnis &amp; PMA</div>
                    <div className="text-[14px] text-gray-500 font-semibold mt-1">PT PMA, investor, ekspat</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. MEDIA COVERAGE (TRUST SIGNAL) ─── */}
      <MediaCoverage />

      {/* ─── 3. MENGAPA PILIH EASYLEGAL (VALUE PROPOSITION) ─── */}
      <Benefits sectionTitleTag="KEUNGGULAN KAMI" sectionTitle="Mengapa Pilih EasyLegal?" items={visaKitasBenefits} />
      <BottomPromoSection />

      {/* ─── 4. PRICING SECTION ─── */}
      <Pricing
        sectionTitleTag="BIAYA PENGURUSAN"
        sectionTitle="Pilih kategori sesuai kebutuhan."
        sectionSubtitle={
          <>
            Harga sudah include biaya negara (PNBP), pendampingan dokumen, & konsultasi penuh sampai izin terbit.
          </>
        }
        packages={mappedPackages}
        headerBottomContent={
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 bg-gray-200/50 rounded-2xl shadow-md border border-black/[0.04]">
              <button
                onClick={() => setActiveCategory("visa")}
                className={`px-5 py-2.5 rounded-xl text-[14px] font-extrabold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === "visa"
                    ? "bg-[#990202] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                {activeCategory === "visa" && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                <span>Visa Bisnis</span>
              </button>
              <button
                onClick={() => setActiveCategory("investor")}
                className={`px-5 py-2.5 rounded-xl text-[14px] font-extrabold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === "investor"
                    ? "bg-[#990202] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                {activeCategory === "investor" && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                <span>KITAS Investor</span>
              </button>
              <button
                onClick={() => setActiveCategory("tka")}
                className={`px-5 py-2.5 rounded-xl text-[14px] font-extrabold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === "tka"
                    ? "bg-[#990202] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                {activeCategory === "tka" && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                <span>KITAS TKA</span>
              </button>
            </div>
          </div>
        }
      />

      {/* ─── 5. PERBEDAAN SECTION ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-b border-gray-200/50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <p className="text-[14px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">PENGERTIAN</p>
            <h2 className="font-heading text-[36px] sm:text-[44px] font-extrabold text-gray-950 leading-tight tracking-tight">
              Visa &amp; KITAS — apa bedanya?
            </h2>
            <p className="text-[14px] sm:text-[14px] sm:text-[14.5px] text-gray-500 font-bold leading-relaxed max-w-2xl mx-auto">
              Penting untuk memilih jenis izin yang tepat sesuai tujuan &amp; lama tinggal WNA di Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: KATEGORI VISA & KITAS */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <h3 className="text-[14px] font-black text-[#990202] tracking-widest uppercase mb-4 pl-1">KATEGORI VISA &amp; KITAS</h3>
              
              {/* Item 1 */}
              <div className="bg-[#FAF9F7]/70 rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center space-x-3.5">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-[#990202]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-950">Visa Bisnis</h4>
                  <p className="text-[14px] text-gray-500 font-semibold mt-0.5">Kunjungan bisnis 60 hari - single/multiple entry</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-[#FAF9F7]/70 rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center space-x-3.5">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#990202]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-950">KITAS Investor</h4>
                  <p className="text-[14px] text-gray-500 font-semibold mt-0.5">Penanam modal PT PMA · 1-2 tahun</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-[#FAF9F7]/70 rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center space-x-3.5">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-[#990202]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-950">KITAS Tenaga Kerja Asing</h4>
                  <p className="text-[14px] text-gray-500 font-semibold mt-0.5">WNA bekerja di Indonesia · 6-24 bulan</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="bg-[#FAF9F7]/70 rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center space-x-3.5">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Compass className="w-5 h-5 text-[#990202]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-950">MERP Re-Entry Permit</h4>
                  <p className="text-[14px] text-gray-500 font-semibold mt-0.5">Bebas keluar-masuk Indonesia selama KITAS aktif</p>
                </div>
              </div>

              {/* Bottom active black card */}
              <div className="bg-gray-950 text-white rounded-2xl p-5 border border-gray-850 shadow-md flex items-start space-x-3.5 mt-6">
                <div className="w-8 h-8 rounded-full bg-[#990202] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4.5 h-4.5 text-white" strokeWidth={3.5} />
                </div>
                <div className="text-left">
                  <h4 className="text-[14px] font-black text-white">Layanan Imigrasi EasyLegal</h4>
                  <p className="text-[14px] text-gray-400 font-semibold mt-0.5">
                    Dasar Hukum: UU No. 6/2011 tentang Keimigrasian
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Descriptions */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              {/* Box 1: VISA */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-3.5">
                <div className="flex items-center space-x-3 text-[#990202]">
                  <FileText className="w-5 h-5" />
                  <h4 className="text-[14.5px] font-black tracking-wider uppercase">VISA</h4>
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed font-semibold">
                  Visa adalah <strong className="font-extrabold text-gray-900">izin masuk &amp; tinggal sementara</strong> bagi WNA di Indonesia untuk tujuan bisnis atau wisata. Visa bisnis berlaku <strong className="font-extrabold text-gray-900">60 hari</strong> per kunjungan &amp; <strong className="font-extrabold text-gray-900">tidak memberikan izin bekerja</strong>. Bisa diperpanjang atau dikonversi ke KITAS jika ingin tinggal lebih lama.
                </p>
              </div>

              {/* Box 2: KITAS / ITAS */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-3.5">
                <div className="flex items-center space-x-3 text-[#990202]">
                  <Check className="w-5 h-5" strokeWidth={3} />
                  <h4 className="text-[14.5px] font-black tracking-wider uppercase">KITAS / ITAS</h4>
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed font-semibold">
                  <strong className="font-extrabold text-gray-900">KITAS (Kartu Izin Tinggal Terbatas)</strong> atau ITAS adalah izin tinggal jangka menengah untuk WNA di Indonesia. Berlaku <strong className="font-extrabold text-gray-900">6–24 bulan</strong> tergantung kategori — investor, tenaga kerja asing, pelajar, atau pasangan WNI. Pemegang KITAS bisa <strong className="font-extrabold text-gray-900">tinggal &amp; beraktivitas resmi</strong> sesuai izin.
                </p>
              </div>

              {/* Box 3: YANG DIURUS EASYLEGAL */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-3.5">
                <div className="flex items-center space-x-3 text-[#990202]">
                  <Clock className="w-5 h-5" />
                  <h4 className="text-[14.5px] font-black tracking-wider uppercase">YANG DIURUS EASYLEGAL</h4>
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed font-semibold">
                  Kami handle end-to-end: <strong className="font-bold text-gray-950">Visa Bisnis</strong> (single &amp; multiple entry), <strong className="font-bold text-gray-950">KITAS Investor</strong> (1–2 tahun untuk pemegang saham PT PMA), &amp; <strong className="font-bold text-gray-950">KITAS TKA</strong> (untuk WNA bekerja di perusahaan Indonesia, termasuk RPTKA &amp; IMTA). Plus MERP, biometrik, &amp; surat keterangan tempat tinggal.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 6. TESTIMONIALS ─── */}
      <Testimonials />

      {/* ─── 7. FAQ SECTION ─── */}
      <FAQ title="Pertanyaan seputar Visa &amp; KITAS." subtitle="Belum yakin? Mungkin jawabannya ada di sini." items={faqs} />

      {/* ─── 8. CTA SECTION ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 relative overflow-hidden border-t border-gray-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/[0.01] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1140px] mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-12 text-left">
          
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-heading text-[20px] sm:text-[40px] font-extrabold leading-tight tracking-tight text-gray-950">
              Butuh konsultasi <span className="text-[#990202]">Visa atau KITAS?</span>
            </h2>
            <p className="text-[14.5px] sm:text-[15.5px] text-gray-500 leading-relaxed font-semibold">
              Konsultasi gratis untuk pilih jenis izin yang tepat &amp; cek kelayakan dokumen WNA Anda — tanpa komitmen.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-3 min-w-[320px] sm:min-w-[360px]">
            {/* WhatsApp action */}
            <a
              href={getWhatsAppLink("Halo EasyLegal, saya ingin berkonsultasi mengenai pembuatan Visa atau KITAS.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 px-7 py-4 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[15px] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.122.953 11.5.953c-5.439 0-9.859 4.37-9.864 9.8-.001 1.73.457 3.41 1.32 4.927l-.982 3.58 3.673-.956zm11.517-5.595c-.3-.15-1.774-.875-2.048-.975-.274-.1-.474-.15-.674.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.463.13-.612.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.625-.924-2.225-.244-.588-.491-.508-.674-.518-.174-.01-.374-.012-.574-.012-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.116 4.52 1.228.531 2.186.848 2.93 1.083.755.238 1.44.205 1.984.124.606-.091 1.774-.725 2.024-1.425.25-.7.25-1.299.175-1.425-.076-.125-.275-.2-.575-.35z"/>
              </svg>
              <span>Konsultasi via WhatsApp</span>
            </a>

            <a
              href={getWhatsAppLink("Halo EasyLegal, saya ingin berkonsultasi mengenai layanan keimigrasian.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-150 hover:border-gray-250 font-extrabold text-[14.5px] rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              <span>Hubungi Tim Kami</span>
              <span className="text-[16px] font-normal">→</span>
            </a>

            <div className="flex items-center gap-1.5 text-[14px] text-gray-500 font-semibold pt-1 px-1">
              <span className="text-emerald-500">✓</span>
              <span>Respons dalam 5 menit · Senin–Sabtu 08:00–20:00</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
