import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function LatestInsights() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* Header & 'Lihat Semua' button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div className="text-left">
            <span className="text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em]">
              INFORMASI HUKUM
            </span>
            <h2 className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] mt-3 tracking-[-0.02em] leading-tight">
              Panduan & update hukum untuk<br />pelaku usaha.
            </h2>
            <p className="text-[14.5px] text-[#6B7280] mt-3 max-w-[540px] leading-relaxed">
              Insight terbaru tentang regulasi, perizinan, and tips legalitas — supaya bisnis Anda tumbuh aman & compliant.
            </p>
          </div>
          <Link 
            href="/artikel" 
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-200 text-[13px] font-bold text-gray-800 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm flex-shrink-0"
          >
            <span>Lihat semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Premium Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Large Featured Article Card */}
          <div className="lg:col-span-5 h-full">
            <Link 
              href="/artikel" 
              className="group flex flex-col h-full bg-white rounded-3xl border border-gray-150/70 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.012)] hover:shadow-md hover:scale-[1.015] transition-all duration-300 text-left"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-50 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff8588?fit=crop&w=600&h=800&q=80"
                  alt="Sertifikasi ISO 9001" 
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="bg-[#FEF2F2] text-[#B91C1C] px-2.5 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase border border-[#FEE2E2]">
                      SERTIFIKASI ISO
                    </span>
                    <span className="text-[10.5px] text-gray-400 font-bold ml-3.5">
                      15 Mei 2026 · 8 min baca
                    </span>
                  </div>
                  
                  <h3 className="text-[18px] lg:text-[20px] font-black text-[#111827] mt-3.5 leading-snug group-hover:text-[#B91C1C] transition-colors">
                    Sertifikasi ISO 9001: Pengertian, Jenis, dan Manfaatnya untuk Bisnis
                  </h3>
                  
                  <p className="text-[13px] text-[#6B7280] leading-relaxed mt-3 font-medium">
                    Panduan lengkap apa itu ISO 9001, perbedaan dengan ISO lain (14001, 27001, 45001), dan kenapa bisnis Anda butuh sertifikasi ini di pasar internasional.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* RIGHT COLUMN: Grid of Smaller Article Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {/* Card 1 */}
            <Link 
              href="/artikel" 
              className="group flex flex-col bg-white rounded-3xl border border-gray-150/70 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.012)] hover:shadow-md hover:scale-[1.015] transition-all duration-300 text-left"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-50">
                <Image 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?fit=crop&w=400&h=800&q=80"
                  alt="Pendirian PT vs CV" 
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="bg-[#FEF2F2] text-[#B91C1C] px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase border border-[#FEE2E2]">
                      PENDIRIAN PT
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold ml-2.5">
                      12 Mei · 6 min
                    </span>
                  </div>
                  <h3 className="text-[14px] lg:text-[14.5px] font-black text-[#111827] mt-3 leading-snug group-hover:text-[#B91C1C] transition-colors">
                    PT vs CV vs PT Perorangan: Mana yang Cocok untuk Bisnis Anda?
                  </h3>
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link 
              href="/artikel" 
              className="group flex flex-col bg-white rounded-3xl border border-gray-150/70 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.012)] hover:shadow-md hover:scale-[1.015] transition-all duration-300 text-left"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-50">
                <Image 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=400&h=800&q=80"
                  alt="KBLI 2025" 
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="bg-[#FEF2F2] text-[#B91C1C] px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase border border-[#FEE2E2]">
                      KBLI 2025
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold ml-2.5">
                      10 Mei · 5 min
                    </span>
                  </div>
                  <h3 className="text-[14px] lg:text-[14.5px] font-black text-[#111827] mt-3 leading-snug group-hover:text-[#B91C1C] transition-colors">
                    KBLI 2025: Update Klasifikasi Baku Lapangan Usaha Indonesia
                  </h3>
                </div>
              </div>
            </Link>

            {/* Card 3 */}
            <Link 
              href="/artikel" 
              className="group flex flex-col bg-white rounded-3xl border border-gray-150/70 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.012)] hover:shadow-md hover:scale-[1.015] transition-all duration-300 text-left"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-50">
                <Image 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?fit=crop&w=400&h=800&q=80"
                  alt="NIB & OSS" 
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="bg-[#FEF2F2] text-[#B91C1C] px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase border border-[#FEE2E2]">
                      PERIZINAN
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold ml-2.5">
                      8 Mei · 4 min
                    </span>
                  </div>
                  <h3 className="text-[14px] lg:text-[14.5px] font-black text-[#111827] mt-3 leading-snug group-hover:text-[#B91C1C] transition-colors">
                    Panduan Lengkap NIB & OSS untuk UMKM Indonesia 2026
                  </h3>
                </div>
              </div>
            </Link>

            {/* Card 4 */}
            <Link 
              href="/artikel" 
              className="group flex flex-col bg-white rounded-3xl border border-gray-150/70 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.012)] hover:shadow-md hover:scale-[1.015] transition-all duration-300 text-left"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-50">
                <Image 
                  src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?fit=crop&w=400&h=800&q=80"
                  alt="Cek Daftar Merek" 
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="bg-[#FEF2F2] text-[#B91C1C] px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase border border-[#FEE2E2]">
                      MEREK & HAKI
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold ml-2.5">
                      5 Mei · 7 min
                    </span>
                  </div>
                  <h3 className="text-[14px] lg:text-[14.5px] font-black text-[#111827] mt-3 leading-snug group-hover:text-[#B91C1C] transition-colors">
                    Cara Cek & Daftar Merek Dagang di DJKI: Panduan Lengkap
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
