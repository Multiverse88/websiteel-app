"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Users,
  Check,
  Star,
} from "lucide-react";
import { heroSlides } from "./data";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px] relative">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md text-[#1A1A1A] hover:text-[#D62828] border border-gray-100 flex items-center justify-center transition-all hover:scale-105"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md text-[#1A1A1A] hover:text-[#D62828] border border-gray-100 flex items-center justify-center transition-all hover:scale-105"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Left Content */}
        <div className="bg-gradient-to-br from-[#FEFAF6] via-[#FAF3EC] to-[#FEFAF6] px-8 sm:px-12 lg:px-16 xl:px-24 py-14 lg:py-20 flex flex-col justify-center relative z-10 border-r border-[#FAF0E6]/30">
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
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-red-100 bg-[#FFF5F5] text-[#D62828] text-[12px] font-bold tracking-wide mb-6 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
                  <span>{slide.tag}</span>
                </div>

                <h1 className="text-[32px] xs:text-[38px] sm:text-[50px] lg:text-[56px] font-extrabold text-[#1A1A1A] leading-[1.08] tracking-[-0.02em]">
                  {slide.titleLines.map((line, i) => (
                    <span key={i} className={line.red ? "text-[#D62828] block" : "block"}>
                      {line.text}
                    </span>
                  ))}
                </h1>

                <p className="mt-6 text-[14.5px] text-[#555555] leading-relaxed max-w-[440px]">
                  {slide.desc}
                </p>

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

        {/* Right Image Slideshow */}
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

          {/* Floating Badges */}
          <div className="absolute top-8 right-8 bg-white rounded-2xl px-5 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-black/[0.03] flex items-center space-x-3.5 z-20 animate-float-slow">
            <div className="w-[38px] h-[38px] bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 text-[#D62828]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[16px] font-black text-[#1A1A1A] leading-tight">11.000+</div>
              <div className="text-[10px] text-[#6B7280] font-bold mt-0.5">Bisnis terlayani</div>
            </div>
          </div>

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

          {/* Dot Indicators */}
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
  );
}
