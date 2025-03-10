import React, { useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const defaultProfileImage = require("../assets/placeholder.png");

const EmployeeDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { employeeData } = route.params || {}; // ✅ Get employee data from route params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Logout" onPress={handleLogout} color="red" />,
    });
  }, [navigation]);

  const handleLogout = () => {
    Alert.alert("Logout", "Confirm Logout?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => navigation.reset({ index: 0, routes: [{ name: "Login" }] }) },
    ]);
  };

  if (!employeeData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: No Employee Data Available</Text>
      </View>
    );
  }

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
      <View style={styles.detailsContainer}>
        <View style={styles.row}><Text style={styles.label}>employeeId:</Text><Text style={styles.value}>{employeeData.employeeId}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Full Name:</Text><Text style={styles.value}>{employeeData.FullName}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Age:</Text><Text style={styles.value}>{employeeData.age}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Gender:</Text><Text style={styles.value}>{employeeData.gender}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Phone:</Text><Text style={styles.value}>{employeeData.phone}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Email:</Text><Text style={styles.value}>{employeeData.email}</Text></View>
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
  errorText: { fontSize: 18, color: "red", marginTop: 20 },
});

export default EmployeeDetailsScreen;
