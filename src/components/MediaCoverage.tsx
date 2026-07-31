"use client";
import React from "react";
import FadeIn from "@/components/FadeIn";

export default function MediaCoverage() {
  return (
    <FadeIn delay={0.2}>
      <section className="bg-white border-t border-gray-100/60 pb-4 pt-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col items-center justify-center">
          <div className="text-[16px] sm:text-[16px] font-black text-gray-400 tracking-[0.2em] uppercase mb-10 sm:mb-12 text-center">
            Liputan Media EasyLegal
          </div>
          <div className="flex flex-nowrap items-center justify-between sm:justify-center gap-2 sm:gap-8 w-full overflow-hidden pb-6 pt-4 px-2 sm:px-4">
            {[
              { id: 1, class: "h-[50px] sm:h-[80px]" },  // JPNN
              { id: 2, class: "h-[20px] sm:h-[32px]" },  // Industry
              { id: 3, class: "h-[26px] sm:h-[40px]" },  // Detik
              { id: 4, class: "h-[22px] sm:h-[36px]" },  // IDN
              { id: 5, class: "h-[50px] sm:h-[80px]" },  // Sindo
              { id: 6, class: "h-[22px] sm:h-[36px]" },  // Kontan
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-center shrink min-w-0">
                <img
                  src={`/logo-berita/logo${item.id}.png`}
                  alt={`Media Liputan ${item.id}`}
                  className={`w-auto max-w-full object-contain ${item.class}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
