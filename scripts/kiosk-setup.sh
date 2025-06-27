#!/bin/bash

# AI Fashion Studio - Kiosk Setup Script for Linux/Mac
# Mengatur aplikasi untuk berjalan dalam mode kiosk

echo "========================================"
echo "  AI Fashion Studio - Kiosk Setup"
echo "========================================"
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}ERROR: Node.js tidak ditemukan!${NC}"
    echo "Silakan install Node.js terlebih dahulu dari https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}Node.js ditemukan:${NC} $(node --version)"

# Check if Chrome/Chromium is installed
CHROME_CMD=""
if command -v google-chrome &> /dev/null; then
    CHROME_CMD="google-chrome"
elif command -v chromium-browser &> /dev/null; then
    CHROME_CMD="chromium-browser"
elif command -v chromium &> /dev/null; then
    CHROME_CMD="chromium"
else
    echo -e "${YELLOW}WARNING: Chrome/Chromium tidak ditemukan${NC}"
    echo "Pastikan Chrome atau Chromium sudah terinstall untuk mode kiosk"
fi

echo
echo "Memulai setup kiosk mode..."
echo

# Set environment variables untuk kiosk
export KIOSK_MODE=true
export NODE_ENV=production
export NEXT_PUBLIC_ENABLE_MOCK_AI=true

# Build aplikasi untuk production
echo "Building aplikasi untuk production..."
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Build gagal!${NC}"
    exit 1
fi

echo
echo -e "${GREEN}Build berhasil!${NC}"
echo

# Start aplikasi di background
echo "Starting AI Fashion Studio..."
npm run start &
APP_PID=$!

# Wait for application to start
echo "Menunggu aplikasi siap..."
sleep 10

# Check if application is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo -e "${RED}ERROR: Aplikasi gagal start!${NC}"
    kill $APP_PID 2>/dev/null
    exit 1
fi

# Launch Chrome in kiosk mode
if [ ! -z "$CHROME_CMD" ]; then
    echo "Meluncurkan $CHROME_CMD dalam mode kiosk..."
    $CHROME_CMD \
        --kiosk \
        --disable-web-security \
        --disable-features=TranslateUI \
        --disable-ipc-flooding-protection \
        --disable-background-timer-throttling \
        --disable-backgrounding-occluded-windows \
        --disable-renderer-backgrounding \
        --disable-field-trial-config \
        --disable-back-forward-cache \
        --autoplay-policy=no-user-gesture-required \
        http://localhost:3000 &
    
    CHROME_PID=$!
else
    echo -e "${YELLOW}Chrome tidak ditemukan. Buka browser dan navigate ke http://localhost:3000${NC}"
fi

echo
echo "========================================"
echo -e "${GREEN}  Kiosk mode aktif!${NC}"
echo "  URL: http://localhost:3000"
echo "  Tekan Ctrl+C untuk menghentikan"
echo "========================================"
echo

# Function to cleanup on exit
cleanup() {
    echo
    echo "Menghentikan aplikasi..."
    kill $APP_PID 2>/dev/null
    if [ ! -z "$CHROME_PID" ]; then
        kill $CHROME_PID 2>/dev/null
    fi
    echo "Selesai."
    exit 0
}

# Trap Ctrl+C
trap cleanup INT

# Keep script running
while true; do
    sleep 30
    # Check if app is still running
    if ! kill -0 $APP_PID 2>/dev/null; then
        echo -e "${RED}Aplikasi berhenti secara tidak terduga!${NC}"
        break
    fi
done

cleanup 