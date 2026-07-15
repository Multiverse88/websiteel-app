import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BannerSectionData } from '@/types/landing-page';

export default function BannerSection({ data }: { data: BannerSectionData }) {
  const inner = (
    <div className="relative w-full aspect-[4/1] md:aspect-[5/1] bg-gray-100 overflow-hidden">
      <Image
        src={data.image.url}
        alt={data.image.alt || 'Promo Banner'}
        fill
        className="object-cover"
      />
    </div>
  );

  if (data.link) {
    return <Link href={data.link} className="block w-full">{inner}</Link>;
  }

  return <div className="w-full">{inner}</div>;
}
