import { StatusBar } from "expo-status-bar";
import react, { useState, useEffect, useCallback, useRef } from "react";
import { View, ActivityIndicator } from "react-native";
import AppNavigator from "./app/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import colors from "./app/config/colors";
import 'react-native-gesture-handler';



export default function App() {
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);

  // getUserId from AsyncStorage

  const getUserId = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      setUserId(id);
      setLoading(false);
    } catch (e) {
      alert("Failed to get the data to the storage");
    }
  };

  useEffect(() => {
    getUserId();
    if (userId) setLoading(false);
  }, [userId]);

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={colors.orange} />
    </View>
  ) : (
    <NavigationContainer theme={NavigationTheme}>
      <AppNavigator userId={userId} />
    </NavigationContainer>
  );
}
