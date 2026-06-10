"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

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

  const toggleFaq = (idx: number) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="bg-white py-24 border-b border-gray-100">
      <div className="max-w-[850px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-3"
        >
          <p className="text-[11px] font-black text-[#990202] uppercase tracking-[0.2em]">FAQ</p>
          <h2 className="font-inter text-[34px] sm:text-[38px] font-bold text-gray-950 leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-[15px] text-gray-500 leading-relaxed font-medium">
            {subtitle}
          </p>
        </motion.div>

        {/* Accordion Divider List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-t border-gray-100 divide-y divide-gray-100"
        >
          {items.map((faq, idx) => {
            const isExpanded = expandedIdx === idx;
            return (
              <div key={idx} className="py-7 sm:py-8 transition-all duration-200">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left focus:outline-none group cursor-pointer"
                >
                  <span className={`text-[16px] sm:text-[17px] font-bold leading-snug transition-colors duration-200 pr-6 ${isExpanded ? "text-[#990202]" : "text-gray-900 group-hover:text-[#990202]"}`}>
                    {faq.q}
                  </span>
                  
                  {/* Circle icon container */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isExpanded ? "bg-[#990202] text-white rotate-0 shadow-sm" : "bg-[#F3F4F6] text-gray-500 group-hover:bg-[#E5E7EB] group-hover:text-gray-900"}`}>
                    {isExpanded ? (
                      // Clean white 'X' icon
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      // Clean bold '+' icon
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-355 ease-in-out ${
                    isExpanded ? "max-h-[500px] mt-4" : "max-h-0"
      }`}
                >
                  <p 
                    className="text-[14.5px] text-gray-500 leading-relaxed font-medium pr-12"
                    dangerouslySetInnerHTML={{ __html: faq.a }}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

