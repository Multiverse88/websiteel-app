export type ImageAsset = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type HeroSectionData = {
  type: "hero";
  id: string;
  headline: string;
  subheadline?: string;
  image?: ImageAsset;
  ctaText?: string;
  ctaLink?: string;
};

export type BannerSectionData = {
  type: "banner";
  id: string;
  image: ImageAsset;
  link?: string;
};

export type FeaturesSectionData = {
  type: "features";
  id: string;
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
  title: string;
  subtitle?: string;
  fields: ("nama" | "email" | "no_hp" | "perusahaan")[];
  buttonText?: string;
};

export type RichTextSectionData = {
  type: "richText" | "text";
  id?: string;
  html?: string;
  content?: any;
};

export type PromoCardsSectionData = {
  type: "promoCards" | "PromoCards";
  id?: string;
  content?: any;
  card1Tag?: string;
  card1Title?: string;
  card1Desc?: string;
  card1Icon?: string;
  card2Tag?: string;
  card2Title?: string;
  card2Badge?: string;
  card2Image?: string;
};

export type MarketplaceTrustSectionData = {
  type: "marketplaceTrust" | "MarketplaceTrust";
  id?: string;
  content?: any;
  headline?: string;
  marketplaceName?: string;
  marketplaceLogo?: string;
  image?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
};

export type BottomPromoSectionData = {
  type: "bottomPromo" | "BottomPromo";
  id?: string;
  content?: any;
  card1Tag?: string;
  card1Title?: string;
  card1Desc?: string;
  card2Tag?: string;
  card2Title?: string;
  card2Badge?: string;
  card2Image?: string;
  marketplaceTitle?: string;
  marketplaceLogo?: string;
  marketplaceImage?: string;
  marketplaceDesc?: string;
  marketplaceLink?: string;
};

export type GenericSectionData = {
  type: string;
  id?: string;
  content?: Record<string, any>;
  styles?: Record<string, any>;
  [key: string]: any;
};

export type SectionData =
  | HeroSectionData
  | BannerSectionData
  | FeaturesSectionData
  | TestimonialsSectionData
  | LeadFormSectionData
  | RichTextSectionData
  | PromoCardsSectionData
  | MarketplaceTrustSectionData
  | BottomPromoSectionData
  | GenericSectionData;
