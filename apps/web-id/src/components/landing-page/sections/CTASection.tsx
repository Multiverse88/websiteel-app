import React from 'react';
import { posStyle, sectionScale } from '../utils';
import Link from 'next/link';

interface Props {
  data: {
    badge?: string;
    title?: string;
    description?: string;
    buttonLink?: string;
    buttonText?: string;
    styles?: Record<string, any>;
    [key: string]: any;
  };
}

;

export default function CTASection({ data }: Props) {
  const styles = data.styles || {};
  const pos = styles.positions;

  const bgClass =
    styles.bgTheme === 'dark'
      ? 'bg-gray-900 text-white'
      : 'bg-[#990202] text-white';

  
  

return (
    <section
      className={`${bgClass} py-16 sm:py-24`}
      style={{ ...(data.styles?.sectionHeight ? { minHeight: data.styles.sectionHeight } : {}),  paddingTop: styles.paddingTop, paddingBottom: styles.paddingBottom, ...(styles.height ? { minHeight: styles.height } : {}) }}
    >
      <div style={sectionScale(data.styles) !== 1 ? { transform: `scale(${sectionScale(data.styles)})`, transformOrigin: "top center", width: "100%" } : {}}>

      <div className="max-w-[800px] mx-auto px-4 sm:px-8 text-center relative">
        {data.badge && (
          <div style={posStyle(pos, 'badge')}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-white/20">
              {data.badge}
            </span>
          </div>
        )}
        {data.title && (
          <div style={posStyle(pos, 'title')}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{data.title}</h2>
          </div>
        )}
        {data.description && (
          <div style={posStyle(pos, 'description')}>
            <p className="mt-4 text-sm sm:text-base opacity-90 max-w-xl mx-auto">{data.description}</p>
          </div>
        )}
        {data.buttonLink && (
          <div className="mt-8" style={posStyle(pos, 'ctaButton')}>
            <Link
              href={data.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 bg-white text-[#990202] font-bold rounded-xl shadow-lg hover:bg-gray-100 transition text-sm"
            >
              {data.buttonText || 'Hubungi Kami'}
            </Link>
          </div>
        )}
      </div>
      </div>

    </section>
  );
}
