"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  FileText,
  ShieldCheck,
  Check,
  ArrowRight,
  MessageCircle,
  Clock,
  Sparkles,
  Award,
  Zap,
  Scale,
  Globe,
  FileCheck,
  Files,
  Star,
  Users,
  Shield,
  HelpCircle,
} from "lucide-react";
import MediaCoverage from "@/components/MediaCoverage";
import TrustStatsBar from "@/components/TrustStatsBar";
import Testimonials from "@/components/home/Testimonials";
import Offices from "@/components/Offices";
import FAQ from "@/components/FAQ";
import BottomPromoSection from "@/components/home/BottomPromoSection";
const EASYTAX_STATS = [
  { value: "13.000+", label: "Bisnis Terlayani" },
  { value: "900+", label: "Klien Langganan EasyTax" },
  { value: "5.0", label: "Rating Google EasyTax" },
  { value: "13+", label: "Jenis Layanan EasyTax" },
] as const;


export default function LayananSptPajakGadsPage() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest?.("[data-cta]");
      if (!a) return;
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "wa_click",
        cta_id: a.getAttribute("data-cta"),
        product: "/layanan/spt-pajak-gads",
        cs: "easytax",
      });
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pricingTiers = [
    { omzet: "0 / Tidak beroperasi", badan: "Rp499.000", pribadi: "Rp449.000", popular: false },
    { omzet: "Rp 0 - 600 Juta", badan: "Rp1.499.000", pribadi: "Rp1.349.000", popular: true },
    { omzet: "Rp 600 Jt - 1,2 Miliar", badan: "Rp1.999.000", pribadi: "Rp1.799.000", popular: false },
    { omzet: "Rp 1,2 M - 2,4 Miliar", badan: "Rp2.499.000", pribadi: "Rp2.249.000", popular: false },
    { omzet: "Rp 2,4 M - 3,6 Miliar", badan: "Rp2.999.000", pribadi: "Rp2.699.000", popular: false },
    { omzet: "Rp 3,6 M - 4,8 Miliar", badan: "Rp3.499.000", pribadi: "Rp3.149.000", popular: false },
    { omzet: "> Rp 4,8 Miliar", badan: "Negosiasi", pribadi: "Negosiasi", popular: false },
  ];

  const serviceFeatures = [
    "Penyusunan Laporan Laba Rugi dan Neraca",
    "Penyusunan Draft SPT Tahunan PPh Badan / Pribadi",
    "Pembuatan Kode Billing PPh Tahunan (status kurang bayar)",
    "Pendampingan input dan rekonsiliasi data keuangan",
    "Submit resmi SPT Tahunan ke sistem DJP",
    "Gratis 1x revisi SPT Tahunan PPh dalam 1 tahun",
  ];

  const individualServices = [
    {
      name: "Pengurusan NPWP Badan Usaha",
      desc: "Pembuatan NPWP elektronik resmi untuk PT, CV, Yayasan, dan Koperasi.",
      price: "Rp 499.000",
      badge: "Wajib Pajak Baru",
      icon: Building2,
      circleBg: "#B91C1C",
      cardTint: "#FEF2F2",
    },
    {
      name: "Pengurusan NPWP Orang Pribadi",
      desc: "Pendaftaran NPWP pribadi untuk karyawan, komisaris, dan pemilik bisnis.",
      price: "Rp 349.000",
      badge: "Individu & Direksi",
      icon: FileText,
      circleBg: "#059669",
      cardTint: "#ECFDF5",
    },
    {
      name: "Pendaftaran & Pengukuhan PKP",
      desc: "Pengukuhan Pengusaha Kena Pajak, aktivasi e-Faktur, dan sertifikat elektronik.",
      price: "Rp 1.499.000 - Rp 2.249.000",
      badge: "Faktur Pajak & SK PKP",
      icon: ShieldCheck,
      circleBg: "#2563EB",
      cardTint: "#EFF6FF",
    },
    {
      name: "Jasa Pengurusan EFIN Badan",
      desc: "Aktivasi nomor identitas digital resmi DJP untuk lapor pajak online.",
      price: "Rp 250.000",
      badge: "DJP Online Cepat",
      icon: Zap,
      circleBg: "#D97706",
      cardTint: "#FFFBEB",
    },
    {
      name: "Laporan Keuangan dari KAP",
      desc: "Audit laporan keuangan independen oleh Kantor Akuntan Publik terdaftar.",
      price: "Hubungi Kami",
      badge: "Audit Resmi KAP",
      icon: Award,
      circleBg: "#7C3AED",
      cardTint: "#F5F3FF",
    },
    {
      name: "Laporan Keuangan Kompilasi",
      desc: "Penyusunan pembukuan neraca dan laba rugi bulanan maupun tahunan siap saji.",
      price: "Hubungi Kami",
      badge: "Kompilasi Standar PSAK",
      icon: FileCheck,
      circleBg: "#0891B2",
      cardTint: "#ECFEFF",
    },
    {
      name: "Tax Opinion Investor Asing",
      desc: "Kajian kepatuhan pajak komprehensif bagi perusahaan PMA dan penanaman modal.",
      price: "Hubungi Kami",
      badge: "PMA & Lintas Negara",
      icon: Globe,
      circleBg: "#1E3A5F",
      cardTint: "#F0F4FF",
    },
    {
      name: "Transfer Pricing Documentation",
      desc: "Penyusunan Master File dan Local File sesuai regulasi transfer pricing DJP.",
      price: "Hubungi Kami",
      badge: "Regulasi TP DJP",
      icon: Scale,
      circleBg: "#DC2626",
      cardTint: "#FEF2F2",
    },
  ];

  const litigationServices = [
    {
      title: "Keberatan ke Kanwil DJP",
      desc: "Pendampingan formal penolakan Surat Ketetapan Pajak (SKP) atau SP2DK dengan argumentasi yuridis kuat.",
      tag: "Tahap Kanwil",
    },
    {
      title: "Banding & Gugatan Pengadilan Pajak",
      desc: "Penyusunan surat banding resmi dan pendampingan sidang oleh kuasa hukum pajak berlisensi.",
      tag: "Pengadilan Pajak",
    },
    {
      title: "Peninjauan Kembali (PK) Mahkamah Agung",
      desc: "Upaya hukum luar biasa ke Mahkamah Agung atas putusan Pengadilan Pajak yang berkekuatan hukum tetap.",
      tag: "Tingkat Kasasi / PK",
    },
  ];

  const faqItems = [
    {
      q: "Apa hubungan EasyTax dengan EasyLegal?",
      a: "EasyTax dan EasyLegal adalah unit layanan resmi dari ekosistem grup EasyCorp. EasyTax berfokus pada perpajakan dan pelaporan akuntansi, sementara EasyLegal menangani legalitas dan perizinan usaha. Konsultasi dan pengerjaan layanan pajak dikerjakan langsung oleh tim akuntan dan konsultan pajak EasyTax.",
    },
    {
      q: "Apa perbedaan lapor SPT Tahunan mandiri dengan konsultan pajak?",
      a: "Lapor mandiri mengharuskan Anda menghitung, menyusun neraca laba rugi, dan mengisi formulir DJP sendiri. Bersama EasyTax, seluruh berkas laporan keuangan, draft SPT, penerbitan kode billing, hingga bukti penerimaan elektronik diselesaikan oleh tim profesional sehingga Anda terhindar dari risiko denda administrasi.",
    },
    {
      q: "Apa keunggulan menggunakan jasa lapor SPT tahunan EasyTax?",
      a: "Proses 100% online tanpa perlu antre di KPP. Seluruh perhitungan dikerjakan sesuai ketentuan perpajakan terbaru, tarif transparan berdasarkan omzet, serta mendapatkan fasilitas gratis 1 kali revisi dalam setahun.",
    },
    {
      q: "Apa saja dokumen yang harus disiapkan sebelum lapor SPT Tahunan?",
      a: "Dokumen umum meliputi NPWP, rekening koran atau rekapan omzet selama satu tahun pajak, bukti potong (jika ada), serta laporan keuangan sederhana. Tim EasyTax akan memberikan panduan checklist berkas saat sesi konsultasi awal.",
    },
    {
      q: "Bagaimana proses pengerjaan lapor SPT di EasyTax?",
      a: "Alur pengerjaan dimulai dari konsultasi via WhatsApp, penyerahan data keuangan, penyusunan neraca dan laba rugi, pengecekan draft SPT bersama klien, pembuatan kode billing bila berstatus kurang bayar, lalu submit final ke DJP hingga Bukti Penerimaan Elektronik (BPE) terbit.",
    },
    {
      q: "Apakah melayani laporan SPT untuk seluruh wilayah Indonesia?",
      a: "Ya, layanan EasyTax melayani klien dari Sabang sampai Merauke secara digital. Dokumen dapat dikirimkan secara daring dan komunikasi dilakukan melalui WhatsApp serta email resmi.",
    },
  ];

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-red-100 selection:text-[#990202]">

      {/* ── HERO SECTION (Identik dengan arsitektur Hero.tsx di home .id) ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FEFAF6] via-[#FAF3EC] to-[#FEFAF6] border-b border-[#FAF0E6]/80 min-h-[580px] lg:min-h-[640px] flex items-center">
        <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 py-10 sm:py-16 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-xs text-gray-500 sm:mb-10 sm:text-sm"
          >
            <Link href="/" className="transition-colors hover:text-[#990202]">
              Beranda
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/layanan" className="transition-colors hover:text-[#990202]">
              Layanan
            </Link>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-800">Lapor SPT Tahunan</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content (Split Hero ala home .id) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Badge Tag */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-red-100 bg-white text-[#D62828] text-xs sm:text-sm font-bold tracking-wide w-fit mb-4 sm:mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#D62828] animate-pulse" />
                <span>LAYANAN PERPAJAKAN &middot; SPT TAHUNAN</span>
              </div>

              {/* Headline (Display stack ala home .id: 3 baris terarah) */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tighter leading-[1.08] mb-5">
                <span className="block">LAPOR SPT TAHUNAN</span>
                <span className="block">TEPAT WAKTU &</span>
                <span className="block text-[#990202]">SESUAI REGULASI.</span>
              </h1>

              {/* Subtext: Ringkas, tajam, maksimal 20 kata */}
              <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed mb-8 max-w-[560px]">
                EasyTax bersama EasyLegal menyusun neraca laba rugi, draft SPT, hingga terbit BPE resmi DJP. Mulai <strong>Rp499.000</strong>.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <a
                  href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20konsultasi%20mengenai%20layanan%20Lapor%20SPT%20Tahunan."
                  data-cta="hero-consult"
                  className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-[#990202] hover:bg-[#7A0101] shadow-lg shadow-red-950/20 active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Konsultasi Gratis</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>

                <a
                  href="#biaya-spt"
                  onClick={(e) => scrollToSection(e, "biaya-spt")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 active:scale-[0.98] transition-all shadow-sm"
                >
                  <span>Lihat Biaya Lapor SPT</span>
                </a>
              </div>

              {/* Trust Badges Bar (Checklist hijau ala home .id) */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-[#FAF0E6] text-xs sm:text-sm font-semibold text-gray-700">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#D62828] stroke-[3]" />
                  <span>Biaya Mulai Rp499rb</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#D62828] stroke-[3]" />
                  <span>1x Revisi Gratis Setahun</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#D62828] stroke-[3]" />
                  <span>100% Online Seluruh Indonesia</span>
                </div>
              </div>
            </div>

            {/* Right Visual (Aset daur ulang resmi + Glassmorphism card stack) */}
            <div className="lg:col-span-5">
              {/* Document card above the photo */}
              <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="rounded-md bg-red-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#990202]">
                    SPT TAHUNAN RESMI
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                    <Check className="h-3 w-3 stroke-[3]" /> Terverifikasi DJP
                  </span>
                </div>
                <div className="mb-1 text-sm font-extrabold leading-snug text-gray-900 sm:text-base">
                  PPh Badan Usaha & Orang Pribadi
                </div>
                <p className="text-xs leading-normal text-gray-500">
                  Penyusunan neraca laba rugi, kode billing, dan penerbitan BPE resmi.
                </p>
              </div>

              <div className="relative">
                <div className="group relative overflow-hidden rounded-3xl border border-black/[0.04] bg-white shadow-2xl">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 sm:aspect-[16/11]">
                    <Image
                      src="/images/hero/hero-badan-usaha-v2.jpg"
                      alt="Konsultan Pajak EasyTax EasyLegal"
                      fill
                      sizes="(max-width: 768px) 100vw, 550px"
                      className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  </div>
                </div>

                {/* Floating Pill: Rating Google */}
                <div className="absolute -right-3 -top-4 z-20 hidden items-center gap-3 rounded-2xl border border-gray-150 bg-white px-4 py-2.5 shadow-xl sm:flex">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 font-black text-amber-500">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-gray-950">4.9 / 5.0 Rating</div>
                    <div className="text-[11px] font-medium text-gray-500">700+ Ulasan Klien Google</div>
                  </div>
                </div>

                {/* Floating Pill: Garansi Kepatuhan */}
                <div className="absolute -bottom-5 -left-3 z-20 hidden items-center gap-3 rounded-2xl border border-gray-150 bg-white px-4 py-2.5 shadow-xl sm:flex">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 font-black text-emerald-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-gray-950">Garansi Kepatuhan</div>
                    <div className="text-[11px] font-medium text-gray-500">Bebas Denda Administrasi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR (Recycled TrustStatsBar from Home) ── */}
      <TrustStatsBar stats={EASYTAX_STATS} tone="blue" />

      {/* ── TENTANG SPT (3-Card Feature Grid) ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-100 bg-[#FEF2F2] text-[#990202] text-xs font-bold uppercase tracking-wider mb-3">
              Kepatuhan Perpajakan
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 tracking-tight mb-4">
              Urus Kewajiban Pajak Tanpa Antre
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Dengan layanan EasyTax bersama EasyLegal bagian dari EasyCorp, Anda dapat menuntaskan seluruh kewajiban pajak tahunan tanpa repot mengantre di kantor pajak.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl border border-gray-200/90 p-7 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center mb-5">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2.5">SPT Badan Usaha</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Mencerminkan aktivitas keuangan dan kewajiban pajak perusahaan (PT, CV, Yayasan), memastikan kepatuhan dan akuntabilitas di mata hukum.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-[#990202] flex items-center gap-1">
                Laporan Keuangan & Laba Rugi <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/90 p-7 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#990202] flex items-center justify-center mb-5">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2.5">SPT Orang Pribadi</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Berfokus pada pelaporan penghasilan individu, pemegang saham, pemilik bisnis, dan profesional agar data harta dan pajak terdaftar rapi.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-[#990202] flex items-center gap-1">
                Formulir 1770 / 1770 S <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/90 p-7 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2.5">Patuh & Akuntabel</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Memenuhi seluruh regulasi perpajakan yang berlaku, menjamin legalitas bisnis tetap aman dari sanksi administrasi atau denda pajak.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                Bukti Penerimaan Elektronik Resmi <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANNER NASIONAL (Recycled Asset) ── */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F1B3D] via-[#17205F] to-[#1E293B] text-white p-8 sm:p-12 shadow-xl">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
              <Image
                src="/hero-tentang-kami.webp"
                alt="Tim EasyLegal Indonesia"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="relative z-10 max-w-xl">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full mb-4">
                Jangkauan Seluruh Indonesia
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-white">
                Melayani Urusan Pajak dari Sabang sampai Merauke
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                Tidak perlu datang ke kantor fisik. Konsultasikan laporan SPT Anda bersama tim konsultan kami lewat WhatsApp dan selesaikan semuanya dari meja kerja Anda.
              </p>
              <a
                href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20konsultasi%20layanan%20SPT%20Tahunan."
                data-cta="banner-consult"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white text-[#17205F] hover:bg-gray-100 active:scale-[0.98] transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-[#17205F]" />
                <span>Konsultasi Gratis Sekarang</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABEL BIAYA SPT TAHUNAN (#biaya-spt) ── */}
      <section id="biaya-spt" className="py-16 sm:py-24 bg-white scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-100 bg-[#FEF2F2] text-[#990202] text-xs font-bold uppercase tracking-wider mb-3">
              Biaya Layanan Transparan
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 tracking-tight mb-4">
              Biaya Jasa Lapor SPT Tahunan
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Pilih tarif sesuai skala omzet per tahun bisnis Anda. Tidak ada biaya tersembunyi.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl border-2 border-[#17205F] shadow-xl overflow-hidden">
            {/* Table Header */}
            <div className="bg-[#17205F] text-white px-6 py-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold tracking-tight">Tarif Lapor SPT Berdasarkan Omzet</h3>
                <p className="text-xs text-gray-300">Berlaku untuk Badan Usaha (PT, CV, Yayasan) dan Orang Pribadi</p>
              </div>
              <span className="hidden sm:inline-block bg-amber-400 text-[#17205F] text-xs font-extrabold px-3 py-1 rounded-full">
                Mulai Rp499rb
              </span>
            </div>

            {/* Table Body */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100/80 border-b border-gray-200 text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                    <th className="py-3.5 px-4 sm:px-6">Omzet per Tahun</th>
                    <th className="py-3.5 px-4 text-center">Badan Usaha</th>
                    <th className="py-3.5 px-4 sm:px-6 text-center">Orang Pribadi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                  {pricingTiers.map((tier, idx) => (
                    <tr
                      key={idx}
                      className={tier.popular ? "bg-red-50/50 font-semibold" : "hover:bg-gray-50/80 transition-colors"}
                    >
                      <td className="py-3.5 px-4 sm:px-6 text-gray-900 font-medium flex items-center gap-2">
                        {tier.popular && (
                          <span className="inline-block w-2 h-2 rounded-full bg-[#990202]" title="Paling Sering Dipilih" />
                        )}
                        <span>{tier.omzet}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-[#17205F]">
                        {tier.badan}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-center font-bold text-gray-700">
                        {tier.pribadi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Feature Checklist Box */}
            <div className="bg-amber-50/80 border-t border-amber-200/60 p-6 sm:p-8">
              <h4 className="text-sm font-extrabold text-[#17205F] uppercase tracking-wider mb-4">
                Fitur & Layanan Sudah Termasuk:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-800">
                {serviceFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#17205F] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 pt-6 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-600 text-center sm:text-left">
                  Konsultasi dan estimasi biaya ditangani langsung oleh <strong>Customer Care EasyTax</strong>.
                </div>
                <a
                  href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20tertarik%20dengan%20jasa%20Lapor%20SPT%20Tahunan.%20Mohon%20info%20biaya%20sesuai%20omzet%20dan%20prosesnya."
                  data-cta="price-consult"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#17205F] hover:bg-[#0F1748] active:scale-[0.98] transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Konsultasi Biaya via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KATALOG LENGKAP LAYANAN PERPAJAKAN (Redesign ala LayananKami.tsx di home .id) ── */}
      <section className="py-16 sm:py-24 bg-[#FAF9F6] relative border-t border-gray-150" id="katalog-layanan">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
          
          {/* Header Section */}
          <div className="max-w-3xl mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-bold text-[#990202] uppercase tracking-[0.15em] block mb-2">
              SOLUSI PERPAJAKAN LENGKAP
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-[1.2]">
              Katalog Layanan Perpajakan EasyTax untuk Bisnis Anda.
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-2xl leading-relaxed">
              Solusi komprehensif mulai dari administrasi pajak dasar, audit keuangan, hingga pendampingan sengketa hukum pajak.
            </p>
          </div>

          {/* Two-Column Layout ala Home .id */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 sm:gap-8 items-start">
            
            {/* LEFT: Grid 8 Layanan Perpajakan Utama */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {individualServices.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={`https://wa.me/628175706273?text=${encodeURIComponent(`Halo EasyTax, saya ingin konsultasi mengenai layanan ${item.name}.`)}`}
                    data-cta={`katalog-${idx}`}
                    className="group rounded-2xl p-5 hover:shadow-md shadow-sm border border-black/[0.04] transition-all duration-200 flex flex-col justify-between min-h-[170px] text-left hover:border-red-200 active:scale-[0.99]"
                    style={{
                      background: `linear-gradient(to bottom right, #ffffff 40%, ${item.cardTint} 130%)`,
                    }}
                  >
                    <div>
                      {/* Top Bar with Icon & Badge */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm"
                          style={{ backgroundColor: item.circleBg }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold text-gray-500 bg-white/90 border border-gray-100 px-2.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#990202] transition-colors leading-snug mb-1.5">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom Price Tag */}
                    <div className="pt-3 mt-3 border-t border-gray-100/80 flex items-center justify-between">
                      <span className="text-xs font-black text-[#17205F]">{item.price}</span>
                      <span className="text-xs font-bold text-[#990202] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Konsultasi <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* RIGHT: Featured Navy Card — Litigasi & Sengketa Pajak */}
            <div className="bg-[#17205F] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-5">
                  <Shield className="w-3.5 h-3.5 text-amber-300" />
                  <span>Pendampingan Khusus</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 text-white">
                  Litigasi & Sengketa Pajak
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                  Didampingi langsung oleh Kuasa Hukum Pengadilan Pajak dan Konsultan Pajak Berizin resmi dari Kemenkeu RI.
                </p>

                {/* List of litigation services */}
                <div className="space-y-3.5 mb-8">
                  {litigationServices.map((lit, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                          {lit.tag}
                        </span>
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                      </div>
                      <div className="font-bold text-sm text-white leading-snug mb-1">
                        {lit.title}
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        {lit.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card CTA */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20butuh%20pendampingan%20litigasi%20atau%20sengketa%20pajak."
                  data-cta="litigasi-consult"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-[#17205F] bg-amber-400 hover:bg-amber-300 active:scale-[0.98] transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-[#17205F]" />
                  <span>Konsultasi Litigasi Pajak</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MEDIA COVERAGE & KLIEN (Recycled Component) ── */}
      <MediaCoverage />

      {/* ── TESTIMONIALS (Recycled Component) ── */}
      <Testimonials />

      {/* ── OFFICES (Recycled Component) ── */}
      <Offices
        title="Kantor Operasional EasyLegal & EasyTax"
        subtitle="Proses Online Seluruh Indonesia"
        description="Seluruh proses dapat dikerjakan secara digital tanpa keluar rumah. Bila membutuhkan tatap muka, kantor kami siap menyambut Anda."
      />

      {/* ── FAQ (Recycled Component) ── */}
      <FAQ
        title="Pertanyaan yang Sering Diajukan Tentang Lapor SPT"
        subtitle="Informasi lengkap seputar mekanisme dan proses pelaporan SPT tahunan bersama EasyTax."
        items={faqItems}
      />

      {/* ── BOTTOM PROMO SECTION (Recycled Component) ── */}
      <BottomPromoSection />
    </div>
  );
}
