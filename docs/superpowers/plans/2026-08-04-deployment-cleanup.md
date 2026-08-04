# Deployment & Cleanup Plan (Phase 4)

**Goal:** Clean up all remaining Next.js Prisma files and configure Docker to run the new decoupled architecture.

## Task 1: Cleanup Monolith
- Remove `prisma/` directory from root Next.js app.
- Remove `src/lib/db.ts`.
- Remove Prisma, `@prisma/client`, and `nodemailer` from `package.json` in Next.js.
- Update Next.js `Dockerfile` to remove all Prisma-related commands (no more `migrate deploy` on start).

## Task 2: Configure Docker Services
- Create `admin-project/api/Dockerfile` for the Express backend.
- Create `admin-project/dashboard/Dockerfile` for the Vite admin dashboard.
- Update `docker-compose.yml` to include `admin-api` (Express) and `admin-dashboard` (Vite on Nginx).

## Task 3: Update Nginx Reverse Proxy
- Update `nginx/nginx.conf` to add upstreams `admin-api` (port 4000) and `admin-dashboard` (port 80).
- Add routing rules so `/api/` goes to `admin-api`, and `/dashboard` and `/login` go to `admin-dashboard`.

Status: COMPLETED.
