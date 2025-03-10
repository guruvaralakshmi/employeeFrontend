// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
// import axios from "axios";
// import { useNavigation } from "@react-navigation/native";

// const WelcomeScreen = () => {
//   const [employeeId, setEmployeeId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigation = useNavigation();

//   const fetchEmployeeDetails = async () => {
//     if (!employeeId) {
//       setError("Please enter Employee ID");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.get(`https://employeebackend-5qt6.onrender.com/api/employees/${employeeId}`);
//       navigation.navigate("EmployeeDetails", { employeeData: response.data });
//     } catch (err) {
//       setError("Employee not found. Please check the ID.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome!</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Employee ID"
//         keyboardType="numeric"
//         value={employeeId}
//         onChangeText={setEmployeeId}
//       />
//       <Button title="Submit" onPress={fetchEmployeeDetails} />
//       {loading && <ActivityIndicator size="large" color="blue" style={styles.loader} />}
//       {error ? <Text style={styles.error}>{error}</Text> : null}
//     </View>
//   );
// };

// export default WelcomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f4f4f4",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "80%",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//   },
//   error: {
//     color: "red",
//     marginTop: 10,
//   },
//   loader: {
//     marginTop: 10,
//   },
// });
