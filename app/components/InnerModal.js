import { View, Text, Button, Platform, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../config/colors";
import AppText from "./AppText";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Constants from "expo-constants";
import * as Location from "expo-location";
import AppButton from "./ShadowLessBtn";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function InnerModal({ onPress, currentLocation }) {
  const [location, setLocation] = useState({});
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [val, setVal] = useState(false);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("geolocation");
      setLocation(jsonValue != null ? JSON.parse(jsonValue) : null);
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      setVal(true);
    } catch (e) {
      // error reading value
    }
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("geolocation", jsonValue);
    } catch (e) {
      // saving error
      console.log("saving Error::", e);
    }
  };
  const getDistance = async () => {
    const response = await axios.get(
      `https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix?origins=${location.latitude},${location.longitude}&destinations=${currentLocation.latitude},${currentLocation.longitude}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "0cb61e2826msh031b587a300f448p12ff88jsna372dc1d4dbb",
          "X-RapidAPI-Host": "trueway-matrix.p.rapidapi.com",
        },
      }
    );

    setLoading(false);
    if (response) {
      setDistance(response.data.distances[0][0]);
      setDuration(response.data.durations[0][0]);
    }
  };

  useEffect(() => {
    getData();
    if (currentLocation && location) {
      getDistance();
    } else if (!location) {
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

        setLocation({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        });

        // storeData({
        //   longitude: location.coords.longitude,
        //   latitude: location.coords.latitude,
        // });
      })();
    }
  }, [val]);

  return (
    <>
      <View
        style={{
          borderRadius: 7,
          backgroundColor: colors.white,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: wp(40), height: hp(13), padding: wp(3) }}>
          {!loading ? (
            <>
              <AppText
                font="Montserrat_500Medium"
                size={3.5}
                style={{ color: colors.black, marginVertical: hp(0.5) }}
              >
                Distance:
              </AppText>
              <AppText
                font="Montserrat_600SemiBold"
                size={3.5}
                style={{ color: colors.black, marginVertical: hp(0.5) }}
              >
                {distance / 1000} km
              </AppText>
              <AppText
                size={3.5}
                font="Montserrat_500Medium"
                style={{ color: colors.black, marginVertical: hp(0.5) }}
              >
                Time to get there:
              </AppText>
              <AppText
                font="Montserrat_600SemiBold"
                size={3.5}
                style={{ color: colors.black, marginVertical: hp(0.5) }}
              >
                {(duration / 60).toFixed(2)} min
              </AppText>
            </>
          ) : (
            <ActivityIndicator
              style={{ marginTop: hp(5) }}
              size={"small"}
              color={colors.orange}
            />
          )}
        </View>
        <AppButton
          onPress={onPress}
          style={{ marginTop: hp(1) }}
          width={20}
          title="cancel"
          textStyle={{ color: colors.orange }}
        />
      </View>
    </>
  );
}

const styles = {
  right: {
    marginLeft: "auto",
    marginRight: 0,
  },
};
