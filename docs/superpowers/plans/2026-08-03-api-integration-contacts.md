# API Integration Plan: Contact Form & Redirects (Phase 3C)

**Goal:** Decouple the Contact Form submissions and Middleware URL Redirects from Prisma.

## Task 1: Create Express API Endpoints
- `POST /api/v1/contacts`: Saves contact form submissions.
- `GET /api/v1/redirects/:slug`: Fetches redirect destination and increments click count.

## Task 2: Update Next.js Frontend
- Update `src/app/kontak/actions.ts` to POST to `/api/v1/contacts`.
- Update `src/middleware.ts` to GET from `/api/v1/redirects/:slug`.

Status: COMPLETED.
