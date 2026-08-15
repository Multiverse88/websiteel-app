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
  ShieldCheck,
} from "lucide-react";
import { heroSlides } from "./data";
import ImageLightbox from "../ImageLightbox";

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
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }
    }, 3000);
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
      {/* Main Slider Track */}
      <div 
        className="flex w-full transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroSlides.map((slide, idx) => (
          <div key={idx} className="w-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 min-h-[580px] relative">
            
            {/* Left Content */}
            <div className="bg-[#FEF2F2] md:bg-gradient-to-br md:from-[#FEFAF6] md:via-[#FAF3EC] md:to-[#FEFAF6] px-5 sm:px-12 lg:px-16 xl:px-24 py-10 sm:py-14 lg:py-20 flex flex-col justify-center relative z-10 border-r border-[#FAF0E6]/30">
              <div className="relative w-full max-w-[640px] mx-auto lg:ml-0 lg:mr-auto flex flex-col justify-center px-1">
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-red-100 bg-white text-[#D62828] text-[16px] sm:text-[16px] font-bold tracking-wide mb-4 sm:mb-6 w-fit ${tagClass}`}>
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

                <p className={`mt-4 sm:mt-6 text-[16px] sm:text-[16px] text-[#555555] leading-relaxed max-w-[540px] ${descClass}`}>
                  {slide.desc}
                </p>

                <div className={`mt-8 sm:mt-10 flex flex-row gap-3 ${ctaClass}`}>
                  <Link
                    href={slide.ctaLink || "/kontak"}
                    className="flex-1 sm:flex-initial text-center justify-center inline-flex items-center gap-2 px-6 sm:px-10 py-4 sm:py-4 bg-[#9B1C1C] hover:bg-[#8B0000] active:scale-[0.98] text-white font-black text-[16px] sm:text-[16px] tracking-wide rounded-[10px] sm:rounded-[14px] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <span>{slide.cta || "Konsultasi Gratis"}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                  </Link>
                </div>

                <div className={`mt-6 sm:mt-8 flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-2 ${badgesClass}`}>
                  {slide.trustBadges.map((badge, bidx) => (
                    <span key={bidx} className="inline-flex items-center space-x-1 sm:space-x-1.5 text-[16px] sm:text-[16px] font-semibold text-[#444444]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] text-emerald-600 flex-shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{badge}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image Slideshow */}
            <div className="relative h-[200px] sm:h-auto min-h-[180px] lg:min-h-[580px] overflow-hidden bg-gray-50/20 md:bg-gray-50 flex items-center justify-center">
              <div className="relative w-full h-full flex-shrink-0">
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
            </div>
            
          </div>
        ))}
      </div>


      {/* Trust Badges - Positioned Right */}
      <div className={`absolute bottom-[5%] md:bottom-[40px] right-2 md:right-10 bg-white/90 backdrop-blur-sm rounded-lg md:rounded-[20px] px-2 py-1.5 md:px-6 md:py-3.5 shadow-md md:shadow-[0_8px_25px_rgba(0,0,0,0.06)] border border-white/60 flex items-center space-x-2 md:space-x-5 z-20 animate-float-medium ${floatClass}`}>
        <Image
          src="/ISO-27001-2022.webp"
          alt="ISO 27001"
          width={4241}
          height={1352}
          className="h-[18px] sm:h-[24px] md:h-[56px] w-auto object-contain drop-shadow-sm cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setLightboxImage({ src: "/ISO-27001-2022.webp", alt: "ISO 27001" })}
        />
        <Image
          src="/ISO-sertifikat-scaled.jpg"
          alt="ISO Sertifikat"
          width={2560}
          height={816}
          className="h-[18px] sm:h-[24px] md:h-[56px] w-auto object-contain drop-shadow-sm cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setLightboxImage({ src: "/ISO-sertifikat-scaled.jpg", alt: "ISO Sertifikat" })}
        />
        <Image
          src="/images/badges/pse-terdaftar.png"
          alt="PSE Terdaftar"
          width={4296}
          height={1614}
          className="h-[18px] sm:h-[24px] md:h-[56px] w-auto object-contain drop-shadow-sm cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setLightboxImage({ src: "/images/badges/pse-terdaftar.png", alt: "PSE Terdaftar" })}
        />
      </div>

      <ImageLightbox 
        isOpen={!!lightboxImage}
        src={lightboxImage?.src || ""}
        alt={lightboxImage?.alt || ""}
        onClose={() => setLightboxImage(null)}
      />

    </section>
  );
});

export default Hero;
