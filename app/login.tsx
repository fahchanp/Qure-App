import HospitalStyles from "@/components/HospitalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView, Platform,
  ScrollView,
  Text, TextInput, TouchableOpacity
} from "react-native";

const NGROK_URL = "https://nonsyllogistically-tomfoolish-liana.ngrok-free.dev";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${NGROK_URL}/login`, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const json = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("userEmail", json.email);
        await AsyncStorage.setItem("userName", json.name);
        router.replace("/(nav)");
      } else {
        Alert.alert("Login Failed", json.error || "Invalid credentials.");
      }
    } catch (e) {
      Alert.alert("Error", `${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={HospitalStyles.authContainer}>
        
        <Text style={HospitalStyles.authTitle}>Welcome to Qure!</Text>
        <Text style={HospitalStyles.authSubtitle}>
          Book hospital queues near you
        </Text>

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
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[HospitalStyles.authButton, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={HospitalStyles.authButtonText}>
            {loading ? "Signing in..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={HospitalStyles.authLink}
          onPress={() => router.push("/register")}
        >
          <Text style={HospitalStyles.authLinkText}>
            Don't have an account?{" "}
            <Text style={HospitalStyles.authLinkBold}>Register</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}