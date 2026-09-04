import type { Metadata } from "next";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: "Jasa Pengurusan RUPS Tahunan & Luar Biasa | EasyLegal",
    description:
      "Bantu penyelenggaraan RUPS Tahunan (RUPST) dan RUPS Luar Biasa (RUPSLB) perusahaan Anda — lengkap dengan Notaris, Akta, dan pelaporan ke Kemenkumham. Proses 7–14 hari kerja.",
    alternates: {
      canonical: `${baseUrl}/layanan/pelaporan-rups`,
    },
    openGraph: {
      title: "Jasa Pengurusan RUPS Tahunan & Luar Biasa | EasyLegal",
      description:
        "Penyelenggaraan RUPS lengkap: undangan, Notaris, Akta, dan pelaporan Kemenkumham. Mulai Rp 1.990.000.",
      url: `${baseUrl}/layanan/pelaporan-rups`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
