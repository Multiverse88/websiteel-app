"use client";

import React from "react";

export interface BenefitCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export interface BenefitsProps {
  sectionTitleTag: string;
  sectionTitle: string;
  sectionSubtitle?: string;
  items: BenefitCard[];
}

export default function Benefits({
  sectionTitleTag,
  sectionTitle,
  sectionSubtitle,
  items
}: BenefitsProps) {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-gray-200/40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">
            {sectionTitleTag}
          </p>
          <h2 className="font-inter text-[32px] sm:text-[40px] font-extrabold text-gray-950 leading-tight">
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p className="text-[14.5px] text-gray-500 font-medium leading-relaxed">
              {sectionSubtitle}
            </p>
          )}
        </div>

        {/* Benefits Grid - exactly 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-55/60 shadow-md border border-black/[0.03] rounded-3xl p-6.5 hover:shadow-md hover:border-gray-200 transition-all duration-300 flex flex-col space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
            >
              {/* White Box for the Red Icon */}
              <div className="w-10 h-10 bg-white shadow-md border border-black/[0.03] rounded-xl flex items-center justify-center text-[#990202] flex-shrink-0 shadow-sm">
                {item.icon}
              </div>
              
              <div className="space-y-1.5">
                <h3 className="text-[16.5px] font-extrabold text-gray-950 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
