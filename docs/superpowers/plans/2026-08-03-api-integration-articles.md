# API Integration Plan: Articles (Phase 3A)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Decouple the Next.js Article pages and components from Prisma by creating Express API endpoints and updating the frontend to `fetch()` from those endpoints.

## Task 1: Create Express API Endpoints for Articles

**Files:**
- Modify: `admin-project/api/src/server.ts`
- Create: `admin-project/api/src/routes/articles.ts`

**Interfaces:**
- Produces: 
  - `GET /api/v1/articles` (Query params: `q`, `category`, `limit`, `includeCounts`)
  - `GET /api/v1/articles/:slug`
  - `POST /api/v1/articles/:slug/view`

- [ ] **Step 1: Create `articles.ts` route handler**
In `admin-project/api/src/routes/articles.ts`:
- Import `prisma` from `../lib/prisma`.
- `GET /`: Accept `q` (string), `category` (string), `limit` (number). Return `{ articles, totalCount, allCategories? }`. If `includeCounts=true` is passed, also return a lightweight array of all article categories (e.g. `prisma.article.findMany({ select: { category: true } })`) so Next.js can build its tab counts.
- `GET /:slug`: Return a single article by slug.
- `POST /:slug/view`: Increment `viewCount` for the article. Return success.

- [ ] **Step 2: Register routes in `server.ts`**
In `admin-project/api/src/server.ts`:
```typescript
import articleRoutes from "./routes/articles";
// ...
app.use("/api/v1/articles", articleRoutes);
```

- [ ] **Step 3: Commit**
Commit changes in `admin-project/api/src`.

---

## Task 2: Update Next.js Articles Frontend

**Files:**
- Modify: `src/app/artikel/page.tsx`
- Modify: `src/app/artikel/[slug]/page.tsx`
- Modify: `src/app/artikel/[slug]/actions.ts`
- Modify: `src/components/home/LatestInsightsServer.tsx`

**Interfaces:**
- Consumes: The newly created `http://127.0.0.1:4000/api/v1/articles` endpoints.
- Produces: Prisma-free Article components.

- [ ] **Step 1: Update `src/app/artikel/page.tsx`**
- Remove `import { prisma }` and `@prisma/client`.
- Define local `Article` interface (or import from a shared types file if exists).
- Replace `prisma.article.findMany` with `fetch('http://127.0.0.1:4000/api/v1/articles?...', { next: { revalidate: 60 } })`.
- Make sure to pass `includeCounts=true` to get the raw category array for building the tab counts.

- [ ] **Step 2: Update `src/app/artikel/[slug]/page.tsx`**
- Replace `prisma.article.findUnique` with `fetch('http://127.0.0.1:4000/api/v1/articles/${slug}', { next: { revalidate: 60 } })`.

- [ ] **Step 3: Update `src/app/artikel/[slug]/actions.ts`**
- Modify `incrementViewCount(slug)` to use `fetch('http://127.0.0.1:4000/api/v1/articles/${slug}/view', { method: 'POST' })` instead of `prisma.article.update`.

- [ ] **Step 4: Update `src/components/home/LatestInsightsServer.tsx`**
- Replace `prisma.article.findMany` with `fetch('http://127.0.0.1:4000/api/v1/articles?limit=3')`.

- [ ] **Step 5: Commit**
Commit Next.js frontend changes.
