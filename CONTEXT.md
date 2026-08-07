# Project Context: EasyLegal

## Overview
Platform jasa legalitas bisnis Indonesia (easylegal.my.id).
Monorepo-style structure with Next.js App Router (Public Site) and Vite (Admin Dashboard).

## Peta Direktori (Directory Map)
Agar pencarian lebih spesifik dan tidak men-scan seluruh repository, gunakan panduan lokasi berikut:

### 1. Public Site (Next.js)
- **Root App:** \`src/app/\` (Routing utama, service pages, LP renderer)
- **Komponen Publik:** \`src/components/\` (Navbar, Footer, Hero, Sections)
- **Data Statis:** \`src/data/\`
- **Konfigurasi:** \`next.config.ts\`, \`tailwind.config.ts\` (Tokens di \`globals.css\`)

### 2. Admin Dashboard (Vite)
- **Root Dashboard:** \`admin-project/dashboard/src/\`
- **Builder V2 (Engine):** \`admin-project/dashboard/src/lib/builder/\`
- **Builder UI/Canvas:** \`admin-project/dashboard/src/components/\`
- **Pages (Admin):** \`admin-project/dashboard/src/pages/\`

### 3. Backend & API
- **Express API:** \`admin-project/api/src/routes/\`
- **Prisma Schema:** \`admin-project/api/prisma/schema.prisma\`
- **PostgREST Config:** \`postgrest/\`

### 4. Infrastruktur & Deploy
- **Docker:** \`docker-compose.yml\`, \`Dockerfile\`
- **Nginx Proxy:** \`nginx/nginx.conf\`

## Panduan Pencarian (Search Guidelines)
- Jika mencari logika Landing Page Builder (V2), batasi hanya pada \`admin-project/dashboard/src/lib/builder/\` dan \`admin-project/dashboard/src/components/\`.
- Jika mencari routing publik / SEO, batasi pada \`src/app/\`.
- Jika mencari skema database, cek \`schema.prisma\`.
