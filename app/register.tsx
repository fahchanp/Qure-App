import HospitalStyles from '@/components/HospitalStyles';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView, Platform,
  ScrollView,
  Text, TextInput, TouchableOpacity
} from 'react-native';

const NGROK_URL = 'https://nonsyllogistically-tomfoolish-liana.ngrok-free.dev';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${NGROK_URL}/register`, {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account created! Please sign in.', [
          { text: 'OK', onPress: () => router.replace('/login') },
        ]);
      } else {
        Alert.alert('Error', json.error || 'Registration failed.');
      }
    } catch (e) {
      Alert.alert('Error', 'Network error. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={HospitalStyles.authContainer}>

        <Text style={HospitalStyles.authTitle}>Create Account</Text>
        <Text style={HospitalStyles.authSubtitle}>
          Join Qure to book queues easily
        </Text>

        <TextInput
          style={HospitalStyles.authInput}
          placeholder="Full name"
          placeholderTextColor="#94a3b8"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={HospitalStyles.authInput}
          placeholder="Email address"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={HospitalStyles.authInput}
          placeholder="Password (min 6 characters)"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[
            HospitalStyles.authButton,
            loading && { opacity: 0.7 },
          ]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={HospitalStyles.authButtonText}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={HospitalStyles.authLink}
          onPress={() => router.replace('/login')}
        >
          <Text style={HospitalStyles.authLinkText}>
            Already have an account?{' '}
            <Text style={HospitalStyles.authLinkBold}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
