import React, { useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const defaultProfileImage = require("../assets/placeholder.png");

const EmployeeDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { employeeData } = route.params; 

  // Set Logout Button in Header 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Logout" onPress={handleLogout} color="red" />
      ),
    });
  }, [navigation]);

  // Logout Function with Alert Popup
  const handleLogout = () => {
    Alert.alert("Logout", "Logout successfully!", [
      { text: "OK", onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }], // Navigate back to Login and reset history
          });
        }
      }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Employee Details</Text>

      <Image 
        source={employeeData.photo 
          ? { uri: `https://employeebackend-5qt6.onrender.com/${employeeData.photo}` } 
          : defaultProfileImage
        } 
        style={styles.image} 
      />

      {/* Centered details block */}
      <View style={styles.detailsContainer}>
        <View style={styles.row}><Text style={styles.label}>Full Name:</Text><Text style={styles.value}>{employeeData.FullName}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Age:</Text><Text style={styles.value}>{employeeData.age}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Gender:</Text><Text style={styles.value}>{employeeData.gender}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Phone:</Text><Text style={styles.value}>{employeeData.phone}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Email:</Text><Text style={styles.value}>{employeeData.email}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Password:</Text><Text style={styles.value}>{employeeData.password}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Company:</Text><Text style={styles.value}>{employeeData.companyName}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Salary:</Text><Text style={styles.value}>{employeeData.salary}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Address:</Text><Text style={styles.value}>{employeeData.address}</Text></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", padding: 20, backgroundColor: "#f4f4f4" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  image: { width: 150, height: 150, borderRadius: 10, marginBottom: 20 },
  detailsContainer: { width: "80%", alignSelf: "center", paddingLeft: 70 },
  row: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: 8 },
  label: { fontWeight: "bold", width: 100, textAlign: "left", marginRight: 10 },
  value: { flex: 1, textAlign: "left" },
});

export default EmployeeDetailsScreen;
