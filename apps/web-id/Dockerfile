# ============================================
# Stage 1: Install dependencies
# ============================================
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# ============================================
# Stage 2: Build the application
# ============================================
FROM node:20-alpine AS builder
WORKDIR /app

# Build-time env vars for NEXT_PUBLIC_* variables
ARG NEXT_PUBLIC_TYPEBOT_BOT_ID
ENV NEXT_PUBLIC_TYPEBOT_BOT_ID=${NEXT_PUBLIC_TYPEBOT_BOT_ID}
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js
RUN npx next build

# ============================================
# Stage 3: Production
# ============================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/node_modules ./node_modules

# Create uploads directory
RUN mkdir -p public/uploads/articles public/uploads/avatars

EXPOSE 3000

CMD ["sh", "-c", "node scripts/sync-images.js && node server.js"]
