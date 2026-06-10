import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@prisma/client"],
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
};

export default nextConfig;
