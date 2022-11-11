import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import InnerModal from "./InnerModal";
import colors from "../config/colors";
import AppText from "./AppText";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Montserrat_500Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { NativeBaseProvider, Modal } from "native-base";
export default function InnerListItem({
  image = require("../assets/jacket.jpg"),
  title,
  subTitle,
  onPress,
  location,
  carPress,
}) {
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <>
          {image && <Image style={styles.img} source={image} />}
          <View style={styles.titleContainer}>
            <AppText font="Montserrat_700Bold" style={styles.title}>
              {title}
            </AppText>

            <AppText
              size={4}
              font={"Montserrat_500Medium"}
              style={styles.subTitle}
            >
              {subTitle && subTitle.split("").slice(0, 80)} . . . .
            </AppText>
          </View>
          <TouchableNativeFeedback
            onPress={carPress}
            style={{ borderRadius: 50 }}
          >
            <View style={styles.modalBtn}>
              <Image
                style={{ width: 25, height: 25, tintColor: colors.gray }}
                source={require("../assets/icons/car.png")}
              />
            </View>
          </TouchableNativeFeedback>
        </>
      </TouchableOpacity>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.pink,
    borderRadius: 10,
    alignItems: "flex-start",
    width: wp(90),
    margin: 2,
    padding: 6,
    paddingTop: 10,
    marginTop: 12,
    height: hp(20),
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
  },
  img: {
    height: hp(13),
    width: wp(26),
    resizeMode: "cover",
    borderRadius: 100,
  },
  titleContainer: {
    marginLeft: 10,
  },
  title: {
    width: wp(58),
    color: colors.black,
    // fontWeight: "700",
  },
  subTitle: {
    width: wp(55),
    marginTop: 8,
    color: colors.gray,
  },
  modalBtn: {
    position: "absolute",
    borderRadius: 50,
    bottom: 15,
    padding: 10,
    right: 20,
  },
});
