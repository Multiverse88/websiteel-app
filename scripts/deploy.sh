#!/bin/bash
set -e

# ============================================
# EasyLegal Deploy Script
# Usage: bash scripts/deploy.sh
# ============================================

echo "========================================="
echo " EasyLegal Deploy"
echo "========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo -e "${RED}Error: .env.production not found!${NC}"
    exit 1
fi

# 1. Pull latest code
echo -e "\n${YELLOW}[1/3] Pulling latest code...${NC}"
git pull origin main

# 2. Build & restart containers (use cache for faster builds)
echo -e "\n${YELLOW}[2/4] Building & restarting containers...${NC}"
docker compose up -d --build --remove-orphans

# 3. Prune old images, build cache, and stopped containers
echo -e "\n${YELLOW}[3/4] Cleaning up Docker cache...${NC}"
docker image prune -f
docker builder prune -f --filter "until=72h"
docker container prune -f

# 4. Wait for health check
echo -e "\n${YELLOW}[4/4] Waiting for services to start...${NC}"
sleep 5

# Check status
if docker compose ps | grep -q "Up"; then
    echo -e "\n========================================="
    echo -e "${GREEN}Deploy successful!${NC}"
    echo "========================================="
    echo ""
    docker compose ps
    echo ""
    echo "Website: https://easylegal.my.id"
    echo "Dashboard: https://easylegal.my.id/login"
    echo ""
else
    echo -e "\n${RED}Deploy may have issues. Check logs:${NC}"
    echo "docker compose logs app"
    exit 1
fi
