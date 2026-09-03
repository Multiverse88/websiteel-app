import React from "react";
import { Check, X } from "lucide-react";

export default function ManfaatRisikoPKKPR() {
  const manfaatList = [
    "Usaha beroperasi legal & terlindungi penuh secara hukum",
    "Dapat melanjutkan proses NIB, izin usaha, dan izin operasional",
    "Membuka akses permodalan dari bank dan lembaga keuangan",
    "Terhindar dari sengketa lokasi dan konflik tata ruang",
    "Meningkatkan kredibilitas di mata mitra, klien, dan investor",
    "Syarat wajib untuk mengikuti tender & lelang pemerintah",
    "Proses ekspansi dan perpanjangan izin menjadi lebih mudah",
    "Perlindungan dari risiko penggusuran atau relokasi paksa"
  ];

  const risikoList = [
    "Usaha dianggap ilegal dan berisiko disegel kapan saja",
    "Tidak bisa mendapatkan NIB dan izin lanjutan apapun",
    "Sanksi administratif: denda, teguran, hingga pencabutan izin",
    "Bangunan dan fasilitas usaha dapat dibongkar paksa",
    "Ditolak saat mengajukan pinjaman atau pendanaan usaha",
    "Tidak dapat mengikuti tender atau kontrak pemerintah",
    "Rentan gugatan hukum dari pihak ketiga atau pemda",
    "Kerugian finansial masif akibat operasional terpaksa berhenti"
  ];

  return (
    <section className="bg-[#FAF9F7] py-16 sm:py-24 border-b border-gray-200/50">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[12px] font-black text-[#990202] uppercase tracking-[0.2em] mb-3">
            MENGAPA PKKPR PENTING
          </p>
          <h2 className="text-[28px] sm:text-[40px] font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
            Manfaat memiliki PKKPR vs risiko tanpa PKKPR
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Manfaat Card */}
          <div className="bg-white rounded-[24px] border border-[#990202] p-8 sm:p-10 relative shadow-sm h-full flex flex-col">
            <div className="absolute top-0 left-10 -translate-y-1/2">
              <div className="bg-[#990202] text-white text-[12px] font-black uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-sm">
                MANFAAT MEMILIKI PKKPR
              </div>
            </div>
            
            <div className="mt-4 flex-grow border border-red-50 rounded-xl bg-white p-6 sm:p-8">
              <ul className="space-y-4">
                {manfaatList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded bg-[#FFF5F5] flex items-center justify-center border border-red-100">
                      <Check className="w-3.5 h-3.5 text-[#990202]" strokeWidth={3} />
                    </div>
                    <span className="text-[15px] sm:text-[16px] text-gray-700 font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Risiko Card */}
          <div className="bg-white rounded-[24px] border border-gray-200 p-8 sm:p-10 relative shadow-[0_4px_20px_rgba(0,0,0,0.03)] h-full flex flex-col">
            <div className="absolute top-0 left-10 -translate-y-1/2">
              <div className="bg-[#F3F4F6] text-gray-600 text-[12px] font-black uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-sm border border-gray-200/60">
                RISIKO TANPA PKKPR
              </div>
            </div>
            
            <div className="mt-4 flex-grow bg-[#F9FAFB] border border-gray-100 rounded-xl p-6 sm:p-8">
              <ul className="space-y-4">
                {risikoList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded bg-white flex items-center justify-center border border-gray-200">
                      <X className="w-3.5 h-3.5 text-[#990202]" strokeWidth={3} />
                    </div>
                    <span className="text-[15px] sm:text-[16px] text-gray-700 font-medium leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
