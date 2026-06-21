"use client";

import React from "react";
import { Link } from "next-view-transitions";
import {
  Check,
  Home,
  ArrowRight,
  Building,
  ShieldCheck,
  FileText,
  Clock,
  DollarSign,
  Upload,
  Star,
  Shield,
  Users,
  Handshake,
  Globe,
  Heart,
  BookOpen,
  Scale,
  Target,
  TrendingUp,
  Sparkles,
  UserCheck,
  Coins,
} from "lucide-react";
import Image from "next/image";
import FAQ from "@/components/FAQ";
import Pricing, { PricingPackage, FootnoteItem } from "@/components/Pricing";
import { getFAQJsonLd, getServiceJsonLd } from "@/lib/structured-data";
import type { BadanUsahaContent } from "@/data/layanan-badan-usaha";

const iconMap: Record<string, React.ElementType> = {
  Building, ShieldCheck, FileText, Clock, DollarSign, Upload,
  Star, Shield, Users, Handshake, Globe, Heart, BookOpen,
  Scale, Target, TrendingUp, Sparkles, UserCheck, Coins,
};

interface Props {
  content: BadanUsahaContent;
}

export default function BadanUsahaTemplate({ content }: Props) {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const c = content;

  const faqJsonLd = c.faqs?.length
    ? getFAQJsonLd(c.faqs.map((f) => ({ question: f.q, answer: f.a })))
    : null;

  const serviceJsonLd = getServiceJsonLd({
    name: c.nama,
    description: c.heroDescription,
    url: `/layanan/pendirian-badan-usaha/${c.id}`,
  });

  return (
    <div className="has-service-cta flex flex-col min-h-screen">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white pt-8 lg:pt-12 pb-16 lg:pb-24 border-b border-gray-200/40 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              <nav className="flex items-center space-x-2 text-[13px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-gray-500 font-medium">Layanan</span>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[13px] font-bold text-gray-900">{c.heroBreadcrumbText}</span>
              </nav>

              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1.5 px-3.5 rounded-full border border-red-100 shadow-sm animate-pulse-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[12.5px] font-bold text-[#990202] tracking-wide">{c.heroBadge}</span>
              </div>

              <h1 className="font-inter text-[40px] sm:text-[48px] lg:text-[56px] font-extrabold text-gray-950 leading-[1.12] tracking-tight">
                {c.heroTitle.map((segment, i) => {
                  if ("break" in segment) {
                    return <br key={i} />;
                  }
                  if (segment.highlight) {
                    return <span key={i} className="text-[#990202]">{segment.text}</span>;
                  }
                  return <React.Fragment key={i}>{segment.text}</React.Fragment>;
                })}
              </h1>

              <p className="text-[15.5px] sm:text-[16.5px] text-gray-500 leading-relaxed max-w-2xl font-normal">
                {c.heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <a
                  href={`https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20ingin%20konsultasi%20mengenai%20${encodeURIComponent(c.nama.toLowerCase())}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-4 bg-[#990202] text-white font-bold text-[15px] rounded-xl hover:bg-[#800000] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer group"
                >
                  <span>Konsultasi Gratis</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#paket-harga"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center px-7 py-4 border border-gray-200 text-gray-800 font-bold text-[15px] rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer"
                >
                  Lihat Paket Harga
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100 max-w-[580px]">
                {c.heroStats.map((stat, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                      {React.createElement(iconMap[stat.icon] || Clock, { className: "w-5 h-5 stroke-[2]" })}
                    </div>
                    <div>
                      <div className="text-[13.5px] sm:text-[14.5px] font-extrabold text-gray-950 leading-tight">{stat.value}</div>
                      <div className="text-[11.5px] text-gray-500 mt-0.5">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-12 lg:mt-0">
              <div className="relative w-full max-w-[480px] lg:max-w-none px-4 sm:px-0">
                
                <div className="relative overflow-hidden rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-white group aspect-[1.1] sm:aspect-square lg:aspect-[1.1]">
                  <Image
                    src={c.heroImage}
                    alt={c.heroImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                  />
                </div>

                {c.floatingBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className={`absolute ${badge.position} bg-white rounded-2xl p-3.5 pr-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center space-x-3.5 w-[220px] transition-transform hover:-translate-y-1 duration-300`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${badge.iconBg} flex items-center justify-center ${badge.iconColor} flex-shrink-0`}>
                      {React.createElement(iconMap[badge.icon] || Building, { className: "w-5 h-5 stroke-[2.2]" })}
                    </div>
                    <div>
                      <div className="text-[13.5px] font-black text-gray-900 leading-none">{badge.title}</div>
                      <div className="text-[11px] text-gray-400 font-bold mt-1.5">{badge.subtitle}</div>
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. PENGERTIAN ─── */}
      <section className="bg-white py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-14">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-wider mb-2">{c.pengertianTag}</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              {c.pengertianTitle}
            </h2>
            <p className="text-[14.5px] text-gray-500 mt-3 font-normal max-w-2xl">
              {c.pengertianIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-[480px] lg:max-w-none">
                <div className="relative overflow-hidden rounded-[32px] border border-gray-100 shadow-[0_15px_35px_rgba(0,0,0,0.04)] aspect-[1.1] sm:aspect-square lg:aspect-[1.1]">
                  <Image
                    src={c.pengertianImage}
                    alt={c.pengertianImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover object-center"
                  />
                </div>

                <div className="absolute -bottom-6 left-2 sm:left-6 bg-white rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center space-x-3.5 w-[250px] transition-transform hover:-translate-y-1 duration-300">
                  <div className={`w-10 h-10 rounded-xl ${c.hukumIconBg} flex items-center justify-center ${c.hukumIconColor} flex-shrink-0`}>
                    {React.createElement(iconMap[c.hukumIcon] || FileText, { className: "w-5 h-5 stroke-[2.2]" })}
                  </div>
                  <div>
                    <div className="text-[13.5px] font-black text-gray-900 leading-none">{c.hukumTitle}</div>
                    <div className="text-[11px] text-gray-400 font-bold mt-1.5 leading-snug">{c.hukumLaw}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="text-[15px] text-gray-600 leading-relaxed font-normal space-y-4">
                {c.pengertianDetail}
              </div>

              <div className="pt-4">
                <h3 className="text-[16px] font-extrabold text-gray-950 mb-4 tracking-tight">Karakteristik {c.nama}</h3>
                <ul className="space-y-4">
                  {c.karakteristik.map((item, idx) => (
                    <li key={idx} className="flex items-start text-[14px] text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                      </div>
                      <span>
                        <strong className="font-extrabold text-gray-950">{item.bold}</strong>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 3. MANFAAT ─── */}
      <section className="bg-[#F9FAFB] py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-wider">{c.manfaatTag}</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              {c.manfaatTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.manfaatItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-gray-200/50 hover:border-gray-300 hover:shadow-md transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-[#990202] mb-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] bg-white">
                  {React.createElement(iconMap[item.Icon] || Shield, { className: "w-5 h-5 stroke-[2]" })}
                </div>
                <h4 className="text-[16px] font-extrabold text-gray-950 mb-2">{item.title}</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 4. PAKET PRICING ─── */}
      <Pricing
        sectionTitleTag={c.pricingTag}
        sectionTitle={c.pricingTitle}
        sectionSubtitle={c.pricingSubtitle}
        packages={c.pricingPackages}
        footnotes={c.pricingFootnotes}
      />

      {/* ─── 5. PROSES ─── */}
      <section className="bg-[#F9FAFB] py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">{c.stepsTag}</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              {c.stepsTitle}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-500 font-medium">
              {c.stepsSubtitle}
            </p>
            <div className="pt-4 text-[11px] font-black text-[#990202] tracking-widest uppercase flex items-center justify-center gap-1.5 animate-pulse">
              <span>Geser untuk lihat semua langkah</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
          </div>

          <div className="relative max-w-[1240px] mx-auto">
            
            <div className="flex overflow-x-auto gap-6 pb-8 pt-8 -mx-4 px-4 sm:-mx-8 sm:px-8 scrollbar-thin scrollbar-thumb-red-600/20 scrollbar-track-transparent snap-x snap-mandatory scroll-smooth relative z-10">
              {c.steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col min-w-[280px] sm:min-w-[320px] max-w-[320px] group snap-start pt-5">
                  
                  <div className="absolute top-0 left-6 w-10 h-10 rounded-full border-2 border-[#990202] text-[#990202] bg-white flex items-center justify-center font-black text-[14.5px] z-20 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    {step.no}
                  </div>
                  
                  <div className="bg-white border border-gray-150 rounded-[24px] py-6 px-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow duration-350 flex flex-col justify-between flex-grow text-left h-full relative">
                    <div className="space-y-3">
                      
                      <h4 className="text-[16px] font-black text-gray-950 leading-tight pt-2">
                        {step.title}
                      </h4>
                      
                      <div className="inline-flex items-center gap-1.5 bg-[#FFF0F0] text-[#990202] text-[10px] font-black uppercase py-1 px-3 rounded-full">
                        <span>{step.duration}</span>
                      </div>

                      <p className="text-[12.5px] text-gray-500 font-semibold leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />

                    </div>

                    <div>
                      <div className="border-t border-dashed border-gray-200 my-4"></div>

                      <ul className="space-y-2">
                        {step.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start text-[12px] font-bold text-gray-700 leading-tight">
                            <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                            <span dangerouslySetInnerHTML={{ __html: point }} />
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ─── 6. FAQ ─── */}
      <FAQ title={c.faqTitle} items={c.faqs} />

      {/* ─── 7. CTA BANNER ─── */}
      <section className="bg-white py-24 border-t border-gray-100/60 relative">
        <div className="max-w-[1140px] mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          
          <div className="space-y-4 max-w-2xl text-left">
            <h2 className="font-inter text-[34px] sm:text-[40px] font-bold leading-tight tracking-tight text-gray-900">
              {c.ctaTitle} <span className="text-[#990202]">{c.ctaHighlight}</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-gray-500 leading-relaxed font-medium">
              {c.ctaDescription}
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col gap-3 min-w-[340px] sm:min-w-[360px]">
            <a
              href={`https://wa.me/6281123456789?text=${encodeURIComponent(c.ctaWhatsAppMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[14.5px] rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.122.953 11.5.953c-5.439 0-9.859 4.37-9.864 9.8-.001 1.73.457 3.41 1.32 4.927l-.982 3.58 3.673-.956zm11.517-5.595c-.3-.15-1.774-.875-2.048-.975-.274-.1-.474-.15-.674.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.463.13-.612.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.625-.924-2.225-.244-.588-.491-.508-.674-.518-.174-.01-.374-.012-.574-.012-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.116 4.52 1.228.531 2.186.848 2.93 1.083.755.238 1.44.205 1.984.124.606-.091 1.774-.725 2.024-1.425.25-.7.25-1.299.175-1.425-.076-.125-.275-.2-.575-.35z"/>
              </svg>
              <span>Konsultasi via WhatsApp</span>
            </a>

            <a
              href="/kontak"
              className="inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 hover:border-gray-300 font-extrabold text-[14.5px] rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              <span>Hubungi Tim Kami</span>
              <span className="text-[15px] font-normal">→</span>
            </a>

            <div className="flex items-center gap-1.5 text-[12px] text-gray-500 font-medium pt-1 px-1">
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
