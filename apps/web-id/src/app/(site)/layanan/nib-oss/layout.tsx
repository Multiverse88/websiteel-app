import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: {
      absolute: "Jasa Pengurusan NIB & OSS - EasyLegal",
    },
    description:
      "Butuh jasa Pengurusan NIB & OSS? EasyLegal siap bantu proses perizinan usaha Anda dengan cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai Rp400 ribuan. Konsultasi gratis sekarang!",
    alternates: {
      canonical: `${baseUrl}/layanan/nib-oss`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "NIB & OSS", url: "/layanan/nib-oss" },
];

export default function NibOssLayout({
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
