import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const defaultProfileImage = require("../assets/placeholder.png");

const EmployeeDetailsScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [searchedEmployee, setSearchedEmployee] = useState(null);
  const [displayedEmployee, setDisplayedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const storedData = await AsyncStorage.getItem("employeeData");
      if (storedData) {
        setDisplayedEmployee(JSON.parse(storedData));
      } else {
        setDisplayedEmployee(null);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text style={styles.logout} onPress={handleLogout}>
          Logout
        </Text>
      ),
    });
  }, [navigation]);

  const handleSearch = async (text) => {
    setSearch(text);
    setDisplayedEmployee(null); // Hide previously stored employee details when searching

    if (text.trim() === "") {
      setSearchedEmployee(null);
      fetchEmployeeData(); // Reset when search is cleared
      return;
    }

    if (text.trim().length < 3) {
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://employeebackend-5qt6.onrender.com/api/employees/search/${encodeURIComponent(text.trim())}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      if (data && data.employeeId) {
        setSearchedEmployee(data); // Show only searched employee photo & ID
      } else {
        setSearchedEmployee(null);
      }
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };

  const handleSelectEmployee = () => {
    if (searchedEmployee) {
      setDisplayedEmployee(searchedEmployee);
      setSearch("");
      setSearchedEmployee(null);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Confirm Logout?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => navigation.reset({ index: 0, routes: [{ name: "Login" }] }) },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Employee..."
        value={search}
        onChangeText={handleSearch}
      />

      {/* Show only Photo & ID when searching */}
      {searchedEmployee && (
        <TouchableOpacity onPress={handleSelectEmployee} style={styles.card}>
          <Image
  source={
    searchedEmployee?.photo
      ? { uri: `https://employeebackend-5qt6.onrender.com/${searchedEmployee?.photo}`}
      : defaultProfileImage
  }
  onError={(error) => console.log("Image Load Error:", error.nativeEvent)}
  style={styles.image}
/>

          <Text style={styles.idLabel}>ID: {searchedEmployee.employeeId}</Text>
        </TouchableOpacity>
      )}

      {/* Show full details only when an employee is selected */}
      {displayedEmployee && (
        <>
          <View style={styles.card}>
          <Image
  source={
    displayedEmployee?.photo
      ? { uri: displayedEmployee?.photo.startsWith("http") 
          ? displayedEmployee.photo 
          : `https://employeebackend-5qt6.onrender.com/${displayedEmployee.photo}`
        }
      : defaultProfileImage
  }
  onError={(error) => console.log("Image Load Error:", error.nativeEvent)}
  style={styles.image}
/>



            <Text style={styles.idLabel}>ID: {displayedEmployee?.employeeId }</Text>
            <Text style={styles.idLabel}>FullName: {displayedEmployee?.FullName }</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.row}><Text style={styles.label}>Age:</Text><Text style={styles.value}>{displayedEmployee?.age || "N/A"}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Gender:</Text><Text style={styles.value}>{displayedEmployee?.gender || "N/A"}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Phone:</Text><Text style={styles.value}>{displayedEmployee?.phone || "N/A"}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Email:</Text><Text style={styles.value}>{displayedEmployee?.email || "N/A"}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Location:</Text><Text style={styles.value}>{displayedEmployee?.address || "N/A"}</Text></View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Employment Details</Text>
            <View style={styles.row}><Text style={styles.label}>Company Name:</Text><Text style={styles.value}>{displayedEmployee?.companyName || "N/A"}</Text></View>
  
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#F5F5F5" },
  searchBar: { height: 40, borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, backgroundColor: "#fff", marginBottom: 10 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center", marginBottom: 20 },
  image: { width: 100, height: 100, borderRadius: 50 },
  idLabel: { marginTop: 10, fontWeight: "bold", fontSize: 16 },
  infoCard: { backgroundColor: "#fff", padding: 20, borderRadius: 10, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, borderBottomWidth: 2,  borderBottomColor: "#000", paddingBottom: 3  },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  label: { fontWeight: "bold" },
  value: { flex: 1, textAlign: "left" },
  logout: { color: "red", fontSize: 16, marginRight: 10 },
});

export default EmployeeDetailsScreen;
