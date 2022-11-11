import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppText from "./AppText";
import colors from "../config/colors";
export default function Legend({ title, color }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: wp(4),
        padding: wp(1),
      }}
    >
      <View
        style={{
          width: 10,
          height: 10,
          backgroundColor: color,
          borderRadius: 50,
          marginHorizontal: wp(2),
        }}
      ></View>
      <AppText size={3.9} style={{ color: colors.black }}>
        {title}
      </AppText>
    </View>
  );
}
