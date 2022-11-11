import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import LoginScreen from "../screens/LoginScreen";
import MapsScreen from "../screens/MapsScreen";
import InnerViewItem from "../screens/ListItemViewScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainScreen from "../screens/MainScreen";
import ForgetPassword from "../screens/ForgetPassword";
import BookNow from "../screens/BookNow";
import RequestSent from "../screens/RequestSent";
const Stack = createStackNavigator();

const AppNavigator = ({ userId }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!userId && <Stack.Screen name="Main" component={MainScreen} />}
    <Stack.Screen name="TabNavigator" component={TabNavigator} />
    <Stack.Screen name="Map" component={MapsScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    <Stack.Screen name="InnerViewItem" component={InnerViewItem} />
    <Stack.Screen name="BookNow" component={BookNow} />
    <Stack.Screen name="RequestSent" component={RequestSent} />
    {userId && <Stack.Screen name="Main" component={MainScreen} />}
  </Stack.Navigator>
);
export default AppNavigator;
