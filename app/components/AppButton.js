import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppText from "./AppText";
import colors from "../config/colors";

export default function AppButton({
  title,
  onPress,
  textStyle,
  width,
  bgColor,
  style,
  loading = false,
  tintColor = colors.white,

  image,
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
      {image && (
        <Image
          style={{
            width: 20,
            height: 20,
            marginRight: 8,
            tintColor: tintColor,
          }}
          source={image}
        />
      )}
      {loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <AppText style={[styles.text, textStyle]}>{title}</AppText>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    marginVertical: 7,
    paddingVertical: hp(1),
    shadowColor: "black",
    shadowOpacity: 0.36,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 5,
  },
  text: {
    color: "white",
    fontSize: hp("1.7%"),
    textTransform: "uppercase",
    // fontWeight: "700",
  },
});
