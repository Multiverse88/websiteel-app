# Recap Development Website EasyLegal — Agustus 2026

> Repo: `Multiverse88/websiteel-app` | Status per 1 September 2026

---

## 1. Ringkasan Eksekutif

Agustus 2026 menjadi bulan paling intens dalam development website EasyLegal dengan **84 commits** dan **5 pilar fitur utama** yang diluncurkan ke production.

| Pilar | Status | Commits |
|-------|--------|---------|
| Multi-domain (co.id) | ✅ Production | 6 |
| WhatsApp Lead Rotator | ✅ Production | 12 |
| Analytics & Attribution | ✅ Production | 4 |
| UI/UX & Navbar | ✅ Production | 15 |
| Admin Dashboard | ✅ Production | 10 |

**Puncak aktivitas:** 18 Agustus (42 commits) — peak development hari tersebut mencakup migrasi halaman PSE, perubahan-akta, dan perbaikan UI hero.

---

## 2. Penyelesaian Bulan Ini

### 2.1 Multi-Domain Deployment (easylegal.co.id)

**Masalah:** `easylegal.co.id` belum memiliki deployment terpisah dari `biz.id`.

**Yang dikerjakan:**
- Clone `apps/web` → `apps/web-co` (deploy terpisah dengan Dockerfile sendiri)
- Fix CORS allowlist untuk `easylegal.co.id` + `www` variants
- Fix CSP `frame-ancestors` untuk Google Tag Assistant preview
- Fix GTM: `lazyOnload` → `afterInteractive` (root cause preview gagal)
- Fix CSP: tambahkan `ws: wss:` ke `connect-src` untuk WebSocket Preview
- SSL cert issuance: Let's Encrypt YR1, SAN = `biz.id, co.id, www.*`
- Resolve merge conflict di `attribution.ts` (stray backslash fix)

**Status:** ✅ Production — domain `easylegal.co.id` live dengan SSL valid.

---

### 2.2 WhatsApp Lead Rotator & Attribution

**Masalah:** Lead dari WhatsApp tidak bisa dilacak per sumber (halaman, tombol, nomor).

**Yang dikerjakan:**
- Replace `mauorder.online` rotator dengan in-house version
- Add lead tracking + entry-point/product attribution ke rotator
- Route semua hardcoded WA CTAs melalui rotator
- Ad-slug landing pages sebagai attribution fallback (`/jasa-pendirian-pt-gads`, dll)
- Track "Interested Service" per lead (bukan cuma halaman)
- WhatsApp attribution tracking through closing
- Per-page autotext override + restricted number pool
- Per-page autotext picker (page path list)
- Allow editing number digits (bukan cuma label/active)
- Prefill Per Halaman autotext dari text yang dipakai
- Per-button autotext override (pilot: `pengajuan-pkp`)
- Rollout `ctaId` ke semua pricing-list buttons
- Track dan customize semua web CTA messages
- Expand "Per Halaman" menjadi list semua buttons
- Sync `ctaId` wiring dari `apps/web` ke `web-co`
- Personalized greeting + per-domain autotext override
- Auto-refresh Nomor & Leads tabs setiap 15 detik

**Status:** ✅ Production — semua fitur WA rotator aktif di `biz.id` dan `co.id`.

---

### 2.3 Analytics & Tracking

**Masalah:** GA4/GTM belum ter-install dengan benar, tracking event terbatas.

**Yang dikerjakan:**
- Install GA4 `gtag.js` manual di setiap page
- Custom GA4/GTM events untuk user-journey tracking
- Allow Google Tag Assistant preview through CSP
- Fix GTM strategy untuk Preview mode (`lazyOnload` → `afterInteractive`)

**Status:** ✅ Production — GA4 dan GTM aktif, tag assistant preview works.
- Container ID: `GTM-TVHZW45Q`
- Measurement ID: `G-02KE12HWY1`

---

### 2.4 Navbar & UI/UX

**Masalah:** Mega-menu tidak stabil, navbar click-through bugs, mobile menu bermasalah.

**Yang dikerjakan:**
- Hover bridge + z-index untuk mega menu popups
- Delay unmount on link click (prevent router abort)
- Fix mega-menu sub-item flyout stealing clicks
- Fix navbar click navigation: close menu on route change
- Disable auto-prefetch on mega-menu links
- Force hard navigation on all Navbar links
- Tailwind named groups untuk prevent nested popup trigger
- Convert desktop Layanan/Tools dropdown ke `<details>/<summary>`
- Fix popup hover overlap dan sticky touch bugs
- Make mega menu sub-items expandable in mobile
- Prevent click outside logic from closing mobile dropdowns prematurely
- Reorder mobile menu (Layanan second, Tools third)
- Red active state text color untuk mobile sub-item toggles
- Sync fixes ke `apps/web-co`

**Status:** ✅ Production — navbar stabil di semua device.

---

### 2.5 Admin Dashboard

**Masalah:** Dashboard features terbatas, cache invalidation, redirect management.

**Yang dikerjakan:**
- Auto-run migrations on API startup
- Domain-specific shortlinks untuk Redirects
- Add Redirects & Promos ke Layout sidebar
- Make redirect short links clickable + copyable
- Truncate long destination URLs di table
- Real cache-bust (side-effect statement)
- Cache-bust build hash
- Handle expired sessions dan API 401
- Normalize admin login, remove bootstrap route
- Fix logout yang tidak bekerja

**Status:** ✅ Production — semua fitur dashboard aktif.

---

### 2.6 SEO & Content

**Yang dikerjakan:**
- "Artikel Terkait" internal-linking section ke semua layanan pages
- Per-article FAQ + global header/footer template
- `/promo` redirect ke homepage promo section
- Trailing-slash URL handling via middleware rewrite
- Badan usaha canonical URL follow request domain
- Use real Host header untuk og:url
- Custom share-preview description
- Reorder mobile menu sections
- Categorize contacts: Customer Care/Partnership/Affiliate/Call Support
- Update client logos (59 logos) dan marquee animation
- Change Pendirian PT estimate ke 12 jam kerja
- Update copywriting section "Kenapa EasyLegal"

---

### 2.7 Design & Layout Migration

**Yang dikerjakan:**
- Raise ISO/PSE badge 20px
- Enhance mobile section paddings
- Remove redundant pricing wrapper
- Add 4th manfaat item ke pembubaran
- Migrasi `pse` page ke standalone layout (match nib-oss)
- Migrasi `perubahan-akta` page ke standalone layout
- Dark premium style untuk layanan tambahan
- Pricing cards dark premium oklch gradients
- Refactor apostille layout
- Fix hydration error Offices section
- Uniform bold text untuk TERPERCAYA card
- Scale up client logos
- Speed up marquee (120s → 60s)

---

### 2.8 Security & Infrastructure

**Yang dikerjakan:**
- Harden `.gitignore` against secret files
- Security patch update
- CSP hardening untuk GTM Preview
- Fix Minio proxy IP (docker bridge → public host IP `157.10.252.77`)
- Explicit rewrites untuk top-level public images
- Fix minio proxy fallback ke `172.17.0.1`

**SSL Certificates:**
- Issued: 22 Agustus 2026
- Expires: 20 November 2026 (~2 bulan lagi)
- SAN: `biz.id, co.id, my.id, www.*`

---

## 3. Statistik Development

### 3.1 Commit Distribution

| Minggu | Commits | Fokus |
|--------|---------|-------|
| 3-7 Agu | 46 | WA rotator, navbar fixes |
| 10-15 Agu | 41 | Attribution, dashboard, security |
| 18-24 Agu | 100 | SSL, multi-domain, design migration |
| 26-31 Agu | 52 | GA4/GTM, sync web-co, final polish |

**Total:** ~239 commits pada Agustus 2026

### 3.2 Files Changed

| App | Files | Catatan |
|-----|-------|---------|
| `apps/web` | ~80 | Core production app |
| `apps/web-co` | ~80 | Clone untuk co.id |
| `apps/api` | ~15 | Migrations, auth, leads |
| `docs/plans` | 3 | WhatsApp attribution plans |

---

## 4. Eskalasi Bulan Depan (September 2026)

### 4.1 Priority High — Performance & Reliability

| No | Item | Target |
|----|------|--------|
| 1 | **Core Web Vitals** | LCP < 2.5s, CLS < 0.1, INP < 200ms |
| 2 | **Image Optimization** | Convert ke WebP/AVIF, lazy loading, responsive srcset |
| 3 | **SSL Renewal** | Automatic renewal setup sebelum Nov 2026 |
| 4 | **Deploy Automation** | Enable auto-deploy via webhook/github action |

### 4.2 Priority Medium — Feature Expansion

| No | Item | Target |
|----|------|--------|
| 5 | **SEO Audit** | Lighthouse score > 90, fix broken links, validate structured data |
| 6 | **PSE Compliance** | Complete PSE page dengan semua regulatory requirements |
| 7 | **Analytics Deep-Dive** | GA4 custom reports untuk WA lead conversion |
| 8 | **Multi-language Base** | Prepare i18n structure (EN/ID toggle ready) |

### 4.3 Priority Low — Maintenance & Tech Debt

| No | Item | Target |
|----|------|--------|
| 9 | **Middleware → Proxy** | Migrate ke `proxy` pattern (Next.js 16 deprecation) |
| 10 | **Bundle Analysis** | Identify heavy deps, implement code splitting |
| 11 | **Test Coverage** | Unit tests untuk attribution + rotator logic |
| 12 | **CI/CD Pipeline** | GitHub Actions untuk auto-test + deploy |

### 4.4 Nice to Have — Enhancement

| No | Item | Target |
|----|------|--------|
| 13 | **A/B Testing** | CTA placement & copy testing |
| 14 | **Chatbot Enhancement** | Advanced typebot untuk lead qualification |
| 15 | **Internal Analytics** | Dashboard tracking WA leads + conversion rate |
| 16 | **Blog CMS** | Headless CMS untuk artikel (currently manual) |

---

## 5. Current Status Summary

| Component | Status | Notes |
|-----------|--------|-------|
| `easylegal.biz.id` | ✅ Production | CSP + GTM fix deployed |
| `easylegal.co.id` | ✅ Production | SSL + deploy terpisah active |
| `easylegal.my.id` | ⚠️ Redirect | Cloudflare redirect ke biz.id |
| WhatsApp Rotator | ✅ Production | 15s auto-refresh, per-button tracking |
| GA4 + GTM | ✅ Production | Preview mode working |
| Admin Dashboard | ✅ Production | Migrations auto-run, redirects working |
| SSL Certificates | ✅ Valid | Expires 20 Nov 2026 |

---

## 6. Technical Notes

- **Branch strategy:** `develop` untuk fitur, `main` untuk production
- **Deploy trigger:** Manual dari Dokploy panel (auto-deploy masih disabled)
- **CORS:** `easylegal.co.id` + variants sudah di-allowlist
- **GTM Container:** `GTM-TVHZW45Q`
- **GA4 Measurement:** `G-02KE12HWY1`
- **Next.js Version:** 16.3.1 (Turbopack enabled)
- **Deploy script:** `scripts/deploy.sh`
- **Webhook endpoint:** `https://panel.easylegal.my.id/api/deploy/Ge2Au_0IMXd2bRNdAJSSp` (disabled)

---

## 7. Risks & Action Items

| Risk | Impact | Mitigation |
|------|--------|------------|
| SSL expires Nov 2026 | High | Set reminder renew by Oct 20 |
| Auto-deploy disabled | Medium | Enable webhook atau setup GitHub Actions |
| Cloudflare redirect my.id | Low | Dokumentasikan sebagai intentional |
| Middleware deprecation | Medium | Plan migration ke proxy pattern |

---

*Dibuat: 1 September 2026*
