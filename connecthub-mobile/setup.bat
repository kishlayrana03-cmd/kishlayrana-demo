@echo off
REM ConnectHub Mobile App - Quick Start Script for Windows

echo 🚀 ConnectHub Mobile App Setup
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo ✓ Node.js version:
node --version
echo ✓ npm version:
npm --version
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Please run this script from the connecthub-mobile folder
    echo Command: cd connecthub-mobile ^&^& setup.bat
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Installation failed
    pause
    exit /b 1
)

echo.
echo ✅ Installation complete!
echo.
echo Next steps:
echo 1. Run: npm start
echo 2. Choose your platform:
echo    - Press 'i' for iOS
echo    - Press 'a' for Android
echo    - Press 'w' for Web
echo    - Or scan the QR code with Expo Go
echo.
echo Happy coding! 🎉
echo.
pause
