import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Heart } from 'lucide-react-native';

const AuthScreen = ({ authContext }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [photo, setPhoto] = useState('https://via.placeholder.com/200');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !age || !location || !bio || !interests) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await authContext.signUp({
        username,
        email,
        age: parseInt(age),
        location,
        bio,
        interests,
        photo,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter email');
      return;
    }

    setLoading(true);
    try {
      await authContext.signIn({
        email,
        username: 'User',
        id: Date.now(),
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Heart size={50} color="#667eea" fill="#667eea" />
          <Text style={styles.appName}>ConnectHub</Text>
          <Text style={styles.tagline}>Meet New People</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {isSignUp ? (
            <>
              <Text style={styles.title}>Create Your Profile</Text>

              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#9ca3af"
                value={username}
                onChangeText={setUsername}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                style={styles.input}
                placeholder="Age"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />

              <TextInput
                style={styles.input}
                placeholder="Location (City, Country)"
                placeholderTextColor="#9ca3af"
                value={location}
                onChangeText={setLocation}
              />

              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tell us about yourself"
                placeholderTextColor="#9ca3af"
                multiline={true}
                numberOfLines={4}
                value={bio}
                onChangeText={setBio}
              />

              <TextInput
                style={styles.input}
                placeholder="Interests (comma-separated)"
                placeholderTextColor="#9ca3af"
                value={interests}
                onChangeText={setInterests}
              />

              <TextInput
                style={styles.input}
                placeholder="Photo URL"
                placeholderTextColor="#9ca3af"
                value={photo}
                onChangeText={setPhoto}
              />

              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={handleSignUp}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Creating...' : 'Create Profile'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsSignUp(false)}>
                <Text style={styles.toggleText}>
                  Already have a profile? <Text style={styles.toggleLink}>Sign In</Text>
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Welcome Back</Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={handleSignIn}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsSignUp(true)}>
                <Text style={styles.toggleText}>
                  New to ConnectHub? <Text style={styles.toggleLink}>Create Profile</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 5,
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    borderRadius: 8,
    padding: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#667eea',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#6b7280',
  },
  toggleLink: {
    color: '#667eea',
    fontWeight: '600',
  },
});

export default AuthScreen;
