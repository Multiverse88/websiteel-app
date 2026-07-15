import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSectionData } from '@/types/landing-page';

export default function HeroSection({ data }: { data: HeroSectionData }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {data.headline}
            </h1>
            {data.subheadline && (
              <p className="text-lg text-gray-600">
                {data.subheadline}
              </p>
            )}
            {data.ctaText && data.ctaLink && (
              <div className="pt-4">
                <Link
                  href={data.ctaLink}
                  className="inline-flex px-8 py-4 bg-[#990202] text-white font-bold rounded-xl hover:bg-[#800000] transition-colors"
                >
                  {data.ctaText}
                </Link>
              </div>
            )}
          </div>
          {data.image && (
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              <Image
                src={data.image.url}
                alt={data.image.alt || 'Hero Image'}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
