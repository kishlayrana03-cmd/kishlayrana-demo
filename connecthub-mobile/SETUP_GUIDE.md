# ConnectHub Mobile App - React Native + Expo

A modern mobile app built with React Native and Expo that helps people meet and connect with unknown people who share similar interests.

## 📱 Features

### Core Features
- ✅ User Authentication & Profile Creation
- ✅ Browse Profiles with Swiping Interface
- ✅ Like & Match System
- ✅ Real-time Messaging
- ✅ Personal Profile Management
- ✅ Interest-based Filtering
- ✅ Match Discovery
- ✅ Conversation History

### Technology Stack
- **React Native** - Cross-platform mobile framework
- **Expo** - Easy development and deployment
- **React Navigation** - Navigation and routing
- **AsyncStorage** - Local data persistence
- **TypeScript** - Type-safe development
- **Lucide React Native** - Beautiful icons

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- A smartphone or emulator

### Step 1: Install Dependencies

```bash
cd connecthub-mobile
npm install
# or
yarn install
```

### Step 2: Install Expo CLI Globally (Optional)

```bash
npm install -g expo-cli
```

### Step 3: Start the Development Server

```bash
npm start
# or
expo start
```

### Step 4: Run on Device or Emulator

**On iOS:**
```bash
npm run ios
```

**On Android:**
```bash
npm run android
```

**On Web (for testing):**
```bash
npm run web
```

**Using Expo Go App:**
- Download "Expo Go" from App Store or Google Play
- Scan the QR code shown in the terminal
- App will load on your device

## 📁 Project Structure

```
connecthub-mobile/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── context/
│   └── AppContext.ts      # Global app state
├── screens/
│   ├── AuthScreen.tsx     # Sign up / Sign in
│   ├── HomeScreen.tsx     # Home page
│   ├── BrowseScreen.tsx   # Profile browsing
│   ├── MatchesScreen.tsx  # View matches
│   ├── MessagesScreen.tsx # Conversations list
│   ├── ChatScreen.tsx     # Chat interface
│   ├── ProfileScreen.tsx  # User profile
│   └── ProfileDetailScreen.tsx
├── assets/               # Images and icons
└── README.md
```

## 🎯 How to Use the App

### 1. Create Your Profile
- Open the app
- Click "Create Profile" or "Sign Up"
- Fill in your information:
  - Username
  - Email
  - Age (18+)
  - Location
  - Bio
  - Interests (comma-separated)
  - Profile Photo URL

### 2. Browse Profiles
- Go to the "Browse" tab
- Swipe through profiles
- **Tap ❤️ (Like)** to like someone
- **Tap ❌ (Pass)** to skip
- **Tap 💬 (Message)** to start messaging

### 3. View Matches
- Go to the "Matches" tab
- See people who also liked you
- Tap "Message" to chat with them

### 4. Send Messages
- Go to the "Messages" tab
- Select a conversation
- Type and send messages
- Real-time messaging with matched users

### 5. Manage Your Profile
- Go to the "Profile" tab
- View your profile information
- See your stats (likes, matches)
- Logout when done

## 💾 Data Management

### Local Storage
- All data is stored locally on your device using AsyncStorage
- Your data is private and never sent to external servers
- Data persists between app sessions

### Data Stored
- User profile information
- Likes and matches
- Conversation messages
- User preferences

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm start

# Build for iOS
npm run ios

# Build for Android
npm run android

# Run on web
npm run web

# Eject from Expo (not recommended)
npm run eject
```

### Customize App

**Change App Name:**
Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name"
  }
}
```

**Change Colors:**
Edit theme colors in individual screen files or create a `theme.ts` file.

**Add More Profiles:**
Edit `screens/BrowseScreen.tsx` and add more profiles to `sampleProfiles` array.

## 📦 Building for Production

### Using Expo EAS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Manual Build

Refer to [React Native documentation](https://reactnative.dev/docs/getting-started) for manual build instructions.

## 🐛 Troubleshooting

### App Won't Start
```bash
# Clear cache and reinstall
npm install
expo start -c
```

### Styling Issues
- Make sure all required packages are installed
- Check that React Native StyleSheet is properly imported

### Messaging Not Working
- Check that AsyncStorage is properly configured
- Verify conversation data is being saved

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 📚 Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## 🔒 Privacy & Security

- All data is stored locally
- No external API calls
- No data tracking
- No ads
- Completely private

## 🎨 Customization Ideas

- Add profile photo upload
- Implement video chat
- Add location-based matching
- Create user ratings/reviews
- Add group chat rooms
- Implement push notifications
- Add advanced filtering options

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review React Native & Expo documentation
3. Check app logs: `expo logs`

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy connecting with new people! 🎉**
