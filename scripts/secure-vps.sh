#!/bin/bash
# ==============================================================================
# EasyLegal VPS Security Hardening & Firewall Setup Script
# ==============================================================================
# Skrip ini dirancang untuk mengamankan VPS Ubuntu EasyLegal (157.10.252.77)
# secara interaktif dan aman (mencegah lockout secara maksimal).
#
# Penggunaan di VPS:
# 1. Pull code terbaru: git pull origin main
# 2. Jalankan skrip: bash scripts/secure-vps.sh
# ==============================================================================

# Definisikan warna untuk output terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

clear
echo -e "${CYAN}======================================================================${NC}"
echo -e "${CYAN}        EasyLegal VPS Security Hardening & Firewall Setup             ${NC}"
echo -e "${CYAN}======================================================================${NC}"
echo -e "Skrip ini akan memandu Anda untuk mengamankan SSH, Firewall (UFW), dan"
echo -e "mengaktifkan proteksi brute-force otomatis menggunakan Fail2ban."
echo -e "${CYAN}======================================================================${NC}"
echo ""

# Pastikan dijalankan sebagai root atau dengan sudo
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Error: Harap jalankan skrip ini menggunakan sudo atau sebagai root!${NC}"
  echo "Contoh: sudo bash scripts/secure-vps.sh"
  exit 1
fi

# ==============================================================================
# LANGKAH 1: Validasi Keberadaan SSH Key (SANGAT PENTING!)
# ==============================================================================
echo -e "${BLUE}[Langkah 1/5] Memeriksa Kunci SSH (SSH Key)...${NC}"

SSH_KEY_FOUND=false
USER_HOME_DIR=$HOME
# Cari file authorized_keys untuk user saat ini (root atau user sudo)
AUTH_KEYS_FILE="$USER_HOME_DIR/.ssh/authorized_keys"

if [ -f "$AUTH_KEYS_FILE" ] && [ -s "$AUTH_KEYS_FILE" ]; then
    echo -e "${GREEN}✓ Ditemukan kunci SSH terdaftar di: $AUTH_KEYS_FILE${NC}"
    echo -e "${GRAY}Pratinjau kunci:${NC}"
    head -n 2 "$AUTH_KEYS_FILE" | cut -c 1-70 | sed 's/$/.../'
    SSH_KEY_FOUND=true
else
    echo -e "${YELLOW}⚠ Peringatan: Tidak ada SSH Key terdaftar di ~/.ssh/authorized_keys!${NC}"
    echo -e "Jika Anda menonaktifkan password login sekarang, Anda akan TERKUNCI dari VPS."
    echo ""
    echo -e "Apakah Anda ingin:"
    echo -e "  1) Lanjutkan hardening tetapi ${GREEN}TETAP AKTIFKAN${NC} password login (Lebih aman dari lockout)"
    echo -e "  2) ${RED}NONAKTIFKAN${NC} password login (Hanya pilih ini jika Anda YAKIN sudah memiliki SSH Key)"
    echo -e "  3) Batalkan skrip untuk setup SSH Key terlebih dahulu"
    read -p "Pilihan Anda (1/2/3): " ssh_choice
    
    case $ssh_choice in
        1)
            echo -e "${YELLOW}→ Password login akan tetap DIAKTIFKAN untuk mencegah lockout.${NC}"
            DISABLE_PASSWORD=false
            ;;
        2)
            echo -e "${RED}→ Password login akan DINONAKTIFKAN. Pastikan SSH Key Anda sudah berfungsi!${NC}"
            DISABLE_PASSWORD=true
            ;;
        *)
            echo -e "${RED}Proses dibatalkan. Silakan setup SSH Key Anda terlebih dahulu.${NC}"
            echo -e "Cara generate di komputer lokal Anda (Windows PowerShell):"
            echo -e "  ${CYAN}ssh-keygen -t ed25519 -f ~\\.ssh\\easylegal_key${NC}"
            echo -e "Lalu salin isi file .pub ke ${CYAN}~/.ssh/authorized_keys${NC} di VPS ini."
            exit 1
            ;;
    esac
fi

if [ "$SSH_KEY_FOUND" = true ]; then
    read -p "Apakah Anda ingin menonaktifkan login menggunakan password biasa? (y/n) [Rekomendasi: y]: " disable_pwd_input
    if [[ "$disable_pwd_input" =~ ^[Yy]$ ]] || [ -z "$disable_pwd_input" ]; then
        DISABLE_PASSWORD=true
    else
        DISABLE_PASSWORD=false
    fi
fi

echo ""

# ==============================================================================
# LANGKAH 2: Konfigurasi Port SSH Baru
# ==============================================================================
echo -e "${BLUE}[Langkah 2/5] Konfigurasi Port SSH Baru...${NC}"
echo -e "Port default SSH (22) sangat rentan discan oleh bot jahat."
read -p "Masukkan port SSH baru yang diinginkan [Rekomendasi: 22022]: " CUSTOM_SSH_PORT
CUSTOM_SSH_PORT=${CUSTOM_SSH_PORT:-22022}

# Validasi nomor port
if ! [[ "$CUSTOM_SSH_PORT" =~ ^[0-9]+$ ]] || [ "$CUSTOM_SSH_PORT" -le 1024 ] || [ "$CUSTOM_SSH_PORT" -ge 65535 ]; then
    if [ "$CUSTOM_SSH_PORT" -eq 22 ]; then
        echo -e "${YELLOW}Menggunakan port default 22.${NC}"
    else
        echo -e "${RED}Port tidak valid! Harus berupa angka antara 1025 dan 65534.${NC}"
        CUSTOM_SSH_PORT=22022
        echo -e "${YELLOW}Menggunakan port rekomendasi: 22022${NC}"
    fi
fi

echo -e "Port SSH yang akan digunakan: ${GREEN}$CUSTOM_SSH_PORT${NC}"
echo ""

# ==============================================================================
# LANGKAH 3: Terapkan Hardening SSH ke /etc/ssh/sshd_config
# ==============================================================================
echo -e "${BLUE}[Langkah 3/5] Menerapkan Konfigurasi Keamanan SSH...${NC}"

# Backup konfigurasi sshd saat ini
SSHD_CONFIG="/etc/ssh/sshd_config"
BACKUP_SSHD_CONFIG="/etc/ssh/sshd_config.bak.$(date +%Y%m%d_%H%M%S)"
echo -e "Membuat backup konfigurasi di ${CYAN}$BACKUP_SSHD_CONFIG${NC}..."
cp "$SSHD_CONFIG" "$BACKUP_SSHD_CONFIG"

# Ubah konfigurasi menggunakan sed secara aman
# 1. Mengubah port
if grep -q "^#\?Port " "$SSHD_CONFIG"; then
    sed -i "s/^#\?Port .*/Port $CUSTOM_SSH_PORT/" "$SSHD_CONFIG"
else
    echo "Port $CUSTOM_SSH_PORT" >> "$SSHD_CONFIG"
fi

# 2. Konfigurasi PasswordAuthentication
if [ "$DISABLE_PASSWORD" = true ]; then
    echo -e "Menonaktifkan password login..."
    if grep -q "^#\?PasswordAuthentication " "$SSHD_CONFIG"; then
        sed -i "s/^#\?PasswordAuthentication .*/PasswordAuthentication no/" "$SSHD_CONFIG"
    else
        echo "PasswordAuthentication no" >> "$SSHD_CONFIG"
    fi
else
    echo -e "Mempertahankan password login untuk keamanan lockout..."
    if grep -q "^#\?PasswordAuthentication " "$SSHD_CONFIG"; then
        sed -i "s/^#\?PasswordAuthentication .*/PasswordAuthentication yes/" "$SSHD_CONFIG"
    else
        echo "PasswordAuthentication yes" >> "$SSHD_CONFIG"
    fi
fi

# 3. Mencegah login root tanpa key (prohibit-password)
if grep -q "^#\?PermitRootLogin " "$SSHD_CONFIG"; then
    sed -i "s/^#\?PermitRootLogin .*/PermitRootLogin prohibit-password/" "$SSHD_CONFIG"
else
    echo "PermitRootLogin prohibit-password" >> "$SSHD_CONFIG"
fi

# 4. Tambahan keamanan SSH modern
sed -i "s/^#\?PubkeyAuthentication .*/PubkeyAuthentication yes/" "$SSHD_CONFIG" 2>/dev/null || echo "PubkeyAuthentication yes" >> "$SSHD_CONFIG"
sed -i "s/^#\?X11Forwarding .*/X11Forwarding no/" "$SSHD_CONFIG" 2>/dev/null || echo "X11Forwarding no" >> "$SSHD_CONFIG"
sed -i "s/^#\?MaxAuthTries .*/MaxAuthTries 4/" "$SSHD_CONFIG" 2>/dev/null || echo "MaxAuthTries 4" >> "$SSHD_CONFIG"

# Validasi konfigurasi SSH sebelum merestart (SANGAT KRUSIAL!)
echo -e "Memvalidasi struktur file konfigurasi SSH..."
if sshd -t; then
    echo -e "${GREEN}✓ Konfigurasi SSH valid!${NC}"
else
    echo -e "${RED}✗ Konfigurasi SSH tidak valid! Mengembalikan file cadangan asli...${NC}"
    cp "$BACKUP_SSHD_CONFIG" "$SSHD_CONFIG"
    exit 1
fi

echo ""

# ==============================================================================
# LANGKAH 4: Konfigurasi Firewall Lokal VPS (UFW)
# ==============================================================================
echo -e "${BLUE}[Langkah 4/5] Mengonfigurasi UFW (Uncomplicated Firewall)...${NC}"

if ! command -v ufw &> /dev/null; then
    echo -e "Menginstal UFW..."
    apt-get install ufw -y
fi

echo -e "Mereset aturan default UFW..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing

# Izinkan port penting
echo -e "Membuka port aplikasi publik..."
ufw allow 80/tcp comment 'HTTP Nginx'
ufw allow 443/tcp comment 'HTTPS Nginx/SSL'

echo -e "Membuka port SSH lama dan baru (Demi Keamanan saat Uji Coba)..."
# Buka port custom baru
ufw allow $CUSTOM_SSH_PORT/tcp comment "SSH Custom Port"

# JANGAN tutup port 22 dulu di UFW internal agar sesi aktif saat ini tidak putus mendadak
if [ "$CUSTOM_SSH_PORT" -ne 22 ]; then
    ufw allow 22/tcp comment "SSH Default Port (Sementara)"
fi

echo -e "Mengaktifkan UFW..."
ufw --force enable

echo -e "${GREEN}✓ Firewall UFW berhasil aktif dan dikonfigurasi.${NC}"
ufw status verbose
echo ""

# ==============================================================================
# LANGKAH 5: Pemasangan & Konfigurasi Fail2ban
# ==============================================================================
echo -e "${BLUE}[Langkah 5/5] Memasang dan Mengonfigurasi Fail2ban...${NC}"

if ! command -v fail2ban-client &> /dev/null; then
    echo -e "Menginstal paket fail2ban..."
    apt-get update && apt-get install fail2ban -y
fi

# Tulis konfigurasi kustom jail.local
echo -e "Menulis file konfigurasi /etc/fail2ban/jail.local..."
cat <<EOF > /etc/fail2ban/jail.local
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 4
ignoreip = 127.0.0.1/8 ::1

[sshd]
enabled  = true
port     = $CUSTOM_SSH_PORT,22
filter   = sshd
logpath  = /var/log/auth.log
maxretry = 3
EOF

# Restart services
echo -e "Merestart layanan SSH dan Fail2ban..."
systemctl restart sshd || systemctl restart ssh
systemctl restart fail2ban

echo -e "${GREEN}✓ Fail2ban berhasil diaktifkan dengan aturan port kustom!${NC}"
fail2ban-client status sshd
echo ""

# ==============================================================================
# RANGKUMAN & PANDUAN PENCEGAHAN LOCKOUT (SANGAT PENTING!)
# ==============================================================================
echo -e "${YELLOW}======================================================================${NC}"
echo -e "${YELLOW}                PROSES HARDENING SELESAI DENGAN SUKSES!               ${NC}"
echo -e "${YELLOW}======================================================================${NC}"
echo -e "Namun, keamanan sejati belum selesai sebelum Anda memverifikasi koneksi."
echo -e ""
echo -e "${RED}WARNING / PERINGATAN PENTING:${NC}"
echo -e "JANGAN PERNAH menutup jendela terminal VPS ini sekarang."
echo -e "Ikuti panduan verifikasi ini terlebih dahulu:"
echo ""
echo -e "1. Buka jendela ${GREEN}Terminal/CMD Baru${NC} di komputer lokal Anda."
echo -e "2. Coba lakukan koneksi SSH menggunakan port baru Anda (${CYAN}$CUSTOM_SSH_PORT${NC}):"
if [ "$DISABLE_PASSWORD" = true ]; then
    echo -e "   Command: ${GREEN}ssh -p $CUSTOM_SSH_PORT -i <file-ssh-key-anda> root@157.10.252.77${NC}"
else
    echo -e "   Command: ${GREEN}ssh -p $CUSTOM_SSH_PORT root@157.10.252.77${NC}"
fi
echo ""
echo -e "3. Jika koneksi baru tersebut ${GREEN}BERHASIL MASUK${NC}:"
echo -e "   - Selamat! Konfigurasi aman dan berfungsi."
echo -e "   - Sekarang masuk ke ${BLUE}Panel IDCloudHost${NC} Anda."
echo -e "   - Tambah aturan Inbound baru: ${GREEN}SSH Baru | TCP | Port: $CUSTOM_SSH_PORT | Sources: All IP${NC}."
echo -e "   - Hapus aturan Inbound lama untuk port 22 di Panel IDCloudHost."
echo -e "   - Tutup port 22 di UFW VPS dengan perintah: ${CYAN}sudo ufw delete allow 22/tcp${NC}."
echo -e "   - Anda sekarang aman untuk menutup sesi aktif ini."
echo ""
echo -e "4. Jika koneksi baru tersebut ${RED}GAGAL/TIMED OUT${NC}:"
echo -e "   - ${YELLOW}JANGAN PANIK!${NC} Sesi aktif Anda saat ini masih terhubung."
echo -e "   - Kembalikan file backup asli dengan perintah:"
echo -e "     ${CYAN}sudo cp $BACKUP_SSHD_CONFIG /etc/ssh/sshd_config${NC}"
echo -e "     ${CYAN}sudo systemctl restart sshd${NC}"
echo -e "   - Laporkan kendala ini kepada saya."
echo -e "${YELLOW}======================================================================${NC}"
