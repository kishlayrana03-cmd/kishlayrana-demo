import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MessageCircle, Heart } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';

const sampleProfiles = [
  {
    id: 1,
    username: 'Alex Johnson',
    age: 26,
    location: 'New York, USA',
    interests: ['Travel', 'Hiking', 'Photography'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
  },
  {
    id: 2,
    username: 'Sarah Chen',
    age: 24,
    location: 'San Francisco, USA',
    interests: ['Art', 'Yoga', 'Music'],
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
  },
];

const MatchesScreen = ({ navigation }) => {
  const { currentUser } = useContext(AppContext);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const savedMatches = await AsyncStorage.getItem('matches');
      if (savedMatches) {
        setMatches(JSON.parse(savedMatches));
      } else {
        setMatches(sampleProfiles);
      }
    } catch (error) {
      console.error('Error loading matches:', error);
    }
  };

  const renderMatchCard = ({ item }) => (
    <View style={styles.matchCard}>
      <Image source={{ uri: item.photo }} style={styles.matchImage} />
      <View style={styles.matchInfo}>
        <Text style={styles.matchName}>{item.username}</Text>
        <Text style={styles.matchLocation}>📍 {item.location}</Text>

        <View style={styles.interestsContainer}>
          {item.interests.slice(0, 3).map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.messageButton}
          onPress={() => navigation?.navigate('Messages')}
        >
          <MessageCircle size={18} color="white" />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (matches.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Heart size={48} color="#667eea" />
        <Text style={styles.emptyText}>No matches yet</Text>
        <Text style={styles.emptySubtext}>
          Browse profiles and find people you like!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={matches}
        renderItem={renderMatchCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  listContent: {
    padding: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  matchCard: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  matchImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#e5e7eb',
  },
  matchInfo: {
    padding: 12,
  },
  matchName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  matchLocation: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8,
  },
  interestsContainer: {
    marginBottom: 12,
  },
  interestTag: {
    backgroundColor: '#f0f4ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  interestText: {
    fontSize: 11,
    color: '#667eea',
    fontWeight: '500',
  },
  messageButton: {
    flexDirection: 'row',
    backgroundColor: '#667eea',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
  },
});

export default MatchesScreen;
