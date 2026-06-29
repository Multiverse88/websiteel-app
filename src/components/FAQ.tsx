"use client";
import React, { useState, useRef, useEffect } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export default function FAQ({
  title = "Pertanyaan yang sering ditanyakan.",
  subtitle = "Sebelum hubungi kami, mungkin jawabannya ada di sini.",
  items,
}: FAQProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [listVisible, setListVisible] = useState(false);

  useEffect(() => {
    const els = [headerRef.current, listRef.current];
    const observers: IntersectionObserver[] = [];
    els.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          i === 0 ? setHeaderVisible(true) : setListVisible(true);
          obs.unobserve(el);
        }
      }, { rootMargin: "-50px" });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggleFaq = (idx: number) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="bg-white py-8 sm:py-24">
      <div className="max-w-[850px] mx-auto px-4 sm:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-8 sm:mb-16 space-y-2 sm:space-y-3 transition-all duration-500 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <p className="text-[9px] sm:text-[11px] font-black text-[#990202] uppercase tracking-[0.2em]">FAQ</p>
          <h2 className="font-heading text-[20px] sm:text-[38px] font-bold text-gray-950 leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-[12.5px] sm:text-[15px] text-gray-500 leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>

        <div
          ref={listRef}
          className={`space-y-3 sm:space-y-4 transition-all duration-500 delay-200 ${listVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          {items.map((faq, idx) => {
            const isExpanded = expandedIdx === idx;
            return (
              <div key={idx} className={`py-4 sm:py-6 px-4 sm:px-7 rounded-xl sm:rounded-2xl transition-all duration-300 ${isExpanded ? "bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]" : "bg-[#F9FAFB] hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"}`}>
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left focus:outline-none group cursor-pointer"
                >
                  <span className={`text-sm sm:text-[17px] font-bold leading-snug transition-colors duration-200 pr-4 sm:pr-6 ${isExpanded ? "text-[#990202]" : "text-gray-900 group-hover:text-[#990202]"}`}>
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isExpanded ? "bg-[#990202] text-white rotate-0 shadow-sm" : "bg-[#F3F4F6] text-gray-500 group-hover:bg-[#E5E7EB] group-hover:text-gray-900"}`}>
                    {isExpanded ? (
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-[500px] mt-3 sm:mt-4" : "max-h-0"
                  }`}
                >
                  <p
                    className="text-[12.5px] sm:text-[14.5px] text-gray-500 leading-relaxed font-medium pr-4 sm:pr-12"
                    dangerouslySetInnerHTML={{ __html: faq.a }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
