# API Integration Plan: Email Tracking & Newsletter (Phase 3D)

**Goal:** Remove all remaining Prisma dependencies in the Next.js app related to Newsletter, Cron Jobs, and Email Tracking.

## Task 1: Create Express API Endpoints
- Create `admin-project/api/src/routes/tracking.ts`
  - `GET /open/:id`: Track email open
  - `GET /click/:id`: Track email click
- Create `admin-project/api/src/routes/cron.ts`
  - `POST /process-queue`: Process email queue (move nodemailer/minio logic here)
- Create `admin-project/api/src/routes/newsletter.ts`
  - `POST /subscribe`: Subscribe logic
  - `POST /unsubscribe`: Unsubscribe logic
  - `GET /unsubscribe/:token`: Get subscriber info by token
- Register these in `admin-project/api/src/server.ts`

## Task 2: Migrate Next.js API Routes
- `src/app/api/track-open/[id]/route.ts`: Proxies to API.
- `src/app/api/track-click/[id]/route.ts`: Proxies to API.
- `src/app/api/cron/process-queue/route.ts`: Proxies to API.

## Task 3: Migrate Next.js Server Actions & Pages
- `src/app/newsletter/actions.ts`: Fetch from API.
- `src/app/newsletter/unsubscribe/page.tsx`: Fetch from API.

Status: NOT STARTED.
