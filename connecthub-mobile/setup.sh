#!/bin/bash

# ConnectHub Mobile App - Quick Start Script
# This script helps you get started quickly

echo "🚀 ConnectHub Mobile App Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the connecthub-mobile folder"
    echo "Command: cd connecthub-mobile && bash setup.sh"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Installation failed"
    exit 1
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm start"
echo "2. Choose your platform:"
echo "   - Press 'i' for iOS"
echo "   - Press 'a' for Android"
echo "   - Press 'w' for Web"
echo "   - Or scan the QR code with Expo Go"
echo ""
echo "Happy coding! 🎉"
