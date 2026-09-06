// One-time (safe-to-rerun) seed: the 31 old WordPress article URLs from
// the "410 List — Artikel" audit were flat at the domain root (e.g.
// /cara-membuat-pt-perorangan/), but the app only serves articles at
// /artikel/{slug} — there was NO code connecting the two at all.
// canonical-mapping.ts only affects the <link rel=canonical> tag on the
// /artikel/{slug} page itself; it never made the bare old URL resolve
// anywhere. Confirmed live: the bare old URL rendered the "Halaman Tidak
// Ditemukan" not-found page with HTTP 200 (not even a real 404) — see
// AUDIT - URL Redirect Coverage (2026-09-06).md follow-up findings.
//
// 28 of the 31 already have a real cannibalization target in
// canonical-mapping.ts (a service page) — redirect straight there,
// skipping the article page entirely. The other 3 have no different
// canonical target (the spreadsheet's "new url" column just pointed at
// their own slug under /artikel/, not a genuinely different page), so
// they redirect to their own /artikel/{slug}.
//
// Run: npx tsx seed-article-legacy-redirects.ts
import { PrismaClient } from "@prisma/client";
import redirects from "./prisma/article-legacy-redirects.json";

const prisma = new PrismaClient();

async function main() {
  console.log(`Seeding ${redirects.length} legacy article redirects for easylegal.id...`);
  let created = 0;
  let updated = 0;

  for (const r of redirects as { slug: string; destination: string; title: string }[]) {
    const existing = await prisma.redirect.findUnique({
      where: { domain_slug: { domain: "easylegal.id", slug: r.slug } },
    });

    await prisma.redirect.upsert({
      where: { domain_slug: { domain: "easylegal.id", slug: r.slug } },
      update: { destination: r.destination, description: r.title },
      create: {
        domain: "easylegal.id",
        slug: r.slug,
        destination: r.destination,
        description: r.title,
      },
    });

    if (existing) updated++;
    else created++;
  }

  console.log(`Done. Created: ${created}, updated: ${updated}, total: ${redirects.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
