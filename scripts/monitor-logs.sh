#!/bin/bash
# EasyLegal Log Monitor - Quick check for errors
# Usage: bash scripts/monitor-logs.sh

echo "=== EasyLegal Container Logs ==="
echo ""

echo "--- Next.js App Errors (Last 50 lines) ---"
docker compose logs app --tail 50 2>&1 | grep -iE "error|fail|exception|warn" | tail -20 || echo "No errors found"

echo ""
echo "--- Nginx Errors (Last 50 lines) ---"
docker compose logs nginx --tail 50 2>&1 | grep -iE "error|fail|denied|502|504" | tail -20 || echo "No errors found"

echo ""
echo "--- Database Connection Check ---"
pg_isready -h 172.17.0.1 -p 5432 -U easylegal && echo "DB: OK" || echo "DB: FAILED"