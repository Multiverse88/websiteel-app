# Typebot EasyLegal - Improvement Plan

## Status: Bot Working

Bot `easylegal-assistant` sekarang berjalan. API `startChat` mengembalikan messages + input dengan benar.
Widget di homepage load via shadow DOM.

---

## Yang Sudah Dikerjakan

| # | Task | Status |
|---|------|--------|
| 1 | Deploy Typebot stack (builder + viewer + PostgreSQL) | Done |
| 2 | Create bot via SQL inserts | Done |
| 3 | Fix "This bot is outdated" (version 6.1) | Done |
| 4 | Fix nginx routing (builder admin + viewer bot pages) | Done |
| 5 | Fix CSP frame-src for typebot domain | Done |
| 6 | Fix `phone input` block type invalid → ganti `text input` | Done |
| 7 | Fix events schema validation error | Done |
| 8 | Add NEXTAUTH_SECRET to viewer env | Done |
| 9 | TypebotWidget embed di homepage | Done |

---

## Yang Perlu Di-Improve (Nanti)

### 1. Bot Flow Enhancement (Priority: High)

**Status:** Basic flow sudah jalan. Perlu di-upgrade.

- [ ] **WhatsApp Rotator Logic** — Sekarang hardcode 1 nomor per kategori. Perlu rotator logic yang benar-benar random di viewer, bukan hardcode di group JSON.
- [ ] **Collect Phone Number** — Sekarang pakai `text input`, ideally pakai `number input` atau `phone input` (kalo Typebot support di versi ini).
- [ ] **Conditional WhatsApp Link** — Tambah logic: kalo user sudah isi nomor, masukkan ke link WA (`?text=Halo nama saya {phone}...`).
- [ ] **Validation** — Tambah validasi nomor WA (12 digit, mulai 62/08).
- [ ] **Custom Messages per Kategori** — Setiap kategori bisa punya greeting/penjelasan yang lebih detail, bukan cuma "Baik! Untuk [kategori], silakan hubungi..."

### 2. Viewer Page (Priority: High)

**Status:** API works, tapi page `/easylegal-assistant` return 404 (prerendered cache).

- [ ] **Solve 404 Page** — Page `[[...publicId]]` di-prerender sebagai 404 karena bot belum ada waktu build. Options:
  - Rebuild viewer image SETELAH bot data masuk DB
  - Atau pakai `/api/v1/` endpoint langsung di widget (sudah works)
  - Atau set `getStaticProps` → `getServerSideProps` (butuh source code mod)
- [ ] **Bot Version Bump** — Prisma schema viewer pakai Prisma 7.4.0, cek compatibility

### 3. Admin Dashboard Typebot (Priority: Medium)

**Status:** Builder bisa diakses di `typebot.easylegal.my.id/typebots`, tapi perlu setup.

- [ ] **Setup Admin Account** — Login pertama kali ke builder, buat admin workspace
- [ ] **Edit Bot via UI** — Setelah bisa login, edit bot flow via drag-and-drop UI (lebih gampang dari SQL)
- [ ] **Theme Customization** — Set via UI: font, warna primary, background
- [ ] **Test Bot via Preview** — Test flow langsung dari builder

### 4. WhatsApp Integration (Priority: High)

- [ ] **Ganti Nomor Dummy** — `628111111111`, `628112222222`, `628113333333` masih placeholder. Ganti dengan nomor asli.
- [ ] **Dynamic WA Link** — Include phone number user di WA message text
- [ ] **Multiple Agent Routing** —分配 chat ke nomor yang berbeda berdasarkan availability

### 5. Analytics & Monitoring (Priority: Low)

- [ ] **Chat Analytics** — Track jumlah chat per kategori
- [ ] **Conversion Tracking** — Track user yang klik WA link
- [ ] **Sentry Integration** — Typebot sudah support Sentry, tinggal set `SENTRY_DSN`

### 6. Infrastructure (Priority: Medium)

- [ ] **SSL for typebot domain** — Pastikan cert auto-renew untuk `typebot.easylegal.my.id`
- [ ] **Backup Strategy** — Typebot DB backup bersama PostgreSQL
- [ ] **Docker Compose Improvements** — Pin image version (jangan `:latest`), add healthcheck untuk viewer/builder

### 7. Embed Widget Improvements (Priority: Medium)

- [ ] **Bubble Color** — Pastikan bubble button match branding (primary `#D62828`)
- [ ] **Mobile Responsiveness** — Test chat widget di mobile
- [ ] **Auto-open** — Pertimbangkan auto-open chat setelah beberapa detik
- [ ] **Proactive Messages** — Tambah greeting message sebelum user klik

---

## Architecture Notes

- **Bot ID:** `bot_easylegal`
- **Public ID:** `easylegal-assistant`
- **DB:** PostgreSQL `172.17.0.1:5432/typebot` (user: easylegal)
- **Viewer URL:** `typebot.easylegal.my.id/easylegal-assistant` (page 404, tapi API works)
- **API URL:** `typebot.easylegal.my.id/api/v1/typebots/easylegal-assistant/startChat`
- **Builder URL:** `typebot.easylegal.my.id/typebots`
- **Widget:** `<TypebotWidget />` di homepage (shadow DOM, CDN `@latest`)
- **Block types validated by viewer:** text, image, video, embed, choice input, text input, number input, email input, url input, date input, picture choice, payment, file input
- **`phone input` is NOT a valid block type** — gunakan `text input` sebagai pengganti

---

## Deployment

```bash
# Push changes
git add -A && git commit -m "fix: typebot validation + NEXTAUTH_SECRET" && git push

# Deploy
bash scripts/deploy.sh
```
