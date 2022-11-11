import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapsScreen from "../screens/MapsScreen";

const Stack = createStackNavigator();
const MapNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MapScreen" component={MapsScreen} />
  </Stack.Navigator>
);
export default MapNavigator;
