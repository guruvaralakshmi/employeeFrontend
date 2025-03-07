// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { useNavigation } from "@react-navigation/native";

// const RegistrationScreen = () => {
//   const [formData, setFormData] = useState({
//     FullName: "",
//     age: "",
//     gender: "",
//     phone: "",
//     EmailID: "",
//     password: "",
//     companyName: "",
//     salary: "",
//     address: "",
//     photo: null,
//   });

//   const [selectedPhoto, setSelectedPhoto] = useState(null);
//   const [photoConfirmed, setPhotoConfirmed] = useState(false);
//   const navigation = useNavigation();

//   // Image Picker Function
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 4],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedPhoto(result.assets[0].uri);
//       setPhotoConfirmed(false);
//     }
//   };

//   // Confirm selected photo
//   const handleConfirmPhoto = () => {
//     setFormData({ ...formData, photo: selectedPhoto });
//     setPhotoConfirmed(true);
//     Alert.alert("Success", "Photo selected successfully!");
//   };

//   // Handle Registration (Without API Call)
//   const handleRegister = () => {
//     const { FullName, age, gender, phone, EmailID, password, companyName, salary, address } = formData;

//     if (!FullName || !age || !gender || !phone || !EmailID || !password || !companyName || !salary || !address) {
//       Alert.alert("Error", "Please enter all details before registering.");
//       return;
//     }

//     if (!photoConfirmed) {
//       Alert.alert("Error", "Please confirm your photo selection.");
//       return;
//     }

//     Alert.alert("Success", "Registration successful ");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Register</Text>
//       <TextInput style={styles.input} placeholder="Full Name" onChangeText={(text) => setFormData({ ...formData, FullName: text })} />
//       <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" onChangeText={(text) => setFormData({ ...formData, age: text })} />
//       <TextInput style={styles.input} placeholder="Gender" onChangeText={(text) => setFormData({ ...formData, gender: text })} />
//       <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" onChangeText={(text) => setFormData({ ...formData, phone: text })} />
//       <TextInput style={styles.input} placeholder="Email ID" keyboardType="email-address" onChangeText={(text) => setFormData({ ...formData, EmailID: text })} />
//       <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(text) => setFormData({ ...formData, password: text })} />
//       <TextInput style={styles.input} placeholder="Company Name" onChangeText={(text) => setFormData({ ...formData, companyName: text })} />
//       <TextInput style={styles.input} placeholder="Salary" keyboardType="numeric" onChangeText={(text) => setFormData({ ...formData, salary: text })} />
//       <TextInput style={styles.input} placeholder="Address" onChangeText={(text) => setFormData({ ...formData, address: text })} />

//       {/* Image Picker */}
//       <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
//         <Text>{photoConfirmed ? "Change Photo" : "Select Photo"}</Text>
//       </TouchableOpacity>

//       {/* Show the selected photo before confirmation */}
//       {selectedPhoto && !photoConfirmed && (
//         <View style={styles.imageContainer}>
//           <Image source={{ uri: selectedPhoto }} style={styles.image} />
//           <View style={styles.buttonRow}>
//             <TouchableOpacity onPress={handleConfirmPhoto} style={styles.okButton}>
//               <Text style={styles.okButtonText}>OK</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={pickImage} style={styles.changeButton}>
//               <Text style={styles.changeButtonText}>Change</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       <Button title="Register" onPress={handleRegister} />

//       {/* Already have an account? Login */}
//       <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//         <Text style={styles.switchText}>Already have an account? Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: "center" },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
//   input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
//   imagePicker: { backgroundColor: "#ddd", padding: 10, alignItems: "center", marginBottom: 10 },
//   imageContainer: { alignItems: "center", marginTop: 10 },
//   image: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
//   buttonRow: { flexDirection: "row", gap: 10 },
//   okButton: { backgroundColor: "green", padding: 10, alignItems: "center", borderRadius: 5, width: 80 },
//   okButtonText: { color: "white", fontWeight: "bold" },
//   changeButton: { backgroundColor: "red", padding: 10, alignItems: "center", borderRadius: 5, width: 80 },
//   changeButtonText: { color: "white", fontWeight: "bold" },
//   switchText: { textAlign: "center", marginTop: 10, color: "blue" },
// });

// export default RegistrationScreen;