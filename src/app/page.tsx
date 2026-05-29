"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CTA from "@/components/CTA";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
  Star,
  Building2,
  Search,
  MessageCircle,
  Scale,
  FileCheck,
  ShieldCheck,
  Globe,
  FileText,
  Users,
  Zap,
  Clock,
  Award,
  Headphones,
  TrendingUp,
  Lock,
  Phone,
  MapPin,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/* ─── DATA ─── */

const heroSlides = [
  {
    tag: "Layanan Unggulan",
    titleLines: [
      { text: "Pendirian PT," },
      { text: "prosesnya" },
      { text: "cepat & beres.", red: true },
    ],
    desc: "Dari konsultasi sampai akta di tangan Anda. Tim legal berpengalaman telah membantu lebih dari 11.000 pengusaha. Mulai dari Rp2,5jt.",
    cta: "Konsultasi Gratis",
    ctaLink: "/kontak",
    cta2: "Lihat Paket PT",
    cta2Link: "/",
    trustBadges: ["7-14 hari kerja", "Tracking real-time", "Garansi tuntas"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    tag: "Perlindungan Merek",
    titleLines: [
      { text: "Daftar Merek" },
      { text: "Dagang &" },
      { text: "HAKI Online.", red: true },
    ],
    desc: "Lindungi brand dan nama usaha Anda dari plagiarisme. Proses resmi, aman, dan dapat dilacak real-time dari dashboard.",
    cta: "Cek Ketersediaan Merek",
    ctaLink: "/cek-nama",
    cta2: "Pelajari Lebih Lanjut",
    cta2Link: "/",
    trustBadges: ["Database DJKI resmi", "Tracking real-time", "Garansi Selesai"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    tag: "Standar Internasional",
    titleLines: [
      { text: "Sertifikasi ISO" },
      { text: "Mudah, Cepat" },
      { text: "& Accredited.", red: true },
    ],
    desc: "Tingkatkan kredibilitas perusahaan Anda di kancah internasional dengan sertifikasi ISO 9001, 14001, 27001, dan 45001.",
    cta: "Pelajari Sertifikasi ISO",
    ctaLink: "/",
    cta2: "Konsultasi Gratis",
    cta2Link: "/kontak",
    trustBadges: ["UAF Accredited", "Proses cepat", "Harga transparan"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  },
  {
    tag: "Perizinan Usaha",
    titleLines: [
      { text: "Urus NIB &" },
      { text: "OSS RBA" },
      { text: "Tanpa Ribet.", red: true },
    ],
    desc: "Dapatkan Nomor Induk Berusaha (NIB) dan perizinan teknis sesuai KBLI terbaru secara resmi, aman, dan patuh regulasi.",
    cta: "Konsultasi Perizinan",
    ctaLink: "/kontak",
    cta2: "Cek Kode KBLI",
    cta2Link: "/",
    trustBadges: ["Database KBLI 2025", "OSS RBA Resmi", "Garansi Selesai"],
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
  },
];

const quickTools = [
  {
    tag: "TOOL GRATIS",
    title: "Cek Nama PT & Merek",
    desc: "Hindari nama yang sudah dipakai sebelum mendaftar.",
    cta: "Cek sekarang",
    href: "/cek-nama",
    icon: Building2,
  },
  {
    tag: "DATABASE 2025",
    title: "Cek Kode KBLI",
    desc: "Temukan kode KBLI yang tepat untuk perizinan usaha Anda.",
    cta: "Buka pencarian",
    href: "/cek-nama",
    icon: Search,
  },
  {
    tag: "RESPONS 5 MENIT",
    title: "Konsultasi via WhatsApp",
    desc: "Tanya tim legal kami langsung — gratis, tanpa komitmen.",
    cta: "Mulai chat",
    href: "https://wa.me/6281123456789",
    external: true,
    icon: MessageCircle,
  },
];

const partnerLogos = ["KEMENKUMHAM", "OSS BKPM", "DJKI", "KEMENPERIN", "PSE Kominfo"];

const layananIndividual = [
  { name: "Pendirian PT", desc: "Badan usaha & legal", icon: Building2, circleBg: "#B91C1C", cardTint: "#FEF2F2" },
  { name: "Daftar Merek", desc: "HAKI & brand", icon: ShieldCheck, circleBg: "#D97706", cardTint: "#FFFBEB" },
  { name: "NIB & OSS", desc: "Perizinan usaha", icon: FileCheck, circleBg: "#2563EB", cardTint: "#EFF6FF" },
  { name: "Sertifikasi ISO", desc: "Standard internasional", icon: Award, circleBg: "#16A34A", cardTint: "#F0FDF4" },
  { name: "Pengajuan PKP", desc: "Perpajakan & e-Faktur", icon: FileText, circleBg: "#EA580C", cardTint: "#FFF7ED" },
  { name: "Visa & KITAS", desc: "Imigrasi WNA", icon: Globe, circleBg: "#1E3A5F", cardTint: "#F0F4FF" },
  { name: "Perjanjian Perkawinan", desc: "Pisah harta & legal", icon: Scale, circleBg: "#7C3AED", cardTint: "#F5F3FF" },
  { name: "Press Release", desc: "PR & media 100+", icon: MessageCircle, circleBg: "#DC2626", cardTint: "#FEF2F2" },
  { name: "Pelaporan LKPM", desc: "Lapor BKPM rutin", icon: TrendingUp, circleBg: "#0D9488", cardTint: "#F0FDFA" },
];

const whyChoose = [
  {
    icon: Clock,
    title: "Proses Cepat",
    desc: "Pendirian PT selesai dalam 7-14 hari kerja dengan tracking real-time dari dashboard.",
  },
  {
    icon: Users,
    title: "Tim Berpengalaman",
    desc: "Lebih dari 11.000 pengusaha mempercayai kami untuk urusan legalitas bisnis mereka.",
  },
  {
    icon: Lock,
    title: "Harga Transparan",
    desc: "Tidak ada biaya tersembunyi. Semua biaya dijelaskan di awal sebelum proses dimulai.",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    desc: "Tim support kami siap membantu kapan saja via WhatsApp, email, atau telepon.",
  },
];

const trustedBy = ["PT Maju Jaya", "CV Sukses Abadi", "UD Berkah", "PT Nusantara", "CV Mitra", "PT Globalindo"];

const testimonials = [
  {
    name: "Ahmad Fauzi",
    role: "CEO, PT Maju Sejahtera",
    text: "Proses cepat, pelayanan ramah, dan harga transparan. Pendirian PT saya selesai dalam 10 hari!",
    rating: 5,
  },
  {
    name: "Siti Rahma",
    role: "Founder, Rumah Kreatif",
    text: "Sangat terbantu dengan layanan EasyLegal. Merek dagang saya terdaftar dengan aman.",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "Direktur, CV Jaya Abadi",
    text: "Tim support yang responsif. NIB dan OSS saya selesai tanpa ribet sama sekali.",
    rating: 5,
  },
];

const insights = [
  {
    tag: "Panduan",
    title: "Perbedaan PT Perorangan dan PT Biasa yang Perlu Anda Ketahui",
    desc: "Kenali perbedaan mendasar antara PT Perorangan dan PT Biasa sebelum memutuskan jenis pendirian yang tepat.",
    date: "15 Jan 2026",
  },
  {
    tag: "Regulasi",
    title: "Cara Mendaftarkan Merek Dagang Secara Online di DJKI",
    desc: "Panduan lengkap pendaftaran merek dagang melalui sistem online DJKI Kemenkumham.",
    date: "10 Jan 2026",
  },
  {
    tag: "Tips",
    title: "Mengapa Sertifikasi ISO Penting untuk Pertumbuhan Bisnis Anda?",
    desc: "Pelajari bagaimana sertifikasi ISO dapat meningkatkan kredibilitas dan daya saing perusahaan.",
    date: "5 Jan 2026",
  },
];

const caraKerjaSteps = [
  {
    num: "01",
    title: "Konsultasi",
    description: "Langkah Awal",
    flowItems: ["Data Diri", "Dokumen Pendukung", "Draft Akta"],
  },
  {
    num: "02",
    title: "Pengerjaan",
    description: "Proses Pengurusan",
    flowItems: ["Verifikasi Data", "Pengurusan Dokumen", "Review Akhir"],
  },
  {
    num: "03",
    title: "Tanda Tangan",
    description: "Selesai & Akta",
    flowItems: ["Tanda Tangan Digital", "Penerbitan Akta", "Arsip Resmi"],
  },
];

function CaraKerjaSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Pilih Layanan",
      description: "Browse 15+ jenis layanan legal sesuai kebutuhan bisnis Anda.",
      features: [
        "Harga transparan di awal — termasuk biaya pemerintah dan jasa kami.",
        "15+ kategori: PT, NIB, Merek, ISO, Virtual Office, dan banyak lagi.",
        "Konsultasi gratis sebelum mulai — tanpa komitmen.",
      ],
    },
    {
      num: "02",
      title: "Konsultasi Gratis",
      description: "Hubungi tim legal kami langsung untuk membahas kebutuhan spesifik bisnis Anda.",
      features: [
        "Respons cepat dalam 5 menit melalui WhatsApp atau telepon.",
        "Analisis KBLI dan kesesuaian merek gratis oleh tim expert.",
        "Rekomendasi badan usaha yang paling efisien untuk modal Anda.",
      ],
    },
    {
      num: "03",
      title: "Kirim Dokumen Online",
      description: "Upload data dan dokumen pendukung dengan aman melalui partner portal kami.",
      features: [
        "Formulir digital terpadu — pengisian tidak sampai 10 menit.",
        "Enkripsi data standar perbankan menjamin kerahasiaan Anda.",
        "Notifikasi otomatis saat dokumen diverifikasi oleh tim legal.",
      ],
    },
    {
      num: "04",
      title: "Terima Hasil Digital",
      description: "Unduh seluruh dokumen resmi yang sudah selesai langsung dari dashboard Anda.",
      features: [
        "Dokumen digital ber-TTE resmi dan terdaftar di database kementerian.",
        "Pengiriman salinan fisik/hardcopy langsung ke alamat kantor Anda.",
        "Akses seumur hidup ke arsip dokumen legal Anda tanpa biaya tambahan.",
      ],
    },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      {/* Dynamic Keyframes injecting for premium floating / bouncing effects */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      ` }} />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* LEFT: Step-by-Step Accordion Flow */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em] mb-3">
              Cara Kerja
            </span>
            <h2 className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] leading-[1.12] tracking-[-0.02em]">
              Empat langkah, semua beres<br />tanpa pusing.
            </h2>
            <p className="mt-4 text-[14.5px] text-[#6B7280] leading-relaxed max-w-[460px]">
              Proses transparan dari konsultasi sampai dokumen di tangan Anda — semua bisa dipantau dari satu dashboard.
            </p>

            {/* Steps List Accordion */}
            <div className="mt-8 space-y-0">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div 
                    key={idx} 
                    className="border-b border-gray-100 py-5 transition-all duration-300"
                  >
                    {isActive ? (
                      <div className="flex flex-col text-left">
                        {/* Active Header with Red Arrow */}
                        <button 
                          onClick={() => setActiveStep(idx)}
                          className="flex items-center gap-3 text-left group"
                        >
                          <span className="text-[#B91C1C] text-[18px] font-extrabold transition-transform duration-200 group-hover:translate-x-1">
                            →
                          </span>
                          <span className="text-[17px] font-black text-[#111827]">
                            {step.title}
                          </span>
                        </button>
                        
                        {/* Expanded details */}
                        <div className="mt-3 pl-7 transition-all duration-300">
                          <p className="text-[13px] text-[#6B7280] font-medium leading-relaxed mb-4">
                            {step.description}
                          </p>
                          <ul className="space-y-3">
                            {step.features.map((feat, fidx) => (
                              <li key={fidx} className="flex items-start gap-3 text-[13px] text-gray-700 leading-snug">
                                <div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm border border-emerald-100">
                                  <Check className="w-3.5 h-3.5 text-[#16A34A]" strokeWidth={3} />
                                </div>
                                <span className="font-medium text-gray-600">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      /* Inactive Item Row */
                      <button
                        onClick={() => setActiveStep(idx)}
                        className="flex items-center gap-4 w-full text-left py-1 hover:text-gray-900 group"
                      >
                        <span className="text-[#9CA3AF] text-[14.5px] font-extrabold tracking-wider w-6">
                          {step.num}
                        </span>
                        <span className="text-[16px] font-semibold text-gray-400 group-hover:text-gray-700 transition-colors duration-150">
                          {step.title}
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Overlapping layered dashboard composition */}
          <div className="lg:col-span-7 relative w-full h-[520px] flex items-center justify-center scale-90 sm:scale-100 origin-center transition-all duration-500">
            
            {/* Step 1 Visual Container */}
            {activeStep === 0 && (
              <div className="absolute inset-0 w-full h-full">
                {/* Orange backdrop offset rectangle */}
                <div className="absolute top-6 left-[22%] w-[60%] h-[78%] rounded-[2.5rem] bg-gradient-to-br from-[#F2994A] to-[#F2C94C] shadow-lg opacity-95 transition-all duration-500" />
                
                {/* Main Photo of Smiling Professional Woman */}
                <div className="absolute top-10 left-[24%] w-[58%] h-[78%] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-50 transition-all duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" 
                    alt="Professional woman smiling" 
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
                  />
                </div>

                {/* Soft Green wedge at bottom-left corner */}
                <div className="absolute -bottom-2 left-[18%] w-24 h-24 bg-[#D1E7DD] rounded-tr-[5.5rem] rounded-bl-[1.5rem] z-20 shadow-sm border border-[#C1D7CD]/30" />

                {/* Small document signing photo (top-right overlay) */}
                <div className="absolute top-0 right-4 w-[28%] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white bg-slate-50 z-30 transition-all duration-500 hover:rotate-1">
                  <img 
                    src="https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=300&auto=format&fit=crop" 
                    alt="Signing document" 
                    className="w-full h-full object-cover"
                  />
                  {/* Golden Spark star icon */}
                  <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md z-40">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>

                {/* Main FLOATING card "01 Pilih Layanan" */}
                <div className="absolute top-[16%] left-0 w-[48%] bg-white rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-30 border border-gray-100/60 animate-float-slow transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#B91C1C] flex items-center justify-center text-white font-extrabold text-[12px] flex-shrink-0">
                      01
                    </div>
                    <div>
                      <div className="text-[12px] font-black text-[#111827] leading-tight">Pilih Layanan</div>
                      <div className="text-[9px] text-[#6B7280] font-semibold mt-0.5">Tentukan jasa legal yang Anda butuhkan</div>
                    </div>
                  </div>

                  {/* 2x2 Options Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {/* Active Option Box: Pendirian PT */}
                    <div className="border border-[#B91C1C] bg-[#FEF2F2] rounded-xl p-2 flex items-center gap-1.5 text-left transition-all duration-300">
                      <div className="w-7 h-7 rounded-lg bg-[#B91C1C] flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Building2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-black text-[#B91C1C] leading-tight truncate">Pendirian PT</div>
                        <div className="text-[8px] font-bold text-[#B91C1C] mt-0.5 leading-none">Mulai Rp2,5jt</div>
                      </div>
                    </div>

                    {/* Option Box: NIB & OSS */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left transition-all duration-300">
                      <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">NIB & OSS</div>
                        <div className="text-[8px] font-medium text-gray-500 mt-0.5 leading-none">Mulai Rp500rb</div>
                      </div>
                    </div>

                    {/* Option Box: Daftar Merek */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left transition-all duration-300">
                      <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">Daftar Merek</div>
                        <div className="text-[8px] font-medium text-gray-500 mt-0.5 leading-none">Mulai Rp1,5jt</div>
                      </div>
                    </div>

                    {/* Option Box: ISO 9001 */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left transition-all duration-300">
                      <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <Award className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">ISO 9001</div>
                        <div className="text-[8px] font-medium text-gray-500 mt-0.5 leading-none">Konsultasi</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating "Akta selesai" Badge */}
                <div className="absolute top-[32%] right-1 bg-white rounded-full px-3 py-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2 z-40 animate-bounce-slow">
                  <div className="w-4.5 h-4.5 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#2E7D32]" strokeWidth={4} />
                  </div>
                  <div className="flex items-baseline leading-none">
                    <span className="text-[10px] font-black text-gray-800">Akta selesai</span>
                    <span className="text-[8px] text-gray-400 font-bold ml-1.5">2 menit lalu</span>
                  </div>
                </div>

                {/* Floating "Google 4.9 Rating" Badge */}
                <div className="absolute top-[54%] -right-2 bg-white rounded-2xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-2 z-30 w-[170px] animate-float-medium">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-500 font-extrabold text-[12px] flex items-center gap-0.5">★ 4.9</span>
                    <span className="text-[8px] text-gray-400 font-black tracking-wider">GOOGLE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <img className="inline-block h-5.5 w-5.5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User 1" />
                      <img className="inline-block h-5.5 w-5.5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="User 2" />
                      <img className="inline-block h-5.5 w-5.5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="User 3" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[9.5px] font-black text-gray-800">11.000+</div>
                      <div className="text-[7.5px] font-bold text-gray-400">bisnis terbantu</div>
                    </div>
                  </div>
                </div>

                {/* Floating "Pendirian PT - proses" Badge */}
                <div className="absolute bottom-2 right-[6%] bg-white rounded-2xl p-2.5 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2.5 z-30 w-[190px] animate-float-slow">
                  <div className="w-9 h-9 rounded-full border-2 border-red-500 flex items-center justify-center text-[10px] font-black text-red-600 flex-shrink-0 bg-red-50/50">
                    72%
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-[10px] font-black text-gray-800 truncate">Pendirian PT — proses</div>
                    <div className="text-[8px] text-gray-400 font-bold mt-0.5 truncate">Tahap 3/4 · 2 hari lagi</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 Visual Container */}
            {activeStep === 1 && (
              <div className="absolute inset-0 w-full h-full">
                {/* Blue/Warm backdrop offset rectangle */}
                <div className="absolute top-6 left-[22%] w-[60%] h-[78%] rounded-[2.5rem] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] shadow-lg opacity-90 transition-all duration-500" />
                
                {/* Main Photo of Lawyer/Consultant */}
                <div className="absolute top-10 left-[24%] w-[58%] h-[78%] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-50 transition-all duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop" 
                    alt="Legal Consultant Online" 
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
                  />
                </div>

                {/* Soft Blue wedge at bottom-left corner */}
                <div className="absolute -bottom-2 left-[18%] w-24 h-24 bg-[#DBEAFE] rounded-tr-[5.5rem] rounded-bl-[1.5rem] z-20 shadow-sm border border-[#BFDBFE]/30" />

                {/* Small communication overlay photo (top-right overlay) */}
                <div className="absolute top-0 right-4 w-[28%] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white bg-slate-50 z-30 transition-all duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=300&auto=format&fit=crop" 
                    alt="Meeting schedule" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md z-40">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                </div>

                {/* FLOATING card "02 Jadwal Konsultasi" */}
                <div className="absolute top-[16%] left-0 w-[48%] bg-white rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-30 border border-gray-100/60 animate-float-slow transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#B91C1C] flex items-center justify-center text-white font-extrabold text-[12px] flex-shrink-0">
                      02
                    </div>
                    <div>
                      <div className="text-[12px] font-black text-[#111827] leading-tight">Hubungi Ahli</div>
                      <div className="text-[9px] text-[#6B7280] font-semibold mt-0.5">Konsultasi hukum & bisnis gratis</div>
                    </div>
                  </div>

                  {/* 2x2 Options Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {/* Active Option Box: WhatsApp */}
                    <div className="border border-[#B91C1C] bg-[#FEF2F2] rounded-xl p-2 flex items-center gap-1.5 text-left">
                      <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <MessageCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-black text-gray-800 leading-tight truncate">WhatsApp</div>
                        <div className="text-[8px] font-bold text-green-600 mt-0.5 leading-none">Online 24/7</div>
                      </div>
                    </div>

                    {/* Option Box: Zoom Meeting */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left">
                      <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 text-white">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">Zoom Call</div>
                        <div className="text-[8px] font-medium text-gray-500 mt-0.5 leading-none">Jadwalkan</div>
                      </div>
                    </div>

                    {/* Option Box: Telepon */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left">
                      <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0 text-white">
                        <Phone className="w-3 h-3" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">Telepon</div>
                        <div className="text-[8px] font-medium text-gray-500 mt-0.5 leading-none">Tanya Ahli</div>
                      </div>
                    </div>

                    {/* Option Box: Kunjungan */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left">
                      <div className="w-7 h-7 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0 text-white">
                        <MapPin className="w-3 h-3" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">Kantor Kami</div>
                        <div className="text-[8px] font-medium text-gray-500 mt-0.5 leading-none">Kunjungan</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating "Konsultan Online" Badge */}
                <div className="absolute top-[32%] right-1 bg-white rounded-full px-3 py-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2 z-40 animate-bounce-slow">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping absolute -left-0.5" />
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] font-black text-gray-800">Konsultan Aktif</span>
                </div>

                {/* Floating Expert Rating Badge */}
                <div className="absolute top-[54%] -right-2 bg-white rounded-2xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-2 z-30 w-[170px] animate-float-medium">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-500 font-extrabold text-[12px] flex items-center gap-0.5">★ 5.0</span>
                    <span className="text-[8px] text-gray-400 font-black tracking-wider">RATING</span>
                  </div>
                  <div className="leading-tight">
                    <div className="text-[10px] font-black text-gray-800">Advokat Senior</div>
                    <div className="text-[7.5px] font-semibold text-gray-400 mt-0.5">100% Solutif & Terpercaya</div>
                  </div>
                </div>

                {/* Floating Jadwal Badge */}
                <div className="absolute bottom-2 right-[6%] bg-white rounded-2xl p-2.5 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2.5 z-30 w-[190px] animate-float-slow">
                  <div className="w-9 h-9 rounded-full border-2 border-emerald-500 flex items-center justify-center text-[10px] font-black text-emerald-600 flex-shrink-0 bg-emerald-50">
                    OK
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-[10px] font-black text-gray-800 truncate">Jadwal Terkonfirmasi</div>
                    <div className="text-[8px] text-gray-400 font-bold mt-0.5 truncate">Hari ini · 14:00 WIB</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 Visual Container */}
            {activeStep === 2 && (
              <div className="absolute inset-0 w-full h-full">
                {/* Purple backdrop offset rectangle */}
                <div className="absolute top-6 left-[22%] w-[60%] h-[78%] rounded-[2.5rem] bg-gradient-to-br from-[#0F172A] to-[#334155] shadow-lg opacity-90 transition-all duration-500" />
                
                {/* Main Photo of Secure Laptop Working */}
                <div className="absolute top-10 left-[24%] w-[58%] h-[78%] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-50 transition-all duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop" 
                    alt="Online Document Process" 
                    className="w-full h-full object-cover object-center hover:scale-102 transition-transform duration-700"
                  />
                </div>

                {/* Soft Orange wedge at bottom-left corner */}
                <div className="absolute -bottom-2 left-[18%] w-24 h-24 bg-[#FFEDD5] rounded-tr-[5.5rem] rounded-bl-[1.5rem] z-20 shadow-sm border border-[#FED7AA]/30" />

                {/* Small folder overlay photo (top-right overlay) */}
                <div className="absolute top-0 right-4 w-[28%] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white bg-slate-50 z-30 transition-all duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=300&auto=format&fit=crop" 
                    alt="Corporate documentation folder" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white border-2 border-white shadow-md z-40">
                    <FileText className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* FLOATING card "03 Upload Dokumen" */}
                <div className="absolute top-[16%] left-0 w-[48%] bg-white rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-30 border border-gray-100/60 animate-float-slow transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#B91C1C] flex items-center justify-center text-white font-extrabold text-[12px] flex-shrink-0">
                      03
                    </div>
                    <div>
                      <div className="text-[12px] font-black text-[#111827] leading-tight">Upload Dokumen</div>
                      <div className="text-[9px] text-[#6B7280] font-semibold mt-0.5">Kirim berkas dengan mudah & aman</div>
                    </div>
                  </div>

                  {/* 2x2 Options Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {/* Active Option Box: KTP & NPWP */}
                    <div className="border border-[#B91C1C] bg-[#FEF2F2] rounded-xl p-2 flex items-center gap-1.5 text-left">
                      <div className="w-7 h-7 rounded-lg bg-[#B91C1C] flex items-center justify-center flex-shrink-0 text-white">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-black text-gray-800 leading-tight truncate">KTP & NPWP</div>
                        <div className="text-[8px] font-bold text-[#B91C1C] mt-0.5 leading-none">Verified</div>
                      </div>
                    </div>

                    {/* Option Box: KK & Akta Pendiri */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left">
                      <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 text-white">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">KK & Akta</div>
                        <div className="text-[8px] font-medium text-green-600 mt-0.5 leading-none">Verified</div>
                      </div>
                    </div>

                    {/* Option Box: Pengecekan Nama */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left">
                      <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 text-white">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">Nama PT</div>
                        <div className="text-[8px] font-medium text-green-600 mt-0.5 leading-none">Verified</div>
                      </div>
                    </div>

                    {/* Option Box: Modal & Domisili */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left">
                      <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 text-white">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">Modal Usaha</div>
                        <div className="text-[8px] font-medium text-blue-500 mt-0.5 leading-none">Ready</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Secure SSL Badge */}
                <div className="absolute top-[32%] right-1 bg-white rounded-full px-3 py-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2 z-40 animate-bounce-slow">
                  <Lock className="w-3.5 h-3.5 text-[#B91C1C]" />
                  <span className="text-[10px] font-black text-gray-800">Secure Vault SSL</span>
                </div>

                {/* Floating Draft Akta Ready Card */}
                <div className="absolute top-[54%] -right-2 bg-white rounded-2xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-2 z-30 w-[170px] animate-float-medium">
                  <div className="leading-tight">
                    <div className="text-[10px] font-black text-gray-800">Draft Akta Selesai!</div>
                    <div className="text-[7.5px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Siap Ditinjau
                    </div>
                  </div>
                </div>

                {/* Floating progress verifikasi */}
                <div className="absolute bottom-2 right-[6%] bg-white rounded-2xl p-2.5 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2.5 z-30 w-[190px] animate-float-slow">
                  <div className="w-9 h-9 rounded-full border-2 border-[#B91C1C] flex items-center justify-center text-[10px] font-black text-[#B91C1C] flex-shrink-0 bg-red-50/50">
                    92%
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-[10px] font-black text-gray-800 truncate">Verifikasi Berkas</div>
                    <div className="text-[8px] text-gray-400 font-bold mt-0.5 truncate">Oleh Tim Ahli Legal</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 Visual Container */}
            {activeStep === 3 && (
              <div className="absolute inset-0 w-full h-full">
                {/* Green backdrop offset rectangle */}
                <div className="absolute top-6 left-[22%] w-[60%] h-[78%] rounded-[2.5rem] bg-gradient-to-br from-[#064E3B] to-[#10B981] shadow-lg opacity-90 transition-all duration-500" />
                
                {/* Main Photo of Happy Entrepreneurs */}
                <div className="absolute top-10 left-[24%] w-[58%] h-[78%] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-50 transition-all duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" 
                    alt="Happy Entrepreneurs" 
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
                  />
                </div>

                {/* Soft Emerald wedge at bottom-left corner */}
                <div className="absolute -bottom-2 left-[18%] w-24 h-24 bg-[#D1FAE5] rounded-tr-[5.5rem] rounded-bl-[1.5rem] z-20 shadow-sm border border-[#A7F3D0]/30" />

                {/* Small badge overlay (top-right overlay) */}
                <div className="absolute top-0 right-4 w-[28%] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white bg-slate-50 z-30 transition-all duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=300&auto=format&fit=crop" 
                    alt="Professional success" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md z-40">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>

                {/* FLOATING card "04 Hasil Digital" */}
                <div className="absolute top-[16%] left-0 w-[48%] bg-white rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-30 border border-gray-100/60 animate-float-slow transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#B91C1C] flex items-center justify-center text-white font-extrabold text-[12px] flex-shrink-0">
                      04
                    </div>
                    <div>
                      <div className="text-[12px] font-black text-[#111827] leading-tight">Terima Hasil</div>
                      <div className="text-[9px] text-[#6B7280] font-semibold mt-0.5">Unduh berkas legalitas resmi Anda</div>
                    </div>
                  </div>

                  {/* 2x2 Options Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {/* Active Option Box: Akta Pendirian */}
                    <div className="border border-[#B91C1C] bg-[#FEF2F2] rounded-xl p-2 flex items-center gap-1.5 text-left">
                      <div className="w-7 h-7 rounded-lg bg-[#B91C1C] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-black text-gray-800 leading-tight truncate">Akta PT</div>
                        <div className="text-[8px] font-bold text-[#B91C1C] mt-0.5 leading-none">Unduh PDF</div>
                      </div>
                    </div>

                    {/* Option Box: SK Kemenkumham */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left">
                      <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 text-white">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">SK Kemenkum</div>
                        <div className="text-[8px] font-medium text-green-600 mt-0.5 leading-none">Unduh PDF</div>
                      </div>
                    </div>

                    {/* Option Box: NIB & OSS */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left">
                      <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 text-white">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">NIB & OSS</div>
                        <div className="text-[8px] font-medium text-green-600 mt-0.5 leading-none">Unduh PDF</div>
                      </div>
                    </div>

                    {/* Option Box: NPWP Perusahaan */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left">
                      <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 text-white">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">NPWP Badan</div>
                        <div className="text-[8px] font-medium text-green-600 mt-0.5 leading-none">Unduh PDF</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating delivery/hardcopy Badge */}
                <div className="absolute top-[32%] right-1 bg-white rounded-full px-3 py-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2 z-40 animate-bounce-slow">
                  <svg className="w-3.5 h-3.5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path></svg>
                  <span className="text-[10px] font-black text-gray-800">Hardcopy Terkirim</span>
                </div>

                {/* Floating Sah & Resmi badge */}
                <div className="absolute top-[54%] -right-2 bg-white rounded-2xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-2 z-30 w-[170px] animate-float-medium">
                  <div className="leading-tight">
                    <div className="text-[10px] font-black text-gray-800">100% Sah & Resmi</div>
                    <div className="text-[7.5px] font-semibold text-gray-400 mt-1">Terdaftar di Kemenkumham & DJKI</div>
                  </div>
                </div>

                {/* Floating Success Badge */}
                <div className="absolute bottom-2 right-[6%] bg-white rounded-2xl p-2.5 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2.5 z-30 w-[190px] animate-float-slow">
                  <div className="w-9 h-9 rounded-full border-2 border-emerald-500 flex items-center justify-center text-[10px] font-black text-emerald-600 flex-shrink-0 bg-emerald-50">
                    100%
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-[10px] font-black text-gray-800 truncate">Selesai & Legal</div>
                    <div className="text-[8px] text-gray-400 font-bold mt-0.5 truncate">Bisnis Siap Jalan!</div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── COMPONENT ─── */

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px] relative">

          {/* Left Arrow (overlaps far left of cream section) */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md text-[#1A1A1A] hover:text-[#D62828] border border-gray-100 flex items-center justify-center transition-all hover:scale-105"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow (overlaps far right of image section) */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md text-[#1A1A1A] hover:text-[#D62828] border border-gray-100 flex items-center justify-center transition-all hover:scale-105"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Left: warm cream/rose gradient background with text */}
          <div className="bg-gradient-to-br from-[#FEFAF6] via-[#FAF3EC] to-[#FEFAF6] px-8 sm:px-12 lg:px-16 xl:px-24 py-14 lg:py-20 flex flex-col justify-center relative z-10 border-r border-[#FAF0E6]/30">

            <div className="relative min-h-[350px] flex flex-col justify-center">
              {heroSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-700 ease-out ${currentSlide === idx
                    ? "opacity-100 translate-y-0 relative"
                    : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                    }`}
                >
                  {/* Tag badge with red dot and light pink border */}
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-red-100 bg-[#FFF5F5] text-[#D62828] text-[12px] font-bold tracking-wide mb-6 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
                    <span>{slide.tag}</span>
                  </div>

                  {/* Main heading */}
                  <h1 className="text-[44px] sm:text-[50px] lg:text-[56px] font-extrabold text-[#1A1A1A] leading-[1.08] tracking-[-0.02em]">
                    {slide.titleLines.map((line, i) => (
                      <span key={i} className={line.red ? "text-[#D62828] block" : "block"}>{line.text}</span>
                    ))}
                  </h1>

                  {/* Description */}
                  <p className="mt-6 text-[14.5px] text-[#555555] leading-relaxed max-w-[440px]">
                    {slide.desc}
                  </p>

                  {/* CTA buttons */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={slide.ctaLink}
                      className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#9B1C1C] hover:bg-[#8B0000] text-white font-bold text-[14.5px] rounded-[12px] shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      {slide.cta}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                    </Link>
                    <Link
                      href={slide.cta2Link}
                      className="inline-flex items-center px-7 py-3.5 bg-[#F3EBE4] hover:bg-[#EAE0D7] text-[#1A1A1A] font-bold text-[14.5px] rounded-[12px] transition-all duration-200"
                    >
                      {slide.cta2}
                    </Link>
                  </div>

                  {/* Trust badges with custom checkmarks */}
                  <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                    {slide.trustBadges.map((badge, bidx) => (
                      <span key={bidx} className="inline-flex items-center space-x-1.5 text-[12.5px] font-semibold text-[#444444]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-[14px] h-[14px] text-emerald-600 flex-shrink-0">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{badge}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: transition slideshow for images */}
          <div className="relative min-h-[400px] lg:min-h-[580px] overflow-hidden bg-gray-50">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  currentSlide === idx ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.tag}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5" />
              </div>
            ))}

            {/* Floating badge: 11.000+ Bisnis Terlayani */}
            <div className="absolute top-8 right-8 bg-white rounded-2xl px-5 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-black/[0.03] flex items-center space-x-3.5 z-20 animate-float-slow">
              <div className="w-[38px] h-[38px] bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 text-[#D62828]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[16px] font-black text-[#1A1A1A] leading-tight">11.000+</div>
                <div className="text-[10px] text-[#6B7280] font-bold mt-0.5">Bisnis terlayani</div>
              </div>
            </div>

            {/* Floating badge: 4.9/5 Star Rating */}
            <div className="absolute bottom-10 left-8 bg-white rounded-2xl px-5 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-black/[0.03] flex items-center space-x-3.5 z-20 animate-float-medium">
              <div className="w-[38px] h-[38px] bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 text-[#16A34A]">
                <Check className="w-5 h-5" strokeWidth={3} />
              </div>
              <div>
                <div className="text-[16px] font-black text-[#1A1A1A] leading-tight">4.9<span className="text-[11px] font-bold text-gray-400">/5</span></div>
                <div className="flex space-x-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Dot slide indicators on the bottom center of the image */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentSlide(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "w-6 bg-[#D62828]" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          QUICK TOOLS — floating strip overlapping hero
          ═══════════════════════════════════════════ */}
      <div className="relative z-20 -mt-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#EAEAEA] rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {quickTools.map((tool, idx) => {
                const Icon = tool.icon;
                return (
                  <div 
                    key={idx} 
                    className="group flex items-start gap-5 p-8 transition-colors duration-300 hover:bg-neutral-50/40 border-b last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 border-[#F0F0F0]"
                  >
                    {/* Rounded Icon Box */}
                    <div className="w-12 h-12 rounded-[14px] bg-[#FFF5F5] text-[#8B1E1E] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <Icon className="w-5.5 h-5.5" strokeWidth={2} />
                    </div>
                    {/* Content Block */}
                    <div className="flex flex-col flex-grow min-w-0">
                      <span className="text-[10px] font-black text-[#9B1C1C] tracking-[0.1em] mb-1.5 uppercase block">
                        {tool.tag}
                      </span>
                      <h3 className="text-[15.5px] font-bold text-[#1A1A1A] group-hover:text-[#D62828] transition-colors leading-tight">
                        {tool.title}
                      </h3>
                      <p className="text-[13px] text-[#666666] leading-relaxed mt-2">
                        {tool.desc}
                      </p>
                      <div className="mt-4">
                        {tool.external ? (
                          <a
                            href={tool.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[13px] font-bold text-[#9B1C1C] hover:text-[#8B0000] space-x-1 group/link"
                          >
                            <span>{tool.cta}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" strokeWidth={2.5} />
                          </a>
                        ) : (
                          <Link
                            href={tool.href}
                            className="inline-flex items-center text-[13px] font-bold text-[#9B1C1C] hover:text-[#8B0000] space-x-1 group/link"
                          >
                            <span>{tool.cta}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" strokeWidth={2.5} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          PARTNER BAR
          ═══════════════════════════════════════════ */}
      <section className="bg-white py-5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <span className="text-[12px] text-muted font-medium whitespace-nowrap">
              Bekerja dengan instansi resmi:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
              {partnerLogos.map((c, idx) => (
                <span key={idx} className="text-[12px] font-semibold text-dark/40 uppercase tracking-wide hover:text-dark/60 transition-colors">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LAYANAN KAMI
          ═══════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          {/* Header */}
          <div className="mb-10">
            <span className="text-[10.5px] font-bold text-primary uppercase tracking-[0.15em]">
              Solusi EasyLegal
            </span>
            <h2 className="text-[34px] sm:text-[40px] font-extrabold text-dark mt-2 tracking-tight leading-[1.1]">
              Temukan layanan legal yang<br />paling tepat untuk bisnis Anda.
            </h2>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5">

            {/* LEFT: Layanan Individual */}
            <div className="border border-border/80 rounded-2xl p-6">
              {/* Sub-header */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
                  <span className="text-[13px] text-primary font-bold leading-none">⊞</span>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-dark leading-tight">Layanan Individual</h3>
                  <p className="text-[11px] text-muted leading-tight mt-0.5">Layanan siap pakai untuk berbagai kebutuhan legalitas bisnis</p>
                </div>
              </div>

              {/* Grid 3x3 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {layananIndividual.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href="/"
                      className="group rounded-2xl p-5 hover:shadow-md shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden"
                      style={{
                        minHeight: "175px",
                        background: `linear-gradient(180deg, #ffffff 30%, ${item.cardTint} 100%)`,
                      }}
                    >
                      {/* Text top-left */}
                      <div>
                        <h4 className="text-[13.5px] font-bold text-dark leading-snug">{item.name}</h4>
                        <p className="text-[11px] text-muted mt-0.5 leading-snug">{item.desc}</p>
                      </div>

                      {/* Double-ring icon — centered at bottom */}
                      <div className="flex justify-center mt-4">
                        {/* Outer soft ring */}
                        <div
                          className="w-[72px] h-[72px] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: `${item.cardTint}` }}
                        >
                          {/* Inner solid circle */}
                          <div
                            className="w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-md"
                            style={{ backgroundColor: item.circleBg }}
                          >
                            <Icon className="w-[22px] h-[22px] text-white" strokeWidth={2} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div
              className="rounded-2xl p-6 flex flex-col border border-black/[0.06]"
              style={{ 
                background: "radial-gradient(100% 100% at 100% 0%, #FFE2E2 0%, transparent 50%), radial-gradient(80% 80% at 100% 100%, #FFF6DA 0%, transparent 50%), #FFFCFC" 
              }}
            >
              {/* Header: icon + title */}
              <div className="flex items-start gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-[18px] h-[18px] text-primary" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[17px] font-extrabold text-dark leading-tight">Solusi Korporat</h3>
                  <p className="text-[11.5px] text-muted leading-snug mt-0.5">
                    Dirancang untuk kebutuhan perusahaan & partnership B2B
                  </p>
                </div>
              </div>

              {/* EasyLegal CORPORATE badge */}
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 shadow-sm border border-border/60 mb-5 self-start">
                <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-black text-white tracking-tight">EL</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[12.5px] font-extrabold text-primary">easy</span>
                  <span className="text-[12.5px] font-bold text-dark">legal</span>
                </div>
                <div className="w-px h-3.5 bg-border mx-1" />
                <span className="text-[9px] font-bold text-dark/40 uppercase tracking-[0.15em]">CORPORATE</span>
              </div>

              {/* Description */}
              <p className="text-[13px] text-muted leading-relaxed mb-5">
                Solusi kustom oleh tim partnership EasyLegal yang dirancang sesuai kebutuhan korporasi — dari volume tinggi, integrasi sistem, sampai dedicated support.
              </p>

              {/* Feature checkmarks — green ticks like Figma */}
              <ul className="space-y-3 mb-6">
                {[
                  "Alur kerja & integrasi terkustomisasi",
                  "Dedicated Account Manager & MOU resmi",
                  "Volume discount & branded partner portal",
                  "Priority processing & co-marketing support",
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[13px] text-dark/85">
                    {/* Green checkmark circle */}
                    <div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#16A34A]" strokeWidth={3} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center px-7 py-3 bg-primary text-white text-[13.5px] font-bold rounded-xl hover:bg-primary-hover transition-colors self-start shadow-sm hover:shadow-md"
              >
                Pelajari lebih lanjut
              </Link>

              {/* Dashboard mockup */}
              <div className="mt-6 rounded-2xl bg-white border border-border/60 shadow-sm overflow-hidden relative pb-6">
                {/* Browser chrome */}
                <div className="bg-[#F5F5F5] px-3.5 py-2.5 flex items-center gap-1.5 border-b border-border/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>

                {/* Mockup content */}
                <div className="p-4 space-y-2.5">
                  {/* Top row: dark bar + text bar */}
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-24 bg-primary/80 rounded-md flex-shrink-0" />
                    <div className="h-2 bg-dark/15 rounded-full flex-1" />
                  </div>
                  {/* Separator */}
                  <div className="h-px bg-border/60" />
                  {/* Two col row: red pills */}
                  <div className="flex gap-2 pt-1">
                    <div className="flex-1 space-y-1.5">
                      <div className="h-5 bg-primary/15 rounded-md" />
                      <div className="h-2 bg-dark/8 rounded-full w-3/4" />
                      <div className="h-2 bg-dark/8 rounded-full w-1/2" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="h-5 bg-primary/15 rounded-md" />
                      <div className="h-2 bg-dark/8 rounded-full w-3/4" />
                      <div className="h-2 bg-dark/8 rounded-full w-1/2" />
                    </div>
                  </div>
                  {/* Footer line */}
                  <div className="h-2 bg-dark/6 rounded-full w-2/3 mt-1" />
                </div>

                {/* 50+ Mitra badge — bottom left */}
                <div className="absolute bottom-3 left-3 bg-white rounded-lg px-3 py-1.5 shadow-md border border-border/60 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-muted" strokeWidth={2} />
                  <span className="text-[10.5px] font-bold text-dark">50+ Mitra</span>
                </div>

                {/* MOU Aktif badge — bottom right */}
                <div className="absolute bottom-3 right-3 bg-white rounded-lg px-3 py-1.5 shadow-md border border-border/60 flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                  <span className="text-[10.5px] font-bold text-dark">MOU Aktif</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CARA KERJA
          ═══════════════════════════════════════════ */}
      <CaraKerjaSection />

      {/* ═══════════════════════════════════════════
          WHY CHOOSE EL PARTNERS
          ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#FCFCFC] overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="mb-14 text-left">
            <span className="text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em]">
              KENAPA EASYLEGAL
            </span>
            <h2 className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] mt-3 tracking-[-0.02em] leading-tight">
              Fondasi kokoh untuk legalitas<br />bisnis Anda.
            </h2>
            <p className="text-[15px] text-[#6B7280] mt-3 max-w-2xl leading-relaxed">
              Bukan sekadar urus dokumen — kami partner legal yang menyederhanakan proses, transparan dalam biaya, dan responsif kapan saja.
            </p>
          </div>

          {/* Premium Custom Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Card 1: Proses Cepat & Terlacak */}
            <div className="bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col justify-start text-left transition-all duration-300 hover:shadow-md">
              <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mb-5">
                <svg className="w-5 h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-[16px] font-black text-[#111827] mb-2 leading-snug">
                Proses cepat & terlacak
              </h4>
              <p className="text-[13px] text-[#6B7280] leading-relaxed">
                SLA 7–14 hari kerja dengan progress yang dipantau real-time.
              </p>
            </div>

            {/* Card 2: Konsultan Hukum Berpengalaman */}
            <div className="bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col justify-start text-left transition-all duration-300 hover:shadow-md">
              <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mb-5">
                <svg className="w-5 h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="text-[16px] font-black text-[#111827] mb-2 leading-snug">
                Konsultan hukum berpengalaman
              </h4>
              <p className="text-[13px] text-[#6B7280] leading-relaxed">
                Ditangani lawyer yang sudah menangani ribuan kasus UMKM.
              </p>
            </div>

            {/* Card 3: Resmi Terdaftar PSE */}
            <div className="bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col justify-start text-left transition-all duration-300 hover:shadow-md">
              <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mb-5">
                <svg className="w-5 h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-[16px] font-black text-[#111827] mb-2 leading-snug">
                Resmi terdaftar PSE Kominfo
              </h4>
              <p className="text-[13px] text-[#6B7280] leading-relaxed">
                Data Anda aman & terlindungi sesuai regulasi.
              </p>
            </div>

            {/* Card 4: Tracking Real-Time (Tall card spanning 2 rows on desktop) */}
            <div className="md:row-span-2 bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_15px_35px_rgba(0,0,0,0.02)] flex flex-col justify-between text-left transition-all duration-300 hover:shadow-md min-h-[420px]">
              
              {/* Tracker Mockup */}
              <div className="space-y-3.5">
                {/* Step 1: Konsultasi (DONE) */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0 border border-emerald-100">
                    <Check className="w-3 h-3 text-[#2E7D32]" strokeWidth={4} />
                  </div>
                  <span className="text-[12.5px] font-extrabold text-gray-800">Konsultasi</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[8px] font-black tracking-wider uppercase ml-auto border border-emerald-100">
                    DONE
                  </span>
                </div>

                {/* Step 2: Cek Nama PT (DONE) */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0 border border-emerald-100">
                    <Check className="w-3 h-3 text-[#2E7D32]" strokeWidth={4} />
                  </div>
                  <span className="text-[12.5px] font-extrabold text-gray-800">Cek Nama PT</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[8px] font-black tracking-wider uppercase ml-auto border border-emerald-100">
                    DONE
                  </span>
                </div>

                {/* Step 3: Akta Notaris (JALAN - highlighted in pink/red) */}
                <div className="border border-[#FEF2F2] bg-[#FEF2F2]/60 rounded-xl px-2.5 py-2 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#B91C1C] flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 shadow-sm">
                    3
                  </div>
                  <span className="text-[12.5px] font-extrabold text-gray-800">Akta Notaris</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FEF2F2] text-[#B91C1C] border border-[#FEE2E2] text-[8px] font-black tracking-wider uppercase ml-auto">
                    JALAN
                  </span>
                </div>

                {/* Step 4: Pengesahan AHU (Inactive) */}
                <div className="flex items-center gap-3 opacity-55 pl-1.5">
                  <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 text-[10px] font-extrabold flex-shrink-0 border border-gray-250">
                    4
                  </div>
                  <span className="text-[12.5px] font-bold text-gray-500">Pengesahan AHU</span>
                </div>
              </div>

              {/* Bottom text info */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="text-[16px] font-black text-[#111827] leading-snug">
                  Tracking real-time
                </h4>
                <p className="text-[13px] text-[#6B7280] leading-relaxed mt-1">
                  Pantau setiap tahap pengurusan dari dashboard.
                </p>
              </div>
            </div>

            {/* Card 5: Harga Transparan (Spans 2 columns on desktop) */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 transition-all duration-300 hover:shadow-md">
              
              {/* Left explanation */}
              <div className="flex-1 text-left">
                <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mb-5">
                  <svg className="w-5 h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-[16px] font-black text-[#111827] mb-2 leading-snug">
                  Harga transparan, tanpa kejutan
                </h4>
                <p className="text-[13px] text-[#6B7280] leading-relaxed max-w-[340px]">
                  Semua biaya tertera di awal — termasuk jasa kami dan biaya pemerintah. Tidak ada add-on mendadak di tengah proses.
                </p>
              </div>

              {/* Right: Pricing Card Mockup */}
              <div className="w-full sm:w-[200px] bg-white rounded-2xl border-2 border-dashed border-[#B91C1C]/15 p-4 flex flex-col text-left flex-shrink-0 shadow-sm">
                <span className="text-[9px] font-extrabold text-gray-400 tracking-wider uppercase">
                  PENDIRIAN PT
                </span>
                <div className="text-[20px] font-black text-[#B91C1C] leading-tight mt-1">
                  Rp 2.500.000
                </div>
                <div className="w-full h-px bg-gray-100 my-3" />
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 text-[10.5px] font-bold text-gray-700">
                    <Check className="w-3.5 h-3.5 text-[#16A34A]" strokeWidth={3.5} />
                    <span>Jasa kami</span>
                  </li>
                  <li className="flex items-center gap-2 text-[10.5px] font-bold text-gray-700">
                    <Check className="w-3.5 h-3.5 text-[#16A34A]" strokeWidth={3.5} />
                    <span>Biaya AHU</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 6: 100% Online & Paperless */}
            <div className="bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col justify-start text-left transition-all duration-300 hover:shadow-md">
              <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mb-5">
                <svg className="w-5 h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h4 className="text-[16px] font-black text-[#111827] mb-2 leading-snug">
                100% online & paperless
              </h4>
              <p className="text-[13px] text-[#6B7280] leading-relaxed">
                Upload aman dari mana saja, tanpa harus ke kantor.
              </p>
            </div>

            {/* Card 7: CS Responsif 24/7 */}
            <div className="bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col justify-start text-left transition-all duration-300 hover:shadow-md">
              <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mb-5">
                <svg className="w-5 h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="text-[16px] font-black text-[#111827] mb-2 leading-snug">
                CS responsif 24/7
              </h4>
              <p className="text-[13px] text-[#6B7280] leading-relaxed">
                WhatsApp dijawab rata-rata &lt; 5 menit.
              </p>
            </div>

            {/* Card 8: Dipercaya Pengusaha (Spans 3 columns on desktop) */}
            <div className="md:col-span-3 bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all duration-300 hover:shadow-md">
              
              {/* Left stats info text */}
              <div className="text-left">
                <h4 className="text-[16px] font-black text-[#111827] leading-snug">
                  Dipercaya pengusaha Indonesia di berbagai industri
                </h4>
                <p className="text-[13px] text-[#6B7280] leading-relaxed mt-1">
                  Dari UMKM kuliner sampai startup teknologi.
                </p>
              </div>

              {/* Right metrics columns */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-12 flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-100 md:border-t-0">
                {/* Metric 1 */}
                <div className="text-left">
                  <div className="text-[28px] font-black text-[#B91C1C] leading-none">
                    11.000+
                  </div>
                  <div className="text-[11px] text-gray-400 font-bold mt-2.5">
                    Bisnis terlayani
                  </div>
                </div>

                {/* Divider 1 */}
                <div className="hidden sm:block w-px h-11 bg-gray-150" />

                {/* Metric 2 */}
                <div className="text-left">
                  <div className="text-[28px] font-black text-gray-800 leading-none flex items-baseline">
                    4.9<span className="text-amber-500 ml-0.5">★</span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-bold mt-2.5">
                    Rating Google
                  </div>
                </div>

                {/* Divider 2 */}
                <div className="hidden sm:block w-px h-11 bg-gray-150" />

                {/* Metric 3 */}
                <div className="text-left">
                  <div className="text-[28px] font-black text-[#B91C1C] leading-none">
                    5thn
                  </div>
                  <div className="text-[11px] text-gray-400 font-bold mt-2.5">
                    Pengalaman
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#F9FAFB] overflow-hidden relative">
        {/* Local CSS styles for infinite marquee loop */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-left {
            display: flex;
            width: max-content;
            animation: marquee-left 45s linear infinite;
          }
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: marquee-right 45s linear infinite;
          }
          .marquee-container:hover .animate-marquee-left,
          .marquee-container:hover .animate-marquee-right {
            animation-play-state: paused;
          }
        ` }} />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 text-center relative z-10">
          
          {/* Header */}
          <div className="mb-14">
            <span className="text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em]">
              TESTIMONI
            </span>
            <h2 className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] mt-3 tracking-[-0.02em] leading-tight">
              Kata mereka yang sudah jalan<br />duluan.
            </h2>
            <p className="text-[14.5px] text-[#6B7280] mt-4 max-w-[620px] mx-auto leading-relaxed">
              Dari UMKM kuliner sampai startup teknologi — semua percayakan urusan legalnya ke EasyLegal.
            </p>
          </div>
        </div>

        {/* Marquee Wrapper Container */}
        <div className="relative w-full overflow-hidden flex flex-col gap-2 mt-4 py-8 marquee-container">
          
          {/* Left & Right Elegant Fading Shadow Overlays */}
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none" />

          {/* ROW 1: Scrolling Left */}
          <div className="flex w-full py-4 overflow-visible">
            <div className="animate-marquee-left flex">
              {/* First Track Copy */}
              {[
                {
                  initials: "AR",
                  name: "Ahmad Rizky",
                  role: "Founder · PT Maju Bersama",
                  text: "Prosesnya jauh lebih cepat dari ekspektasi. PT saya keluar dalam 10 hari kerja, semua dibantu dari A-Z.",
                  bg: "bg-[#B91C1C]"
                },
                {
                  initials: "SW",
                  name: "Siti Wahyuni",
                  role: "Owner · Brand Fashion Lokal",
                  text: "Daftar merek dijelaskan detail sampai pilihan kelas. Harga jelas dari awal, gak ada biaya kejutan di tengah.",
                  bg: "bg-[#111827]"
                },
                {
                  initials: "BH",
                  name: "Budi Hartono",
                  role: "CEO · Startup Teknologi",
                  text: "CS-nya responsif banget via WA. Untuk startup yang baru mulai kayak kami, ini sangat membantu. Highly recommended.",
                  bg: "bg-[#450A0A]"
                },
                {
                  initials: "AP",
                  name: "Andika Putra",
                  role: "Owner · UMKM Konveksi",
                  text: "Awalnya khawatir ribet ngurus sendiri. Tapi dibantu sampai paham, tim sabar banget jawab pertanyaan saya yang banyak.",
                  bg: "bg-[#B91C1C]"
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="w-[350px] flex-shrink-0 bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between text-left mx-3 transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-gray-250/90 hover:z-20 relative cursor-pointer"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex space-x-0.5 mb-3.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {/* Review Text */}
                    <p className="text-[13px] text-gray-700 font-medium leading-relaxed mb-5">
                      &quot;{item.text}&quot;
                    </p>
                  </div>

                  {/* User Profile */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                    <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center text-white text-[11px] font-black flex-shrink-0 shadow-sm`}>
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-black text-[#111827] leading-tight truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-[#6B7280] font-semibold mt-0.5 truncate">
                        {item.role}
                      </div>
                    </div>
                    {/* Google Badge */}
                    <div className="flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] px-2.5 py-0.5 rounded-lg text-[9px] font-black border border-emerald-100/30 ml-auto flex-shrink-0">
                      <Check className="w-2.5 h-2.5" strokeWidth={4} />
                      <span>Google</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Second Track Copy (Infinite Loop Repeat) */}
              {[
                {
                  initials: "AR",
                  name: "Ahmad Rizky",
                  role: "Founder · PT Maju Bersama",
                  text: "Prosesnya jauh lebih cepat dari ekspektasi. PT saya keluar dalam 10 hari kerja, semua dibantu dari A-Z.",
                  bg: "bg-[#B91C1C]"
                },
                {
                  initials: "SW",
                  name: "Siti Wahyuni",
                  role: "Owner · Brand Fashion Lokal",
                  text: "Daftar merek dijelaskan detail sampai pilihan kelas. Harga jelas dari awal, gak ada biaya kejutan di tengah.",
                  bg: "bg-[#111827]"
                },
                {
                  initials: "BH",
                  name: "Budi Hartono",
                  role: "CEO · Startup Teknologi",
                  text: "CS-nya responsif banget via WA. Untuk startup yang baru mulai kayak kami, ini sangat membantu. Highly recommended.",
                  bg: "bg-[#450A0A]"
                },
                {
                  initials: "AP",
                  name: "Andika Putra",
                  role: "Owner · UMKM Konveksi",
                  text: "Awalnya khawatir ribet ngurus sendiri. Tapi dibantu sampai paham, tim sabar banget jawab pertanyaan saya yang banyak.",
                  bg: "bg-[#B91C1C]"
                }
              ].map((item, idx) => (
                <div 
                  key={`dup-${idx}`}
                  className="w-[350px] flex-shrink-0 bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between text-left mx-3 transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-gray-250/90 hover:z-20 relative cursor-pointer"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex space-x-0.5 mb-3.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {/* Review Text */}
                    <p className="text-[13px] text-gray-700 font-medium leading-relaxed mb-5">
                      &quot;{item.text}&quot;
                    </p>
                  </div>

                  {/* User Profile */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                    <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center text-white text-[11px] font-black flex-shrink-0 shadow-sm`}>
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-black text-[#111827] leading-tight truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-[#6B7280] font-semibold mt-0.5 truncate">
                        {item.role}
                      </div>
                    </div>
                    {/* Google Badge */}
                    <div className="flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] px-2.5 py-0.5 rounded-lg text-[9px] font-black border border-emerald-100/30 ml-auto flex-shrink-0">
                      <Check className="w-2.5 h-2.5" strokeWidth={4} />
                      <span>Google</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ROW 2: Scrolling Right */}
          <div className="flex w-full py-4 overflow-visible">
            <div className="animate-marquee-right flex">
              {/* First Track Copy */}
              {[
                {
                  initials: "FK",
                  name: "Feri Kurniawan",
                  role: "Direktur · PT Logistik Jaya",
                  text: "Layanan LKPM dan perizinan bea cukai diurus dengan teliti. Laporan rapi, tidak ada kendala dengan dinas.",
                  bg: "bg-[#1F2937]"
                },
                {
                  initials: "DL",
                  name: "Dewi Lestari",
                  role: "Co-founder · SaaS Startup",
                  text: "Virtual Office Jakarta sudah aktif hari yang sama saya bayar. Untuk PT digital kami, ini exactly yang dibutuhkan.",
                  bg: "bg-[#B91C1C]"
                },
                {
                  initials: "LH",
                  name: "Linda Hartono",
                  role: "Owner · PT Beauty Care",
                  text: "Perubahan akta PT yang biasanya ribet, di EasyLegal cepat banget. Update direksi selesai dalam seminggu.",
                  bg: "bg-[#450A0A]"
                },
                {
                  initials: "BS",
                  name: "Bayu Setiawan",
                  role: "Owner · F&B Restoran",
                  text: "Sertifikat halal untuk produk kami diurus sampai keluar. Tim follow up rajin sampai semuanya tuntas.",
                  bg: "bg-[#451A03]"
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="w-[350px] flex-shrink-0 bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between text-left mx-3 transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-gray-250/90 hover:z-20 relative cursor-pointer"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex space-x-0.5 mb-3.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {/* Review Text */}
                    <p className="text-[13px] text-gray-700 font-medium leading-relaxed mb-5">
                      &quot;{item.text}&quot;
                    </p>
                  </div>

                  {/* User Profile */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                    <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center text-white text-[11px] font-black flex-shrink-0 shadow-sm`}>
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-black text-[#111827] leading-tight truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-[#6B7280] font-semibold mt-0.5 truncate">
                        {item.role}
                      </div>
                    </div>
                    {/* Google Badge */}
                    <div className="flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] px-2.5 py-0.5 rounded-lg text-[9px] font-black border border-emerald-100/30 ml-auto flex-shrink-0">
                      <Check className="w-2.5 h-2.5" strokeWidth={4} />
                      <span>Google</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Second Track Copy (Infinite Loop Repeat) */}
              {[
                {
                  initials: "FK",
                  name: "Feri Kurniawan",
                  role: "Direktur · PT Logistik Jaya",
                  text: "Layanan LKPM dan perizinan bea cukai diurus dengan teliti. Laporan rapi, tidak ada kendala dengan dinas.",
                  bg: "bg-[#1F2937]"
                },
                {
                  initials: "DL",
                  name: "Dewi Lestari",
                  role: "Co-founder · SaaS Startup",
                  text: "Virtual Office Jakarta sudah aktif hari yang sama saya bayar. Untuk PT digital kami, ini exactly yang dibutuhkan.",
                  bg: "bg-[#B91C1C]"
                },
                {
                  initials: "LH",
                  name: "Linda Hartono",
                  role: "Owner · PT Beauty Care",
                  text: "Perubahan akta PT yang biasanya ribet, di EasyLegal cepat banget. Update direksi selesai dalam seminggu.",
                  bg: "bg-[#450A0A]"
                },
                {
                  initials: "BS",
                  name: "Bayu Setiawan",
                  role: "Owner · F&B Restoran",
                  text: "Sertifikat halal untuk produk kami diurus sampai keluar. Tim follow up rajin sampai semuanya tuntas.",
                  bg: "bg-[#451A03]"
                }
              ].map((item, idx) => (
                <div 
                  key={`dup-${idx}`}
                  className="w-[350px] flex-shrink-0 bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between text-left mx-3 transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-gray-250/90 hover:z-20 relative cursor-pointer"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex space-x-0.5 mb-3.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {/* Review Text */}
                    <p className="text-[13px] text-gray-700 font-medium leading-relaxed mb-5">
                      &quot;{item.text}&quot;
                    </p>
                  </div>

                  {/* User Profile */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                    <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center text-white text-[11px] font-black flex-shrink-0 shadow-sm`}>
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-black text-[#111827] leading-tight truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-[#6B7280] font-semibold mt-0.5 truncate">
                        {item.role}
                      </div>
                    </div>
                    {/* Google Badge */}
                    <div className="flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] px-2.5 py-0.5 rounded-lg text-[9px] font-black border border-emerald-100/30 ml-auto flex-shrink-0">
                      <Check className="w-2.5 h-2.5" strokeWidth={4} />
                      <span>Google</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUSTED BY
          ═══════════════════════════════════════════ */}
      <section className="py-12 bg-bg-light border-y border-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-[12px] text-muted mb-8 font-medium uppercase tracking-widest">
            Dipercaya oleh <span className="font-bold text-primary">12.000+ pengusaha</span> di seluruh Indonesia
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedBy.map((c, idx) => (
              <span key={idx} className="text-[14px] font-semibold text-dark/30 hover:text-dark/50 transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LATEST INSIGHTS
          ═══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          
          {/* Header & 'Lihat Semua' button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div className="text-left">
              <span className="text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em]">
                INFORMASI HUKUM
              </span>
              <h2 className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] mt-3 tracking-[-0.02em] leading-tight">
                Panduan & update hukum untuk<br />pelaku usaha.
              </h2>
              <p className="text-[14.5px] text-[#6B7280] mt-3 max-w-[540px] leading-relaxed">
                Insight terbaru tentang regulasi, perizinan, dan tips legalitas — supaya bisnis Anda tumbuh aman & compliant.
              </p>
            </div>
            <Link 
              href="/cek-nama" 
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-200 text-[13px] font-bold text-gray-800 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm flex-shrink-0"
            >
              <span>Lihat semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Premium Split Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Large Featured Article Card (colspan 5) */}
            <div className="lg:col-span-5 h-full">
              <Link 
                href="/cek-nama" 
                className="group flex flex-col h-full bg-white rounded-3xl border border-gray-150/70 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.012)] hover:shadow-md hover:scale-[1.015] transition-all duration-300 text-left"
              >
                {/* Large Thumbnail */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-50 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop" 
                    alt="Sertifikasi ISO 9001" 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                </div>
                
                {/* Card Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Tag & Date row */}
                    <div className="flex items-center">
                      <span className="bg-[#FEF2F2] text-[#B91C1C] px-2.5 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase border border-[#FEE2E2]">
                        SERTIFIKASI ISO
                      </span>
                      <span className="text-[10.5px] text-gray-400 font-bold ml-3.5">
                        15 Mei 2026 · 8 min baca
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-[18px] lg:text-[20px] font-black text-[#111827] mt-3.5 leading-snug group-hover:text-[#B91C1C] transition-colors">
                      Sertifikasi ISO 9001: Pengertian, Jenis, dan Manfaatnya untuk Bisnis
                    </h3>
                    
                    {/* Description */}
                    <p className="text-[13px] text-[#6B7280] leading-relaxed mt-3 font-medium">
                      Panduan lengkap apa itu ISO 9001, perbedaan dengan ISO lain (14001, 27001, 45001), dan kenapa bisnis Anda butuh sertifikasi ini di pasar internasional.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* RIGHT COLUMN: 2x2 Grid of Smaller Article Cards (colspan 7) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              
              {/* Card 1: Pendirian PT */}
              <Link 
                href="/cek-nama" 
                className="group flex flex-col bg-white rounded-3xl border border-gray-150/70 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.012)] hover:shadow-md hover:scale-[1.015] transition-all duration-300 text-left"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-50">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop" 
                    alt="Pendirian PT vs CV" 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="bg-[#FEF2F2] text-[#B91C1C] px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase border border-[#FEE2E2]">
                        PENDIRIAN PT
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold ml-2.5">
                        12 Mei · 6 min
                      </span>
                    </div>
                    <h3 className="text-[14px] lg:text-[14.5px] font-black text-[#111827] mt-3 leading-snug group-hover:text-[#B91C1C] transition-colors">
                      PT vs CV vs PT Perorangan: Mana yang Cocok untuk Bisnis Anda?
                    </h3>
                  </div>
                </div>
              </Link>

              {/* Card 2: KBLI 2025 */}
              <Link 
                href="/cek-nama" 
                className="group flex flex-col bg-white rounded-3xl border border-gray-150/70 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.012)] hover:shadow-md hover:scale-[1.015] transition-all duration-300 text-left"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-50">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop" 
                    alt="KBLI 2025" 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="bg-[#FEF2F2] text-[#B91C1C] px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase border border-[#FEE2E2]">
                        KBLI 2025
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold ml-2.5">
                        10 Mei · 5 min
                      </span>
                    </div>
                    <h3 className="text-[14px] lg:text-[14.5px] font-black text-[#111827] mt-3 leading-snug group-hover:text-[#B91C1C] transition-colors">
                      KBLI 2025: Update Klasifikasi Baku Lapangan Usaha Indonesia
                    </h3>
                  </div>
                </div>
              </Link>

              {/* Card 3: Perizinan */}
              <Link 
                href="/cek-nama" 
                className="group flex flex-col bg-white rounded-3xl border border-gray-150/70 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.012)] hover:shadow-md hover:scale-[1.015] transition-all duration-300 text-left"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-50">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop" 
                    alt="NIB & OSS" 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="bg-[#FEF2F2] text-[#B91C1C] px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase border border-[#FEE2E2]">
                        PERIZINAN
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold ml-2.5">
                        8 Mei · 4 min
                      </span>
                    </div>
                    <h3 className="text-[14px] lg:text-[14.5px] font-black text-[#111827] mt-3 leading-snug group-hover:text-[#B91C1C] transition-colors">
                      Panduan Lengkap NIB & OSS untuk UMKM Indonesia 2026
                    </h3>
                  </div>
                </div>
              </Link>

              {/* Card 4: Merek & HAKI */}
              <Link 
                href="/cek-nama" 
                className="group flex flex-col bg-white rounded-3xl border border-gray-150/70 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.012)] hover:shadow-md hover:scale-[1.015] transition-all duration-300 text-left"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-50">
                  <img 
                    src="https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=400&auto=format&fit=crop" 
                    alt="Cek Daftar Merek" 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="bg-[#FEF2F2] text-[#B91C1C] px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase border border-[#FEE2E2]">
                        MEREK & HAKI
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold ml-2.5">
                        5 Mei · 7 min
                      </span>
                    </div>
                    <h3 className="text-[14px] lg:text-[14.5px] font-black text-[#111827] mt-3 leading-snug group-hover:text-[#B91C1C] transition-colors">
                      Cara Cek & Daftar Merek Dagang di DJKI: Panduan Lengkap
                    </h3>
                  </div>
                </div>
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <CTA />

    </div>
  );
}
