import React from "react";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { heightPercentageToDP } from "react-native-responsive-screen";
import MapsScreen from "../screens/MapsScreen";
import colors from "../config/colors";
import PerformanceStack from "../navigation/PerformanceStack";
import HomeStack from "../navigation/HomeStack";
import MapNavigator from "../navigation/MapNavigator";
import ProfileScreen from "../screens/ProfileScreen";
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: "absolute",
        padding: 5,
        paddingBottom: 10,
        height: heightPercentageToDP("8%"),
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => {
          return (
            <View
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                top: 1,
              }}
            >
              <Image
                source={require("../assets/icons/Home.png")}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? colors.orange : "#bbbbbb",
                }}
              />
            </View>
          );
        },
      }}
    />
    <Tab.Screen
      name="Prenotazioni"
      component={PerformanceStack}
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                top: 1,
              }}
            >
              <Image
                source={require("../assets/icons/Reservation.png")}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? colors.orange : "#bbbbbb",
                }}
              />
            </View>
          );
        },
      }}
    />
    <Tab.Screen
      name="Mappa"
      component={MapsScreen}
      options={{
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => {
          return (
            <View
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                top: 1,
              }}
            >
              <Image
                source={require("../assets/icons/Map.png")}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? colors.orange : "#bbbbbb",
                }}
              />
            </View>
          );
        },
      }}
    />
    <Tab.Screen
      name="Profilo"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                top: 1,
              }}
            >
              <Image
                source={require("../assets/icons/Profile.png")}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? colors.orange : "#bbbbbb",
                }}
              />
            </View>
          );
        },
      }}
    />
  </Tab.Navigator>
);
export default TabNavigator;
