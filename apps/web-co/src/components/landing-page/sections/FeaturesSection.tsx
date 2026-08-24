import React from 'react';
import { posStyle, sectionScale } from '../utils';
import Image from 'next/image';
import { FeaturesSectionData } from '@/types/landing-page';

;

export default function FeaturesSection({ data }: { data: FeaturesSectionData }) {
  const pos = data.styles?.positions;
  
  

return (
    <section className="bg-gray-50 py-16 sm:py-24" style={data.styles?.sectionHeight ? { minHeight: data.styles.sectionHeight } : {}}>
      <div style={sectionScale(data.styles) !== 1 ? { transform: `scale(${sectionScale(data.styles)})`, transformOrigin: "top center", width: "100%" } : {}}>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative">
        {data.title && (
          <div style={posStyle(pos, 'title')}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-12">
              {data.title}
            </h2>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              {item.image && (
                <div className="relative w-16 h-16 mb-6">
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || item.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <h3 className="text-[16px] font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      </div>

    </section>
  );
}
