# Redirect Link Feature — Design Spec

**Date:** 2026-07-11
**Status:** Approved for implementation

## Overview

Dashboard-managed redirect links. Admin creates short slugs (`easylegal.my.id/daftar-klien`) that 302-redirect to external URLs (Google Spreadsheets, Google Forms, WhatsApp groups, Typebot, etc.). Click tracking included. Middleware-based resolution.

## Database: Supabase PostgreSQL (via Prisma)

Existing Prisma `DATABASE_URL` / `DIRECT_URL` point to Supabase PostgreSQL. No dual DB — standard Prisma connection.

### New Model `Redirect`

```prisma
model Redirect {
  id          String   @id @default(cuid())
  slug        String   @unique        // "daftar-klien", "form-kerjasama"
  destination String                   // "https://docs.google.com/..."
  clicks      Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

No extra fields beyond what's listed. `isActive`, `description`, UTM params skipped as YAGNI — add when needed.

## Middleware: Short Link Resolution

`src/middleware.ts` gets an additional path check:

```
Request → pathname.startsWith("/dashboard")? → existing auth check
       → pathname is a known static asset? → skip
       → query Redirect table for matching slug
       → found? → 302 to destination, fire-and-forget click increment
       → not found? → NextResponse.next() (normal page)
```

**Key constraints:**
- Only intercept `GET` / `HEAD` requests (not POST form submissions).
- Static files (`_next/static`, `_next/image`, `favicon.ico`, `robots.txt`, `sitemap.xml`) skip redirect check.
- Existing Next.js routes (`/layanan/*`, `/artikel/*`, `/kontak`, `/login`, `/dashboard/*`) handled naturally: their paths won't exist in Redirect table, so `next()` fires and page renders normally.
- DB query failure → silent catch → `next()`. Site must not break if Supabase is unreachable.
- Click increment is `ctx.waitUntil()` fire-and-forget — doesn't delay response.

**Middleware matcher:** Already at `["/dashboard", "/dashboard/:path*"]`. Need second entry or expand. Approach: expand matcher to `["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"]`, conditionally skip `/dashboard` paths if not in redirect table.

## Dashboard CRUD

Route: `/dashboard/links/` (new directory under existing dashboard auth guard).

### Page: `/dashboard/links/page.tsx`
- Server Component, `force-dynamic`, `getSession()` + redirect check.
- Fetch all Redirect rows, display as table.

### Page: `/dashboard/links/tambah/page.tsx`
- Client form: slug input + destination URL input + optional empty slug for random gen.
- Slug validation: `^[a-z0-9-]+$`, lowercase + strip spaces on type.
- Destination URL: auto-prepend `https://` if missing protocol.
- Slug empty → generate 6-char random alphanumeric.

### Page: `/dashboard/links/[id]/page.tsx`
- Edit existing redirect (reuses form component).

### Delete: via server action in `/dashboard/links/actions.ts`
- `deleteRedirect` action, called from delete button.

### Server Actions (`actions.ts`)
- `createRedirect(slug: string, destination: string)` → validate → upsert/insert
- `updateRedirect(id: string, slug: string, destination: string)` → validate → update
- `deleteRedirect(id: string)` → delete row
- All actions call `revalidatePath("/dashboard/links")`.

### Dashboard Sidebar
Active link in dashboard nav pointing to `/dashboard/links`.

## File Map (new/modified)

| File | Action |
|---|---|
| `prisma/schema.prisma` | +Redirect model |
| `src/middleware.ts` | +redirect resolution logic |
| `src/app/dashboard/links/page.tsx` | Create (table view) |
| `src/app/dashboard/links/tambah/page.tsx` | Create (add form) |
| `src/app/dashboard/links/[id]/page.tsx` | Create (edit form) |
| `src/app/dashboard/links/actions.ts` | Create (server actions) |
| `src/app/dashboard/links/layout.tsx` | Create (optional, if wrapping needed) |
| `src/app/dashboard/page.tsx` | Modify (+link to /dashboard/links) |

Total: ~5 new files, 2 modified files.

## Disclaimers

- Static redirects in `next.config.ts` (`rewrites()`, `redirects()`) for ad landing pages remain separate — they're compile-time and don't interact with this feature.
- `npm run build` runs `prisma migrate deploy` — new `Redirect` table gets created on deploy automatically.

---

*Spec end. Ready for implementation plan.*
