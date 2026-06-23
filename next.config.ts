import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

// Improved CSP policy - removes unsafe-eval for better security in production
const isProd = process.env.NODE_ENV === "production";

const ContentSecurityPolicy = isProd
  ? `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  script-src-elem 'self' 'unsafe-inline' https://www.youtube.com https://www.youtube-nocookie.com https://typebot.easylegal.my.id https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://typebot.easylegal.my.id;
  img-src 'self' https: blob: data:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://sentry.io https://*.ingest.sentry.io https://typebot.easylegal.my.id;
  frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://typebot.easylegal.my.id;
  media-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  worker-src 'self' blob:;
`
  : `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.youtube-nocookie.com https://typebot.easylegal.my.id https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://typebot.easylegal.my.id;
  img-src 'self' https: blob: data:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' ws: wss: https://sentry.io https://*.ingest.sentry.io https://typebot.easylegal.my.id;
  frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://typebot.easylegal.my.id;
  media-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
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
