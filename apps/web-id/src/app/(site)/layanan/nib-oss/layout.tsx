import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: "NIB & OSS RBA — Perizinan Usaha Resmi BKPM",
    description:
      "Pengurusan NIB, OSS RBA, perubahan KBLI, & sertifikat standar. Proses 1-3 hari kerja. Mulai dari Rp499rb.",
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
