# Deploy EasyLegal ke VPS

## Spesifikasi VPS

| Komponen | Detail |
|----------|--------|
| CPU | 4 vCPU |
| RAM | 6GB |
| OS | Ubuntu |
| Domain | easylegal.id |

## Arsitektur

```
[Domain: easylegal.id] → [Nginx (SSL/HTTPS)] → [PM2/Next.js] → [PostgreSQL]
                                    ↓
                            [File uploads di disk VPS]
```

## Stack di VPS

| Komponen | Fungsi |
|----------|--------|
| **Docker Compose** | Orchestrate semua services |
| **Nginx** | Reverse proxy, SSL termination, static file caching |
| **Next.js 16** | Application server |
| **PostgreSQL** | Database lokal (migrasi dari Prisma Postgres) |
| **Let's Encrypt** | SSL certificate gratis |

## File Konfigurasi

| File | Fungsi |
|------|--------|
| `Dockerfile` | Multi-stage build Next.js |
| `docker-compose.yml` | Orchestrate app + db + nginx |
| `nginx/easylegal.conf` | Konfigurasi Nginx reverse proxy + SSL |
| `.env.production` | Environment variables untuk VPS |
| `scripts/deploy-setup.sh` | Setup awal VPS |
| `scripts/deploy.sh` | Script update deployment |
| `scripts/backup-db.sh` | Backup database |

## Setup Awal VPS

### 1. Install Docker & Docker Compose

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group (agar tidak perlu sudo)
sudo usermod -aG docker $USER
newgrp docker

# Verifikasi
docker --version
docker compose version
```

### 2. Clone Project

```bash
cd /opt
git clone <repository-url> easylegal
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
DATABASE_URL="postgresql://easylegal:password@db:5432/easylegal?schema=public"
DIRECT_URL="postgresql://easylegal:password@db:5432/easylegal?schema=public"

# JWT
JWT_SECRET="<generate-strong-random-secret>"

# EMAIL (tetap pakai Hostinger SMTP)
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT=465
SMTP_USER="newsletter@easylegal.id"
SMTP_PASS="<password-email>"
SMTP_FROM='"Easy Legal" <newsletter@easylegal.id>'

# APP URL
NEXT_PUBLIC_APP_URL="https://easylegal.id"
```

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

### 5. Setup SSL dengan Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot -y

# Stop nginx sementara
docker compose stop nginx

# Generate certificate
sudo certbot certonly --standalone -d easylegal.id -d www.easylegal.id

# Copy certs ke project
mkdir -p nginx/certs
sudo cp /etc/letsencrypt/live/easylegal.id/fullchain.pem nginx/certs/
sudo cp /etc/letsencrypt/live/easylegal.id/privkey.pem nginx/certs/

# Restart nginx
docker compose start nginx

# Setup auto-renewal (cron)
echo "0 12 * * * cd /opt/easylegal/websiteel-app && sudo certbot renew --quiet && sudo cp /etc/letsencrypt/live/easylegal.id/fullchain.pem nginx/certs/ && sudo cp /etc/letsencrypt/live/easylegal.id/privkey.pem nginx/certs/ && docker compose restart nginx" | sudo crontab -
```

### 6. Seed Database

```bash
# Jalankan seed untuk buat admin pertama
docker compose exec app npx prisma db seed
```

Default admin: `admin@easylegal.id` / `admin123`

## Update Project (Saat Ada Perubahan)

### Di Lokal (Development)
```bash
# 1. Develop fitur baru
# 2. Commit
git add .
git commit -m "feat: tambah halaman baru"

# 3. Push
git push origin main
```

### Di VPS (Deployment)
```bash
cd /opt/easylegal/websiteel-app

# 1. Pull code terbaru
git pull origin main

# 2. Build ulang & restart
docker compose build --no-cache
docker compose up -d

# Done. Website updated.
```

### Yang terjadi di balik layar:
```
git pull → docker compose build → rebuild image Next.js
        → docker compose up -d → restart container
        → prisma migrate deploy (otomatis jalan saat build)
```

## Perintah Umum

| Aksi | Command |
|------|---------|
| **Update code** | `git pull && docker compose build --no-cache && docker compose up -d` |
| **Restart saja** | `docker compose restart` |
| **Lihat log app** | `docker compose logs -f app` |
| **Lihat log semua** | `docker compose logs -f` |
| **Stop semua** | `docker compose down` |
| **Start semua** | `docker compose up -d` |
| **Masuk ke container** | `docker compose exec app sh` |
| **Jalankan prisma** | `docker compose exec app npx prisma <command>` |

## Backup & Restore Database

### Backup
```bash
# Manual backup
docker compose exec db pg_dump -U postgres easylegal > backup_$(date +%Y%m%d).sql

# Backup ke file dengan timestamp
docker compose exec db pg_dump -U postgres easylegal | gzip > backup_$(date +%Y%m%d_%H%M%S).sql.gz
```

### Restore
```bash
# Restore dari backup
docker compose exec -T db psql -U postgres easylegal < backup_20260528.sql

# Restore dari compressed backup
docker compose exec -T db psql -U postgres easylegal < backup_20260528_120000.sql.gz
```

### Auto Backup (Cron)
```bash
# Backup harian jam 2 malam
echo "0 2 * * * cd /opt/easylegal/websiteel-app && docker compose exec -T db pg_dump -U postgres easylegal | gzip > /opt/backups/easylegal_\$(date +\%Y\%m\%d).sql.gz" | crontab -
```

## Troubleshooting

### Website tidak bisa diakses
```bash
# Cek container status
docker compose ps

# Cek log
docker compose logs app
docker compose logs nginx

# Cek apakah port terbuka
sudo ufw status
sudo netstat -tlnp | grep -E '(80|443|3000)'
```

### Database connection error
```bash
# Cek apakah DB running
docker compose ps db

# Test connection
docker compose exec db psql -U postgres -d easylegal -c "SELECT 1;"

# Lihat log DB
docker compose logs db
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
# Cek volume permissions
docker compose exec app ls -la /app/public/uploads/

# Fix permissions
docker compose exec app chmod -R 755 /app/public/uploads/
```

### Out of memory
```bash
# Cek penggunaan RAM
docker stats

# Restart container jika perlu
docker compose restart app
```

## Catatan Penting

1. **Jangan commit `.env.production`** ke Git — sudah ada di `.gitignore`
2. **Backup database sebelum update besar**
3. **Prisma migrate otomatis jalan** saat `docker compose build` (karena build script = `prisma migrate deploy && next build`)
4. **File uploads tersimpan di volume Docker** — pastikan backup juga
5. **JWT_SECRET harus berbeda** antara development dan production
