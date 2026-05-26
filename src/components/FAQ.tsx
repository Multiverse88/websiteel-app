"use client";

import React, { useState } from "react";

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
  subtitle = "Sebelum hubungi kami, mungkin jawabannya sudah ada di sini.",
  items,
}: FAQProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="bg-white py-20 border-b border-gray-200/40">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">FAQ</p>
          <h2 className="font-inter text-[32px] sm:text-[40px] font-extrabold text-gray-950 leading-tight">
            {title}
          </h2>
          <p className="text-[14.5px] text-gray-500 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Accordion Divider List */}
        <div className="divide-y divide-gray-150 border-t border-b border-gray-150">
          {items.map((faq, idx) => {
            const isExpanded = expandedIdx === idx;
            return (
              <div key={idx} className="py-5 transition-all duration-200">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left focus:outline-none group cursor-pointer"
                >
                  <span className={`text-[16.5px] sm:text-[18px] font-bold leading-snug transition-colors duration-200 ${isExpanded ? "text-[#990202]" : "text-gray-900 group-hover:text-[#990202]"}`}>
                    {faq.q}
                  </span>
                  
                  {/* Circle icon container */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 ${isExpanded ? "bg-[#990202] text-white" : "bg-[#F3F4F6] text-gray-500 hover:bg-gray-200"}`}>
                    {isExpanded ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-[300px] mt-4" : "max-h-0"
                  }`}
                >
                  <p className="text-[14.5px] text-gray-500 leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
