"use client";

import React, { useRef, useState, useEffect } from "react";
import { Check } from "lucide-react";
import { getWhatsAppLink } from "@/lib/config";

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
            {packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`relative flex flex-col min-w-[300px] sm:min-w-[340px] max-w-[340px] snap-center bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left flex-shrink-0 ${pkg.isPopular ? 'ring-2 ring-[#990202]' : ''}`}
              >
                {/* Dark Header */}
                <div className={`pt-10 pb-8 px-6 text-center ${pkg.isPopular ? 'bg-[#8B0000]' : 'bg-[#1A1A1A]'} text-white relative`}>
                  {pkg.isPopular && (
                    <div className="absolute top-4 left-0 right-0 text-center">
                      <span className="text-[16px] font-black tracking-widest uppercase text-white/90">
                        PALING POPULER
                      </span>
                    </div>
                  )}
                  <h3 className={`text-[16px] font-black tracking-widest uppercase mb-3 ${pkg.isPopular ? 'text-white' : 'text-gray-300'}`}>
                    {pkg.title}
                  </h3>
                  <div className={`text-[16px] line-through font-semibold mb-1 ${pkg.isPopular ? 'text-white/60' : 'text-gray-500'}`}>
                    {pkg.strikePrice}
                  </div>
                  <div className="text-[28px] sm:text-[32px] font-black tracking-tight flex justify-center items-start">
                    <span className="text-[16px] mt-2 mr-1">Rp</span>
                    {pkg.price.replace('Rp ', '')}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Lama Proses */}
                  <div>
                    <h4 className="text-[16px] font-black text-[#990202] tracking-widest uppercase mb-4">LAMA PROSES</h4>
                    <div className="flex items-start text-[16px] font-medium text-gray-600">
                      <Check className="w-4 h-4 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>{pkg.lamaProses}</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-gray-200"></div>

                  {/* Layanan Terdiri */}
                  <div>
                    <h4 className="text-[16px] font-black text-[#990202] tracking-widest uppercase mb-4">LAYANAN TERDIRI</h4>
                    <ul className="space-y-3">
                      {pkg.layanan.map((item, i) => (
                        <li key={i} className="flex items-start text-[16px] font-medium text-gray-600">
                          <Check className="w-4 h-4 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-dashed border-gray-200"></div>

                  {/* Sudah Termasuk */}
                  <div>
                    <h4 className="text-[16px] font-black text-[#990202] tracking-widest uppercase mb-4">SUDAH TERMASUK</h4>
                    <ul className="space-y-3">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-start text-[16px] font-medium text-gray-600">
                          <Check className="w-4 h-4 text-[#10B981] mr-3 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Button */}
                <div className="p-6 sm:p-8 pt-0 mt-auto">
                  <a 
                    href={getWhatsAppLink(pkg.whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-3.5 rounded-xl text-center text-[16px] font-bold transition-all border ${pkg.isPopular ? 'bg-[#990202] text-white border-[#990202] hover:bg-[#7a0101]' : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                  >
                    Pilih PAKET
                  </a>
                </div>

              </div>
            ))}
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
            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 text-left flex-1 min-w-[200px] hover:border-[#00A3FF] hover:shadow-md transition-all">
              <h4 className="text-[16px] font-black text-[#990202] tracking-wider uppercase mb-1.5">SUPER EXPRESS</h4>
              <p className="text-[16px] italic text-gray-500 font-medium mb-4 pb-4 border-b border-gray-100 border-dashed">(1 hari kerja)</p>
              <div className="flex items-end justify-start text-[#990202] font-black tracking-tight">
                <span className="text-[16px] mb-1 mr-1">+ Rp</span>
                <span className="text-[26px] leading-none">749.000</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 text-left flex-1 min-w-[200px] hover:border-[#00A3FF] hover:shadow-md transition-all">
              <h4 className="text-[16px] font-black text-[#990202] tracking-wider uppercase mb-1.5">EXPRESS SERVICE</h4>
              <p className="text-[16px] italic text-gray-500 font-medium mb-4 pb-4 border-b border-gray-100 border-dashed">(2 hari kerja)</p>
              <div className="flex items-end justify-start text-[#990202] font-black tracking-tight">
                <span className="text-[16px] mb-1 mr-1">+ Rp</span>
                <span className="text-[26px] leading-none">499.000</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 text-left flex-1 min-w-[200px] hover:border-[#00A3FF] hover:shadow-md transition-all">
              <h4 className="text-[16px] font-black text-[#990202] tracking-wider uppercase mb-1.5">REVISI TAMBAHAN</h4>
              <p className="text-[16px] italic text-gray-500 font-medium mb-4 pb-4 border-b border-gray-100 border-dashed">(Setelah 2x revisi)</p>
              <div className="flex items-end justify-start text-[#990202] font-black tracking-tight">
                <span className="text-[16px] mb-1 mr-1">+ Rp</span>
                <span className="text-[26px] leading-none">249.000</span>
                <span className="text-[16px] mb-1 ml-0.5 font-bold">/Revisi</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 text-left flex-1 min-w-[200px] hover:border-[#00A3FF] hover:shadow-md transition-all">
              <h4 className="text-[16px] font-black text-[#990202] tracking-wider uppercase mb-1.5">LEGALISASI NOTARIS</h4>
              <p className="text-[16px] italic text-gray-500 font-medium mb-4 pb-4 border-b border-gray-100 border-dashed">(Setelah 2x revisi)</p>
              <div className="flex items-end justify-start text-[#990202] font-black tracking-tight">
                <span className="text-[16px] mb-1 mr-1">+ Rp</span>
                <span className="text-[26px] leading-none">499.000</span>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-xl border-2 border-[#00A3FF] shadow-[0_4px_16px_rgba(0,163,255,0.12)] p-5 text-left flex-1 min-w-[200px] hover:shadow-lg transition-all relative">
              <h4 className="text-[16px] font-black text-[#990202] tracking-wider uppercase mb-1.5">KONSULTASI LEGAL</h4>
              <p className="text-[16px] italic text-gray-500 font-medium mb-4 pb-4 border-b border-gray-100 border-dashed">(Durasi 1 Jam)</p>
              <div className="flex items-end justify-start text-[#990202] font-black tracking-tight">
                <span className="text-[16px] mb-1 mr-1">+ Rp</span>
                <span className="text-[26px] leading-none">499.000</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
