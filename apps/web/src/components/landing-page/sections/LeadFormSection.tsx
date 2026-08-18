import React from 'react';
import { posStyle, sectionScale } from '../utils';
import { LeadFormSectionData } from '@/types/landing-page';


export default function LeadFormSection({ data }: { data: LeadFormSectionData }) {
  const pos = data.styles?.positions;

  
  

return (
    <section className="bg-[#FFF5F5] py-16 sm:py-24 border-y border-red-100/50" style={data.styles?.sectionHeight ? { minHeight: data.styles.sectionHeight } : {}}>
      <div style={sectionScale(data.styles) !== 1 ? { transform: `scale(${sectionScale(data.styles)})`, transformOrigin: "top center", width: "100%" } : {}}>

      <div className="max-w-2xl mx-auto px-4 sm:px-8 relative">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-red-50 text-center">
          <div style={posStyle(pos, 'title')}>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{data.title}</h2>
          </div>
          {data.subtitle && (
            <div style={posStyle(pos, 'subtitle')}>
              <p className="text-gray-600 mb-8">{data.subtitle}</p>
            </div>
          )}
          <div className="p-4 bg-green-50 text-green-700 rounded-xl font-medium border border-green-200 text-sm">
            Formulir tersedia di live site
          </div>
        </div>
      </div>
      </div>

    </section>
  );
}
