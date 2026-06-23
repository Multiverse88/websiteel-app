#!/bin/bash
set -euo pipefail

# ============================================
# EasyLegal SSL Certificate Checker
# Cek expiry + auto-renew untuk semua domain
# Cocok untuk cron: 0 6 * * 1 /opt/easylegal/scripts/check-ssl.sh
# ============================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

DOMAINS=(
  "easylegal.my.id:/etc/letsencrypt/live/easylegal.my.id/fullchain.pem"
  "easyai.id:/etc/letsencrypt/live/easyai.id/fullchain.pem"
  "dify.easylegal.my.id:/etc/letsencrypt/live/dify.easylegal.my.id/fullchain.pem"
)

echo "========================================="
echo " EasyLegal SSL Certificate Check"
echo " $(date '+%Y-%m-%d %H:%M')"
echo "========================================="

RENEW_NEEDED=false
EXIT_CODE=0

for entry in "${DOMAINS[@]}"; do
  domain="${entry%%:*}"
  cert_path="${entry##*:}"

  echo -e "\n${CYAN}$domain${NC}"

  if [ ! -f "$cert_path" ]; then
    echo -e "  ${YELLOW}⚠ Cert tidak ditemukan: $cert_path${NC}"
    continue
  fi

  # Parse certificate info
  subject=$(openssl x509 -subject -noout -in "$cert_path" 2>/dev/null | sed 's/.*CN = //')
  issuer=$(openssl x509 -issuer -noout -in "$cert_path" 2>/dev/null | sed 's/.*CN = //')
  expiry=$(openssl x509 -enddate -noout -in "$cert_path" 2>/dev/null | cut -d= -f2)
  serial=$(openssl x509 -serial -noout -in "$cert_path" 2>/dev/null | cut -d= -f2)

  # Calculate days remaining
  if date -d "$expiry" +%s &>/dev/null; then
    expiry_epoch=$(date -d "$expiry" +%s)
    now_epoch=$(date +%s)
    days_left=$(( (expiry_epoch - now_epoch) / 86400 ))
  else
    expiry_epoch=$(date -j -f "%b %d %H:%M:%S %Y %Z" "$expiry" +%s 2>/dev/null || echo 0)
    now_epoch=$(date +%s)
    days_left=$(( (expiry_epoch - now_epoch) / 86400 ))
  fi

  echo -e "  Subject:  $subject"
  echo -e "  Issuer:   $issuer"
  echo -e "  Expires:  $expiry"
  echo -e "  Serial:   $serial"
  echo -e "  Remaining: ${days_left} hari"

  if [ "$days_left" -le 0 ]; then
    echo -e "  ${RED}✗ CERT EXPIRED!${NC}"
    RENEW_NEEDED=true
    EXIT_CODE=1
  elif [ "$days_left" -lt 7 ]; then
    echo -e "  ${RED}⚠ Expiring soon! Auto-renewing...${NC}"
    RENEW_NEEDED=true
    # Auto-renew
    if [ "$EUID" -eq 0 ] || command -v sudo &> /dev/null; then
      SUDO=""
      [ "$EUID" -ne 0 ] && SUDO="sudo"
      $SUDO certbot renew --cert-name "$domain" --non-interactive 2>&1 && {
        echo -e "  ${GREEN}✓ Renewal successful${NC}"
        # Reload nginx to pick up new cert
        docker compose exec nginx nginx -s reload 2>/dev/null || \
          docker exec easylegal-nginx nginx -s reload 2>/dev/null || \
          $SUDO systemctl reload nginx 2>/dev/null || true
      } || {
        echo -e "  ${RED}✗ Renewal failed${NC}"
      }
    else
      echo -e "  ${YELLOW}⚠ Cannot renew (not root). Jalankan: sudo certbot renew${NC}"
    fi
  elif [ "$days_left" -lt 30 ]; then
    echo -e "  ${YELLOW}⚠ Akan expired dalam <30 hari${NC}"
    EXIT_CODE=1
  else
    echo -e "  ${GREEN}✓ OK${NC}"
  fi
done

echo ""
echo "========================================="
if [ "$EXIT_CODE" -eq 0 ]; then
  echo -e " ${GREEN}Semua sertifikat sehat${NC}"
else
  echo -e " ${YELLOW}Ada sertifikat yang perlu diperhatikan${NC}"
fi
echo "========================================="

exit $EXIT_CODE
