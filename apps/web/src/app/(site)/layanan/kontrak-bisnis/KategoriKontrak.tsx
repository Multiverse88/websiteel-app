"use client";

import React, { useRef, useState, useEffect } from "react";
import { Check } from "lucide-react";

import { getWhatsAppLink } from "@/lib/config";

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
      desc: "Kontrak kerja komprehensif untuk melindungi hak & kewajiban pemberi kerja dan tenaga kerja.",
      startPrice: "Rp 749.000",
      items: [
        { name: "Perjanjian Kerja (PKWT)", price: "Rp 999.000" },
        { name: "Perjanjian Kerja (PKWTT)", price: "Rp 1.249.000" },
        { name: "Kontrak Freelance / Paruh Waktu", price: "Rp 999.000" },
        { name: "Non-Disclosure Agreement (NDA)", price: "Rp 749.000" },
      ],
    },
    {
      id: "02",
      title: "Perjanjian Sederhana",
      desc: "Dokumen perjanjian dasar berkekuatan hukum untuk transaksi personal maupun operasional usaha.",
      startPrice: "Rp 749.000",
      items: [
        { name: "Perjanjian Sewa-Menyewa", price: "Rp 849.000" },
        { name: "Perjanjian Jual Beli", price: "Rp 849.000" },
        { name: "Perjanjian Pinjam Pakai", price: "Rp 749.000" },
        { name: "Surat Pernyataan & Kesanggupan", price: "Rp 499.000" },
      ],
    },
    {
      id: "03",
      title: "Perjanjian Komersial",
      desc: "Dokumen komersial profesional untuk transaksi rantai pasok, jasa, dan sponsorship.",
      startPrice: "Rp 999.000",
      items: [
        { name: "Perjanjian Hutang Piutang", price: "Rp 999.000" },
        { name: "Perjanjian Jasa / Konsultan", price: "Rp 1.249.000" },
        { name: "Kontrak Pengadaan / Supplier", price: "Rp 1.249.000" },
        { name: "Perjanjian Sponsor Bisnis", price: "Rp 999.000" },
      ],
    },
    {
      id: "04",
      title: "Perjanjian Kerjasama Usaha",
      desc: "Dokumen kemitraan strategis, distribusi resmi, serta skema pembagian keuntungan bisnis.",
      startPrice: "Rp 1.249.000",
      items: [
        { name: "Perjanjian Kerjasama Bisnis", price: "Rp 1.499.000" },
        { name: "Perjanjian Distributor / Keagenan", price: "Rp 1.499.000" },
        { name: "Perjanjian Bagi Hasil (Profit Sharing)", price: "Rp 1.499.000" },
        { name: "Perjanjian Pengalihan Hak", price: "Rp 1.249.000" },
      ],
    },
    {
      id: "05",
      title: "Surat Kuasa & Pernyataan",
      desc: "Dokumen legalitas otentik untuk perwakilan wewenang hukum dan klarifikasi resmi.",
      startPrice: "Rp 499.000",
      items: [
        { name: "Surat Kuasa Umum / Khusus", price: "Rp 499.000" },
        { name: "Surat Pernyataan Hukum", price: "Rp 499.000" },
        { name: "Surat Jawaban / Somasi Resmi", price: "Rp 499.000" },
        { name: "Surat Peringatan (SP 1 / 2 / 3)", price: "Rp 499.000" },
      ],
    },
    {
      id: "06",
      title: "Lisensi & Kekayaan Intelektual",
      desc: "Perlindungan kepemilikan aset intangible, lisensi komersial, dan ekspansi sistem waralaba.",
      startPrice: "Rp 1.749.000",
      items: [
        { name: "Perjanjian Lisensi Merek", price: "Rp 1.749.000" },
        { name: "Perjanjian Pengalihan HKI", price: "Rp 2.499.000" },
        { name: "Waralaba / Franchise Agreement", price: "Rp 2.499.000" },
        { name: "Perjanjian Lisensi Cipta & Software", price: "Rp 1.749.000" },
      ],
    },
    {
      id: "07",
      title: "Korporasi & Investasi",
      desc: "Pondasi legal kuat untuk co-founder, investor modal ventura, hingga pemegang saham perusahaan.",
      startPrice: "Rp 2.499.000",
      items: [
        { name: "Founders Agreement", price: "Rp 2.499.000" },
        { name: "Hutang Pemegang Saham", price: "Rp 2.499.000" },
        { name: "Shareholders Agreement (SHA)", price: "Rp 2.999.000" },
        { name: "Perjanjian Investasi Modal", price: "Rp 2.999.000" },
        { name: "Employee Stock Option (ESOP)", price: "Rp 2.999.000" },
        { name: "Joint Venture Agreement", price: "Rp 3.499.000" },
      ],
    },
    {
      id: "08",
      title: "Dokumen Website & Aplikasi",
      desc: "Perlindungan hukum digital untuk kepatuhan PDP (Pelindungan Data Pribadi) dan operasional platform.",
      startPrice: "Rp 1.499.000",
      items: [
        { name: "Syarat & Ketentuan (Terms & Conditions)", price: "Rp 1.499.000" },
        { name: "Kebijakan Privasi (Privacy Policy)", price: "Rp 1.499.000" },
        { name: "SaaS & SLA Digital Agreement", price: "Rp 1.499.000" },
        { name: "End User License Agreement (EULA)", price: "Rp 1.499.000" },
      ],
    },
    {
      id: "09",
      title: "Kontrak Khusus (Bespoke)",
      desc: "Drafting klausul bespoke khusus yang disesuaikan secara presisi dengan kebutuhan bisnis spesifik Anda.",
      startPrice: "Rp 999.000",
      items: [
        { name: "Custom Sesuai Kebutuhan Bisnis", price: "Mulai Rp 999.000" },
        { name: "Perjanjian Outsourcing Layanan", price: "Mulai Rp 999.000" },
        { name: "Service Level Agreement (SLA)", price: "Mulai Rp 999.000" },
        { name: "Escrow & Konsinyasi Khusus", price: "Mulai Rp 999.000" },
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F9FAFB] border-b border-gray-200/50 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">
            KATEGORI LAYANAN KONTRAK SATUAN
          </p>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-black text-gray-950 mt-2 mb-4 tracking-tight leading-tight">
            9 Kategori Kontrak &amp; Perjanjian Siap Disusun
          </h2>
          <p className="text-[16px] sm:text-[16px] text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Pilih jenis dokumen sesuai kebutuhan Anda. Tim ahli hukum kami akan menyusun draf yang kuat, mengikat, dan sesuai regulasi hukum Indonesia.
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
          {categories.map((cat) => {
            return (
              <div 
                key={cat.id} 
                className="relative snap-start flex-shrink-0 w-[320px] sm:w-[360px] pt-6 flex flex-col"
              >
                {/* Number Circle */}
                <div className="absolute top-0 left-6 w-12 h-12 bg-white rounded-full border-2 border-[#990202] flex items-center justify-center z-10 shadow-sm">
                  <span className="text-[#990202] font-black text-[16px]">{cat.id}</span>
                </div>
                
                {/* Card */}
                <div className="bg-white rounded-[24px] p-6 sm:p-7 h-full shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col pt-10">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-[17px] sm:text-[18px] font-black text-gray-950 leading-tight">
                      {cat.title}
                    </h3>
                  </div>
                  
                  <div className="mb-4 inline-flex items-baseline gap-1.5 bg-[#FFF5F5] border border-red-100/80 px-3 py-1.5 rounded-lg self-start">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Mulai</span>
                    <span className="text-[17px] font-black text-[#990202]">{cat.startPrice}</span>
                  </div>

                  <p className="text-[13px] sm:text-[14px] text-gray-500 mb-5 leading-relaxed">
                    {cat.desc}
                  </p>
                  
                  <div className="border-t border-gray-100 pt-4 mb-6 flex-grow">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Jenis Dokumen &amp; Biaya Satuan</p>
                    <ul className="space-y-2.5">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-center justify-between text-[13px] gap-2">
                          <div className="flex items-start gap-1.5 flex-1 min-w-0">
                            <Check className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0 mt-0.5" strokeWidth={3} />
                            <span className="text-gray-700 font-medium leading-tight truncate">{item.name}</span>
                          </div>
                          <span className="text-[11px] font-bold text-[#990202] bg-red-50 border border-red-100 px-2 py-0.5 rounded-md whitespace-nowrap flex-shrink-0">{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={getWhatsAppLink(`Halo EasyLegal, saya ingin membuat dokumen ${cat.title}. Mohon info draf dan konsultasinya.`, `pesan-${cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, "/layanan/kontrak-bisnis")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-[#990202] hover:bg-[#800000] text-white text-[13px] font-bold rounded-xl text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Pesan Dokumen Ini</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            );
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
