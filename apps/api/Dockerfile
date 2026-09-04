FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Generate Prisma client and build TypeScript (fails the build on type errors)
RUN npx prisma generate
RUN npx tsc

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
