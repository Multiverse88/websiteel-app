import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: "Jasa Kontrak Bisnis & Perjanjian — Legal Drafting Profesional",
    description:
      "Jasa pembuatan kontrak & perjanjian profesional untuk bisnis, UMKM, dan individu. Disusun oleh ahli hukum berpengalaman, sah secara hukum, dan sesuai regulasi di Indonesia.",
    alternates: {
      canonical: `${baseUrl}/layanan/kontrak-bisnis`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Kontrak Bisnis", url: "/layanan/kontrak-bisnis" },
];

export default function KontrakBisnisLayout({
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
