# Decoupled Architecture Implementation Plan (Phase 1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the foundation of the new Backend (Project 2) by scaffolding an Express API, a React Vite Dashboard, and migrating the database connection via Prisma.

**Architecture:** Create a new folder `admin-project` containing `api` (Express) and `dashboard` (React). Set up Prisma inside `api` and implement a basic JWT authentication endpoint that returns an HTTP-Only cookie.

**Tech Stack:** Express.js, React (Vite), Prisma, PostgreSQL, JSON Web Token (JWT), Cookie-Parser.

## Global Constraints

- Must use HTTP-Only, Secure, and SameSite cookies for JWT.
- Must retain the existing PostgreSQL database schema.

---

### Task 1: Scaffold Express API Project

**Files:**
- Create: `admin-project/api/package.json`
- Create: `admin-project/api/src/server.ts`
- Create: `admin-project/api/tsconfig.json`

**Interfaces:**
- Produces: An Express server running on port 4000.

- [ ] **Step 1: Create directory and package.json**

```bash
mkdir -p admin-project/api/src
cd admin-project/api
npm init -y
npm install express cors cookie-parser dotenv jsonwebtoken
npm install -D typescript @types/express @types/node @types/cors @types/cookie-parser @types/jsonwebtoken ts-node nodemon
```
Expected: `package.json` created in `admin-project/api`.

- [ ] **Step 2: Initialize TypeScript config**

```bash
cd admin-project/api
npx tsc --init
```
Modify `admin-project/api/tsconfig.json` to have:
```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

- [ ] **Step 3: Create basic Express server**

Create `admin-project/api/src/server.ts`:
```typescript
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:5173', // Vite default
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

- [ ] **Step 4: Add run scripts**

Modify `admin-project/api/package.json`:
```json
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
```

- [ ] **Step 5: Commit**

```bash
git add admin-project/api
git commit -m "feat: scaffold express api"
```

---

### Task 2: Migrate Prisma to API

**Files:**
- Modify: `admin-project/api/package.json`
- Create: `admin-project/api/prisma/schema.prisma`
- Create: `admin-project/api/src/lib/prisma.ts`

**Interfaces:**
- Consumes: The `prisma` folder from the Next.js project.
- Produces: `prisma` client instance for the Express API.

- [ ] **Step 1: Install Prisma**

```bash
cd admin-project/api
npm install prisma @prisma/client
```

- [ ] **Step 2: Copy Prisma schema**

```bash
cp -r prisma admin-project/api/
```
Expected: `admin-project/api/prisma/schema.prisma` exists and contains the schema.

- [ ] **Step 3: Create Prisma Client wrapper**

Create `admin-project/api/src/lib/prisma.ts`:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;
```

- [ ] **Step 4: Generate Prisma Client**

```bash
cd admin-project/api
npx prisma generate
```
Expected: Prisma client generated.

- [ ] **Step 5: Commit**

```bash
git add admin-project/api
git commit -m "chore: integrate prisma into express api"
```

---

### Task 3: Implement Auth JWT Routes

**Files:**
- Create: `admin-project/api/src/routes/auth.ts`
- Modify: `admin-project/api/src/server.ts`

**Interfaces:**
- Consumes: `prisma` client from Task 2.
- Produces: `/api/auth/login` endpoint that sets `httpOnly` cookie.

- [ ] **Step 1: Create auth route**

Create `admin-project/api/src/routes/auth.ts`:
```typescript
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Note: For this MVP phase, we bypass real bcrypt for testing scaffolding.
  // In a real scenario, we verify hash from DB.
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate Token
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

  // Set HTTP-Only Cookie
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  res.json({ message: 'Logged in successfully' });
});

export default router;
```

- [ ] **Step 2: Register routes in Server**

Modify `admin-project/api/src/server.ts` to include the route:
```typescript
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth'; // <-- Add this

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes); // <-- Add this

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

- [ ] **Step 3: Test route existence logic**
Run a curl or basic check to ensure no syntax errors.

- [ ] **Step 4: Commit**
```bash
git add admin-project/api
git commit -m "feat: add jwt auth login route"
```

---

### Task 4: Scaffold React Vite Dashboard

**Files:**
- Create: `admin-project/dashboard/package.json`

**Interfaces:**
- Produces: A React app running on port 5173.

- [ ] **Step 1: Create Vite Project**

```bash
cd admin-project
npx -y create-vite@latest dashboard --template react-ts
```
Expected: `admin-project/dashboard` created.

- [ ] **Step 2: Install dependencies**

```bash
cd admin-project/dashboard
npm install
```

- [ ] **Step 3: Configure Dev Port**
Modify `admin-project/dashboard/vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
```

- [ ] **Step 4: Commit**
```bash
git add admin-project/dashboard
git commit -m "feat: scaffold react vite dashboard"
```
