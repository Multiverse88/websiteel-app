import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: {
      absolute: "Jasa Legalitas Dokumen Apostille - EasyLegal",
    },
    description:
      "Butuh jasa legalitas dokumen Apostille? Dapatkan layanan Apostille murah, cepat, dan 100% online yang aman & terpercaya di EasyLegal mulai 1 jutaan. Hubungi kami untuk konsultasi!",
    alternates: {
      canonical: `${baseUrl}/layanan/apostille`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Apostille", url: "/layanan/apostille" },
];

export default function ApostilleLayout({
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
