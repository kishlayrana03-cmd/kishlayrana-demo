import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Heart, MessageCircle, Users } from 'lucide-react-native';

const HomeScreen = ({ navigation, authContext }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Heart size={60} color="#667eea" fill="#667eea" />
        <Text style={styles.heroTitle}>Welcome to ConnectHub</Text>
        <Text style={styles.heroSubtitle}>
          Meet amazing people and make meaningful connections
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionCard, styles.browseCard]}
          onPress={() => navigation?.navigate('Browse')}
        >
          <Heart size={32} color="#667eea" fill="#667eea" />
          <Text style={styles.actionTitle}>Browse Profiles</Text>
          <Text style={styles.actionDesc}>Discover amazing people</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, styles.matchesCard]}
          onPress={() => navigation?.navigate('Matches')}
        >
          <Users size={32} color="#ec4899" />
          <Text style={styles.actionTitle}>Your Matches</Text>
          <Text style={styles.actionDesc}>See who likes you</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, styles.messagesCard]}
          onPress={() => navigation?.navigate('Messages')}
        >
          <MessageCircle size={32} color="#10b981" />
          <Text style={styles.actionTitle}>Messages</Text>
          <Text style={styles.actionDesc}>Chat with matches</Text>
        </TouchableOpacity>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why ConnectHub?</Text>

        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Heart size={24} color="#667eea" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Find Your Match</Text>
            <Text style={styles.featureDesc}>
              Discover people with similar interests
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <MessageCircle size={24} color="#667eea" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Connect & Chat</Text>
            <Text style={styles.featureDesc}>
              Message people you're interested in
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Users size={24} color="#667eea" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Build Community</Text>
            <Text style={styles.featureDesc}>
              Make genuine connections and friendships
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Ready to connect? Start by browsing profiles!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  hero: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#667eea',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 8,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: -20,
  },
  actionCard: {
    width: '48%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  browseCard: {
    backgroundColor: 'white',
  },
  matchesCard: {
    backgroundColor: 'white',
  },
  messagesCard: {
    backgroundColor: 'white',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 12,
    textAlign: 'center',
  },
  actionDesc: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
    textAlign: 'center',
  },
  featuresSection: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  featureDesc: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export default HomeScreen;
