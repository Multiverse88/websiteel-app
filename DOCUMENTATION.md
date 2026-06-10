# EasyLegal Website — Complete Documentation & Analysis

## 1. PROJECT OVERVIEW

**EasyLegal** (easylegal.id) is a comprehensive Indonesian business legality services platform built as a modern web application. It serves UMKM (small-medium enterprises) and entrepreneurs by offering services such as company establishment (PT/CV), trademark registration (HAKI), business licensing (NIB/OSS), ISO certification, tax registration (PKP), visa/KITAS processing, and more.

### Core Identity
- **Brand**: EasyLegal (Easy Legal)
- **Tagline**: "Layanan Hukum & Legalitas Bisnis Terpercaya"
- **Primary Color**: `#990202` (Deep Crimson Red) / `#D62828` (Primary Red)
- **Target Market**: Indonesian entrepreneurs, UMKM, corporate clients
- **Office Locations**: Bandung (HQ), Jakarta, Bekasi
- **Established**: 2020
- **Claimed Clients**: 11,000+ businesses served

---

## 2. TECHNOLOGY STACK

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.6 | React framework (App Router) |
| React | 19.2.4 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first CSS |
| GSAP | 3.15.0 | Page transition animations |
| Framer Motion | 12.40.0 | Scroll-based animations |
| Lucide React | 1.16.0 | Icon library |
| Radix UI | 1.4.3 | Accessible UI primitives (Accordion) |
| shadcn/ui | 4.8.0 | Component library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Next.js Server Actions | — | Form handling, mutations |
| Prisma ORM | 6.19.3 | Database ORM |
| PostgreSQL | — | Primary database |
| JWT (jose) | 6.2.3 | Authentication tokens |
| bcryptjs | 3.0.3 | Password hashing |
| Nodemailer | 8.0.8 | Email delivery |
| otplib | 13.4.0 | 2FA (TOTP) authentication |
| QRCode | 1.5.4 | 2FA QR code generation |

### Infrastructure
| Technology | Purpose |
|---|---|
| Docker | Containerization (multi-stage build) |
| Nginx | Reverse proxy with SSL |
| Docker Compose | Orchestration |
| Let's Encrypt | SSL certificates |
| Standalone output | Next.js standalone deployment |

### Fonts
- **DM Sans** — Primary body font
- **Plus Jakarta Sans** — Secondary font
- **Inter** — Headings & display font

---

## 3. DATABASE SCHEMA (Prisma/PostgreSQL)

### Models

#### `User`
- Admin users with email, bcrypt-hashed password, avatar, bio, role
- 2FA support: `twoFactorSecret` (TOTP secret), `twoFactorEnabled` (boolean)
- Has many Articles (author relation)

#### `Article`
- Blog/education articles with slug, title, excerpt, content (custom markdown), coverImage, category, readTime, viewCount
- Belongs to User (author) — optional, cascade set null on delete

#### `NewsletterSubscriber`
- Email subscribers with `isActive` flag and subscription date

#### `NewsletterBroadcast`
- Tracks broadcast history: articleId, articleTitle, totalSent, sentAt
- Has many EmailLogs

#### `EmailLog`
- Individual email send records: recipient, subject, status (sent/failed/simulated), errorMessage, source (broadcast/auto-broadcast)

#### `SystemSetting`
- Key-value store for system configuration (newsletter auto-broadcast settings)

### Seed Data
- Default admin: `admin@easylegal.id` / `admin123` (bcrypt hashed, salt rounds=12)
- Default system settings for newsletter automation
- 3 auto-seeded articles (PT establishment, HAKI trademark, ISO certification)

---

## 4. SITE ARCHITECTURE & ROUTING

### Public Pages (20+ routes)

| Route | Type | Description |
|---|---|---|
| `/` (page.tsx) | Client | Main homepage — 2239 lines, hero carousel, services, testimonials, FAQ, insights |
| `/home-gads` | Client | Re-exports homepage (Google Ads landing page alias) |
| `/tentang-kami` | Server | About page — story, stats, values, team (8 members), offices |
| `/kontak` | Client | Contact page — 3 contact channels, form, offices, FAQ |
| `/artikel` | Server | Blog listing — auto-seeds DB if empty, grid display |
| `/artikel/[slug]` | Server | Article detail — custom markdown renderer, ToC, related articles, newsletter widget, view tracking |
| `/cek-nama` | Client | Free tool — PT name & trademark name checker (sends to WhatsApp) |
| `/cek-kbli` | Client | Free tool — KBLI code search with 20+ entries, category filter, detail modal |
| `/referral-reseller` | Client | Referral program — commission calculator, simulation, top 10 commissions, FAQ |
| `/kerjasama` | Client | B2B partnership — 4 partnership models, form with validation |

### Service Pages (12 routes under `/layanan/`)

| Route | Lines | Service |
|---|---|---|
| `/layanan/pendirian-badan-usaha` | 720 | PT/CV/Yayasan establishment |
| `/layanan/pendirian-yayasan` | 644 | Foundation establishment |
| `/layanan/merek-haki` | 1021 | Trademark & IP registration |
| `/layanan/nib-oss` | 1365 | NIB & OSS business licensing |
| `/layanan/sertifikasi-iso` | 1266 | ISO certification |
| `/layanan/pengajuan-pkp` | 881 | Taxable entrepreneur registration |
| `/layanan/visa-kitas` | 785 | Visa & work permits |
| `/layanan/pr-media` | 1505 | PR & media online publication |
| `/layanan/press-release` | 1460 | Press release services |
| `/layanan/pelaporan-lkpm` | 1230 | LKPM reporting to BKPM |
| `/layanan/perjanjian-perkawinan` | 1031 | Marriage agreements |
| `/layanan/virtual-office` | 1035 | Virtual office services |

### Admin Pages (Protected)

| Route | Type | Description |
|---|---|---|
| `/login` | Client | Admin login form with 2FA flow |
| `/login/verify-2fa` | Client | 2FA verification page |
| `/login/setup-2fa` | Client | 2FA initial setup |
| `/dashboard` | Server | Dashboard — article list, stats, newsletter link |
| `/dashboard/artikel/tambah` | Client | Article creation with live preview, image upload/URL |
| `/dashboard/newsletter` | — | Newsletter management & broadcast |
| `/dashboard/profile` | — | Admin profile editing |

---

## 5. AUTHENTICATION & SECURITY

### Authentication Flow
1. **Login** (`/login`) → email + password validated via Server Action
2. **2FA Check** → If `twoFactorEnabled`, redirect to `/login/verify-2fa`; otherwise redirect to `/login/setup-2fa`
3. **Session Creation** → JWT token signed with HS256, stored in `admin_token` httpOnly cookie (24h expiry)
4. **Route Protection** → Middleware in `proxy.ts` checks JWT on all `/dashboard/*` routes

### Security Features
- **Password Hashing**: bcryptjs with salt rounds=12
- **JWT Auth**: jose library, httpOnly secure cookies
- **2FA (TOTP)**: Google Authenticator compatible, QR code generation (base64 + local file backup)
- **Cookie Security**: `httpOnly`, `sameSite: lax`, secure in production (configurable via `DISABLE_SECURE_COOKIES`)
- **Middleware Guard**: `proxy.ts` protects dashboard routes with JWT verification
- **Pending 2FA Cookie**: `pending_2fa_user` temporary cookie (5 min expiry) during 2FA flow

### Environment Variables
- `DATABASE_URL` — PostgreSQL connection string
- `DIRECT_URL` — Direct database connection (for migrations)
- `JWT_SECRET` — JWT signing secret
- `DISABLE_SECURE_COOKIES` — Allow non-secure cookies in production
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` — Email configuration
- `NEXT_PUBLIC_APP_URL` — Public base URL for email links

---

## 6. COMPONENT LIBRARY

### Shared Components (`/src/components/`)

| Component | File | Purpose |
|---|---|---|
| **Navbar** | `Navbar.tsx` (294 lines) | Fixed navbar with dropdown layanan (12 services), mobile hamburger drawer, scroll-aware styling |
| **Footer** | `Footer.tsx` (238 lines) | CTA section + trusted-by strip + 4-column footer (brand, layanan, perusahaan, tools) + social icons |
| **CTA** | `CTA.tsx` (90 lines) | Reusable call-to-action — WhatsApp + contact button + SLA text, configurable props |
| **FAQ** | `FAQ.tsx` (104 lines) | Accordion FAQ with expand/collapse animation, configurable items |
| **Offices** | `Offices.tsx` (140 lines) | 3 office cards (Bandung, Jakarta, Bekasi) with Google Maps links |
| **Benefits** | `Benefits.tsx` (71 lines) | 4-column benefit cards grid, configurable items |
| **Pricing** | `Pricing.tsx` (207 lines) | Dynamic pricing table — supports 2-4 packages, groups, checkmarks, footnotes, popular badge |
| **ShareButton** | `ShareButton.tsx` (41 lines) | Copy-to-clipboard article sharing |
| **NewsletterWidget** | `NewsletterWidget.tsx` (121 lines) | Email subscription form with loading/success/error states |

### UI Components (`/src/components/ui/`)
- **Accordion** — Radix UI accordion primitives

---

## 7. KEY FEATURES & FUNCTIONALITY

### 7.1 Homepage (2239 lines)
- **Hero Carousel**: 4 rotating slides (PT, Merek/HAKI, ISO, NIB/OSS) with trust badges
- **Quick Tools**: 3 cards (Cek Nama PT, Cek KBLI, WhatsApp consultation)
- **Partner Logos**: KEMENKUMHAM, OSS BKPM, DJKI, KEMENPERIN, PSE Kominfo
- **Services Grid**: 9 individual service cards with colored icons
- **Why Choose Us**: 4 trust factors (speed, experience, pricing, support)
- **Testimonials**: 3 client reviews with star ratings
- **Blog Insights**: Latest article previews
- **FAQ Section**: Common questions accordion
- **GSAP Animations**: Scroll-triggered reveal animations

### 7.2 Article/Blog System
- **Auto-seeding**: If DB is empty, seeds 3 default articles on first visit
- **Custom Markdown**: Lightweight renderer supporting `### headings`, `**bold**`, bullet/numbered lists, horizontal rules
- **Table of Contents**: Auto-generated from headings
- **View Tracking**: Client-side `ViewTracker` component increments view count
- **Related Articles**: Category-based recommendations
- **Tags**: Auto-generated from category + title keywords
- **Author Cards**: Avatar, name, role, bio display

### 7.3 Article CMS (Dashboard)
- **Rich Form**: Title, category, read time, excerpt (200 char limit), content (custom markdown)
- **Cover Image**: Upload mode (drag-drop, file picker, 5MB limit) or URL mode
- **Image Presets**: 4 Unsplash preset images
- **Live Preview**: Real-time article card preview as you type
- **Server Action**: `createArticle` saves to DB with file upload support

### 7.4 Newsletter System
- **Subscribe Widget**: Embedded in article detail pages
- **Server Action**: `subscribeNewsletter` adds to DB
- **Broadcast**: Admin can broadcast articles to all active subscribers
- **Auto-broadcast**: System setting to auto-broadcast on new article creation
- **Email Templates**: Professional HTML email with logo, cover image, article card
- **Simulation Mode**: If SMTP not configured, logs emails to console

### 7.5 Free Tools
- **Cek Nama PT**: Form with 3 name alternatives → sends structured message to WhatsApp
- **Cek Nama Merek**: Brand name + class check → sends to WhatsApp
- **Cek KBLI**: Interactive search with 20+ KBLI codes, 9 categories, risk levels, detail modal with permits info

### 7.6 Referral & Reseller Program
- **Commission Calculator**: 4 scenarios (Santai/Aktif/Serius/Full-time)
- **Top 10 Commissions**: Highest-paying services listed
- **Income Simulator**: Interactive scenario-based monthly/yearly estimation
- **Registration**: Via WhatsApp with unique referral codes

### 7.7 B2B Partnership (Kerjasama)
- **4 Models**: Corporate Partnership, Reseller Agency, API & Integration, Co-Marketing
- **Multi-step Form**: Personal info, company info, partnership details
- **Client-side Validation**: Comprehensive field validation
- **Success State**: Summary card + WhatsApp follow-up link

---

## 8. DESIGN SYSTEM

### Color Palette
| Token | Hex | Usage |
|---|---|---|
| `primary` | `#D62828` | Primary red, buttons, accents |
| `primary-light` | `#FEF2F2` | Light red backgrounds |
| `primary-hover` | `#B91C1C` | Hover state for primary |
| `dark` | `#111827` | Text color, dark buttons |
| `dark-light` | `#1F2937` | Secondary dark |
| `muted` | `#6B7280` | Muted text |
| `border` | `#E5E7EB` | Border colors |
| `bg-light` | `#F9FAFB` | Light backgrounds |
| `whatsapp` | `#25D366` | WhatsApp buttons |
| `whatsapp-hover` | `#1EA760` | WhatsApp hover |
| Admin Crimson | `#990202` | Dashboard, article, login pages |

### Design Patterns
- **Rounded corners**: `rounded-xl` (12px) to `rounded-[32px]` for cards
- **Shadows**: Subtle custom shadows (`custom-shadow`, `custom-shadow-lg`)
- **Glassmorphism**: `.glassmorphism` class with backdrop blur
- **Animations**: `slideDown`, `fadeInUp`, `float`, `pulse-subtle`, `fadeIn`
- **Pill badges**: Small tag/badge elements with dot indicators
- **Section pattern**: Consistent `py-20` sections with `max-w-[1280px]` containers
- **Breadcrumb navigation**: Present on most pages
- **Responsive**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints + custom `xs: 375px`

---

## 9. DEPLOYMENT & INFRASTRUCTURE

### Docker Setup
- **Multi-stage Dockerfile**: deps → builder → runner (node:20-alpine)
- **Standalone output**: Next.js standalone build for minimal container size
- **Runtime migrations**: `prisma migrate deploy` runs on container start
- **Persistent uploads**: Docker volume for `public/uploads`

### Docker Compose
- **App service**: Next.js container with `.env.production`
- **Nginx service**: Alpine Nginx reverse proxy with SSL (Let's Encrypt)
- **Ports**: 80 (HTTP), 443 (HTTPS)
- **Networks**: `easylegal` bridge network
- **Volumes**: `uploads` shared volume

### Build Scripts
- `dev` — Development server
- `build` — `prisma migrate deploy && next build`
- `start` — Production server
- `postinstall` — `prisma generate`

### Shell Scripts (`/scripts/`)
- `deploy.sh` — Deployment automation
- `deploy-setup.sh` — Initial server setup
- `secure-vps.sh` — VPS security hardening
- `backup-db.sh` — Database backup
- `stress-test.js` — Load testing

---

## 10. ANIMATION & INTERACTION

### GSAP Integration
- **Template Animation** (`template.tsx`): Page transition with fade-in + slide-up (0.6s, power3.out)
- **ScrollTrigger**: Used on homepage for section reveal animations
- **useGSAP hook**: React-safe GSAP context with cleanup

### Framer Motion
- **CTA Section**: whileInView fade-in animation
- **FAQ Section**: Staggered reveal on scroll
- **Service pages**: Various scroll-triggered animations

### CSS Animations
- `slideDown` — Dropdown menus
- `fadeInUp` — Element entrance
- `float` — Floating badge effect
- `pulse-subtle` — Badge pulsing
- `fadeIn` — Quick fade entrance

---

## 11. INTEGRATION POINTS

### WhatsApp Integration
- Primary contact channel throughout the site
- Pre-filled messages for: general consultation, PT name check, merek check, KBLI consultation, referral registration
- Number: `6281123456789`
- Deep links: `https://wa.me/6281123456789?text=...`

### Email (Nodemailer)
- SMTP-based delivery with simulation fallback
- Newsletter HTML template with inline CSS (spam-resistant)
- Base64 SVG logo in emails for reliability

### External Services Referenced
- Google Fonts (DM Sans, Plus Jakarta Sans, Inter)
- Unsplash (placeholder images)
- Google Maps (office location links)
- DJKI (trademark database reference)
- AHU (company name database reference)
- OSS BKPM (business licensing reference)

---

## 12. SEO & META

### Root Layout Metadata
- **Title**: "EasyLegal — Layanan Hukum & Legalitas Bisnis Terpercaya"
- **Description**: "Pendirian PT, Pendaftaran Merek, NIB & OSS, dan Sertifikasi ISO dengan proses cepat, transparan, dan terpercaya."
- **Language**: `lang="id"` (Indonesian)
- **Smooth scroll**: `data-scroll-behavior="smooth"`

### Page-level SEO
- Semantic HTML structure (h1 → h2 → h3 hierarchy)
- Breadcrumb navigation on all inner pages
- Article tags auto-generated
- Descriptive alt texts on images

---

## 13. DATA FLOW SUMMARY

```
User visits site
    ↓
Navbar + Footer (layout.tsx)
    ↓
Page Template (template.tsx) — GSAP animation
    ↓
Public Pages (SSR/CSR mixed)
    ├── Homepage → Hero carousel, services, testimonials, FAQ, CTA
    ├── Service pages → Pricing packages, benefits, FAQ, CTA
    ├── Tools → Cek Nama (WA), Cek KBLI (search + modal)
    ├── Blog → Artikel listing (SSR, auto-seed) → Detail (SSR, view tracking)
    ├── Contact → Form (client-side only), offices, FAQ
    └── Referral/Kerjasama → Calculators, forms (client-side)
    
Admin Flow
    ↓
/login → Server Action → bcrypt verify → 2FA check → JWT cookie
    ↓
Middleware (proxy.ts) → JWT verify on /dashboard/*
    ↓
Dashboard → Article management, Newsletter, Profile
    ↓
Create Article → Server Action → Prisma create → Optional auto-broadcast
    ↓
Newsletter → Subscribe (server action) → Broadcast (nodemailer/simulation)
```

---

## 14. FILE STATISTICS

### Total Source Files Analyzed: ~35+
### Total Lines of Code: ~25,000+

| Category | Files | Approx Lines |
|---|---|---|
| Homepage | 1 | 2,239 |
| Service pages | 12 | ~12,900 |
| Other public pages | 7 | ~3,500 |
| Admin pages | 5+ | ~1,000 |
| Components | 9 | ~1,200 |
| Lib/Utils | 5 | ~360 |
| Prisma | 2 | ~130 |
| Config files | 6 | ~300 |

---

## 15. NOTABLE ARCHITECTURAL DECISIONS

1. **No external CMS** — Custom article system with Prisma + Server Actions
2. **WhatsApp-first** — All lead generation funnels to WhatsApp, no internal CRM
3. **Hybrid rendering** — SSR for SEO-critical pages (articles, dashboard), CSR for interactive tools
4. **No external auth provider** — Custom JWT + bcrypt + 2FA implementation
5. **Client-side forms** — Most forms (contact, KBLI, referral) don't persist to DB — they generate WhatsApp messages
6. **Auto-seeding** — Blog articles auto-seed on first visit if DB is empty
7. **Email simulation** — Development mode logs emails to console when SMTP isn't configured
8. **GSAP + Framer Motion** — Dual animation library approach (GSAP for page transitions, Framer for scroll animations)
9. **Standalone Docker** — Next.js standalone output for optimized container deployment
10. **No API routes** — All backend logic handled via Server Actions and Server Components
