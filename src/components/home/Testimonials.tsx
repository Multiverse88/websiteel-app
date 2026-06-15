"use client";

import React from "react";
import Image from "next/image";
import { Star, Check } from "lucide-react";
import { row1Reviews, row2Reviews, trustedBy } from "./data";

export default function Testimonials() {
  return (
    <>
      <section className="py-20 bg-[#F9FAFB] overflow-hidden relative">

        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="mb-14">
            <span className="text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em]">
              TESTIMONI
            </span>
            <h2 className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] mt-3 tracking-[-0.02em] leading-tight">
              Kata mereka yang sudah jalan<br />duluan.
            </h2>
            <p className="text-[14.5px] text-[#6B7280] mt-4 max-w-[620px] mx-auto leading-relaxed">
              Dari UMKM kuliner sampai startup teknologi — semua percayakan urusan legalnya ke EasyLegal.
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden flex flex-col gap-2 mt-4 py-8 marquee-container">
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none" />

          {/* ROW 1 */}
          <div className="flex w-full py-4 overflow-visible">
            <div className="animate-marquee-left flex">
              {[...row1Reviews, ...row1Reviews].map((item, idx) => (
                <a 
                  key={`${item.name}-row1-${idx}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[280px] sm:w-[350px] flex-shrink-0 bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between text-left mx-3 transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-gray-250/90 hover:z-20 relative cursor-pointer block"
                >
                  <div>
                    <div className="flex space-x-0.5 mb-3.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-[13px] text-gray-700 font-medium leading-relaxed mb-5">
                      &quot;{item.text}&quot;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                    {item.avatar ? (
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover flex-shrink-0 shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center text-white text-[11px] font-black flex-shrink-0 shadow-sm`}>
                        {item.initials}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-[13px] font-black text-[#111827] leading-tight truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-[#6B7280] font-semibold mt-0.5 truncate">
                        {item.role}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] px-2.5 py-0.5 rounded-lg text-[9px] font-black border border-emerald-100/30 ml-auto flex-shrink-0">
                      <Check className="w-2.5 h-2.5" strokeWidth={4} />
                      <span>Google</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ROW 2 */}
          <div className="flex w-full py-4 overflow-visible">
            <div className="animate-marquee-right flex">
              {[...row2Reviews, ...row2Reviews].map((item, idx) => (
                <a 
                  key={`${item.name}-row2-${idx}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[280px] sm:w-[350px] flex-shrink-0 bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between text-left mx-3 transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-gray-250/90 hover:z-20 relative cursor-pointer block"
                >
                  <div>
                    <div className="flex space-x-0.5 mb-3.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-[13px] text-gray-700 font-medium leading-relaxed mb-5">
                      &quot;{item.text}&quot;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                    {item.avatar ? (
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover flex-shrink-0 shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center text-white text-[11px] font-black flex-shrink-0 shadow-sm`}>
                        {item.initials}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-[13px] font-black text-[#111827] leading-tight truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-[#6B7280] font-semibold mt-0.5 truncate">
                        {item.role}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] px-2.5 py-0.5 rounded-lg text-[9px] font-black border border-emerald-100/30 ml-auto flex-shrink-0">
                      <Check className="w-2.5 h-2.5" strokeWidth={4} />
                      <span>Google</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-12 bg-bg-light border-y border-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-[12px] text-muted mb-8 font-medium uppercase tracking-widest">
            Dipercaya oleh <span className="font-bold text-primary">12.000+ pengusaha</span> di seluruh Indonesia
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedBy.map((c, idx) => (
              <span key={idx} className="text-[14px] font-semibold text-dark/30 hover:text-dark/50 transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
