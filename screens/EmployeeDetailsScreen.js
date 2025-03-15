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

const EmployeeDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [searchedEmployee, setSearchedEmployee] = useState(null);
  const [displayedEmployee, setDisplayedEmployee] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
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

    if (text.trim() === "") {
      setSearchedEmployee(null);
      setIsSearching(false);
      return;
    }

    if (text.trim().length < 3) {
      return; 
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://employeebackend-5qt6.onrender.com/api/employees/search/${encodeURIComponent(text.trim())}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      const data = await response.json();
      
      if (data && data.employeeId) {
        setSearchedEmployee(data);
        setIsSearching(true);
      } else {
        setSearchedEmployee(null);
        setIsSearching(false);
      }
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Confirm Logout?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => navigation.reset({ index: 0, routes: [{ name: "Login" }] }) },
    ]);
  };

  const handleSelectEmployee = () => {
    if (searchedEmployee) {
      setDisplayedEmployee(searchedEmployee);
      setSearch("");
      setSearchedEmployee(null);
      setIsSearching(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Employee..."
        value={search}
        onChangeText={handleSearch}
      />

      {/* Show searched employee's photo before selecting */}
      {isSearching && searchedEmployee ? (
        <TouchableOpacity onPress={handleSelectEmployee}>
        <Image
          source={
            searchedEmployee?.photo
              ? { uri: `https://employeebackend-5qt6.onrender.com/${searchedEmployee.photo.replace(/^\/?uploads\//, '')}`}
              : defaultProfileImage
          }
          style={styles.image}
          onError={() => console.log("Error loading searched employee image:", searchedEmployee?.photo)}
        />
      </TouchableOpacity>
      
      ) : (
        <>
          <Text style={styles.title}>Employee Details</Text>

          <Image
  source={
    displayedEmployee?.photo
      ? { uri: `https://employeebackend-5qt6.onrender.com/${displayedEmployee.photo.replace(/^\/?uploads\//, '')}`}
      : defaultProfileImage
  }
  style={styles.image}
  onError={() => console.log("Error loading displayed employee image:", displayedEmployee?.photo)}
/>





          <View style={styles.detailsContainer}>
            <View style={styles.row}><Text style={styles.label}>Employee ID:</Text><Text style={styles.value}>{displayedEmployee?.employeeId}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Full Name:</Text><Text style={styles.value}>{displayedEmployee?.fullname || displayedEmployee?.FullName}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Age:</Text><Text style={styles.value}>{displayedEmployee?.age}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Gender:</Text><Text style={styles.value}>{displayedEmployee?.gender}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Phone:</Text><Text style={styles.value}>{displayedEmployee?.phone}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Email:</Text><Text style={styles.value}>{displayedEmployee?.email}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Company:</Text><Text style={styles.value}>{displayedEmployee?.companyName}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Salary:</Text><Text style={styles.value}>${displayedEmployee?.salary}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Address:</Text><Text style={styles.value}>{displayedEmployee?.address}</Text></View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", padding: 30, backgroundColor: "#f4f4f4" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  searchBar: { height: 40, width: "90%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 },
  image: { width: 150, height: 150, borderRadius: 10, marginBottom: 20 },
  detailsContainer: { width: "80%", alignSelf: "center", paddingLeft: 60 },
  row: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: 8 },
  label: { fontWeight: "bold", width: 100, textAlign: "left", marginRight: 10 },
  value: { flex: 1, textAlign: "left" },
  errorText: { fontSize: 18, color: "red", marginTop: 20 },
  logout: { color: "red", fontSize: 16, marginRight: 10 },
});
export default EmployeeDetailsScreen;
