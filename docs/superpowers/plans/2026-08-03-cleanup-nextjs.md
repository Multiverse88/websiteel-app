# Clean Up Next.js Admin Code Implementation Plan (Phase 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up the Next.js frontend by removing the Admin Dashboard UI, Login pages, and related authentication/upload logic, turning it into a pure public frontend.

**Architecture:** We are physically deleting directories related to the dashboard and login from the Next.js project. We will also clean up the Next.js middleware so it no longer checks for JWT cookies for the `/dashboard` route. The public Server Actions (like fetching articles) will temporarily remain connected to Prisma until Phase 3.

**Tech Stack:** Next.js (App Router), TypeScript, Git.

## Global Constraints

- Do not modify Prisma queries or public UI pages (`layanan`, `artikel`, `homepage`).
- Only remove code that is exclusively used for the admin dashboard or login.

---

### Task 1: Delete Admin UI Directories

**Files:**
- Modify: `src/app/dashboard`
- Modify: `src/app/login`
- Modify: `src/lib/auth.ts`
- Modify: `src/lib/s3.ts`

**Interfaces:**
- Produces: A cleaner Next.js project structure.

- [ ] **Step 1: Remove dashboard folder**

```bash
rm -rf src/app/dashboard
```

- [ ] **Step 2: Remove login folder**

```bash
rm -rf src/app/login
```

- [ ] **Step 3: Remove auth and s3 libraries**

```bash
rm -f src/lib/auth.ts src/lib/s3.ts
```

- [ ] **Step 4: Commit**

```bash
git add src/app src/lib
git commit -m "refactor: remove admin dashboard and login UI from Next.js"
```

---

### Task 2: Clean Up Middleware and Config

**Files:**
- Modify: `src/middleware.ts`
- Modify: `src/lib/config.ts`

**Interfaces:**
- Consumes: The existing Next.js middleware and config files.
- Produces: Updated middleware and config without dashboard auth checks.

- [ ] **Step 1: Update middleware.ts**

Modify `src/middleware.ts` to remove the JWT and `/dashboard` logic. Make sure to keep the redirect logic. 
The new file content should look like:
```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect check — only GET/HEAD
  if (request.method === "GET" || request.method === "HEAD") {
    const slug = pathname.slice(1).replace(/\/$/, ""); // "/daftar-klien/" → "daftar-klien"

    if (slug) {
      try {
        // Dynamic import — PrismaClient is Node-only, can't be top-level import in Edge runtime
        const { prisma } = await import("@/lib/db");
        const redirect = await prisma.redirect.findUnique({
          where: { slug },
          select: { destination: true },
        });

        if (redirect) {
          // Fire-and-forget click count — don't block response
          prisma.redirect
            .update({ where: { slug }, data: { clicks: { increment: 1 } } })
            .catch(() => {});

          return NextResponse.redirect(redirect.destination);
        }
      } catch {
        // DB or Edge runtime reject — fall through, site keeps working
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api).*)",
  ],
};
```

- [ ] **Step 2: Update config.ts**

Modify `src/lib/config.ts` to remove `getJwtSecret` since it is no longer used by the frontend.
The new file content should look like:
```typescript
// Centralized configuration for EasyLegal
// Update this file to change global settings

export const config = {
  // Default WhatsApp message
  defaultWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi gratis mengenai legalitas bisnis saya.",
  
  // Website URL
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || "https://easylegal.my.id",
  
  // Company info
  company: {
    name: "EasyLegal",
    email: "info@easylegal.id",
    phone: "(022) 1234-5678",
    whatsapp: "0811-2345-6789",
  },
} as const;

// Helper function to generate WhatsApp link via mauorder rotator
export function getWhatsAppLink(message?: string): string {
  const encodedMessage = encodeURIComponent(message || config.defaultWhatsAppMessage);
  return `https://mauorder.online/easylegal-5?text=${encodedMessage}`;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/middleware.ts src/lib/config.ts
git commit -m "refactor: clean up middleware and config by removing auth checks"
```
