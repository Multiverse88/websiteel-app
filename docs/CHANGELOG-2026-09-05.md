# Changelog — Sesi 5 September 2026

## Ringkasan Pekerjaan Malam Ini

### 1. Web-ID (easylegal.id) — Deploy & Bug Fix

| Commit | Deskripsi |
|--------|-----------|
| `373a7ad` | **Multi-domain article filtering** — artikel di dashboard bisa dipilih ke domain mana (biz.id / co.id / id). Web-ID app hanya ambil artikel `site=easylegal.id` |
| `632d17d` | **Fix Traefik labels** — hapus custom Traefik labels yang menyebabkan 404 di Dokploy |
| `f6d17ac` | **Fix web-id sitemap** — sitemap sekarang filter artikel berdasarkan `site` parameter |
| `d48a75c` | **Fix web-co sitemap** — tambah `getSiteFromHostname()` + pass `site` ke sitemap endpoint |
| `a8ce08b` | **15 bug fixes** — hardcoded canonicals di 13 service page, middleware fallback, getDomainConfig port stripping, T&C body text, instrumentation.ts dead route |
| `ba3a0f6` | **Smoke test** — 27 test cases untuk web-id (main pages + service pages + canonical verification) |

### 2. AI Companion — Partial Content + Copywriting + Tone Detection

| Commit | Deskripsi |
|--------|-----------|
| `61897fc` | **AI review from first keystroke** — tidak perlu isi content dulu, cukup judul → AI langsung kasih saran. Tambahan: CopywritingCheck + ToneCheck |

---

## Kemampuan AI Companion Sekarang

### A. Review Otomatis (Real-time)

| Fitur | Trigger | Output |
|-------|---------|--------|
| **Empty Field Detection** | Field kosong (judul/kutipan/content/keyword) | Alert peringatan + saran isi |
| **Partial Draft Review** | Cukup isi judul saja | AI fokus: kualitas judul, saran outline, deteksi tone awal, pencegahan duplikat |
| **Full Draft Review** |Judul + content terisi | Review komprehensif: SEO, legal, readability, struktur, konversi |
| **Edit Operations** | Setiap perubahan teks | Teks perbaikan siap tempel (replace/insert/delete) |
| **Content Gaps** | Artikel kurang lengkap | Topik penting yang belum dibahas + contoh isi |
| **Legal Verification** | Klaim hukum/pajak/biaya | Flag klaim yang perlu verifikasi + sumber regulasi |
| **Internal Linking** | Artikel terkait ada di DB | Rekomendasi anchor text + target artikel |

### B. Duplicate & Plagiarism Detection

| Fitur | Cara Kerja | Output |
|-------|-----------|--------|
| **Dedup Check** | pg_trgm similarity vs semua artikel di DB | Risk level (low/medium/high) + % kemiripan |
| **Keyword Cannibalization** | Bandingkan focus keyword antar artikel | Alert jika 2 artikel target keyword sama |
| **Copywriting Check** | Deteksi frasa template umum | Flag teks + sumber + skor + saran rewrite |
| **Early Duplicate Prevention** | Cek judul saat diketik | Warning sebelum penulis lanjut ke konten |

### C. Tone & Gaya Penulisan

| Fitur | Deteksi | Output |
|-------|---------|--------|
| **Tone Consistency** | Perubahan tone di tengah artikel | Flag lokasi + saran perbaikan |
| **Slang Detection** | Bahasa informal/slang | Alert + contoh pengganti formal |
| **Hype Word Detection** | "TERBAIK", "MURAH", huruf kapital berlebihan | Flag teks + saran netral |
| **Audience Match** | Tone sesuai target bisnis-hukum | Evaluasi keseluruhan |

### D. SEO Optimization

| Fitur | Output |
|-------|--------|
| **Search Intent Detection** | Informational / Commercial / Transactional |
| **Recommended Slug** | Slug SEO-friendly dari judul |
| **Title Optimization** | Rekomendasi judul 30-60 karakter |
| **Meta Description** | Contoh kutipan 120-160 karakter |
| **Keyword Placement** | Saran penempatan keyword di judul, heading, isi |
| **Structured Data** | JSON-LD Article, FAQ, LocalBusiness, BreadcrumbList |
| **Sitemap** | Sitemap.xml dinamis per domain |

### E. Content Generation

| Fitur | Output |
|-------|--------|
| **Outline Generator** | 4-7 subjudul artikel |
| **Example Paragraph** | Contoh pengembangan isi 2-4 kalimat |
| **FAQ Suggestions** | Pertanyaan + jawaban yang relevan |
| **Title Alternatives** | Rekomendasi judul siap pakai |
| **Meta Description Alternatives** | Rekomendasi kutipan siap pakai |

### F. Workflow & Safety

| Fitur | Deskripsi |
|-------|-----------|
| **Multi-Step History** | Undo/redo saran AI (navigator) |
| **Safe Auto-Apply** | Edit operations hanya bisa diterapkan jika teks target masih sama |
| **Dismiss Tracking** | Saran yang ditolak tidak muncul lagi |
| **Debounce 1.8s** | Mencegah API spam saat mengetik |
| **Request ID Guard** | Respons lama tidak menimpa respons baru |
| **Retry on Parse Error** | AI response gagal parse → retry 1x |

---

## arsitektur Sistem AI

```
Dashboard (ArticleEditor)
  │
  ├── AICompanionGuide (UI panel)
  │     ├── Real-time monitoring
  │     ├── Auto-scroll ke field
  │     ├── Navigator (saran sebelumnya/berikutnya)
  │     └── One-click apply edits
  │
  └── API calls
        │
        ├── POST /api/v1/articles/ai-review
        │     ├── OpenAI (AI Router) → Review prompt
        │     ├── Deduplication Service (pg_trgm)
        │     ├── CopywritingCheck (AI analysis)
        │     └── ToneCheck (AI analysis)
        │
        └── POST /api/v1/articles/dedup-check
              └── PostgreSQL pg_trgm similarity
```

---

## File yang Diubah Malam Ini

| File | Perubahan |
|------|-----------|
| `apps/api/src/modules/articles/ai-review-service.ts` | +copywritingCheck, +toneCheck, early draft mode, content optional |
| `apps/api/src/routes/articles.ts` | content optional di ai-review endpoint |
| `infra/admin-dashboard/src/pages/ArticleEditor.tsx` | Trigger dari title-only, UI cards untuk copywriting + tone |
| `apps/web-id/src/lib/domains.ts` | +getSiteFromHostname, +getDomainConfig port stripping |
| `apps/web-id/src/app/sitemap.ts` | +site parameter filter |
| `apps/web-id/src/middleware.ts` | Fallback host: easylegal.my.id → easylegal.id |
| `apps/web-id/src/instrumentation.ts` | Hapus dead API route |
| `apps/web-id/src/app/(site)/syarat-ketentuan/page.tsx` | Hardcoded domain → generic |
| `apps/web-id/src/app/(site)/layanan/*/layout.tsx` | 13 file: static metadata → generateMetadata() |
| `apps/web-id/tests/smoke.spec.ts` | Baru: 27 smoke tests |
| `apps/web-co/src/lib/domains.ts` | +getSiteFromHostname |
| `apps/web-co/src/app/sitemap.ts` | +site parameter filter |
| `docker-compose.web-id.dokploy.yml` | Hapus Traefik labels, Dokploy handle routing |
