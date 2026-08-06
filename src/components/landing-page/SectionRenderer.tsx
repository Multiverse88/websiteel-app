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
import PricingSection from './sections/PricingSection';
import FAQSection from './sections/FAQSection';
import CTASection from './sections/CTASection';

interface Props {
  section: SectionData;
  landingPageId?: string;
}

function unwrapContent(raw: any): any {
  if (raw?.content && typeof raw.content === 'object') {
    return { id: raw.id, type: raw.type, styles: raw.styles, ...raw.content };
  }
  return raw;
}

export default function SectionRenderer({ section, landingPageId }: Props) {
  const type = (section.type || '').toLowerCase();
  const data = unwrapContent(section);

  switch (type) {
    case 'hero':
      return <HeroSection data={data} />;
    case 'banner':
      return <BannerSection data={data} />;
    case 'features':
      return <FeaturesSection data={data} />;
    case 'testimonials':
      return <TestimonialsSection data={data} />;
    case 'leadform':
      return <LeadFormSection data={data} landingPageId={landingPageId} />;
    case 'richtext':
    case 'text':
      return <RichTextSection data={data} />;
    case 'promocards':
      return <PromoCardsSection data={data} />;
    case 'marketplacetrust':
      return <MarketplaceTrustSection data={data} />;
    case 'bottompromo':
      return <BottomPromoSection data={data} />;
    case 'pricing':
      return <PricingSection data={data} />;
    case 'faq':
      return <FAQSection data={data} />;
    case 'cta':
      return <CTASection data={data} />;
    default:
      return null;
  }
}
