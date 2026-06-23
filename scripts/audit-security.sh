#!/bin/bash
set -euo pipefail

# ============================================
# EasyLegal Security Audit Script
# Read-only — tidak mengubah konfigurasi
# Jalanin dari root repo
# ============================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

PASS=0
WARN=0
FAIL=0

echo "========================================="
echo " EasyLegal Security Audit"
echo "========================================="
echo -e "Tanggal: $(date '+%Y-%m-%d %H:%M')\n"

report() {
  local status="$1"
  local msg="$2"
  local detail="${3:-}"
  case "$status" in
    pass) echo -e "  ${GREEN}✓${NC} $msg"; PASS=$((PASS + 1)) ;;
    warn) echo -e "  ${YELLOW}⚠${NC} $msg"; [ -n "$detail" ] && echo -e "       $detail"; WARN=$((WARN + 1)) ;;
    fail) echo -e "  ${RED}✗${NC} $msg"; [ -n "$detail" ] && echo -e "       $detail"; FAIL=$((FAIL + 1)) ;;
  esac
}

# ==========================================
# 1. Open Ports
# ==========================================
echo -e "${YELLOW}[1/6] Open Ports${NC}"

if command -v ss &> /dev/null; then
  LISTENING=$(ss -tlnp 2>/dev/null | awk '$1 == "LISTEN" {split($4, a, ":"); print a[length(a)]}' | sort -n | uniq)
  
  ALLOWED_PORTS="22 80 443 5432"
  for port in $LISTENING; do
    case " $ALLOWED_PORTS " in
      *" $port "*) report pass "Port $port (allowed)" ;;
      5432) report pass "Port 5432 (PostgreSQL)" ;;
      *) report warn "Port $port terbuka — verify perlu" ;;
    esac
  done
else
  report warn "ss tidak tersedia, skip port check"
fi

# ==========================================
# 2. SSL Certificate Expiry
# ==========================================
echo -e "\n${YELLOW}[2/6] SSL Certificate Expiry${NC}"

CERT_PATHS=(
  "/etc/letsencrypt/live/easylegal.my.id/fullchain.pem:easylegal.my.id"
  "/etc/letsencrypt/live/easyai.id/fullchain.pem:easyai.id"
  "/etc/letsencrypt/live/dify.easylegal.my.id/fullchain.pem:dify.easylegal.my.id"
)

for entry in "${CERT_PATHS[@]}"; do
  path="${entry%%:*}"
  domain="${entry##*:}"
  
  if [ -f "$path" ]; then
    expiry=$(openssl x509 -enddate -noout -in "$path" 2>/dev/null | cut -d= -f2)
    expiry_epoch=$(date -d "$expiry" +%s 2>/dev/null || date -j -f "%b %d %H:%M:%S %Y %Z" "$expiry" +%s 2>/dev/null)
    now_epoch=$(date +%s)
    days_left=$(( (expiry_epoch - now_epoch) / 86400 ))
    
    if [ "$days_left" -gt 30 ]; then
      report pass "$domain — $days_left hari ($expiry)"
    elif [ "$days_left" -gt 7 ]; then
      report warn "$domain — $days_left hari ($expiry)"
    else
      report fail "$domain — $days_left hari ($expiry)"
    fi
  else
    report warn "$domain — cert tidak ditemukan"
  fi
done

# ==========================================
# 3. Container Security
# ==========================================
echo -e "\n${YELLOW}[3/6] Container Security${NC}"

if command -v docker &> /dev/null; then
  # Cek apakah container jalan sebagai root
  for container in $(docker ps --format '{{.Names}}' 2>/dev/null); do
    USER_INFO=$(docker exec "$container" whoami 2>/dev/null || echo "unknown")
    if [ "$USER_INFO" = "root" ]; then
      report warn "$container jalan sebagai root" "Tambahkan USER instruction di Dockerfile"
    else
      report pass "$container jalan sebagai $USER_INFO"
    fi
  done

  # Cek read-only filesystem
  for container in app easylegal-app; do
    if docker ps --format '{{.Names}}' 2>/dev/null | grep -q "$container"; then
      READONLY=$(docker inspect "$container" --format '{{.HostConfig.ReadonlyRootfs}}' 2>/dev/null)
      if [ "$READONLY" = "true" ]; then
        report pass "$container — read-only filesystem"
      else
        report warn "$container — filesystem bisa di-write" "Set read-only di docker-compose.yml"
      fi
    fi
  done
else
  report warn "Docker tidak terdeteksi, skip"
fi

# ==========================================
# 4. File Permissions
# ==========================================
echo -e "\n${YELLOW}[4/6] Sensitive File Permissions${NC}"

SENSITIVE_FILES=(
  ".env.production"
  ".env"
  "nginx/nginx.conf"
  "prisma/schema.prisma"
)

for file in "${SENSITIVE_FILES[@]}"; do
  if [ -f "$file" ]; then
    PERMS=$(stat -c "%a %U:%G" "$file" 2>/dev/null || stat -f "%OLp %u:%g" "$file" 2>/dev/null)
    PERM_NUM=$(echo "$PERMS" | awk '{print $1}')
    
    if [ "${PERM_NUM: -1}" = "0" ] || [ "${PERM_NUM: -2}" = "00" ]; then
      report pass "$file — $PERMS"
    else
      if [ "${PERM_NUM: -2}" != "00" ]; then
        report warn "$file — $PERMS (bisa dibaca group/other)" "chmod 640 $file"
      fi
    fi
  fi
done

# Git-ignored files yang seharusnya ada
if [ ! -f .env.production ] && [ ! -f .env ]; then
  report fail ".env.production tidak ditemukan!" "Copy dari template"
fi

# ==========================================
# 5. Dependency Audit
# ==========================================
echo -e "\n${YELLOW}[5/6] Dependency Audit${NC}"

if [ -f "package.json" ] && command -v npm &> /dev/null; then
  AUDIT=$(npm audit --production 2>&1 || true)
  if echo "$AUDIT" | grep -q "found 0 vulnerabilities"; then
    report pass "npm audit — 0 vulnerabilities"
  else
    VULN_COUNT=$(echo "$AUDIT" | grep -oP 'found \K\d+' || echo "unknown")
    if [ "$VULN_COUNT" = "0" ]; then
      report pass "npm audit — 0 vulnerabilities"
    else
      report warn "npm audit — $VULN_COUNT vulnerabilities" "Jalankan: npm audit fix --production"
    fi
  fi
else
  report warn "npm/package.json tidak tersedia, skip"
fi

# ==========================================
# 6. Docker Image Vulnerabilities (scout)
# ==========================================
echo -e "\n${YELLOW}[6/6] Docker Image Vulnerabilities${NC}"

if command -v docker &> /dev/null && docker scout version &>/dev/null 2>&1; then
  IMAGES=$(docker compose images --quiet 2>/dev/null | head -1)
  if [ -n "$IMAGES" ]; then
    docker scout quickview "$IMAGES" 2>/dev/null | tail -5 || report warn "docker scout gagal"
  fi
else
  report warn "Docker Scout tidak tersedia" "Install: docker scout install"
fi

# ==========================================
# Summary
# ==========================================
echo ""
echo "========================================="
echo -e " ${GREEN}${PASS}${NC} passed, ${YELLOW}${WARN}${NC} warnings, ${RED}${FAIL}${NC} failed"
echo "========================================="
