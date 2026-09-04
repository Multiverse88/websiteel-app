import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: "Press Release — Distribusi Berita ke 3.998 Media Nasional",
    description:
      "Layanan press release & rilis berita profesional. Distribusi ke media nasional, SEO-optimized, laporanreach & clipping.",
    alternates: {
      canonical: `${baseUrl}/layanan/press-release`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Press Release", url: "/layanan/press-release" },
];

export default function PressReleaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      {children}
    </>
  );
}
