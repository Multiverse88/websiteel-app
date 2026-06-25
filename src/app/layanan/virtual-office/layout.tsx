import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Virtual Office — Alamat Bisnis Prestisius 3 Kota",
  description:
    "Sewa virtual office Bandung, Jakarta, & Bekasi untuk domisili PT, NPWP, PKP. Harga mulai Rp1,5jt/tahun + meeting room 70 jam.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/virtual-office",
  },
};

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Virtual Office", url: "/layanan/virtual-office" },
];

export default function VirtualOfficeLayout({
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
