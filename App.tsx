import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import MenuScreen from "./screens/MenuScreen";
import EmployeeDetailsScreen from "./screens/EmployeeDetailsScreen";
import ProjectScreen from "./screens/ProjectScreen";
import TimesheetScreen from "./screens/TimesheetScreen";
import BenchDetailsScreen from "./screens/BenchDetailsScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EmployeeDetails" component={EmployeeDetailsScreen} />
        <Stack.Screen name="Project" component={ProjectScreen} />
        <Stack.Screen name="Timesheet" component={TimesheetScreen} />
        <Stack.Screen name="BenchDetails" component={BenchDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
