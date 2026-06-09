import React from "react";
import { partnerLogos } from "./data";

export default function PartnerBar() {
  return (
    <section className="bg-white py-5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <span className="text-[12px] text-muted font-medium whitespace-nowrap">
            Bekerja dengan instansi resmi:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
            {partnerLogos.map((c, idx) => (
              <span key={idx} className="text-[12px] font-semibold text-dark/40 uppercase tracking-wide hover:text-dark/60 transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
