"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";


const InformasiHukumSection = dynamic(() => import("@/components/home/InformasiHukumSection"), {
  ssr: true,
  loading: () => <div className="h-[600px] w-full animate-pulse bg-gray-50/50" />
});
const LayananKami = dynamic(() => import("@/components/home/LayananKami"), { ssr: true });
const Hero = dynamic(() => import("@/components/home/Hero"), {
  ssr: true,
  loading: () => <div className="min-h-[580px] w-full animate-pulse bg-gray-50/50" />
});
const Testimonials = dynamic(() => import("@/components/home/Testimonials"), { ssr: true });
const BottomPromoSection = dynamic(() => import("@/components/home/BottomPromoSection"), { ssr: true });
import MediaCoverage from "@/components/MediaCoverage";
import {
  quickTools,
  partnerLogos,
} from "./data";
import { ArticleItem } from "./InformasiHukumSection";


import {
  ArrowRight,
  Check,
  Building2,
  MessageCircle,
  ShieldCheck,
  FileText,
  Award,
  Lock,
  Phone,
  MapPin,
  Truck,
  Download,
} from "lucide-react";

/* ─── DATA ─── */

function VideoEmbedSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRevealed(true); obs.unobserve(el); }
    }, { rootMargin: "-50px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`animate-scroll-reveal ${revealed ? "revealed" : ""}`}>
      <div className="group relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] shadow-sm border border-black/[0.02] hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] transition-all duration-500">
        <div className="relative aspect-video w-full bg-black overflow-hidden">
          {isPlaying ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/PHyO3XoAGEU?autoplay=1&rel=0&modestbranding=1"
              title="EasyLegal — Client Story: Menguatkan Pebisnis Awam Lewat Taka Lab"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              style={{ border: 0 }}
            />
          ) : (
            <>
              {/* Static YouTube cover image placeholder - deprioritized for LCP */}
              <Image
                src="https://img.youtube.com/vi/PHyO3XoAGEU/hqdefault.jpg"
                alt="EasyLegal Video Cover"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover opacity-90 group-hover:scale-[1.01] transition-transform duration-700"
                fetchPriority="low"
                placeholder="empty"
              />
              <div className="absolute inset-0 bg-black/20" />
              {/* Click-to-play button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full cursor-pointer z-10 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50 flex items-center justify-center"
                aria-label="Putar video"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#B91C1C] flex items-center justify-center shadow-[0_8px_30px_rgba(185,28,28,0.4)] group-hover:scale-110 group-hover:shadow-[0_12px_40px_rgba(185,28,28,0.5)] transition-all duration-300 active:scale-95" aria-hidden="true">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

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
    <section className="py-8 sm:py-20 bg-white overflow-hidden relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* LEFT: Step-by-Step Accordion Flow */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="text-[9px] sm:text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em] mb-1.5 sm:mb-3">
              Cara Kerja
            </span>
            <h2 className="text-[20px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] leading-[1.25] sm:leading-[1.12] tracking-[-0.02em]">
              Empat Langkah, Semua Beres<br className="hidden sm:inline" /> Tanpa Pusing.
            </h2>
            <p className="mt-2 sm:mt-4 text-[11.5px] sm:text-[14.5px] text-[#6B7280] leading-relaxed max-w-[460px]">
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
              <div className="flex flex-col text-left animate-fade-in w-full">
                <button 
                  onClick={() => setActiveStep(idx)}
                  className="flex items-center gap-3 text-left group active:scale-[0.98] w-full min-h-[44px]"
                >
                          <span className="text-[#B91C1C] text-[18px] font-extrabold transition-transform duration-200 group-hover:translate-x-1">
                            →
                          </span>
                          <span className="text-[17px] font-black text-[#111827]">
                            {step.title}
                          </span>
                        </button>
                        
                        <div 
                          className="mt-3 pl-7 overflow-hidden animate-fade-in-up"
                          style={{ animationDelay: "0.1s" }}
                        >
                          <p className="text-[13px] text-[#6B7280] font-medium leading-relaxed mb-4">
                            {step.description}
                          </p>
                          <ul className="space-y-3">
                            {step.features.map((feat, fidx) => (
                              <li 
                                key={fidx} 
                                className="flex items-start gap-3 text-[13px] text-gray-700 leading-snug animate-fade-in-up"
                                style={{ animationDelay: `${0.15 + fidx * 0.08}s` }}
                              >
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
                className="flex items-center gap-4 w-full text-left py-2 hover:text-gray-900 group active:scale-[0.98] min-h-[44px]"
              >
                        <span className="text-[#9CA3AF] text-[14.5px] font-extrabold tracking-wider w-6">
                          {step.num}
                        </span>
                        <span className="text-[16px] font-semibold text-gray-500 group-hover:text-gray-700 transition-colors duration-150">
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
          <div className="lg:col-span-7 relative w-full h-[520px] hidden lg:flex items-center justify-center scale-90 sm:scale-100 origin-center transition-all duration-500">
            
            {/* Step 1 Visual Container */}
            {activeStep === 0 && (
              <div key="step-0" className="absolute inset-0 w-full h-full animate-step-in">
                
                {/* Main Photo of Smiling Professional Man */}
                <div className="absolute top-8 left-[12%] w-[76%] h-[80%] rounded-[2rem] overflow-hidden drop-shadow-xl transition-all duration-500 bg-slate-50">
                  <Image 
                    src="/images/home/cara-kerja-step1.png"
                    alt="Pilih Layanan" 
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>

                {/* Floating "Akta selesai" Badge */}
                <div className="absolute top-[12%] right-[2%] bg-white rounded-full px-3.5 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-black/[0.03] flex items-center gap-2.5 z-40 animate-bounce-slow">
                  <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#2E7D32]" strokeWidth={4} />
                  </div>
                  <div className="flex items-baseline gap-1.5 leading-none pr-1">
                    <span className="text-[12px] font-black text-gray-800">Akta selesai</span>
                    <span className="text-[10px] text-gray-500 font-bold">2 menit lalu</span>
                  </div>
                </div>

                {/* Floating "Google 4.9 Rating" Badge */}
                <div className="absolute top-[40%] -right-2 bg-white rounded-2xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-black/[0.03] flex flex-col gap-3 z-40 w-[200px] animate-float-medium">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-500 font-extrabold text-[14px] flex items-center gap-1">★ 4.9</span>
                    <span className="text-[10px] text-gray-400 font-black tracking-wider">GOOGLE</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2.5 overflow-hidden">
                      <Image className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User 1" width={28} height={28} />
                      <Image className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="User 2" width={28} height={28} />
                      <Image className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="User 3" width={28} height={28} />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[12px] font-black text-gray-800">11.000+</div>
                      <div className="text-[10px] font-bold text-gray-500 mt-0.5">bisnis terbantu</div>
                    </div>
                  </div>
                </div>

                {/* Gold Shield */}
                <div className="absolute bottom-[20%] right-[0%] z-35 animate-float-slow">
                  <div className="w-[100px] h-[100px] drop-shadow-[0_15px_20px_rgba(217,119,6,0.25)]">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="shield-gold" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#FDE047" />
                          <stop offset="50%" stopColor="#EAB308" />
                          <stop offset="100%" stopColor="#854D0E" />
                        </linearGradient>
                      </defs>
                      <path d="M50 5 L90 20 L90 45 C90 70 72 90 50 98 C28 90 10 70 10 45 L10 20 Z" fill="url(#shield-gold)" />
                      <path d="M50 12 L84 25 L84 45 C84 66 68 84 50 91 C32 84 16 66 16 45 L16 25 Z" fill="none" stroke="#FEF08A" strokeWidth="2" />
                      <path d="M35 50 L45 60 L65 35" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                </div>

                {/* Main FLOATING card "01 Pilih Layanan" */}
                <div className="absolute -bottom-[124px] left-[0%] w-[62%] bg-white/95 backdrop-blur-sm rounded-[24px] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.12)] z-40 border border-white">
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-3.5">
                    <div className="w-9 h-9 rounded-[10px] bg-[#B91C1C] flex items-center justify-center text-white font-black text-[13px] shadow-lg shadow-red-500/30">
                      01
                    </div>
                    <div>
                      <div className="text-[14px] font-black text-[#111827] leading-tight">Pilih Layanan</div>
                      <div className="text-[10px] text-[#6B7280] font-semibold mt-0.5">Tentukan jasa legal yang Anda butuhkan</div>
                    </div>
                  </div>

                  {/* 2x2 Options Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Active Option Box: Pendirian PT */}
                    <div className="border-[1.5px] border-[#B91C1C] bg-[#FEF2F2] rounded-xl p-2.5 flex items-center gap-2 text-left shadow-sm">
                      <div className="w-7 h-7 rounded-[8px] bg-[#B91C1C] flex items-center justify-center flex-shrink-0 shadow-md">
                        <Building2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black text-[#B91C1C] leading-tight truncate">Pendirian PT</div>
                        <div className="text-[8px] font-extrabold text-[#B91C1C]/80 mt-0.5 leading-none">Mulai Rp2,5jt</div>
                      </div>
                    </div>

                    {/* Option Box: NIB & OSS */}
                    <div className="shadow-sm border border-gray-100 bg-white rounded-xl p-2.5 flex items-center gap-2 text-left">
                      <div className="w-7 h-7 rounded-[8px] bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-gray-700 leading-tight truncate">NIB & OSS</div>
                        <div className="text-[8px] font-semibold text-gray-400 mt-0.5 leading-none">Mulai Rp500rb</div>
                      </div>
                    </div>

                    {/* Option Box: Daftar Merek */}
                    <div className="shadow-sm border border-gray-100 bg-white rounded-xl p-2.5 flex items-center gap-2 text-left">
                      <div className="w-7 h-7 rounded-[8px] bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-gray-700 leading-tight truncate">Daftar Merek</div>
                        <div className="text-[8px] font-semibold text-gray-400 mt-0.5 leading-none">Mulai Rp1,5jt</div>
                      </div>
                    </div>

                    {/* Option Box: ISO 9001 */}
                    <div className="shadow-sm border border-gray-100 bg-white rounded-xl p-2.5 flex items-center gap-2 text-left">
                      <div className="w-7 h-7 rounded-[8px] bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                        <Award className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-gray-700 leading-tight truncate">ISO 9001</div>
                        <div className="text-[8px] font-semibold text-gray-400 mt-0.5 leading-none">Konsultasi</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating "Pendirian PT - proses" Circular Badge */}
                <div className="absolute -bottom-[108px] right-[5%] bg-white rounded-[20px] p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-2.5 z-50 w-[205px] animate-float-medium">
                  {/* Circular progress */}
                  <div className="relative w-9 h-9 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-[#B91C1C]" strokeDasharray="72, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="absolute text-[10px] font-black text-gray-800">72%</span>
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-[11px] font-black text-gray-800 truncate">Pendirian PT — proses</div>
                    <div className="text-[9px] text-gray-500 font-bold mt-1 truncate">Tahap 3/4 · 2 hari lagi</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 Visual Container */}
            {activeStep === 1 && (
              <div key="step-1" className="absolute inset-0 w-full h-full animate-step-in">
                
                {/* Main Photo of Lawyer/Consultant */}
                <div className="absolute top-8 left-[12%] w-[76%] h-[80%] rounded-[2rem] overflow-hidden drop-shadow-xl transition-all duration-500 bg-slate-50">
                  <Image
                    src="/images/home/promo-bule2.png"
                    alt="Konsultasi Gratis"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>



                {/* "Konsultasi Aktif — Online" Badge */}
                <div className="absolute top-[12%] right-[2%] bg-white rounded-full px-3.5 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-black/[0.03] flex items-center gap-2.5 z-40 animate-bounce-slow">
                  <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#2E7D32]" strokeWidth={4} />
                  </div>
                  <div className="flex items-baseline gap-1.5 pr-1">
                    <span className="text-[12px] font-black text-gray-800">Konsultasi Aktif</span>
                    <span className="text-[10px] text-green-600 font-bold">Online</span>
                  </div>
                </div>

                {/* "Jadwal Terkonfirmasi" Badge */}
                <div className="absolute top-[40%] -right-2 bg-white rounded-2xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-black/[0.03] flex items-center gap-3 z-40 w-[200px] animate-float-medium">
                  <div className="w-10 h-10 rounded-full border-[2px] border-emerald-500 flex items-center justify-center text-[12px] font-black text-emerald-600 flex-shrink-0 bg-emerald-50">
                    OK
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-[13px] font-black text-gray-800 truncate">Jadwal Fix</div>
                    <div className="text-[10px] text-gray-500 font-bold mt-1 truncate">Hari Ini · 14.00 WIB</div>
                  </div>
                </div>

                {/* 5.0 Rating Badge */}
                <div className="absolute bottom-[20%] right-[0%] bg-white rounded-2xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-black/[0.03] flex flex-col gap-2 z-40 w-[180px] animate-float-slow">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-500 font-extrabold text-[14px] flex items-center gap-1">★ 5.0</span>
                    <span className="text-[10px] text-gray-400 font-black tracking-wider">RATING</span>
                  </div>
                  <div className="leading-tight">
                    <div className="text-[12px] font-black text-gray-800">Paham Hukum</div>
                    <div className="text-[10px] text-gray-500 font-bold mt-1">100% Solutif</div>
                  </div>
                </div>

                {/* "02 Hubungi Ahli" Card */}
                <div className="absolute -bottom-[124px] left-[0%] w-[62%] bg-white/95 backdrop-blur-sm rounded-[24px] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.12)] z-40 border border-white">
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-3.5">
                    <div className="w-9 h-9 rounded-[10px] bg-[#B91C1C] flex items-center justify-center text-white font-black text-[13px] shadow-lg shadow-red-500/30">
                      02
                    </div>
                    <div>
                      <div className="text-[14px] font-black text-[#111827] leading-tight">Hubungi Ahli</div>
                      <div className="text-[10px] text-[#6B7280] font-semibold mt-0.5">Konsultasi hukum & bisnis gratis</div>
                    </div>
                  </div>

                  {/* 2x2 Options Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* WhatsApp */}
                    <div className="border-[1.5px] border-green-500 bg-green-50/50 rounded-xl p-2.5 flex items-center gap-2 text-left shadow-sm">
                      <div className="w-7 h-7 rounded-[8px] bg-green-500 flex items-center justify-center flex-shrink-0 shadow-md">
                        <MessageCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black text-gray-800 leading-tight truncate">WhatsApp</div>
                        <div className="text-[8px] font-extrabold text-green-600 mt-0.5 leading-none">Online 24/7</div>
                      </div>
                    </div>

                    {/* Zoom Call */}
                    <div className="shadow-sm border border-gray-100 bg-white rounded-xl p-2.5 flex items-center gap-2 text-left">
                      <div className="w-7 h-7 rounded-[8px] bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-gray-700 leading-tight truncate">Zoom Call</div>
                        <div className="text-[8px] font-semibold text-gray-400 mt-0.5 leading-none">Jadwalkan</div>
                      </div>
                    </div>

                    {/* Telepon */}
                    <div className="shadow-sm border border-gray-100 bg-white rounded-xl p-2.5 flex items-center gap-2 text-left">
                      <div className="w-7 h-7 rounded-[8px] bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Phone className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-gray-700 leading-tight truncate">Telepon</div>
                        <div className="text-[8px] font-semibold text-gray-400 mt-0.5 leading-none">Tanya Ahli</div>
                      </div>
                    </div>

                    {/* Kantor Kami */}
                    <div className="shadow-sm border border-gray-100 bg-white rounded-xl p-2.5 flex items-center gap-2 text-left">
                      <div className="w-7 h-7 rounded-[8px] bg-purple-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <MapPin className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-gray-700 leading-tight truncate">Kantor Kami</div>
                        <div className="text-[8px] font-semibold text-gray-400 mt-0.5 leading-none">Kunjungan</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 Visual Container */}
            {activeStep === 2 && (
              <div key="step-2" className="absolute inset-0 w-full h-full animate-step-in">
                
                {/* Main Photo */}
                <div className="absolute top-8 left-[12%] w-[76%] h-[80%] rounded-[2rem] overflow-hidden drop-shadow-xl transition-all duration-500 bg-slate-50">
                  <Image
                    src="/images/home/promo-bule3.png"
                    alt="Kirim Dokumen Online"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>

                {/* "Draft Akta Selesai!" — left side */}
                <div className="absolute top-[20%] -left-[2%] bg-white rounded-2xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-black/[0.04] flex items-center gap-3 z-40 animate-float-slow">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100">
                    <FileText className="w-5 h-5 text-[#B91C1C]" />
                  </div>
                  <div className="leading-tight pr-2">
                    <div className="text-[12px] font-black text-gray-800">Draft Akta Selesai!</div>
                    <div className="text-[10px] font-bold text-gray-500 mt-1">Siap Ditinjau</div>
                  </div>
                </div>

                {/* "Secure Vault SSL" — right side, top */}
                <div className="absolute top-[35%] right-[0%] bg-white rounded-full px-4 py-2.5 shadow-[0_12px_25px_rgba(0,0,0,0.1)] border border-black/[0.03] flex items-center gap-2.5 z-40 animate-bounce-slow">
                  <Lock className="w-4 h-4 text-[#B91C1C]" />
                  <span className="text-[12px] font-black text-gray-800">Secure Vault SSL</span>
                </div>

                {/* "92% Verifikasi Berkas" — right side, middle */}
                <div className="absolute top-[55%] -right-[5%] bg-white rounded-2xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-black/[0.04] flex items-center gap-3 z-30 w-[190px] animate-float-medium">
                  <div className="w-10 h-10 rounded-full border-2 border-[#B91C1C] flex items-center justify-center text-[12px] font-black text-[#B91C1C] flex-shrink-0 bg-red-50/50">
                    92%
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-[11px] font-black text-gray-800 truncate">Verifikasi Berkas</div>
                    <div className="text-[9px] font-bold text-gray-500 mt-1 truncate">Oleh Tim Ahli Legal</div>
                  </div>
                </div>

                {/* "03 Upload Dokumen" Card — bottom */}
                <div className="absolute -bottom-[124px] left-[0%] w-[62%] bg-white/95 backdrop-blur-sm rounded-[24px] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.12)] z-40 border border-white">
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-3.5">
                    <div className="w-9 h-9 rounded-[10px] bg-[#B91C1C] flex items-center justify-center text-white font-black text-[13px] shadow-lg shadow-red-500/30">
                      03
                    </div>
                    <div>
                      <div className="text-[14px] font-black text-[#111827] leading-tight">Upload Dokumen</div>
                      <div className="text-[10px] text-[#6B7280] font-semibold mt-0.5">Kirim berkas dengan mudah & aman</div>
                    </div>
                  </div>

                  {/* 2x2 Options Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* KTP & NPWP */}
                    <div className="border-[1.5px] border-[#B91C1C] bg-[#FEF2F2] rounded-xl p-2.5 flex items-center gap-2 text-left shadow-sm">
                      <div className="w-7 h-7 rounded-[8px] bg-[#B91C1C] flex items-center justify-center flex-shrink-0 shadow-md">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black text-[#B91C1C] leading-tight truncate">KTP & NPWP</div>
                        <div className="text-[8px] font-extrabold text-[#B91C1C]/80 mt-0.5 leading-none">Verified</div>
                      </div>
                    </div>

                    {/* KK & Akta */}
                    <div className="shadow-sm border border-gray-100 bg-[#FFF7ED] rounded-xl p-2.5 flex items-center gap-2 text-left">
                      <div className="w-7 h-7 rounded-[8px] bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-gray-800 leading-tight truncate">KK & Akta</div>
                        <div className="text-[8px] font-bold text-orange-600 mt-0.5 leading-none">Verified</div>
                      </div>
                    </div>

                    {/* Nama PT */}
                    <div className="shadow-sm border border-gray-100 bg-[#F0FDF4] rounded-xl p-2.5 flex items-center gap-2 text-left">
                      <div className="w-7 h-7 rounded-[8px] bg-green-500 flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-gray-800 leading-tight truncate">Nama PT</div>
                        <div className="text-[8px] font-bold text-green-600 mt-0.5 leading-none">Verified</div>
                      </div>
                    </div>

                    {/* Modal Usaha */}
                    <div className="shadow-sm border border-gray-100 bg-white rounded-xl p-2.5 flex items-center gap-2 text-left">
                      <div className="w-7 h-7 rounded-[8px] bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-gray-800 leading-tight truncate">Modal Usaha</div>
                        <div className="text-[8px] font-bold text-blue-500 mt-0.5 leading-none">Ready</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 Visual Container */}
            {/* Step 4 Visual Container */}
            {activeStep === 3 && (
              <div key="step-3" className="absolute inset-0 w-full h-full animate-step-in">
                
                {/* Main Photo */}
                <div className="absolute top-8 left-[12%] w-[76%] h-[80%] rounded-[2rem] overflow-hidden drop-shadow-xl transition-all duration-500 bg-slate-50">
                  <Image
                    src="/images/home/promo-bule4.png"
                    alt="Terima Hasil Digital"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>

                {/* "Draft Akta Selesai!" — left side top */}
                <div className="absolute top-[15%] -left-[2%] bg-white rounded-2xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-black/[0.04] flex items-center gap-3 z-40 animate-float-slow">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100">
                    <FileText className="w-5 h-5 text-[#B91C1C]" />
                  </div>
                  <div className="leading-tight pr-2">
                    <div className="text-[12px] font-black text-gray-800">Draft Akta Selesai!</div>
                    <div className="text-[10px] font-bold text-gray-500 mt-1">Siap Ditinjau</div>
                  </div>
                </div>

                {/* "New Message" Notification — left side below */}
                <div className="absolute top-[32%] -left-[5%] bg-white/95 backdrop-blur-sm rounded-[16px] p-3 shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-gray-100 flex items-start gap-3 z-40 w-[240px] animate-float-medium">
                   <div className="w-9 h-9 rounded-full bg-[#B91C1C] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">EL</div>
                   <div className="leading-tight min-w-0 pt-0.5 w-full">
                     <div className="flex justify-between items-center mb-1">
                       <span className="text-[12px] font-black text-gray-800">EasyLegal</span>
                       <span className="text-[9px] font-bold text-gray-400">10:24 AM</span>
                     </div>
                     <p className="text-[10px] text-gray-600 leading-snug">Your document has been completed...</p>
                   </div>
                </div>

                {/* "Hardcopy Terkirim" — right side, top */}
                <div className="absolute top-[25%] right-[2%] bg-white rounded-full px-4 py-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-black/[0.03] flex items-center gap-2.5 z-40 animate-bounce-slow">
                  <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                    <Truck className="w-3.5 h-3.5 text-[#B91C1C]" />
                  </div>
                  <span className="text-[12px] font-black text-gray-800">Hardcopy Terkirim</span>
                </div>

                {/* "100% Selesai & Legal" — right side, middle */}
                <div className="absolute top-[50%] -right-2 bg-white rounded-2xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-black/[0.03] flex items-center gap-3 z-40 w-[200px] animate-float-medium">
                  <div className="w-10 h-10 rounded-full border-[2px] border-[#B91C1C] flex items-center justify-center text-[11px] font-black text-[#B91C1C] flex-shrink-0 bg-red-50 shadow-sm">
                    100%
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-[12px] font-black text-gray-800 truncate">Selesai & Legal</div>
                    <div className="text-[10px] font-bold text-gray-500 mt-1 truncate">Bisnis Siap Jalan!</div>
                  </div>
                </div>

                {/* "04 Terima Hasil" Card — bottom */}
                <div className="absolute -bottom-[124px] left-[0%] w-[62%] bg-white/95 backdrop-blur-sm rounded-[24px] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.12)] z-40 border border-white">
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-3.5">
                    <div className="w-9 h-9 rounded-[10px] bg-[#B91C1C] flex items-center justify-center text-white font-black text-[13px] shadow-lg shadow-red-500/30">
                      04
                    </div>
                    <div>
                      <div className="text-[14px] font-black text-[#111827] leading-tight">Terima Hasil</div>
                      <div className="text-[10px] text-[#6B7280] font-semibold mt-0.5">Unduh berkas legalitas resmi Anda</div>
                    </div>
                  </div>

                  {/* 2x2 Options Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Akta PT */}
                    <div className="border-[1.5px] border-[#B91C1C] bg-[#FEF2F2] rounded-xl p-2.5 flex items-center gap-2 text-left shadow-sm">
                      <div className="w-7 h-7 rounded-[8px] bg-[#B91C1C] flex items-center justify-center flex-shrink-0 shadow-md">
                        <Download className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black text-[#B91C1C] leading-tight truncate">Akta PT</div>
                        <div className="text-[8px] font-extrabold text-[#B91C1C]/80 mt-0.5 leading-none">Unduh PDF</div>
                      </div>
                    </div>

                    {/* KK & Akta */}
                    <div className="shadow-sm border border-gray-100 bg-[#FFF7ED] rounded-xl p-2.5 flex items-center gap-2 text-left">
                      <div className="w-7 h-7 rounded-[8px] bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                        <Download className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-gray-800 leading-tight truncate">KK & Akta</div>
                        <div className="text-[8px] font-bold text-orange-600 mt-0.5 leading-none">Unduh PDF</div>
                      </div>
                    </div>

                    {/* NIB & OSS */}
                    <div className="shadow-sm border border-gray-100 bg-[#FFF7ED] rounded-xl p-2.5 flex items-center gap-2 text-left">
                      <div className="w-7 h-7 rounded-[8px] bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                        <Download className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-gray-800 leading-tight truncate">NIB & OSS</div>
                        <div className="text-[8px] font-bold text-orange-600 mt-0.5 leading-none">Unduh PDF</div>
                      </div>
                    </div>

                    {/* Modal Usaha */}
                    <div className="shadow-sm border border-gray-100 bg-[#FFF7ED] rounded-xl p-2.5 flex items-center gap-2 text-left">
                      <div className="w-7 h-7 rounded-[8px] bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                        <Download className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-gray-800 leading-tight truncate">Modal Usaha</div>
                        <div className="text-[8px] font-bold text-orange-600 mt-0.5 leading-none">Unduh PDF</div>
                      </div>
                    </div>
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

export default function HomePage({ articles }: { articles: ArticleItem[] }) {
  const whyChooseRef = useRef<HTMLElement>(null);
  const quickToolsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLElement>(null);
  const whyChooseHeaderRef = useRef<HTMLDivElement>(null);
  const videoProfilHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Quick Tools Observer
    const quickToolsEl = quickToolsRef.current;
    let quickToolsObs: IntersectionObserver | null = null;
    if (quickToolsEl) {
      quickToolsObs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          quickToolsEl.classList.add("revealed");
          quickToolsObs?.unobserve(quickToolsEl);
        }
      }, { rootMargin: "0px 0px -30% 0px" });
      quickToolsObs.observe(quickToolsEl);
    }

    // Partners Observer
    const partnersEl = partnersRef.current;
    let partnersObs: IntersectionObserver | null = null;
    if (partnersEl) {
      partnersObs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          partnersEl.classList.add("revealed");
          partnersObs?.unobserve(partnersEl);
        }
      });
      partnersObs.observe(partnersEl);
    }

    // Why Choose Section Observer (Bento revealed)
    const whyChooseEl = whyChooseRef.current;
    let whyChooseObs: IntersectionObserver | null = null;
    if (whyChooseEl) {
      whyChooseObs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          whyChooseEl.classList.add("bento-revealed");
          whyChooseObs?.unobserve(whyChooseEl);
        }
      }, { rootMargin: "0px 0px -15% 0px" });
      whyChooseObs.observe(whyChooseEl);
    }

    // Why Choose Header Observer
    const whyChooseHeaderEl = whyChooseHeaderRef.current;
    let whyChooseHeaderObs: IntersectionObserver | null = null;
    if (whyChooseHeaderEl) {
      whyChooseHeaderObs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          whyChooseHeaderEl.classList.add("revealed");
          whyChooseHeaderObs?.unobserve(whyChooseHeaderEl);
        }
      }, { rootMargin: "0px 0px -50px 0px" });
      whyChooseHeaderObs.observe(whyChooseHeaderEl);
    }

    // Video Profil Header Observer
    const videoProfilHeaderEl = videoProfilHeaderRef.current;
    let videoProfilHeaderObs: IntersectionObserver | null = null;
    if (videoProfilHeaderEl) {
      videoProfilHeaderObs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          videoProfilHeaderEl.classList.add("revealed");
          videoProfilHeaderObs?.unobserve(videoProfilHeaderEl);
        }
      }, { rootMargin: "-50px" });
      videoProfilHeaderObs.observe(videoProfilHeaderEl);
    }

    return () => {
      quickToolsObs?.disconnect();
      partnersObs?.disconnect();
      whyChooseObs?.disconnect();
      whyChooseHeaderObs?.disconnect();
      videoProfilHeaderObs?.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <Hero
        gsapClasses={{
          tag: "hero-animate-tag",
          heading: "hero-animate-heading",
          desc: "hero-animate-desc",
          cta: "hero-animate-cta",
          badges: "hero-animate-badges",
          float: "hero-animate-float",
        }}
      />

      {/* ═══════════════════════════════════════════
          QUICK TOOLS — floating strip overlapping hero
          ═══════════════════════════════════════════ */}
      <div
        className="relative z-20 -mt-6 sm:-mt-10 animate-scroll-reveal"
        ref={quickToolsRef}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-white md:border md:border-[#EAEAEA] rounded-none md:rounded-[24px] md:shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-0">
              {quickTools.map((tool, idx) => {
                const Icon = tool.icon;
                return (
                  <div 
                    key={idx} 
                    className="group flex items-start gap-3 sm:gap-5 p-4 sm:p-8 transition-colors duration-300 hover:bg-neutral-50/40 border border-[#eee] md:border-0 rounded-2xl md:rounded-none md:border-r md:last:border-r-0 border-[#F0F0F0] bg-white shadow-sm md:shadow-none"
                  >
                    {/* Rounded Icon Box */}
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-[14px] bg-[#FFF5F5] text-[#8B1E1E] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 active:scale-95 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <Icon className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" strokeWidth={2} />
                    </div>
                    {/* Content Block */}
                    <div className="flex flex-col flex-grow min-w-0">
                      <span className="text-[9px] sm:text-[10px] font-black text-[#9B1C1C] tracking-[0.1em] mb-1 sm:mb-1.5 uppercase block">
                        {tool.tag}
                      </span>
                      <h3 className="text-xs sm:text-[15.5px] font-bold text-[#1A1A1A] group-hover:text-[#D62828] transition-colors leading-tight">
                        {tool.title}
                      </h3>
                      <p className="text-[11px] sm:text-[13px] text-[#666666] leading-relaxed mt-1 sm:mt-2">
                        {tool.desc}
                      </p>
                      <div className="mt-2 sm:mt-4">
                        {tool.external ? (
                          <a
                            href={tool.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[11px] sm:text-[13px] font-bold text-[#9B1C1C] hover:text-[#8B0000] active:scale-[0.98] space-x-1 group/link"
                          >
                            <span>{tool.cta}</span>
                            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover/link:translate-x-0.5" strokeWidth={2.5} />
                          </a>
                        ) : (
                          <Link
                            href={tool.href}
                            className="inline-flex items-center text-[11px] sm:text-[13px] font-bold text-[#9B1C1C] hover:text-[#8B0000] active:scale-[0.98] space-x-1 group/link"
                          >
                            <span>{tool.cta}</span>
                            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover/link:translate-x-0.5" strokeWidth={2.5} />
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
      <section
        className="bg-white py-8 sm:py-12 border-b border-[#F0F0F0] overflow-hidden"
        ref={partnersRef}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 mb-6 sm:mb-10 text-center">
          <span className="text-[10px] sm:text-[12px] font-bold text-dark/40 uppercase tracking-[0.15em]">
            DIPERCAYA OLEH RIBUAN PELAKU BISNIS :
          </span>
        </div>
        
        {/* Marquee Container */}
        <div className="relative w-full flex overflow-hidden group">
          {/* Duplicate the logo array 2 times to ensure smooth infinite scroll */}
          {[1, 2].map((groupIndex) => (
            <div 
              key={groupIndex} 
              className="flex items-center justify-around flex-shrink-0 animate-marquee-left min-w-full space-x-8 sm:space-x-16 px-4 sm:px-8"
            >
              {[
                "akiha.png", "arava-tour.png", "artave.png", "beeskin.png", 
                "bss.png", "callme.png", "daingsuper.png", "dewa-rackindo.png", 
                "gmk-door.png", "guri-senbei.png", "happyeats.png", "javarudraksha.png", 
                "kafeel.netz.png", "kms.png", "moonbow.png", "oseal.png", 
                "pabriek-kuweh.png", "power-computerindo.png", "satoshi.png", 
                "sumber-aneka-wangi.png", "tantri.png", "vidichi.png"
              ].map((logo, idx) => (
                <div key={`${groupIndex}-${idx}`} className="flex-shrink-0 w-24 sm:w-32 h-10 sm:h-12 relative transition-all duration-300 hover:scale-105 cursor-pointer">
                  <Image
                    src={`/images/logo-klien/${logo}`}
                    alt={`Client Logo ${idx + 1}`}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
              ))}
            </div>
          ))}
          {/* Gradient Overlays for smooth fade out at edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LAYANAN KAMI
          ═══════════════════════════════════════════ */}
      <LayananKami />

      {/* ═══════════════════════════════════════════
          CARA KERJA
          ═══════════════════════════════════════════ */}
      <CaraKerjaSection />

      {/* ═══════════════════════════════════════════
          WHY CHOOSE EL PARTNERS
          ═══════════════════════════════════════════ */}
      <section
        className="py-8 sm:py-24 bg-white"
        ref={whyChooseRef}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="mb-6 sm:mb-16 animate-scroll-reveal" ref={whyChooseHeaderRef}>
            <span className="text-[9px] sm:text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em] mb-1.5 sm:mb-3 inline-block">
              KENAPA EASYLEGAL
            </span>
            <h2 className="text-[20px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] leading-[1.25] sm:leading-[1.15] tracking-[-0.02em] max-w-2xl">
              Fondasi kokoh untuk legalitas bisnis Anda.
            </h2>
            <p className="mt-2 sm:mt-4 text-[11.5px] sm:text-lg text-gray-500 max-w-3xl">
              Bukan sekadar urus dokumen — kami partner legal yang menyederhanakan proses, transparan dalam biaya, dan responsif kapan saja.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            
            {/* Row 1, Col 1: Proses cepat & terlacak */}
            <div className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-8 shadow-sm border border-black/[0.02] shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 group flex flex-col justify-between min-h-[170px] sm:min-h-[220px]">
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm border border-black/[0.02] shadow-sm mb-3 sm:mb-6 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-lg font-bold text-gray-900 leading-tight mb-1 sm:mb-2">Proses cepat & terlacak</h3>
                <p className="text-gray-400 sm:text-gray-500 text-[10px] sm:text-sm leading-relaxed">SLA 7–14 hari kerja dengan progress yang dipantau real-time.</p>
              </div>
            </div>

            {/* Row 1, Col 2: Konsultan hukum berpengalaman */}
            <div className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-8 shadow-sm border border-black/[0.02] shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 group flex flex-col justify-between min-h-[170px] sm:min-h-[220px]">
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm border border-black/[0.02] shadow-sm mb-3 sm:mb-6 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-lg font-bold text-gray-900 leading-tight mb-1 sm:mb-2">Konsultan hukum berpengalaman</h3>
                <p className="text-gray-400 sm:text-gray-500 text-[10px] sm:text-sm leading-relaxed">Ditangani lawyer yang sudah menangani ribuan kasus UMKM.</p>
              </div>
            </div>

            {/* Row 1, Col 3: Resmi terdaftar PSE Kominfo */}
            <div className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-8 shadow-sm border border-black/[0.02] shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 group flex flex-col justify-between min-h-[170px] sm:min-h-[220px]">
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm border border-black/[0.02] shadow-sm mb-3 sm:mb-6 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-lg font-bold text-gray-900 leading-tight mb-1 sm:mb-2">Resmi terdaftar PSE Kominfo</h3>
                <p className="text-gray-400 sm:text-gray-500 text-[10px] sm:text-sm leading-relaxed">Data Anda aman & terlindungi sesuai regulasi.</p>
              </div>
            </div>

            {/* Row 1, Col 4: Harga transparan, tanpa kejutan */}
            <div className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-8 shadow-sm border border-black/[0.02] shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 group flex flex-col justify-between min-h-[170px] sm:min-h-[220px]">
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm border border-black/[0.02] shadow-sm mb-3 sm:mb-6 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-lg font-bold text-gray-900 leading-tight mb-1 sm:mb-2">Harga transparan, tanpa kejutan</h3>
                <p className="text-gray-400 sm:text-gray-500 text-[10px] sm:text-sm leading-relaxed">Semua biaya tertera di awal. Tidak ada add-on mendadak.</p>
              </div>
            </div>

            {/* Row 2, Col 1-2: Pendirian PT (dashed border card) */}
            <div className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-8 border border-dashed border-[#e0b0b0] sm:border-gray-300 shadow-[0_4px_20px_rgba(0,0,0,0.015)] group flex flex-col justify-center min-h-[120px] sm:min-h-[220px] text-left sm:text-center">
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pendirian PT</span>
              <div className="text-lg sm:text-2xl font-black text-[#B91C1C] sm:text-gray-900">Rp 2.500.000</div>
              <div className="mt-2 sm:mt-4 space-y-1 text-left sm:inline-block">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-600">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#10B981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Jasa kami</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-600">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#10B981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Biaya AHU</span>
                </div>
              </div>
            </div>

            {/* Row 2, Col 3: 100% online & paperless */}
            <div className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-8 shadow-sm border border-black/[0.02] shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 group flex flex-col justify-between min-h-[170px] sm:min-h-[220px]">
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm border border-black/[0.02] shadow-sm mb-3 sm:mb-6 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-lg font-bold text-gray-900 leading-tight mb-1 sm:mb-2">100% online & paperless</h3>
                <p className="text-gray-400 sm:text-gray-500 text-[10px] sm:text-sm leading-relaxed">Upload aman dari mana saja, tanpa harus ke kantor.</p>
              </div>
            </div>

            {/* Row 2, Col 4 (Span vertical / Full on mobile): Tracking real-time mockup card */}
            <div className="bg-[#FAF9F6]/30 rounded-2xl lg:rounded-3xl p-4 sm:p-8 shadow-sm border border-black/[0.02] shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 group col-span-2 lg:row-span-2 flex flex-col justify-between">
              <div>
                {/* Mockup Header on Mobile */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm border border-black/[0.02] shadow-sm flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012-2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-lg font-bold text-gray-900 leading-tight">Tracking real-time</h3>
                    <p className="text-[10px] sm:text-sm text-gray-400 sm:text-gray-500 leading-none mt-0.5">Pantau setiap tahap pengurusan dari dashboard.</p>
                  </div>
                </div>

                {/* Mockup Tracking */}
                <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-8">
                  {/* Step 1 */}
                  <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-sm border border-black/[0.02] flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#10B981] flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-gray-800">Konsultasi</span>
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Done</span>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-sm border border-black/[0.02] flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#10B981] flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-gray-800">Cek Nama PT</span>
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Done</span>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-red-100 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#B91C1C] flex items-center justify-center text-white text-[10px] sm:text-[11px] font-bold">
                        3
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-gray-800 font-bold">Akta Notaris</span>
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-bold text-[#B91C1C] bg-[#B91C1C]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Jalan</span>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-sm border border-black/[0.02] flex items-center justify-between opacity-50">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-[10px] sm:text-[11px] font-bold">
                        4
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-gray-400">Pengesahan AHU</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3, Col 1 (Full on mobile): CS responsif 24/7 */}
            <div className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-8 shadow-sm border border-black/[0.02] shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 group col-span-2 lg:col-span-2 flex flex-col justify-center items-center text-center min-h-[120px] sm:min-h-[200px]">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm border border-black/[0.02] shadow-sm mb-3 sm:mb-6 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-lg font-bold text-gray-900 leading-tight mb-1">CS responsif 24/7</h3>
                <p className="text-gray-400 sm:text-gray-500 text-[10px] sm:text-sm leading-relaxed">WhatsApp dijawab rata-rata &lt; 5 menit.</p>
              </div>
            </div>

            {/* Row 3, Col 2-4: Stats block */}
            <div className="bg-[#f9f9f9] sm:bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-8 border border-transparent sm:border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.015)] group col-span-2 lg:col-span-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
              <div className="max-w-md">
                <h3 className="text-xs sm:text-lg font-bold text-gray-900 leading-snug mb-1">Dipercaya pengusaha Indonesia di berbagai industri</h3>
                <p className="text-gray-400 sm:text-gray-500 text-[10px] sm:text-sm">Dari UMKM kuliner sampai startup teknologi.</p>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full lg:w-auto">
                <div className="bg-white sm:bg-gray-50 rounded-xl p-3 sm:p-3 text-center shadow-sm border border-black/[0.02]">
                  <div className="text-base sm:text-3xl font-black text-[#B91C1C] leading-none">11.000+</div>
                  <div className="text-[9px] sm:text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">Bisnis terlayani</div>
                </div>
                <div className="bg-white sm:bg-gray-50 rounded-xl p-3 sm:p-3 text-center shadow-sm border border-black/[0.02]">
                  <div className="text-base sm:text-3xl font-black text-[#B91C1C] leading-none flex items-center justify-center gap-0.5">
                    4.9<span className="text-[#B91C1C] text-xs sm:text-2xl">★</span>
                  </div>
                  <div className="text-[9px] sm:text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">Rating Google</div>
                </div>
                <div className="bg-white sm:bg-gray-50 rounded-xl p-3 sm:p-3 text-center shadow-sm border border-black/[0.02]">
                  <div className="text-base sm:text-3xl font-black text-[#B91C1C] leading-none">5 thn</div>
                  <div className="text-[9px] sm:text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">Pengalaman</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VIDEO PROFILE
          ═══════════════════════════════════════════ */}
      <section className="py-8 sm:py-24 bg-gray-50/70">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
          <div 
            className="text-left sm:text-center mb-6 sm:mb-16 animate-scroll-reveal"
            ref={videoProfilHeaderRef}
          >
            <span className="text-[9px] sm:text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em] mb-1.5 sm:mb-3 inline-block">
              Video Profil
            </span>
            <h2 className="text-[20px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] leading-[1.25] sm:leading-[1.12] tracking-[-0.02em]">
              Lihat Bagaimana EasyLegal<br className="hidden sm:inline" /> Membantu Anda.
            </h2>
          </div>
          <VideoEmbedSection />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════ */}
      <Testimonials />

      {/* ═══════════════════════════════════════════
          INFORMASI HUKUM TERBARU
          ═══════════════════════════════════════════ */}
      <InformasiHukumSection articles={articles} />

      {/* ═══════════════════════════════════════════
          PROMO & MARKETPLACE
          ═══════════════════════════════════════════ */}
      <BottomPromoSection />

      {/* ═══════════════════════════════════════════
          LIPUTAN MEDIA
          ═══════════════════════════════════════════ */}
      <MediaCoverage />

    </div>
  );
}
