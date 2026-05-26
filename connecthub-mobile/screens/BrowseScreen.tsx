import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Heart, MessageCircle, X, Search } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';

const sampleProfiles = [
  {
    id: 1,
    username: 'Alex Johnson',
    age: 26,
    location: 'New York, USA',
    bio: 'Adventure enthusiast and coffee lover',
    interests: ['Travel', 'Hiking', 'Photography'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
  },
  {
    id: 2,
    username: 'Sarah Chen',
    age: 24,
    location: 'San Francisco, USA',
    bio: 'Artist and yoga enthusiast',
    interests: ['Art', 'Yoga', 'Music'],
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
  },
  {
    id: 3,
    username: 'Marcus Williams',
    age: 28,
    location: 'Los Angeles, USA',
    bio: 'Tech enthusiast and foodie',
    interests: ['Gaming', 'Tech', 'Food'],
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
  },
  {
    id: 4,
    username: 'Emma Davis',
    age: 25,
    location: 'Austin, USA',
    bio: 'Book lover and nature enthusiast',
    interests: ['Books', 'Nature', 'Hiking'],
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
  },
];

const BrowseScreen = ({ navigation }) => {
  const { currentUser } = useContext(AppContext);
  const [profiles, setProfiles] = useState([]);
  const [likes, setLikes] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const savedLikes = await AsyncStorage.getItem('likes');
      if (savedLikes) {
        setLikes(JSON.parse(savedLikes));
      }
      setProfiles(sampleProfiles);
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
  };

  const handleLike = async (profileId) => {
    const newLike = {
      fromId: currentUser.id,
      toId: profileId,
      timestamp: Date.now(),
    };

    const updatedLikes = [...likes, newLike];
    setLikes(updatedLikes);
    await AsyncStorage.setItem('likes', JSON.stringify(updatedLikes));
  };

  const handlePass = () => {
    if (profiles.length > 0) {
      const remaining = profiles.slice(1);
      setProfiles(remaining);
    }
  };

  const filteredProfiles = profiles.filter((profile) => {
    const searchLower = searchText.toLowerCase();
    return profile.interests.some((interest) =>
      interest.toLowerCase().includes(searchLower)
    );
  });

  if (filteredProfiles.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Filter by interests..."
            placeholderTextColor="#9ca3af"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No profiles to show</Text>
          <TouchableOpacity
            onPress={loadProfiles}
            style={styles.reloadButton}
          >
            <Text style={styles.reloadButtonText}>Reload</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const currentProfile = filteredProfiles[0];

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Search size={20} color="#9ca3af" />
        <TextInput
          style={styles.searchInput}
          placeholder="Filter by interests..."
          placeholderTextColor="#9ca3af"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <Image
            source={{ uri: currentProfile.photo }}
            style={styles.profileImage}
          />

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {currentProfile.username}, {currentProfile.age}
            </Text>
            <Text style={styles.profileLocation}>
              📍 {currentProfile.location}
            </Text>
            <Text style={styles.profileBio}>{currentProfile.bio}</Text>

            <View style={styles.interestsContainer}>
              {currentProfile.interests.map((interest, index) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.passButton}
          onPress={handlePass}
        >
          <X size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => {
            handleLike(currentProfile.id);
            handlePass();
          }}
        >
          <Heart size={24} color="white" fill="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.messageButton}
          onPress={() => navigation?.navigate('Messages')}
        >
          <MessageCircle size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    margin: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#1f2937',
    fontSize: 14,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: '100%',
    height: 400,
    backgroundColor: '#e5e7eb',
  },
  profileInfo: {
    padding: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 12,
  },
  profileBio: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 16,
    lineHeight: 20,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#f0f4ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  interestText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  passButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 16,
  },
  reloadButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  reloadButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default BrowseScreen;
