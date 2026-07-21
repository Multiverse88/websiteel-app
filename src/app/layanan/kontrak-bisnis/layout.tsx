import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Jasa Kontrak Bisnis & Perjanjian — Legal Drafting Profesional",
  description:
    "Jasa pembuatan kontrak & perjanjian profesional untuk bisnis, UMKM, dan individu. Disusun oleh ahli hukum berpengalaman, sah secara hukum, dan sesuai regulasi di Indonesia.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/kontrak-bisnis",
  },
};

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Kontrak Bisnis", url: "/layanan/kontrak-bisnis" },
];

export default function KontrakBisnisLayout({
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
