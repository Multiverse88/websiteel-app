"use client";

import React, { useRef, useState, useEffect } from "react";
import { Check } from "lucide-react";
import { getWhatsAppLink, slugify } from "@/lib/config";

const packages = [
  {
    title: "PAKET KETENAGAKERJAAN",
    strikePrice: "Rp 2.997.000",
    price: "Rp 2.497.000",
    isPopular: false,
    whatsappMsg: "Halo EasyLegal, saya tertarik dengan PAKET KETENAGAKERJAAN.",
    lamaProses: "Waktu pengerjaan standar 3-5 Hari Kerja",
    layanan: [
      "Perjanjian Kerja Waktu Tertentu (PKWT)",
      "Perjanjian Kerja Waktu Tidak Tertentu (PKWTT)",
      "Perjanjian Kerahasiaan (NDA)",
    ]
  },
  {
    title: "PAKET KERJASAMA BISNIS",
    strikePrice: "Rp 3.747.000",
    price: "Rp 2.999.000",
    isPopular: true,
    whatsappMsg: "Halo EasyLegal, saya tertarik dengan PAKET KERJASAMA BISNIS.",
    lamaProses: "Waktu pengerjaan standar 3-5 Hari Kerja",
    layanan: [
      "Perjanjian Kerjasama",
      "Perjanjian Distributor",
      "Perjanjian Kerahasiaan (NDA)",
    ]
  },
  {
    title: "PAKET PLATFORM DIGITAL",
    strikePrice: "Rp 3.747.000",
    price: "Rp 2.999.000",
    isPopular: false,
    whatsappMsg: "Halo EasyLegal, saya tertarik dengan PAKET PLATFORM DIGITAL.",
    lamaProses: "Waktu pengerjaan standar 3-5 Hari Kerja",
    layanan: [
      "Syarat & Ketentuan",
      "Kebijakan Privasi",
      "Perjanjian Kerahasiaan (NDA)",
    ]
  },
  {
    title: "PAKET PENDIRIAN PERUSAHAAN",
    strikePrice: "Rp 6.247.000",
    price: "Rp 4.999.000",
    isPopular: false,
    whatsappMsg: "Halo EasyLegal, saya tertarik dengan PAKET PENDIRIAN PERUSAHAAN.",
    lamaProses: "Waktu pengerjaan standar 3-5 Hari Kerja",
    layanan: [
      "Perjanjian Pendirian",
      "Perjanjian Pemegang Saham",
      "Perjanjian Kerahasiaan (NDA)",
    ]
  },
  {
    title: "PAKET INVESTASI",
    strikePrice: "Rp 6.747.000",
    price: "Rp 5.499.000",
    isPopular: false,
    whatsappMsg: "Halo EasyLegal, saya tertarik dengan PAKET INVESTASI.",
    lamaProses: "Waktu pengerjaan standar 3-5 Hari Kerja",
    layanan: [
      "Perjanjian Pemegang Saham",
      "Perjanjian Investasi",
      "Perjanjian Kerahasiaan (NDA)",
    ]
  }
];

const features = [
  "Konsultasi Gratis (30 Menit)",
  "Customization sesuai kebutuhan (bukan template)",
  "2x Revisi Gratis",
  "Format Word & PDF",
  "Legal Review sebelum finalisasi",
  "Garansi kesesuaian dengan hukum indonesia"
];

export default function PricingKontrak() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || isDown) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 364, behavior: 'smooth' }); // 340px width + 24px gap
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, isDown]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    scrollRef.current.style.scrollBehavior = 'auto';
    scrollRef.current.classList.remove("snap-x", "snap-mandatory");
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth';
      scrollRef.current.classList.add("snap-x", "snap-mandatory");
    }
  };

  const handleMouseUp = () => {
    setIsDown(false);
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth';
      scrollRef.current.classList.add("snap-x", "snap-mandatory");
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="paket-harga" className="py-16 sm:py-24 bg-white border-b border-gray-200/50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <p className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">
            BIAYA PEMBUATAN KONTRAK & PERJANJIAN
          </p>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-black text-gray-950 mt-2 mb-4 tracking-tight leading-tight">
            Hemat lebih banyak dengan paket bundling
          </h2>
          <p className="text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Paket yang dirancang khusus untuk kebutuhan bisnis Anda. Hemat hingga 50% dibanding pesan satuan.
          </p>
        </div>

        {/* Carousel */}
        <div 
          className="relative max-w-[1240px] mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex overflow-x-auto gap-6 pb-8 pt-4 -mx-4 px-4 sm:-mx-8 sm:px-8 scrollbar-thin scrollbar-thumb-red-600/20 scrollbar-track-transparent snap-x snap-mandatory relative z-10 ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            {packages.map((pkg, idx) => {
              const isPopular = pkg.isPopular;
              const wrapperClass = `relative h-full min-w-[300px] sm:min-w-[340px] max-w-[340px] snap-center flex-shrink-0 group pointer-events-auto ${isPopular ? "pt-[16px] sm:pt-[20px]" : "pt-0"}`;
              
              const innerClass = isPopular
                ? "rounded-[20px] p-[34px_26px_30px] h-full flex flex-col bg-gradient-to-b from-[oklch(0.32_0.15_25)] to-[oklch(0.26_0.13_25)] shadow-[0_20px_40px_oklch(0.3_0.15_25/0.35),0_0_0_1px_oklch(0.4_0.16_25/0.4)] transition-transform hover:-translate-y-1"
                : "rounded-[20px] p-[28px_26px_30px] h-full flex flex-col bg-[oklch(0.2_0.01_90)] shadow-[0_8px_20px_oklch(0.2_0.02_90/0.12)] transition-transform hover:-translate-y-1";

              return (
                <div key={idx} className={wrapperClass}>
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[oklch(0.72_0.19_70)] text-[oklch(0.2_0.02_70)] text-[12px] font-[800] tracking-[0.06em] px-[16px] py-[6px] rounded-full whitespace-nowrap shadow-[0_4px_12px_oklch(0.3_0.1_70/0.35)] z-20">
                      PALING POPULER
                    </div>
                  )}

                  <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
                  
                  <div className={innerClass}>
                    
                    {/* Header */}
                    <div className="text-center mb-[18px]">
                      <div className="text-[16px] font-[800] tracking-[0.04em] text-[oklch(0.98_0.003_90)] uppercase">
                        {pkg.title}
                      </div>
                    </div>

                    <div className="text-center mb-[20px]">
                      <div className={`text-[16px] line-through mb-[2px] ${isPopular ? "text-[oklch(0.8_0.03_25)]" : "text-[oklch(0.62_0.01_90)]"}`}>
                        {pkg.strikePrice}
                      </div>
                      <div className="text-[32px] font-[800] text-[oklch(0.98_0.003_90)] leading-[1.2]">
                        {pkg.price}
                      </div>
                    </div>

                    <a
                      href={getWhatsAppLink(pkg.whatsappMsg, slugify(pkg.title))}
                      target="_blank" rel="noopener noreferrer"
                      className={`w-full py-[14px] rounded-[10px] text-[16px] font-[700] block text-center transition-transform hover:scale-[1.02] ${
                        isPopular
                          ? "bg-[oklch(0.72_0.19_70)] text-[oklch(0.2_0.02_70)] shadow-lg"
                          : "bg-[oklch(0.98_0.003_90)] text-[oklch(0.2_0.01_90)]"
                      }`}
                    >
                      Pilih PAKET
                    </a>

                    <div className={`h-[1px] my-[24px] ${isPopular ? "bg-[oklch(0.45_0.1_25/0.5)]" : "bg-[oklch(0.35_0.01_90)]"}`} />

                    <div className="flex-1 text-left">
                      {/* Lama Proses */}
                      <div className={`text-[14px] font-[800] tracking-[0.06em] mb-[12px] uppercase ${isPopular ? "text-[oklch(0.8_0.03_25)]" : "text-[oklch(0.62_0.01_90)]"}`}>
                        LAMA PROSES
                      </div>
                      <div className="flex items-start gap-[10px] text-[16px] text-[oklch(0.92_0.005_90)] leading-[1.4] mb-[20px]">
                        <span className={`${isPopular ? "text-[oklch(0.78_0.15_145)]" : "text-[oklch(0.7_0.15_145)]"} font-[700] flex-shrink-0`}>✓</span>
                        <span>{pkg.lamaProses}</span>
                      </div>

                      {/* Layanan Terdiri */}
                      <div className={`text-[14px] font-[800] tracking-[0.06em] mb-[12px] uppercase ${isPopular ? "text-[oklch(0.8_0.03_25)]" : "text-[oklch(0.62_0.01_90)]"}`}>
                        LAYANAN TERDIRI
                      </div>
                      <div className="flex flex-col gap-[12px] mb-[20px]">
                        {pkg.layanan.map((item, i) => (
                          <div key={i} className="flex items-start gap-[10px] text-[16px] text-[oklch(0.92_0.005_90)] leading-[1.4]">
                            <span className={`${isPopular ? "text-[oklch(0.78_0.15_145)]" : "text-[oklch(0.7_0.15_145)]"} font-[700] flex-shrink-0`}>✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Sudah Termasuk */}
                      <div className={`text-[14px] font-[800] tracking-[0.06em] mb-[12px] uppercase ${isPopular ? "text-[oklch(0.8_0.03_25)]" : "text-[oklch(0.62_0.01_90)]"}`}>
                        SUDAH TERMASUK
                      </div>
                      <div className="flex flex-col gap-[12px]">
                        {features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-[10px] text-[16px] text-[oklch(0.92_0.005_90)] leading-[1.4]">
                            <span className={`${isPopular ? "text-[oklch(0.78_0.15_145)]" : "text-[oklch(0.7_0.15_145)]"} font-[700] flex-shrink-0`}>✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Layanan Tambahan */}
        <div className="mt-16 sm:mt-24 max-w-[1140px] mx-auto text-center">
          <p className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.2em] mb-2">
            LAYANAN TAMBAHAN
          </p>
          <h3 className="text-[16px] sm:text-[32px] font-black text-gray-950 tracking-tight leading-tight mb-10">
            Tambahan opsional sesuai kebutuhan
          </h3>

          {/* Cards Flex Container */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            
            {/* Card 1 */}
            <div className="bg-[oklch(0.2_0.01_90)] rounded-[20px] shadow-[0_8px_20px_oklch(0.2_0.02_90/0.12)] p-6 text-left flex-1 min-w-[200px] hover:shadow-[0_12px_24px_oklch(0.2_0.02_90/0.2)] hover:-translate-y-1 transition-all">
              <h4 className="text-[16px] font-[800] text-[oklch(0.98_0.003_90)] tracking-[0.04em] uppercase mb-1.5">SUPER EXPRESS</h4>
              <p className="text-[14px] italic text-[oklch(0.62_0.01_90)] font-[500] mb-4 pb-4 border-b border-[oklch(0.35_0.01_90)] border-dashed">(1 hari kerja)</p>
              <div className="flex items-end justify-start text-[oklch(0.98_0.003_90)] font-[800] tracking-tight">
                <span className="text-[16px] mb-1 mr-1">+ Rp</span>
                <span className="text-[26px] leading-none">749.000</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[oklch(0.2_0.01_90)] rounded-[20px] shadow-[0_8px_20px_oklch(0.2_0.02_90/0.12)] p-6 text-left flex-1 min-w-[200px] hover:shadow-[0_12px_24px_oklch(0.2_0.02_90/0.2)] hover:-translate-y-1 transition-all">
              <h4 className="text-[16px] font-[800] text-[oklch(0.98_0.003_90)] tracking-[0.04em] uppercase mb-1.5">EXPRESS SERVICE</h4>
              <p className="text-[14px] italic text-[oklch(0.62_0.01_90)] font-[500] mb-4 pb-4 border-b border-[oklch(0.35_0.01_90)] border-dashed">(2 hari kerja)</p>
              <div className="flex items-end justify-start text-[oklch(0.98_0.003_90)] font-[800] tracking-tight">
                <span className="text-[16px] mb-1 mr-1">+ Rp</span>
                <span className="text-[26px] leading-none">499.000</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[oklch(0.2_0.01_90)] rounded-[20px] shadow-[0_8px_20px_oklch(0.2_0.02_90/0.12)] p-6 text-left flex-1 min-w-[200px] hover:shadow-[0_12px_24px_oklch(0.2_0.02_90/0.2)] hover:-translate-y-1 transition-all">
              <h4 className="text-[16px] font-[800] text-[oklch(0.98_0.003_90)] tracking-[0.04em] uppercase mb-1.5">REVISI TAMBAHAN</h4>
              <p className="text-[14px] italic text-[oklch(0.62_0.01_90)] font-[500] mb-4 pb-4 border-b border-[oklch(0.35_0.01_90)] border-dashed">(Setelah 2x revisi)</p>
              <div className="flex items-end justify-start text-[oklch(0.98_0.003_90)] font-[800] tracking-tight">
                <span className="text-[16px] mb-1 mr-1">+ Rp</span>
                <span className="text-[26px] leading-none">249.000</span>
                <span className="text-[14px] mb-1 ml-1 text-[oklch(0.62_0.01_90)] font-[700]">/Revisi</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[oklch(0.2_0.01_90)] rounded-[20px] shadow-[0_8px_20px_oklch(0.2_0.02_90/0.12)] p-6 text-left flex-1 min-w-[200px] hover:shadow-[0_12px_24px_oklch(0.2_0.02_90/0.2)] hover:-translate-y-1 transition-all">
              <h4 className="text-[16px] font-[800] text-[oklch(0.98_0.003_90)] tracking-[0.04em] uppercase mb-1.5">LEGALISASI NOTARIS</h4>
              <p className="text-[14px] italic text-[oklch(0.62_0.01_90)] font-[500] mb-4 pb-4 border-b border-[oklch(0.35_0.01_90)] border-dashed">(Opsional)</p>
              <div className="flex items-end justify-start text-[oklch(0.98_0.003_90)] font-[800] tracking-tight">
                <span className="text-[16px] mb-1 mr-1">+ Rp</span>
                <span className="text-[26px] leading-none">499.000</span>
              </div>
            </div>

            {/* Card 5 (Premium) */}
            <div className="relative group flex-1 min-w-[200px] hover:-translate-y-1 transition-all h-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[oklch(0.72_0.19_70)] text-[oklch(0.2_0.02_70)] text-[12px] font-[800] tracking-[0.06em] px-[14px] py-[4px] rounded-full whitespace-nowrap shadow-[0_4px_12px_oklch(0.3_0.1_70/0.35)] uppercase -mt-3">
                TERLARIS
              </div>
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              <div className="rounded-[20px] p-6 h-full text-left bg-gradient-to-b from-[oklch(0.32_0.15_25)] to-[oklch(0.26_0.13_25)] shadow-[0_20px_40px_oklch(0.3_0.15_25/0.35),0_0_0_1px_oklch(0.4_0.16_25/0.4)]">
                <h4 className="text-[16px] font-[800] text-[oklch(0.98_0.003_90)] tracking-[0.04em] uppercase mb-1.5">KONSULTASI LEGAL</h4>
                <p className="text-[14px] italic text-[oklch(0.8_0.03_25)] font-[500] mb-4 pb-4 border-b border-[oklch(0.45_0.1_25/0.5)] border-dashed">(Durasi 1 Jam)</p>
                <div className="flex items-end justify-start text-[oklch(0.98_0.003_90)] font-[800] tracking-tight">
                  <span className="text-[16px] mb-1 mr-1">+ Rp</span>
                  <span className="text-[26px] leading-none">499.000</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
