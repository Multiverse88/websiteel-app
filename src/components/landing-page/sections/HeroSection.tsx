import React from 'react';
import { posStyle, sectionScale } from '../utils';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSectionData } from '@/types/landing-page';

const DEFAULT_ORDER = ['badge', 'headline', 'subheadline', 'ctaButton', 'secondaryCta'];

export default function HeroSection({ data }: { data: HeroSectionData }) {
  const order = data.styles?.elementOrder || DEFAULT_ORDER;
  const pos = data.styles?.positions;

  const elements: Record<string, React.ReactNode> = {
    badge: (data as any).badge ? (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-5 bg-[#990202]/10 text-[#990202] border border-[#990202]/20" style={posStyle(pos, 'badge')}>
        {(data as any).badge}
      </span>
    ) : null,
    headline: (
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight" style={posStyle(pos, 'headline')}>
        {data.headline}
      </h1>
    ),
    subheadline: data.subheadline ? (
      <p className="text-[16px] text-gray-600" style={posStyle(pos, 'subheadline')}>
        {data.subheadline}
      </p>
    ) : null,
    ctaButton: data.ctaText && data.ctaLink ? (
      <div className="pt-4" style={posStyle(pos, 'ctaButton')}>
        <Link href={data.ctaLink} className="inline-flex px-8 py-4 bg-[#990202] text-white font-bold rounded-xl hover:bg-[#800000] transition-colors">
          {data.ctaText}
        </Link>
      </div>
    ) : null,
    secondaryCta: (data as any).secondaryCtaText ? (
      <div className="pt-4" style={posStyle(pos, 'secondaryCta')}>
        <Link href={(data as any).secondaryCtaLink || '#'} className="inline-flex px-8 py-4 bg-white text-gray-800 border border-gray-300 font-bold rounded-xl hover:bg-gray-50 transition-colors">
          {(data as any).secondaryCtaText}
        </Link>
      </div>
    ) : null,
  };

  const isButton = (key: string) => key === 'ctaButton' || key === 'secondaryCta';
  const textElements = order.filter((k: string) => !isButton(k) && elements[k]);
  const buttonElements = order.filter((k: string) => isButton(k) && elements[k]);

  

  return (
    <section className="bg-white py-16 sm:py-24" style={data.styles?.sectionHeight ? { minHeight: data.styles.sectionHeight } : {}}>
      <div style={sectionScale(data.styles) !== 1 ? { transform: `scale(${sectionScale(data.styles)})`, transformOrigin: 'top center', width: '100%' } : {}}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-6">
            {textElements.map((key: string) => (
              <div key={key}>{elements[key]}</div>
            ))}
            {buttonElements.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {buttonElements.map((key: string) => (
                  <div key={key}>{elements[key]}</div>
                ))}
              </div>
            )}
          </div>
          {data.image && (
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              <Image src={data.image.url} alt={data.image.alt || 'Hero Image'} fill className="object-contain" />
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
