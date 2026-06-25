import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BadanUsahaTemplate from "@/components/layanan/BadanUsahaTemplate";
import { contentMap } from "@/data/layanan-badan-usaha";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return Object.keys(contentMap).map((jenis) => ({ jenis }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ jenis: string }>;
}): Promise<Metadata> {
  const { jenis } = await params;
  const content = contentMap[jenis];
  if (!content) return {};

  return {
    title: `Pendirian ${content.nama} — ${content.namaFormal}`,
    description: `Pendirian ${content.namaFormal} (${content.nama}) resmi notaris & Kemenkumham. Proses 2-3 minggu.`,
    alternates: {
      canonical: `https://easylegal.my.id/layanan/pendirian-badan-usaha/${jenis}`,
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
