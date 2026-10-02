import type { Metadata } from "next";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: {
      absolute: "Jasa Pengurusan Laporan RUPS Tahunan & Luar Biasa - EasyLegal",
    },
    description:
      "Butuh jasa pengurusan laporan RUPS Tahunan & Luar Biasa? EasyLegal siap bantu kelola kewajiban hukum perusahaan Anda dengan cepat, resmi, dan rapi. Konsultasi gratis sekarang!",
    alternates: {
      canonical: `${baseUrl}/layanan/pelaporan-rups`,
    },
    openGraph: {
      title: "Jasa Pengurusan Laporan RUPS Tahunan & Luar Biasa - EasyLegal",
      description:
        "Butuh jasa pengurusan laporan RUPS Tahunan & Luar Biasa? EasyLegal siap bantu kelola kewajiban hukum perusahaan Anda dengan cepat, resmi, dan rapi. Konsultasi gratis sekarang!",
      url: `${baseUrl}/layanan/pelaporan-rups`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
