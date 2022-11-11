import React, { useState, useEffect } from "react";
import { Platform, View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import colors from "../config/colors";
import Screen from "../components/Screen";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
export default function MainScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("geolocation", jsonValue);
    } catch (e) {
      // saving error
      console.log("saving Error::", e);
    }
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      console.log({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });

      storeData({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
    })();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Screen style={styles.container}>
        <View>
          <Image
            style={styles.logo}
            source={require("../assets/beenter.png")}
          />
        </View>
        <View style={{ marginBottom: hp(18) }}>
          <AppText size={5} style={styles.text}>
            Prenota con facilità ovunque
          </AppText>
        </View>
        <AppButton
          onPress={() => navigation.navigate("Register")}
          title="isriviti"
          bgColor={colors.orange}
          width={55}
        />
        <AppButton
          onPress={() => navigation.navigate("Login")}
          title="Login"
          bgColor={colors.black}
          width={55}
        />
        <AppButton
          onPress={() => navigation.navigate("TabNavigator")}
          title="continua come ospite"
          textStyle={{ color: colors.black }}
          bgColor={colors.white}
          width={55}
        />
      </Screen>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { height: 95, width: 350, marginBottom: hp(8) },
  text: {
    color: colors.black,
    fontFamily: "Montserrat_500Medium",
  },
});
