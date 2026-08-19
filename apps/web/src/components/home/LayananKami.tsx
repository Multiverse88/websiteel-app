"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2, Check, Users, FileCheck, ShieldCheck, Files, Scale, Globe, Award } from "lucide-react";
import { layananIndividual } from "./data";

export default function LayananKami() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add("layanan-revealed");
        obs.unobserve(el);
      }
    }, { rootMargin: "0px 0px -15% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section 
      className="py-12 sm:py-24 bg-[#FAF9F6] relative" 
      id="layanan"
      ref={sectionRef}
    >
      <div className="ambient-gradient" />
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="mb-5 sm:mb-10">
          <span className="text-[16px] sm:text-[16px] font-bold text-primary uppercase tracking-[0.15em]">
            Solusi EasyLegal
          </span>
          <h2 className="text-[16px] sm:text-[40px] font-extrabold text-dark mt-1 sm:mt-2 tracking-tight leading-[1.25] sm:leading-[1.1]">
            Temukan layanan legal yang<br className="hidden sm:inline" /> paling tepat untuk bisnis Anda.
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 sm:gap-5">
          {/* LEFT: Layanan Individual Grid */}
          <div className="flex flex-col gap-4 sm:gap-5">
            
            {/* Header Card */}
            <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-black/5 bg-[#FBF9F6]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-[4px] border-2 border-primary"></div>
              </div>
              <div>
                <h3 className="text-[15px] sm:text-[17px] font-bold text-dark leading-tight">Layanan Individual</h3>
                <p className="text-[13px] sm:text-[14px] text-gray-500 leading-tight mt-0.5">Layanan siap pakai untuk berbagai kebutuhan legalitas bisnis</p>
              </div>
            </div>

              {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {[
                { name: "Pendirian & Pembubaran Badan Usaha", desc: "PT, PT PMA, PT Perorangan, CV, Yayasan, Firma, Koperasi", icon: Building2, circleBg: "#B91C1C", cardTint: "#FEF2F2" },
                { name: "Perizinan Usaha", desc: "NIB, OSS, PKP, PSE, PKKPR, LKPM", icon: FileCheck, circleBg: "#2563EB", cardTint: "#EFF6FF" },
                { name: "Pendaftaran HKI", desc: "Merek, Paten, Desain Industri, Hak Cipta", icon: ShieldCheck, circleBg: "#D97706", cardTint: "#FFFBEB" },
                { name: "Pengurusan Dokumen Perusahaan", desc: "Perubahan Anggaran Dasar, RUPS, Akta Jual Beli/Akuisisi", icon: Files, circleBg: "#4B5563", cardTint: "#F3F4F6" },
                { name: "Penyusunan & Review Perjanjian", desc: "Kontrak Bisnis, Kerja Sama, Perjanjian Pisah Harta/Perkawinan", icon: Scale, circleBg: "#15803D", cardTint: "#DCFCE7" },
                { name: "Apostille", desc: "Legalisasi dokumen lintas negara", icon: Globe, circleBg: "#6D28D9", cardTint: "#F3E8FF" },
                { name: "Layanan Imigrasi", desc: "Visa, KITAS", icon: Globe, circleBg: "#0284C7", cardTint: "#E0F2FE" },
                { name: "Sertifikasi ISO", desc: "ISO 9001, 14001, 45001, 27001, dan standar lainnya", icon: Award, circleBg: "#BE123C", cardTint: "#FFE4E6", brandPrefix: "Easy", brandSuffix: "ISO" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      window.dispatchEvent(new CustomEvent('open-layanan-mega-menu'));
                    }}
                    className="group layanan-card rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:shadow-md shadow-sm transition-all duration-200 flex sm:flex-col items-center sm:items-start justify-between overflow-hidden min-h-[110px] sm:min-h-[190px] text-left gap-4 sm:gap-0"
                    style={{
                      background: `linear-gradient(to bottom right, #ffffff 30%, ${item.cardTint} 120%)`,
                    }}
                  >
                    <div className="flex-grow flex flex-col items-start w-full order-2 sm:order-1">
                      {item.brandPrefix ? (
                        <div className="flex items-center mb-1.5 sm:mb-2">
                           <span className="flex items-center text-[10px] sm:text-[11px] font-bold border border-gray-200 rounded-[4px] overflow-hidden shadow-sm">
                             <span className="bg-white text-dark px-1.5 py-0.5">{item.brandPrefix}</span>
                             <span className="bg-primary text-white px-1.5 py-0.5">{item.brandSuffix}</span>
                           </span>
                        </div>
                      ) : null}
                      <h4 className="text-[14px] sm:text-[15px] font-bold text-dark leading-snug">{item.name}</h4>
                      <p className="text-[12px] sm:text-[12px] text-gray-500 mt-1 sm:mt-1.5 line-clamp-2 leading-snug">{item.desc}</p>
                    </div>

                    <div className="flex justify-center mt-0 sm:mt-4 w-auto sm:w-full order-1 sm:order-2 flex-shrink-0">
                      <div
                        className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: `${item.cardTint}` }}
                      >
                        <div
                          className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] rounded-full flex items-center justify-center shadow-sm"
                          style={{ backgroundColor: item.circleBg }}
                        >
                          <Icon className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-white" strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* 9th Card: Lihat Semua / Trigger Navbar */}
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('open-layanan-mega-menu'));
                }}
                className="group layanan-card rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:shadow-md shadow-sm transition-all duration-200 flex sm:flex-col items-center sm:items-start justify-between overflow-hidden min-h-[110px] sm:min-h-[190px] bg-gradient-to-br from-dark to-dark border border-gray-800 text-left gap-4 sm:gap-0"
              >
                <div className="flex-grow flex flex-col items-start w-full order-2 sm:order-1">
                  <h4 className="text-[14px] sm:text-[15px] font-bold text-white leading-snug">Jelajahi Semua Layanan</h4>
                  <p className="text-[12px] sm:text-[12px] text-gray-400 mt-1 sm:mt-1.5 line-clamp-2 leading-snug">Lihat 20+ layanan legalitas lengkap kami di direktori layanan.</p>
                </div>

                <div className="flex justify-center mt-0 sm:mt-4 w-auto sm:w-full order-1 sm:order-2 flex-shrink-0">
                  <div className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 bg-gray-800">
                    <div className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] rounded-full flex items-center justify-center shadow-sm bg-primary">
                      <svg className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>

            </div>
          </div>

          {/* RIGHT: Solusi Korporat */}
          <div
            className="rounded-2xl p-4 sm:p-6 flex flex-col border border-black/[0.06] shadow-sm md:shadow-none bg-white"
            style={{ 
              background: "radial-gradient(100% 100% at 100% 0%, #FFE2E2 0%, transparent 50%), radial-gradient(80% 80% at 100% 100%, #FFF6DA 0%, transparent 50%), #FFFCFC" 
            }}
          >
            <div className="flex items-start gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-primary" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[16px] sm:text-[16px] font-extrabold text-dark leading-tight">Solusi Korporat</h3>
                <p className="text-[16px] sm:text-[16px] text-muted leading-snug mt-0.5">
                  Dirancang untuk kebutuhan perusahaan & partnership B2B
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 bg-white rounded-xl px-3 sm:px-4 py-1.5 sm:py-2.5 shadow-sm shadow-sm border border-black/[0.03] mb-4 sm:mb-5 self-start">
              <div className="w-5 h-4 overflow-hidden rounded-[3px] sm:rounded-[4px] relative flex items-center justify-center">
                <Image 
                  src="/Logo EL.png" 
                  alt="EL Icon" 
                  fill
                  sizes="24px"
                  className="object-cover scale-150" 
                  style={{ objectPosition: "center 22%" }}
                />
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <span className="text-[16px] sm:text-[16px] font-extrabold text-[#D62828] tracking-tight">Easy</span>
                <span className="text-[16px] sm:text-[16px] font-bold text-[#111827] tracking-tight">Legal</span>
              </div>
              <div className="w-px h-3.5 bg-border mx-1" />
              <span className="text-[16px] sm:text-[16px] font-bold text-dark/40 uppercase tracking-[0.15em]">CORPORATE</span>
            </div>

            <p className="text-[16px] sm:text-[16px] text-muted leading-relaxed mb-4 sm:mb-5">
              Solusi kustom oleh tim partnership EasyLegal yang dirancang sesuai kebutuhan korporasi — dari volume tinggi, integrasi sistem, sampai dedicated support.
            </p>

            <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
              {[
                "Alur kerja & integrasi terkustomisasi",
                "Dedicated Account Manager & MOU resmi",
                "Volume discount & branded partner portal",
                "Priority processing & co-marketing support",
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-2 sm:gap-2.5 text-[16px] sm:text-[16px] text-dark/85">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#16A34A]" strokeWidth={3} />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/kontak"
              className="w-full sm:w-auto text-center inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 bg-primary text-white text-[16px] sm:text-[16px] font-bold rounded-xl hover:bg-primary-hover transition-colors self-start shadow-sm hover:shadow-md"
            >
              Pelajari lebih lanjut
            </Link>

            {/* Dashboard mockup */}
            <div className="mt-5 sm:mt-6 rounded-2xl bg-white shadow-sm border border-black/[0.03] shadow-sm overflow-hidden relative pb-6 hidden sm:block">
              <div className="bg-[#F5F5F5] px-3.5 py-2.5 flex items-center gap-1.5 border-b border-border/40">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>

              <div className="p-4 space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-24 bg-primary/80 rounded-md flex-shrink-0" />
                  <div className="h-2 bg-dark/15 rounded-full flex-1" />
                </div>
                <div className="h-px bg-border/60" />
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
                <div className="h-2 bg-dark/6 rounded-full w-2/3 mt-1" />
              </div>

              <div className="absolute bottom-3 left-3 bg-white rounded-lg px-3 py-1.5 shadow-md shadow-sm border border-black/[0.03] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-muted" strokeWidth={2} />
                <span className="text-[16px] font-bold text-dark">50+ Mitra</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-white rounded-lg px-3 py-1.5 shadow-md shadow-sm border border-black/[0.03] flex items-center gap-1.5">
                <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                <span className="text-[16px] font-bold text-dark">MOU Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
