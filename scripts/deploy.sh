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
echo -e "\n${YELLOW}[1/5] Pulling latest code...${NC}"
git pull origin main

# 2. Run automation test to check for regressions
echo -e "\n${YELLOW}[2/5] Running automation test...${NC}"
npm test
if [ $? -ne 0 ]; then
    echo -e "${RED}Test failed! Aborting deploy.${NC}"
    exit 1
fi
echo -e "${GREEN}All tests passed!${NC}"

# 3. Build containers
echo -e "\n${YELLOW}[3/5] Building containers...${NC}"
docker compose build --no-cache

# 4. Stop old containers & start new ones
echo -e "\n${YELLOW}[4/5] Restarting services...${NC}"
docker compose down
docker compose up -d

# 5. Wait for health check
echo -e "\n${YELLOW}[5/5] Waiting for services to start...${NC}"
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
    echo "Dashboard: https://easylegal.id/login"
    echo ""
else
    echo -e "\n${RED}Deploy may have issues. Check logs:${NC}"
    echo "docker compose logs app"
    exit 1
fi
