import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import colors from "../config/colors";
import AppText from "./AppText";
const Afternoon = [
  {
    id: 1,
    time: "1:00 PM",
  },
  {
    id: 2,
    time: "2:00 PM",
  },
  {
    id: 3,
    time: "3:00 PM",
  },
  {
    id: 4,
    time: "4:00 PM",
  },
  {
    id: 5,
    time: "5:00 PM",
  },
];

export default function TimeSelector({ status, setStatus }) {
  return (
    <View>
      <View style={{ marginTop: hp("3") }}>
        <AppText font="Montserrat_700Bold" style={styles.texta}>
          Choose any Time Slot
        </AppText>
      </View>
      <View style={{ flexDirection: "row", marginTop: hp("2%") }}>
        <AppText font="Montserrat_700Bold" style={styles.textc}>
          Available Time slots
        </AppText>
      </View>
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {Afternoon.map((interest) => (
          <TouchableOpacity onPress={() => setStatus(interest.id)}>
            <View
              style={[status === interest.id ? styles.focusedBtn : styles.btn]}
            >
              <AppText
                font="Montserrat_500Medium"
                style={[
                  status === interest.id ? styles.focusBtnText : styles.btnText,
                ]}
              >
                {interest.time}
              </AppText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "white",
  },
  focusedBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orange,
    margin: wp("2"),
    height: hp(6),
    width: wp(23),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: colors.white,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    margin: wp("2"),
    height: hp(6),
    width: wp(23),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: colors.orange,
  },
  btnText: { color: colors.orange, fontSize: hp(2) },
  focusBtnText: { color: colors.white, fontSize: hp(2) },
  text: {
    fontSize: hp(2.7),
    color: "white",
    padding: hp(1),
    paddingTop: hp(3),
  },
  header: {
    flex: 1,
  },

  img: {
    width: wp("100%"),
    height: hp("10%"),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  img1: {
    marginTop: hp("-10%"),
    width: wp("100%"),
  },
  img2: {
    marginTop: hp("-7%"),
    justifyContent: "flex-start",
    position: "absolute",
  },
  texta: {
    fontSize: hp(2.5),
    color: "black",
  },
  textb: {
    fontSize: hp(2),
    color: "#b4b6b7",
    marginLeft: wp("3%"),
  },
  textc: {
    fontSize: hp(2),
  },
  input: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ffffff",
    width: wp("45%"),
    height: hp("6%"),
    backgroundColor: "#ffffff",
    marginLeft: wp("5%"),
    textAlign: "left",
    marginTop: hp("2%"),
  },
  input1: {
    height: hp("6%"),
    width: wp("9%"),
    borderColor: "#02a8ea",
    borderWidth: 0.2,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: wp("36%"),
    marginTop: hp("-4%"),
  },
  caltext: {
    fontSize: hp(2),
    color: "#8f8f8f",
    textAlign: "left",
    fontWeight: "400",
    marginTop: hp("1%"),
    marginLeft: wp("3%"),
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  backtext: {
    height: hp("6%"),
    width: wp("20%"),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  mainview: {
    backgroundColor: "#e7effe",
    borderRadius: 10,
  },
  datetext: {
    fontSize: 14,
    textAlign: "center",

    justifyContent: "center",
    alignItems: "center",
    color: "#577af2",
  },
  newdate: {
    fontSize: 14,
    textAlign: "center",

    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  textt: {
    color: "white",
    fontSize: 18,
  },
  btn1: {
    width: wp("90%"),
    height: hp("7%"),
    marginTop: hp("10%"),
    alignSelf: "center",
  },
  btn2: {
    width: wp("72%"),
    height: hp("7%"),
    marginTop: hp("5%"),
  },
  skip: {
    textAlign: "center",
    fontSize: hp(2.2),
    color: "#818ba7",
    marginTop: hp("1%"),
  },
  modal: {
    flex: 0,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignSelf: "center",
    borderColor: "#fff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("20%"),
    height: hp("45%"),
    width: wp("80%"),
  },
  Ellipse: {
    width: wp("24%"),
    height: hp("12%"),
    marginTop: hp(4),
    borderRadius: 50,
    backgroundColor: "#e7f2f8",
  },
  image1: {
    alignSelf: "center",
    marginTop: hp("2%"),
  },
  textsend: {
    fontSize: hp(3.3),
    fontWeight: "bold",
    color: "black",
  },
  textsucc: {
    fontSize: hp(1.7),
    color: "#adb0b2",
  },
  cont: {
    //   backgroundColor: '#e7effe',
    backgroundColor: "#0469e6",

    borderRadius: 10,
  },
});
