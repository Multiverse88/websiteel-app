"use client";

import React, { useRef, useState, useEffect } from "react";
import { Factory, Building, Leaf, Pickaxe, Hotel, ShoppingCart, ArrowRight } from "lucide-react";

const wajibPKKPR = [
  {
    icon: Factory,
    title: "Industri & Manufaktur",
    desc: "Pabrik, pengolahan komoditas, industri tekstil, FMCG, dan kegiatan produksi yang membutuhkan lahan operasional."
  },
  {
    icon: Building,
    title: "Properti & Konstruksi",
    desc: "Developer perumahan, gedung komersial, kawasan industri, dan infrastruktur yang memerlukan kesesuaian tata ruang."
  },
  {
    icon: Leaf,
    title: "Pertanian & Perkebunan",
    desc: "Agribisnis, perkebunan sawit, karet, dan komoditas lain yang memanfaatkan lahan dalam skala luas."
  },
  {
    icon: Pickaxe,
    title: "Pertambangan & Energi",
    desc: "Eksplorasi, penambangan mineral/batubara, dan pembangkit energi yang berdampak pada kawasan tata ruang."
  },
  {
    icon: Hotel,
    title: "Pariwisata & Hospitality",
    desc: "Hotel, resort, area wisata terpadu, dan fasilitas hiburan skala menengah ke atas."
  },
  {
    icon: ShoppingCart,
    title: "Perdagangan & Logistik",
    desc: "Pusat perbelanjaan, gudang, terminal logistik, dan fasilitas distribusi berkapasitas besar."
  }
];

export default function SiapaWajibPKKPR() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play slide effect
  useEffect(() => {
    if (isHovered || isDown) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
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
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="bg-[#FAF9F7] py-16 sm:py-24 overflow-hidden border-b border-gray-200/50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="text-[16px] font-black text-[#990202] uppercase tracking-[0.2em] mb-3">
            SIAPA YANG WAJIB MENGURUS PKKPR
          </p>
          <h2 className="text-[28px] sm:text-[40px] font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
            Pelaku usaha yang memanfaatkan ruang untuk kegiatan bisnis
          </h2>
          <p className="text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Secara umum, setiap pelaku usaha yang memanfaatkan ruang untuk kegiatan bisnis diwajibkan memiliki PKKPR sebelum memulai operasional.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-[#990202] text-[16px] font-black uppercase tracking-[0.1em]">
            <span>GESER UNTUK LIHAT SEMUA LANGKAH</span>
            <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </div>
        </div>

        <div className="relative max-w-[1280px] mx-auto w-full group">
          <div
            ref={scrollRef}
            className={`flex overflow-x-auto gap-6 sm:gap-8 pb-12 pt-4 -mx-4 px-4 sm:-mx-8 sm:px-8 scrollbar-hide-fallback snap-x snap-mandatory ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {wajibPKKPR.map((item, idx) => (
              <div 
                key={idx} 
                className="snap-center sm:snap-start shrink-0 w-[280px] sm:w-[320px] bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100/50 flex flex-col hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="mb-6">
                  <item.icon className="w-12 h-12 text-[#990202]" strokeWidth={2} />
                </div>
                <h4 className="text-[16px] font-black text-gray-900 mb-3 leading-tight">{item.title}</h4>
                <p className="text-[16px] text-gray-500 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          
          {/* Gradient Edges */}
          <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF9F7] to-transparent pointer-events-none -ml-4 sm:-ml-8" />
          <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF9F7] to-transparent pointer-events-none -mr-4 sm:-mr-8" />
        </div>
      </div>
    </section>
  );
}
