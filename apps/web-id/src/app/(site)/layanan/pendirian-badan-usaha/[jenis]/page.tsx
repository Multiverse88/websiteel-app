import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { headers } from "next/headers";
import BadanUsahaTemplate from "@/components/layanan/BadanUsahaTemplate";
import { contentMap } from "@/data/layanan-badan-usaha";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export function generateStaticParams() {
  return Object.keys(contentMap).map((jenis) => ({ jenis }));
}
const JENIS_SEO_METADATA: Record<string, { title: string; description: string }> = {
  pt: {
    title: "Jasa Pendirian PT - EasyLegal",
    description:
      "Butuh jasa Pendirian PT? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp2 jutaan. Konsultasi gratis sekarang!",
  },
  "pt-pma": {
    title: "Jasa Pendirian PT PMA - EasyLegal",
    description:
      "Butuh jasa Pendirian PT PMA? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp8 jutaan. Konsultasi gratis sekarang!",
  },
  "pt-perorangan": {
    title: "Jasa Pendirian PT Perorangan Murah & Cepat - EasyLegal",
    description:
      "Butuh jasa Pendirian PT Perorangan? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, legal, dan praktis. Biaya terjangkau mulai dari Rp700 ribuan. Konsultasi gratis sekarang!",
  },
  cv: {
    title: "Jasa Pendirian CV - EasyLegal",
    description:
      "Butuh Jasa Pendirian CV? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp1 jutaan. Konsultasi gratis sekarang!",
  },
  yayasan: {
    title: "Jasa Pendirian Yayasan - EasyLegal",
    description:
      "Butuh jasa Pendirian Yayasan? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp3 jutaan. Konsultasi gratis sekarang!",
  },
  perkumpulan: {
    title: "Jasa Pendirian Perkumpulan / Komunitas - EasyLegal",
    description:
      "Butuh jasa Pendirian Perkumpulan atau Komunitas? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp3 jutaan. Konsultasi gratis sekarang!",
  },
  firma: {
    title: "Jasa Pendirian Firma - EasyLegal",
    description:
      "Butuh jasa Pendirian Firma? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp1 jutaan. Konsultasi gratis sekarang!",
  },
  koperasi: {
    title: "Jasa Pendirian Koperasi - EasyLegal",
    description:
      "Butuh jasa Pendirian Koperasi? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp3 jutaan. Konsultasi gratis sekarang!",
  },
};


export async function generateMetadata({
  params,
}: {
  params: Promise<{ jenis: string }>;
}): Promise<Metadata> {
  const { jenis } = await params;
  const content = contentMap[jenis];
  if (!content) return {};

  // Canonical must follow whichever domain served the request (this app is
  // multi-tenant, see src/lib/domains.ts) — hardcoding easylegal.biz.id here
  // would tell Google every other domain's copy of this page is a
  // duplicate, so e.g. easylegal.co.id would never rank for it.
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  const seo = JENIS_SEO_METADATA[jenis];
  return {
    title: seo
      ? { absolute: seo.title }
      : `Pendirian ${content.nama} — ${content.namaFormal}`,
    description:
      seo?.description ??
      `Pendirian ${content.namaFormal} (${content.nama}) resmi notaris & Kemenkumham. Proses 2-3 minggu.`,
    alternates: {
      canonical: `${baseUrl}/layanan/pendirian-badan-usaha/${jenis}`,
    },
  };
}

export default async function JenisBadanUsahaPage({
  params,
}: {
  params: Promise<{ jenis: string }>;
}) {
  const { jenis } = await params;
  const content = contentMap[jenis];

  if (!content) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Beranda", url: "/" },
    { name: "Layanan", url: "/layanan" },
    { name: "Pendirian Badan Usaha", url: "/layanan/pendirian-badan-usaha" },
    { name: content.nama, url: `/layanan/pendirian-badan-usaha/${jenis}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <BadanUsahaTemplate content={content} />
    </>
  );
}
