import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import InnerTop from "../components/DetailsTop";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
export default function RefuseScreen({
  naivation,
  navigation: { goBack },
  route,
}) {
  const { data } = route.params;
  return (
    <>
      <InnerTop onPress={() => goBack()} title={"Refused"} />
      <View style={{ alignItems: "center" }}>
        {data.success !== false ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: hp(80) }}
          >
            {data
              .filter((item) => item.status === 2)
              .map((item) => (
                <View
                  style={{
                    marginVertical: hp(1),
                    height: hp(17),
                    width: wp(90),
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "#ff7f7f",
                  }}
                >
                  <AppText style={{ fontSize: hp(2) }}>Order #</AppText>
                  <AppText
                    font="Montserrat_500Medium"
                    style={{
                      paddingLeft: wp(10),
                      fontSize: hp(2.4),
                    }}
                  >
                    {item.order_no}
                  </AppText>
                  <AppText style={{ fontSize: hp(2) }}>
                    category: {item.category}
                  </AppText>
                  <AppText style={{ fontSize: hp(2) }}>
                    Date: {item.event_date.split("T")[0]}
                  </AppText>
                  <AppText style={{ fontSize: hp(2) }}>
                    Time: {parseInt(item.start.split(":")[0]) % 12}:
                    {item.start.split(":")[1]}{" "}
                    {item.start.split(":")[0] >= 12 ? "PM" : "AM"}
                  </AppText>
                </View>
              ))}
          </ScrollView>
        ) : (
          <AppText style={{ fontSize: hp(2.5), marginTop: hp(5) }}>
            Nessuna Prenotazione in sospeso
          </AppText>
        )}
      </View>
    </>
  );
}
