"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Star, Check } from "lucide-react";
import { row1Reviews, row2Reviews } from "./data";

function ReviewCard({ item }: { item: typeof row1Reviews[0] }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[240px] sm:w-[350px] flex-shrink-0 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-150/70 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between text-left mx-2 sm:mx-3 transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-gray-250/90 hover:z-20 relative cursor-pointer block select-none"
    >
      <div>
        <div className="flex space-x-0.5 mb-2.5 sm:mb-3.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-[11.5px] sm:text-[13px] text-gray-700 font-medium leading-relaxed mb-4 sm:mb-5">
          &quot;{item.text}&quot;
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 mt-auto pt-3 sm:pt-4 border-t border-gray-50">
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt={item.name}
            width={28}
            height={28}
            className="rounded-full object-cover flex-shrink-0 shadow-sm sm:w-8 sm:h-8"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${item.bg} flex items-center justify-center text-white text-[10px] sm:text-[11px] font-black flex-shrink-0 shadow-sm`}>
            {item.initials}
          </div>
        )}
        <div className="min-w-0">
          <div className="text-[11px] sm:text-[13px] font-black text-[#111827] leading-tight truncate">
            {item.name}
          </div>
          <div className="text-[9px] sm:text-[10px] text-[#6B7280] font-semibold mt-0.5 truncate">
            {item.role}
          </div>
        </div>
        <div className="flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-md sm:rounded-lg text-[8px] sm:text-[9px] font-black border border-emerald-100/30 ml-auto flex-shrink-0">
          <Check className="w-2.5 h-2.5" strokeWidth={4} />
          <span>Google</span>
        </div>
      </div>
    </a>
  );
}

function AutoScrollRow({ items, direction }: { items: typeof row1Reviews; direction: "left" | "right" }) {
  const duplicated = [...items, ...items];
  const animationClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="relative group marquee-container overflow-hidden">
      <div className={`flex ${animationClass}`}>
        {duplicated.map((item, idx) => (
          <ReviewCard key={`${item.name}-${direction}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section className="py-8 sm:py-20 bg-[#F9FAFB] overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 text-left sm:text-center relative z-10">
          <div
            ref={headerRef}
            className="mb-6 sm:mb-14 opacity-100 translate-y-0"
          >
            <span className="text-[9px] sm:text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em]">
              TESTIMONI
            </span>
            <h2 className="text-[20px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] mt-1.5 sm:mt-3 tracking-[-0.02em] leading-[1.25] sm:leading-tight">
              Kata mereka yang sudah jalan<br className="hidden sm:inline" /> duluan.
            </h2>
            <p className="text-[11.5px] sm:text-[14.5px] text-[#6B7280] mt-2 sm:mt-4 max-w-[620px] sm:mx-auto leading-relaxed">
              Dari UMKM kuliner sampai startup teknologi — semua percayakan urusan legalnya ke EasyLegal.
            </p>
          </div>
        </div>

        <div
          ref={rowsRef}
          className="relative w-full overflow-hidden flex flex-col gap-1.5 sm:gap-2 mt-2 sm:mt-4 py-4 sm:py-8 opacity-100"
        >
          <div className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none" />

          <AutoScrollRow items={row1Reviews} direction="left" />
          <AutoScrollRow items={row2Reviews} direction="right" />
        </div>
      </section>

    </>
  );
}
