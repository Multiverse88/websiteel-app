import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Pengajuan PKP — Daftar Wajib Pajak PKP Online",
  description:
    "Pengurusan pengukuhan Pengusaha Kena Pajak (PKP) untuk UMKM & korporasi. Proses cepat 3-5 hari kerja.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/pengajuan-pkp",
  },
};

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Pengajuan PKP", url: "/layanan/pengajuan-pkp" },
];

export default function PengajuanPkpLayout({
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
