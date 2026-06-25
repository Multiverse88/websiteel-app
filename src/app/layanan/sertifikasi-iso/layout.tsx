import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Sertifikasi ISO UAF Accredited — 9001, 14001, 27001 & Lainnya",
  description:
    "Jasa sertifikasi ISO terakreditasi UAF untuk berbagai standar. Pendampingan A-Z dari konsultasi sampai sertifikat terbit. Mulai dari Rp9,9jt.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/sertifikasi-iso",
  },
};

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Sertifikasi ISO", url: "/layanan/sertifikasi-iso" },
];

export default function SertifikasiIsoLayout({
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
