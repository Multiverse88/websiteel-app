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
    echo "Copy .env.example to .env.production and fill in the values."
    exit 1
fi

# 1. Pull latest code
echo -e "\n${YELLOW}[1/4] Pulling latest code...${NC}"
git pull origin main

# 2. Build containers
echo -e "\n${YELLOW}[2/4] Building containers...${NC}"
docker compose build --no-cache

# 3. Stop old containers & start new ones
echo -e "\n${YELLOW}[3/4] Restarting services...${NC}"
docker compose down
docker compose up -d

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
    echo "Website: https://easylegal.id"
    echo "Dashboard: https://easylegal.id/dashboard"
    echo ""
else
    echo -e "\n${RED}Deploy may have issues. Check logs:${NC}"
    echo "docker compose logs app"
    exit 1
fi
