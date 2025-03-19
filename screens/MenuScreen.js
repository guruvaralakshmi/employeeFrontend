import React from "react";
import { View, Text, StyleSheet, } from "react-native";
import { Card, Button, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MenuScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Menu</Text>

        <List.Item
          title="Employee Details"
          left={(props) => <List.Icon {...props} icon="account-details" />}
          onPress={() => navigation.navigate("EmployeeDetails")}
        />
        <List.Item
          title="Project"
          left={(props) => <List.Icon {...props} icon="folder-open" />}
          onPress={() => navigation.navigate("Project")}
        />
        <List.Item
          title="Timesheet"
          left={(props) => <List.Icon {...props} icon="clock-time-four-outline" />}
          onPress={() => navigation.navigate("Timesheet")}
        />
        <List.Item
          title="Bench Details"
          left={(props) => <List.Icon {...props} icon="chair-rolling" />}
          onPress={() => navigation.navigate("BenchDetails")}
        />

        <Button mode="contained" onPress={() => navigation.goBack()} style={styles.closeButton}>
          Close
        </Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20, backgroundColor: "#F5F5F5" },
  card: { padding: 20, borderRadius: 10, backgroundColor: "white", elevation: 5 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  closeButton: { marginTop: 20, backgroundColor: "#007BFF" },
});

export default MenuScreen;
