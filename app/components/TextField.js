import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AppText from "./AppText";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import colors from "../config/colors";

export default function TextField({ heading, text }) {
  return (
    <View style={{ paddingTop: 2 }}>
      <AppText font="Montserrat_500Medium" style={styles.heading}>
        {heading}
      </AppText>
      <AppText style={styles.text}>{text}</AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    color: colors.orange,
    marginTop: 8,
    fontSize: hp(2),
  },
  text: {
    color: colors.black,
    marginTop: 5,
    fontSize: hp(1.8),
  },
});
