# API Integration Plan: Landing Pages & Sitemap (Phase 3B)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Decouple the Next.js Landing Pages and Sitemap from Prisma by creating Express API endpoints and updating the frontend to `fetch()` from those endpoints.

## Task 1: Create Express API Endpoints for Landing Pages

**Files:**
- Modify: `admin-project/api/src/server.ts`
- Create: `admin-project/api/src/routes/landing-pages.ts`

**Interfaces:**
- Produces: 
  - `GET /api/v1/landing-pages/:slug`
  - `POST /api/v1/landing-pages/leads`

- [ ] **Step 1: Create `landing-pages.ts` route handler**
In `admin-project/api/src/routes/landing-pages.ts`:
- Import `prisma` from `../lib/prisma`.
- `GET /:slug`: Return a single published landing page by slug.
- `POST /leads`: Accepts `landingPageId`, `name`, `phone`, `email`, `company`, `utmParams`. Save to database, and then fetch and return the `redirectSettings` of the landing page.

- [ ] **Step 2: Register routes in `server.ts`**
In `admin-project/api/src/server.ts`:
```typescript
import landingPageRoutes from "./routes/landing-pages";
// ...
app.use("/api/v1/landing-pages", landingPageRoutes);
```

- [ ] **Step 3: Add `sitemap` helper route in `articles.ts`**
In `admin-project/api/src/routes/articles.ts`:
- Add `GET /sitemap/all` that returns `prisma.article.findMany({ select: { slug: true, updatedAt: true }, orderBy: { updatedAt: 'desc' } })`.
- Note: Make sure to place this ABOVE the `/:slug` route so it doesn't get caught as a slug!

- [ ] **Step 4: Commit**
Commit changes in `admin-project/api`.

---

## Task 2: Update Next.js Frontend (LP & Sitemap)

**Files:**
- Modify: `src/app/lp/[slug]/page.tsx`
- Modify: `src/app/lp/actions.ts`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: The newly created `landing-pages` API and `articles/sitemap/all` API.

- [ ] **Step 1: Update `src/app/lp/[slug]/page.tsx`**
- Remove `import { prisma }`.
- In `generateMetadata` and `LandingPage`, fetch from `http://127.0.0.1:4000/api/v1/landing-pages/${slug}` instead of `prisma.landingPage.findUnique`.

- [ ] **Step 2: Update `src/app/lp/actions.ts`**
- Remove `import { prisma }`.
- In `submitLandingPageLead`, change the Prisma logic to perform a `fetch('http://127.0.0.1:4000/api/v1/landing-pages/leads', { method: 'POST', body: JSON.stringify(input) })`.

- [ ] **Step 3: Update `src/app/sitemap.ts`**
- Remove `import { prisma }`.
- Fetch `http://127.0.0.1:4000/api/v1/articles/sitemap/all` to get the list of articles for the sitemap.

- [ ] **Step 4: Commit**
Commit Next.js frontend changes.
