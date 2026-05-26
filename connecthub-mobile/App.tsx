import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Heart, MessageCircle, User, Home, LogOut } from 'lucide-react-native';

import HomeScreen from './screens/HomeScreen';
import BrowseScreen from './screens/BrowseScreen';
import MatchesScreen from './screens/MatchesScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthScreen from './screens/AuthScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileDetailScreen from './screens/ProfileDetailScreen';

import { AppContext } from './context/AppContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const user = await AsyncStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    } catch (e) {
      console.error('Failed to restore user:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const authContext = {
    signIn: async (userData) => {
      await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
      setCurrentUser(userData);
    },
    signUp: async (userData) => {
      const newUser = {
        id: Date.now(),
        ...userData,
        interests: userData.interests.split(',').map(i => i.trim()),
      };
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
      setCurrentUser(newUser);
    },
    signOut: async () => {
      await AsyncStorage.removeItem('currentUser');
      setCurrentUser(null);
    },
  };

  if (isLoading) {
    return null;
  }

  const AppStackNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          if (route.name === 'Home') {
            icon = <Home size={size} color={color} />;
          } else if (route.name === 'Browse') {
            icon = <Heart size={size} color={color} />;
          } else if (route.name === 'Matches') {
            icon = <User size={size} color={color} />;
          } else if (route.name === 'Messages') {
            icon = <MessageCircle size={size} color={color} />;
          } else if (route.name === 'Profile') {
            icon = <User size={size} color={color} />;
          }
          return icon;
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#667eea',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ title: 'ConnectHub' }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Home');
          },
        })}
      >
        {() => <HomeScreen authContext={authContext} />}
      </Tab.Screen>
      <Tab.Screen
        name="Browse"
        component={BrowseScreen}
        options={{ title: 'Browse Profiles' }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{ title: 'Your Matches' }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ title: 'Messages' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'My Profile' }}
      />
    </Tab.Navigator>
  );

  const AuthStackNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Auth"
        options={{ animationEnabled: false }}
      >
        {() => <AuthScreen authContext={authContext} />}
      </Stack.Screen>
    </Stack.Navigator>
  );

  return (
    <AppContext.Provider value={{ currentUser, authContext }}>
      <NavigationContainer>
        {currentUser ? <AppStackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </AppContext.Provider>
  );
}
