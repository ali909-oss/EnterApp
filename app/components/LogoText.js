import { View, Text, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppText from "./AppText";
import colors from "../config/colors";
export default function LogoText({ image, text }) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: hp(1),
        alignItems: "center",
      }}
    >
      <Image
        style={{ height: 25, width: 25, tintColor: colors.orange }}
        source={image}
      />
      <AppText
        font="Montserrat_500Medium"
        size={4}
        style={{ color: colors.black, marginLeft: 7 }}
      >
        {text}
      </AppText>
    </View>
  );
}
