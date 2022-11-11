import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../config/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppText from "../components/AppText";

export default function DetailsTop({ onPress, title }) {
  return (
    <>
      <StatusBar backgroundColor={colors.orange} />
      <View style={[styles.header, { backgroundColor: colors.orange }]}>
        <TouchableOpacity style={styles.img} onPress={onPress}>
          <Image
            style={{
              width: 25,
              height: 25,
              tintColor: colors.white,
            }}
            source={require("../assets/icons/back.png")}
          />
        </TouchableOpacity>

        <AppText size={7} style={{ textTransform: "uppercase" }}>
          {title}
        </AppText>
        <View></View>
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
