# AGENTS.md — Petunjuk Agent

Referensi ringkas untuk semua AI agent yang bekerja di codebase ini.

---

## Gambaran Proyek

**EasyLegal** (`easylegal.my.id`) — Platform jasa legalitas bisnis Indonesia.
Next.js 16 App Router, PostgreSQL + Prisma, JWT + TOTP-2FA admin dashboard.
12+ halaman layanan hukum, CMS artikel, sistem broadcast newsletter.

---

## Critical Gotchas yang SUDAH DIFIX

Semua issue di bawah ini sudah diperbaiki. Dicatat untuk referensi histori.

| # | Issue | Fix |
|---|-------|-----|
| 1 | **Middleware mati** — `proxy.ts` bukan `middleware.ts` | Rename ke `src/middleware.ts`, export `middleware` |
| 2 | **2FA userId validation hilang** — `actions-2fa.ts` terima userId dari client | Pindah pembacaan cookie ke dalam fungsi itu sendiri |
| 3 | **`NEXT_PUBLIC_APP_URL` tanpa protocol** — `easylegal.my.id` | Tambah `https://` |
| 4 | **`global-error.tsx` English** | Ganti `lang="id"`, tambah retry button + logo |
| 5 | **`sync-images.js` bisa silent fail** | Tambah timeout S3 request 10s |
| 6 | **`.env.production` SENTRY_DSN dobel** | Hapus duplikat baris 33 |

**Catatan:** Nginx `recruit-app` upstream (`172.17.0.1:3000`) untuk domain easyai.id masih ada — kalo gak ada service, nginx 502 untuk domain itu. Gak pengaruh ke easylegal.my.id.

---

## Commands

Semua jalan dari root repo (bukan subfolder).

```bash
npm install                  # Install deps (jalanin prisma generate otomatis via postinstall)
npm run dev                  # Dev server http://localhost:3000
npm run build                # Production build: prisma migrate deploy && next build
npm run start                # Start production server (setelah build)
npm run lint                 # ESLint (flat config eslint.config.mjs)
npx tsc --noEmit             # Type-check
npm test                     # Playwright smoke tests (JANGAN jalanin pas deploy — port conflict)
npx playwright test tests/smoke.spec.ts  # Test file spesifik
npx prisma migrate deploy   # Apply migration ke DB
npx prisma migrate dev --name <name>    # Buat migration baru
npx prisma db seed          # Seed DB (cuma artikel, gak bikin admin/settings)
npx tsx scripts/<file>.ts   # Jalanin TS script langsung
```

---

## Arsitektur

### Server Actions (BUKAN API Routes)
Semua mutation pake `"use server"`. Gak ada `app/api/*`.
Referensi: `src/app/dashboard/newsletter/actions.ts`

### Alur Auth Dashboard
1. Login → bcrypt verify → set cookie `pending_2fa_user` (5 menit)
2. 2FA setup/verify → mint JWT 24 jam → set cookie `admin_token`
3. Middleware (`src/middleware.ts`) guard JWT — tiap halaman dashboard juga panggil `getSession()` defensif
4. Halaman dashboard selalu diawali `export const dynamic = "force-dynamic"` + guard `getSession()`

### Halaman Layanan
- **Template-driven:** `pendirian-badan-usaha/` → `BadanUsahaTemplate` + `data/layanan-badan-usaha.tsx`
- **Self-contained:** `merek-haki/`, `nib-oss/`, `press-release/` (700-1500 lines per file)
- Semua masih `"use client"`

### Artikel
- Listing: `src/app/artikel/page.tsx` (SSR, force-dynamic)
- Detail: `src/app/artikel/[slug]/page.tsx` (SSR, markdown custom, ToC)
- CMS: `src/app/dashboard/artikel/tambah/` (client, live preview)
- Seed (`prisma/seed.ts`): **hanya bikin 10 artikel contoh — TIDAK bikin admin user atau system settings**

### Newsletter
- Subscribe: widget di artikel → tabel `NewsletterSubscriber`
- Broadcast: dashboard admin → Nodemailer → tabel `EmailLog`
- Auto-broadcast pas artikel baru (via `SystemSetting`)

---

## Styling

- **Tailwind v4** — gak ada `tailwind.config.js`, token di `src/app/globals.css` `@theme` block
- **Warna:** `primary #D62828`, `primary-light #FEF2F2`, `primary-hover #B91C1C`, `crimson #990202`, `whatsapp #25D366`
- **Font:** DM Sans (body), Plus Jakarta Sans (secondary), Inter (heading) — via `next/font/google`
- **Animasi:** GSAP + Framer Motion — JANGAN tambah library animasi lain
- **shadcn/ui:** style `new-york`, base `neutral` — tambah komponen dengan `npx shadcn@latest add <name>`

---

## File Structure

```
src/
├── app/                   # App Router pages + Server Actions
│   ├── page.tsx           # Homepage (bukan di route group)
│   ├── layanan/           # 12+ halaman service
│   ├── login/             # /login + 2FA
│   ├── dashboard/         # Protected dashboard
│   ├── artikel/           # Blog/public articles
│   ├── kontak/            # Contact form
│   └── ...                # cek-nama, cek-kbli, tentang-kami, dll
├── components/
│   ├── home/              # Homepage sections
│   ├── layanan/           # Shared templates
│   └── ui/                # shadcn primitives
├── data/                  # Static content
├── lib/                   # auth.ts, 2fa.ts, db.ts, mail.ts, utils.ts, rate-limit.ts, metrics.ts, config.ts, s3.ts
├── hooks/                 # Custom hooks
└── middleware.ts           # Dashboard auth gate
scripts/
├── deploy.sh              # Deploy VPS (pull → build → up -d)
├── sync-images.js         # MinIO/CDN sync (jalan di CMD Docker & manual)
├── deploy-setup.sh        # Setup VPS pertama kali
├── backup-db.sh           # pg_dump ke /opt/backups/
├── secure-vps.sh          # Hardening helper
├── optimize-images.sh     # Convert JPG/PNG → WebP
├── optimize-db.sh         # PostgreSQL vacuum + analyze + index check
├── audit-security.sh      # Security audit (read-only)
└── check-ssl.sh           # SSL cert expiry + auto-renew
```

---

## Diagnosa Website Down

Urutan investigasi kalo website error/down:

### 1. Cek Container
```bash
docker compose ps                          # Status container
docker compose logs app --tail 50          # Log Next.js (cari error Prisma, JS, MinIO)
docker compose logs nginx --tail 50        # Log nginx (cari 502, cert error)
```

### 2. Cek Database (PostgreSQL di host, bukan di Docker)
```bash
pg_isready                                 # Jalan? port 5432?
systemctl status postgresql                # Service status
# Kalo mati:
systemctl start postgresql
```

### 3. Cek SSL Certificate
```bash
openssl x509 -enddate -noout -in /etc/letsencrypt/live/easylegal.my.id/fullchain.pem
```

### 4. Cek Manual dari Dalam Container
```bash
docker compose exec app wget -qO- http://localhost:3000  # Cek app response
docker compose exec app npx prisma db push --accept-data-loss --dry-run  # Cek koneksi DB
```

### Penyebab Umum Down

| # | Problem | Ciri-ciri | Fix |
|---|---------|-----------|-----|
| 1 | **DB koneksi gagal** | Log: `Can't reach database server` | Pastiin PostgreSQL jalan di host. `.env.production` pake `172.17.0.1:5432` |
| 2 | **NEXT_PUBLIC_APP_URL tanpa https://** | Link rusak, redirect loop | Tambah `https://` |
| 3 | **Cert SSL expired** | Browser: `NET::ERR_CERT_DATE_INVALID` | `certbot renew` |
| 4 | **Port 3000 ketabrak** | Docker port conflict, container restart-loop | Matiin proses lain di port 3000 |
| 5 | **MinIO sync gagal** | Log startup: `Error during MinIO CDN sync` | Cek kredensial MinIO, atau matiin MinIO |
| 6 | **Nginx 502 (easyai.id)** | Domain easyai.id error, utama aman | Gak masalah buat easylegal.my.id — cuma domain satunya |
| 7 | **Build broken** | Container crash pas start | `docker compose logs app` cari error build |
| 8 | **Prisma migration pending** | Error `please run prisma migrate deploy` | `docker compose exec app npx prisma migrate deploy` |

---

## Info Deploy

```bash
# Manual:
git pull origin main
docker compose build --no-cache
docker compose up -d
docker compose logs -f app   # Pantau startup (cek sync-images, Prisma migrate)

# Via script:
bash scripts/deploy.sh       # pull → build → up -d → cleanup → health check
```

**Prerequisites:**
- Docker + Docker Compose
- PostgreSQL di host (bukan di Compose)
- Let's Encrypt certs di `/etc/letsencrypt/live/easylegal.my.id/`
- `.env.production` di root repo

---

## Testing

- Playwright smoke tests di `tests/`
- Config: `playwright.config.ts`
- **Run:** `npm test` (atau `npx playwright test tests/smoke.spec.ts`)
- **JANGAN jalanin pas deploy** — `playwright.config.ts` otomatis start dev server di port 3000 → konflik

---

## Known Issues

| Issue | Lokasi | Status |
|-------|--------|--------|
| Middleware mati (`proxy.ts` bukan `middleware.ts`) | `src/proxy.ts` → `src/middleware.ts` | **SUDAH DIFIX** |
| 2FA userId dari client tanpa validasi cookie | `src/app/login/actions-2fa.ts` | **SUDAH DIFIX** |
| `NEXT_PUBLIC_APP_URL` tanpa `https://` | `.env.production` | **SUDAH DIFIX** |
| `global-error.tsx` English + tanpa tombol retry | `src/app/global-error.tsx` | **SUDAH DIFIX** |
| `sync-images.js` jalan tiap startup (risk error) | `scripts/sync-images.js` + `Dockerfile` | **SUDAH DIFIX** |
| SENTRY_DSN dobel di `.env.production` | `.env.production` | **SUDAH DIFIX** |
| Komponen mati di `src/components/home/` | `HowItWorks.tsx`, `LatestInsights.tsx`, wrappers | **SUDAH DIFIX** |
| 100+ nomor WhatsApp hardcoded di halaman service | semua file `src/app/layanan/` + komponen | **SUDAH DIFIX** |
| `cdn.easylegal.my.id` belum ada di nginx | `nginx/nginx.conf` | **SUDAH DIFIX** |
| `MINIO_PUBLIC_URL` salah (`easylegal.my.id`) | `.env.production` | **SUDAH DIFIX** |
| `sync-images.js` upload ulang file tiap startup | `scripts/sync-images.js` | **SUDAH DIFIX** (skip existing) |
| Statis images belum sync ke MinIO | `scripts/sync-images.js` | **SUDAH DIFIX** |

---

## MinIO / CDN Image Storage

MinIO berjalan sebagai container terpisah (`cdn-storage`) di port 9000 (S3 API) & 9001 (Console).
Bucket: `images`. Akses publik via `cdn.easylegal.my.id` (nginx → MinIO).

| Alur | Detail |
|------|--------|
| Upload user | Dashboard → `uploadToMinio()` → MinIO → return CDN URL |
| Static images | `scripts/sync-images.js` sync `public/` → MinIO (skip existing) |
| Serving | `/images/*` di nginx diproxy ke `172.17.0.1:9000/images/*` |
| URL format | `https://cdn.easylegal.my.id/images/uploads/articles/xxx.jpg` |

**Key mapping:** File `public/images/hero/hero.jpg` → key `hero/hero.jpg` di bucket `images`
(karena bucket sudah bernama `images`, prefix `images/` di-strip).

**Deploy notes:**
- `cdn.easylegal.my.id` butuh DNS CNAME → `157.10.252.77` + SSL cert
- Sync jalan otomatis di CMD Docker (`sync-images.js` — HEAD check, skip existing)
- `.env.production` butuh `MINIO_PUBLIC_URL="https://cdn.easylegal.my.id/images"`

---

## Konvensi

1. **Path alias:** `@/*` → `src/*`
2. **Mutations:** Server Actions (`"use server"`), jangan API routes
3. **Dashboard pages:** Wajib `export const dynamic = "force-dynamic"` + `getSession()` guard
4. **Halaman service:** Single-file pattern (700-1500 lines) — jangan dipecah
5. **WhatsApp links:** Pake `getWhatsAppLink()` dari `src/lib/config.ts` — stop hardcoding
6. **Uploads:** `public/uploads/` di-gitignore — cuma `.gitkeep` yang di-commit
7. **Secrets:** `.env.production`, `nginx/certs/`, `*.pem` — jangan pernah di-commit
8. **Bahasa:** UI Indonesian, admin Indonesian, semua Indonesian
9. **Animasi:** GSAP + Framer Motion doang — jangan tambah library lain
10. **Indonesia first:** Semua output, komentar, dokumentasi pake Bahasa Indonesia kecuali library code
