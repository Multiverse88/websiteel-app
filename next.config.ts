import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

// Improved CSP policy - removes unsafe-eval for better security in production
const isProd = process.env.NODE_ENV === "production";

const ContentSecurityPolicy = isProd
  ? `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.youtube.com https://www.youtube-nocookie.com https://typebot.easylegal.my.id https://cdn.jsdelivr.net https://static.cloudflareinsights.com https://challenges.cloudflare.com https://connect.facebook.net https://googleads.g.doubleclick.net;
  style-src 'self' 'unsafe-inline' https://typebot.easylegal.my.id;
  img-src 'self' https: blob: data:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://sentry.io https://*.ingest.sentry.io https://typebot.easylegal.my.id https://cloudflareinsights.com https://ad.doubleclick.net https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://connect.facebook.net https://graph.facebook.com https://www.facebook.com;
  frame-src 'self' https://www.googletagmanager.com https://www.youtube.com https://www.youtube-nocookie.com https://typebot.easylegal.my.id;
  media-src 'self' https://www.youtube.com https://www.youtube-nocookie.com blob: data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  worker-src 'self' blob:;
`
  : `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.youtube.com https://www.youtube-nocookie.com https://typebot.easylegal.my.id https://cdn.jsdelivr.net https://static.cloudflareinsights.com https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline' https://typebot.easylegal.my.id;
  img-src 'self' https: blob: data:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' ws: wss: https://www.googletagmanager.com https://www.google-analytics.com https://sentry.io https://*.ingest.sentry.io https://typebot.easylegal.my.id https://cloudflareinsights.com;
  frame-src 'self' https://www.googletagmanager.com https://www.youtube.com https://www.youtube-nocookie.com https://typebot.easylegal.my.id;
  media-src 'self' https://www.youtube.com https://www.youtube-nocookie.com blob: data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  worker-src 'self' blob:;
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@prisma/client"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      // 1. PT
      { source: "/jasa-pembuatan-pt-jasa-pendirian-pt", destination: "/layanan/pendirian-badan-usaha/pt" },
      { source: "/jasa-pendirian-pt-gads", destination: "/layanan/pendirian-badan-usaha/pt" },
      { source: "/jasa-pt-bekasi-gads", destination: "/layanan/pendirian-badan-usaha/pt" },
      { source: "/jasa-pt-bandung-gads", destination: "/layanan/pendirian-badan-usaha/pt" },
      { source: "/lp-pendirian-pt-display-ads-dads", destination: "/layanan/pendirian-badan-usaha/pt" },
      { source: "/jasa-pendirian-pt-bandung-gdas-pmax", destination: "/layanan/pendirian-badan-usaha/pt" },
      { source: "/jasa-pendirian-pt-jasa-pembuatan-pt-ytads", destination: "/layanan/pendirian-badan-usaha/pt" },

      // 2. PT PMA
      { source: "/jasa-pembuatan-pt-pma-jasa-pendirian-pt-pma", destination: "/layanan/pendirian-badan-usaha/pt-pma" },
      { source: "/jasa-pendirian-pt-pma-gads", destination: "/layanan/pendirian-badan-usaha/pt-pma" },

      // 3. PT Perorangan
      { source: "/jasa-pembuatan-pt-perorangan-jasa-pendirian-pt-perorangan", destination: "/layanan/pendirian-badan-usaha/pt-perorangan" },
      { source: "/jasa-pembuatan-pt-perorangan-gads", destination: "/layanan/pendirian-badan-usaha/pt-perorangan" },

      // 4. CV
      { source: "/jasa-pembuatan-cv-jasa-pendirian-cv", destination: "/layanan/pendirian-badan-usaha/cv" },
      { source: "/jasa-pendirian-cv-gads", destination: "/layanan/pendirian-badan-usaha/cv" },
      { source: "/jasa-cv-bekasi-gads", destination: "/layanan/pendirian-badan-usaha/cv" },
      { source: "/jasa-cv-bandung-gads", destination: "/layanan/pendirian-badan-usaha/cv" },
      { source: "/lp-produk-cv-dads", destination: "/layanan/pendirian-badan-usaha/cv" },

      // 5. Yayasan
      { source: "/jasa-pembuatan-yayasan-jasa-pendirian-yayasan", destination: "/layanan/pendirian-badan-usaha/yayasan" },
      { source: "/jasa-pembuatan-yayasan-gads", destination: "/layanan/pendirian-badan-usaha/yayasan" },

      // 6. Perkumpulan
      { source: "/jasa-pembuatan-perkumpula-jasa-pendirian-perkumpulan", destination: "/layanan/pendirian-badan-usaha/perkumpulan" },
      { source: "/jasa-pendirian-perkumpulan-gads", destination: "/layanan/pendirian-badan-usaha/perkumpulan" },

      // 7. Firma
      { source: "/jasa-pembuatan-firma-jasa-pendirian-firma", destination: "/layanan/pendirian-badan-usaha/firma" },
      { source: "/pendirian-firma-gads", destination: "/layanan/pendirian-badan-usaha/firma" },

      // 8. Koperasi
      { source: "/jasa-pendirian-koperasi-jasa-pembuatan-koperasi-gads", destination: "/layanan/pendirian-badan-usaha/koperasi" },

      // 9. Merek & HAKI
      { source: "/jasa-pendaftaran-merek-dagang-daftar-merek-dagang", destination: "/layanan/merek-haki" },
      { source: "/meta-ads-merek", destination: "/layanan/merek-haki" },
      { source: "/lp-meta-ads-merek", destination: "/layanan/merek-haki" },
      { source: "/lp-iklan-metaads-easylegal", destination: "/layanan/merek-haki" },
      { source: "/jasa-pengurusan-merek-gads", destination: "/layanan/merek-haki" },
      { source: "/lp-produk-merek-gads2", destination: "/layanan/merek-haki" },
      { source: "/jasa-merek-bekasi-gads", destination: "/layanan/merek-haki" },
      { source: "/jasa-merek-bandung-gads", destination: "/layanan/merek-haki" },
      { source: "/lp-produk-merek-dads", destination: "/layanan/merek-haki" },
      { source: "/jasa-pembuatan-merek-jasa-pendirian-merek-ytads", destination: "/layanan/merek-haki" },

      // 10. Sertifikasi ISO
      { source: "/lp-sertifikasi-iso", destination: "/layanan/sertifikasi-iso" },
      { source: "/jasa-sertifikasi-iso-gads", destination: "/layanan/sertifikasi-iso" },
      { source: "/lp-sertifikasi-iso-ias-society", destination: "/layanan/sertifikasi-iso" },
      { source: "/lp-sertifikasi-iso-egac", destination: "/layanan/sertifikasi-iso" },
      { source: "/lp-sertifikasi-iso-ias-service", destination: "/layanan/sertifikasi-iso" },
      { source: "/lp-sertifikasi-iso-kan", destination: "/layanan/sertifikasi-iso" },
      { source: "/lp-sertifikasi-iso-uaf", destination: "/layanan/sertifikasi-iso" },

      // 11. NIB & OSS
      { source: "/jasa-pembuatan-nib-oss-rba-ahu-perizinan-usaha", destination: "/layanan/nib-oss" },
      { source: "/jasa-pembuatan-niboss-gads", destination: "/layanan/nib-oss" },

      // 12. Jasa Pembubaran
      { source: "/pembubaran-perusahaan-pt-cv-yayasan-perkumpulan", destination: "/layanan/pembubaran-perusahaan" },
      { source: "/jasa-pembubaran-perusahaan-gads", destination: "/layanan/pembubaran-perusahaan" },

      // 13. PSE (Penyelenggara Sistem Elektronik)
      { source: "/jasa-pengurusan-pse-pendaftaran-pse-penyelenggara-sistem-elektronik", destination: "/layanan/pengurusan-pse" },
      { source: "/jasa-pse-gads", destination: "/layanan/pengurusan-pse" },

      // 14. Perubahan Akta
      { source: "/biro-jasa-perubahan-akta-perusahaan-murah-cepat", destination: "/layanan/perubahan-akta" },
      { source: "/jasa-perubahan-akta-gads", destination: "/layanan/perubahan-akta" },

      // 15. PKP (Pengusaha Kena Pajak)
      { source: "/jasa-pengajuan-pkp-perusahaan-online-pengurusan-pkp-perusahaan-online", destination: "/layanan/pengajuan-pkp" },
      { source: "/jasa-pkp-gads", destination: "/layanan/pengajuan-pkp" },

      // 16. Press Release
      { source: "/jasa-press-release-media-online", destination: "/layanan/press-release" },
      { source: "/jasa-press-release-gads", destination: "/layanan/press-release" },
      { source: "/layanan/pr-media", destination: "/layanan/press-release" },

      // 17. PKKPR
      { source: "/lp-produk-pkkpr-gads", destination: "/layanan/pkkpr" },

      // 18. Kampanye Penawaran Umum & Form
      { source: "/meta-ads-legalitas", destination: "/layanan/virtual-office" }, // Fallback ke VO/legalitas all
      { source: "/lp-iklan-legalitas-metaads", destination: "/layanan/virtual-office" },
      { source: "/konsultasi-legal-bisnis", destination: "/kontak" }, // Arahkan langsung ke form Kontak
      { source: "/terima-kasih-konsultasi-legalitas-bisnis-metaads", destination: "/testimoni" },
      { source: "/testimoni-klien-gads", destination: "/testimoni" },
      { source: "/lp-produk-layanan-dads", destination: "/layanan/virtual-office" }
    ];
  },
  async redirects() {
    return [
      {
        source: "/layanan/pendirian-yayasan",
        destination: "/layanan/pendirian-badan-usaha/yayasan",
        permanent: true,
      },
    ];
  },
  images: {
    minimumCacheTTL: 31536000,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.easylegal.my.id',
      },
      {
        protocol: 'https',
        hostname: 'easylegal.my.id',
      },
      {
        protocol: 'https',
        hostname: 'easylegal.id',
      },
      {
        protocol: 'https',
        hostname: 'www.easylegal.id',
      },
    ],
  },
};

const sentryOptions = {
  org: "easy-legal",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  webpack: {
    automaticVercelMonitors: true,
    treeshake: { removeDebugLogging: true },
  },
};

export default process.env.NODE_ENV === "production"
  ? withSentryConfig(nextConfig, sentryOptions)
  : nextConfig;
