import type { Metadata } from "next";
import { headers } from "next/headers";
import BadanUsahaTemplate from "@/components/layanan/BadanUsahaTemplate";
import { dataPT } from "@/data/layanan-badan-usaha";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: {
      absolute: "Jasa Pendirian PT - EasyLegal",
    },
    description:
      "Butuh jasa Pendirian PT? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp2 jutaan. Konsultasi gratis sekarang!",
    alternates: {
      canonical: `${baseUrl}/layanan/pendirian-badan-usaha`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Pendirian Badan Usaha", url: "/layanan/pendirian-badan-usaha" },
];

export default function PendirianBadanUsaha() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <BadanUsahaTemplate content={dataPT} />
    </>
  );
}
