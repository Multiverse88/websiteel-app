"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const alurPKKPR = [
  {
    step: "01",
    title: "Konsultasi & Asesmen Awal",
    desc: "Diskusikan kebutuhan usaha Anda bersama Personal Legal Assistant kami secara gratis. Kami bantu identifikasi jenis KBLI yang sesuai, menentukan lokasi usaha yang tepat",
    bullets: [
      "Identifikasi jenis KBLI yang sesuai",
      "Penentuan lokasi usaha yang tepat",
      "Arahan awal proses legalitas"
    ]
  },
  {
    step: "02",
    title: "Pengumpulan Dokumen",
    desc: "Kami membantu menyiapkan checklist serta melakukan verifikasi terhadap seluruh dokumen persyaratan yang dibutuhkan, sehingga proses pengajuan berjalan lebih tertata dan lengkap.",
    bullets: [
      "Checklist dokumen persyaratan",
      "Verifikasi kelengkapan dokumen",
      "Penyesuaian dengan ketentuan berlaku"
    ]
  },
  {
    step: "03",
    title: "Penerbitan NIB",
    desc: "Proses pendaftaran dan penerbitan NIB melalui sistem OSS kami bantu lakukan sebagai prasyarat utama agar pengajuan PKKPR dapat diajukan dan diproses sesuai ketentuan.",
    bullets: [
      "Pendaftaran di sistem OSS",
      "Penerbitan NIB sebagai prasyarat PKKPR"
    ]
  },
  {
    step: "04",
    title: "Pengajuan PKKPR",
    desc: "Submission pengajuan dilakukan secara formal melalui sistem OSS-RBA, disertai dengan monitoring progres secara real-time oleh tim legal kami untuk pastikan proses berjalan lancar.",
    bullets: [
      "Submission formal via OSS-RBA",
      "Monitoring progres real-time",
      "Koordinasi dengan instansi terkait"
    ]
  },
  {
    step: "05",
    title: "Dokumen Terbit & Serah Terima",
    desc: "PKKPR resmi diterbitkan dan kami serahkan kepada Anda secara lengkap disertai dengan panduan teknis mengenai penggunaan dan manfaatnya sesuai ketentuan yang berlaku.",
    bullets: [
      "Serah terima dokumen PKKPR resmi",
      "Panduan teknis penggunaan",
      "Pendampingan pasca-terbit"
    ]
  }
];

export default function AlurProsesPKKPR() {
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
    }, 3500);

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
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="text-[12px] font-black text-[#990202] uppercase tracking-[0.2em] mb-3">
            ALUR PROSES PEMBUATAN DOKUMEN
          </p>
          <h2 className="text-[28px] sm:text-[40px] font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
            Alur pengurusan PKKPR di EasyLegal
          </h2>
          <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Tim legal kami pegang seluruh tahapan. Anda cukup sampaikan kebutuhan, siapkan dokumen, dan terima hasilnya.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 text-[#990202] text-[13px] font-black uppercase tracking-[0.1em]">
            <span>GESER UNTUK LIHAT SEMUA LANGKAH</span>
            <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </div>
        </div>

        <div className="relative max-w-[1280px] mx-auto w-full group">
          <div
            ref={scrollRef}
            className={`flex overflow-x-auto gap-6 sm:gap-8 pb-12 pt-8 -mx-4 px-4 sm:-mx-8 sm:px-8 scrollbar-hide-fallback snap-x snap-mandatory ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {alurPKKPR.map((item, idx) => (
              <div 
                key={idx} 
                className="snap-center sm:snap-start shrink-0 w-[280px] sm:w-[320px] bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/80 flex flex-col relative pt-12 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="absolute -top-6 left-6 w-12 h-12 bg-white rounded-full border-2 border-[#990202] flex items-center justify-center shadow-sm">
                  <span className="text-[16px] font-black text-[#990202]">{item.step}</span>
                </div>
                
                <h4 className="text-[18px] font-black text-gray-900 mb-3 leading-tight">{item.title}</h4>
                <p className="text-[14px] text-gray-500 font-medium leading-relaxed mb-6">
                  {item.desc}
                </p>
                
                <ul className="mt-auto space-y-2">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                      <span className="text-[13px] text-gray-500 font-medium leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
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
