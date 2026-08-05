import React from 'react';
import { SectionData } from '@/types/landing-page';
import HeroSection from './sections/HeroSection';
import BannerSection from './sections/BannerSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import LeadFormSection from './sections/LeadFormSection';
import RichTextSection from './sections/RichTextSection';
import PromoCardsSection from './sections/PromoCardsSection';
import MarketplaceTrustSection from './sections/MarketplaceTrustSection';
import BottomPromoSection from './sections/BottomPromoSection';

interface Props {
  section: SectionData;
  landingPageId?: string;
}

export default function SectionRenderer({ section, landingPageId }: Props) {
  const type = (section.type || '').toLowerCase();
  const anySection = section as any;

  switch (type) {
    case 'hero':
      return <HeroSection data={anySection} />;
    case 'banner':
      return <BannerSection data={anySection} />;
    case 'features':
      return <FeaturesSection data={anySection} />;
    case 'testimonials':
      return <TestimonialsSection data={anySection} />;
    case 'leadform':
      return <LeadFormSection data={anySection} landingPageId={landingPageId} />;
    case 'richtext':
    case 'text':
      return <RichTextSection data={anySection} />;
    case 'promocards':
      return <PromoCardsSection data={anySection} />;
    case 'marketplacetrust':
      return <MarketplaceTrustSection data={anySection} />;
    case 'bottompromo':
      return <BottomPromoSection data={anySection} />;
    default:
      return null;
  }
}
