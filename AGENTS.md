# AGENTS.md — EasyLegal

**EasyLegal** (`easylegal.my.id`) — Platform jasa legalitas bisnis Indonesia.
Next.js 16 App Router, PostgreSQL + Prisma, JWT + TOTP-2FA admin dashboard.
12+ halaman layanan hukum, CMS artikel, newsletter broadcast.

---

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build (migrate + next build) | `npm run build` |
| Lint (ESLint flat config) | `npm run lint` |
| Type-check | `npx tsc --noEmit` |
| Playwright smoke tests | `npm test` |
| Single test | `npx playwright test tests/smoke.spec.ts` |
| Apply DB migrations | `npx prisma migrate deploy` |
| New migration | `npx prisma migrate dev --name <name>` |
| Seed DB | `npx prisma db seed` |
| Run TS script | `npx tsx scripts/<file>.ts` |

**Warning:** `npm test` starts a dev server (conflicts with running instance). Never run during deploy.

---

## Architecture

### Mutations = Server Actions, NOT API Routes
No `app/api/*` route handlers exist (only auto-generated Sentry example). All mutations use `"use server"` files.

### Auth Dashboard
1. Login → bcrypt verify → sets `pending_2fa_user` cookie (5 min)
2. 2FA setup/verify → mints 24h HS256 JWT (`jose`) → sets `admin_token` httpOnly cookie
3. Middleware (`src/middleware.ts`) guards `/dashboard/*` via `jwtVerify`
4. Every dashboard page: `export const dynamic = "force-dynamic"` + defensive `getSession()` + `redirect("/login")`

### Service Pages
- **Template-driven:** `pendirian-badan-usaha/` → `BadanUsahaTemplate` + `data/layanan-badan-usaha.tsx`
- **Self-contained:** `merek-haki/`, `nib-oss/`, `press-release/` (700–1500 lines each)
- SEO rewrite rules in `next.config.ts` (→ 50+ URL aliases for ads)

### Articles
- Seed (`prisma/seed.ts`): reads `prisma/articles-seed.json` (~190 articles) + 10 inline. **Does NOT create admin user or system settings.**
- Listing (`artikel/page.tsx`): SSR, `force-dynamic`, auto-seeds if DB empty.
- Detail (`artikel/[slug]/page.tsx`): custom markdown renderer, auto-ToC, view-count tracking.
- CMS (`dashboard/artikel/tambah/`): client component, live preview, file upload (5MB) or URL mode.

### Newsletter
Subscribe widget → `NewsletterSubscriber` table. Admin broadcast via Nodemailer → `EmailLog`. Auto-broadcast via `SystemSetting`. Falls back to console simulation if SMTP absent.

### Prisma Models
`User`, `Article`, `NewsletterSubscriber`, `NewsletterBroadcast`, `EmailLog`, `SystemSetting`, `ContactSubmission`.

---

## Styling

- **Tailwind v4** — no `tailwind.config.js`, tokens in `src/app/globals.css` `@theme {}`
- **Colors:** `primary #D62828`, `primary-light #FEF2F2`, `primary-hover #B91C1C`, `whatsapp #25D366`, admin `crimson #990202`
- **Fonts:** DM Sans (body + headings via `--font-dm-sans`). **Only DM Sans is loaded** — Plus Jakarta Sans and Inter are named in docs but not imported.
- **Animations:** GSAP + Framer Motion — no other libs
- **shadcn/ui:** style `new-york`, base `neutral`. Add with `npx shadcn@latest add <name>`

---

## Conventions

1. Path alias `@/*` → `src/*`
2. All mutations → Server Actions (`"use server"`), never API routes
3. Dashboard pages: `force-dynamic` + `getSession()` guard
4. Service pages: single-file pattern (700–1500 lines) or template-driven — don't fragment
5. WhatsApp links: use `getWhatsAppLink()` from `src/lib/config.ts`
6. Uploads gitignored (`public/uploads/`), only `.gitkeep` committed
7. `.env.production`, `nginx/certs/`, `*.pem` — never commit
8. UI/komentar/dokumentasi: **Indonesian**

---

## Deploy

```bash
# Manual
docker compose build --no-cache && docker compose up -d

# Via script
bash scripts/deploy.sh   # backup → pull → build → up -d → cleanup → health check
```

**Pre-requisites:** Docker, PostgreSQL on host (not in Compose), Let's Encrypt certs at `/etc/letsencrypt/live/easylegal.my.id/`, `.env.production` in root.

**Dockerfile CMD:** `npx prisma@6.19.3 migrate deploy && node scripts/sync-images.js && node server.js` — migrations + image sync on every start.

**Gotchas:**
- PostgreSQL connects to host at `172.17.0.1:5432` (via `host.docker.internal`)
- Nginx also proxies `easyai.id` → a separate `recruit-app` (port 3000 on host). If that service is missing, nginx 502s for that domain only — not affecting easylegal.my.id.
- `cdn.easylegal.my.id` DNS must CNAME to `157.10.252.77`

---

## MinIO / CDN

MinIO container `cdn-storage` (ports 9000/9001), bucket `images`. Public via `cdn.easylegal.my.id` (nginx proxy).

| Flow | Detail |
|------|--------|
| Upload | Dashboard → `uploadToMinio()` → MinIO → CDN URL |
| Static images | `scripts/sync-images.js` syncs `public/` → MinIO (HEAD check, skip existing) |
| URL | `https://cdn.easylegal.my.id/images/hero/hero.jpg` |

**Key mapping:** `public/images/hero/hero.jpg` → key `hero/hero.jpg` (bucket name `images` strips prefix).

---

## Diagnosa Cepat

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `Can't reach database server` | PostgreSQL down on host | `systemctl start postgresql` |
| Build crash at startup | Pending Prisma migration | `docker compose exec app npx prisma migrate deploy` |
| Container restart loop | Port 3000 conflict on host | Kill other process on :3000 |
| Cert error in browser | SSL expired | `certbot renew` |
| MinIO sync error at startup | MinIO credentials misconfigured | Check `.env.production` MinIO vars |

---

## Testing

- Playwright smoke tests: `tests/smoke.spec.ts`
- Checks 9 main pages + 11 service pages for console errors & HTTP < 400
- Config: `playwright.config.ts` — auto-starts dev server on port 3000
- **Do not run during deploy** — will conflict with the running instance

---

## Sentry

Configured via `@sentry/nextjs` in `next.config.ts` (wraps in `withSentryConfig` for production). `instrumentation.ts` initializes server/edge configs. Tunnel endpoint at `/monitoring`. Sentry DSN injected via `.env.production`.
