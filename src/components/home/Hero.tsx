"use client";

import React, { useState, useEffect, forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Users,
  Check,
  Star,
} from "lucide-react";
import { heroSlides } from "./data";

interface HeroProps {
  className?: string;
  onSlideChange?: (slide: number) => void;
  gsapClasses?: {
    tag?: string;
    heading?: string;
    desc?: string;
    cta?: string;
    badges?: string;
    float?: string;
  };
}

const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  { className, gsapClasses },
  ref
) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setHasNavigated(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setHasNavigated(true);
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const tagClass = gsapClasses?.tag || "";
  const headingClass = gsapClasses?.heading || "";
  const descClass = gsapClasses?.desc || "";
  const ctaClass = gsapClasses?.cta || "";
  const badgesClass = gsapClasses?.badges || "";
  const floatClass = gsapClasses?.float || "";

  return (
    <section ref={ref} className={`relative overflow-hidden ${className || ""}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px] relative">
        {/* Left Arrow - hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md text-[#1A1A1A] hover:text-[#D62828] shadow-sm border border-black/[0.02] items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow - hidden on mobile */}
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md text-[#1A1A1A] hover:text-[#D62828] shadow-sm border border-black/[0.02] items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Left Content */}
        <div className="bg-[#FEF2F2] md:bg-gradient-to-br md:from-[#FEFAF6] md:via-[#FAF3EC] md:to-[#FEFAF6] px-5 sm:px-12 lg:px-16 xl:px-24 py-10 sm:py-14 lg:py-20 flex flex-col justify-center relative z-10 border-r border-[#FAF0E6]/30">
          <div className="relative min-h-[350px] flex flex-col justify-center">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ease-out ${
                  currentSlide === idx
                    ? "opacity-100 translate-y-0 relative"
                    : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                }`}
              >
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-red-100 bg-white text-[#D62828] text-[11px] sm:text-[12px] font-bold tracking-wide mb-4 sm:mb-6 w-fit ${tagClass}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
                  <span>{slide.tag}</span>
                </div>

                {/* Mobile optimization: 26px and stacked header, desktop uses default */}
                <h1 className={`text-[26px] sm:text-[50px] lg:text-[56px] font-extrabold text-[#1A1A1A] leading-[1.25] sm:leading-[1.08] tracking-[-0.02em] ${headingClass}`}>
                  {slide.titleLines.map((line, i) => (
                    <span key={i} className={line.red ? "text-[#D62828] inline sm:block" : "inline sm:block"}>
                      {line.text}{" "}
                    </span>
                  ))}
                </h1>

                <p className={`mt-4 sm:mt-6 text-[12.5px] sm:text-[14.5px] text-[#555555] leading-relaxed max-w-[440px] ${descClass}`}>
                  {slide.desc}
                </p>

                <div className={`mt-6 sm:mt-8 flex flex-row gap-3 ${ctaClass}`}>
                  <Link
                    href={slide.ctaLink}
                    className="flex-1 sm:flex-initial text-center justify-center inline-flex items-center gap-1.5 px-4 sm:px-7 py-3 bg-[#9B1C1C] hover:bg-[#8B0000] active:scale-[0.98] text-white font-bold text-[12px] sm:text-[14.5px] rounded-[8px] sm:rounded-[12px] shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <span>{slide.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                  </Link>
                  {slide.cta2Link === "/layanan/pendirian-badan-usaha" ? (
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent('open-pendirian'))}
                      className="flex-1 sm:flex-initial text-center justify-center inline-flex items-center px-4 sm:px-7 py-3 bg-white border border-gray-300 sm:bg-[#F3EBE4] sm:hover:bg-[#EAE0D7] active:scale-[0.98] text-[#1A1A1A] font-bold text-[12px] sm:text-[14.5px] rounded-[8px] sm:rounded-[12px] transition-all duration-200"
                    >
                      {slide.cta2}
                    </button>
                  ) : (
                    <Link
                      href={slide.cta2Link}
                      className="flex-1 sm:flex-initial text-center justify-center inline-flex items-center px-4 sm:px-7 py-3 bg-white border border-gray-300 sm:bg-[#F3EBE4] sm:hover:bg-[#EAE0D7] active:scale-[0.98] text-[#1A1A1A] font-bold text-[12px] sm:text-[14.5px] rounded-[8px] sm:rounded-[12px] transition-all duration-200"
                    >
                      {slide.cta2}
                    </Link>
                  )}
                </div>

                <div className={`mt-6 sm:mt-8 flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-2 ${badgesClass}`}>
                  {slide.trustBadges.map((badge, bidx) => (
                    <span key={bidx} className="inline-flex items-center space-x-1 sm:space-x-1.5 text-[10.5px] sm:text-[12.5px] font-semibold text-[#444444]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] text-emerald-600 flex-shrink-0">
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

        {/* Right Image Slideshow — styled as hero-img-placeholder on mobile */}
        <div className="relative h-[200px] sm:h-auto min-h-[180px] lg:min-h-[580px] overflow-hidden bg-gray-50/20 md:bg-gray-50 flex items-center justify-center">
          {heroSlides.map((slide, idx) => {
            const shouldRenderImage = idx === 0 || currentSlide === idx || hasNavigated;
            if (!shouldRenderImage) return null;

            return (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  currentSlide === idx ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.tag}
                  fill
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover md:opacity-100 opacity-90"
                />
                <div className="absolute inset-0 bg-black/5" />
              </div>
            );
          })}

          {/* Floating Badges — adapted size for mobile to match image mockup card overlays */}
          <div className={`absolute top-4 right-4 md:top-8 md:right-8 bg-white rounded-xl md:rounded-2xl px-3 py-2 md:px-5 md:py-3.5 shadow-[0_4px_15px_rgba(0,0,0,0.04)] md:shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-black/[0.03] flex items-center space-x-2 md:space-x-3.5 z-20 animate-float-slow ${floatClass}`}>
            <div className="w-[28px] h-[28px] md:w-[38px] md:h-[38px] bg-red-50 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 text-[#D62828]">
              <Users className="w-3.5 h-3.5 md:w-5 md:h-5" />
            </div>
            <div>
              <div className="text-[13px] md:text-[16px] font-black text-[#1A1A1A] leading-tight">11.000+</div>
              <div className="text-[9px] md:text-[10px] text-[#6B7280] font-bold md:mt-0.5">Bisnis terlayani</div>
            </div>
          </div>

          <div className={`absolute bottom-4 left-4 md:bottom-10 md:left-8 bg-white rounded-xl md:rounded-2xl px-3 py-2 md:px-5 md:py-3.5 shadow-[0_4px_15px_rgba(0,0,0,0.04)] md:shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-black/[0.03] flex items-center space-x-2 md:space-x-3.5 z-20 animate-float-medium ${floatClass}`}>
            <div className="w-[28px] h-[28px] md:w-[38px] md:h-[38px] bg-emerald-50 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 text-[#16A34A]">
              <Check className="w-3.5 h-3.5 md:w-5 md:h-5" strokeWidth={3} />
            </div>
            <div>
              <div className="text-[13px] md:text-[16px] font-black text-[#1A1A1A] leading-tight">4.9<span className="text-[9px] md:text-[11px] font-bold text-gray-500">/5</span></div>
              <div className="flex space-x-0.5 mt-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Dot Indicators — hidden on mobile */}
          <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center space-x-2 z-20">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setHasNavigated(true);
                  setCurrentSlide(idx);
                }}
                className={`min-w-3 min-h-3 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "w-6 bg-[#D62828]" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Pergi ke slide ${idx + 1}`}
                aria-current={currentSlide === idx ? "step" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
