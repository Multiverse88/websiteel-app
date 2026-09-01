# Recap Development Website EasyLegal — Agustus 2026

> Repo: `Multiverse88/websiteel-app` | Status per 1 September 2026

---

## 1. Ringkasan Eksekutif

Selama Agustus 2026, tim mengembangkan **5 pilar utama**:

| Pilar | Status | Dampak |
|-------|--------|--------|
| Multi-domain (co.id) | ✅ Production | Domain baru + SSL + deploy terpisah |
| WhatsApp Lead Rotator | ✅ Production | Tracking lead per nomor, per halaman, per tombol |
| Analytics & Attribution | ✅ Production | GA4, GTM, lead source tracking, ad-slug fallback |
| UI/UX & Navbar | ✅ Production | Mega-menu fixes, mobile responsive, hero redesign |
| Admin Dashboard | ✅ Production | Redirects, cache-bust, migration auto-run |

**Total commit:** ~90+ commits pada Agustus-September 2026.

---

## 2. Penyelesaian Bulan Ini

### 2.1 Multi-Domain Deployment (easylegal.co.id)

**Masalah:** `easylegal.co.id` belum memiliki deployment terpisah. Hanya ada `biz.id` dan `my.id`.

**Yang dikerjakan:**
- `2aaf58b` Clone `apps/web` → `apps/web-co` (deploy terpisah)
- `aa52865` Fix CORS allowlist untuk `easylegal.co.id` + `www` variants
- `d2a6831` / `dc3c0b5` Fix CSP `frame-ancestors` untuk Google Tag Assistant
- `d0b601f` Fix GTM: `lazyOnload` → `afterInteractive` (root cause preview gagal)
- `dd4a4bf` Fix CSP: tambahkan `ws: wss:` ke `connect-src` untuk GTM Preview WebSocket
- `ec5143b` Fix stray backslash di `attribution.ts` (merge conflict resolution)
- SSL cert issuance untuk `co.id` (Let's Encrypt YR1, SAN: `biz.id, co.id, www.*`)

**Status:** ✅ Production — domain `easylegal.co.id` live dengan SSL valid.

---

### 2.2 WhatsApp Lead Rotator & Attribution

**Masalah:** Lead dari WhatsApp tidak bisa dilacak per sumber (halaman, tombol, nomor).

**Yang dikerjakan:**
- `0afe6d1` Replace `mauorder.online` rotator dengan in-house version
- `f4d3818` Add lead tracking + entry-point/product attribution ke rotator
- `c8b2820` Route semua hardcoded WA CTAs melalui rotator
- `9fde1bb` Ad-slug landing pages sebagai attribution fallback (`/jasa-pendirian-pt-gads`, dll)
- `6f938d3` Track "Interested Service" per lead (bukan cuma halaman)
- `42e39fe` WhatsApp attribution tracking through closing
- `9fcee76` Per-page autotext override + restricted number pool
- `5230bce` Per-page autotext picker (page path list)
- `7aee120` Allow editing number digits (bukan cuma label/active)
- `a5fe7b9` Prefill Per Halaman autotext dari text yang dipakai
- `d854936` Per-button autotext override (pilot: `pengajuan-pkp`)
- `9d7b748` Rollout `ctaId` ke semua pricing-list buttons
- `bc53469` Track dan customize semua web CTA messages
- `24b1ef8` Expand "Per Halaman" menjadi list semua buttons
- `32c1b8f` Sync `ctaId` wiring dari `apps/web` ke `web-co`
- `b58f728` Personalized greeting + per-domain autotext override
- `df017a3` Auto-refresh Nomor & Leads tabs setiap 15 detik

**Status:** ✅ Production — semua fitur WA rotator aktif di `biz.id` dan `co.id`.

---

### 2.3 Analytics & Tracking

**Masalah:** GA4/GTM belum ter-install dengan benar, tracking event terbatas.

**Yang dikerjakan:**
- `007b4e6` Install GA4 `gtag.js` manual di setiap page
- `43fc5d5` Custom GA4/GTM events untuk user-journey tracking
- `d2a6831` Allow Google Tag Assistant preview through CSP
- `d0b601f` Fix GTM strategy untuk Preview mode

**Status:** ✅ Production — GA4 dan GTM aktif, tag assistant preview works.

---

### 2.4 Navbar & UI/UX

**Masalah:** Mega-menu tidak stabil, navbar click-through bugs, mobile menu bermasalah.

**Yang dikerjakan:**
- `e2a6832` Hover bridge + z-index untuk mega menu popups
- `dcea10e` Delay unmount on link click (prevent router abort)
- `2d7ce86` Fix mega-menu sub-item flyout stealing clicks
- `65236f0` Fix navbar click navigation: close menu on route change
- `3cc61e5` Disable auto-prefetch on mega-menu links
- `ebdadb5` Force hard navigation on all Navbar links
- `89fe9d8` Tailwind named groups untuk prevent nested popup trigger
- `11f4d27` Convert desktop Layanan/Tools dropdown ke `<details>/<summary>`
- `52d7169` Fix popup hover overlap dan sticky touch bugs
- `a8b35b7` Make mega menu sub-items expandable in mobile
- `f559140` Prevent click outside logic from closing mobile dropdowns prematurely
- `7d8696f` Reorder mobile menu (Layanan second, Tools third)
- `b68e900` Red active state text color untuk mobile sub-item toggles

**Status:** ✅ Production — navbar stabil di semua device.

---

### 2.5 Admin Dashboard

**Masalah:** Dashboard features terbatas, cache invalidation, redirect management.

**Yang dikerjakan:**
- `dd3922d` Auto-run migrations on API startup
- `598fd00` Domain-specific shortlinks untuk Redirects
- `73f482d` Add Redirects & Promos ke Layout sidebar
- `a7a7373` Make redirect short links clickable + copyable
- `3fa9d73` Truncate long destination URLs di table
- `36a3393` Real cache-bust (side-effect statement)
- `6c77360` Cache-bust build hash
- `dd44075` Handle expired sessions dan API 401
- `870dcf2` Normalize admin login, remove bootstrap route
- `3739384` Fix logout yang tidak bekerja

**Status:** ✅ Production — semua fitur dashboard aktif.

---

### 2.6 SEO & Content

**Yang dikerjakan:**
- `d9aefe7` "Artikel Terkait" internal-linking section
- `3941f25` Per-article FAQ + global header/footer template
- `5b5cf18` `/promo` redirect ke homepage promo section
- `b040410` Trailing-slash URL handling via middleware rewrite
- `163b975` Badania usaha canonical URL follow request domain
- `e152da5` Use real Host header untuk og:url
- `a459a34` Custom share-preview description

---

### 2.7 Style & Layout

**Yang dikerjakan:**
- `62295b9` Raise ISO/PSE badge 20px
- `ba4a194` Enhance mobile section paddings
- `f1e6e5f` Remove redundant pricing wrapper
- `9746b6e` Add 4th manfaat item ke pembubaran
- `e7ae7da` Migrasi `pse` page ke standalone layout
- `eec92c0` Migrasi `perubahan-akta` ke standalone layout
- `4ff4e08` Dark premium style untuk layanan tambahan
- `9fae02c` Pricing cards dark premium oklch gradients
- `cd07a4e` Refactor apostille layout
- `eaf52e6` Fix hydration error Offices section
- `368187a` Uniform bold text untuk TERPERCAYA card
- `559e10c` Scale up client logos
- `1f8b43f` Speed up marquee (120s → 60s)
- `75aaea2` Change Pendirian PT estimate ke 12 jam kerja
- `77cd065` Categorize contacts: Customer Care/Partnership/Affiliate/Call Support

---

### 2.8 Security

**Yang dikerjakan:**
- `b55bdf6` Harden `.gitignore` against secret files
- `150ddb7` Security patch update
- CSP hardening untuk GTM Preview

---

### 2.9 Infrastructure

**Yang dikerjakan:**
- `1004680` Fix Minio proxy IP (docker bridge → public host IP)
- `6748776` Explicit rewrites untuk top-level public images
- `e7ae7da` Fix minio proxy fallback ke `172.17.0.1`

---

## 3. Eskalasi Bulan Depan (September 2026)

### 3.1 Priority High — Performance & Core Web Vitals

| No | Item | Deskripsi |
|----|------|-----------|
| 1 | **LCP Optimization** | Target < 2.5s — optimize hero images, preload critical resources |
| 2 | **CLS Fix** | Prevent layout shift pada navbar dan floating WA button |
| 3 | **INP Improvement** | Target < 200ms — optimize event handlers, reduce main thread blocking |
| 4 | **Image Optimization** | Convert semua gambar ke WebP/AVIF, implement lazy loading |

### 3.2 Priority Medium — Feature Expansion

| No | Item | Deskripsi |
|----|------|-----------|
| 5 | **SEO Audit** | crawling test, fix broken links, validate structured data |
| 6 | **PSE Compliance** | Complete PSE page dengan semua regulatory requirements |
| 7 | **Multi-language** | Prepare i18n structure (minimal EN/ID toggle) |
| 8 | **API Rate Limiting** | Implement rate limiter untuk public endpoints |

### 3.3 Priority Low — Maintenance & Tech Debt

| No | Item | Deskripsi |
|----|------|-----------|
| 9 | **Middleware → Proxy** | Next.js 16 deprecated `middleware` — migrate ke `proxy` |
| 10 | **Bundle Analysis** | Identify heavy dependencies, implement code splitting |
| 11 | **Test Coverage** | Add unit tests untuk attribution logic, rotator |
| 12 | **CI/CD Pipeline** | Setup GitHub Actions untuk auto-test + deploy |

### 3.4 Nice to Have

| No | Item | Deskripsi |
|----|------|-----------|
| 13 | **A/B Testing** | Implement A/B untuk CTA placement |
| 14 | **Chatbot Enhancement** | Advanced typebot flow untuk lead qualification |
| 15 | **Analytics Dashboard** | Internal dashboard untuk tracking WA leads + conversion |
| 16 | **Blog System** | CMS untuk artikel (saat ini manual) |

---

## 4. Current Status Summary

| Component | Status | Notes |
|-----------|--------|-------|
| `easylegal.biz.id` | ✅ Production | CSP + GTM fix deployed |
| `easylegal.co.id` | ✅ Production | SSL + deploy terpisah active |
| `easylegal.my.id` | ⚠️ Redirect | Cloudflare-level redirect ke biz.id |
| WhatsApp Rotator | ✅ Production | 15s auto-refresh, per-button tracking |
| GA4 + GTM | ✅ Production | Preview mode working |
| Admin Dashboard | ✅ Production | Migrations auto-run, redirects working |
| SSL Certificates | ✅ Valid | YR1, expires Oct 2026 |

---

## 5. Technical Notes

- **Branch strategy:** `develop` untuk fitur, `main` untuk production
- **Deploy trigger:** Manual dari Dokploy panel (auto-deploy disabled)
- **CORS:** `easylegal.co.id` + variants sudah di-allowlist
- **GTM Container:** `GTM-TVHZW45Q`
- **GA4 Measurement:** `G-02KE12HWY1`
- **Next.js Version:** 16.3.1 (Turbopack enabled)

---

*Dibuat: 1 September 2026*
