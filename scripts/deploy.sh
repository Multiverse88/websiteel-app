#!/bin/bash
set -euo pipefail

# ============================================
# EasyLegal Deploy Script
# Usage: bash scripts/deploy.sh
# ============================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_TAG="deploy-$(date +%Y%m%d-%H%M%S)"

echo "========================================="
echo " EasyLegal Deploy — $DEPLOY_TAG"
echo "========================================="

# Prerequisites check
if [ ! -f .env.production ]; then
    echo -e "${RED}Error: .env.production not found!${NC}"
    exit 1
fi

# Check disk space (>85% → warning)
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 85 ]; then
    echo -e "${YELLOW}Warning: Disk usage ${DISK_USAGE}% — consider cleaning up.${NC}"
fi
if [ "$DISK_USAGE" -gt 95 ]; then
    echo -e "${RED}Error: Disk usage ${DISK_USAGE}% — cannot deploy safely.${NC}"
    exit 1
fi

# 1. Backup database
echo -e "\n${YELLOW}[1/6] Backing up database...${NC}"
bash scripts/backup-db.sh || echo -e "${YELLOW}Warning: DB backup failed, continuing anyway...${NC}"

# 2. Pull latest code
echo -e "\n${YELLOW}[2/6] Pulling latest code...${NC}"
git pull origin main

# 3. Clean local build cache
echo -e "\n${YELLOW}[3/6] Cleaning local build cache...${NC}"
rm -rf .next .turbo node_modules/.cache

# 4. Build & restart containers
echo -e "\n${YELLOW}[4/6] Building & restarting containers (clean build)...${NC}"
docker compose down --remove-orphans 2>/dev/null || true
docker compose build --no-cache
docker compose up -d --remove-orphans

# 5. Clean Docker garbage (images >24h, unused containers, build cache)
echo -e "\n${YELLOW}[5/6] Cleaning up Docker...${NC}"
docker container prune -f
docker image prune -f --filter="until=24h"
docker builder prune -f

# Restart Nginx
if docker compose ps --format json 2>/dev/null | grep -q '"Service":"nginx"'; then
    echo "Restarting Nginx..."
    docker compose restart nginx
fi

# 6. Wait for health check (up to 120s)
echo -e "\n${YELLOW}[6/6] Waiting for app to be healthy...${NC}"
HEALTH_TIMEOUT=120
HEALTH_OK=false
while [ $HEALTH_TIMEOUT -gt 0 ]; do
    HEALTH=$(docker compose ps --format json 2>/dev/null | grep -o '"Health":"[^"]*"' | head -1)
    if echo "$HEALTH" | grep -q '"healthy"'; then
        echo -e "${GREEN}App is healthy.${NC}"
        HEALTH_OK=true
        break
    fi
    sleep 3
    HEALTH_TIMEOUT=$((HEALTH_TIMEOUT - 3))
done

# Final status
if [ "$HEALTH_OK" = true ] && docker compose ps | grep -q "Up"; then
    # Run database seed (runs automatically if database is empty)
    echo -e "\n${YELLOW}Running database seed check...${NC}"
    FORCE_SEED=${FORCE_SEED:-false}
    docker compose exec -T app sh -c "FORCE_SEED=$FORCE_SEED node prisma/seed.js" || echo -e "${RED}Warning: Database seed failed!${NC}"

    # Tag release
    git tag -f "$DEPLOY_TAG" 2>/dev/null || true
    echo -e "\n========================================="
    echo -e "${GREEN}Deploy successful: $DEPLOY_TAG${NC}"
    echo "========================================="
    echo ""
    docker compose ps
    echo ""
    echo "Website: https://easylegal.my.id"
    echo "Dashboard: https://easylegal.my.id/login"
    echo ""
else
    echo -e "\n${RED}Health check failed! Container may be unhealthy.${NC}"
    echo "Showing last 30 lines of logs:"
    docker compose logs app --tail 30
    echo ""
    echo -e "${YELLOW}Check logs manually: docker compose logs app${NC}"
    exit 1
fi
