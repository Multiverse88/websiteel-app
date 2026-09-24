import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { KARTU_PEOPLE, getKartuPerson } from "@/data/kartu";
import { getDomainConfig } from "@/lib/domains";
import KartuClient from "./KartuClient";

// Halaman kartu nama digital: /kartu/<slug>. Statis penuh — semua orang
// di KARTU_PEOPLE di-prerender saat build.
export function generateStaticParams() {
  return KARTU_PEOPLE.map((p) => ({ slug: p.slug }));
}

// URL absolut (untuk QR + canonical) diambil dari Host, sama seperti
// root layout — app ini melayani lebih dari satu domain.
async function getBaseUrl(): Promise<string> {
  const host = (await headers()).get("host");
  return getDomainConfig(host).baseUrl;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const person = getKartuPerson(slug);
  if (!person) return { title: "Kartu tidak ditemukan" };

  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}/kartu/${person.slug}`;
  const titleSuffix = person.title ? ` — ${person.title}` : "";

  return {
    title: `${person.name}${titleSuffix}`,
    description: person.title
      ? `Kartu nama digital ${person.name}, ${person.title} di EasyLegal. Hubungi via WhatsApp ${person.phone} untuk konsultasi legalitas bisnis.`
      : `Kartu nama digital ${person.name} di EasyLegal. Hubungi via WhatsApp ${person.phone} untuk konsultasi legalitas bisnis.`,
    // Root layout menetapkan canonical ke homepage; halaman ini harus
    // menunjuk ke URL-nya sendiri.
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      url,
      title: `${person.name}${titleSuffix} EasyLegal`,
      description: `Kartu nama digital EasyLegal. Hubungi via WhatsApp untuk konsultasi legalitas bisnis.`,
      images: [{ url: person.photo, width: 2482, height: 3190, alt: `Foto ${person.name}` }],
    },
  };
}

export default async function KartuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = getKartuPerson(slug);
  if (!person) notFound();

  const baseUrl = await getBaseUrl();
  return <KartuClient person={person} shareUrl={`${baseUrl}/kartu/${person.slug}`} />;
}
