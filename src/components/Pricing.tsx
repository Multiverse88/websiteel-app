"use client";

import React from "react";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useDraggableScroll } from "@/hooks/useDraggableScroll";
import FadeIn from "@/components/FadeIn";
import PricingFooter from "@/components/PricingFooter";

interface PricingItem {
  text: React.ReactNode;
  boldText?: string;
  checked: boolean;
  footnoteIndex?: number | string;
}

interface PricingGroup {
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
  promoBadgeSrc?: string;
  hideFooter?: boolean;
  headerBottomContent?: React.ReactNode;
}

export default function Pricing({
  sectionTitleTag = "PAKET PENDAFTARAN",
  sectionTitle,
  sectionSubtitle,
  packages,
  footnotes,
  promoBadgeSrc = "/images/badges/promo-50.png",
  hideFooter = false,
  headerBottomContent,
}: PricingProps) {
  const isSlider = packages.length > 3;
  const scrollHandlers = useDraggableScroll<HTMLDivElement>();

  return (
    <section id="paket-harga" className="bg-[#F9FAFB] py-8 sm:py-20 border-b border-gray-200/40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <FadeIn className="mb-8 sm:mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-10">
          <div className="max-w-2xl space-y-2 sm:space-y-3">
            <p className="text-[14px] sm:text-[14px] font-extrabold text-[#990202] uppercase tracking-widest">
              {sectionTitleTag}
            </p>
            <h2 className="font-heading text-[20px] sm:text-[38px] lg:text-[42px] font-extrabold text-gray-950 leading-tight tracking-tight">
              {sectionTitle}
            </h2>
            {sectionSubtitle && (
              <p className="text-[14px] sm:text-[15px] text-gray-500 font-medium leading-relaxed">
                {sectionSubtitle}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 flex justify-start md:justify-end">
            <Image 
              src={promoBadgeSrc} 
              alt="Promo Discount Badge" 
              width={280} 
              height={120}
              className="w-[220px] sm:w-[280px] object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </FadeIn>

        {headerBottomContent && (
          <div className="mb-8 sm:mb-12">
            {headerBottomContent}
          </div>
        )}

        {/* Pricing Grid */}
        <FadeIn delay={0.15}>
        <div 
          className={
            isSlider 
              ? "flex overflow-x-auto gap-4 sm:gap-6 pb-8 pt-4 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-thin scrollbar-thumb-red-600/20 scrollbar-track-transparent snap-x snap-mandatory scroll-smooth items-stretch cursor-grab active:cursor-grabbing"
              : packages.length === 1
                ? "flex justify-center items-stretch w-full"
                : `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${packages.length} gap-4 sm:gap-6 items-stretch`
          }
          {...(isSlider ? scrollHandlers : {})}
        >
            {packages.map((pkg, pIdx) => {
              const isPopular = pkg.isPopular;
              
              // Container classes
              const wrapperClass = `relative h-full ${isSlider ? "min-w-[300px] sm:min-w-[320px] max-w-[350px] snap-center shrink-0 pointer-events-auto" : packages.length === 1 ? "w-full max-w-[400px]" : "w-full"} ${isPopular ? "pt-[16px]" : ""}`;
              
              const innerClass = isPopular
                ? "rounded-[20px] p-[34px_26px_30px] h-full flex flex-col bg-gradient-to-b from-[oklch(0.32_0.15_25)] to-[oklch(0.26_0.13_25)] shadow-[0_20px_40px_oklch(0.3_0.15_25/0.35),0_0_0_1px_oklch(0.4_0.16_25/0.4)] lg:-translate-y-[10px]"
                : "rounded-[20px] p-[28px_26px_30px] h-full flex flex-col bg-[oklch(0.2_0.01_90)] shadow-[0_8px_20px_oklch(0.2_0.02_90/0.12)]";

              return (
                <div key={pIdx} className={wrapperClass}>
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[oklch(0.72_0.19_70)] text-[oklch(0.2_0.02_70)] text-[11px] font-[800] tracking-[0.06em] px-[18px] py-[8px] rounded-full whitespace-nowrap shadow-[0_4px_12px_oklch(0.3_0.1_70/0.35)] z-10">
                      {pkg.badgeText || "PALING POPULER"}
                    </div>
                  )}

                  <div className={innerClass}>
                    {pkg.customHeaderOverlay}
                    
                    {/* Title */}
                    <div className="text-center mb-[18px]">
                      <div className="text-[15px] font-[800] tracking-[0.04em] text-[oklch(0.98_0.003_90)] uppercase">
                        {pkg.title}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="text-center mb-[20px]">
                      {pkg.strikePrice && (
                        <div className={`text-[14px] line-through mb-[2px] ${isPopular ? "text-[oklch(0.8_0.03_25)]" : "text-[oklch(0.62_0.01_90)]"}`}>
                          {pkg.strikePrice}
                        </div>
                      )}
                      <div className="text-[27px] font-[800] text-[oklch(0.98_0.003_90)] leading-[1.2]">
                        {pkg.price}
                      </div>
                      {pkg.subLabel && (
                        <div className={`text-[11px] font-[700] tracking-[0.03em] mt-[6px] uppercase ${isPopular ? "text-[oklch(0.85_0.1_70)]" : "text-[oklch(0.62_0.15_25)]"}`}>
                          {pkg.subLabel}
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <a
                      href={pkg.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full p-[12px] rounded-[10px] border-none text-[14px] font-[700] cursor-pointer block text-center transition-transform hover:scale-[1.02] ${
                        isPopular
                          ? "bg-[oklch(0.72_0.19_70)] text-[oklch(0.2_0.02_70)] shadow-lg"
                          : "bg-[oklch(0.98_0.003_90)] text-[oklch(0.2_0.01_90)]"
                      }`}
                    >
                      {pkg.buttonText}
                    </a>

                    {/* Divider */}
                    <div className={`h-[1px] my-[20px] ${isPopular ? "bg-[oklch(0.45_0.1_25/0.5)]" : "bg-[oklch(0.35_0.01_90)]"}`}></div>

                    {/* Features */}
                    <div className="flex-1">
                      {pkg.groups.map((group, gIdx) => {
                        const isLastGroup = gIdx === pkg.groups.length - 1;
                        return (
                          <div key={gIdx} className={!isLastGroup ? "mb-[22px]" : ""}>
                            <div className={`text-[11px] font-[800] tracking-[0.06em] mb-[12px] uppercase ${isPopular ? "text-[oklch(0.8_0.03_25)]" : "text-[oklch(0.62_0.01_90)]"}`}>
                              {group.title}
                            </div>
                            <div className="flex flex-col gap-[10px]">
                              {group.items.map((item, iIdx) => {
                                const isActive = item.checked;
                                
                                let itemClass = "flex items-start gap-[8px] text-[13.5px] leading-[1.4] ";
                                let iconColor = "";
                                let iconText = "";

                                if (isActive) {
                                  itemClass += "text-[oklch(0.92_0.005_90)]";
                                  iconColor = isPopular ? "text-[oklch(0.78_0.15_145)]" : "text-[oklch(0.7_0.15_145)]";
                                  iconText = "✓";
                                } else {
                                  itemClass += `line-through opacity-70 ${isPopular ? "text-[oklch(0.8_0.03_25)]" : "text-[oklch(0.62_0.01_90)]"}`;
                                  iconColor = isPopular ? "text-[oklch(0.8_0.03_25)]" : "text-[oklch(0.62_0.01_90)]";
                                  iconText = "✕";
                                }

                                return (
                                  <div key={iIdx} className={itemClass}>
                                    <span className={`${iconColor} font-[700] shrink-0 mt-[1px]`}>{iconText}</span>
                                    <span>
                                      {item.boldText && (
                                        <strong className="font-[800] mr-1">{item.boldText}</strong>
                                      )}
                                      {typeof item.text === 'string' ? (
                                        <span dangerouslySetInnerHTML={{ __html: item.text }} />
                                      ) : (
                                        <span>{item.text}</span>
                                      )}
                                      {item.footnoteIndex && (
                                        <sup className="ml-0.5">({item.footnoteIndex})</sup>
                                      )}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        </FadeIn>

        {/* Footnotes Box */}
        {footnotes && footnotes.length > 0 && (
          <div className="mt-12 bg-gray-55 shadow-md border border-black/[0.03] rounded-2xl p-5 text-[14px] text-gray-500 leading-relaxed max-w-full font-medium">
            <strong className="font-extrabold text-gray-800 mr-1.5">Keterangan:</strong>
            {footnotes.map((fn, idx) => {
              const label = typeof fn === "string" ? `(${idx + 1})` : `(${fn.label || idx + 1})`;
              const text = typeof fn === "string" ? fn : fn.text;
              return (
                <span key={idx}>
                  {idx > 0 && <span className="mx-2" />}
                  <strong className="font-extrabold text-gray-800 mr-1">{label}</strong>
                  <span dangerouslySetInnerHTML={{ __html: text }} />
                </span>
              );
            })}
          </div>
        )}

        {!hideFooter && <PricingFooter />}

      </div>
    </section>
  );
}
