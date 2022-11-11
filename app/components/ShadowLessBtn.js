import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function AppButton({
  title,
  onPress,
  textStyle,
  width,
  bgColor,
  style,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        { backgroundColor: bgColor },
        { width: wp(width) },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 7,
    paddingVertical: hp(1),
  },
  text: {
    color: "white",
    fontSize: hp("1.7%"),
    textTransform: "uppercase",
  },
});
