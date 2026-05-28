# Deploy EasyLegal ke VPS

## Spesifikasi VPS

| Komponen | Detail |
|----------|--------|
| CPU | 4 vCPU |
| RAM | 6GB |
| OS | Ubuntu |
| Domain | easylegal.id |
| Repo | https://github.com/Multiverse88/websiteel-app |

## Arsitektur

```
[Domain: easylegal.id]
        ↓
   [Nginx (SSL/HTTPS)]  ← nginx:alpine container
        ↓
   [Next.js 16]         ← app container (Node 20)
        ↓
   [PostgreSQL 16]      ← db container (postgres:16-alpine)
```

## Stack di VPS

| Komponen | Fungsi |
|----------|--------|
| **Docker Compose** | Orchestrate semua services |
| **Nginx** | Reverse proxy, SSL termination, static file caching |
| **Next.js 16** | Application server (standalone mode) |
| **PostgreSQL 16** | Database lokal |
| **Let's Encrypt** | SSL certificate gratis |

## File Konfigurasi

| File | Fungsi |
|------|--------|
| `Dockerfile` | Multi-stage build (deps → builder → runner) |
| `docker-compose.yml` | 3 services: app, db, nginx |
| `.dockerignore` | Exclude files dari Docker build |
| `.env.example` | Template environment variables |
| `nginx/nginx.conf` | Reverse proxy + SSL + security headers |
| `scripts/deploy-setup.sh` | Setup awal VPS (Docker, firewall, certbot) |
| `scripts/deploy.sh` | Update deployment (pull → build → restart) |
| `scripts/backup-db.sh` | Backup database ke `/opt/backups/` |
| `DEPLOYMENT.md` | Dokumentasi ini |

## Setup Awal VPS

### 1. Jalankan Setup Script

```bash
# SSH ke VPS
ssh root@<vps-ip>

# Jalankan setup (install Docker, Certbot, firewall)
bash scripts/deploy-setup.sh

# Logout & login lagi (agar docker group aktif)
exit
ssh <user>@<vps-ip>
```

### 2. Clone Project

```bash
cd /opt
git clone https://github.com/Multiverse88/websiteel-app.git easylegal
cd easylegal/websiteel-app
```

### 3. Konfigurasi Environment

```bash
cp .env.example .env.production
nano .env.production
```

Isikan value production:

```env
# DATABASE (PostgreSQL lokal di Docker)
DATABASE_URL="postgresql://easylegal:<password}@db:5432/easylegal?schema=public"
DIRECT_URL="postgresql://easylegal:<password>@db:5432/easylegal?schema=public"

# JWT
JWT_SECRET="<generate-with-openssl-rand-base64-32>"

# EMAIL (Hostinger SMTP)
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT=465
SMTP_USER="newsletter@easylegal.id"
SMTP_PASS="<password-email>"
SMTP_FROM='"Easy Legal" <newsletter@easylegal.id>'

# APP URL
NEXT_PUBLIC_APP_URL="https://easylegal.id"
```

> **Note:** `DB_PASSWORD` di docker-compose.yml default: `easylegal_secret_2026`
> Jika ingin ganti, tambahkan `DB_PASSWORD=<your-password>` di `.env.production`

Generate random JWT_SECRET:
```bash
openssl rand -base64 32
```

### 4. Build & Jalankan

```bash
# Build images
docker compose build

# Jalankan (background)
docker compose up -d

# Cek status
docker compose ps

# Lihat log
docker compose logs -f app
```

### 5. Seed Database

```bash
docker compose exec app npx prisma db seed
```

Default admin: `admin@easylegal.id` / `admin123`

### 6. Setup SSL dengan Let's Encrypt

```bash
# Stop nginx sementara (port 80 harus free untuk certbot)
docker compose stop nginx

# Generate certificate
sudo certbot certonly --standalone -d easylegal.id -d www.easylegal.id

# Copy certs ke project
mkdir -p nginx/certs
sudo cp /etc/letsencrypt/live/easylegal.id/fullchain.pem nginx/certs/
sudo cp /etc/letsencrypt/live/easylegal.id/privkey.pem nginx/certs/
sudo chown -R $USER:$USER nginx/certs/

# Start nginx lagi
docker compose start nginx

# Setup auto-renewal (cron)
echo "0 12 * * * cd /opt/easylegal/websiteel-app && sudo certbot renew --quiet && sudo cp /etc/letsencrypt/live/easylegal.id/fullchain.pem nginx/certs/ && sudo cp /etc/letsencrypt/live/easylegal.id/privkey.pem nginx/certs/ && docker compose restart nginx" | crontab -
```

### 7. Verifikasi

```bash
# Cek semua container jalan
docker compose ps

# Cek website
curl -I https://easylegal.id

# Cek dashboard
curl -I https://easylegal.id/dashboard
```

## Update Project (Saat Ada Perubahan)

### Di Lokal (Development)
```bash
# 1. Develop fitur baru
# 2. Commit & push
git add .
git commit -m "feat: tambah halaman baru"
git push origin main
```

### Di VPS (Deployment) - Manual
```bash
cd /opt/easylegal/websiteel-app

# Pull code terbaru
git pull origin main

# Build ulang & restart
docker compose build --no-cache
docker compose up -d
```

### Di VPS (Deployment) - Pakai Script
```bash
cd /opt/easylegal/websiteel-app
bash scripts/deploy.sh
```

Script akan otomatis: pull → build → restart → cek status

### Yang terjadi di balik layar:
```
git pull → docker compose build → rebuild image Next.js
        → docker compose down → stop container lama
        → docker compose up -d → start container baru
        → CMD: prisma migrate deploy && node server.js
```

## Perintah Umum

| Aksi | Command |
|------|---------|
| **Update code** | `bash scripts/deploy.sh` |
| **Update manual** | `git pull && docker compose build --no-cache && docker compose up -d` |
| **Restart saja** | `docker compose restart` |
| **Restart app only** | `docker compose restart app` |
| **Lihat log app** | `docker compose logs -f app` |
| **Lihat log semua** | `docker compose logs -f` |
| **Stop semua** | `docker compose down` |
| **Start semua** | `docker compose up -d` |
| **Cek status** | `docker compose ps` |
| **Masuk ke container** | `docker compose exec app sh` |
| **Jalankan prisma** | `docker compose exec app npx prisma <command>` |
| **Backup database** | `bash scripts/backup-db.sh` |
| **Cek disk usage** | `docker system df` |
| **Cleanup Docker** | `docker system prune -af` |

## Backup & Restore Database

### Manual Backup
```bash
# Backup
docker compose exec -T db pg_dump -U postgres easylegal | gzip > backup_$(date +%Y%m%d).sql.gz

# Restore
docker compose exec -T db psql -U postgres easylegal < backup_20260528.sql
```

### Pakai Script Backup
```bash
bash scripts/backup-db.sh
```

Simpan ke `/opt/backups/easylegal_YYYYMMDD_HHMMSS.sql.gz` (auto-cleanup 7 hari)

### Auto Backup (Cron)
```bash
# Backup harian jam 2 malam
echo "0 2 * * * cd /opt/easylegal/websiteel-app && bash scripts/backup-db.sh" | crontab -
```

## Troubleshooting

### Website tidak bisa diakses
```bash
# Cek container status
docker compose ps

# Cek log
docker compose logs app
docker compose logs nginx

# Cek port terbuka
sudo ufw status
sudo netstat -tlnp | grep -E '(80|443|3000)'

# Cek DNS
dig easylegal.id
```

### Database connection error
```bash
# Cek apakah DB running
docker compose ps db

# Test connection
docker compose exec db psql -U easylegal -d easylegal -c "SELECT 1;"

# Lihat log DB
docker compose logs db
```

### Build gagal
```bash
# Lihat log build
docker compose build 2>&1

# Clean build
docker compose build --no-cache

# Jika masalah Prisma
docker compose exec app npx prisma generate
docker compose exec app npx prisma migrate deploy
```

### SSL certificate expired
```bash
# Renew certificate
sudo certbot renew

# Copy ke project
sudo cp /etc/letsencrypt/live/easylegal.id/fullchain.pem nginx/certs/
sudo cp /etc/letsencrypt/live/easylegal.id/privkey.pem nginx/certs/

# Restart nginx
docker compose restart nginx
```

### File upload tidak tersimpan
```bash
# Cek volume
docker compose exec app ls -la /app/public/uploads/

# Fix permissions
docker compose exec app chmod -R 755 /app/public/uploads/

# Cek volume Docker
docker volume ls
```

### Out of memory
```bash
# Cek penggunaan RAM
docker stats --no-stream

# Restart container
docker compose restart app
```

### Database penuh
```bash
# Cek ukuran DB
docker compose exec db psql -U easylegal -d easylegal -c "SELECT pg_size_pretty(pg_database_size('easylegal'));"

# Backup & cleanup
bash scripts/backup-db.sh
docker compose exec db psql -U easylegal -d easylegal -c "VACUUM FULL;"
```

## Catatan Penting

1. **Jangan commit `.env.production`** ke Git — sudah ada di `.gitignore`
2. **Backup database sebelum update besar**
3. **Prisma migrate otomatis jalan** saat container start (CMD = `prisma migrate deploy && node server.js`)
4. **File uploads tersimpan di Docker volume `uploads`** — backup juga jika perlu
5. **JWT_SECRET harus berbeda** antara development dan production
6. **`output: "standalone"`** sudah dikonfigurasi di `next.config.ts` untuk Docker
7. **GitHub Repo**: https://github.com/Multiverse88/websiteel-app
