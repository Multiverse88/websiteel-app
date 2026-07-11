# Redirect Link Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dashboard-managed 302 redirects — admin creates short slugs (`easylegal.my.id/daftar-klien`) that redirect to external URLs. Click tracking included.

**Architecture:** Prisma model `Redirect` → middleware checks path → redirects on hit. Dashboard CRUD follows existing Server Action pattern. All DB via standard Prisma pointing to Supabase PostgreSQL.

**Tech Stack:** Prisma, Next.js Middleware, Server Actions, `jose`

## Global Constraints

- Path alias `@/*` maps to `src/*`
- No new dependencies
- All mutations = Server Actions with `"use server"`
- Dashboard pages: `force-dynamic` + `getSession()` + redirect(`/login`) pattern
- Bahasa Indonesia UI
- Dashboard follows crimson (`#990202`) theme (see newsletter pages)
- `npm run dev` for dev, `npx prisma migrate dev --name <name>` for migrations
- Middleware uses `@/lib/db` for Prisma client

---

### Task 1: Prisma Model + Migration

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add Redirect model to schema.prisma**

Insert before the last closing `}` of `prisma/schema.prisma`:

```prisma
model Redirect {
  id          String   @id @default(cuid())
  slug        String   @unique
  destination String
  clicks      Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
}
```

- [ ] **Step 2: Run migration**

```bash
npx prisma migrate dev --name add-redirect-model
```

Expected: "Your database is now in sync with your Prisma schema."

- [ ] **Step 3: Commit**

```bash
git add prisma/schema.prisma prisma/migrations/
git commit -m "feat: add Redirect model"
```

---

### Task 2: Middleware Redirect Resolution

**Files:**
- Modify: `src/middleware.ts`

**Logic:**
1. Dashboard auth check (existing) — unchanged
2. After auth check, for non-dashboard `GET`/`HEAD` requests: check if path matches a `Redirect` slug in DB
3. If match → 302 redirect, fire-and-forget `clicks` increment
4. If no match / DB error → `NextResponse.next()` (normal page)
5. Static assets (`_next/static`, `_next/image`, `favicon.ico`, `robots.txt`, `sitemap.xml`) skipped via matcher

- [ ] **Step 1: Replace middleware.ts**

New content for `src/middleware.ts`:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getJwtSecret } from "@/lib/config";
import { prisma } from "@/lib/db";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Dashboard auth check (existing)
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) return NextResponse.redirect(new URL("/login", request.url));
    try {
      await jwtVerify(token, getJwtSecret());
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 2. Redirect check — only GET/HEAD
  if (request.method === "GET" || request.method === "HEAD") {
    const slug = pathname.slice(1); // "/daftar-klien" → "daftar-klien"

    if (slug) {
      try {
        const redirect = await prisma.redirect.findUnique({
          where: { slug },
          select: { destination: true },
        });

        if (redirect) {
          // Fire-and-forget — don't block response
          prisma.redirect
            .update({ where: { slug }, data: { clicks: { increment: 1 } } })
            .catch(() => {});

          return NextResponse.redirect(redirect.destination);
        }
      } catch {
        // DB down — fall through, site keeps working
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
```

- [ ] **Step 2: Verify build passes**

```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: add redirect resolution to middleware"
```

---

### Task 3: Dashboard Links Page — Index (Table View)

**Files:**
- Create: `src/app/dashboard/links/page.tsx`
- Create: `src/app/dashboard/links/layout.tsx`

**Pattern:** Follow `src/app/dashboard/newsletter/page.tsx` — server component, fetch all Redirects, render in a table with slug, destination, clicks, date, and delete button.

- [ ] **Step 1: Create layout.tsx**

```typescript
// src/app/dashboard/links/layout.tsx
import React from "react";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LinksLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.twoFactorEnabled) redirect("/login/setup-2fa");
  return <>{children}</>;
}
```

- [ ] **Step 2: Create page.tsx**

```typescript
// src/app/dashboard/links/page.tsx
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { ArrowLeft, Link2, ExternalLink, Plus, Calendar, MousePointerClick, Trash2 } from "lucide-react";
import DeleteLinkButton from "./delete-button";

export const dynamic = "force-dynamic";

export default async function LinksPage() {
  const links = await prisma.redirect.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, slug: true, destination: true, clicks: true, createdAt: true },
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <section className="bg-white pt-8 lg:pt-12 pb-10 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-gray-500 hover:text-[#990202] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-heading text-[30px] sm:text-[36px] font-extrabold text-gray-950 leading-tight tracking-tight">
                Redirect Links
              </h1>
              <p className="text-[14px] text-gray-500 mt-1">
                Kelola link pendek untuk dialihkan ke URL eksternal.
              </p>
            </div>
            <Link
              href="/dashboard/links/tambah"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[13px] rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Link Baru</span>
            </Link>
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section className="py-10 flex-grow">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          {links.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Link2 className="w-8 h-8 text-[#990202]" />
              </div>
              <h3 className="text-[18px] font-extrabold text-gray-900 mb-2">
                Belum ada redirect link
              </h3>
              <p className="text-[14px] text-gray-500 mb-6">
                Buat link pendek pertama untuk mulai mengarahkan pengunjung.
              </p>
              <Link
                href="/dashboard/links/tambah"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[14px] rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Buat Link Baru</span>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-[12px] font-extrabold text-gray-400 uppercase tracking-wider">
                <div className="col-span-3">Slug</div>
                <div className="col-span-4">Tujuan</div>
                <div className="col-span-2 text-center">Klik</div>
                <div className="col-span-2">Dibuat</div>
                <div className="col-span-1 text-right">Aksi</div>
              </div>

              {/* Table Rows */}
              {links.map((link: { id: string; slug: string; destination: string; clicks: number; createdAt: Date }) => (
                <div
                  key={link.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center"
                >
                  {/* Slug */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-gray-900">{link.slug}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                      /{link.slug}
                    </p>
                  </div>

                  {/* Destination */}
                  <div className="col-span-4">
                    <div className="flex items-center gap-1.5">
                      <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      <span className="text-[13px] text-gray-600 truncate block">
                        {link.destination}
                      </span>
                    </div>
                  </div>

                  {/* Clicks */}
                  <div className="col-span-2 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-50 text-[13px] font-bold text-gray-700">
                      <MousePointerClick className="w-3.5 h-3.5 text-gray-400" />
                      {link.clicks.toLocaleString("id-ID")}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span>
                        {new Date(link.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end">
                    <DeleteLinkButton id={link.id} slug={link.slug} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/dashboard/links/
git commit -m "feat: add dashboard links page"
```

---

### Task 4: Delete Link Button (Client Component)

**Files:**
- Create: `src/app/dashboard/links/delete-button.tsx`
- Create: `src/app/dashboard/links/actions.ts`

- [ ] **Step 1: Create actions.ts**

```typescript
// src/app/dashboard/links/actions.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteLink(id: string) {
  // Dynamic import avoids circular dep
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return { error: "Sesi tidak valid!" };

  try {
    await prisma.redirect.delete({ where: { id } });
    revalidatePath("/dashboard/links");
    return { success: true };
  } catch (err: unknown) {
    console.error("Gagal menghapus link:", err);
    return { error: "Gagal menghapus link." };
  }
}
```

- [ ] **Step 2: Create delete-button.tsx**

```typescript
// src/app/dashboard/links/delete-button.tsx
"use client";

import React, { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteLink } from "./actions";

export default function DeleteLinkButton({ id, slug }: { id: string; slug: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Hapus link "/${slug}"?`)) return;
    startTransition(() => deleteLink(id));
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Hapus link"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/dashboard/links/actions.ts src/app/dashboard/links/delete-button.tsx
git commit -m "feat: add link delete functionality"
```

---

### Task 5: Dashboard Tambah Link Page

**Files:**
- Create: `src/app/dashboard/links/tambah/page.tsx`

**Pattern:** Follow `src/app/dashboard/artikel/tambah/page.tsx` — client form component with Server Action call.

- [ ] **Step 1: Create tambah/page.tsx**

```typescript
// src/app/dashboard/links/tambah/page.tsx
"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Link2, Loader2, Check } from "lucide-react";
import { createLink } from "./actions";

export default function TambahLinkPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [slug, setSlug] = useState("");
  const [destination, setDestination] = useState("");

  const handleSlugChange = (value: string) => {
    // Auto lowercase, replace spaces with dashes, strip special chars
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "")
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!slug.trim()) {
      // Auto-generate 6-char random slug
      setSlug(Math.random().toString(36).substring(2, 8));
    }

    let dest = destination.trim();
    if (dest && !dest.startsWith("http://") && !dest.startsWith("https://")) {
      dest = "https://" + dest;
    }

    if (!dest) {
      setError("URL tujuan harus diisi!");
      return;
    }

    startTransition(async () => {
      const result = await createLink(slug || Math.random().toString(36).substring(2, 8), dest);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setSlug("");
        setDestination("");
      }
    });
  };

  if (success) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
        <section className="flex-grow flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] p-12 text-center max-w-md mx-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-[18px] font-extrabold text-gray-900 mb-2">
              Link Berhasil Dibuat!
            </h3>
            <p className="text-[14px] text-gray-500 mb-6">
              Link redirect sudah siap digunakan.
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/dashboard/links/tambah"
                className="px-5 py-2.5 bg-[#990202] text-white font-bold text-[13px] rounded-xl hover:bg-[#800000] transition-all"
              >
                Buat Lagi
              </Link>
              <Link
                href="/dashboard/links"
                className="px-5 py-2.5 bg-white text-gray-700 font-bold text-[13px] rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
              >
                Kembali ke Daftar
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <section className="bg-white pt-8 lg:pt-12 pb-10 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard/links"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-gray-500 hover:text-[#990202] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Redirect Links
            </Link>
          </div>
          <h1 className="font-heading text-[30px] sm:text-[36px] font-extrabold text-gray-950 leading-tight tracking-tight">
            Buat Redirect Link Baru
          </h1>
        </div>
      </section>

      {/* FORM */}
      <section className="py-10 flex-grow">
        <div className="max-w-[640px] mx-auto px-6 sm:px-8">
          <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] p-6 sm:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-[#990202] font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Slug */}
              <div className="space-y-2">
                <label className="text-[13.5px] font-extrabold text-gray-900 flex items-center gap-1.5">
                  Slug Link <span className="text-gray-400 font-medium text-[12px]">(kosongi untuk random)</span>
                </label>
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <span className="text-[14px] text-gray-400 font-mono font-medium whitespace-nowrap">
                    {typeof window !== "undefined" ? window.location.origin : ""}/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="daftar-klien"
                    className="flex-1 bg-transparent border-none outline-none text-[14.5px] font-medium text-gray-950 placeholder-gray-400 p-0"
                  />
                </div>
                <p className="text-[11px] text-gray-400">
                  Hanya huruf kecil, angka, dan tanda strip (-).
                </p>
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <label className="text-[13.5px] font-extrabold text-gray-900">
                  URL Tujuan <span className="text-[#990202]">*</span>
                </label>
                <input
                  type="url"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14.5px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#990202] hover:bg-[#800000] text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 text-[15px] shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-5 h-5" />
                    <span>Buat Redirect Link</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Create tambah/actions.ts**

```typescript
// src/app/dashboard/links/tambah/actions.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createLink(slug: string, destination: string) {
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return { error: "Sesi tidak valid!" };

  if (!destination) return { error: "URL tujuan harus diisi!" };

  try {
    // Check slug uniqueness manually for better error message
    const existing = await prisma.redirect.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (existing) return { error: `Slug "${slug}" sudah digunakan.` };

    await prisma.redirect.create({
      data: { slug, destination },
    });

    revalidatePath("/dashboard/links");
    return { success: true };
  } catch (err: unknown) {
    console.error("Gagal membuat link:", err);
    return { error: "Gagal membuat redirect link." };
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/dashboard/links/tambah/
git commit -m "feat: add create link page"
```

---

### Task 6A: Edit Link Page

**Files:**
- Create: `src/app/dashboard/links/[id]/page.tsx`
- Create: `src/app/dashboard/links/[id]/actions.ts`

- [ ] **Step 1: Create [id]/actions.ts**

```typescript
// src/app/dashboard/links/[id]/actions.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateLink(id: string, slug: string, destination: string) {
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return { error: "Sesi tidak valid!" };

  if (!destination) return { error: "URL tujuan harus diisi!" };

  try {
    // Check slug uniqueness (exclude current)
    const existing = await prisma.redirect.findFirst({
      where: { slug, NOT: { id } },
      select: { id: true },
    });
    if (existing) return { error: `Slug "${slug}" sudah digunakan.` };

    await prisma.redirect.update({
      where: { id },
      data: { slug, destination },
    });

    revalidatePath("/dashboard/links");
    return { success: true };
  } catch (err: unknown) {
    console.error("Gagal mengupdate link:", err);
    return { error: "Gagal mengupdate link." };
  }
}
```

- [ ] **Step 2: Create [id]/page.tsx**

```typescript
// src/app/dashboard/links/[id]/page.tsx
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { ArrowLeft, Link2 } from "lucide-react";
import { notFound } from "next/navigation";
import EditLinkForm from "./form";

export const dynamic = "force-dynamic";

export default async function EditLinkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const link = await prisma.redirect.findUnique({
    where: { id },
    select: { id: true, slug: true, destination: true },
  });

  if (!link) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <section className="bg-white pt-8 lg:pt-12 pb-10 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard/links"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-gray-500 hover:text-[#990202] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Redirect Links
            </Link>
          </div>
          <h1 className="font-heading text-[30px] sm:text-[36px] font-extrabold text-gray-950 leading-tight tracking-tight">
            Edit Redirect Link
          </h1>
        </div>
      </section>

      {/* FORM */}
      <section className="py-10 flex-grow">
        <div className="max-w-[640px] mx-auto px-6 sm:px-8">
          <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] p-6 sm:p-8">
            <EditLinkForm id={link.id} slug={link.slug} destination={link.destination} />
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Create [id]/form.tsx**

```typescript
// src/app/dashboard/links/[id]/form.tsx
"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2, Check } from "lucide-react";
import { updateLink } from "./actions";

export default function EditLinkForm({ id, slug: initialSlug, destination: initialDest }: { id: string; slug: string; destination: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState(initialSlug);
  const [destination, setDestination] = useState(initialDest);

  const handleSlugChange = (value: string) => {
    setSlug(
      value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    let dest = destination.trim();
    if (dest && !dest.startsWith("http://") && !dest.startsWith("https://")) {
      dest = "https://" + dest;
    }

    startTransition(async () => {
      const result = await updateLink(id, slug, dest);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard/links");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-[#990202] font-semibold">
          {error}
        </div>
      )}

      {/* Slug */}
      <div className="space-y-2">
        <label className="text-[13.5px] font-extrabold text-gray-900">
          Slug Link
        </label>
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
          <span className="text-[14px] text-gray-400 font-mono font-medium whitespace-nowrap">/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            required
            className="flex-1 bg-transparent border-none outline-none text-[14.5px] font-medium text-gray-950 p-0"
          />
        </div>
      </div>

      {/* Destination */}
      <div className="space-y-2">
        <label className="text-[13.5px] font-extrabold text-gray-900">
          URL Tujuan <span className="text-[#990202]">*</span>
        </label>
        <input
          type="url"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14.5px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#990202] hover:bg-[#800000] text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 text-[15px] shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:pointer-events-none"
      >
        {isPending ? (
          <><Loader2 className="w-5 h-5 animate-spin" /><span>Menyimpan...</span></>
        ) : (
          <><Link2 className="w-5 h-5" /><span>Simpan Perubahan</span></>
        )}
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Add edit link button to table**

In `src/app/dashboard/links/page.tsx`, add import `Pencil` from lucide-react, then after the `DeleteLinkButton` line, add an edit link:

```typescript
<Link
  href={`/dashboard/links/${link.id}`}
  className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
  title="Edit link"
>
  <Pencil className="w-4 h-4" />
</Link>
```

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/links/
git commit -m "feat: add edit link page"
```

---

### Task 6B: Dashboard Dashboard — Add Link to Navigation

**Files:**
- Modify: `src/app/dashboard/page.tsx`

- [ ] **Step 1: Add "Redirect Links" button next to Newsletter**

Find the Newsletter button block (around line 63-74) and add a Link button after it:

```typescript
            <Link
              href="/dashboard/links"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-gray-600 hover:text-[#990202] shadow-md border border-black/[0.04] hover:border-red-200 rounded-xl transition-all bg-white hover:bg-red-50"
            >
              <Link2 className="w-4 h-4" />
              <span>Redirect Links</span>
              {linksCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 bg-[#990202] text-white text-[10px] font-bold rounded-md">
                  {linksCount}
                </span>
              )}
            </Link>
```

Add import at top:
```typescript
import { Link2 } from "lucide-react";
```

Add after subscriberCount:
```typescript
const linksCount = await prisma.redirect.count();
```

- [ ] **Step 2: Commit**

```bash
git add src/app/dashboard/page.tsx
git commit -m "feat: add links navigation to dashboard"
```

---

### Task 7: Validation — Manual Smoke Test

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected: Dev server starts on localhost:3000.

- [ ] **Step 2: Test redirect resolution**

```bash
curl -v http://localhost:3000/some-nonexistent-redirect-slug
```

Expected: 200 (normal page catch — middleware passes through).

- [ ] **Step 3: Create a link via Prisma on terminal**

```bash
npx tsx -e "
import { prisma } from './src/lib/db';
await prisma.redirect.create({ data: { slug: 'test-wa', destination: 'https://wa.me/6281123456789' } });
console.log('done');
process.exit(0);
"
```

Expected: "done".

- [ ] **Step 4: Test the redirect works**

```bash
curl -v http://localhost:3000/test-wa
```

Expected: 302 → location: https://wa.me/6281123456789

- [ ] **Step 5: Clean up test data**

```bash
npx tsx -e "
import { prisma } from './src/lib/db';
await prisma.redirect.delete({ where: { slug: 'test-wa' } });
console.log('cleaned up');
process.exit(0);
"
```

- [ ] **Step 6: Build test**

```bash
npm run build
```

Expected: Build succeeds with no errors.

---

**Plan end. Ready for execution.**
