-- Penandaan retroaktif lead yang terbukti berasal dari crawl/bot (bukan
-- penghapusan — data historis tetap utuh, dikecualikan dari laporan/export
-- lewat filter opsional saja). Lihat komentar di schema.prisma model
-- WhatsAppClick untuk kriteria yang dipakai.

ALTER TABLE "WhatsAppClick"
  ADD COLUMN "isSuspectedBot" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "botReason" TEXT;

CREATE INDEX "WhatsAppClick_isSuspectedBot_idx" ON "WhatsAppClick"("isSuspectedBot");

-- Tandai retroaktif satu-satunya kelompok dengan bukti sekuat ini: seluruh
-- klik CTA "glossary-cta" (ctaId) menyentuh 1029/1029 (100%) istilah
-- glossary yang pernah ada di database, rata-rata ~1-2 klik per istilah,
-- dengan volume harian bursty (959 klik dalam satu hari, 8 Sep 2026) —
-- pola sapuan katalog penuh berkala oleh crawler/SEO-audit-tool, bukan
-- trafik organik ke halaman kamus istilah hukum yang niche. Dibatasi
-- hanya ctaId ini karena tidak ada kelompok CTA lain yang punya
-- pembanding "total katalog" yang bisa dibuktikan sekuat ini.
UPDATE "WhatsAppClick"
SET "isSuspectedBot" = true,
    "botReason" = 'Sapuan katalog penuh glossary (100% dari 1029 istilah, pola crawl berkala) - ditandai retroaktif 16 Sep 2026'
WHERE "ctaId" = 'glossary-cta';
