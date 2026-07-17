"use client";
import React from "react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

export default function MediaCoverage() {
  return (
    <FadeIn delay={0.2}>
      <section className="bg-white border-t border-gray-100/60 pb-4 pt-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col items-center justify-center">
          <div className="text-[14px] sm:text-[14px] font-black text-gray-400 tracking-[0.2em] uppercase mb-10 sm:mb-12 text-center">
            Liputan Media EasyLegal
          </div>
          <div className="flex flex-nowrap items-center justify-start xl:justify-center gap-10 sm:gap-16 w-full overflow-x-auto pb-6 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              { id: 1, scale: "scale-[1.7]" },
              { id: 2, scale: "scale-[0.85]" },
              { id: 3, scale: "scale-[1.1]" },
              { id: 4, scale: "scale-[1.1]" },
              { id: 5, scale: "scale-[1.7]" },
              { id: 6, scale: "scale-[1.1]" },
            ].map((item) => (
              <div key={item.id} className="relative h-10 sm:h-12 w-28 sm:w-36 flex-shrink-0 flex items-center justify-center">
                <img 
                  src={`/logo-berita/logo${item.id}.png`} 
                  alt={`Media Liputan ${item.id}`} 
                  className={`w-full h-full object-contain origin-center ${item.scale}`} 
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
