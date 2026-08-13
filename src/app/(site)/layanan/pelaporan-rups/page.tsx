"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Home,
  FileText,
  Clock,
  Users,
  ShieldCheck,
  AlertTriangle,
  Building2,
  ClipboardList,
  Scale,
  Gavel,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import BottomPromoSection from "@/components/home/BottomPromoSection";
import Pricing, { PricingPackage } from "@/components/Pricing";
import PricingFooter from "@/components/PricingFooter";
import MediaCoverage from "@/components/MediaCoverage";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/home/Testimonials";
import { getWhatsAppLink } from "@/lib/config";

/* ─── DATA ─── */

const steps = [
  {
    no: "01",
    title: "Konsultasi & Data",
    desc: "PLA kumpulkan data PT & tahun buku terkait."
  },
  {
    no: "02",
    title: "Penyusunan Laporan",
    desc: "Legal Officer susun Laporan Tahunan PT."
  },
  {
    no: "03",
    title: "Tanda Tangan Draft",
    desc: "Anda tanda tangan draft akta & payment."
  },
  {
    no: "04",
    title: "Terdaftar Resmi",
    desc: "Akta & surat pendaftaran Kemenkumham terbit, 7-10 hari kerja."
  }
];

const rupsFaqs = [
  {
    q: "Apa itu RUPS dan kapan wajib diselenggarakan?",
    a: "RUPS (Rapat Umum Pemegang Saham) adalah forum pengambilan keputusan tertinggi di dalam suatu PT. RUPS Tahunan wajib diselenggarakan paling lambat 6 bulan setelah tahun buku berakhir (biasanya Juni tiap tahun) untuk menyetujui laporan keuangan dan menetapkan penggunaan laba. RUPS Luar Biasa (RUPSLB) diadakan sewaktu-waktu jika ada keputusan mendesak seperti pergantian direksi, penambahan modal, atau perubahan anggaran dasar.",
  },
  {
    q: "Apa yang terjadi kalau PT tidak mengadakan RUPS Tahunan?",
    a: "Tidak menyelenggarakan RUPS Tahunan merupakan pelanggaran UU PT No. 40/2007. Direksi atau Dewan Komisaris yang tidak menjalankan kewajiban ini dapat dikenakan sanksi perdata oleh pemegang saham, dan perusahaan berisiko mengalami dispute internal yang merusak validitas keputusan manajemen.",
  },
  {
    q: "Berapa kuorum minimal yang dibutuhkan untuk RUPS sah?",
    a: "Untuk RUPS biasa (perubahan non-AD): kuorum kehadiran minimal 1/2 dari seluruh saham, keputusan sah jika disetujui lebih dari 1/2 saham yang hadir. Untuk RUPS perubahan Anggaran Dasar: kuorum 2/3 dan keputusan disetujui minimal 2/3 saham hadir. Ketentuan dapat lebih ketat jika AD mengaturnya.",
  },
  {
    q: "Kapan akta RUPS harus dilaporkan ke Kemenkumham?",
    a: "Jika RUPS memutuskan perubahan yang memerlukan persetujuan (misal: perubahan modal, nama perusahaan), wajib diajukan ke Kemenkumham dalam 60 hari sejak akta ditandatangani. Untuk perubahan yang hanya butuh pemberitahuan (misal: perubahan pengurus), batas waktu sama 60 hari, namun terhitung sejak tanggal akta.",
  },
  {
    q: "Apakah RUPS harus dihadiri Notaris?",
    a: "RUPS tidak selalu wajib dihadiri Notaris, namun sangat disarankan — terutama jika menghasilkan keputusan yang mengubah Anggaran Dasar. Akta Notaris (Berita Acara RUPS) memberikan kekuatan hukum yang lebih kuat dibandingkan hanya notulen internal. Untuk RUPS Luar Biasa yang mengubah AD, kehadiran Notaris praktis wajib agar akta bisa didaftarkan ke Kemenkumham.",
  },
  {
    q: "Berapa lama proses EasyLegal mengurus RUPS?",
    a: "Proses RUPS bersama EasyLegal berlangsung 7–14 hari kerja, mulai dari persiapan undangan, penyelenggaraan, penyusunan akta, hingga pelaporan ke Kemenkumham (jika ada perubahan AD). Estimasi waktu tergantung kompleksitas agenda dan jadwal notaris yang ditunjuk.",
  },
];

const dokumen = [
  { label: "Akta pendirian PT & perubahannya (lengkap)", icon: FileText },
  { label: "KTP & NPWP semua pemegang saham & pengurus", icon: Users },
  { label: "Susunan pemegang saham terkini (DPS)", icon: ClipboardList },
  { label: "Laporan keuangan tahun buku (untuk RUPST)", icon: FileText },
  { label: "Agenda & materi rapat yang akan dibahas", icon: ClipboardList },
  { label: "SK Kemenkumham terakhir", icon: Gavel },
];

const rupsBenefits = [
  {
    icon: <ShieldCheck className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Kepatuhan Sesuai UU PT",
    desc: "Laporan Tahunan & Akta Penegasan RUPS disusun sesuai UU No. 40/2007, menghindarkan PT Anda dari pelanggaran kewajiban hukum."
  },
  {
    icon: <AlertTriangle className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Terhindar dari Sanksi",
    desc: "RUPS Tahunan yang telat atau tidak dilaporkan berisiko sanksi administratif & dispute internal antar pemegang saham."
  },
  {
    icon: <Users className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Ditangani Legal Officer",
    desc: "Penyusunan laporan & akta dikerjakan Legal Officer berpengalaman, didampingi Personal Legal Assistant dari awal sampai selesai."
  },
  {
    icon: <Clock className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Proses Cepat 7-10 Hari",
    desc: "Dari penyusunan draft hingga surat pendaftaran Kemenkumham terbit, seluruh proses selesai dalam 7-10 hari kerja."
  }
];

/* ─── COMPONENT ─── */

const packages = [
  {
    name: "PAKET START",
    originalPrice: "Rp 4.000.000",
    price: "Rp 1.999.000",
    badge: "DISKON 50% - TANPA BIAYA TAMBAHAN",
    duration: "7-10 Hari Kerja",
    obtained: [
      "Penyusunan Laporan Tahunan PT",
      "Akta Penegasan RUPS Laporan Tahunan PT",
      "Surat Pemberitahuan / Pendaftaran Kemenkumham atas Pelaporan Tahunan PT",
    ],
    bonus: [
      "Layanan Personal Legal Assistant",
      "1 Kupon Undian iPhone",
    ],
    extraBonus: [
      "Voucher EasyLegal Rp 250.000",
      "Dokumen SOP Karyawan",
      "Dokumen SOP Perusahaan",
      "Dokumen Kontrak Bisnis",
    ],
    buttonText: "Pilih Paket Basic",
    buttonType: "outline",
    waText: "Halo EasyLegal, saya tertarik dengan Paket RUPS Start."
  },
  {
    name: "PAKET 1-5 KBLI",
    originalPrice: "Rp 4.000.000",
    price: "Rp 1.999.000",
    badge: "DISKON 50% - TANPA BIAYA TAMBAHAN",
    duration: "7-10 Hari Kerja",
    obtained: [
      "Penyusunan Laporan Tahunan PT",
      "Akta Penegasan RUPS Laporan Tahunan PT",
      "Surat Pemberitahuan / Pendaftaran Kemenkumham atas Pelaporan Tahunan PT",
    ],
    bonus: [
      "Layanan Personal Legal Assistant",
      "1 Kupon Undian iPhone",
    ],
    extraBonus: [
      "Voucher EasyLegal Rp 250.000",
      "Dokumen SOP Karyawan",
      "Dokumen SOP Perusahaan",
      "Dokumen Kontrak Bisnis",
    ],
    buttonText: "Pilih Paket Complete",
    buttonType: "solid",
    waText: "Halo EasyLegal, saya tertarik dengan Paket RUPS 1-5 KBLI."
  },
  {
    name: "PAKET 6-10 KBLI",
    originalPrice: "Rp 4.500.000",
    price: "Rp 2.249.000",
    badge: "DISKON 50% - TANPA BIAYA TAMBAHAN",
    duration: "7-10 Hari Kerja",
    obtained: [
      "Penyusunan Laporan Tahunan PT",
      "Akta Penegasan RUPS Laporan Tahunan PT",
      "Surat Pemberitahuan / Pendaftaran Kemenkumham atas Pelaporan Tahunan PT",
    ],
    bonus: [
      "Layanan Personal Legal Assistant",
      "1 Kupon Undian iPhone",
    ],
    extraBonus: [
      "Voucher EasyLegal Rp 250.000",
      "Dokumen SOP Karyawan",
      "Dokumen SOP Perusahaan",
      "Dokumen Kontrak Bisnis",
    ],
    buttonText: "Pilih Paket Complete",
    buttonType: "solid",
    waText: "Halo EasyLegal, saya tertarik dengan Paket RUPS 6-10 KBLI."
  },
  {
    name: "PAKET 10-15 KBLI",
    originalPrice: "Rp 5.000.000",
    price: "Rp 2.499.000",
    badge: "DISKON 50% - TANPA BIAYA TAMBAHAN",
    duration: "7-10 Hari Kerja",
    obtained: [
      "Penyusunan Laporan Tahunan PT",
      "Akta Penegasan RUPS Laporan Tahunan PT",
      "Surat Pemberitahuan / Pendaftaran Kemenkumham atas Pelaporan Tahunan PT",
    ],
    bonus: [
      "Layanan Personal Legal Assistant",
      "1 Kupon Undian iPhone",
    ],
    extraBonus: [
      "Voucher EasyLegal Rp 250.000",
      "Dokumen SOP Karyawan",
      "Dokumen SOP Perusahaan",
      "Dokumen Kontrak Bisnis",
    ],
    buttonText: "Pilih Paket Complete",
    buttonType: "solid",
    waText: "Halo EasyLegal, saya tertarik dengan Paket RUPS 10-15 KBLI."
  },
  {
    name: "PAKET 16-20 KBLI",
    originalPrice: "Rp 5.500.000",
    price: "Rp 2.749.000",
    badge: "DISKON 50% - TANPA BIAYA TAMBAHAN",
    duration: "7-10 Hari Kerja",
    obtained: [
      "Penyusunan Laporan Tahunan PT",
      "Akta Penegasan RUPS Laporan Tahunan PT",
      "Surat Pemberitahuan / Pendaftaran Kemenkumham atas Pelaporan Tahunan PT",
    ],
    bonus: [
      "Layanan Personal Legal Assistant",
      "1 Kupon Undian iPhone",
    ],
    extraBonus: [
      "Voucher EasyLegal Rp 250.000",
      "Dokumen SOP Karyawan",
      "Dokumen SOP Perusahaan",
      "Dokumen Kontrak Bisnis",
    ],
    buttonText: "Pilih Paket Complete",
    buttonType: "solid",
    waText: "Halo EasyLegal, saya tertarik dengan Paket RUPS 16-20 KBLI."
  },
  {
    name: "PAKET >20 KBLI",
    originalPrice: "Rp 6.000.000",
    price: "Rp 2.999.000",
    badge: "DISKON 50% - TANPA BIAYA TAMBAHAN",
    duration: "7-10 Hari Kerja",
    obtained: [
      "Penyusunan Laporan Tahunan PT",
      "Akta Penegasan RUPS Laporan Tahunan PT",
      "Surat Pemberitahuan / Pendaftaran Kemenkumham atas Pelaporan Tahunan PT",
    ],
    bonus: [
      "Layanan Personal Legal Assistant",
      "1 Kupon Undian iPhone",
    ],
    extraBonus: [
      "Voucher EasyLegal Rp 250.000",
      "Dokumen SOP Karyawan",
      "Dokumen SOP Perusahaan",
      "Dokumen Kontrak Bisnis",
    ],
    buttonText: "Pilih Paket Complete",
    buttonType: "solid",
    waText: "Halo EasyLegal, saya tertarik dengan Paket RUPS >20 KBLI."
  }
];

export default function PelaporanRUPS() {
  const [activePkgIdx, setActivePkgIdx] = useState(1);
  const desktopCarouselRef = useRef<HTMLDivElement>(null);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  const scrollDesktopLeft = () => {
    if (desktopCarouselRef.current) {
      desktopCarouselRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollDesktopRight = () => {
    if (desktopCarouselRef.current) {
      desktopCarouselRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  const scrollMobileLeft = () => {
    if (mobileCarouselRef.current) {
      mobileCarouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollMobileRight = () => {
    if (mobileCarouselRef.current) {
      mobileCarouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const scrollToDesktopCard = (index: number) => {
    if (desktopCarouselRef.current) {
      const container = desktopCarouselRef.current;
      const cardEl = container.children[index] as HTMLElement;
      if (cardEl) {
        const targetScroll = cardEl.offsetLeft - (container.clientWidth / 2) + (cardEl.clientWidth / 2);
        container.scrollTo({
          left: targetScroll,
          behavior: "smooth"
        });
      }
      setActivePkgIdx(index);
    }
  };

  const scrollToMobileCard = (index: number) => {
    if (mobileCarouselRef.current) {
      const container = mobileCarouselRef.current;
      const cardEl = container.children[index] as HTMLElement;
      if (cardEl) {
        const targetScroll = cardEl.offsetLeft - (container.clientWidth / 2) + (cardEl.clientWidth / 2);
        container.scrollTo({
          left: targetScroll,
          behavior: "smooth"
        });
      }
      setActivePkgIdx(index);
    }
  };

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("paket-harga");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };


  const pricingPackages: PricingPackage[] = packages.map((pkg, index) => ({
    title: pkg.name,
    price: pkg.price.replace("Rp ", ""),
    strikePrice: pkg.originalPrice,
    subLabel: pkg.badge,
    isPopular: index === 1,
    buttonText: pkg.buttonText,
    buttonLink: getWhatsAppLink(pkg.waText),
    groups: [
      {
        title: "LAMA PROSES",
        items: [{ text: pkg.duration, checked: true }]
      },
      {
        title: "YANG DIPEROLEH",
        items: pkg.obtained.map(item => ({ text: item, checked: true }))
      },
      {
        title: "BONUS",
        items: pkg.bonus.map(item => ({ text: item, checked: true }))
      },
      {
        title: "EXTRA BONUS",
        items: pkg.extraBonus.map(item => ({ text: item, checked: true }))
      }
    ]
  }));

  return (
    <div>
      {/* ════════════════════════════════════════════
          DESKTOP VIEW
      ════════════════════════════════════════════ */}
        <div className="has-service-cta flex flex-col min-h-screen bg-[#FCFBFA] text-gray-900 font-sans">

          {/* ─── 1. HERO ─── */}
          <section className="bg-white py-10 lg:py-20 border-b border-gray-200/50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-500/[0.01] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/[0.01] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                {/* Left Column */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  {/* Breadcrumb */}
                  <nav className="flex items-center space-x-2 text-[16px] font-medium text-gray-500">
                    <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                      <Home className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
                      <span>Beranda</span>
                    </Link>
                    <span className="text-gray-300 font-normal">&gt;</span>
                    <span className="text-gray-500 font-medium">Layanan</span>
                    <span className="text-gray-300 font-normal">&gt;</span>
                    <span className="text-[16px] font-bold text-gray-900">Pelaporan RUPS</span>
                  </nav>

                  {/* Badge */}
                  <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1.5 px-4 rounded-full border border-red-100/50 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                    <span className="text-[16px] font-extrabold text-[#990202] tracking-wider uppercase">Pelaporan RUPS</span>
                  </div>

                  {/* Headline */}
                  <h1 className="font-heading text-[28px] sm:text-[42px] lg:text-[52px] font-extrabold text-gray-950 leading-[1.1] tracking-tight">
                    Urus RUPS Tahunan Anda{" "}
                    <span className="text-[#990202]">Tanpa Ribet.</span>
                  </h1>

                  {/* Description */}
                  <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed max-w-2xl font-normal">
                    Setiap PT wajib menyelenggarakan RUPS Tahunan &amp; melaporkannya ke Kemenkumham. Telat atau salah prosedur bisa berujung sanksi administratif. EasyLegal membantu dalam pengurusan mulai dari susun laporan, buat akta penegasan, dan daftarkan.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <a
                      href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai Pengurusan RUPS Tahunan perusahaan saya.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[16px] rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer"
                    >
                      Konsultasi Gratis
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="#paket-harga"
                      onClick={scrollToPricing}
                      className="inline-flex items-center justify-center px-7 py-4 border border-gray-250 text-gray-800 font-extrabold text-[16px] rounded-xl bg-white hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer"
                    >
                      Lihat Paket Harga
                    </a>
                  </div>

                  {/* Checkpoints */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-[650px]">
                    <div className="flex items-center space-x-3 bg-[#FFF5F5] p-2.5 rounded-xl border border-red-50/50 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-red-100">
                        <Clock className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                      </div>
                      <div>
                        <div className="text-[16px] font-black text-gray-900">Durasi 7–10</div>
                        <div className="text-[16px] text-gray-500 font-semibold mt-1">Hari kerja</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-[#FFF5F5] p-2.5 rounded-xl border border-red-50/50 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-red-100">
                        <svg className="w-4 h-4 text-[#990202]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="text-[16px] font-black text-gray-900">Diskon 50%</div>
                        <div className="text-[16px] text-gray-500 font-semibold mt-1">Promo terbatas</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-[#FFF5F5] p-2.5 rounded-xl border border-red-50/50 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-red-100">
                        <svg className="w-4 h-4 text-[#990202]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="16 16 12 12 8 16"></polyline>
                          <line x1="12" y1="12" x2="12" y2="21"></line>
                          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="text-[16px] font-black text-gray-900">100% Online</div>
                        <div className="text-[16px] text-gray-500 font-semibold mt-1">Tanpa keluar rumah</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Photo */}
                <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-8 lg:mt-0">
                  <div className="relative w-full max-w-[480px] aspect-[1.1] rounded-[24px] shadow-2xl border border-gray-800/10">
                    <Image
                      src="/images/rups-meeting.jpg"
                      alt="Business Meeting RUPS"
                      fill
                      priority={true}
                      className="object-cover rounded-[24px]"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />

                    {/* Badge Top Left */}
                    <div className="hidden sm:flex absolute top-12 -left-10 bg-white rounded-[16px] py-3.5 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] items-center space-x-3.5 w-[200px] z-20 border border-black/[0.03]">
                      <div className="w-10 h-10 rounded-xl bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-[#990202]" strokeWidth={2} />
                      </div>
                      <div className="text-left">
                        <div className="text-[16px] font-black text-gray-900 leading-none">Pelaporan RUPS</div>
                        <div className="text-[16px] text-gray-400 font-semibold mt-1.5 block">3 Dokumen resmi</div>
                      </div>
                    </div>

                    {/* Badge Bottom Right */}
                    <div className="hidden sm:flex absolute bottom-8 -right-10 bg-white rounded-[16px] py-3.5 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] items-center space-x-3.5 w-[220px] z-20 border border-black/[0.03]">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e8c871] to-[#cca740] flex items-center justify-center flex-shrink-0 shadow-inner">
                        <ShieldCheck className="w-5 h-5 text-[#5e430a]" strokeWidth={2.5} />
                      </div>
                      <div className="text-left">
                        <div className="text-[16px] font-black text-gray-900 leading-none">Personal Legal Assistant</div>
                        <div className="text-[16px] text-gray-400 font-semibold mt-1.5 block">Dibantu tim profesional</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ─── 2. MEDIA COVERAGE ─── */}
          <MediaCoverage />

          {/* ─── 3. BENEFITS ─── */}
          <Benefits
            sectionTitleTag="KEUNGGULAN KAMI"
            sectionTitle="Kenapa Urus RUPS Bersama EasyLegal?"
            items={rupsBenefits}
          />

          {/* ─── 4. KENAPA INI PENTING ─── */}
          <FadeIn delay={0.2}>
            <section className="bg-white py-16 lg:py-24">
              <div className="max-w-[1000px] mx-auto px-4 sm:px-8 text-center">
                <p className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.15em] mb-4">KENAPA INI PENTING</p>
                <h2 className="font-heading text-[26px] sm:text-[32px] lg:text-[36px] font-extrabold text-gray-950 leading-tight tracking-tight mb-4">
                  Bukan Sekadar Formalitas, Ini Kewajiban Hukum
                </h2>
                <p className="text-[16px] text-gray-600 font-normal leading-relaxed mb-12 sm:mb-16">
                  RUPS Tahunan &amp; pelaporannya adalah bagian dari kepatuhan legalitas PT yang aktif — bukan cukup didirikan sekali lalu dibiarkan.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
                  <div className="bg-[#f8f9fa] rounded-[24px] p-7 sm:p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="bg-white rounded-xl w-12 h-10 flex items-center justify-center shadow-sm mb-6 border border-gray-100">
                      <span className="text-[16px] font-black text-[#990202]">01</span>
                    </div>
                    <h3 className="text-[16px] font-black text-gray-950 mb-3 leading-snug">Wajib Setiap Tahun</h3>
                    <p className="text-[16px] text-gray-500 leading-relaxed font-normal">
                      Setiap PT wajib menyelenggarakan RUPS Tahunan paling lambat 6 bulan setelah tahun buku berakhir, tanpa terkecuali.
                    </p>
                  </div>

                  <div className="bg-[#f8f9fa] rounded-[24px] p-7 sm:p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="bg-white rounded-xl w-12 h-10 flex items-center justify-center shadow-sm mb-6 border border-gray-100">
                      <span className="text-[16px] font-black text-[#990202]">02</span>
                    </div>
                    <h3 className="text-[16px] font-black text-gray-950 mb-3 leading-snug">Bukan Cuma Rapat</h3>
                    <p className="text-[16px] text-gray-500 leading-relaxed font-normal">
                      Perlu dituangkan dalam Akta Penegasan RUPS dan dilaporkan resmi ke Kemenkumham — bukan cukup notulen internal.
                    </p>
                  </div>

                  <div className="bg-[#f8f9fa] rounded-[24px] p-7 sm:p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="bg-white rounded-xl w-12 h-10 flex items-center justify-center shadow-sm mb-6 border border-gray-100">
                      <span className="text-[16px] font-black text-[#990202]">03</span>
                    </div>
                    <h3 className="text-[16px] font-black text-gray-950 mb-3 leading-snug">Risiko Bila Diabaikan</h3>
                    <p className="text-[16px] text-gray-500 leading-relaxed font-normal">
                      Status legalitas PT yang tidak terupdate dapat menyulitkan proses perbankan, tender, hingga perpanjangan izin usaha.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* ─── 5. PAKET HARGA ─── */}
          <FadeIn delay={0.2}>
            <BottomPromoSection />
            <Pricing
              sectionTitleTag="BIAYA JASA PELAPORAN RUPS"
              sectionTitle="Pilih paket sesuai jumlah KBLI Anda."
              sectionSubtitle={
                <>
                  Harga transparan tanpa biaya tersembunyi. Tim kami urus dari draft sampai bukti lapor resmi kementerian.
                </>
              }
              packages={pricingPackages}
              footnotes={["(1) Setelah Tanda Tangan Draft Akta dan Payment"]}
              hideFooter={true}
            />
          </FadeIn>

          {/* ─── 7. PROSES / TIMELINE ─── */}
          <FadeIn delay={0.2}>
            <section className="bg-[#FAF9F7] py-16 lg:py-24 border-b border-gray-200/50">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
                  <p className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.2em] mb-1.5">
                    ALUR KERJA
                  </p>
                  <h2 className="font-heading text-[26px] sm:text-[36px] lg:text-[40px] font-extrabold text-gray-950 leading-tight tracking-tight">
                    4 Langkah, Anda Tinggal Tanda Tangan
                  </h2>
                  <p className="text-[16px] sm:text-[16px] text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto">
                    Tim Legal Officer EasyLegal yang menyusun, PLA Anda yang mendampingi dari awal sampai laporan terbit.
                  </p>
                </div>

                {/* Gesture Indicator */}
                <div className="flex items-center justify-center gap-1.5 mb-12 text-[16px] font-black text-[#990202] tracking-[0.15em] uppercase">
                  <span>GESER UNTUK LIHAT SEMUA LANGKAH</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>

                {/* Cards Container with Connecting Line */}
                <div className="relative max-w-[1150px] mx-auto">
                  {/* Connecting Line (Desktop only) */}
                  <div className="absolute top-[20px] left-[12%] right-[12%] h-[1.5px] bg-[#990202]/15 z-0 hidden md:block" />

                  {/* Horizontal Scrollable Row */}
                  <div className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none pb-6 px-4 z-10 relative lg:justify-center">
                    {steps.map((step, idx) => (
                      <div 
                        key={idx} 
                        className="w-[250px] sm:w-[265px] flex flex-col items-center text-center flex-shrink-0"
                      >
                        {/* Circle Badge */}
                        <div className="w-10 h-10 rounded-full border-2 border-[#990202] bg-white flex items-center justify-center font-extrabold text-[16px] text-[#990202] mb-6 shadow-sm z-10">
                          {step.no}
                        </div>

                        {/* Card Body */}
                        <div className="w-full bg-white rounded-2xl p-6 border border-black/[0.04] shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 text-left min-h-[140px]">
                          <h3 className="text-[16px] font-extrabold text-gray-950 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-[16px] text-gray-500 leading-relaxed font-normal">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>


          {/* ─── 8. APA ITU RUPS ─── */}
          <FadeIn delay={0.2}>
            <section className="bg-white py-12 lg:py-24 border-b border-gray-200/50">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                  
                  {/* Left: Text & Image */}
                  <div className="space-y-8">
                    <div>
                      <p className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.15em] mb-3">PENGERTIAN RUPS</p>
                      <h2 className="font-heading text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold text-gray-950 leading-tight tracking-tight">
                        Apa itu RUPS?
                      </h2>
                      <p className="text-[16px] text-gray-500 font-normal leading-relaxed mt-3 max-w-md">
                        Sebelum urus pelaporannya, pahami dulu kedudukan RUPS sebagai organ tertinggi dalam struktur PT Anda.
                      </p>
                    </div>

                    <div className="relative w-full aspect-[4/3] rounded-[24px]">
                      <Image
                        src="/images/rups-office.jpg"
                        alt="Diskusi RUPS di Kantor"
                        fill
                        className="object-cover rounded-[24px] shadow-sm"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                      
                      {/* Floating Badge */}
                      <div className="absolute -bottom-5 left-8 bg-white rounded-2xl py-3 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center space-x-3.5 w-[250px] border border-black/[0.03] z-10">
                        <div className="w-10 h-10 rounded-xl bg-[#990202] flex items-center justify-center flex-shrink-0 shadow-inner">
                          <FileText className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="text-left">
                          <div className="text-[16px] font-black text-gray-900 leading-none mb-1">Dasar Hukum</div>
                          <div className="text-[16px] text-gray-500 font-medium leading-snug">UU No. 40 Tahun 2007<br/>tentang Perseroan Terbatas</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Explanation & Characteristics */}
                  <div className="space-y-8 pt-2">
                    <div className="space-y-5">
                      <p className="text-[16px] text-gray-700 leading-relaxed font-normal">
                        <strong className="font-extrabold text-gray-900">RUPS (Rapat Umum Pemegang Saham)</strong> adalah organ perseroan yang memegang kewenangan tertinggi dalam PT — mencakup wewenang yang tidak diberikan kepada Direksi maupun Dewan Komisaris, sebagaimana diatur dalam <strong className="font-extrabold text-gray-900">UU No. 40 Tahun 2007</strong> tentang Perseroan Terbatas.
                      </p>
                      <p className="text-[16px] text-gray-700 leading-relaxed font-normal">
                        Setiap keputusan strategis, mulai dari pengesahan laporan tahunan hingga perubahan anggaran dasar, secara hukum harus melalui forum ini agar sah dan mengikat perusahaan.
                      </p>
                    </div>

                    <div className="pt-2">
                      <h3 className="text-[16px] font-extrabold text-gray-950 mb-4">Karakteristik RUPS</h3>
                      <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/[0.04]">
                        <ul className="space-y-3.5">
                          <li className="flex items-start gap-3">
                            <Check className="w-4.5 h-4.5 text-[#10b981] flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <p className="text-[16px] text-gray-600 leading-snug font-normal"><strong className="font-extrabold text-gray-900">Organ tertinggi PT</strong> — pemegang kewenangan yang tidak diserahkan ke Direksi/Dewan Komisaris.</p>
                          </li>
                          <li className="flex items-start gap-3">
                            <Check className="w-4.5 h-4.5 text-[#10b981] flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <p className="text-[16px] text-gray-600 leading-snug font-normal"><strong className="font-extrabold text-gray-900">Dua jenis RUPS</strong> — RUPS Tahunan (wajib tiap tahun) &amp; RUPS Luar Biasa (sewaktu-waktu bila diperlukan).</p>
                          </li>
                          <li className="flex items-start gap-3">
                            <Check className="w-4.5 h-4.5 text-[#10b981] flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <p className="text-[16px] text-gray-600 leading-snug font-normal"><strong className="font-extrabold text-gray-900">Wajib diselenggarakan</strong> — paling lambat 6 bulan setelah tahun buku perusahaan berakhir.</p>
                          </li>
                          <li className="flex items-start gap-3">
                            <Check className="w-4.5 h-4.5 text-[#10b981] flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <p className="text-[16px] text-gray-600 leading-snug font-normal"><strong className="font-extrabold text-gray-900">Hasil dituangkan dalam akta</strong> — dikuatkan melalui Akta Penegasan RUPS agar punya kekuatan hukum &amp; dapat dilaporkan resmi.</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </FadeIn>

          {/* ─── 9. TESTIMONIALS ─── */}
          <Testimonials />

          {/* ─── 10. FAQ ─── */}
          <FAQ
            title="Pertanyaan yang Sering Ditanyakan"
            subtitle="Sebelum mulai, mungkin jawabannya sudah ada di sini."
            items={rupsFaqs}
          />

          {/* ─── 11. CTA BOTTOM (REPLACED WITH CUSTOM 2-COLUMN) ─── */}
          <FadeIn delay={0.2}>
            <section className="bg-white py-16 lg:py-24">
              <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                  
                  {/* Left Column */}
                  <div className="max-w-2xl text-left space-y-4">
                    <h2 className="font-heading text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-gray-950 leading-tight tracking-tight">
                      Selesaikan Kewajiban RUPS <br />
                      <span className="text-[#990202]">PT Anda Sekarang?</span>
                    </h2>
                    <p className="text-[16px] sm:text-[16px] text-gray-500 font-normal leading-relaxed">
                      Konsultasikan gratis dengan Personal Legal Assistant kami — cek paket mana yang sesuai dengan status PT Anda.
                    </p>
                  </div>

                  {/* Right Column */}
                  <div className="w-full lg:w-auto flex-shrink-0 flex flex-col sm:items-start gap-4">
                    <a
                      href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi RUPS.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-[280px] inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#990202] hover:bg-[#800101] text-white font-extrabold text-[16px] rounded-xl shadow-md transition-colors"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.002-2.637-1.019-5.117-2.875-6.976C16.594 1.91 14.12 1.152 11.488 1.15c-5.443 0-9.87 4.421-9.873 9.863 0 1.902.5 3.758 1.458 5.358l-.993 3.629 3.722-.977zm11.567-7.82c-.329-.165-1.955-.967-2.257-1.077-.302-.11-.522-.165-.742.165-.22.33-.853 1.077-1.045 1.297-.193.22-.385.242-.714.077-1.745-.873-2.906-1.536-4.062-3.52-.303-.52.303-.483.867-1.607.094-.187.047-.352-.023-.517-.07-.165-.632-1.524-.867-2.09-.228-.548-.46-.473-.632-.48l-.54-.008c-.187 0-.49.07-.747.352-.257.282-1.045 1.022-1.045 2.493 0 1.47 1.07 2.89 1.218 3.09.15.2 2.106 3.2 5.097 4.494.712.308 1.267.493 1.701.63.717.227 1.37.195 1.885.118.574-.085 1.956-.8 2.232-1.57.275-.77.275-1.43.192-1.57-.083-.14-.303-.22-.632-.385z"/>
                      </svg>
                      <span>Konsultasi via WhatsApp</span>
                    </a>
                    
                    <a
                      href={getWhatsAppLink("Halo EasyLegal, saya ingin menghubungi tim.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-[280px] inline-flex items-center justify-center gap-1.5 px-6 py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-extrabold text-[16px] rounded-xl shadow-sm transition-colors"
                    >
                      <span>Hubungi Tim Kami</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>

                    <div className="flex items-center gap-2 text-[16px] text-gray-400 font-medium mt-1">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Reminder otomatis tiap periode · Senin–Sabtu 08:00–20:00</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </FadeIn>

        </div>

    </div>
  );
}
