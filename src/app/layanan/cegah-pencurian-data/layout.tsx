import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Cegah Pencurian Data Bisnis — Skema Hukum Komprehensif",
  description:
    "Lindungi data bisnis Anda dengan skema hukum komprehensif. Analisis risiko, perjanjian kerahasiaan, & kepatuhan regulasi.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/cegah-pencurian-data",
  },
};

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Cegah Pencurian Data", url: "/layanan/cegah-pencurian-data" },
];

export default function CegahPencurianDataLayout({
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
