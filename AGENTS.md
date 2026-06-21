# AGENTS.md — Agent Instructions

Compact reference for all AI agents working on this codebase.

---

## Project Overview

**EasyLegal** (`easylegal.id`) — Indonesian business-legality services platform.
Next.js 16 App Router, PostgreSQL + Prisma, JWT + TOTP-2FA admin dashboard.
12+ legal service pages, article CMS, newsletter broadcast system.

---

## Critical Gotchas

### 1. `package.json:10` — Windows-Only Test Command
```json
"test": "set NODE_OPTIONS=--disable-warning=DEP0205&& npx playwright test"
```
**This will FAIL on Linux VPS.** Fix before deploy: change to `NODE_OPTIONS=--disable-warning=DEP0205 npx playwright test`.

### 2. `deploy.sh` Runs Playwright Tests (Port Conflict)
Lines 31-37 run `npm test` which starts a dev server on port 3000 — conflicts with Docker container.
**Fix:** Skip test step or make optional. Tests should run in CI, not during deploy.

### 3. Middleware is Dead Code
`src/proxy.ts` exports `proxy` function, but Next.js requires `src/middleware.ts` exporting `middleware`.
Dashboard only works because each page calls `getSession()` defensively.
**Fix:** Rename `src/proxy.ts` → `src/middleware.ts`, change export name.

### 4. 2FA userId Validation Missing
`src/app/login/actions-2fa.ts` accepts `userId` from client without validating against `pending_2fa_user` cookie.
Attacker can overwrite any user's 2FA secret by crafting their own cookie.
**Fix:** Validate cookie matches argument before processing.

### 5. 2FA Brute Force (No Rate Limiting)
`verifyTwoFactorSetup` and `verifyTwoFactorLogin` have no rate limiting.
6-digit TOTP can be brute-forced easily.
**Fix:** Extend `src/lib/rate-limit.ts` with `twoFactorAttempts` Map.

### 6. HTML Injection in Email Body
`src/app/kontak/actions.ts` interpolates `data.name`, `data.email`, etc. directly into HTML string.
User can inject malicious HTML/script into email notifications.
**Fix:** Create `escapeHtml()` helper in `src/lib/utils.ts`, apply to all user input.

### 7. Sentry Hardcoded DSN + PII Risk
`sentry.server.config.ts` and `sentry.edge.config.ts` have hardcoded DSN, `sendDefaultPii: true` (sends user IDs), `tracesSampleRate: 1` (100% — expensive).
Also missing `sentry.client.config.ts`.
**Fix:** Use env var, set `sendDefaultPii: false`, reduce sample rate to 0.1, create client config.

### 8. `template.tsx` Forces GSAP on ALL Pages
`src/app/template.tsx` sets `opacity: 0` via GSAP on mount, includes dashboard routes.
Causes flash of invisible content on every page load.
**Fix:** Conditional animation — only apply to public routes.

### 9. `global-error.tsx` Missing Indonesian Content
`src/app/global-error.tsx` uses English and has no retry button.
**Fix:** Add `lang="id"`, retry button, EasyLegal branding.

### 10. `CLAUDE.md` Inaccuracies
- Seed script description is wrong (creates only articles, no admin user/settings)
- Middleware description is wrong (dead code)
- Article listing description says "auto-seeds" which is misleading

---

## Commands (All from `websiteel-app/`)

```bash
npm install              # Install deps (runs prisma generate via postinstall)
npm run dev              # Dev server http://localhost:3000
npm run build            # Production: prisma migrate deploy && next build
npm run start            # Start production server
npm run lint             # ESLint (flat config eslint.config.mjs)
npx tsc --noEmit         # Type-check
npm test                 # Playwright smoke tests (DO NOT run during deploy)
npx playwright test tests/smoke.spec.ts  # Single test file
npx prisma migrate deploy                # Apply migrations
npx prisma migrate dev --name <name>     # Create new migration
npx prisma db seed                        # Seed database
npx tsx scripts/<file>.ts                # Run single TS script
```

---

## Architecture Patterns

### Server Actions (NOT API Routes)
All mutations use `"use server"` files. There are NO `app/api/*` route handlers.
Reference: `src/app/dashboard/newsletter/actions.ts`

### Dashboard Auth Flow
1. Login → bcrypt verify → set `pending_2fa_user` cookie (5 min)
2. 2FA setup/verify → mint 24h JWT → set `admin_token` cookie
3. Middleware (dead code) + each page calls `getSession()` defensively

### Service Pages
- **Template-driven:** `pendirian-badan-usaha/` → `BadanUsahaTemplate` + `data/layanan-badan-usaha.tsx`
- **Self-contained:** `merek-haki/`, `nib-oss/`, `press-release/` (700-1500 lines each)
- All currently `"use client"` — should be converted to server components

### Article System
- Listing: `src/app/artikel/page.tsx` (SSR, force-dynamic)
- Detail: `src/app/artikel/[slug]/page.tsx` (SSR, custom markdown, ToC)
- CMS: `src/app/dashboard/artikel/tambah/` (client component with live preview)

### Newsletter
- Subscribe: widget on article pages → `NewsletterSubscriber` table
- Broadcast: admin dashboard → Nodemailer → `EmailLog` table
- Auto-broadcast on article creation (via `SystemSetting`)

---

## Environment Setup

### Required `.env` Variables
```bash
DATABASE_URL="postgresql://user:pass@host.docker.internal:5432/easylegal?schema=public"
DIRECT_URL="postgresql://user:pass@host.docker.internal:5432/easylegal?schema=public"
JWT_SECRET="openssl rand -base64 32"
```

### Optional
```bash
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT=465
SMTP_USER="newsletter@easylegal.id"
SMTP_PASS="your_password"
SMTP_FROM='"Easy Legal" <newsletter@easylegal.id>'
NEXT_PUBLIC_APP_URL="https://easylegal.id"
NEXT_PUBLIC_WHATSAPP_NUMBER="6281123456789"
DISABLE_SECURE_COOKIES="true"  # local dev only
```

---

## Styling

- **Tailwind v4** — no `tailwind.config.js`, tokens in `src/app/globals.css` `@theme` block
- **Colors:** `primary #D62828`, `primary-light #FEF2F2`, `primary-hover #B91C1C`, `crimson #990202`, `whatsapp #25D366`
- **Fonts:** DM Sans (body), Plus Jakarta Sans (secondary), Inter (headings) — via `next/font/google`
- **Animations:** GSAP + Framer Motion only — NO third animation libraries
- **shadcn/ui:** style `new-york`, base `neutral` — add with `npx shadcn@latest add <name>`

---

## File Structure

```
src/
├── app/                # App Router pages + Server Actions
│   ├── (public)        # /, /tentang-kami, /kontak, /artikel, /layanan/*
│   ├── login/          # /login + 2FA actions
│   └── dashboard/      # Protected dashboard
├── components/         # Shared components
│   ├── home/           # Homepage sections
│   ├── layanan/        # Shared service templates
│   └── ui/             # shadcn primitives
├── data/               # Static content data
├── lib/                # auth.ts, 2fa.ts, db.ts, mail.ts, utils.ts, rate-limit.ts
├── hooks/              # Custom hooks
└── proxy.ts            # Dead middleware (should be middleware.ts)
```

---

## Testing

- Playwright smoke tests in `tests/`
- Config: `playwright.config.ts`
- **Run with:** `npm test`
- **Do NOT run during deploy** — causes port conflicts

---

## Deploy

```bash
# On VPS:
git pull origin main
bash scripts/deploy.sh

# Manual deploy:
docker compose build --no-cache
docker compose up -d
docker compose logs -f app
```

**Prerequisites:**
- Docker + Docker Compose
- PostgreSQL on host (not in Compose)
- Let's Encrypt certs in `nginx/certs/`
- `.env.production` file

---

## Known Issues

| Issue | Location | Severity |
|-------|----------|----------|
| Windows test command | `package.json:10` | **BLOCKER** |
| Deploy runs tests | `scripts/deploy.sh:31-37` | **BLOCKER** |
| Dead middleware | `src/proxy.ts` | HIGH |
| 2FA userId validation | `src/app/login/actions-2fa.ts` | HIGH |
| No 2FA rate limiting | `src/app/login/actions-2fa.ts` | HIGH |
| HTML injection in email | `src/app/kontak/actions.ts` | MEDIUM |
| Sentry hardcoded DSN | `sentry.*.config.ts` | MEDIUM |
| GSAP on all pages | `src/app/template.tsx` | MEDIUM |
| 9 dead component files | `src/components/home/` | LOW |
| 80+ hardcoded WhatsApp numbers | 12+ service pages | LOW |
| `CLAUDE.md` inaccuracies | `CLAUDE.md` | LOW |

---

## Conventions

1. **Path alias:** `@/*` → `src/*`
2. **Mutations:** Server Actions with `"use server"`, never API routes
3. **Dashboard pages:** Start with `export const dynamic = "force-dynamic"` + `getSession()` guard
4. **Service pages:** Long single-file is the pattern (700-1500 lines)
5. **WhatsApp links:** Use `getWhatsAppLink()` from `src/lib/config.ts` — stop hardcoding
6. **Uploads:** `public/uploads/` is gitignored — only `.gitkeep` committed
7. **Secrets:** `.env.production`, `nginx/certs/`, `*.pem` — never commit
8. **Language:** UI in Indonesian, admin in Indonesian
9. **Animations:** GSAP + Framer Motion only
