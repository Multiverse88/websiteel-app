FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Generate Prisma client and build TypeScript
RUN npx prisma generate
RUN npx tsc > /dev/null 2>&1 || true

EXPOSE 4000

CMD ["npm", "start"]
