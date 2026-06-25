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
      <div className="group relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] transition-all duration-500">
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
                src="https://img.youtube.com/vi/PHyO3XoAGEU/maxresdefault.jpg"
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
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* LEFT: Step-by-Step Accordion Flow */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em] mb-3">
              Cara Kerja
            </span>
            <h2 className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] leading-[1.12] tracking-[-0.02em]">
              Empat Langkah, Semua Beres<br />Tanpa Pusing.
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
                {/* Orange backdrop offset rectangle */}
                <div className="absolute top-6 left-[22%] w-[60%] h-[78%] rounded-[2.5rem] bg-gradient-to-br from-[#F2994A] to-[#F2C94C] shadow-lg opacity-95 transition-all duration-500" />
                
                {/* Main Photo of Smiling Professional Woman */}
                <div className="absolute top-10 left-[24%] w-[58%] h-[78%] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-50 transition-all duration-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=crop&w=600&h=800&q=80"
                    alt="Professional woman smiling" 
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-top hover:scale-102 transition-transform duration-700"
                  />
                </div>

                {/* Soft Green wedge at bottom-left corner */}
                <div className="absolute -bottom-2 left-[18%] w-24 h-24 bg-[#D1E7DD] rounded-tr-[5.5rem] rounded-bl-[1.5rem] z-20 shadow-sm border border-[#C1D7CD]/30" />

                {/* Small document signing photo (top-right overlay) */}
                <div className="absolute top-0 right-4 w-[28%] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white bg-slate-50 z-30 transition-all duration-500 hover:rotate-1">
                  <Image 
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?fit=crop&w=300&h=800&q=80"
                    alt="Signing document" 
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
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
                    <div className="border border-[#B91C1C] bg-[#FEF2F2] rounded-xl p-2 flex items-center gap-1.5 text-left transition-all duration-300 active:scale-95">
                      <div className="w-7 h-7 rounded-lg bg-[#B91C1C] flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Building2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-black text-[#B91C1C] leading-tight truncate">Pendirian PT</div>
                        <div className="text-[8px] font-bold text-[#B91C1C] mt-0.5 leading-none">Mulai Rp2,5jt</div>
                      </div>
                    </div>

                    {/* Option Box: NIB & OSS */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left transition-all duration-300 active:scale-95">
                      <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">NIB & OSS</div>
                        <div className="text-[8px] font-medium text-gray-500 mt-0.5 leading-none">Mulai Rp500rb</div>
                      </div>
                    </div>

                    {/* Option Box: Daftar Merek */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left transition-all duration-300 active:scale-95">
                      <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">Daftar Merek</div>
                        <div className="text-[8px] font-medium text-gray-500 mt-0.5 leading-none">Mulai Rp1,5jt</div>
                      </div>
                    </div>

                    {/* Option Box: ISO 9001 */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left transition-all duration-300 active:scale-95">
                      <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <Award className="w-3.5 h-3.5 text-gray-500" />
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
                    <span className="text-[8px] text-gray-500 font-bold ml-1.5">2 menit lalu</span>
                  </div>
                </div>

                {/* Floating "Google 4.9 Rating" Badge */}
                <div className="absolute top-[54%] -right-2 bg-white rounded-2xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-2 z-30 w-[170px] animate-float-medium">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-500 font-extrabold text-[12px] flex items-center gap-0.5">★ 4.9</span>
                    <span className="text-[8px] text-gray-500 font-black tracking-wider">GOOGLE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <Image className="inline-block h-5.5 w-5.5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User 1" width={22} height={22} />
                      <Image className="inline-block h-5.5 w-5.5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="User 2" width={22} height={22} />
                      <Image className="inline-block h-5.5 w-5.5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="User 3" width={22} height={22} />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[9.5px] font-black text-gray-800">11.000+</div>
                      <div className="text-[7.5px] font-bold text-gray-500">bisnis terbantu</div>
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
                    <div className="text-[8px] text-gray-500 font-bold mt-0.5 truncate">Tahap 3/4 · 2 hari lagi</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 Visual Container */}
            {activeStep === 1 && (
              <div key="step-1" className="absolute inset-0 w-full h-full animate-step-in">
                {/* Blue/Warm backdrop offset rectangle */}
                <div className="absolute top-6 left-[22%] w-[60%] h-[78%] rounded-[2.5rem] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] shadow-lg opacity-90 transition-all duration-500" />
                
                {/* Main Photo of Lawyer/Consultant */}
                <div className="absolute top-10 left-[24%] w-[58%] h-[78%] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-50 transition-all duration-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?fit=crop&w=600&h=800&q=80"
                    alt="Legal Consultant Online" 
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-top hover:scale-102 transition-transform duration-700"
                  />
                </div>

                {/* Soft Blue wedge at bottom-left corner */}
                <div className="absolute -bottom-2 left-[18%] w-24 h-24 bg-[#DBEAFE] rounded-tr-[5.5rem] rounded-bl-[1.5rem] z-20 shadow-sm border border-[#BFDBFE]/30" />

                {/* Small communication overlay photo (top-right overlay) */}
                <div className="absolute top-0 right-4 w-[28%] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white bg-slate-50 z-30 transition-all duration-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?fit=crop&w=300&h=800&q=80"
                    alt="Meeting schedule" 
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
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
                    <div className="border border-[#B91C1C] bg-[#FEF2F2] rounded-xl p-2 flex items-center gap-1.5 text-left active:scale-95">
                      <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <MessageCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-black text-gray-800 leading-tight truncate">WhatsApp</div>
                        <div className="text-[8px] font-bold text-green-600 mt-0.5 leading-none">Online 24/7</div>
                      </div>
                    </div>

                    {/* Option Box: Zoom Meeting */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left active:scale-95">
                      <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 text-white">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">Zoom Call</div>
                        <div className="text-[8px] font-medium text-gray-500 mt-0.5 leading-none">Jadwalkan</div>
                      </div>
                    </div>

                    {/* Option Box: Telepon */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left active:scale-95">
                      <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0 text-white">
                        <Phone className="w-3 h-3" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">Telepon</div>
                        <div className="text-[8px] font-medium text-gray-500 mt-0.5 leading-none">Tanya Ahli</div>
                      </div>
                    </div>

                    {/* Option Box: Kunjungan */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left active:scale-95">
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
                    <span className="text-[8px] font-black tracking-wider">RATING</span>
                  </div>
                  <div className="leading-tight">
                    <div className="text-[10px] font-black text-gray-800">Advokat Senior</div>
                    <div className="text-[7.5px] font-semibold text-gray-500 mt-0.5">100% Solutif & Terpercaya</div>
                  </div>
                </div>

                {/* Floating Jadwal Badge */}
                <div className="absolute bottom-2 right-[6%] bg-white rounded-2xl p-2.5 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2.5 z-30 w-[190px] animate-float-slow">
                  <div className="w-9 h-9 rounded-full border-2 border-emerald-500 flex items-center justify-center text-[10px] font-black text-emerald-600 flex-shrink-0 bg-emerald-50">
                    OK
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-[10px] font-black text-gray-800 truncate">Jadwal Terkonfirmasi</div>
                    <div className="text-[8px] font-bold text-gray-500 mt-0.5 truncate">Hari ini · 14:00 WIB</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 Visual Container */}
            {activeStep === 2 && (
              <div key="step-2" className="absolute inset-0 w-full h-full animate-step-in">
                {/* Purple backdrop offset rectangle */}
                <div className="absolute top-6 left-[22%] w-[60%] h-[78%] rounded-[2.5rem] bg-gradient-to-br from-[#0F172A] to-[#334155] shadow-lg opacity-90 transition-all duration-500" />
                
                {/* Main Photo of Secure Laptop Working */}
                <div className="absolute top-10 left-[24%] w-[58%] h-[78%] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-50 transition-all duration-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?fit=crop&w=600&h=800&q=80"
                    alt="Online Document Process" 
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-center hover:scale-102 transition-transform duration-700"
                  />
                </div>

                {/* Soft Orange wedge at bottom-left corner */}
                <div className="absolute -bottom-2 left-[18%] w-24 h-24 bg-[#FFEDD5] rounded-tr-[5.5rem] rounded-bl-[1.5rem] z-20 shadow-sm border border-[#FED7AA]/30" />

                {/* Small folder overlay photo (top-right overlay) */}
                <div className="absolute top-0 right-4 w-[28%] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white bg-slate-50 z-30 transition-all duration-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fit=crop&w=300&h=800&q=80"
                    alt="Corporate documentation folder" 
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
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
                    <div className="border border-[#B91C1C] bg-[#FEF2F2] rounded-xl p-2 flex items-center gap-1.5 text-left active:scale-95">
                      <div className="w-7 h-7 rounded-lg bg-[#B91C1C] flex items-center justify-center flex-shrink-0 text-white">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-black text-gray-800 leading-tight truncate">KTP & NPWP</div>
                        <div className="text-[8px] font-bold text-[#B91C1C] mt-0.5 leading-none">Verified</div>
                      </div>
                    </div>

                    {/* Option Box: KK & Akta Pendiri */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left active:scale-95">
                      <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 text-white">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">KK & Akta</div>
                        <div className="text-[8px] font-medium text-green-600 mt-0.5 leading-none">Verified</div>
                      </div>
                    </div>

                    {/* Option Box: Pengecekan Nama */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left active:scale-95">
                      <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 text-white">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">Nama PT</div>
                        <div className="text-[8px] font-medium text-green-600 mt-0.5 leading-none">Verified</div>
                      </div>
                    </div>

                    {/* Option Box: Modal & Domisili */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left active:scale-95">
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
                    <div className="text-[8px] text-gray-500 font-bold mt-0.5 truncate">Oleh Tim Ahli Legal</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 Visual Container */}
            {activeStep === 3 && (
              <div key="step-3" className="absolute inset-0 w-full h-full animate-step-in">
                {/* Green backdrop offset rectangle */}
                <div className="absolute top-6 left-[22%] w-[60%] h-[78%] rounded-[2.5rem] bg-gradient-to-br from-[#064E3B] to-[#10B981] shadow-lg opacity-90 transition-all duration-500" />
                
                {/* Main Photo of Happy Entrepreneurs */}
                <div className="absolute top-10 left-[24%] w-[58%] h-[78%] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-50 transition-all duration-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?fit=crop&w=600&h=800&q=80"
                    alt="Happy Entrepreneurs" 
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-top hover:scale-102 transition-transform duration-700"
                  />
                </div>

                {/* Soft Emerald wedge at bottom-left corner */}
                <div className="absolute -bottom-2 left-[18%] w-24 h-24 bg-[#D1FAE5] rounded-tr-[5.5rem] rounded-bl-[1.5rem] z-20 shadow-sm border border-[#A7F3D0]/30" />

                {/* Small badge overlay (top-right overlay) */}
                <div className="absolute top-0 right-4 w-[28%] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-lg border-2 border-white bg-slate-50 z-30 transition-all duration-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?fit=crop&w=300&h=800&q=80"
                    alt="Professional success" 
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
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
                    <div className="border border-[#B91C1C] bg-[#FEF2F2] rounded-xl p-2 flex items-center gap-1.5 text-left active:scale-95">
                      <div className="w-7 h-7 rounded-lg bg-[#B91C1C] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-black text-gray-800 leading-tight truncate">Akta PT</div>
                        <div className="text-[8px] font-bold text-[#B91C1C] mt-0.5 leading-none">Unduh PDF</div>
                      </div>
                    </div>

                    {/* Option Box: SK Kemenkumham */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left active:scale-95">
                      <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 text-white">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">SK Kemenkum</div>
                        <div className="text-[8px] font-medium text-green-600 mt-0.5 leading-none">Unduh PDF</div>
                      </div>
                    </div>

                    {/* Option Box: NIB & OSS */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left active:scale-95">
                      <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 text-white">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold text-gray-800 leading-tight truncate">NIB & OSS</div>
                        <div className="text-[8px] font-medium text-green-600 mt-0.5 leading-none">Unduh PDF</div>
                      </div>
                    </div>

                    {/* Option Box: NPWP Perusahaan */}
                    <div className="border border-gray-100 bg-[#F9FAFB] rounded-xl p-2 flex items-center gap-1.5 text-left active:scale-95">
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
                    <div className="text-[7.5px] font-semibold text-gray-500 mt-1">Terdaftar di Kemenkumham & DJKI</div>
                  </div>
                </div>

                {/* Floating Success Badge */}
                <div className="absolute bottom-2 right-[6%] bg-white rounded-2xl p-2.5 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-2.5 z-30 w-[190px] animate-float-slow">
                  <div className="w-9 h-9 rounded-full border-2 border-emerald-500 flex items-center justify-center text-[10px] font-black text-emerald-600 flex-shrink-0 bg-emerald-50">
                    100%
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className="text-[10px] font-black text-gray-800 truncate">Selesai & Legal</div>
                    <div className="text-[8px] font-bold text-gray-500 mt-0.5 truncate">Bisnis Siap Jalan!</div>
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
        className="relative z-20 -mt-10 animate-scroll-reveal"
        ref={quickToolsRef}
      >
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
                    <div className="w-12 h-12 rounded-[14px] bg-[#FFF5F5] text-[#8B1E1E] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 active:scale-95 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
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
                            className="inline-flex items-center text-[13px] font-bold text-[#9B1C1C] hover:text-[#8B0000] active:scale-[0.98] space-x-1 group/link"
                          >
                            <span>{tool.cta}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" strokeWidth={2.5} />
                          </a>
                        ) : (
                          <Link
                            href={tool.href}
                            className="inline-flex items-center text-[13px] font-bold text-[#9B1C1C] hover:text-[#8B0000] active:scale-[0.98] space-x-1 group/link"
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
      <section
        className="bg-white py-5 animate-scroll-reveal-fade"
        ref={partnersRef}
      >
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
      <LayananKami />

      {/* ═══════════════════════════════════════════
          CARA KERJA
          ═══════════════════════════════════════════ */}
      <CaraKerjaSection />

      {/* ═══════════════════════════════════════════
          WHY CHOOSE EL PARTNERS
          ═══════════════════════════════════════════ */}
      <section
        className="py-16 sm:py-24 bg-gradient-to-br from-[#FEFAF6] via-[#FAF3EC] to-[#FEFAF6]"
        ref={whyChooseRef}
      >
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div 
            className="text-center mb-12 sm:mb-16 animate-scroll-reveal"
            ref={whyChooseHeaderRef}
          >
            <span className="text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em] mb-3 inline-block">
              Mengapa EasyLegal?
            </span>
            <h2 className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] leading-[1.12] tracking-[-0.02em]">
              Solusi Legal Terpadu untuk<br />Bisnis Modern.
            </h2>
          </div>

          <div className="text-center mb-12 sm:mb-16 animate-scroll-reveal" ref={whyChooseHeaderRef}>
            <span className="text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em] mb-3 inline-block">
              Kenapa EasyLegal
            </span>
            <h2 className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] leading-[1.12] tracking-[-0.02em]">
              Fondasi kokoh untuk legalitas<br />bisnis Anda.
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Bukan sekadar urus dokumen — kami partner legal yang menyederhanakan proses, transparan dalam biaya, dan responsif kapan saja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* 1: Proses cepat & terlacak */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 pb-14 sm:pb-16 border border-gray-100/60 shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FEF2F2] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#FEE2E2]">
                  <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#D62828]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Proses cepat & terlacak</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">SLA 7–14 hari kerja dengan progress yang dipantau real-time.</p>
            </div>

            {/* 2: Konsultan hukum berpengalaman */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 pb-14 sm:pb-16 border border-gray-100/60 shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FFFBEB] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#FEF3C7]">
                  <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#D97706]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Konsultan hukum berpengalaman</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">Ditangani lawyer yang sudah menangani ribuan kasus UMKM.</p>
            </div>

            {/* 3: Resmi terdaftar PSE Kominfo */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 pb-14 sm:pb-16 border border-gray-100/60 shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#EEF2FF] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#E0E7FF]">
                  <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-[#4F46E5]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Resmi terdaftar PSE Kominfo</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">Data Anda aman & terlindungi sesuai regulasi.</p>
            </div>

            {/* 4: Harga transparan (Tall Card) */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 pb-14 sm:pb-16 border border-gray-100/60 shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group lg:row-span-2 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#ECFDF5] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#D1FAE5]">
                  <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-[#10B981]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Harga transparan, tanpa kejutan</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-6">Semua biaya tertera di awal — termasuk jasa kami dan biaya pemerintah. Tidak ada add-on mendadak di tengah proses.</p>
              
              <div className="mt-auto">
                 <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-100 relative overflow-hidden group-hover:border-green-100 transition-colors">
                    <div className="text-sm text-gray-500 font-medium mb-1">Pendirian PT</div>
                    <div className="text-2xl sm:text-3xl font-black text-gray-900">Rp 2.5jt</div>
                    <div className="text-[11px] text-gray-400 mt-2">Jasa kami + Biaya AHU</div>
                 </div>
              </div>
            </div>

            {/* 5: Web interface (Wide) */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 pb-14 sm:pb-16 border border-gray-100/60 shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group lg:col-span-2">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#F0F9FF] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#E0F2FE]">
                   <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#0EA5E9]" />
                 </div>
                 <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-2">100% online & paperless</h3>
                    <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed max-w-xl">Upload aman dari mana saja, tanpa harus ke kantor. WhatsApp dijawab rata-rata &lt; 5 menit.</p>
                 </div>
              </div>
              
              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                 {[
                   { label: "Bisnis Terlayani", val: "8.000+" },
                   { label: "Rating Google", val: "4.9 ★" },
                   { label: "Pengalaman", val: "5 thn" }
                 ].map((stat, i) => (
                    <div key={i} className="text-center p-2.5 sm:p-3 rounded-xl bg-gray-50 border border-gray-100">
                       <span className="block text-base sm:text-lg font-bold text-gray-900">{stat.val}</span>
                       <span className="block text-[10px] sm:text-[11px] text-gray-500 font-medium uppercase tracking-wider mt-0.5 sm:mt-1">{stat.label}</span>
                    </div>
                 ))}
              </div>
            </div>

            {/* 6: Secure & Confidential */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 pb-14 sm:pb-16 border border-gray-100/60 shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FDF2F8] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#FCE7F3]">
                  <Award className="w-6 h-6 sm:w-7 sm:h-7 text-[#EC4899]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Tracking real-time</h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">Pantau setiap tahap pengurusan dari dashboard kami yang simpel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VIDEO PROFILE
          ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-gray-50/70">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8">
          <div 
            className="text-center mb-12 sm:mb-16 animate-scroll-reveal"
            ref={videoProfilHeaderRef}
          >
            <span className="text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em] mb-3 inline-block">
              Video Profil
            </span>
            <h2 className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] leading-[1.12] tracking-[-0.02em]">
              Lihat Bagaimana EasyLegal<br />Membantu Anda.
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

    </div>
  );
}
