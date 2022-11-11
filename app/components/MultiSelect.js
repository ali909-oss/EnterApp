import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SelectMultipleButton } from "react-native-selectmultiple-button";
import _ from "lodash";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
const Afternoon = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun", "All"];
export default class SimpleButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multipleSelectedData: ["Sat", "Sun"],
      multipleSelectedDataLimited: [],
    };
  }

  render() {
    return (
      <View>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            backgroundColor: "black",
            borderRadius: 20,
            width: wp(85),
            padding: 10,
          }}
        >
          {Afternoon.map((interest) => (
            <SelectMultipleButton
              key={interest}
              buttonViewStyle={{
                borderRadius: 10,
                height: hp("6%"),
                width: widthPercentageToDP(17),
              }}
              textStyle={{
                fontSize: hp(2),
                fontWeight: "bold",
              }}
              highLightStyle={{
                backgroundColor: "gray",
                textColor: "black",
                textTintColor: "green",
                backgroundTintColor: "blue",
              }}
              value={interest}
              selected={this.state.multipleSelectedData.includes(interest)}
              singleTap={(valueTap) =>
                this._singleTapMultipleSelectedButtons(interest)
              }
            />
          ))}
        </View>
      </View>
    );
  }

  _singleTapMultipleSelectedButtons(interest) {
    console.log("All" === interest);
    if (this.state.multipleSelectedData.includes(interest)) {
      _.remove(this.state.multipleSelectedData, (ele) => {
        return ele === interest;
      });
    } else {
      this.state.multipleSelectedData.push(interest);
    }
    if (this.state.multipleSelectedData.length === 0 && interest == "All") {
      this.state.multipleSelectedData = [...Afternoon];
      console.log(this.state.multipleSelectedData, "States");
    }

    if (this.state.multipleSelectedData.length > 0 && interest === "All") {
      this.state.multipleSelectedData = [];
    }

    this.setState({
      multipleSelectedData: this.state.multipleSelectedData,
    });
  }
}
const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "white",
  },
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
    fontSize: 17,
  },
  textb: {
    fontSize: hp(2),
    color: "#b4b6b7",
    marginLeft: wp("3%"),
    fontWeight: "400",
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
