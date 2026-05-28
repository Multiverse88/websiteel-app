#!/bin/bash
set -e

# ============================================
# EasyLegal Database Backup Script
# PostgreSQL runs on host VPS
# Usage: bash scripts/backup-db.sh
# ============================================

BACKUP_DIR="/opt/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/easylegal_$TIMESTAMP.sql.gz"

echo "Backing up database..."

# Create backup directory if not exists
mkdir -p $BACKUP_DIR

# Backup (PostgreSQL on host)
pg_dump -U easylegal easylegal | gzip > $BACKUP_FILE

# Show result
if [ -f "$BACKUP_FILE" ]; then
    SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo "Backup saved: $BACKUP_FILE ($SIZE)"
else
    echo "Backup failed!"
    exit 1
fi

# Cleanup old backups (keep last 7 days)
find $BACKUP_DIR -name "easylegal_*.sql.gz" -mtime +7 -delete
echo "Old backups cleaned (kept last 7 days)"
