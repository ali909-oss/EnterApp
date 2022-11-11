import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import colors from "../config/colors";
import { Select } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppText from "../components/AppText";
export default function Top({ leftPress }) {
  const [region, setRegion] = useState("");
  return (
    <>
      <StatusBar backgroundColor={colors.orange} />
      <View style={[styles.header, { backgroundColor: colors.orange }]}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={leftPress}>
            <Image
              style={{
                width: 25,
                height: 25,
                marginRight: wp(8),
                tintColor: colors.white,
              }}
              source={require("../assets/icons/feedback.png")}
            />
          </TouchableOpacity>
          <AppText
            size={6}
            fontWeight="700"
            style={{ textTransform: "uppercase" }}
          >
            Mappa
          </AppText>
        </View>
        <View>
          <Select
            shadow={"1"}
            borderColor={colors.orange}
            selectedValue={region}
            width={40}
            accessibilityLabel="Select Category"
            placeholder="Select Category"
            color={colors.white}
            onValueChange={(itemValue) => setRegion(itemValue)}
          >
            <Select.Item label="EVENTI" value={"events"} />
            <Select.Item label="SPORT" value={"sports"} />
            <Select.Item label="DIVERTIMENTO" value={"divertmentos"} />
            <Select.Item label="Night Life" value={"nighlife"} />
            <Select.Item label="RESTORANTI" value={"resturants"} />
          </Select>
        </View>
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
