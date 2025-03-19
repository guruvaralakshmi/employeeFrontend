import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper"; // Import Material Design Components

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("https://employeebackend-5qt6.onrender.com/api/employees/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (response.ok) {
        await AsyncStorage.setItem("authToken", data.token);
        await AsyncStorage.setItem("employeeData", JSON.stringify(data.employee));

        Alert.alert("Success", "Login successful!", [
          {
            text: "OK",
            onPress: () => navigation.replace("Menu"),
          },
        ]);
      } else {
        Alert.alert("Error", data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Network error. Check server and internet connection.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        {/* Email Input */}
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          left={<TextInput.Icon icon="email" />}
          style={styles.input}
        />

        {/* Password Input */}
        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          style={styles.input}
        />

        {/* Login Button */}
        <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
          Login
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20, backgroundColor: "#F5F5F5" },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { marginBottom: 15 },
  loginButton: { marginTop: 10, backgroundColor: "#007BFF" },
});

export default LoginScreen;
