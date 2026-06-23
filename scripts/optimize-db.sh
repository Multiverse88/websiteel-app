#!/bin/bash
set -euo pipefail

# ============================================
# EasyLegal Database Optimization Script
# Vacuum, analyze, maintenance indexes
# Jalanin dari host (PostgreSQL di host, bukan Docker)
# ============================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo "========================================="
echo " EasyLegal Database Optimization"
echo "========================================="

# Load env vars for DB connection
if [ -f .env.production ]; then
  export $(grep -v '^#' .env.production | xargs)
fi

DB_USER="${DATABASE_URL#*://}"
DB_USER="${DB_USER%%:*}"
DB_NAME="${DATABASE_URL##*/}"
DB_NAME="${DB_NAME%%\?*}"

if [ -z "$DB_NAME" ]; then
  DB_NAME="easylegal"
fi

echo -e "Database: ${CYAN}$DB_NAME${NC}"
echo ""

# 1. VACUUM ANALYZE
echo -e "${YELLOW}[1/4] Running VACUUM ANALYZE...${NC}"
psql -U "$DB_USER" -d "$DB_NAME" -c "VACUUM ANALYZE;" 2>/dev/null && {
  echo -e "  ${GREEN}✓${NC} VACUUM ANALYZE selesai"
} || {
  echo -e "  ${YELLOW}⚠${NC} Gagal VACUUM (mungkin butuh sudo -u postgres)"
}

# 2. Cek ukuran tabel + index
echo -e "\n${YELLOW}[2/4] Table & index sizes...${NC}"
psql -U "$DB_USER" -d "$DB_NAME" -At -F"|" -c "
  SELECT
    relname,
    pg_size_pretty(pg_total_relation_size(relid)) as total_size,
    pg_size_pretty(pg_relation_size(relid)) as table_size,
    pg_size_pretty(pg_indexes_size(relid)) as index_size,
    n_live_tup as rows
  FROM pg_stat_user_tables
  ORDER BY pg_total_relation_size(relid) DESC;
" 2>/dev/null | while IFS='|' read -r relname total_size table_size index_size rows; do
  printf "  %-25s %-10s (table: %-8s index: %-8s rows: %s)\n" "$relname" "$total_size" "$table_size" "$index_size" "$rows"
done

# 3. Cek index usage
echo -e "\n${YELLOW}[3/4] Index usage statistics...${NC}"
psql -U "$DB_USER" -d "$DB_NAME" -c "
  SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan as scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
  FROM pg_stat_user_indexes
  ORDER BY idx_scan ASC;
" 2>/dev/null

# 4. Reindex kalo perlu
echo -e "\n${YELLOW}[4/4] Checking for missing indexes...${NC}"
psql -U "$DB_USER" -d "$DB_NAME" -c "
  SELECT
    relname,
    seq_scan,
    seq_tup_read,
    idx_scan
  FROM pg_stat_user_tables
  WHERE seq_scan > 1000 AND idx_scan = 0
  ORDER BY seq_scan DESC;
" 2>/dev/null | grep -q "rows)" && {
  echo -e "  ${YELLOW}⚠ Tabel dengan sequential scan tinggi tanpa index:${NC}"
  psql -U "$DB_USER" -d "$DB_NAME" -c "
    SELECT relname, seq_scan, seq_tup_read
    FROM pg_stat_user_tables
    WHERE seq_scan > 1000 AND idx_scan = 0
    ORDER BY seq_scan DESC;
  " 2>/dev/null
} || {
  echo -e "  ${GREEN}✓${NC} Semua tabel sudah punya index yang memadai"
}

echo ""
echo -e "${GREEN}Optimasi database selesai.${NC}"
echo -e "Jadwalkan cron mingguan: ${CYAN}0 3 * * 0 $(realpath "$0")${NC}"
