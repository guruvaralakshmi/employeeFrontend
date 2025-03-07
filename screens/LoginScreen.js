import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
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
  
      const textResponse = await response.text();
      console.log("Raw Response:", textResponse);
  
      try {
        const data = JSON.parse(textResponse);
        if (response.ok) {
          Alert.alert("Success", "Login successful!", [
            { text: "OK", onPress: () => navigation.navigate("Welcome") },
          ]);
        } else {
          Alert.alert("Error", data.message || "Invalid email or password.");
        }
      } catch (jsonError) {
        console.error("JSON Parsing Error:", jsonError);
        Alert.alert("Error", "Invalid response from server.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Network error. Check server and internet connection.");
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        keyboardType="email-address"
        onChangeText={(text) => setemail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  switchText: { textAlign: "center", marginTop: 10, color: "blue" },
});

export default LoginScreen;
