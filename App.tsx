import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import EmployeeDetailsScreen from "./screens/EmployeeDetailsScreen";
import React from "react";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="EmployeeDetails" component={EmployeeDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
