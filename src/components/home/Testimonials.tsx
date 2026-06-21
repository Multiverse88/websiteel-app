"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Star, Check } from "lucide-react";
import { row1Reviews, row2Reviews, trustedBy } from "./data";

function ReviewCard({ item }: { item: typeof row1Reviews[0] }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[280px] sm:w-[350px] flex-shrink-0 bg-white rounded-3xl p-6 border border-gray-150/70 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between text-left mx-3 transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-gray-250/90 hover:z-20 relative cursor-pointer block select-none"
    >
      <div>
        <div className="flex space-x-0.5 mb-3.5">
          {[1, 2, 3, 4, 5].map((s) => (
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
  );
}

function AutoScrollRow({ items, direction }: { items: typeof row1Reviews; direction: "left" | "right" }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const duplicated = [...items, ...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cardWidth = 380;
    const totalWidth = items.length * cardWidth;
    const startX = direction === "left" ? 0 : -totalWidth;
    const endX = direction === "left" ? -totalWidth : 0;

    gsap.set(track, { x: startX });

    const tween = gsap.to(track, {
      x: endX,
      duration: (totalWidth / 50),
      ease: "none",
      repeat: -1,
    });

    const handlePause = () => { setIsPaused(true); tween.pause(); };
    const handleResume = () => { setIsPaused(false); tween.resume(); };

    track.addEventListener("pointerenter", handlePause);
    track.addEventListener("pointerleave", handleResume);

    return () => {
      tween.kill();
      track.removeEventListener("pointerenter", handlePause);
      track.removeEventListener("pointerleave", handleResume);
    };
  }, [direction, items.length]);

  return (
    <div className="relative group">
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex cursor-grab active:cursor-grabbing">
          {duplicated.map((item, idx) => (
            <ReviewCard key={`${item.name}-${direction}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const trustedRef = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [rowsVisible, setRowsVisible] = useState(false);
  const [trustedVisible, setTrustedVisible] = useState(false);

  useEffect(() => {
    const els = [
      { el: headerRef.current, set: setHeaderVisible },
      { el: rowsRef.current, set: setRowsVisible },
      { el: trustedRef.current, set: setTrustedVisible },
    ];
    const observers: IntersectionObserver[] = [];
    els.forEach(({ el, set }) => {
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { set(true); obs.unobserve(el); }
      }, { rootMargin: "0px 0px -50px 0px" });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <section className="py-20 bg-[#F9FAFB] overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 text-center relative z-10">
          <div
            ref={headerRef}
            className={`mb-14 transition-all duration-600 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
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

        <div
          ref={rowsRef}
          className={`relative w-full overflow-hidden flex flex-col gap-2 mt-4 py-8 transition-all duration-700 delay-150 ${rowsVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none" />

          <AutoScrollRow items={row1Reviews} direction="left" />
          <AutoScrollRow items={row2Reviews} direction="right" />
        </div>
      </section>

      <section
        ref={trustedRef}
        className={`py-12 bg-bg-light border-y border-border transition-all duration-600 ${trustedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
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
