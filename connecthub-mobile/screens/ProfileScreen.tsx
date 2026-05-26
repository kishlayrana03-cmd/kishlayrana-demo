import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LogOut, Heart, MessageCircle } from 'lucide-react-native';
import { AppContext } from '../context/AppContext';

const ProfileScreen = ({ navigation }) => {
  const { currentUser, authContext } = useContext(AppContext);

  const handleLogout = async () => {
    await authContext.signOut();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: currentUser?.photo || 'https://via.placeholder.com/120' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {currentUser?.username}, {currentUser?.age}
        </Text>
        <Text style={styles.location}>📍 {currentUser?.location}</Text>
      </View>

      <View style={styles.bioSection}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bioText}>{currentUser?.bio}</Text>
      </View>

      <View style={styles.interestsSection}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interestsContainer}>
          {currentUser?.interests?.map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Heart size={24} color="#667eea" />
          <Text style={styles.statValue}>42</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
        <View style={styles.statCard}>
          <MessageCircle size={24} color="#667eea" />
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Matches</Text>
        </View>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <Text style={styles.contactText}>Email: {currentUser?.email}</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <LogOut size={20} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#667eea',
    paddingVertical: 30,
    alignItems: 'center',
    paddingTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  location: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 8,
  },
  bioSection: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
  },
  interestsSection: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 12,
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
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    marginHorizontal: 12,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  contactSection: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#4b5563',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#ef4444',
    marginVertical: 20,
    marginHorizontal: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    height: 20,
  },
});

export default ProfileScreen;
