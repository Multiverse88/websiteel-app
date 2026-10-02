import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: {
      absolute: "Jasa Pendaftaran Merek, Paten, dan Hak Cipta - EasyLegal",
    },
    description:
      "Butuh jasa pendaftaran Merek, Paten, Desain Industri, dan Hak Cipta? EasyLegal siap bantu lindungi aset HKI & Desain Industri Anda. Konsultasi gratis sekarang!",
    alternates: {
      canonical: `${baseUrl}/layanan/merek-haki`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Merek & HAKI", url: "/layanan/merek-haki" },
];

export default function MerekHakiLayout({
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
