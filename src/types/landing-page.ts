export type ImageAsset = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type HeroSectionData = {
  type: "hero";
  id: string;
  styles?: Record<string, any>;
  headline: string;
  subheadline?: string;
  image?: ImageAsset;
  ctaText?: string;
  ctaLink?: string;
};

export type BannerSectionData = {
  type: "banner";
  id: string;
  styles?: Record<string, any>;
  image: ImageAsset;
  link?: string;
};

export type FeaturesSectionData = {
  type: "features";
  id: string;
  styles?: Record<string, any>;
  title?: string;
  items: {
    image?: ImageAsset;
    title: string;
    desc: string;
  }[];
};

export type TestimonialsSectionData = {
  type: "testimonials";
  id: string;
  styles?: Record<string, any>;
  title?: string;
  items: {
    photo?: ImageAsset;
    name: string;
    quote: string;
  }[];
};

export type LeadFormSectionData = {
  type: "leadForm";
  id: string;
  styles?: Record<string, any>;
  title: string;
  subtitle?: string;
  fields: ("nama" | "email" | "no_hp" | "perusahaan")[];
  buttonText?: string;
};

export type RichTextSectionData = {
  type: "richText" | "text";
  id?: string;
  styles?: Record<string, any>;
  html?: string;
  content?: any;
};

export type SectionData =
  | HeroSectionData
  | BannerSectionData
  | FeaturesSectionData
  | TestimonialsSectionData
  | LeadFormSectionData
  | RichTextSectionData
  | { type: string; [key: string]: any };
