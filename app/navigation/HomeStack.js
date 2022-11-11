import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/NewHomeScreen";
import InnerHome from "../screens/InnerHome";
import FeedbackScreen from "../screens/FeedbackScreen";

const Stack = createStackNavigator();
const PerformanceNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={Home} />
    <Stack.Screen name="InnerHome" component={InnerHome} />
    <Stack.Screen name="Feedback" component={FeedbackScreen} />
  </Stack.Navigator>
);
export default PerformanceNavigator;
