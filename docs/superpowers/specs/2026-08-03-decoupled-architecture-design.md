# Decoupled Architecture Design: Frontend & API/Dashboard

## 1. Overview
This document outlines the architectural shift from a monolithic Next.js application to a decoupled system. The goal is to separate the public-facing website from the administrative dashboard and backend logic to improve security, scalability, and maintainability.

## 2. System Architecture
The system will be split into two distinct projects:
- **Project 1: Public Frontend**
  - Framework: Next.js (App Router)
  - Purpose: Serve public pages (Homepage, Services, Articles) with high SEO performance.
  - Data Flow: Consumes data via HTTP GET requests to the Backend REST API.
- **Project 2: Backend API & Admin Dashboard**
  - Framework: Express.js (REST API) + React with Vite (Dashboard UI).
  - Purpose: Handle all business logic, database management, and content management (CMS).
  - Structure: A mono-repo approach with two internal directories (`api/` and `dashboard/`). In production, Express can serve the built React static files.

## 3. Component Details

### 3.1 Public Frontend (Project 1)
- **Role:** Read-only client for public data.
- **Communication:** Fetches dynamic content (e.g., articles) from the Express API endpoints.
- **Security:** Does not contain any database credentials or direct database connections.

### 3.2 Backend API & Dashboard (Project 2)
- **API (`api/`)**
  - Exposes RESTful endpoints (e.g., `/api/v1/articles`, `/api/v1/auth`).
  - Retains Prisma as the ORM to interact with the PostgreSQL database.
  - Implements TOTP-2FA verification logic.
- **Dashboard (`dashboard/`)**
  - Single Page Application (SPA) built with React and Vite.
  - Serves as the UI for administrators to manage content.

## 4. Authentication & JWT Flow
Security is prioritized by using `HTTP-Only` cookies for JWT storage.
- **Login:** Admin authenticates via the React Dashboard. The Express API validates credentials and TOTP-2FA.
- **Token Delivery:** Upon successful login, the Express API generates a JWT and sends it in the response header as an `HTTP-Only`, `Secure`, and `SameSite` cookie.
- **Authorization:** Subsequent requests from the React Dashboard to protected API endpoints will automatically include the cookie. The Express middleware extracts and verifies the JWT before granting access.

## 5. Database & Media Storage
- **PostgreSQL:** Accessed exclusively by the Express API (Project 2) via Prisma. Located on the host machine.
- **MinIO Object Storage:** 
  - The Express API handles image uploads from the React Dashboard to the MinIO container.
  - MinIO serves the uploaded assets publicly via the Nginx reverse proxy (e.g., `cdn.easylegal.my.id`).

## 6. Testing & Deployment Strategy
- The decoupled architecture will require updates to the deployment scripts (e.g., Docker Compose configuration) to accommodate the separate frontend, backend API, and static dashboard files.
- Playwright smoke tests should be adjusted to test the decoupled frontend against the new API endpoints.
