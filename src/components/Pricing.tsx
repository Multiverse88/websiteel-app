"use client";

import React from "react";
import { Check, X } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export interface PricingItem {
  text: string;
  boldText?: string;
  checked: boolean;
  footnoteIndex?: number | string;
}

export interface PricingGroup {
  title: string;
  isBoxed?: boolean;
  items: PricingItem[];
}

export interface PricingPackage {
  title: string;
  price: string;
  strikePrice?: string;
  subLabel?: string;
  isPopular?: boolean;
  badgeText?: string;
  badgeBgColor?: string;
  badgeTextColor?: string;
  groups: PricingGroup[];
  buttonText: string;
  buttonLink: string;
  customHeaderOverlay?: React.ReactNode;
}

export interface FootnoteItem {
  label?: string;
  text: string;
}

export interface PricingProps {
  sectionTitleTag?: string;
  sectionTitle: string;
  sectionSubtitle?: React.ReactNode;
  packages: PricingPackage[];
  footnotes?: string[] | FootnoteItem[];
}

export default function Pricing({
  sectionTitleTag = "PAKET PENDAFTARAN",
  sectionTitle,
  sectionSubtitle,
  packages,
  footnotes,
}: PricingProps) {
  // Determine grid columns dynamically based on package count
  const gridColsClass =
    packages.length === 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      : packages.length === 3
        ? "grid-cols-1 lg:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2";

  return (
    <section id="paket-harga" className="bg-[#F9FAFB] py-20 border-b border-gray-200/40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">
            {sectionTitleTag}
          </p>
          <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p className="text-[14px] sm:text-[15px] text-gray-500 font-medium">
              {sectionSubtitle}
            </p>
          )}
        </FadeIn>
        {/* Pricing Grid */}
        <FadeIn delay={0.15}>
        <div className={`grid ${gridColsClass} gap-6 items-start`}>
          {packages.map((pkg, pIdx) => {
            const headerBg = pkg.isPopular ? "bg-[#990202]" : "bg-[#1A1A1A]";
            const cardBorder = pkg.isPopular
              ? "border-[3px] border-[#990202] shadow-[0_20px_50px_rgba(153,2,2,0.08)] scale-[1.03] lg:-translate-y-2.5 relative z-10"
              : "border border-gray-150/50 shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)] transition-all duration-300";

            return (
              <div key={pIdx} className={`bg-white rounded-[32px] overflow-hidden ${cardBorder}`}>
                
                {/* Header Box */}
                <div className={`${headerBg} p-6 text-white text-center relative`}>
                  {pkg.customHeaderOverlay}
                  {pkg.badgeText && (
                    <div className={`absolute top-2.5 left-0 right-0 text-[8px] font-black uppercase tracking-wider ${pkg.badgeTextColor || "text-white"} ${pkg.badgeBgColor || "bg-red-800/80"} py-0.5 w-[110px] mx-auto rounded-full`}>
                      {pkg.badgeText}
                    </div>
                  )}
                  <h3 className={`text-[18px] sm:text-[19px] font-black text-white uppercase tracking-wider ${pkg.badgeText ? "mt-2.5" : ""}`}>
                    {pkg.title}
                  </h3>
                  {pkg.strikePrice && (
                    <div className={`mt-3 text-[12px] font-bold line-through ${pkg.isPopular ? "text-red-200" : "text-gray-400"}`}>
                      {pkg.strikePrice}
                    </div>
                  )}
                  <div className="mt-1 flex items-baseline justify-center">
                    <span className="text-[28px] sm:text-[30px] font-black tracking-tight">{pkg.price}</span>
                  </div>
                  {pkg.subLabel && (
                    <div className={`mt-2.5 text-[9.5px] font-bold tracking-widest uppercase ${pkg.isPopular ? "text-red-100" : "text-gray-400"}`}>
                      {pkg.subLabel}
                    </div>
                  )}
                </div>

                {/* Service List / Content Groups */}
                <div className="p-5.5 space-y-5">
                  {pkg.groups.map((group, gIdx) => {
                    const isBoxed = group.isBoxed;
                    const containerClass = isBoxed
                      ? "bg-gray-55/60 border border-gray-150/45 rounded-2xl p-4 space-y-2 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                      : "space-y-2.5";
                    
                    return (
                      <div key={gIdx} className={`${containerClass} ${!isBoxed && gIdx > 0 ? "pt-1.5 border-t border-gray-100" : ""}`}>
                        <h5 className="text-[9.5px] font-extrabold tracking-widest text-[#990202] uppercase mb-1">
                          {group.title}
                        </h5>
                        <ul className="space-y-2">
                          {group.items.map((item, iIdx) => {
                            const liClass = item.checked
                              ? "flex items-start text-[13px] font-medium text-gray-700"
                              : "flex items-start text-[13px] font-medium text-gray-400 line-through";

                            return (
                              <li key={iIdx} className={liClass}>
                                {item.checked ? (
                                  <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                                ) : (
                                  <X className="w-4 h-4 text-red-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                                )}
                                <span>
                                  {item.boldText && (
                                    <strong className="font-extrabold text-gray-950 mr-1">{item.boldText}</strong>
                                  )}
                                  <span dangerouslySetInnerHTML={{ __html: item.text }} />
                                  {item.footnoteIndex && (
                                    <sup className={`text-[9px] font-semibold ${item.checked ? "text-[#990202]" : "text-gray-400"}`}>
                                      ({item.footnoteIndex})
                                    </sup>
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Action Button */}
                <div className="px-5.5 pb-7 pt-1">
                  <a
                    href={pkg.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-3.5 rounded-xl text-center font-extrabold text-[13.5px] transition-all duration-200 cursor-pointer shadow-sm ${
                      pkg.isPopular
                        ? "bg-[#990202] hover:bg-[#800000] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        : "border border-gray-200 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 hover:shadow"
                    }`}
                  >
                    {pkg.buttonText}
                  </a>
                </div>

              </div>
            );
          })}
        </div>
        </FadeIn>

        {/* Footnotes Box */}
        {footnotes && footnotes.length > 0 && (
          <div className="mt-12 bg-gray-55 border border-gray-150/40 rounded-2xl p-5 text-[11.5px] text-gray-500 leading-relaxed max-w-full font-medium">
            <strong className="font-extrabold text-gray-800 mr-1.5">Keterangan:</strong>
            {footnotes.map((fn, idx) => {
              const label = typeof fn === "string" ? `(${idx + 1})` : `(${fn.label || idx + 1})`;
              const text = typeof fn === "string" ? fn : fn.text;
              return (
                <span key={idx} className={idx > 0 ? "ml-2" : ""}>
                  <strong className="font-extrabold text-gray-800 mr-1">{label}</strong>
                  <span dangerouslySetInnerHTML={{ __html: text }} />
                  {idx < footnotes.length - 1 && " "}
                </span>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
