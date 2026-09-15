-- Ditambahkan setelah insiden lonjakan traffic WhatsApp rotator yang tidak
-- bisa divalidasi (14-15 Sep 2026): tidak ada IP/User-Agent tersimpan sama
-- sekali, jadi tidak bisa dibedakan klik manusia asli vs bot/crawler secara
-- forensik. Dipakai juga sebagai fallback dedup key ketika
-- anonymousSessionId kosong (selalu kosong di production karena
-- getWhatsAppLink() belum pernah mengirim `sid`).

ALTER TABLE "WhatsAppClick"
  ADD COLUMN "ipAddress" TEXT,
  ADD COLUMN "userAgent" TEXT;
