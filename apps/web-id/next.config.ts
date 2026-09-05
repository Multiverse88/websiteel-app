import type { NextConfig } from "next";

// Improved CSP policy - removes unsafe-eval for better security in production
const isProd = process.env.NODE_ENV === "production";

const ContentSecurityPolicy = isProd
  ? `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.youtube.com https://www.youtube-nocookie.com https://typebot.easylegal.my.id https://typebot.easylegal.biz.id https://cdn.jsdelivr.net https://static.cloudflareinsights.com https://challenges.cloudflare.com https://connect.facebook.net https://googleads.g.doubleclick.net https://tgtag.io;
  style-src 'self' 'unsafe-inline' https://typebot.easylegal.my.id https://typebot.easylegal.biz.id;
  img-src 'self' https: blob: data:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.easylegal.my.id ws: wss: https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://typebot.easylegal.my.id https://typebot.easylegal.biz.id https://cloudflareinsights.com https://ad.doubleclick.net https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://connect.facebook.net https://graph.facebook.com https://www.facebook.com https://*.ecs.us-east-1.on.aws https://*.us-central1.run.app https://tgtag.io;
  frame-src 'self' https://www.googletagmanager.com https://www.youtube.com https://www.youtube-nocookie.com https://typebot.easylegal.my.id https://typebot.easylegal.biz.id https://www.facebook.com;
  media-src 'self' https://www.youtube.com https://www.youtube-nocookie.com blob: data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://www.facebook.com;
  frame-ancestors 'self' https://tagassistant.google.com;
  worker-src 'self' blob:;
`
  : `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.youtube.com https://www.youtube-nocookie.com https://typebot.easylegal.my.id https://typebot.easylegal.biz.id https://cdn.jsdelivr.net https://static.cloudflareinsights.com https://challenges.cloudflare.com https://connect.facebook.net https://googleads.g.doubleclick.net https://tgtag.io;
  style-src 'self' 'unsafe-inline' https://typebot.easylegal.my.id https://typebot.easylegal.biz.id;
  img-src 'self' https: blob: data:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.easylegal.my.id ws: wss: https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://typebot.easylegal.my.id https://typebot.easylegal.biz.id https://cloudflareinsights.com https://ad.doubleclick.net https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://connect.facebook.net https://graph.facebook.com https://www.facebook.com https://*.ecs.us-east-1.on.aws https://*.us-central1.run.app https://tgtag.io;
  frame-src 'self' https://www.googletagmanager.com https://www.youtube.com https://www.youtube-nocookie.com https://typebot.easylegal.my.id https://typebot.easylegal.biz.id;
  media-src 'self' https://www.youtube.com https://www.youtube-nocookie.com blob: data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self' https://tagassistant.google.com;
  worker-src 'self' blob:;
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // No X-Frame-Options header: CSP's frame-ancestors above is the modern
  // replacement and takes precedence in every evergreen browser when both
  // are present, so a static XFO: DENY here would just silently override
  // frame-ancestors' tagassistant.google.com allowance for legacy UAs that
  // don't understand frame-ancestors — while adding no real protection for
  // the UAs that matter, which already honor CSP.
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
  // Next.js's default trailingSlash:false behavior 308-redirects any
  // /path/ -> /path *before* middleware gets a say — this flag hands that
  // decision to middleware.ts instead (which rewrites trailing-slash URLs
  // internally, invisibly, avoiding the visible "Redirecting you to..."
  // interstitial some browsers show on the default redirect+Refresh-header
  // combo). Without this flag, middleware's rewrite was silently ignored.
  skipTrailingSlashRedirect: true,
  serverExternalPackages: ["@prisma/client"],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    let minioInternal = process.env.MINIO_ENDPOINT || "http://157.10.252.77:9000";
    if (!minioInternal.includes("://")) {
      minioInternal = `https://${minioInternal}`;
    }
    return [
            // Proxy CDN directories to MinIO
      { source: "/images/:path*", destination: `${minioInternal}/images/:path*` },
      { source: "/icon-brand/:path*", destination: `${minioInternal}/images/icon-brand/:path*` },
      { source: "/logo-berita/:path*", destination: `${minioInternal}/images/logo-berita/:path*` },
      { source: "/promo/:path*", destination: `${minioInternal}/images/promo/:path*` },
      { source: "/teamplalo/:path*", destination: `${minioInternal}/images/teamplalo/:path*` },
      { source: "/testimoni/:path*", destination: `${minioInternal}/images/testimoni/:path*` },
      { source: "/uploads/:path*", destination: `${minioInternal}/images/uploads/:path*` },

      // Proxy top-level files to MinIO
      { source: "/Logo EL.png", destination: `${minioInternal}/images/Logo EL.png` },
      { source: "/Logo%20EL.png", destination: `${minioInternal}/images/Logo EL.png` },
      { source: "/ISO-27001-2022.webp", destination: `${minioInternal}/images/ISO-27001-2022.webp` },
      { source: "/ISO-sertifikat-scaled.jpg", destination: `${minioInternal}/images/ISO-sertifikat-scaled.jpg` },
      { source: "/cerita-kami-team.webp", destination: `${minioInternal}/images/cerita-kami-team.webp` },
      { source: "/Container.png", destination: `${minioInternal}/images/Container.png` },
      { source: "/cta-bg-glow.jpg", destination: `${minioInternal}/images/cta-bg-glow.jpg` },
      { source: "/EasyLegal.id_-scaled.jpg", destination: `${minioInternal}/images/EasyLegal.id_-scaled.jpg` },
      { source: "/EasyLegal-Shopee.png", destination: `${minioInternal}/images/EasyLegal-Shopee.png` },
      { source: "/Fast Track.png", destination: `${minioInternal}/images/Fast Track.png` },
      { source: "/Fast%20Track.png", destination: `${minioInternal}/images/Fast Track.png` },
      { source: "/hero-tentang-kami.webp", destination: `${minioInternal}/images/hero-tentang-kami.webp` },
      { source: "/nib-desk-mockup.webp", destination: `${minioInternal}/images/nib-desk-mockup.webp` },
      { source: "/Main big photo_ business person workingconsulting.png", destination: `${minioInternal}/images/Main big photo_ business person workingconsulting.png` },
      { source: "/Main%20big%20photo_%20business%20person%20workingconsulting.png", destination: `${minioInternal}/images/Main big photo_ business person workingconsulting.png` },
      { source: "/favicon.ico", destination: `${minioInternal}/images/favicon.ico` },
      { source: "/apple-touch-icon.png", destination: `${minioInternal}/images/apple-touch-icon.png` },
      { source: "/icon-192.png", destination: `${minioInternal}/images/icon-192.png` },
      { source: "/icon-512.png", destination: `${minioInternal}/images/icon-512.png` },

      // Home & General
      { source: "/home-gads", destination: "/" },

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
      { source: "/lp-produk-layanan-dads", destination: "/layanan/virtual-office" },

      // Tambahan URL Iklan Baru (Rewrites agar URL tetap tidak berubah di Ads)
      { source: "/jasa-pembuatan-koperasi", destination: "/layanan/pendirian-badan-usaha/koperasi" },
      { source: "/jasa-pengurusan-pkp-2", destination: "/layanan/pengajuan-pkp" },
      { source: "/lp-produk-iso", destination: "/layanan/sertifikasi-iso" },
      { source: "/firma", destination: "/layanan/pendirian-badan-usaha/firma" },
      { source: "/jasa-pendaftaran-pt-pma-terpercaya", destination: "/layanan/pendirian-badan-usaha/pt-pma" },
      { source: "/jasa-pembuatan-pendirian-pt-indonesia", destination: "/layanan/pendirian-badan-usaha/pt" },

      // === Google Ads EL.id — URL Pendek ===
      { source: "/gads-rekomendasi-nama-pt", destination: "/layanan/pendirian-badan-usaha" },
      { source: "/gads-pendirian-pt-pma", destination: "/layanan/pendirian-badan-usaha/pt-pma" },
      { source: "/gads-pendirian-pt-perorangan", destination: "/layanan/pendirian-badan-usaha/pt-perorangan" },
      { source: "/gads-pendirian-cv", destination: "/layanan/pendirian-badan-usaha/cv" },
      { source: "/gads-pendirian-yayasan", destination: "/layanan/pendirian-badan-usaha/yayasan" },
      { source: "/gads-pendirian-perkumpulan", destination: "/layanan/pendirian-badan-usaha/perkumpulan" },
      { source: "/gads-pendirian-firma", destination: "/layanan/pendirian-badan-usaha/firma" },
      { source: "/gads-pendirian-koperasi", destination: "/layanan/pendirian-badan-usaha/koperasi" },
      { source: "/gads-merek-haki", destination: "/layanan/merek-haki" },
      { source: "/gads-iso", destination: "/layanan/sertifikasi-iso" },
      { source: "/gads-nib-oss", destination: "/layanan/nib-oss" },
      { source: "/gads-pembubaran-perusahaan", destination: "/layanan/pembubaran-perusahaan" },
      { source: "/gads-pse", destination: "/layanan/pengurusan-pse" },
      { source: "/gads-perubahan-akta", destination: "/layanan/perubahan-akta" },
      { source: "/gads-pkp", destination: "/layanan/pengajuan-pkp" },
      { source: "/gads-press-release", destination: "/layanan/press-release" },
      { source: "/gads-pkkpr", destination: "/layanan/pkkpr" },
      { source: "/gads-virtual-office", destination: "/layanan/virtual-office" },
      { source: "/gads-pelaporan-rups", destination: "/layanan/pelaporan-rups" },
      { source: "/gads-pelaporan-lkpm", destination: "/layanan/pelaporan-lkpm" },
      { source: "/gads-apostille", destination: "/layanan/apostille" },
      { source: "/gads-visa-kitas", destination: "/layanan/visa-kitas" },
      { source: "/gads-perjanjian-perkawinan", destination: "/layanan/perjanjian-perkawinan" },
      { source: "/gads-kontrak-bisnis", destination: "/layanan/kontrak-bisnis" },

      // === Google Ads EL.id — Display Ads (DADS) ===
      { source: "/dads-pendirian-pt", destination: "/layanan/pendirian-badan-usaha/pt" },
      { source: "/dads-pendirian-cv", destination: "/layanan/pendirian-badan-usaha/cv" },
      { source: "/dads-merek", destination: "/layanan/merek-haki" },
      { source: "/dads-iso", destination: "/layanan/sertifikasi-iso" },
      { source: "/dads-layanan", destination: "/layanan/virtual-office" },

      // === Google Ads EL.id — YouTube Ads (YTADS) ===
      { source: "/ytads-pendirian-pt", destination: "/layanan/pendirian-badan-usaha/pt" },
      { source: "/ytads-merek", destination: "/layanan/merek-haki" },

      // === Google Ads EL.id — Performance Max (PMAX) ===
      { source: "/pmax-pendirian-pt", destination: "/layanan/pendirian-badan-usaha/pt" },

      // === SEO easylegal.id — Halaman Menu ===
      { source: "/kontak-kami", destination: "/kontak" },
      { source: "/testimoni-klien", destination: "/testimoni" },

      // === Google Ads EL.id — Halaman Tambahan dari Spreadsheet ===
      { source: "/jasa-kontak-kami-gads", destination: "/kontak" },
      { source: "/jasa-pelaporan-rups-gads", destination: "/layanan/pelaporan-rups" },
      { source: "/jasa-pembuatan-nib-oss-rba-ahu-perizinan-usaha-gads", destination: "/layanan/nib-oss" },
      { source: "/jasa-apostille-gads", destination: "/layanan/apostille" },
      { source: "/perjanjian-pisah-harta-perkawinan", destination: "/layanan/perjanjian-perkawinan" },
      { source: "/jasa-sertifikasi-halal", destination: "/layanan/sertifikasi-iso" },

      // === Meta Ads EL.id ===
      { source: "/meta-ads-pendirian-pt", destination: "/layanan/pendirian-badan-usaha/pt" },
      { source: "/meta-ads-pendirian-cv", destination: "/layanan/pendirian-badan-usaha/cv" },
      { source: "/meta-ads-pendirian-pt-cv", destination: "/layanan/pendirian-badan-usaha" },
      { source: "/meta-ads-iso", destination: "/layanan/sertifikasi-iso" },
      { source: "/meta-ads-nib", destination: "/layanan/nib-oss" },
      { source: "/meta-ads-pse", destination: "/layanan/pengurusan-pse" },
      // === Meta Ads EL.id — Halaman Tambahan dari Spreadsheet ===
      { source: "/jasa-pelaporan-rups-metaads", destination: "/layanan/pelaporan-rups" },
      { source: "/thankyoupage-konsultasi-pelaporan-rups-metaads", destination: "/testimoni" },
      { source: "/jasa-penyesuaian-kbli-1-metaads", destination: "/layanan/nib-oss" },
      { source: "/jasa-penyesuaian-kbli-2-metaads", destination: "/layanan/nib-oss" },
      { source: "/jasa-penyesuaian-kbli-3-metaads", destination: "/layanan/nib-oss" },
      { source: "/thankyoupage-konsultasi-penyesuaian-kbli-metaads", destination: "/testimoni" },
      { source: "/layanan-easylegal-metaads", destination: "/tentang-kami" },
      { source: "/thankyoupage-layanan-easylegal-metaads", destination: "/testimoni" },
      { source: "/meta-ads-pkp", destination: "/layanan/pengajuan-pkp" },
      { source: "/meta-ads-perubahan-akta", destination: "/layanan/perubahan-akta" },
      { source: "/meta-ads-press-release", destination: "/layanan/press-release" },
      { source: "/meta-ads-pembubaran", destination: "/layanan/pembubaran-perusahaan" },
      { source: "/meta-ads-virtual-office", destination: "/layanan/virtual-office" }
    ];
  },
  async redirects() {
    return [
      {
        // Catch-all untuk variasi kata kunci organik (jasa-pendirian, jasa-pembuatan, dll)
        // secara otomatis di-redirect ke halaman layanan aslinya.
        // Contoh: /jasa-pendirian-cv -> /layanan/pendirian-badan-usaha/cv
        source: "/:prefix(jasa-pendirian|jasa-pembuatan|pendirian|pembuatan)-:type(pt|pt-pma|pt-perorangan|cv|yayasan|firma|koperasi|perkumpulan)",
        destination: "/layanan/pendirian-badan-usaha/:type",
        permanent: true,
      },
      {
        source: "/layanan/pendirian-yayasan",
        destination: "/layanan/pendirian-badan-usaha/yayasan",
        permanent: true,
      },
      {
        // Marketing shortlink -> scrolls straight to the promo section on
        // the homepage (id="promo" in BottomPromoSection.tsx).
        source: "/promo",
        destination: "/#promo",
        permanent: false,
      },

      // === LP SEO — Redirect dari Excel "New URL" ke App URL ===
      // Excel pakai /layanan/jasa-*, app pakai /layanan/pendirian-badan-usaha/* atau /layanan/merek-haki etc.
      { source: "/layanan/jasa-pendirian-pt", destination: "/layanan/pendirian-badan-usaha/pt", permanent: true },
      { source: "/layanan/jasa-pendirian-pt-pma", destination: "/layanan/pendirian-badan-usaha/pt-pma", permanent: true },
      { source: "/layanan/jasa-pendirian-pt-perorangan", destination: "/layanan/pendirian-badan-usaha/pt-perorangan", permanent: true },
      { source: "/layanan/jasa-pendirian-cv", destination: "/layanan/pendirian-badan-usaha/cv", permanent: true },
      { source: "/layanan/jasa-pendirian-yayasan", destination: "/layanan/pendirian-badan-usaha/yayasan", permanent: true },
      { source: "/layanan/jasa-pendirian-perkumpulan", destination: "/layanan/pendirian-badan-usaha/perkumpulan", permanent: true },
      { source: "/layanan/jasa-pendirian-firma", destination: "/layanan/pendirian-badan-usaha/firma", permanent: true },
      { source: "/layanan/jasa-pendirian-koperasi", destination: "/layanan/pendirian-badan-usaha/koperasi", permanent: true },
      { source: "/layanan/jasa-pembubaran-perusahaan", destination: "/layanan/pembubaran-perusahaan", permanent: true },
      { source: "/layanan/jasa-pendaftaran-merek", destination: "/layanan/merek-haki", permanent: true },
      { source: "/layanan/jasa-sertifikasi-iso", destination: "/layanan/sertifikasi-iso", permanent: true },
      { source: "/layanan/jasa-sertifikasi-iso-ias-society", destination: "/layanan/sertifikasi-iso", permanent: true },
      { source: "/layanan/jasa-sertifikasi-iso-egac", destination: "/layanan/sertifikasi-iso", permanent: true },
      { source: "/layanan/jasa-sertifikasi-iso-ias-service", destination: "/layanan/sertifikasi-iso", permanent: true },
      { source: "/layanan/jasa-sertifikasi-iso-kan", destination: "/layanan/sertifikasi-iso", permanent: true },
      { source: "/layanan/jasa-sertifikasi-iso-uaf", destination: "/layanan/sertifikasi-iso", permanent: true },
      { source: "/layanan/jasa-pengurusan-nib-oss", destination: "/layanan/nib-oss", permanent: true },
      { source: "/layanan/jasa-pengurusan-izin-pse", destination: "/layanan/pengurusan-pse", permanent: true },
      { source: "/layanan/jasa-perubahan-akta", destination: "/layanan/perubahan-akta", permanent: true },
      { source: "/layanan/jasa-pengurusan-pkp", destination: "/layanan/pengajuan-pkp", permanent: true },
      { source: "/layanan/jasa-press-release-media-online", destination: "/layanan/press-release", permanent: true },

      // === Local SEO — Catch-all redirect per service type ===
      // Excel pakai /layanan/jasa-pendirian-pt/:kota, app pakai /layanan/pendirian-badan-usaha/pt/:kota
      // 9 patterns menangkap 1.150 halaman lokal
      {
        source: "/layanan/jasa-pendirian-pt/:kota",
        destination: "/layanan/pendirian-badan-usaha/pt/:kota",
        permanent: true,
      },
      {
        source: "/layanan/jasa-pendirian-pt-pma/:kota",
        destination: "/layanan/pendirian-badan-usaha/pt-pma/:kota",
        permanent: true,
      },
      {
        source: "/layanan/jasa-pendirian-pt-perorangan/:kota",
        destination: "/layanan/pendirian-badan-usaha/pt-perorangan/:kota",
        permanent: true,
      },
      {
        source: "/layanan/jasa-pendirian-cv/:kota",
        destination: "/layanan/pendirian-badan-usaha/cv/:kota",
        permanent: true,
      },
      {
        source: "/layanan/jasa-pendirian-yayasan/:kota",
        destination: "/layanan/pendirian-badan-usaha/yayasan/:kota",
        permanent: true,
      },
      {
        source: "/layanan/jasa-pendirian-perkumpulan/:kota",
        destination: "/layanan/pendirian-badan-usaha/perkumpulan/:kota",
        permanent: true,
      },
      {
        source: "/layanan/jasa-pendirian-firma/:kota",
        destination: "/layanan/pendirian-badan-usaha/firma/:kota",
        permanent: true,
      },
      {
        source: "/layanan/jasa-pendirian-koperasi/:kota",
        destination: "/layanan/pendirian-badan-usaha/koperasi/:kota",
        permanent: true,
      },
      {
        source: "/layanan/jasa-pendaftaran-merek/:kota",
        destination: "/layanan/merek-haki/:kota",
        permanent: true,
      },
      {
        source: "/layanan/jasa-pengurusan-pkp/:kota",
        destination: "/layanan/pengajuan-pkp/:kota",
        permanent: true,
      },
      {
        source: "/layanan/jasa-pengurusan-nib-oss/:kota",
        destination: "/layanan/nib-oss/:kota",
        permanent: true,
      },
      {
        source: "/layanan/jasa-pengurusan-izin-pse/:kota",
        destination: "/layanan/pengurusan-pse/:kota",
        permanent: true,
      },
      {
        source: "/layanan/jasa-perubahan-akta/:kota",
        destination: "/layanan/perubahan-akta/:kota",
        permanent: true,
      },
      {
        source: "/layanan/jasa-pembubaran-perusahaan/:kota",
        destination: "/layanan/pembubaran-perusahaan/:kota",
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
        protocol: 'http',
        hostname: 'easylegal.my.id',
      },
      {
        protocol: 'https',
        hostname: 'easylegal.biz.id',
      },
      {
        protocol: 'http',
        hostname: 'easylegal.biz.id',
      },
      {
        protocol: 'https',
        hostname: 'easylegal.id',
      },
      {
        protocol: 'http',
        hostname: 'easylegal.id',
      },
      {
        protocol: 'https',
        hostname: 'www.easylegal.id',
      },
      {
        protocol: 'http',
        hostname: 'www.easylegal.id',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

export default nextConfig;
