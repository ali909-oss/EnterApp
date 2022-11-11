import React from "react";

import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ApproveScreen from "../screens/ApproveScreen";
import ConfirmScreen from "../screens/ConfirmScreen";
import RefuseScreen from "../screens/RefuseScreen";
import Performance from "../screens/Performance";
import colors from "../config/colors";
import { useFonts } from "expo-font";
const Stack = createStackNavigator();
let fontsLoaded;
const PerformanceNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="performanceScreen"
      component={Performance}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Approve" component={ApproveScreen} />
    <Stack.Screen name="Confirm" component={ConfirmScreen} />
    <Stack.Screen name="Refuse" component={RefuseScreen} />
  </Stack.Navigator>
);
export default PerformanceNavigator;
