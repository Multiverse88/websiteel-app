// One-time (but safe-to-rerun) seed: bulk-imports the ~1116 old WordPress
// "Local SEO" URLs (jasa-pendirian-{layanan}-{kota}, plus lp-seo-lokal-*/
// lokal-* prefix variants) into the DB-driven Redirect table for
// easylegal.id, so they 301 to the corresponding EXISTING generic service
// page instead of 404ing.
//
// Why not per-city destination pages? Those don't exist yet — the old
// next.config.ts redirects() had a 14-pattern catch-all claiming to handle
// this, but its source pattern (/layanan/jasa-pendirian-pt/:kota) never
// matched the real flat WordPress URLs, so ~1116 pages were silently
// 404ing. Per-city landing pages are a separate future project; for now
// every old local-SEO URL redirects to its service's main page (ignoring
// city), which is still a valid destination and preserves link equity via
// 301 — see AUDIT - URL Redirect Coverage (2026-09-06).md in the vault for
// the full analysis this was generated from.
//
// Run: npx tsx seed-local-seo-redirects.ts
// (safe to rerun — upserts on the (domain, slug) unique key)
import { PrismaClient } from "@prisma/client";
import redirects from "./prisma/local-seo-redirects.json";

const prisma = new PrismaClient();

async function main() {
  console.log(`Seeding ${redirects.length} local-SEO redirects for easylegal.id...`);
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
