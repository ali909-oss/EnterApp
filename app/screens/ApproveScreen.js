import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import colors from "../config/colors";
// import { useNavigation } from "@react-navigation/native";
import AppText from "../components/AppText";
import { Modal, NativeBaseProvider } from "native-base";
import InnerTop from "../components/DetailsTop";
import axios from "axios";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { stubTrue } from "lodash";

export default function ApproveScreen({
  navigation,
  navigation: { goBack },
  route,
}) {
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);

  const [updateMessage, setUpdateMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const acceptTimeChange = async (orderId) => {
    console.log(orderId);
    const response = await axios.put(
      `https://enterapi.herokuapp.com/api/booking/changetime/confirm/${orderId}`,
      { status: 1 }
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    console.log(response.data);
    setLoading(false);
    if (response.data.status === true) {
      // setMessage("Time Change Accepted");
      navigation.navigate("performanceScreen");
    }
    console.log(response.data);
  };
  const rejectTimeChange = async (orderId) => {
    const response = await axios.put(
      `https://enterapi.herokuapp.com/api/booking/changetime/confirm/${orderId}`,
      { status: 2 }
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    if (response.data.status === false) {
      setLoading(false);
      // setMessage("Time Change Rejected");
    }
    console.log(response.data);
  };

  const { data } = route.params;

  return (
    <NativeBaseProvider>
      <InnerTop onPress={() => goBack()} title={"Time Change"} />
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: colors.red,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          {data.success !== false ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ height: hp(80) }}
            >
              {data
                .filter((item) => item.status === 3)
                .map((item) => (
                  <View
                    style={{
                      marginVertical: hp(1),
                      // height: hp(17),
                      width: wp(90),
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: colors.pink,
                      paddingBottom: hp(5),
                    }}
                  >
                    <AppText
                      font="Montserrat_500Medium"
                      style={{ fontSize: hp(2.2), color: "black" }}
                    >
                      You have a Time Change Request for Order #
                    </AppText>
                    <AppText
                      font="Montserrat_500Medium"
                      style={{
                        paddingLeft: wp(27),
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
                      Date: {item.event_date.split("T")[0]}
                    </AppText>

                    <AppText style={{ fontSize: hp(2), color: "black" }}>
                      New Time: {parseInt(item.start.split(":")[0]) % 12}:
                      {item.start.split(":")[1]}{" "}
                      {item.start.split(":")[0] >= 12 ? "PM" : "AM"}
                    </AppText>

                    <View
                      style={{
                        position: "absolute",
                        bottom: hp(1),
                        right: wp(7),
                        flexDirection: "row",
                      }}
                    >
                      {/* {cancelLoading ? (
                        message ? (
                          <View style={{ paddingTop: hp(2) }}>
                            <AppText
                              font="Montserrat_500Medium"
                              style={{
                                textAlign: "center",
                                fontSize: hp(2),
                                color: colors.orange,
                              }}
                            >
                              {message}
                            </AppText>
                          </View>
                        ) : (
                          <View
                            style={{
                              marginTop: hp(2),
                              alignItems: "center",
                              justifyContent: "center",
                              paddingHorizontal: wp(4),
                            }}
                          >
                            <ActivityIndicator
                              size="small"
                              color={colors.orange}
                            />
                          </View>
                        )
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              marginTop: hp(2),
                              flexDirection: "row-reverse",
                              paddingHorizontal: wp(4),
                            }}
                            onPress={() => {
                              rejectTimeChange(item.id);
                              setLoading(true);
                            }}
                          >
                            <AppText
                              style={{
                                fontSize: hp(2.4),
                                color: colors.gray,
                              }}
                            >
                              Cancel
                            </AppText>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              marginTop: hp(2),
                              alignSelf: "center",
                              paddingHorizontal: wp(4),
                            }}
                          >
                            <AppText
                              style={{
                                fontSize: hp(2.4),
                                color: colors.orange,
                              }}
                            >
                              Okay
                            </AppText>
                          </TouchableOpacity>
                        </View>
                      )} */}
                      <TouchableOpacity
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: wp(4),
                        }}
                        onPress={() => {
                          rejectTimeChange(item.id);
                          setLoading(true);
                        }}
                      >
                        <AppText
                          font="Montserrat_500Medium"
                          style={{
                            paddingLeft: wp(10),
                            fontSize: hp(2.4),
                            color: "black",
                            textTransform: "uppercase",
                          }}
                        >
                          Cancel
                        </AppText>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ marginLeft: wp(3) }}
                        onPress={() => {
                          acceptTimeChange(item.id);
                          setLoading(true);
                        }}
                      >
                        <AppText
                          font="Montserrat_600SemiBold"
                          style={{
                            fontSize: hp(2.4),
                            color: colors.orange,
                            textTransform: "uppercase",
                          }}
                        >
                          Okay
                        </AppText>
                      </TouchableOpacity>
                    </View>
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
      )}
    </NativeBaseProvider>
  );
}
