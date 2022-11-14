import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Top from "../components/Top";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import LogoText from "../components/LogoText";
import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import axios from "axios";
export default function ProfileScreen({ navigation }) {
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();
  const [expoToken, setExpoToken] = useState();

  const getUserID = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      setUserId(id);
    } catch (e) {
      alert("Failed to get the data to the storage");
    }
  };

  const deleteExpoToken = async (token) => {
    const response = await axios.delete(
      `https://enterapi.herokuapp.com/api/device/delete/${token}`
    );
    console.log("Expo Token", response.data);
    console.log("Expo Token222", token);
    // console.log(response);
  };

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("USER");
      setUserData(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {
      // read error
      alert("Failed to Get the User Data to the storage");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserID();
      getUserData();
    }, [])
  );

  return (
    <View>
      <Top
        leftPress={() => navigation.navigate("Feedback")}
        rightPress={() => navigation.navigate("Main")}
        userId={userId}
      />
      <View style={{ padding: 15 }}>
        <View
          style={{
            width: wp(25),
            position: "absolute",
            top: hp(7),
            right: 40,
          }}
        >
          <AppText size={3.5} style={{ color: colors.black }}>
            4 prenotozioni confernate
          </AppText>
          <TouchableOpacity
            onPress={() => {
              console.log("Sei a");
            }}
          >
            <AppText
              size={3.5}
              style={{ marginTop: hp(3.5), color: colors.orange }}
            >
              Sei a
            </AppText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            top: 250,
          }}
        >
          <View
            style={{
              width: wp(76),
              borderBottomWidth: 3,
              borderBottomColor: colors.black,
            }}
          ></View>

          {userData ? (
            <>
              <LogoText
                image={require("../assets/icons/message.png")}
                text={userData.email}
              />
              <LogoText
                image={require("../assets/icons/telephone.png")}
                text={userData.phone}
              />
              <LogoText
                image={require("../assets/icons/bug.png")}
                text={userData.name}
              />
            </>
          ) : (
            <View style={{ padding: hp(5) }}>
              {/* <ActivityIndicator size={"small"} color={colors.orange} /> */}
            </View>
          )}

          <View style={{ alignItems: "center" }}>
            {userId ? (
              <AppButton
                onPress={() => {
                  deleteExpoToken(expoToken);
                  AsyncStorage.clear();
                  navigation.navigate("Main");
                }}
                style={{ marginTop: 20 }}
                title={"Log out"}
                width={50}
                bgColor={colors.orange}
              />
            ) : (
              <AppButton
                onPress={() => navigation.navigate("Register")}
                style={{ marginTop: 20 }}
                title={"Sign up"}
                width={50}
                bgColor={colors.orange}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
