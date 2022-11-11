import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
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

export default function Top({ leftPress, rightPress, userId }) {
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.orange} />
      <View style={[styles.header, { backgroundColor: colors.orange }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={leftPress}>
            <Image
              style={{
                width: 25,
                height: 25,
                marginRight: wp(8),
                tintColor: colors.white,
              }}
              source={require("../assets/icons/feedback.png")}
            />
          </TouchableOpacity>
          <AppText
            size={6}
            style={{ textTransform: "uppercase", color: colors.white }}
          >
            BeEnter
          </AppText>
        </View>
        {userId ? (
          <View
            style={{
              marginRight: wp(5),
              width: 25,
              height: 25,
            }}
          ></View>
        ) : (
          <TouchableOpacity onPress={rightPress}>
            <Image
              style={{
                marginRight: wp(5),
                width: 25,
                height: 25,
                tintColor: colors.white,
              }}
              source={require("../assets/icons/mainReturn.png")}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(100),
    height: hp(10),
    elevation: 10,
  },
});
