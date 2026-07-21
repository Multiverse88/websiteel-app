import React from "react";
import Image from "next/image";
import { Truck, Smartphone, Gift } from "lucide-react";

export default function BottomPromoSection() {
  return (
    <section className="pt-5 sm:pt-6 pb-16 sm:pb-24 bg-white relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Top Cards (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: Jangkauan Nasional */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex gap-5 sm:gap-6 items-start shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-red-100 flex-shrink-0 flex items-center justify-center bg-white shadow-sm">
              <Truck className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col pt-1">
              <span className="text-[16px] sm:text-[16px] font-extrabold text-gray-400 tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
                Jangkauan Nasional
              </span>
              <h3 className="text-[16px] sm:text-[16px] font-black text-gray-900 leading-[1.2] mb-2 sm:mb-3">
                Melayani Seluruh Indonesia
              </h3>
              <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed max-w-[280px]">
                Semua biaya tertera di awal — termasuk jasa kami dan biaya pemerintah. Tidak ada add-on mendadak di tengah proses.
              </p>
            </div>
          </div>

          {/* Card 2: Legal Festival */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex gap-5 sm:gap-6 items-start shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 relative rounded-2xl overflow-hidden shadow-sm border border-black/5">
              <Image src="/images/iphone-mockup.png" alt="iPhone" fill sizes="(max-width: 640px) 64px, 80px" className="object-cover object-center" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="text-[16px] sm:text-[16px] font-extrabold text-gray-400 tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
                Legal Festival Special
              </span>
              <h3 className="text-[16px] sm:text-[16px] font-black text-gray-900 leading-[1.2] mb-1 sm:mb-2">
                Menangkan iPhone &amp; Hadiah senilai Rp 12.000.000
              </h3>
              <div>
                <div className="inline-flex items-center gap-1.5 bg-[#990202] text-white px-3 py-1.5 rounded-full mt-2 text-[16px] sm:text-[16px] font-bold tracking-wide shadow-sm">
                  <Gift className="w-3.5 h-3.5 text-yellow-400" strokeWidth={2.5} /> 
                  Setiap pembuatan PT berkesempatan dapat iPhone
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Shopee Marketplace */}
        <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24">
          
          {/* Image Side */}
          <div className="relative w-[300px] sm:w-[380px] h-[220px] sm:h-[280px] flex-shrink-0">
            <Image 
              src="/images/transaksi-shopee.png" 
              alt="Transaksi Aman via Shopee" 
              fill 
              sizes="(max-width: 768px) 300px, 380px"
              className="object-contain drop-shadow-sm hover:scale-105 transition-transform duration-700" 
            />
          </div>

          {/* Content Side */}
          <div className="max-w-md text-center md:text-left flex flex-col items-center md:items-start">
            <h3 className="text-[26px] sm:text-[34px] font-black text-gray-900 leading-[1.15] mb-4 sm:mb-5 tracking-tight">
              Transaksi Aman Via Marketplace
            </h3>
            
            <div className="relative w-[130px] sm:w-[150px] h-[45px] sm:h-[50px] mb-5 sm:mb-6">
              <Image 
                src="/images/shopee.svg" 
                alt="Shopee Logo" 
                fill 
                className="object-contain object-center md:object-left"
              />
            </div>
            
            <p className="text-[16px] sm:text-[16px] text-gray-500 leading-[1.8] max-w-sm">
              Masih ragu bertransaksi online? Tenang, layanan pendirian perusahaan, perizinan usaha, dan pendaftaran HAKI kami tersedia di marketplace <strong className="text-gray-800 font-extrabold">(Shopee)</strong> dengan jaminan transaksi yang aman dan terpercaya.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
