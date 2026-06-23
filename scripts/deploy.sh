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

# 2. Build & restart containers (without cache to ensure clean build & clear CSP headers)
echo -e "\n${YELLOW}[2/4] Building & restarting containers (clean build)...${NC}"
docker compose build --no-cache
docker compose up -d --remove-orphans

# 3. Clean Docker Cache and Restart system Nginx (if running on host)
echo -e "\n${YELLOW}[3/4] Cleaning up Docker cache & restarting Nginx...${NC}"
docker image prune -f
docker builder prune -f
docker container prune -f
if docker compose ps | grep -q "nginx"; then
    echo "Restarting Nginx docker container..."
    docker compose restart nginx
else
    echo "Nginx container not found. Running compose up..."
    docker compose up -d nginx
fi

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
