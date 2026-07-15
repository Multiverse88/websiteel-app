import React from "react";
import { Truck, Smartphone, Gift } from "lucide-react";
import Image from "next/image";

export default function PricingFooter() {
  return (
    <div className="max-w-[1000px] mx-auto mt-10 sm:mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
        
        {/* Left Card: Jangkauan Nasional */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex items-start gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white border border-red-200 border-dashed rounded-2xl flex items-center justify-center">
            <Truck className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900" strokeWidth={2} />
          </div>
          <div className="flex flex-col text-left justify-center h-full">
            <span className="text-[10px] font-extrabold text-gray-500 tracking-[0.15em] uppercase mb-1">
              JANGKAUAN NASIONAL
            </span>
            <h4 className="text-[18px] sm:text-[22px] font-extrabold text-gray-900 leading-tight mb-2 tracking-tight">
              Melayani Seluruh Indonesia
            </h4>
            <p className="text-[11.5px] sm:text-[13px] text-gray-500 font-medium leading-relaxed">
              Semua biaya tertera di awal — termasuk jasa kami dan biaya pemerintah. Tidak ada add-on mendadak di tengah proses.
            </p>
          </div>
        </div>

        {/* Right Card: Legal Festival Special */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex items-start gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white border border-red-200 border-dashed rounded-2xl flex items-center justify-center">
            <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col text-left justify-center h-full">
            <span className="text-[10px] font-extrabold text-gray-500 tracking-[0.15em] uppercase mb-1">
              LEGAL FESTIVAL SPECIAL
            </span>
            <h4 className="text-[18px] sm:text-[22px] font-extrabold text-gray-900 leading-tight mb-3 tracking-tight">
              Menangkan iPhone &amp; Hadiah senilai Rp 12.000.000
            </h4>
            <div>
              <span className="inline-flex items-center gap-1.5 bg-[#990202] text-white text-[9.5px] sm:text-[11px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5 text-yellow-300" strokeWidth={2.5} />
                Setiap pembuatan PT berkesempatan dapat iPhone
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Shopee Footer */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <span className="text-[13px] text-gray-500 font-medium">Transaksi aman via marketplace</span>
        <div className="flex items-center">
          <Image
            src="/images/shopee.svg"
            alt="Shopee"
            width={85}
            height={28}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
