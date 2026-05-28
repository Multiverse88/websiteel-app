#!/bin/bash
set -e

# ============================================
# EasyLegal VPS Setup Script
# Jalankan sekali saat pertama kali setup VPS
# Usage: bash scripts/deploy-setup.sh
# ============================================

echo "========================================="
echo " EasyLegal VPS Setup"
echo "========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Update system
echo -e "\n${YELLOW}[1/7] Updating system...${NC}"
sudo apt update && sudo apt upgrade -y

# 2. Install Docker
echo -e "\n${YELLOW}[2/7] Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh
    sudo usermod -aG docker $USER
    echo -e "${GREEN}Docker installed successfully${NC}"
else
    echo -e "${GREEN}Docker already installed${NC}"
fi

# 3. Install Docker Compose
echo -e "\n${YELLOW}[3/7] Checking Docker Compose...${NC}"
if docker compose version &> /dev/null; then
    echo -e "${GREEN}Docker Compose already available${NC}"
else
    echo -e "${RED}Docker Compose not found. Please install Docker Compose plugin.${NC}"
    exit 1
fi

# 4. Install Certbot
echo -e "\n${YELLOW}[4/7] Installing Certbot...${NC}"
sudo apt install certbot -y

# 5. Setup project directory
echo -e "\n${YELLOW}[5/7] Setting up project directory...${NC}"
sudo mkdir -p /opt/easylegal
sudo chown $USER:$USER /opt/easylegal

# 6. Configure firewall
echo -e "\n${YELLOW}[6/7] Configuring firewall...${NC}"
if command -v ufw &> /dev/null; then
    sudo ufw allow 22/tcp
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw --force enable
    echo -e "${GREEN}Firewall configured${NC}"
else
    echo -e "${YELLOW}UFW not installed. Install with: sudo apt install ufw${NC}"
fi

# 7. Create backup directory
echo -e "\n${YELLOW}[7/7] Creating backup directory...${NC}"
sudo mkdir -p /opt/backups
sudo chown $USER:$USER /opt/backups

echo -e "\n========================================="
echo -e "${GREEN}Setup complete!${NC}"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Clone project: cd /opt/easylegal && git clone <repo-url> ."
echo "2. cd websiteel-app"
echo "3. Copy .env.example to .env.production and fill in values"
echo "4. Run: bash scripts/deploy.sh"
echo ""
