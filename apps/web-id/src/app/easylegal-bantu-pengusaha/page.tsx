import type { Metadata } from "next";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domains";
import { paymentVerificationEntities } from "@/data/payment-verification";
import PaymentVerificationPage from "@/components/payment-verification/PaymentVerificationPage";

// Halaman resmi verifikasi pembayaran — route statis terpisah dari CMS
// landing-page, satu per badan usaha. Lihat .omo/plans/payment-verification-landing-pages.md.
const entity = paymentVerificationEntities["easylegal-bantu-pengusaha"];

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);
  const url = `${baseUrl}/easylegal-bantu-pengusaha`;
  const title = `Verifikasi Rekening Resmi — ${entity.legalName} | EasyLegal`;
  const description = `Cek nomor rekening ${entity.bankName} dan status legalitas AHU resmi ${entity.legalName} sebelum melakukan pembayaran ke EasyLegal.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description },
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  return <PaymentVerificationPage entity={entity} />;
}
