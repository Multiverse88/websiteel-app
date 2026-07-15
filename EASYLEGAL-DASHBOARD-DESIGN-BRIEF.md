# Design Brief: EasyLegal Admin Dashboard

## 1. Project Overview
**Name:** EasyLegal Dashboard
**Context:** EasyLegal is a corporate legal and business registration platform in Indonesia (`easylegal.my.id`). This dashboard is the internal admin panel used by the EasyLegal team to manage incoming leads, content, and system configurations.
**Vibe/Atmosphere:** Clean, Professional, Trustworthy, Administrative, Data-driven but not overwhelming. It should feel like a premium, modern SaaS product.

## 2. Information Architecture (Dashboard Contents)

### A. Sidebar Navigation (Left Panel)
- **Header:** Brand Logo ("EL EasyLegal")
- **Menu Items:**
  1. **Ringkasan (Overview)** - Active state dashboard home.
  2. **Kelola Artikel** - CMS for blog posts.
  3. **Landing Pages** - CMS for localized landing pages.
  4. **Redirect Links** - Management for shortlinks/ads.
  5. **Newsletter** - Broadcast system.
  6. **Edit Profil** - Admin settings.
- **Footer:** Logout Button.

### B. Main Content Area: "Ringkasan Utama" (Overview Page)
- **Page Header:** Title ("Ringkasan Utama") and subtitle describing the page function.
- **KPI Stats Grid (4 Cards):**
  1. Total Artikel (Published count)
  2. Total Views (Total readership)
  3. Subscriber Aktif (Newsletter audience)
  4. Total Prospek (Leads from landing pages)
- **Split Data Panels:**
  - **Left Panel (Prospek Terbaru):** List of the 5 most recent leads. Shows Lead Name, Source Landing Page, Date/Time, and a prominent "WhatsApp" action button to instantly contact them.
  - **Right Panel (Artikel Populer):** List of the top 5 articles by view count. Shows Rank (#1 to #5), Title, Category Badge, and View Count.

## 3. Design & Aesthetic Requirements

### A. Color Palette
- **Primary Brand Color:** Crimson Red (`#990202` or `#D62828`). Used for active states, key buttons, and subtle hover highlights.
- **Background:** Clean White (`#FFFFFF`) for cards and sidebar, Off-White/Light Gray (`#FAFAFA` or `#F9FAFB`) for the main dashboard shell background to create depth.
- **Text:** Dark Gray/Black (`#111827`) for headings, Medium Gray (`#6B7280`) for subtitles and meta-text.
- **Accent/Action:** WhatsApp Green (`#25D366`) specifically for the "Contact Lead" button.

### B. Typography
- **Font Family:** DM Sans (or modern geometric sans-serif like Inter/Geist).
- **Hierarchy:** Strong contrast between Page Titles (e.g., 24px-30px Bold), Card Numbers (e.g., 32px Extrabold), and Data Rows (14px Medium).

### C. UI/UX Principles
- **Layout:** Fixed left sidebar (`w-64`), fluid right content area (`flex-1`) that scrolls independently.
- **Card Styling:** Soft, premium feel. Use generous padding (e.g., `24px`), rounded corners (`border-radius: 16px` or `24px`), minimal borders (`1px solid #E5E7EB`), and very soft, diffused shadows (`box-shadow: 0 4px 20px rgba(0,0,0,0.03)`).
- **Interactivity:** Subtle hover effects on table rows and links (background turns slightly gray or red-tinted). 
- **Density:** Spacious and breathable. Do not cramp data. Use whitespace strategically to guide the eye to the KPI numbers and lead names.
