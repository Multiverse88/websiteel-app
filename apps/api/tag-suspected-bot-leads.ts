/**
 * One-off analisis + tagging retroaktif `WhatsAppClick.isSuspectedBot`.
 * Dijalankan manual (`npx tsx scripts/tag-suspected-bot-leads.ts`), BUKAN
 * bagian dari migration/deploy otomatis — ini koreksi data historis, bukan
 * perubahan schema. Idempotent: aman dijalankan ulang kapan saja (misal
 * setelah backfill data baru), row yang sudah tertandai tidak diubah lagi
 * kecuali reason-nya bertambah.
 *
 * Latar belakang investigasi (16 Sep 2026): endpoint /api/v1/wa/redirect
 * adalah GET dengan efek samping (bikin lead + increment clickCount),
 * link CTA-nya statis <a href> di HTML — gampang "diikuti" crawler/bot.
 * Fix ke depan sudah dipasang (bot-detect.ts UA filter + rate limit +
 * dedup IP/UA di whatsapp.ts), tapi data LAMA (sebelum fix live) perlu
 * ditandai manual karena tidak ada ipAddress/userAgent tersimpan saat itu.
 *
 * PENTING: status `NEW` TIDAK dipakai sebagai sinyal — investigasi
 * menemukan 100% dari 44rb+ lead historis berstatus NEW (tim CS tidak
 * pernah pakai fitur update status), jadi itu bukan bukti bot valid.
 *
 * Tiga kriteria independen yang DIPAKAI (evidence-based, low false-positive):
 *
 * 1. Sapuan katalog penuh `glossary-cta` — 2380 lead menyentuh 100% dari
 *    1029 istilah glossary yang ada, rata-rata ~1-2 klik/istilah, volume
 *    harian bursty. Mustahil trafik organik ke kamus istilah hukum niche.
 *
 * 2. Burst multi-CTA — 3+ CTA BERBEDA diklik dalam window 30 detik di
 *    HALAMAN YANG SAMA (contoh terburuk: 29 CTA berbeda dalam 30 detik di
 *    /layanan/kontrak-bisnis). Manusia tidak pernah klik banyak tombol
 *    WA berbeda dalam hitungan detik pada satu kunjungan.
 *
 * 3. Ghost-page — product mengarah ke slug glossary/artikel yang SUDAH
 *    DIHAPUS dari database. Halaman itu tidak lagi punya link nyata di
 *    situs manapun — satu-satunya cara "mengklik" CTA di sana adalah
 *    lewat daftar URL usang (sitemap cache lama) atau memanggil endpoint
 *    redirect langsung dengan parameter hasil panen sebelumnya.
 *
 * Kriteria yang SENGAJA TIDAK dipakai (terlalu berisiko false-positive):
 * - Isolated single click dengan pola "satu CTA per produk, spasi puluhan
 *   detik, tanpa CTA lain di halaman yang sama" — pola ini KEMUNGKINAN
 *   BESAR juga sisa crawl (mis. jam 2026-09-14 18:00 masih ada ~485 baris
 *   begini), tapi tidak bisa dibedakan definitif dari trafik organik
 *   lambat tanpa IP/UA historis. Dibiarkan TIDAK ditandai — lebih baik
 *   under-flag daripada salah tandai lead asli.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== Tagging retroaktif WhatsAppClick.isSuspectedBot ===\n");

  // 1. Sapuan katalog penuh glossary-cta
  const glossaryCta = await prisma.$executeRawUnsafe(`
    UPDATE "WhatsAppClick"
    SET "isSuspectedBot" = true,
        "botReason" = COALESCE("botReason" || ' + ', '') || 'Sapuan katalog penuh glossary (100% dari 1029 istilah, pola crawl berkala) - ditandai retroaktif 16 Sep 2026'
    WHERE "ctaId" = 'glossary-cta' AND ("botReason" IS NULL OR "botReason" NOT LIKE '%katalog penuh glossary%')
  `);
  console.log(`1. Sapuan katalog glossary-cta: ${glossaryCta} baris`);

  // 2. Burst multi-CTA (3+ ctaId berbeda dalam 30 detik di produk yang sama)
  const burst = await prisma.$executeRawUnsafe(`
    WITH gaps AS (
      SELECT id, product, "ctaId", "createdAt",
        "createdAt" - lag("createdAt") OVER (PARTITION BY product ORDER BY "createdAt") AS gap
      FROM "WhatsAppClick" WHERE product IS NOT NULL
    ),
    ordered AS (
      SELECT id, product, "ctaId", "createdAt",
        SUM(CASE WHEN gap IS NULL OR gap > interval '30 seconds' THEN 1 ELSE 0 END)
          OVER (PARTITION BY product ORDER BY "createdAt") AS cluster_id
      FROM gaps
    ),
    burst_clusters AS (
      SELECT product, cluster_id FROM ordered GROUP BY product, cluster_id HAVING count(DISTINCT "ctaId") >= 3
    )
    UPDATE "WhatsAppClick" c
    SET "isSuspectedBot" = true,
        "botReason" = COALESCE(c."botReason" || ' + ', '') || 'Burst: 3+ CTA berbeda diklik <30 detik di halaman yang sama - mustahil manusia (ditandai 16 Sep 2026)'
    FROM ordered o
    JOIN burst_clusters bc ON o.product = bc.product AND o.cluster_id = bc.cluster_id
    WHERE c.id = o.id AND (c."botReason" IS NULL OR c."botReason" NOT LIKE '%Burst:%')
  `);
  console.log(`2. Burst multi-CTA (<30s, halaman sama): ${burst} baris`);

  // 3. Ghost-page (glossary/artikel yang sudah dihapus dari DB)
  const ghost = await prisma.$executeRawUnsafe(`
    UPDATE "WhatsAppClick" c
    SET "isSuspectedBot" = true,
        "botReason" = COALESCE(c."botReason" || ' + ', '') || 'Ghost-page: halaman sudah dihapus dari DB, mustahil dicapai lewat navigasi asli (ditandai 16 Sep 2026)'
    WHERE (c."botReason" IS NULL OR c."botReason" NOT LIKE '%Ghost-page%')
      AND (
        (c.product LIKE '/glossary/%' AND NOT EXISTS (SELECT 1 FROM "Glossary" g WHERE '/glossary/' || g.slug = c.product))
        OR (c.product LIKE '/artikel/%' AND NOT EXISTS (SELECT 1 FROM "Article" a WHERE '/artikel/' || a.slug = c.product))
      )
  `);
  console.log(`3. Ghost-page (glossary/artikel terhapus): ${ghost} baris`);

  const total = await prisma.whatsAppClick.count({ where: { isSuspectedBot: true } });
  const grand = await prisma.whatsAppClick.count();
  console.log(`\nTotal ditandai isSuspectedBot=true: ${total} dari ${grand} (${((total / grand) * 100).toFixed(1)}%)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
