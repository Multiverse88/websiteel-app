import React from "react";
import { Check } from "lucide-react";

export default function WhyChoose() {
  return (
    <section className="py-20 bg-[#FCFCFC] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-14 text-left">
          <span className="text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em]">
            KENAPA EASYLEGAL
          </span>
          <h2 className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] mt-3 tracking-[-0.02em] leading-tight">
            Fondasi kokoh untuk legalitas<br />bisnis Anda.
          </h2>
          <p className="text-[15px] text-[#6B7280] mt-3 max-w-2xl leading-relaxed">
            Bukan sekadar urus dokumen — kami partner legal yang menyederhanakan proses, transparan dalam biaya, dan responsif kapan saja.
          </p>
        </div>

        {/* Premium Custom Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: Proses Cepat & Terlacak */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col justify-start text-left transition-all duration-300 hover:shadow-md">
            <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mb-5">
              <svg className="w-5 h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-[16px] font-black text-[#111827] mb-2 leading-snug">
              Proses cepat & terlacak
            </h4>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              SLA 7–14 hari kerja dengan progress yang dipantau real-time.
            </p>
          </div>

          {/* Card 2: Konsultan Hukum Berpengalaman */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col justify-start text-left transition-all duration-300 hover:shadow-md">
            <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mb-5">
              <svg className="w-5 h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 className="text-[16px] font-black text-[#111827] mb-2 leading-snug">
              Konsultan hukum berpengalaman
            </h4>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              Ditangani lawyer yang sudah menangani ribuan kasus UMKM.
            </p>
          </div>

          {/* Card 3: Resmi Terdaftar PSE */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col justify-start text-left transition-all duration-300 hover:shadow-md">
            <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mb-5">
              <svg className="w-5 h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-[16px] font-black text-[#111827] mb-2 leading-snug">
              Resmi terdaftar PSE Kominfo
            </h4>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              Data Anda aman & terlindungi sesuai regulasi.
            </p>
          </div>

          {/* Card 4: Tracking Real-Time */}
          <div className="md:row-span-2 bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_15px_35px_rgba(0,0,0,0.02)] flex flex-col justify-between text-left transition-all duration-300 hover:shadow-md min-h-[420px]">
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0 border border-emerald-100">
                  <Check className="w-3 h-3 text-[#2E7D32]" strokeWidth={4} />
                </div>
                <span className="text-[12.5px] font-extrabold text-gray-800">Konsultasi</span>
                <span className="px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[8px] font-black tracking-wider uppercase ml-auto border border-emerald-100">
                  DONE
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0 border border-emerald-100">
                  <Check className="w-3 h-3 text-[#2E7D32]" strokeWidth={4} />
                </div>
                <span className="text-[12.5px] font-extrabold text-gray-800">Cek Nama PT</span>
                <span className="px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[8px] font-black tracking-wider uppercase ml-auto border border-emerald-100">
                  DONE
                </span>
              </div>
              <div className="border border-[#FEF2F2] bg-[#FEF2F2]/60 rounded-xl px-2.5 py-2 flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#B91C1C] flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 shadow-sm">
                  3
                </div>
                <span className="text-[12.5px] font-extrabold text-gray-800">Akta Notaris</span>
                <span className="px-2 py-0.5 rounded-full bg-[#FEF2F2] text-[#B91C1C] border border-[#FEE2E2] text-[8px] font-black tracking-wider uppercase ml-auto">
                  JALAN
                </span>
              </div>
              <div className="flex items-center gap-3 opacity-55 pl-1.5">
                <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 text-[10px] font-extrabold flex-shrink-0 border border-gray-250">
                  4
                </div>
                <span className="text-[12.5px] font-bold text-gray-500">Pengesahan AHU</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="text-[16px] font-black text-[#111827] leading-snug">
                Tracking real-time
              </h4>
              <p className="text-[13px] text-[#6B7280] leading-relaxed mt-1">
                Pantau setiap tahap pengurusan dari dashboard.
              </p>
            </div>
          </div>

          {/* Card 5: Harga Transparan */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 transition-all duration-300 hover:shadow-md">
            <div className="flex-1 text-left">
              <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mb-5">
                <svg className="w-5 h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-[16px] font-black text-[#111827] mb-2 leading-snug">
                Harga transparan, tanpa kejutan
              </h4>
              <p className="text-[13px] text-[#6B7280] leading-relaxed max-w-[340px]">
                Semua biaya tertera di awal — termasuk jasa kami dan biaya pemerintah. Tidak ada add-on mendadak di tengah proses.
              </p>
            </div>

            <div className="w-full sm:w-[200px] bg-white rounded-2xl border-2 border-dashed border-[#B91C1C]/15 p-4 flex flex-col text-left flex-shrink-0 shadow-sm">
              <span className="text-[9px] font-extrabold text-gray-400 tracking-wider uppercase">
                PENDIRIAN PT
              </span>
              <div className="text-[20px] font-black text-[#B91C1C] leading-tight mt-1">
                Rp 2.500.000
              </div>
              <div className="w-full h-px bg-gray-100 my-3" />
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2 text-[10.5px] font-bold text-gray-700">
                  <Check className="w-3.5 h-3.5 text-[#16A34A]" strokeWidth={3.5} />
                  <span>Jasa kami</span>
                </li>
                <li className="flex items-center gap-2 text-[10.5px] font-bold text-gray-700">
                  <Check className="w-3.5 h-3.5 text-[#16A34A]" strokeWidth={3.5} />
                  <span>Biaya AHU</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 6: 100% Online & Paperless */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col justify-start text-left transition-all duration-300 hover:shadow-md">
            <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mb-5">
              <svg className="w-5 h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <h4 className="text-[16px] font-black text-[#111827] mb-2 leading-snug">
              100% online & paperless
            </h4>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              Upload aman dari mana saja, tanpa harus ke kantor.
            </p>
          </div>

          {/* Card 7: CS Responsif 24/7 */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col justify-start text-left transition-all duration-300 hover:shadow-md">
            <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mb-5">
              <svg className="w-5 h-5 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h4 className="text-[16px] font-black text-[#111827] mb-2 leading-snug">
              CS responsif 24/7
            </h4>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              WhatsApp dijawab rata-rata &lt; 5 menit.
            </p>
          </div>

          {/* Card 8: Dipercaya Pengusaha */}
          <div className="md:col-span-3 bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all duration-300 hover:shadow-md">
            <div className="text-left">
              <h4 className="text-[16px] font-black text-[#111827] leading-snug">
                Dipercaya pengusaha Indonesia di berbagai industri
              </h4>
              <p className="text-[13px] text-[#6B7280] leading-relaxed mt-1">
                Dari UMKM kuliner sampai startup teknologi.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-12 flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-100 md:border-t-0">
              <div className="text-left">
                <div className="text-[28px] font-black text-[#B91C1C] leading-none">
                  11.000+
                </div>
                <div className="text-[11px] text-gray-400 font-bold mt-2.5">
                  Bisnis terlayani
                </div>
              </div>
              <div className="hidden sm:block w-px h-11 bg-gray-150" />
              <div className="text-left">
                <div className="text-[28px] font-black text-gray-800 leading-none flex items-baseline">
                  4.9<span className="text-amber-500 ml-0.5">★</span>
                </div>
                <div className="text-[11px] text-gray-400 font-bold mt-2.5">
                  Rating Google
                </div>
              </div>
              <div className="hidden sm:block w-px h-11 bg-gray-150" />
              <div className="text-left">
                <div className="text-[28px] font-black text-[#B91C1C] leading-none">
                  5thn
                </div>
                <div className="text-[11px] text-gray-400 font-bold mt-2.5">
                  Pengalaman
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
