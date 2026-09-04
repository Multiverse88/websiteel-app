# PLANNING: Posting Artikel per Domain

## Status: Draft
**Tanggal:** 2026-09-04
**Dampak:** Admin Dashboard, API, Public Site (web), Database

---

## Problem Statement

Saat ini semua artikel yang dipublikasikan otomatis muncul di **seluruh domain** (`easylegal.biz.id`, `easylegal.my.id`, `easylegal.co.id`). Admin tidak bisa memilih artikel tampil di domain tertentu saja.

**Yang diinginkan:** Saat post/edit artikel, admin bisa memilih di domain mana artikel tersebut muncul.

---

## Arsitektur Saat Ini

```
┌─────────────────────────────────────────────────┐
│                  ADMIN DASHBOARD                │
│  ArticleEditor.tsx                              │
│  - Tidak ada field "site" di form               │
│  - Submit: articleData TIDAK include "site"     │
└──────────────────┬──────────────────────────────┘
                   │ PostgREST
                   ▼
┌─────────────────────────────────────────────────┐
│               DATABASE (PostgreSQL)             │
│  Article Table                                  │
│  - field "site" EXIST, default "easylegal.biz.id"│
│  - @@unique([site, slug])                       │
│  - Tapi tidak pernah diisi dari UI              │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│          PUBLIC SITE (apps/web)                 │
│  - GET /api/v1/articles → TANPA filter site     │
│  - GET /api/v1/articles/:slug → default biz.id  │
│  - Semua domain tampilkan artikel yang SAMA     │
└─────────────────────────────────────────────────┘
```

### Domain yang ada:
| Domain | Status |
|--------|--------|
| `easylegal.biz.id` | Aktif |
| `easylegal.my.id` | Aktif |
| `easylegal.co.id` | Aktif |

**Semua dilayani oleh 1 container Next.js** via Traefik Host rules.

---

## Yang Perlu Diubah

### Layer 1: Database
- **Article.site** sudah ada dan berfungsi — tidak perlu migration baru
- Cukup pastikan UI dan API mengisi field ini

### Layer 2: API (Express admin-api)
- **POST `/api/v1/articles`** — tambahkan `site` di destructuring + insert
- **PUT `/api/v1/articles/:id`** — tambahkan `site` di destructuring + update
- **GET `/api/v1/articles`** — tambahkan optional `?site=` filter

### Layer 3: Admin Dashboard
- **ArticleEditor.tsx** — tambahkan dropdown "Tampilkan di Domain"
- **Articles.tsx** (list) — tambahkan filter by domain
- **api.ts** — pastikan `site` dikirim saat create/update

### Layer 4: Public Site
- **artikel/page.tsx** — tambahkan `?site=` parameter saat fetch
- **artikel/[slug]/page.tsx** — tambahkan `?site=` parameter saat fetch
- **Domain detection** — deteksi domain dari request host, map ke site value

---

## Detailed Plan

### 1. Admin Dashboard — Domain Selector

**File:** `infra/admin-dashboard/src/pages/ArticleEditor.tsx`

Tambahkan state dan form field:
```tsx
const [site, setSite] = useState("easylegal.biz.id");

// Domain options
const DOMAIN_OPTIONS = [
  { value: "easylegal.biz.id", label: "easylegal.biz.id" },
  { value: "easylegal.my.id", label: "easylegal.my.id" },
  { value: "easylegal.co.id", label: "easylegal.co.id" },
];
```

Form field (di antara Category/ReadTime dan Cover Image):
```tsx
<div className="space-y-2">
  <label>Tampilkan di Domain</label>
  <select value={site} onChange={...}>
    {DOMAIN_OPTIONS.map(...)}
  </select>
  <p className="text-hint">
    Artikel hanya akan muncul di domain yang dipilih.
    Pilih "Semua Domain" untuk menampilkan di semua situs.
  </p>
</div>
```

**Include `site` di `handleSubmit`:**
```tsx
const articleData = {
  ...existing fields,
  site: site || "easylegal.biz.id",
};
```

**Load `site` dari DB saat edit:**
```tsx
api.getArticle(id).then(article => {
  setSite(article.site || "easylegal.biz.id");
  // ... existing code
});
```

### 2. API Routes — Accept `site`

**File:** `apps/api/src/routes/articles.ts`

**POST (create):**
```typescript
const { ..., site } = req.body;
const article = await prisma.article.create({
  data: {
    ...existing,
    site: site || "easylegal.biz.id",
  },
});
```

**PUT (update):**
```typescript
const { ..., site } = req.body;
const article = await prisma.article.update({
  where: { id },
  data: {
    ...existing,
    site: site || existing.site,
  },
});
```

**GET (list) — tambahkan filter:**
```typescript
const siteFilter = req.query.site as string | undefined;
if (siteFilter) {
  whereClause.site = siteFilter;
}
```

### 3. Public Site — Filter by Domain

**File:** `apps/web/src/app/(site)/artikel/page.tsx`

Deteksi domain dari host header:
```typescript
import { headers } from "next/headers";

export default async function ArtikelPage() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  
  // Map host ke site value
  let siteFilter = "easylegal.biz.id";
  if (host.includes("easylegal.co.id")) siteFilter = "easylegal.co.id";
  else if (host.includes("easylegal.my.id")) siteFilter = "easylegal.my.id";

  const apiUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/articles`);
  apiUrl.searchParams.set("site", siteFilter);
  // ... fetch
}
```

**File:** `apps/web/src/app/(site)/artikel/[slug]/page.tsx`

```typescript
async function fetchArticleFromApi(slug: string, host: string) {
  let siteFilter = "easylegal.biz.id";
  if (host.includes("easylegal.co.id")) siteFilter = "easylegal.co.id";
  else if (host.includes("easylegal.my.id")) siteFilter = "easylegal.my.id";

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/articles/${slug}?site=${siteFilter}`;
  // ... fetch
}
```

### 4. Domain List di Admin Dashboard

**File:** `infra/admin-dashboard/src/pages/ArticleEditor.tsx`

Ambil daftar domain dari API (untuk future-proofing jika domain bertambah):
```tsx
const [domains, setDomains] = useState<{hostname: string; name: string}[]>([]);

useEffect(() => {
  api.getDomains().then(setDomains).catch(() => {});
}, []);
```

Atau hardcode dulu karena domain masih statis:
```tsx
const DOMAIN_OPTIONS = [
  { value: "easylegal.biz.id", label: "easylegal.biz.id (Semua)" },
  { value: "easylegal.my.id", label: "easylegal.my.id" },
  { value: "easylegal.co.id", label: "easylegal.co.id" },
];
```

---

## Edge Cases

### 1. Slug Uniqueness
- `@@unique([site, slug])` — slug unik PER SITE
- Artinya slug `panduan-nib` bisa ada di `biz.id` DAN `co.id` secara terpisah
- **Tidak perlu ubah** — sudah benar

### 2. Artikel yang sudah ada
- Semua artikel existing punya `site = "easylegal.biz.id"` (default)
- Admin bisa edit dan pindahkan ke domain lain via dropdown
- **Tidak perlu migration data**

### 3. AI Review scope
- AI review sudah menerima `site` parameter
- Dedup check sudah filter by site
- **Tidak perlu ubah** — sudah benar

### 4. ISR Revalidation
- Revalidation sudah dipanggil per slug
- Perlu pastikan revalidation juga mempertimbangkan site
- **Perlu dicek** — kemungkinan perlu tambah `site` di revalidation payload

### 5. View Count
- View tracking sudah filter by site
- **Tidak perlu ubah**

---

## Implementation Order

| No | Task | File | Estimasi |
|----|------|------|----------|
| 1 | Tambah `site` field di form editor | ArticleEditor.tsx | 15 min |
| 2 | Kirim `site` saat create/update | ArticleEditor.tsx | 5 min |
| 3 | Load `site` saat edit artikel | ArticleEditor.tsx | 5 min |
| 4 | API: accept `site` di POST & PUT | articles.ts | 10 min |
| 5 | API: tambah filter `?site=` di GET | articles.ts | 10 min |
| 6 | Public site: filter by domain | artikel/page.tsx, [slug]/page.tsx | 20 min |
| 7 | Tambah domain filter di article list admin | Articles.tsx | 15 min |
| 8 | Test end-to-end | Manual | 15 min |
| **Total** | | | **~95 min** |

---

## Testing Checklist

- [ ] Buat artikel baru dengan site = "easylegal.biz.id" → muncul di biz.id
- [ ] Buat artikel baru dengan site = "easylegal.co.id" → muncul di co.id
- [ ] Edit artikel existing → bisa ganti domain
- [ ] artikel/page.tsx di biz.id → hanya tampilkan artikel biz.id
- [ ] artikel/page.tsx di co.id → hanya tampilkan artikel co.id
- [ ] artikel/[slug] di co.id → fetch artikel dengan site=co.id
- [ ] Slug sama di dua domain → bisa (unique per site)
- [ ] AI review tetap berfungsi dengan site parameter
- [ ] Dedup check tetap berfungsi per site
- [ ] View count tetap akurat per site

---

## Future Enhancements (Outside Scope)

- **Multi-select domain** — tampilkan artikel di beberapa domain sekaligus (perlu relasi many-to-many)
- **Publish schedule per domain** — jadwal publish berbeda per domain
- **Domain-specific SEO** — meta title/description berbeda per domain
- **Analytics per domain** — traffic & conversion per domain
