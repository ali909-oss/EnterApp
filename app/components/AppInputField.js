import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppText from "./AppText";
import AppTextInput from "./AppTextInput";

export default function AppInputField({ name }) {
  const [value, setValue] = useState("");
  const handleChange = (name) => {
    setValue(name);
  };
  return (
    <View style={styles.InputContainer}>
      <AppText size={2}>{name}</AppText>
      <AppTextInput
        placeholder={name + "..."}
        onChangeText={(name) => handleChange(name)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  InputContainer: {
    marginTop: hp(5),
    paddingHorizontal: 20,
  },
});
