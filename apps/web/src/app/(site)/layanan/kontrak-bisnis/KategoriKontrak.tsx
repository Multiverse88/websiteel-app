"use client";

import React, { useRef, useState, useEffect } from "react";
import { Check } from "lucide-react";

export default function KategoriKontrak() {
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
        // If we reached the end, scroll back to the start, else slide right by one card (~340px)
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 3000); // slide every 3 seconds

    return () => clearInterval(interval);
  }, [isHovered, isDown]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    scrollRef.current.style.scrollBehavior = 'auto'; // Prevent smooth scroll interference during drag
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

  const categories = [
    {
      id: "01",
      title: "Perjanjian Ketenagakerjaan",
      desc: "Kontrak kerja untuk karyawan, freelancer, dan tenaga profesional.",
      items: [
        "Perjanjian Kerja (PKWT / PKWTT)",
        "Kontrak Freelance / Paruh Waktu",
        "Non-Disclosure Agreement (NDA)",
        "Non-Compete Agreement",
      ],
    },
    {
      id: "02",
      title: "Perjanjian Sederhana",
      desc: "Dokumen perjanjian dasar untuk transaksi sehari-hari.",
      items: [
        "Perjanjian Sewa-Menyewa",
        "Perjanjian Pinjam-Meminjam",
        "Perjanjian Jual Beli",
        "Surat Pernyataan & Kesanggupan",
      ],
    },
    {
      id: "03",
      title: "Perjanjian Komersial",
      desc: "Dokumen untuk transaksi bisnis dan kerjasama komersial.",
      items: [
        "Perjanjian Distribusi / Keagenan",
        "Perjanjian Jasa / Konsultan",
        "Kontrak Pengadaan Barang",
        "Perjanjian Sewa Komersial",
      ],
    },
    {
      id: "04",
      title: "Perjanjian Kerjasama Usaha",
      desc: "Dokumen untuk berbagai model bisnis dan kemitraan.",
      items: [
        "Memorandum of Understanding (MoU)",
        "Perjanjian Joint Venture",
        "Perjanjian Bagi Hasil",
        "Franchise Agreement",
      ],
    },
    {
      id: "05",
      title: "Surat Kuasa & Pernyataan",
      desc: "Dokumen legal pendukung untuk berbagai keperluan.",
      items: [
        "Surat Kuasa Umum / Khusus",
        "Surat Pernyataan Hukum",
        "Surat Somasi",
        "Surat Peringatan (SP 1 / 2 / 3)",
      ],
    },
    {
      id: "06",
      title: "Lisensi & Kekayaan Intelektual",
      desc: "Lindungi aset Intelektual bisnis Anda dengan dokumen yang tepat.",
      items: [
        "Perjanjian Lisensi Merek",
        "Perjanjian Pengalihan Hak Cipta",
        "Licensing Agreement",
        "Licensing Agreement", 
      ],
    },
    {
      id: "07",
      title: "Korporasi & Investasi",
      desc: "Dokumen untuk pendiri, pemegang saham, dan investor.",
      items: [
        "Shareholders Agreement",
        "Founders Agreement",
        "Convertible Note / SAFE",
        "Share Purchase Agreement",
      ],
    },
    {
      id: "08",
      title: "Kontrak Khusus",
      desc: "Kontrak bespoke untuk kebutuhan spesifik bisnis Anda.",
      items: [
        "Kontrak EPC / Konstruksi",
        "Perjanjian Outsourcing",
        "Service Level Agreement (SLA)",
        "Escrow Agreement",
      ],
    },
    {
      id: "09",
      title: "Dokumen Website & Aplikasi",
      desc: "Syarat ketentuan untuk layanan digital Anda.",
      items: [
        "Terms & Conditions",
        "Privacy Policy",
        "SaaS Agreement",
        "End User License Agreement",
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F9FAFB] border-b border-gray-200/50 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">
            KATEGORI LAYANAN
          </p>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-black text-gray-950 mt-2 mb-4 tracking-tight leading-tight">
            9 kategori kontrak & perjanjian siap disusun
          </h2>
          <p className="text-[16px] sm:text-[16px] text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Pilih jenis dokumen sesuai kebutuhan Anda. Tim ahli hukum kami akan menyusun draf yang kuat dan sesuai regulasi.
          </p>
          
          <div className="pt-6 pb-2">
            <span className="text-[16px] font-bold text-[#990202] uppercase tracking-[0.1em] flex items-center justify-center gap-2">
              GESER UNTUK LIHAT SEMUA KATEGORI <span>→</span>
            </span>
          </div>
        </div>
      </div>

      <div 
        className="w-full relative px-4 sm:px-8 max-w-[1280px] mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex overflow-x-auto gap-6 sm:gap-8 pb-12 snap-x snap-mandatory pt-8 scrollbar-hide-fallback ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`} 
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E7EB transparent' }}
        >
          {categories.map((cat, idx) => {
            return (
              <div 
                key={cat.id} 
                className="relative snap-start flex-shrink-0 w-[300px] sm:w-[340px] pt-6"
              >
                {/* Number Circle */}
                <div className="absolute top-0 left-6 w-12 h-12 bg-white rounded-full border-2 border-[#990202] flex items-center justify-center z-10 shadow-sm">
                  <span className="text-[#990202] font-black text-[16px]">{cat.id}</span>
                </div>
                
                {/* Card */}
                <div className="bg-white rounded-[24px] p-6 sm:p-8 h-full shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col pt-10">
                  <h3 className="text-[16px] sm:text-[16px] font-black text-gray-950 mb-2 leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-[16px] sm:text-[16px] text-gray-500 mb-6 flex-grow leading-relaxed">
                    {cat.desc}
                  </p>
                  
                  <ul className="space-y-3">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-4 h-4 text-[#16A34A] mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span className="text-[16px] text-gray-600 font-medium leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide-fallback::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-hide-fallback::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-hide-fallback::-webkit-scrollbar-thumb {
          background-color: #E5E7EB;
          border-radius: 10px;
        }
        .scrollbar-hide-fallback::-webkit-scrollbar-thumb:hover {
          background-color: #D1D5DB;
        }
      `}} />
    </section>
  );
}
