#!/bin/bash
set -euo pipefail

# ============================================
# Sync images to MinIO & clean local copies
# Usage: bash scripts/sync-and-clean.sh [--dry-run]
#
# This script:
#   1. Uploads all images from public/ to MinIO bucket
#   2. Deletes local copies from public/ to save disk space
#   3. Keeps essential Next.js files (icons, manifest, etc.)
#
# NOTE: Run this AFTER docker build, not before.
#       Images must exist in public/ during build.
# ============================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

PUBLIC_DIR="public"

# ── Load env ──────────────────────────────────────────
load_env() {
  local env_file="$1"
  [ -f "$env_file" ] || return 0
  while IFS='=' read -r key val; do
    key=$(echo "$key" | xargs)
    [[ -z "$key" || "$key" == \#* ]] && continue
    val=$(echo "$val" | sed 's/^["'"'"']//;s/["'"'"']$//')
    export "$key=$val" 2>/dev/null || true
  done < "$env_file"
}

load_env .env.production
load_env .env

# ── Validate MinIO config ────────────────────────────
if [ -z "${MINIO_ENDPOINT:-}" ] || [ -z "${MINIO_ACCESS_KEY:-}" ] || [ -z "${MINIO_SECRET_KEY:-}" ]; then
  echo -e "${RED}Error: MinIO credentials not found in .env / .env.production${NC}"
  exit 1
fi

BUCKET="${MINIO_BUCKET:-images}"
PUBLIC_URL="${MINIO_PUBLIC_URL:-https://easylegal.my.id/images}"

# MinIO API endpoint (not CDN). Try in order:
# 1. MINIO_API_ENDPOINT env var (if set)
# 2. localhost:9000 (MinIO on same VPS, different Docker)
# 3. MINIO_ENDPOINT from .env (fallback)
if [ -n "${MINIO_API_ENDPOINT:-}" ]; then
  ENDPOINT="${MINIO_API_ENDPOINT}"
elif curl -sf http://localhost:19000/minio/health/live >/dev/null 2>&1; then
  ENDPOINT="http://localhost:19000"
elif curl -sf http://localhost:9000/minio/health/live >/dev/null 2>&1; then
  ENDPOINT="http://localhost:9000"
else
  ENDPOINT="${MINIO_ENDPOINT}"
fi

echo "========================================="
echo " Sync & Clean Images → MinIO"
echo "========================================="
echo " Endpoint:  $ENDPOINT"
echo " Bucket:    $BUCKET"
echo " Public:    $PUBLIC_URL"
echo " Mode:      $(if $DRY_RUN; then echo 'DRY RUN'; else echo 'LIVE'; fi)"
echo "========================================="

# Verify MinIO is reachable
if ! curl -sf "$ENDPOINT/minio/health/live" >/dev/null 2>&1; then
  echo -e "${RED}Error: MinIO not reachable at $ENDPOINT${NC}"
  echo "Tried: $ENDPOINT/minio/health/live"
  echo ""
  echo "MinIO might be running on a different port or Docker network."
  echo "Set MINIO_API_ENDPOINT env var to the correct address, e.g.:"
  echo "  MINIO_API_ENDPOINT=http://localhost:9000 bash scripts/sync-and-clean.sh"
  exit 1
fi
echo -e "${GREEN}✓ MinIO is reachable at $ENDPOINT${NC}"

# ── Check mc (MinIO Client) ──────────────────────────
MC_BIN="$HOME/.local/bin/mc"
export PATH="$HOME/.local/bin:$PATH"

if ! command -v mc &>/dev/null && [ ! -f "$MC_BIN" ]; then
  echo -e "${YELLOW}MinIO Client (mc) not found. Installing to $MC_BIN...${NC}"
  mkdir -p "$HOME/.local/bin"
  curl -sSL https://dl.min.io/client/mc/release/linux-amd64/mc -o "$MC_BIN"
  chmod +x "$MC_BIN"
  echo -e "${GREEN}mc installed.${NC}"
fi

# ── Configure mc alias ───────────────────────────────
"$MC_BIN" alias set easylegal "$ENDPOINT" "$MINIO_ACCESS_KEY" "$MINIO_SECRET_KEY" --api S3v4 2>/dev/null

# ── Ensure bucket exists ─────────────────────────────
"$MC_BIN" mb easylegal/"$BUCKET" --ignore-existing 2>/dev/null || true

# ── File extensions to sync ──────────────────────────
IMAGE_EXTS="jpg|jpeg|png|webp|gif|svg|ico|avif|mp4|mp3|pdf"

# ── Files to KEEP locally (required by Next.js) ──────
KEEP_FILES=(
  "Logo EL.png"
  "apple-touch-icon.png"
  "icon-192.png"
  "icon-512.png"
  "favicon.ico"
  "favicon.png"
  "site.webmanifest"
  "robots.txt"
)

# ── Counters ─────────────────────────────────────────
uploaded=0
skipped=0
deleted=0
kept=0
errors=0
total_size=0

# ── Helper: check if file should be kept ─────────────
should_keep() {
  local basename
  basename=$(basename "$1")
  for pattern in "${KEEP_FILES[@]}"; do
    [ "$basename" = "$pattern" ] && return 0
  done
  return 1
}

# ── Helper: get MinIO object key ─────────────────────
get_key() {
  local rel_path="$1"
  local key="${rel_path#"$PUBLIC_DIR"/}"
  if [ "$BUCKET" = "images" ] && [[ "$key" == images/* ]]; then
    key="${key#images/}"
  fi
  echo "$key"
}

# ── Helper: get content type ─────────────────────────
get_mime() {
  case "${1,,}" in
    jpg|jpeg) echo "image/jpeg" ;;
    png)      echo "image/png" ;;
    webp)     echo "image/webp" ;;
    gif)      echo "image/gif" ;;
    svg)      echo "image/svg+xml" ;;
    ico)      echo "image/x-icon" ;;
    avif)     echo "image/avif" ;;
    mp4)      echo "video/mp4" ;;
    mp3)      echo "audio/mpeg" ;;
    pdf)      echo "application/pdf" ;;
    *)        echo "application/octet-stream" ;;
  esac
}

# ══════════════════════════════════════════════════════
# STEP 1: Upload to MinIO
# ══════════════════════════════════════════════════════
echo -e "\n${CYAN}[1/2] Uploading images to MinIO...${NC}"

while IFS= read -r -d '' file; do
  rel_path="${file#./}"
  ext="${file##*.}"
  ext_lower="${ext,,}"

  # Skip non-image/media files
  if ! echo "$ext_lower" | grep -qE "^($IMAGE_EXTS)$"; then
    continue
  fi

  key=$(get_key "$rel_path")
  file_size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null || echo 0)

  # Skip if already exists on MinIO
  if "$MC_BIN" stat easylegal/"$BUCKET"/"$key" &>/dev/null 2>&1; then
    skipped=$((skipped + 1))
    continue
  fi

  if $DRY_RUN; then
    echo -e "  [DRY] ${rel_path} → ${key} ($(( file_size / 1024 ))KB)"
    uploaded=$((uploaded + 1))
    total_size=$((total_size + file_size))
    continue
  fi

  mime=$(get_mime "$ext_lower")

  if "$MC_BIN" cp "$file" "easylegal/$BUCKET/$key" --quiet 2>/dev/null; then
    # Set cache headers
    "$MC_BIN" annotate "easylegal/$BUCKET/$key" \
      --metadata "Cache-Control=public, max-age=31536000, immutable" 2>/dev/null || true
    echo -e "  ${GREEN}✓${NC} ${rel_path} → ${key} ($(( file_size / 1024 ))KB)"
    uploaded=$((uploaded + 1))
    total_size=$((total_size + file_size))
  else
    echo -e "  ${RED}✗${NC} ${rel_path} → ${key}: upload failed"
    errors=$((errors + 1))
  fi
done < <(find "$PUBLIC_DIR" -type f -print0 2>/dev/null | sort -z)

echo -e "\n${CYAN}Upload: ${uploaded} uploaded, ${skipped} skipped, ${errors} errors${NC}"
echo -e "Size synced: $(( total_size / 1024 / 1024 ))MB"

# ══════════════════════════════════════════════════════
# STEP 2: Delete local copies
# ══════════════════════════════════════════════════════
echo -e "\n${CYAN}[2/2] Cleaning local images...${NC}"

if $DRY_RUN; then
  echo -e "${YELLOW}DRY RUN — showing what would be deleted:${NC}"
fi

while IFS= read -r -d '' file; do
  rel_path="${file#./}"
  ext="${file##*.}"
  ext_lower="${ext,,}"

  if ! echo "$ext_lower" | grep -qE "^($IMAGE_EXTS)$"; then
    continue
  fi

  # Keep essential Next.js files
  if should_keep "$file"; then
    kept=$((kept + 1))
    $DRY_RUN && echo -e "  [KEEP] $rel_path"
    continue
  fi

  file_size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null || echo 0)

  if $DRY_RUN; then
    echo -e "  [DELETE] $rel_path ($(( file_size / 1024 ))KB)"
    deleted=$((deleted + 1))
  else
    if rm "$file" 2>/dev/null; then
      deleted=$((deleted + 1))
    else
      echo -e "  ${RED}✗${NC} Failed: $rel_path"
      errors=$((errors + 1))
    fi
  fi
done < <(find "$PUBLIC_DIR" -type f -print0 2>/dev/null | sort -z)

# Clean empty directories
if ! $DRY_RUN; then
  find "$PUBLIC_DIR" -type d -empty -delete 2>/dev/null || true
fi

# ══════════════════════════════════════════════════════
# Summary
# ══════════════════════════════════════════════════════
echo ""
echo "========================================="
echo " Summary"
echo "========================================="
echo -e " Uploaded → MinIO:  ${GREEN}${uploaded}${NC}"
echo -e " Skipped (exists):  ${skipped}"
echo -e " Local deleted:     ${deleted}"
echo -e " Local kept:        ${kept}"
echo -e " Errors:            ${errors}"
echo -e " Space freed:       $(( total_size / 1024 / 1024 ))MB"
echo "========================================="
echo ""
echo "CDN URL: $PUBLIC_URL"
echo "Test:    curl -I '$PUBLIC_URL/Logo EL.png'"

if $DRY_RUN; then
  echo -e "\n${YELLOW}Dry run complete. Run without --dry-run to apply.${NC}"
fi

if [ "$errors" -gt 0 ]; then
  echo -e "\n${RED}Some files had errors. Check output above.${NC}"
fi
