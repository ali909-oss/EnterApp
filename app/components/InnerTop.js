import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../config/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppText from "../components/AppText";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InnerTop({
  rightIcon,
  rightPress,
  pageTitle,
  leftPress,
}) {
  const [userId, setUserId] = useState();
  const getUserID = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      setUserId(id);
    } catch (e) {
      alert("Failed to get the data to the storage");
    }
  };
  useEffect(() => {
    getUserID();
  }, []);
  return (
    <>
      <StatusBar backgroundColor={colors.orange} />
      <View style={[styles.header, { backgroundColor: colors.orange }]}>
        <TouchableOpacity onPress={leftPress}>
          <Image
            style={{ width: 25, height: 25, tintColor: colors.white }}
            source={require("../assets/icons/back.png")}
          />
        </TouchableOpacity>
        <AppText
          size={6}
          style={{ textTransform: "uppercase", color: colors.white }}
        >
          {pageTitle}
        </AppText>
        {userId ? (
          <View style={{ width: 25, height: 25 }}></View>
        ) : (
          rightIcon && (
            <TouchableOpacity onPress={rightPress}>
              <Image
                style={{ width: 25, height: 25, tintColor: colors.white }}
                source={require("../assets/icons/mainReturn.png")}
              />
            </TouchableOpacity>
          )
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(100),
    height: hp(10),
    elevation: 10,
  },
});
