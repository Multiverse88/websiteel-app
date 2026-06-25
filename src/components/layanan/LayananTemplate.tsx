"use client";

import React from "react";
import Link from "next/link";
import {
  Check,
  Home,
  ChevronRight,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  TrendingUp,
  Star,
} from "lucide-react";
import Image from "next/image";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import { getWhatsAppLink } from "@/lib/config";
import type { LayananContent } from "@/data/layanan-lainnya";

const iconMap: Record<string, React.ElementType> = {
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  TrendingUp,
  Star,
};

interface Props {
  content: LayananContent;
}

export default function LayananTemplate({ content }: Props) {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const c = content;

  // Process pricing packages to inject real WhatsApp links dynamically
  const pricingPackagesWithLinks = c.pricingPackages.map((pkg) => ({
    ...pkg,
    buttonLink: getWhatsAppLink(pkg.buttonLink),
  }));

  return (
    <div className="bg-white min-h-screen pt-[25px]">
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative pb-6 lg:pb-20 overflow-hidden bg-white">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[13px] text-gray-600 pt-0 pb-1 mb-1 font-medium">
            <Link href="/" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <Home className="w-3.5 h-3.5 text-gray-600" />
              <span>Beranda</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="hover:text-gray-900 transition-colors cursor-pointer">Layanan</span>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="font-bold text-gray-800">{c.nama}</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-[55%] text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF2F2] border border-[#FEE2E2] mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B91C1C]" />
                <span className="text-[12.5px] font-extrabold text-[#B91C1C]">
                  {c.heroBadge}
                </span>
              </div>

              <h1 className="font-inter text-[38px] sm:text-[48px] lg:text-[54px] font-black text-gray-950 leading-[1.12] tracking-tight">
                {c.heroTitle}
              </h1>

              <p className="text-[15px] sm:text-[16px] text-gray-500 mt-5 leading-relaxed max-w-[580px] font-medium font-sans">
                {c.heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a
                  href={getWhatsAppLink(c.ctaWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-[#990202] hover:bg-[#800000] text-white font-extrabold rounded-xl text-[14px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Konsultasi Gratis</span>
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <button
                  onClick={scrollToPricing}
                  className="px-7 py-3.5 bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300 font-extrabold rounded-xl text-[14px] shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                >
                  Lihat Paket Harga
                </button>
              </div>

              {/* Bottom Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 pt-8 border-t border-gray-100/80">
                {c.heroStats.map((stat, i) => {
                  const Icon = iconMap[stat.icon] || MapPin;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 text-[#990202]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[14px] font-extrabold text-gray-950">{stat.value}</div>
                        <div className="text-[12px] text-gray-600 font-medium">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:w-[45%] relative mt-12 lg:mt-0">
              <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-10 aspect-[4/3] w-full">
                <Image
                  src={c.heroImage}
                  alt={c.heroImageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-w-960px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. BENEFITS SECTION ─── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {c.benefitsTitle}
            </h2>
            <p className="text-gray-500 mt-3 font-medium">
              {c.benefitsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.benefits.map((b, i) => {
              const Icon = iconMap[b.icon] || ShieldCheck;
              return (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#FEF2F2] flex items-center justify-center text-[#990202] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 3. PRICING SECTION ─── */}
      <section id="paket-harga" className="py-16">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {c.pricingTitle}
            </h2>
            <p className="text-gray-500 mt-3 font-medium">
              {c.pricingSubtitle}
            </p>
          </div>

          <Pricing
            sectionTitle={c.pricingTitle}
            sectionSubtitle={c.pricingSubtitle}
            packages={pricingPackagesWithLinks}
          />
        </div>
      </section>

      {/* ─── 4. FAQ SECTION ─── */}
      {c.faqs?.length > 0 && (
        <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 mt-3 font-medium">
                Pertanyaan yang paling sering ditanyakan mengenai {c.nama}
              </p>
            </div>

            <FAQ items={c.faqs} />
          </div>
        </section>
      )}

      {/* ─── 5. CTA SECTION ─── */}
      <CTA
        title={c.ctaTitle}
        description={c.ctaDescription}
        whatsappLink={getWhatsAppLink(c.ctaWhatsAppMessage)}
      />
    </div>
  );
}
