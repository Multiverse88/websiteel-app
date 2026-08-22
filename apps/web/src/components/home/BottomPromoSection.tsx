"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";

const FALLBACK_PROMOS = [
  {
    id: 1,
    title: "Super Hot Deal - Promo Terbatas",
    image: "/promo/super-hot-deal.jpg",
    link: "/layanan/pendirian-badan-usaha",
    whatsappLink: "https://wa.me/6281234567890",
  },
  {
    id: 2,
    title: "Hot Deal - Jangan Sampai Terlewat",
    image: "/promo/hot-deal.jpg",
    link: "/layanan/pendirian-badan-usaha",
    whatsappLink: "https://wa.me/6281234567890",
  },
  {
    id: 3,
    title: "Menangkan iPhone & Hadiah Rp12.000.000",
    image: "/promo/iphone.jpg",
    link: "/layanan/pendirian-badan-usaha",
    whatsappLink: "https://wa.me/6281234567890",
  },
  {
    id: 4,
    title: "Promo Semarak Kemerdekaan",
    image: "/promo/promo-kemerdekaan.jpg",
    link: "/layanan/pendirian-badan-usaha",
    whatsappLink: "https://wa.me/6281234567890",
  },
  {
    id: 5,
    title: "Melayani Seluruh Indonesia",
    image: "/promo/melayani-seluruh-indonesia.jpg",
    link: "/layanan/pendirian-badan-usaha",
    whatsappLink: "https://wa.me/6281234567890",
  },
];

export default function BottomPromoSection() {
  const [promos, setPromos] = useState<any[]>([]);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchPromos() {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/settings/PROMOS`;
        const res = await fetch(apiUrl);
        if (res.ok) {
          const json = await res.json();
          // API returns the parsed JSON array directly in json.data
          if (json.data && Array.isArray(json.data)) {
            setPromos(json.data);
            return;
          } else if (json.data && typeof json.data === 'string') {
            try {
              setPromos(JSON.parse(json.data));
              return;
            } catch (e) {}
          }
        }
      } catch (error) {
        // silently fallback
      }
      setPromos(FALLBACK_PROMOS);
    }
    fetchPromos();
  }, []);

  const displayPromos = promos.length > 0 ? promos : FALLBACK_PROMOS;

  const updatePagination = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // Total pages is the total scrollable width divided by the visible width
    // We use Math.max(1, ...) to ensure at least 1 page
    const pages = Math.max(1, Math.ceil(scrollWidth / clientWidth));
    setTotalPages(pages);

    // If we are at the very end, activate the last page
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
      setActiveIndex(pages - 1);
    } else {
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(Math.min(index, pages - 1));
    }
  };

  useEffect(() => {
    updatePagination();
    window.addEventListener('resize', updatePagination);
    return () => window.removeEventListener('resize', updatePagination);
  }, [displayPromos]);

  const handleScroll = () => {
    updatePagination();
  };

  const scrollTo = (index: number) => {
    if (!scrollContainerRef.current) return;
    const { clientWidth, scrollWidth } = scrollContainerRef.current;
    
    // If it's the last index, scroll to the absolute end to avoid partial clipping
    const targetLeft = index === totalPages - 1 ? scrollWidth - clientWidth : index * clientWidth;
    
    scrollContainerRef.current.scrollTo({
      left: targetLeft,
      behavior: 'smooth'
    });
  };

  return (
    <section id="promo" className="pt-5 sm:pt-6 pb-16 sm:pb-24 bg-white relative overflow-hidden scroll-mt-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Promo Section (Top) */}
        <div className="mb-16 sm:mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
            <div className="max-w-2xl">
              <span className="text-[14px] sm:text-[16px] font-extrabold text-[#D62828] tracking-[0.2em] uppercase mb-2 sm:mb-3 block">
                PROMO SPESIAL
              </span>
              <h2 className="text-[26px] sm:text-[34px] font-black text-gray-900 leading-[1.15] mb-3 sm:mb-4 tracking-tight">
                Penawaran terbaru dari EasyLegal
              </h2>
              <p className="text-[16px] sm:text-[18px] text-gray-500 leading-relaxed font-medium">
                Nikmati berbagai promo pilihan untuk membantu proses legalitas dan manajemen bisnis Anda menjadi lebih efisien.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button onClick={() => scrollTo(Math.max(0, activeIndex - 1))} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors bg-white">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180 text-gray-600" />
              </button>
              <button onClick={() => scrollTo(Math.min(totalPages - 1, activeIndex + 1))} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors bg-white">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <a href="/promo" className="inline-flex items-center justify-center gap-2 bg-[#D62828] hover:bg-[#B91C1C] text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-extrabold text-[14px] sm:text-[16px] transition-colors shrink-0 w-fit group ml-auto sm:ml-0">
                Lihat Semua Promo <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 sm:gap-8 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>
            
            {displayPromos.map((promo: any) => (
              <div key={promo.id} className="w-[85vw] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.5rem)] shrink-0 snap-start bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)] border border-gray-100 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col group p-3 sm:p-4">
                <div className="relative aspect-square w-full bg-gray-50 rounded-2xl overflow-hidden mb-5 sm:mb-6">
                  <Image src={promo.image} alt={promo.title} fill sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="px-2 pb-2 flex flex-col flex-1">
                  <h3 className="text-[18px] sm:text-[20px] font-black text-gray-900 leading-snug mb-5">{promo.title}</h3>
                  <div className="mt-auto flex gap-3">
                    <a href={promo.link} className="flex-1 bg-[#D62828] hover:bg-[#B91C1C] text-white text-center font-extrabold text-[14px] sm:text-[15px] py-3 rounded-full transition-colors flex items-center justify-center gap-2">
                      Selengkapnya <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </a>
                    <a href={promo.whatsappLink} className="w-[46px] h-[46px] sm:w-[48px] sm:h-[48px] shrink-0 bg-[#D62828] hover:bg-[#B91C1C] text-white rounded-full flex items-center justify-center transition-colors shadow-sm">
                      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4 sm:mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button 
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-6 sm:w-8 bg-[#D62828]' : 'w-2 sm:w-2.5 bg-gray-200 hover:bg-gray-300'}`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Bottom Section: Shopee Marketplace */}
        <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24">
          
          {/* Image Side */}
          <div className="relative w-[300px] sm:w-[380px] h-[220px] sm:h-[280px] flex-shrink-0">
            <Image 
              src="/images/transaksi-shopee.png" 
              alt="Transaksi Aman via Shopee" 
              fill 
              sizes="(max-width: 640px) 300px, 380px"
              className="object-contain drop-shadow-sm hover:scale-105 transition-transform duration-700" 
            />
          </div>

          {/* Content Side */}
          <div className="max-w-md text-center md:text-left flex flex-col items-center md:items-start">
            <h3 className="text-[26px] sm:text-[34px] font-black text-gray-900 leading-[1.15] mb-4 sm:mb-5 tracking-tight">
              Transaksi Aman Via Marketplace
            </h3>
            
            <div className="relative w-[130px] sm:w-[150px] h-[45px] sm:h-[50px] mb-5 sm:mb-6">
              <Image 
                src="/images/shopee.svg" 
                alt="Shopee Logo" 
                fill 
                sizes="(max-width: 640px) 128px, 160px"
                className="object-contain object-center md:object-left"
              />
            </div>
            
            <p className="text-[16px] sm:text-[16px] text-gray-500 leading-[1.8] max-w-sm font-medium">
              Masih ragu bertransaksi online? Tenang, layanan pendirian perusahaan, perizinan usaha, dan pendaftaran HAKI kami tersedia di marketplace <strong className="text-gray-800 font-extrabold">(Shopee)</strong> dengan jaminan transaksi yang aman dan terpercaya.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
