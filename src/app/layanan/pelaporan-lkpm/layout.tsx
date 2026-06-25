import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Pelaporan LKPM — Compliance BKPM untuk PMA & PMDN",
  description:
    "Pengurusan laporan LKPM wajib tahunan untuk badan usaha PMA & PMDN. Konsultasi gratis, proses 3-7 hari kerja.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/pelaporan-lkpm",
  },
};

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Pelaporan LKPM", url: "/layanan/pelaporan-lkpm" },
];

export default function PelaporanLkpmLayout({
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
