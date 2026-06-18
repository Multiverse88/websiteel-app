const SITE_URL = "https://easylegal.id";

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "EasyLegal",
    alternateName: "EasyLegal.id",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Layanan hukum dan legalitas bisnis terpercaya — Pendirian PT, Pendaftaran Merek, NIB & OSS, Sertifikasi ISO, dan lainnya.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "11000",
      bestRating: "5",
    },
    priceRange: "$$",
    telephone: "+6281123456789",
    sameAs: [
      "https://www.instagram.com/easylegal.id",
      "https://www.linkedin.com/company/easylegal",
    ],
  };
}

export function getServiceJsonLd(service: {
  name: string;
  description: string;
  url: string;
  price?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "LegalService",
      name: "EasyLegal",
      url: SITE_URL,
    },
    name: service.name,
    description: service.description,
    url: `${SITE_URL}${service.url}`,
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    ...(service.price && {
      offers: {
        "@type": "Offer",
        price: service.price,
        priceCurrency: "IDR",
      },
    }),
  };
}

export function getFAQJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getArticleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}/artikel/${article.slug}`,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: article.author || "EasyLegal",
    },
    publisher: {
      "@type": "Organization",
      name: "EasyLegal",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(article.image && {
      image: article.image.startsWith("http")
        ? article.image
        : `${SITE_URL}${article.image}`,
    }),
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EasyLegal",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/artikel?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
