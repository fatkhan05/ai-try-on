@echo off
REM AI Fashion Studio - Kiosk Setup Script for Windows
REM Mengatur aplikasi untuk berjalan dalam mode kiosk

echo ========================================
echo   AI Fashion Studio - Kiosk Setup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js tidak ditemukan!
    echo Silakan install Node.js terlebih dahulu dari https://nodejs.org
    pause
    exit /b 1
)

echo Node.js ditemukan: 
node --version

REM Check if Chrome is installed
where chrome >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Google Chrome tidak ditemukan di PATH
    echo Pastikan Chrome sudah terinstall untuk mode kiosk
)

echo.
echo Memulai setup kiosk mode...
echo.

REM Set environment variables untuk kiosk
set KIOSK_MODE=true
set NODE_ENV=production
set NEXT_PUBLIC_ENABLE_MOCK_AI=true

REM Build aplikasi untuk production
echo Building aplikasi untuk production...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build gagal!
    pause
    exit /b 1
)

echo.
echo Build berhasil!
echo.

REM Start aplikasi
echo Starting AI Fashion Studio...
start /B npm run start

REM Wait for application to start
echo Menunggu aplikasi siap...
timeout /t 10 /nobreak >nul

REM Launch Chrome in kiosk mode
echo Meluncurkan Chrome dalam mode kiosk...
start chrome --kiosk --disable-web-security --disable-features=TranslateUI --disable-ipc-flooding-protection --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-renderer-backgrounding --disable-field-trial-config --disable-back-forward-cache --disable-ipc-flooding-protection http://localhost:3000

echo.
echo ========================================
echo   Kiosk mode aktif!
echo   Tekan Ctrl+C untuk menghentikan
echo ========================================
echo.

REM Keep script running
:loop
timeout /t 30 /nobreak >nul
goto loop 