#!/bin/bash
set -euo pipefail

# ============================================
# EasyLegal Image Optimization Script
# Kompres & convert gambar statis ke WebP
# Jalankan sebelum build untuk hasil optimal
# ============================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo "========================================="
echo " EasyLegal Image Optimization"
echo "========================================="

# Cek apakah sharp bisa di-require
if ! node -e "require('sharp')" &>/dev/null; then
  echo -e "${YELLOW}sharp belum terinstall. Install dulu...${NC}"
  npm install --no-save sharp 2>/dev/null || {
    echo -e "${RED}Error: sharp gagal diinstall. Pastikan Node.js tersedia.${NC}"
    echo -e "Atau jalanin dari dalam container: ${CYAN}docker compose exec app bash scripts/optimize-images.sh${NC}"
    exit 1
  }
fi

CONVERTED=0
SKIPPED=0
ERRORS=0

optimize_image() {
  local src="$1"
  local dir
  dir=$(dirname "$src")
  local base
  base=$(basename "$src")
  local name="${base%.*}"
  local output="$dir/$name.webp"

  # Skip kalo webp udah ada & lebih baru
  if [ -f "$output" ] && [ "$output" -nt "$src" ]; then
    return
  fi

  local size_before
  size_before=$(stat -c%s "$src" 2>/dev/null || stat -f%z "$src" 2>/dev/null)

  # Convert pake sharp via env vars (aman dari special chars di path)
  SRC="$src" OUTPUT="$output" node -e "
    const sharp = require('sharp');
    sharp(process.env.SRC)
      .webp({ quality: 80, effort: 6 })
      .toFile(process.env.OUTPUT)
      .then(() => process.exit(0))
      .catch((e) => { console.error(e.message); process.exit(1); });
  " 2>/dev/null && {
    local size_after
    size_after=$(stat -c%s "$output" 2>/dev/null || stat -f%z "$output" 2>/dev/null)
    local savings=$(( (size_before - size_after) * 100 / (size_before > 0 ? size_before : 1) ))

    if [ "$size_after" -gt 0 ] && [ "$size_after" -lt "$size_before" ]; then
      rm -f "$src"
      echo -e "  ${GREEN}✓${NC} ${src#public/} → ${name}.webp (hemat ${savings}%)"
      CONVERTED=$((CONVERTED + 1))
    else
      rm -f "$output"
      echo -e "  ${YELLOW}⚠${NC} ${src##*/} — webp lebih besar, skip"
      SKIPPED=$((SKIPPED + 1))
    fi
  } || {
    echo -e "  ${RED}✗${NC} ${src##*/} — gagal convert"
    ERRORS=$((ERRORS + 1))
  }
}

echo -e "\n${CYAN}Scanning images...${NC}\n"

while IFS= read -r -d '' file; do
  # Skip direktori uploads (upload user, biarin asli)
  case "$file" in
    *"/public/uploads/"*) continue ;;
  esac

  size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null || echo 0)

  # Skip file <10KB (ikon kecil, gak worth)
  if [ "$size" -lt 10240 ]; then
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  optimize_image "$file"
done < <(find public/ -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)

echo ""
echo "========================================="
echo -e " ${GREEN}${CONVERTED}${NC} converted, ${YELLOW}${SKIPPED}${NC} skipped, ${RED}${ERRORS}${NC} errors"
echo "========================================="
