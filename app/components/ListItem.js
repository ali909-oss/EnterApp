import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppText from "./AppText";
import colors from "../config/colors";
export default function ListItem({
  title = "title",
  image = require("../assets/jacket.jpg"),
  onPress,
}) {
  return (
    <>
      <View style={{ width: wp(80), padding: 10 }}>
        <AppText fontWeight="700" size={8} style={styles.text}>
          {title}
        </AppText>
      </View>
      <TouchableWithoutFeedback style={styles.img} onPress={onPress}>
        <Image style={styles.img} source={image} />
      </TouchableWithoutFeedback>
    </>
  );
}
const styles = StyleSheet.create({
  img: {
    width: wp(90),
    height: hp(20),
    borderRadius: 20,
    marginBottom: 10,
    opacity: 0.4,
  },
  text: {
    position: "absolute",
    top: 25,
    color: colors.white,
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.orange,
  },
});
