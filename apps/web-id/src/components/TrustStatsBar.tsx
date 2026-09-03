"use client";

import React from "react";

// Shared "ISO/PSE badge + stats bar" block, originally only on the homepage
// (see Hero.tsx's old "Centered Trust Badges" + HomeGadsPage.tsx's
export default function TrustStatsBar() {
  return (
    <section className="bg-transparent relative z-20 -mt-6 sm:-mt-10">
      {/* Stats band */}
      <div className="relative z-20 pt-8 sm:pt-10 max-w-[1240px] mx-auto px-5 sm:px-8 pb-10">
        <div className="bg-gradient-to-br from-[#9B1C1C] to-[#6A0D0D] rounded-[16px] sm:rounded-[20px] p-0.5 sm:p-1 shadow-[0_12px_30px_rgba(155,28,28,0.12)] relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] bg-black/20 rounded-[60px] blur-[60px] pointer-events-none" />
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[14px] sm:rounded-[18px] py-5 sm:py-8 px-5 sm:px-10 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 sm:gap-y-8 lg:gap-y-0 gap-x-4 sm:gap-x-8 lg:gap-x-0 lg:divide-x lg:divide-white/15">
              {[
                { value: "13.000+", label: "Bisnis Terlayani" },
                { value: "30+", label: "Jenis Layanan Legal" },
                { value: "4.9", label: "Rating Google (700+ Ulasan)" },
                { value: "3", label: "Kantor Cabang" },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center text-center px-3 md:px-5">
                  <div className="text-[28px] sm:text-[36px] lg:text-[42px] font-black text-white tracking-tighter leading-none mb-2 sm:mb-3">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-[12px] font-bold text-red-100/70 tracking-[0.1em] uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
