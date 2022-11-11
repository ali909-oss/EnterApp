import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import colors from "../config/colors";
import AppText from "../components/AppText";
import InnerTop from "../components/DetailsTop";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function ConfirmScreen({
  naivation,
  navigation: { goBack },
  route,
}) {
  const { data } = route.params;

  return (
    <>
      <InnerTop onPress={() => goBack()} title={"Confirm"} />
      <View style={{ alignItems: "center" }}>
        {data.success !== false ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: hp(80) }}
          >
            {data
              .filter((item) => item.status === 1)
              .map((item) => (
                <View
                  style={{
                    marginVertical: hp(1),
                    // height: hp(17),
                    width: wp(90),
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: colors.green,
                  }}
                >
                  <AppText style={{ fontSize: hp(2), color: "black" }}>
                    Order #
                  </AppText>
                  <AppText
                    font="Montserrat_500Medium"
                    style={{
                      paddingLeft: wp(10),
                      fontSize: hp(2.4),
                      color: "black",
                      textTransform: "uppercase",
                    }}
                  >
                    BET-{item.order_no}
                  </AppText>
                  <AppText style={{ fontSize: hp(2), color: "black" }}>
                    category: {item.category}
                  </AppText>
                  <AppText style={{ fontSize: hp(2), color: "black" }}>
                    Event: {item.title}
                  </AppText>
                  <AppText style={{ fontSize: hp(2), color: "black" }}>
                    Seats Booked: {item.seats}
                  </AppText>
                  <AppText style={{ fontSize: hp(2), color: "black" }}>
                    Price: ${item.total_price}
                  </AppText>
                  <AppText style={{ fontSize: hp(2), color: "black" }}>
                    Date: {item.event_date.split("T")[0]}
                    {/* {item.date.split("T")[0]}
                        {new Date(item.date.split("T")[0], item.start) -
                          new Date() <
                        4
                          ? console.log(new Date(item.date) - new Date())
                          : null} */}
                  </AppText>

                  <AppText style={{ fontSize: hp(2), color: "black" }}>
                    Time: {parseInt(item.start.split(":")[0]) % 12}:
                    {item.start.split(":")[1]}{" "}
                    {item.start.split(":")[0] >= 12 ? "PM" : "AM"}
                  </AppText>
                </View>
              ))}
          </ScrollView>
        ) : (
          <AppText
            style={{ fontSize: hp(2.5), marginTop: hp(5), color: "black" }}
          >
            Nessuna Prenotazione in sospeso
          </AppText>
        )}
      </View>
    </>
  );
}
