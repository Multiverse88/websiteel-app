import { notFound } from "next/navigation";
import BadanUsahaTemplate from "@/components/layanan/BadanUsahaTemplate";
import { contentMap } from "@/data/layanan-badan-usaha";

export function generateStaticParams() {
  return Object.keys(contentMap).map((jenis) => ({ jenis }));
}

export default async function JenisBadanUsahaPage({
  params,
}: {
  params: Promise<{ jenis: string }>;
}) {
  const { jenis } = await params;
  const content = contentMap[jenis];

  if (!content) {
    notFound();
  }

  return <BadanUsahaTemplate content={content} />;
}
