import React from 'react';
import { SectionData } from '@/types/landing-page';
import HeroSection from './sections/HeroSection';
import BannerSection from './sections/BannerSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import LeadFormSection from './sections/LeadFormSection';
import RichTextSection from './sections/RichTextSection';

interface Props {
  section: SectionData;
  landingPageId?: string;
}

export default function SectionRenderer({ section, landingPageId }: Props) {
  switch (section.type) {
    case 'hero':
      return <HeroSection data={section} />;
    case 'banner':
      return <BannerSection data={section} />;
    case 'features':
      return <FeaturesSection data={section} />;
    case 'testimonials':
      return <TestimonialsSection data={section} />;
    case 'leadForm':
      return <LeadFormSection data={section} landingPageId={landingPageId} />;
    case 'richText':
      return <RichTextSection data={section} />;
    default:
      return <div>Unknown section type</div>;
  }
}
