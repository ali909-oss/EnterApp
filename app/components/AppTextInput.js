import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function AppTextInput({ style, width = 90, ...otherProps }) {
  return (
    <View style={[styles.container, { width: wp(width) }, style]}>
      <TextInput style={[styles.input]} {...otherProps} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#d3d3d3",
    marginVertical: 10,
    paddingHorizontal: 7,
  },
  input: {
    width: "100%",
    fontSize: 12,
    paddingVertical: 5,
  },
});
