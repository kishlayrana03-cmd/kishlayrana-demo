# 📱 ConnectHub Mobile App

A modern React Native + Expo mobile application for iOS and Android that helps you meet new people and make meaningful connections.

## 🌟 Quick Start

### 1. Navigate to the mobile app folder
```bash
cd connecthub-mobile
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the app
```bash
npm start
```

### 4. Run on your device
- **iOS:** `npm run ios`
- **Android:** `npm run android`
- **Web:** `npm run web`

Or use Expo Go app on your phone to scan the QR code!

## 📋 Features

- 👤 Create your profile with photo, bio, and interests
- ❤️ Browse and like profiles
- 💕 View people who liked you back (matches)
- 💬 Real-time messaging with matches
- 🔍 Filter profiles by interests
- 📊 View your stats
- 🎯 Personalized matching system

## 🏗️ Project Structure

```
connecthub-mobile/
├── App.tsx              # Main application entry
├── app.json            # Expo configuration
├── package.json        # Dependencies
├── screens/            # Screen components
│   ├── AuthScreen.tsx
│   ├── HomeScreen.tsx
│   ├── BrowseScreen.tsx
│   ├── MatchesScreen.tsx
│   ├── MessagesScreen.tsx
│   ├── ChatScreen.tsx
│   └── ProfileScreen.tsx
├── context/            # Global state
│   └── AppContext.ts
└── SETUP_GUIDE.md      # Detailed setup instructions
```

## 🚀 Development

### Available Commands

```bash
npm start       # Start dev server
npm run ios     # Run on iOS simulator
npm run android # Run on Android emulator
npm run web     # Run in web browser
npm run eject   # Eject from Expo (permanent)
```

### Requirements

- Node.js 16+
- npm or yarn
- iOS Simulator or Android Emulator (optional)
- Expo Go app on physical device (optional)

## 🎨 Technologies

- **React Native** - Cross-platform UI
- **Expo** - Development platform
- **React Navigation** - Screen routing
- **AsyncStorage** - Local data persistence
- **TypeScript** - Type safety
- **Lucide Icons** - Beautiful icons

## 💾 Data

- All data stored locally on device
- No external servers needed
- Complete privacy guaranteed
- Data persists between sessions

## 📚 For Detailed Setup Instructions

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for:
- Complete installation instructions
- Troubleshooting tips
- Building for production
- Customization options

## 🎯 Next Steps

1. Run `npm install` to install dependencies
2. Run `npm start` to start development server
3. Use Expo Go app or emulator to run the app
4. Create your profile and start connecting!

## 📞 Support

For help with:
- React Native: [https://reactnative.dev](https://reactnative.dev)
- Expo: [https://docs.expo.dev](https://docs.expo.dev)
- React Navigation: [https://reactnavigation.org](https://reactnavigation.org)

---

**Happy connecting! 💕**
