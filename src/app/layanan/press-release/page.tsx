"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Globe,
  Home,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  User,
  Star,
  Activity,
  Download,
  AlertCircle,
  MapPin,
  TrendingUp,
  ChevronDown,
  BookOpen,
  Award,
  Calendar,
  Shield,
  Layers,
  ShoppingCart,
  ShoppingBag,
  Heart,
  BarChart,
  Megaphone,
  Menu,
  Send,
  ExternalLink,
  Target
} from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import PricingFooter from "@/components/PricingFooter";
import MediaCoverage from "@/components/MediaCoverage";
import { getWhatsAppLink } from "@/lib/config";

const pricingData = {
    populer: [
      {
        title: "PAKET POPULER · SINGLE MEDIA",
        subtitle: "Cocok untuk UMKM & peluncuran produk awal",
        originalPrice: "IDR 4.000.000",
        price: "2.499.000",
        isPopular: true,
        labelBtn: "Pilih Paket Populer",
        lamaProses: "2-3 hari kerja",
        yangDiperoleh: "Terbit di 1 Media Nasional (Kumparan / IDN Times / Tribunnews)",
        waText: "Halo EasyLegal, saya ingin memesan Paket Press Release Single Media Populer."
      },
      {
        title: "PAKET POPULER · DUAL MEDIA",
        subtitle: "Jangkauan ganda untuk brand awareness",
        originalPrice: "IDR 7.500.000",
        price: "4.499.000",
        isPopular: false,
        labelBtn: "Pilih Paket Dual Media",
        lamaProses: "2-3 hari kerja",
        yangDiperoleh: "Terbit di 2 Media Nasional Pilihan (Kumparan + Tribunnews / IDN Times)",
        waText: "Halo EasyLegal, saya ingin memesan Paket Press Release Dual Media Populer."
      }
    ],
    premium: [
      {
        title: "PREMIUM DETIK / KOMPAS",
        subtitle: "Otoritas & kredibilitas tertinggi",
        originalPrice: "IDR 9.500.000",
        price: "6.499.000",
        isPopular: true,
        labelBtn: "Pilih Premium Detik/Kompas",
        lamaProses: "3-5 hari kerja",
        yangDiperoleh: "Terbit di portal Detik.com atau Kompas.com",
        waText: "Halo EasyLegal, saya ingin memesan Paket Press Release Premium Detik / Kompas."
      },
      {
        title: "PREMIUM CNBC / CNN INDONESIA",
        subtitle: "Otoritas keuangan, ekonomi & bisnis terkemuka",
        originalPrice: "IDR 12.000.000",
        price: "7.999.000",
        isPopular: false,
        labelBtn: "Pilih Premium CNBC/CNN",
        lamaProses: "3-5 hari kerja",
        yangDiperoleh: "Terbit di portal CNBC Indonesia atau CNN Indonesia",
        waText: "Halo EasyLegal, saya ingin memesan Paket Press Release Premium CNBC / CNN Indonesia."
      }
    ],
    bundle: [
      {
        title: "BUNDLE STARTER (3 MEDIA)",
        subtitle: "Distribusi multi-channel instan",
        originalPrice: "IDR 11.000.000",
        price: "6.999.000",
        isPopular: true,
        labelBtn: "Pilih Bundle Starter",
        lamaProses: "3-5 hari kerja",
        yangDiperoleh: "Terbit di 3 Media Nasional (Kumparan + Tribunnews + IDN Times)",
        waText: "Halo EasyLegal, saya ingin memesan Paket Press Release Bundle Starter (3 Media)."
      },
      {
        title: "BUNDLE PRO (5 MEDIA)",
        subtitle: "Dominasi cakupan pemberitaan media nasional",
        originalPrice: "IDR 18.000.000",
        price: "11.499.000",
        isPopular: false,
        labelBtn: "Pilih Bundle Pro",
        lamaProses: "3-5 hari kerja",
        yangDiperoleh: "Terbit di 5 Media Nasional (Detik/Kompas + 4 Media Rekanan)",
        waText: "Halo EasyLegal, saya ingin memesan Paket Press Release Bundle Pro (5 Media)."
      }
    ]
  };

const faqs = [
    {
      q: "Apa bedanya press release dengan iklan berbayar?",
      a: "<strong>Press release</strong> tampil sebagai berita di media, ditulis gaya jurnalistik, &amp; memiliki kredibilitas tinggi karena dimuat oleh redaksi. <strong>Iklan berbayar</strong> tampil terpisah dari artikel, jelas-jelas ditandai sebagai iklan, &amp; lebih rentan diabaikan pembaca. Press release <strong>terbit permanen</strong> sementara iklan hilang saat budget habis."
    },
    {
      q: "Berapa lama berita terbit setelah order?",
      a: "Proses penulisan draf naskah awal membutuhkan waktu <strong>1 hingga 2 hari kerja</strong>. Setelah naskah Anda setujui (<em>approved</em>), koordinasi dan antrean meja redaksi media nasional memakan waktu <strong>1 hingga 3 hari kerja</strong> hingga artikel tayang online secara resmi."
    },
    {
      q: "Apakah saya harus menulis artikelnya sendiri?",
      a: "Tidak harus. Anda bisa menyediakan draf tulisan sendiri (250–500 kata), atau <strong>menggunakan jasa jurnalis profesional kami untuk menuliskan artikel Anda</strong> tanpa biaya tambahan (sudah termasuk dalam paket). Artikel akan ditulis sesuai standar jurnalistik 5W+1H."
    },
    {
      q: "Bisakah pilih media tertentu?",
      a: "Tentu saja. Anda bebas memilih media nasional mana saja yang ingin digunakan dari daftar media rekanan kami (seperti Detik, Kompas, Kontan, Kumparan, Tribunnews, dll.) sesuai dengan paket yang dipilih."
    },
    {
      q: "Apakah berita akan dihapus setelah beberapa waktu?",
      a: "Tidak. Artikel press release yang diterbitkan melalui jaringan media kami bersifat <strong>permanen online dan tidak memiliki masa kedaluwarsa</strong>. Berita akan terus tayang dan dapat diakses bertahun-tahun ke depan, menjadikannya investasi branding jangka panjang yang sangat baik."
    },
    {
      q: "Apakah nama brand pasti masuk judul artikel?",
      a: "Untuk beberapa media nasional, pencantuman nama brand langsung di judul utama <strong>tidak dapat dijamin 100%</strong> karena harus melewati kurasi ketat redaktur pelaksana agar tidak terkesan sebagai iklan hard-selling. Namun, nama brand Anda dipastikan akan diulas secara jelas di dalam paragraf isi berita."
    },
    {
      q: "Apakah press release ini sudah termasuk backlink?",
      a: "Ya, mayoritas media partner mengizinkan penyematan <strong>1 backlink aktif (tautan URL)</strong> menuju website atau media sosial Anda. Ini sangat bermanfaat untuk mendongkrak performa SEO dan mendatangkan trafik kunjungan langsung."
    },
    {
      q: "Kalau berita tidak terbit, bagaimana?",
      a: "Kami memberikan <strong>Garansi 100% Terbit atau Uang Kembali</strong>. Jika artikel Anda ditolak oleh dewan redaksi media yang dipilih karena kebijakan internal mereka, kami akan menawarkan opsi penggantian media nasional lain yang setara, atau pengembalian dana penuh (<em>full refund</em>) tanpa potongan."
    }
  ];

const mediaPartners = [
    { label: "detikcom", icon: "/icon-brand/logo-detik.jpg" },
    { label: "KOMPAS.com", icon: "/icon-brand/logo-kompasiana.jpg" },
    { label: "Tribunnews", icon: "/icon-brand/logo-tribun.jpg" },
    { label: "Liputan6", icon: "/icon-brand/logo-liputan.jpg" },
    { label: "Kumparan", icon: "/icon-brand/logo-industry.jpg" },
    { label: "iNews", icon: "/icon-brand/logo-inews.jpg" },

    { label: "JPNN", icon: "/icon-brand/logo-jpnn.jpg" },
    { label: "VIVA", icon: "/icon-brand/logo-warta.jpg" },
    { label: "KONTAN", icon: "/icon-brand/logo-kontan.jpg" },
    { label: "Merdeka", icon: "/icon-brand/logo-merdeka.jpg" },
    { label: "Okezone", icon: "/icon-brand/logo-okezone.jpg" },
    { label: "SindoNews", icon: "/icon-brand/logo-sindonews.jpg" },

    { label: "Republika", icon: "/icon-brand/logo-republika.jpg" },
    { label: "Suara.com", icon: "/icon-brand/logo-suara.jpg" },
    { label: "Antara", icon: "/icon-brand/logo-antara.jpg" },
    { label: "Bisnis.com", icon: "/icon-brand/logo-bisnis.jpg" },
    { label: "Tempo.co", icon: "/icon-brand/logo-tempo.jpg" },
    { label: "+ 80 media lainnya", icon: null }
  ];

export default function PressRelease() {
  // State for interactive Pricing filter tabs
  const [activeCategory, setActiveCategory] = useState<"populer" | "premium" | "bundle">("populer");

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Pricing packages matching the user's mockup exactly
   

  

  return (
    <div className="has-service-cta flex flex-col min-h-screen bg-[#FCFBFA] text-gray-900 font-sans">

      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white pt-8 lg:pt-12 py-8 sm:py-8 sm:py-8 sm:py-20 border-b border-gray-200/50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-left">

              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-[14px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-gray-500 font-medium">Layanan</span>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[14px] font-bold text-gray-900">Press Release</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1.5 px-4 rounded-full border border-red-100/50 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[14px] sm:text-[14px] sm:text-[14px] font-bold text-[#990202] tracking-wide">PR &amp; Media</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-[42px] sm:text-[50px] lg:text-[58px] font-extrabold text-gray-950 leading-[1.1] tracking-tight">
                Bisnismu <span className="text-[#990202]">tayang</span> di <br />
                media nasional dalam 1–3 hari.
              </h1>

              {/* Description */}
              <p className="text-[14px] sm:text-[16.5px] text-gray-500 leading-relaxed max-w-2xl font-semibold">
                Tingkatkan kredibilitas brand &amp; jangkau jutaan pembaca lewat publikasi press release di 100+ media online terpercaya. Garansi 100% terbit.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="#paket-harga"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center px-7 py-4 bg-[#990202] text-white font-extrabold text-[15px] rounded-xl hover:bg-[#800000] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer"
                >
                  Lihat Paket Press Release
                </a>
                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai layanan Press Release.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-4 border-2 border-gray-900 text-gray-950 font-extrabold text-[15px] rounded-xl bg-white hover:bg-gray-50 hover:border-gray-950 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer"
                >
                  Konsultasi Gratis
                </a>
              </div>

              {/* Checkpoints Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-8 max-w-[640px]">
                {/* Checkpoint 1 */}
                <div className="flex items-center space-x-3 bg-white border border-gray-100/50 p-2.5 sm:p-3 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.03)]">
                  <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[14px] sm:text-[14px] font-black text-gray-950">1–3 Hari</div>
                    <div className="text-[14px] sm:text-[14px] text-gray-500 font-semibold">Berita terbit</div>
                  </div>
                </div>

                {/* Checkpoint 2 */}
                <div className="flex items-center space-x-3 bg-white border border-gray-100/50 p-2.5 sm:p-3 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.03)]">
                  <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                    <Menu className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[14px] sm:text-[14px] font-black text-gray-950">100+ Media</div>
                    <div className="text-[14px] sm:text-[14px] text-gray-500 font-semibold">Pilihan publikasi</div>
                  </div>
                </div>

                {/* Checkpoint 3 */}
                <div className="flex items-center space-x-3 bg-white border border-gray-100/50 p-2.5 sm:p-3 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.03)]">
                  <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[14px] sm:text-[14px] font-black text-gray-950">100% Garansi</div>
                    <div className="text-[14px] sm:text-[14px] text-gray-500 font-semibold">Berita tayang</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-[460px] aspect-[1.05] sm:aspect-square lg:aspect-[1.05]">

                {/* Main Dark Backdrop Graphic */}
                <div className="w-full h-full rounded-[36px] bg-gradient-to-br from-[#4a0a0a] via-[#240606] to-[#3b0909] p-7 sm:p-9 shadow-2xl relative border border-red-950/30 flex flex-col justify-center overflow-hidden">

                  {/* NEWS Typography Pattern Background */}
                  <div className="absolute inset-0 z-0 overflow-hidden flex flex-col justify-center pointer-events-none select-none opacity-[0.08] -ml-8 -mt-12" style={{ transform: "rotate(-10deg) scale(1.6)" }}>
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="whitespace-nowrap font-black text-[32px] sm:text-[40px] leading-tight text-white uppercase tracking-widest">
                        NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS
                      </div>
                    ))}
                  </div>

                  {/* Mockup Body Content - News Preview */}
                  <div className="relative z-10 text-left space-y-4 sm:space-y-5">
                    <h4 className="text-[22px] sm:text-[25px] font-black text-white leading-[1.3] tracking-tight">
                      &quot;Startup UMKM Indonesia Catat Pertumbuhan Pesat di Kuartal Pertama 2026&quot;
                    </h4>
                    <p className="text-[14px] sm:text-[14px] text-gray-300 leading-relaxed font-semibold max-w-[90%]">
                      Liputan eksklusif tentang ekspansi bisnis Anda — terbit permanen di media nasional pilihan dengan jangkauan jutaan pembaca.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {["#Bisnis", "#Startup", "#UMKM", "#Inovasi"].map((tag) => (
                        <span key={tag} className="text-[14px] sm:text-[14px] font-bold text-gray-300 bg-white/10 px-2.5 py-1 rounded-md border border-white/5 backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 sm:pt-6 flex items-center text-[14px] sm:text-[14px] font-bold text-gray-400">
                      <strong className="text-white mr-1.5">EasyPress</strong> - Dipublikasi di Detik, Kontan, Tribun &amp; 100+ media lainnya
                    </div>
                  </div>

                </div>

                {/* Floating Badge 1: Top Left */}
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex items-center space-x-3 w-[220px] hover:-translate-y-1 transition-transform duration-300 z-20">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[14px] font-black text-gray-950 leading-none">100+ Media Nasional</div>
                    <div className="text-[14px] text-gray-500 font-semibold mt-1">Detik · Kontan · Industry.co.id</div>
                  </div>
                </div>

                {/* Floating Badge 2: Bottom Right */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex items-center space-x-3 w-[215px] hover:-translate-y-1 transition-transform duration-300 z-20">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[14px] font-black text-gray-950 leading-none">Permanen Online</div>
                    <div className="text-[14px] text-gray-500 font-semibold mt-1">Berita tidak akan dihapus</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. PERBEDAAN / PENJELASAN SECTION ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <p className="text-[14px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">MENGENAL PRESS RELEASE</p>
            <h2 className="font-heading text-[36px] sm:text-[44px] font-extrabold text-gray-950 leading-tight tracking-tight">
              Apa itu Press Release &amp; kenapa penting untuk bisnis?
            </h2>
            <p className="text-[14px] sm:text-[14px] sm:text-[14.5px] text-gray-500 font-bold leading-relaxed max-w-2xl mx-auto">
              Cara tercepat &amp; paling efektif membangun kredibilitas bisnis lewat liputan media kredibel — bukan iklan biasa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Left Column: KONTEN YANG COCOK (Unified soft-pink card container) */}
            <div className="lg:col-span-5 bg-[#FFF5F5] rounded-[32px] p-6 sm:p-7.5 space-y-3.5 text-left shadow-[0_10px_35px_rgba(153,2,2,0.06)]">
              <h3 className="text-[14px] sm:text-[14px] font-black text-[#990202] tracking-wider uppercase mb-5 pl-1.5 mt-1.5">
                KONTEN YANG COCOK UNTUK PRESS RELEASE
              </h3>

              {/* Item 1 */}
              <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                <div className="w-[45px] h-[45px] rounded-2xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 text-[#990202]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-900 leading-tight">Peluncuran Produk Baru</h4>
                  <p className="text-[14px] text-gray-500 font-semibold mt-0.5 leading-snug">Soft / hard launch produk &amp; layanan</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                <div className="w-[45px] h-[45px] rounded-2xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-[#990202]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-900 leading-tight">Liputan Event</h4>
                  <p className="text-[14px] text-gray-500 font-semibold mt-0.5 leading-snug">Seminar, grand opening, gathering</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                <div className="w-[45px] h-[45px] rounded-2xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-[#990202]" strokeWidth={3.5} />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-900 leading-tight">Centang Biru Sosmed</h4>
                  <p className="text-[14px] text-gray-500 font-semibold mt-0.5 leading-snug">Syarat verifikasi Instagram &amp; X</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                <div className="w-[45px] h-[45px] rounded-2xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="w-5 h-5 text-[#990202]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-900 leading-tight">Syarat Shopee Mall</h4>
                  <p className="text-[14px] text-gray-500 font-semibold mt-0.5 leading-snug">Salah satu syarat naik tier marketplace</p>
                </div>
              </div>

              {/* Item 5 */}
              <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                <div className="w-[45px] h-[45px] rounded-2xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Layers className="w-5 h-5 text-[#990202]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-900 leading-tight">Brand Building</h4>
                  <p className="text-[14px] text-gray-500 font-semibold mt-0.5 leading-snug">Bangun otoritas &amp; positioning</p>
                </div>
              </div>

              {/* Item 6 */}
              <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                <div className="w-[45px] h-[45px] rounded-2xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-[#990202]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-900 leading-tight">Klarifikasi Publik</h4>
                  <p className="text-[14px] text-gray-500 font-semibold mt-0.5 leading-snug">Respons resmi atas isu / hoaks</p>
                </div>
              </div>
            </div>

            {/* Right Column: Explanations */}
            <div className="lg:col-span-7 space-y-6 text-left">

              {/* Box 1: PRESS RELEASE */}
              <div className="bg-white rounded-2xl p-6 sm:p-7.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-4">
                <div className="flex items-center space-x-2.5 text-[#990202]">
                  <Megaphone className="w-5 h-5" />
                  <h4 className="text-[14px] sm:text-[14px] font-black tracking-wider uppercase">PRESS RELEASE</h4>
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed font-semibold">
                  Press release (siaran pers) adalah <strong className="font-extrabold text-gray-900">publikasi resmi dari perusahaan</strong> berbentuk artikel berita yang dimuat di media online jurnalistik. Berbeda dari iklan, press release ditulis dengan gaya jurnalistik &amp; punya kredibilitas tinggi karena terbit di media terpercaya.
                </p>
              </div>

              {/* Box 2: MANFAAT UNTUK BISNIS */}
              <div className="bg-white rounded-2xl p-6 sm:p-7.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-4">
                <div className="flex items-center space-x-2.5 text-[#990202]">
                  <Layers className="w-5 h-5" />
                  <h4 className="text-[14px] sm:text-[14px] font-black tracking-wider uppercase">MANFAAT UNTUK BISNIS</h4>
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed font-semibold">
                  Press release membantu <strong className="font-extrabold text-gray-900">membangun trust di mata konsumen</strong>, memperkuat positioning brand, &amp; jadi salah satu syarat verifikasi akun media sosial (centang biru), marketplace tier premium (Shopee Mall, Tokopedia Official), serta syarat tender korporat.
                </p>
              </div>

              {/* Box 3: YANG MEMBEDAKAN EASYPRESS */}
              <div className="bg-white rounded-2xl p-6 sm:p-7.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-4">
                <div className="flex items-center space-x-2.5 text-[#990202]">
                  <Clock className="w-5 h-5" />
                  <h4 className="text-[14px] sm:text-[14px] font-black tracking-wider uppercase">YANG MEMBEDAKAN EASYPRESS</h4>
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed font-semibold">
                  Kami fokus pada <strong className="font-extrabold text-gray-900">produk jurnalistik, bukan advertorial</strong> — artikel ditulis dengan sudut pandang berita, bukan promosi terselubung. <strong className="font-extrabold text-gray-900">Garansi 100% terbit</strong> di media yang Anda pilih, berita <strong className="font-extrabold text-gray-900">permanen online</strong>, &amp; ada laporan publikasi lengkap.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. KEBUTUHAN SECTION ─── */}
      <section className="bg-[#FBFBFA] py-8 sm:py-8 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-4">
            <p className="text-[14px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">KEBUTUHAN PRESS RELEASE</p>
            <h2 className="font-heading text-[36px] sm:text-[44px] font-extrabold text-gray-950 leading-tight tracking-tight">
              Kapan kamu butuh press release?
            </h2>
            <p className="text-[14px] sm:text-[14px] sm:text-[14.5px] text-gray-500 font-bold leading-relaxed max-w-2xl mx-auto">
              Bukan cuma untuk perusahaan besar — UMKM &amp; startup juga butuh press release di momen-momen kritis ini.
            </p>
          </div>

          {/* Grid of 6 white cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-[1140px] mx-auto items-stretch text-left">

            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-250 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-5.5 h-5.5 text-[#990202]" />
                </div>
                <h4 className="text-[15px] font-black text-gray-950 leading-tight">Launching Produk / Brand</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Bangun awareness saat soft / hard launch — pastikan target market tahu produkmu rilis lewat media yang mereka baca.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-250 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5.5 h-5.5 text-[#990202]" />
                </div>
                <h4 className="text-[15px] font-black text-gray-950 leading-tight">Liputan Event &amp; Aktivitas</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Seminar, grand opening, gathering, peluncuran kerjasama — liputan media buat acara tersebut terdokumentasi permanen.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-250 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5.5 h-5.5 text-[#990202]" />
                </div>
                <h4 className="text-[15px] font-black text-gray-950 leading-tight">Verifikasi Centang Biru</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Salah satu syarat verifikasi akun bisnis di Instagram, X, &amp; Facebook adalah liputan minimal 3–5 media kredibel.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-250 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="w-5.5 h-5.5 text-[#990202]" />
                </div>
                <h4 className="text-[15px] font-black text-gray-950 leading-tight">Syarat Shopee Mall &amp; Marketplace</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Shopee Mall, Tokopedia Official Store, &amp; Lazada Mall butuh seller dengan kredibilitas media — press release jadi bukti.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-250 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Layers className="w-5.5 h-5.5 text-[#990202]" />
                </div>
                <h4 className="text-[15px] font-black text-gray-950 leading-tight">Brand Building Jangka Panjang</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Tampil rutin di media membangun otoritas brand — calon klien akan lebih percaya bisnis yang sering diliput pers.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-250 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5.5 h-5.5 text-[#990202]" />
                </div>
                <h4 className="text-[15px] font-black text-gray-950 leading-tight">Klarifikasi Publik / Hoaks</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Saat ada isu negatif / hoaks tentang brand, klarifikasi resmi via media kredibel adalah cara paling efektif menetralisir.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 4. KENAPA PRESS RELEASE SECTION ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-4">
            <p className="text-[14px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">KENAPA PRESS RELEASE</p>
            <h2 className="font-heading text-[36px] sm:text-[44px] font-extrabold text-gray-950 leading-tight tracking-tight">
              Investasi sekali — manfaat jangka panjang.
            </h2>
            <p className="text-[14px] sm:text-[14px] sm:text-[14.5px] text-gray-500 font-bold leading-relaxed max-w-2xl mx-auto">
              Berbeda dari iklan yang hilang setelah budget habis, press release tetap online &amp; bisa diakses bertahun-tahun.
            </p>
          </div>

          {/* Grid of 8 white cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-[1140px] mx-auto items-stretch text-left">

            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-5.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-[#990202]" />
                </div>
                <h4 className="text-[14px] font-black text-gray-950 leading-tight">Bangun Kepercayaan</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Konsumen lebih percaya berita media kredibel dibanding iklan langsung dari brand.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-5.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-[#990202]" />
                </div>
                <h4 className="text-[14px] font-black text-gray-950 leading-tight">Reputasi &amp; Otoritas</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Liputan media kredibel naikkan persepsi brand sebagai pemain serius di industri.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-5.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#990202]" />
                </div>
                <h4 className="text-[14px] font-black text-gray-950 leading-tight">Boost Promosi</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Berita media jadi materi promosi multi-channel — share di sosmed, kirim ke calon klien.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-5.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-[#990202]" strokeWidth={3} />
                </div>
                <h4 className="text-[14px] font-black text-gray-950 leading-tight">Kredibilitas Tinggi</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Bukti konkret bisnismu aktif &amp; berkembang — penting untuk audit investor &amp; partner.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-5.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-[#990202]" />
                </div>
                <h4 className="text-[14px] font-black text-gray-950">Jangkauan Luas</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Akses jutaan pembaca media nasional — efektivitas yang sulit dicapai dengan iklan organik.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl p-5.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-[#990202]" />
                </div>
                <h4 className="text-[14px] font-black text-gray-950">SEO &amp; Brand Search</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Artikel media indeks di Google — naikkan visibilitas saat orang search nama brand.
                </p>
              </div>
            </div>

            {/* Card 7 */}
            <div className="bg-white rounded-2xl p-5.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#990202]" />
                </div>
                <h4 className="text-[14px] font-black text-gray-950">Permanen Online</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Berita terbit permanen — tidak akan dihapus, bisa diakses 5–10 tahun ke depan.
                </p>
              </div>
            </div>

            {/* Card 8 */}
            <div className="bg-white rounded-2xl p-5.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center flex-shrink-0">
                  <BarChart className="w-5 h-5 text-[#990202]" />
                </div>
                <h4 className="text-[14px] font-black text-gray-950">Kompetitif vs Iklan</h4>
                <p className="text-[14px] text-gray-500 font-semibold leading-relaxed">
                  Biaya 1x publikasi jauh lebih hemat dibanding iklan berbayar dengan jangkauan setara.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 5. MEDIA PARTNER SECTION ─── */}
      <section className="bg-[#FAF9F7] py-8 sm:py-8 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-8 sm:mb-16 space-y-4">
            <p className="text-[14px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">DAFTAR MEDIA PARTNER</p>
            <h2 className="font-heading text-[36px] sm:text-[44px] font-extrabold text-gray-950 leading-tight tracking-tight">
              Publikasi di 100+ media online terpercaya.
            </h2>
            <p className="text-[14px] sm:text-[14px] sm:text-[14.5px] text-gray-500 font-bold leading-relaxed max-w-2xl mx-auto">
              Pilih media yang sesuai target audiens — ekonomi, lifestyle, teknologi, hingga media daerah.
            </p>
          </div>

          {/* Media Partner Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-[1140px] mx-auto mb-8">
            {mediaPartners.map((media, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl py-4 px-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center justify-center min-h-[68px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-200"
              >
                {media.icon ? (
                  <img src={media.icon} alt={media.label} className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full object-cover" />
                ) : (
                  <span className="text-gray-500 font-bold text-[14px]">{media.label}</span>
                )}
              </div>
            ))}
          </div>

          {/* Small footer text */}
          <p className="text-[14px] text-gray-500 font-bold mt-8 max-w-4xl mx-auto">
            Daftar lengkap media tersedia saat konsultasi — termasuk media nasional, ekonomi-bisnis, lifestyle, teknologi, &amp; media daerah dengan tier rate berbeda.
          </p>

        </div>
      </section>

      {/* ─── 6. PRICING SECTION ─── */}
      <section id="paket-harga" className="bg-[#FBFBFA] py-8 sm:py-8 sm:py-20 scroll-mt-8 sm:mt-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">

          {/* Section Header */}
          <div className="mb-8 sm:mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-10">
            <div className="max-w-2xl space-y-2 sm:space-y-3 text-left">
              <p className="text-[14px] font-black text-[#990202] uppercase tracking-[0.22em]">BIAYA JASA PRESS RELEASE</p>
              <h2 className="font-heading text-[36px] sm:text-[44px] font-extrabold text-gray-900 leading-tight tracking-tight">
                Pilih paket sesuai target jangkauan.
              </h2>
              <p className="text-[14px] sm:text-[14px] sm:text-[14.5px] text-gray-500 font-bold leading-relaxed">
                Garansi 100% berita terbit &amp; permanen online. Harga sudah termasuk biaya penerbitan di media yang dipilih.
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

          {/* Packages Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1180px] mx-auto items-stretch text-left">

            {/* Paket A */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-[24px] overflow-hidden flex flex-col h-full justify-between shadow-md border border-black/[0.04] shadow-md group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300">
              <div>
                {/* Header */}
                <div className="bg-[#151515] px-4 py-5 sm:px-6 sm:py-8 text-center text-white relative">
                  <h4 className="text-[14px] font-black tracking-widest uppercase opacity-85">
                    PAKET A
                  </h4>
                  <div className="mt-3 text-[14px] text-white/50 line-through font-bold">
                    Rp 2.400.000
                  </div>
                  <div className="mt-0.5 text-[30px] sm:text-[34px] font-black tracking-tight flex items-start justify-center">
                    <span className="text-[16px] mt-1.5 font-extrabold mr-1">Rp</span>
                    <span>1.199.000</span>
                  </div>
                  <p className="text-[14px] font-black text-white/60 tracking-wider uppercase mt-2.5">
                    / SEKALI PUBLIKASI
                  </p>
                </div>

                {/* Features Detail */}
                <div className="p-6 sm:p-4 sm:p-7 space-y-4 sm:space-y-6 text-left">
                  {/* Lama Proses */}
                  <div className="space-y-2">
                    <h5 className="text-[14px] font-black text-[#990202] tracking-wider uppercase">
                      LAMA PROSES
                    </h5>
                    <div className="flex items-center text-[14px] sm:text-[14px] font-semibold text-gray-700">
                      <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0" strokeWidth={3.5} />
                      <span>
                        <strong className="font-extrabold text-gray-900">1–3 hari kerja</strong> sampai terbit
                      </span>
                    </div>
                  </div>

                  {/* Yang Diperoleh */}
                  <div className="space-y-2.5 border-t border-gray-100 pt-5">
                    <h5 className="text-[14px] font-black text-[#990202] tracking-wider uppercase">
                      YANG DIPEROLEH
                    </h5>
                    <ul className="space-y-2">
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Bebas pilih <strong className="font-extrabold text-gray-900">1 media</strong> publikasi</span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Berita terbit <strong className="font-extrabold text-gray-900">permanen</strong></span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Garansi <strong className="font-extrabold text-gray-900">100% tayang</strong></span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Laporan hasil publikasi</span>
                      </li>
                    </ul>
                  </div>

                  {/* Bonus Container */}
                  <div className="bg-[#F7F7F7] rounded-2xl p-4.5 space-y-2.5 shadow-sm border border-black/[0.02]">
                    <h5 className="text-[14px] font-black text-gray-900 tracking-wider uppercase">
                      BONUS
                    </h5>
                    <ul className="space-y-2">
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Potongan harga <strong className="font-extrabold text-gray-900">Rp 200.000</strong></span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span><strong className="font-extrabold text-gray-900">100+ E-Course</strong> digital marketing</span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span><strong className="font-extrabold text-gray-900">2.500+</strong> Template konten digital</span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Kalender konten sosial media</span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Order Button */}
              <div className="p-6 sm:p-7 pt-0">
                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket A Press Release. Mohon info lengkap biaya dan prosesnya.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 text-center font-black text-[14px] rounded-xl text-gray-800 bg-white hover:bg-gray-50 border border-gray-250 hover:border-gray-400 transition-all duration-200 cursor-pointer shadow-sm"
                >
                  Pilih Paket A
                </a>
              </div>
            </div>
          </div>

            {/* Paket B */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-[24px] overflow-hidden flex flex-col h-full justify-between border-[2.5px] border-[#990202] shadow-[0_20px_50px_rgba(0,0,0,0.045)] group-hover:shadow-[0_20px_50px_rgba(153,2,2,0.12)] scale-[1.02] relative z-10 transition-all duration-300">
              <div>
                {/* Header */}
                <div className="bg-[#990202] px-4 py-5 sm:px-6 sm:py-8 text-center text-white relative">
                  <div className="absolute top-0 left-0 right-0 bg-[#7a0101] text-white text-[14px] font-black tracking-[0.25em] uppercase py-1 shadow-inner">
                    PALING POPULER
                  </div>
                  <h4 className="text-[14px] font-black tracking-widest uppercase opacity-90 mt-2">
                    PAKET B
                  </h4>
                  <div className="mt-3 text-[14px] text-white/50 line-through font-bold">
                    Rp 10.000.000
                  </div>
                  <div className="mt-0.5 text-[30px] sm:text-[34px] font-black tracking-tight flex items-start justify-center">
                    <span className="text-[16px] mt-1.5 font-extrabold mr-1">Rp</span>
                    <span>4.999.000</span>
                  </div>
                  <p className="text-[14px] font-black text-white/60 tracking-wider uppercase mt-2.5">
                    / SEKALI PUBLIKASI
                  </p>
                </div>

                {/* Features Detail */}
                <div className="p-6 sm:p-4 sm:p-7 space-y-4 sm:space-y-6 text-left">
                  {/* Lama Proses */}
                  <div className="space-y-2">
                    <h5 className="text-[14px] font-black text-[#990202] tracking-wider uppercase">
                      LAMA PROSES
                    </h5>
                    <div className="flex items-center text-[14px] sm:text-[14px] font-semibold text-gray-700">
                      <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0" strokeWidth={3.5} />
                      <span>
                        <strong className="font-extrabold text-gray-900">1–3 hari kerja</strong> sampai terbit
                      </span>
                    </div>
                  </div>

                  {/* Yang Diperoleh */}
                  <div className="space-y-2.5 border-t border-gray-100 pt-5">
                    <h5 className="text-[14px] font-black text-[#990202] tracking-wider uppercase">
                      YANG DIPEROLEH
                    </h5>
                    <ul className="space-y-2">
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Bebas pilih <strong className="font-extrabold text-gray-900">5 media</strong> publikasi</span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Berita terbit <strong className="font-extrabold text-gray-900">permanen</strong></span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Garansi <strong className="font-extrabold text-gray-900">100% tayang</strong></span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Laporan hasil publikasi</span>
                      </li>
                    </ul>
                  </div>

                  {/* Bonus Container */}
                  <div className="bg-[#F7F7F7] rounded-2xl p-4.5 space-y-2.5 shadow-sm border border-black/[0.02]">
                    <h5 className="text-[14px] font-black text-gray-900 tracking-wider uppercase">
                      BONUS
                    </h5>
                    <ul className="space-y-2">
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Potongan harga <strong className="font-extrabold text-gray-900">Rp 200.000</strong></span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span><strong className="font-extrabold text-gray-900">100+ E-Course</strong> digital marketing</span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span><strong className="font-extrabold text-gray-900">2.500+</strong> Template konten digital</span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Kalender konten sosial media</span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Order Button */}
              <div className="p-6 sm:p-7 pt-0">
                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket B Press Release. Mohon info lengkap biaya dan prosesnya.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 text-center font-black text-[14px] rounded-xl text-white bg-[#990202] hover:bg-[#800000] hover:scale-[1.01] transition-all duration-200 cursor-pointer shadow-md shadow-red-900/10"
                >
                  Pilih Paket B
                </a>
              </div>
            </div>
          </div>

            {/* Paket C */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-[24px] overflow-hidden flex flex-col h-full justify-between shadow-md border border-black/[0.04] shadow-md group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300">
              <div>
                {/* Header */}
                <div className="bg-[#151515] px-4 py-5 sm:px-6 sm:py-8 text-center text-white relative">
                  <h4 className="text-[14px] font-black tracking-widest uppercase opacity-85">
                    PAKET C
                  </h4>
                  <div className="mt-3 text-[14px] text-white/50 line-through font-bold">
                    Rp 18.000.000
                  </div>
                  <div className="mt-0.5 text-[30px] sm:text-[34px] font-black tracking-tight flex items-start justify-center">
                    <span className="text-[16px] mt-1.5 font-extrabold mr-1">Rp</span>
                    <span>8.999.000</span>
                  </div>
                  <p className="text-[14px] font-black text-white/60 tracking-wider uppercase mt-2.5">
                    / SEKALI PUBLIKASI
                  </p>
                </div>

                {/* Features Detail */}
                <div className="p-6 sm:p-4 sm:p-7 space-y-4 sm:space-y-6 text-left">
                  {/* Lama Proses */}
                  <div className="space-y-2">
                    <h5 className="text-[14px] font-black text-[#990202] tracking-wider uppercase">
                      LAMA PROSES
                    </h5>
                    <div className="flex items-center text-[14px] sm:text-[14px] font-semibold text-gray-700">
                      <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0" strokeWidth={3.5} />
                      <span>
                        <strong className="font-extrabold text-gray-900">1–3 hari kerja</strong> sampai terbit
                      </span>
                    </div>
                  </div>

                  {/* Yang Diperoleh */}
                  <div className="space-y-2.5 border-t border-gray-100 pt-5">
                    <h5 className="text-[14px] font-black text-[#990202] tracking-wider uppercase">
                      YANG DIPEROLEH
                    </h5>
                    <ul className="space-y-2">
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Bebas pilih <strong className="font-extrabold text-gray-900">10 media</strong> publikasi</span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Berita terbit <strong className="font-extrabold text-gray-900">permanen</strong></span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Garansi <strong className="font-extrabold text-gray-900">100% tayang</strong></span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Laporan hasil publikasi</span>
                      </li>
                    </ul>
                  </div>

                  {/* Bonus Container */}
                  <div className="bg-[#F7F7F7] rounded-2xl p-4.5 space-y-2.5 shadow-sm border border-black/[0.02]">
                    <h5 className="text-[14px] font-black text-gray-900 tracking-wider uppercase">
                      BONUS
                    </h5>
                    <ul className="space-y-2">
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Potongan harga <strong className="font-extrabold text-gray-900">Rp 200.000</strong></span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span><strong className="font-extrabold text-gray-900">100+ E-Course</strong> digital marketing</span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span><strong className="font-extrabold text-gray-900">2.500+</strong> Template konten digital</span>
                      </li>
                      <li className="flex items-start text-[14px] sm:text-[14px] font-semibold text-gray-700 leading-snug">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Kalender konten sosial media</span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Order Button */}
              <div className="p-6 sm:p-7 pt-0">
                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket C Press Release. Mohon info lengkap biaya dan prosesnya.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 text-center font-black text-[14px] rounded-xl text-gray-800 bg-white hover:bg-gray-55 border border-gray-250 hover:border-gray-400 transition-all duration-200 cursor-pointer shadow-sm"
                >
                  Pilih Paket C
                </a>
              </div>
            </div>
          </div>

          </div>

          {/* Pricing Bottom Keterangan Penting Section */}
          <div className="max-w-[1180px] mx-auto bg-[#F0F0F0] rounded-3xl py-5 px-6 sm:py-6.5 sm:px-9 shadow-md border border-black/[0.04] mt-8 sm:mt-5 sm:mt-10 text-left space-y-3 shadow-[0_8px_30px_rgba(0,0,0,0.035)]">
            <h4 className="text-[14px] font-black text-gray-900">
              Keterangan penting:
            </h4>
            <div className="pl-5 sm:pl-6 space-y-1 text-[14px] sm:text-[14px] text-gray-650 font-normal leading-relaxed">
              <p>Harga di atas <strong className="font-black text-gray-900">sudah termasuk biaya penerbitan</strong> artikel pada media online yang dipilih.</p>
              <p>Klien bebas menyediakan artikel sendiri atau meminta bantuan tim kami untuk penulisan.</p>
              <p>Biaya penulisan artikel oleh tim kami: <strong className="font-black text-gray-900">Rp 2.000.000</strong> (opsional, di luar paket).</p>
              <p>Panjang artikel berkisar <strong className="font-black text-gray-900">250–500 kata</strong> sesuai standar jurnalistik.</p>
              <p>Kami terbuka berdiskusi mengenai sudut pandang &amp; arah pembahasan artikel sesuai kebutuhan brand Anda.</p>
              <p>Penyebutan nama brand pada judul <strong className="font-black text-gray-900">tidak dapat dijamin</strong> — keputusan akhir di pihak redaksi masing-masing media.</p>
              <p>Kami menjamin <strong className="font-black text-gray-900">100% penerbitan</strong> artikel di media yang dipilih dari daftar yang tersedia.</p>
              <p>Layanan kami fokus pada <strong className="font-black text-gray-900">produk jurnalistik, bukan advertorial</strong>.</p>
              <p>Harga yang ditawarkan <strong className="font-black text-gray-900">tidak termasuk backlink</strong>.</p>
            </div>
          </div>

          <PricingFooter />

        </div>
      </section>

      {/* ─── 6.5. PROSES ORDER SECTION ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-20 space-y-4">
            <p className="text-[14px] font-black text-[#990202] uppercase tracking-[0.22em]">PROSES ORDER SAMPAI TERBIT</p>
            <h2 className="font-heading text-[36px] sm:text-[42px] font-extrabold text-gray-900 leading-tight tracking-tight">
              5 langkah simpel — berita kamu naik di media.
            </h2>
            <p className="text-[14px] sm:text-[14px] sm:text-[14.5px] text-gray-500 font-bold leading-relaxed max-w-2xl mx-auto">
              Tim kami pegang seluruh proses, kamu cukup approve naskah final &amp; tunggu laporan terbit.
            </p>
          </div>

          {/* Vertical Timeline Stack */}
          <div className="max-w-[900px] mx-auto space-y-6">

            {/* Step 1 */}
            <div className="flex items-start gap-4 sm:gap-6 text-left">
              {/* Circular Number */}
              <div className="w-12 h-12 rounded-full border-2 border-[#990202] text-[#990202] flex items-center justify-center font-bold text-[16px] sm:text-[17px] flex-shrink-0 mt-2 bg-white">
                01
              </div>

              {/* White Card */}
              <div className="flex-1 bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-[16px] sm:text-[17px] font-black text-gray-900">
                    Konsultasi &amp; Pilih Paket
                  </h4>
                  <div className="bg-[#FFF0F0] text-[#990202] text-[14px] font-black uppercase py-1 px-3.5 rounded-full flex items-center gap-1 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#990202]" strokeWidth={3.5} />
                    <span>1 HARI</span>
                  </div>
                </div>
                <p className="text-[14px] text-gray-600 font-semibold leading-relaxed">
                  Diskusi tujuan publikasi, target audiens, &amp; pilih paket (1, 5, atau 10 media) sesuai budget &amp; jangkauan yang dibutuhkan.
                </p>
                <div className="pt-3.5 border-t border-gray-100/50 space-y-2">
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Identifikasi sudut pandang artikel</span>
                  </div>
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Rekomendasi media sesuai industri</span>
                  </div>
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Finalisasi paket &amp; pembayaran</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 sm:gap-6 text-left">
              {/* Circular Number */}
              <div className="w-12 h-12 rounded-full border-2 border-[#990202] text-[#990202] flex items-center justify-center font-bold text-[16px] sm:text-[17px] flex-shrink-0 mt-2 bg-white">
                02
              </div>

              {/* White Card */}
              <div className="flex-1 bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-[16px] sm:text-[17px] font-black text-gray-900">
                    Penulisan Artikel
                  </h4>
                  <div className="bg-[#FFF0F0] text-[#990202] text-[14px] font-black uppercase py-1 px-3.5 rounded-full flex items-center gap-1 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#990202]" strokeWidth={3.5} />
                    <span>1 HARI</span>
                  </div>
                </div>
                <p className="text-[14px] text-gray-600 font-semibold leading-relaxed">
                  Kamu bisa menyediakan artikel sendiri (250–500 kata), atau minta tim jurnalis kami yang menulis dengan gaya berita profesional.
                </p>
                <div className="pt-3.5 border-t border-gray-100/50 space-y-2">
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Briefing detail untuk tim jurnalis</span>
                  </div>
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Format jurnalistik (bukan iklan)</span>
                  </div>
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Revisi sampai naskah sesuai brand voice</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 sm:gap-6 text-left">
              {/* Circular Number */}
              <div className="w-12 h-12 rounded-full border-2 border-[#990202] text-[#990202] flex items-center justify-center font-bold text-[16px] sm:text-[17px] flex-shrink-0 mt-2 bg-white">
                03
              </div>

              {/* White Card */}
              <div className="flex-1 bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-[16px] sm:text-[17px] font-black text-gray-900">
                    Approve Naskah Final
                  </h4>
                  <div className="bg-[#FFF0F0] text-[#990202] text-[14px] font-black uppercase py-1 px-3.5 rounded-full flex items-center gap-1 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#990202]" strokeWidth={3.5} />
                    <span>0,5 HARI</span>
                  </div>
                </div>
                <p className="text-[14px] text-gray-600 font-semibold leading-relaxed">
                  Naskah final dikirim untuk review &amp; approval. Pastikan semua info akurat &amp; sesuai pesan yang ingin disampaikan ke publik.
                </p>
                <div className="pt-3.5 border-t border-gray-100/50 space-y-2">
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Review akurasi data &amp; angka</span>
                  </div>
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Cek nama produk, brand, &amp; quote</span>
                  </div>
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Sign-off untuk publikasi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4 sm:gap-6 text-left">
              {/* Circular Number */}
              <div className="w-12 h-12 rounded-full border-2 border-[#990202] text-[#990202] flex items-center justify-center font-bold text-[16px] sm:text-[17px] flex-shrink-0 mt-2 bg-white">
                04
              </div>

              {/* White Card */}
              <div className="flex-1 bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-[16px] sm:text-[17px] font-black text-gray-900">
                    Distribusi ke Media
                  </h4>
                  <div className="bg-[#FFF0F0] text-[#990202] text-[14px] font-black uppercase py-1 px-3.5 rounded-full flex items-center gap-1 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#990202]" strokeWidth={3.5} />
                    <span>1–2 HARI</span>
                  </div>
                </div>
                <p className="text-[14px] text-gray-600 font-semibold leading-relaxed">
                  Tim kami submit naskah ke redaksi media yang Anda pilih. Tunggu proses editing &amp; publikasi oleh redaksi masing-masing.
                </p>
                <div className="pt-3.5 border-t border-gray-100/50 space-y-2">
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Submit ke redaksi pilihan</span>
                  </div>
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Koordinasi dengan editor</span>
                  </div>
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Penyesuaian editorial (jika ada)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-4 sm:gap-6 text-left">
              {/* Circular Number */}
              <div className="w-12 h-12 rounded-full border-2 border-[#990202] text-[#990202] flex items-center justify-center font-bold text-[16px] sm:text-[17px] flex-shrink-0 mt-2 bg-white">
                05
              </div>

              {/* White Card */}
              <div className="flex-1 bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-[16px] sm:text-[17px] font-black text-gray-900">
                    Publikasi &amp; Laporan
                  </h4>
                  <div className="bg-[#FFF0F0] text-[#990202] text-[14px] font-black uppercase py-1 px-3.5 rounded-full flex items-center gap-1 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#990202]" strokeWidth={3.5} />
                    <span>FINAL</span>
                  </div>
                </div>
                <p className="text-[14px] text-gray-600 font-semibold leading-relaxed">
                  Artikel terbit di semua media yang dipilih. <strong className="font-extrabold text-gray-900">Kami kirim laporan lengkap berisi semua link publikasi</strong> untuk dokumentasi &amp; arsip brand Anda.
                </p>
                <div className="pt-3.5 border-t border-gray-100/50 space-y-2">
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Bukti terbit semua media</span>
                  </div>
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Link publikasi siap-share</span>
                  </div>
                  <div className="flex items-center text-[14px] font-bold text-gray-700">
                    <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0" strokeWidth={3.5} />
                    <span>Laporan resmi untuk arsip</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 7. FAQ SECTION ─── */}
      <FAQ items={faqs} />

      {/* ─── 8. CTA SECTION ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-t border-gray-100">
        <div className="max-w-[1140px] mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-12 text-left">

          {/* Left Column */}
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-heading text-[20px] sm:text-[40px] font-extrabold leading-tight tracking-tight text-gray-900">
              Siap <span className="text-[#990202]">tayang</span> di media nasional?
            </h2>
            <p className="text-[14px] sm:text-[14px] sm:text-[14px] sm:text-[14.5px] text-gray-500 leading-relaxed font-normal">
              Konsultasi gratis untuk pilih paket &amp; rekomendasi media — tanpa komitmen.
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-auto flex flex-col gap-3 min-w-[320px] sm:min-w-[360px] max-w-[400px]">
            {/* WhatsApp Action */}
            <a
              href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai publikasi Press Release.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[14px] rounded-[14px] transition-all duration-200 cursor-pointer shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.122.953 11.5.953c-5.439 0-9.859 4.37-9.864 9.8-.001 1.73.457 3.41 1.32 4.927l-.982 3.58 3.673-.956zm11.517-5.595c-.3-.15-1.774-.875-2.048-.975-.274-.1-.474-.15-.674.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.463.13-.612.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.625-.924-2.225-.244-.588-.491-.508-.674-.518-.174-.01-.374-.012-.574-.012-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.116 4.52 1.228.531 2.186.848 2.93 1.083.755.238 1.44.205 1.984.124.606-.091 1.774-.725 2.024-1.425.25-.7.25-1.299.175-1.425-.076-.125-.275-.2-.575-.35z" />
              </svg>
              <span>Konsultasi via WhatsApp</span>
            </a>

            {/* Email/Form Action */}
            <a
              href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Jasa Publikasi Press Release Media. Mohon info lengkap biaya dan prosesnya.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-900 shadow-md border border-black/[0.04] hover:border-gray-300 font-extrabold text-[14px] rounded-[14px] transition-all duration-200 cursor-pointer shadow-sm"
            >
              <span>Hubungi Tim Kami</span>
              <span className="text-[15px] font-bold">→</span>
            </a>

            {/* Response Info */}
            <div className="flex items-center justify-center gap-1.5 text-[14px] sm:text-[14px] text-gray-500 font-medium pt-1 px-1">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Respons dalam 5 menit · Senin–Sabtu 08:00–20:00</span>
            </div>
          </div>

        </div>
      </section>

      <MediaCoverage />
    </div>
  );
}
