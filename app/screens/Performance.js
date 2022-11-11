import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Top from "../components/Top";
import { Picker } from "@react-native-picker/picker";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { Modal, NativeBaseProvider } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";

export default function Performance({ navigation }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [newSeats, setNewSeats] = useState();
  const [updateMessage, setUpdateMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [seats, setSeats] = useState();
  const [orderId, setOrderId] = useState();
  const availableSeats = ["1", "2", "3", "4", "5", "6", "7"];
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userId, setUserId] = useState();

  const fetchData = async () => {
    const response = await axios.get(
      `https://benterapi.herokuapp.com/api/booking/Id/${userId}`
    );
    setData(response.data);
    console.log(response.data);
    setLoading(false);
  };
  const updateBooking = async (id, seats) => {
    const response = await axios.put(
      `https://benterapi.herokuapp.com/api/booking/update/user/${id}`,
      { seats: seats }
    );
    // setUpdateLoading(false);
    setUpdateMessage(response.data.message);
    setTimeout(() => {
      setEditModal(false);
      setUpdateMessage("");
      setUpdateLoading(false);
    }, 2000);
  };
  const deleteBooking = async (id) => {
    const response = await axios.delete(
      `https://benterapi.herokuapp.com/api/booking/delete/${id}`
    );
    setDeleteMessage(response.data.message);
    console.log(response.data.message);
    setTimeout(() => {
      setDeleteLoading(false);
      setDeleteMessage("");
      setDeleteModal(false);
    }, 2000);
  };
  // comparing the current date with the date of the booking
  const compareDate = (date) => {
    const currentDate = moment().format("YYYY-MM-DD");
    const bookingDate = moment(date).format("YYYY-MM-DD");
    if (currentDate === bookingDate) {
      return true;
    } else {
      return false;
    }
  };

  // getting the remaingin time in hours  of the booking

  const getRemainingDays = (date) => {
    const currentDate = moment().format("YYYY-MM-DD");
    const bookingDate = moment(date).format("YYYY-MM-DD");
    const diff = moment(bookingDate).diff(moment(currentDate), "days");
    // console.log(diff);
    return diff;
  };

  // get the  date and timeof the booking
  const getDateTime = (date) => {
    const dateTime = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return dateTime;
  };
  const getTime = (t) => {
    const time = new Date().toLocaleTimeString();
    console.log(time.split(":")[0], "now");
    console.log(t.split(":")[0], "booking");
    if (time.split(":")[0] - t.split(":")[0] <= 4) {
      return false;
    } else {
      return true;
    }
  };

  const getUserID = async () => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      setUserId(id);
    } catch (e) {
      alert("Failed to get the data to the storage");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserID();
      if (userId) fetchData();
    }, [userId, updateLoading, deleteLoading])
  );

  return (
    <NativeBaseProvider>
      <Top
        leftPress={() => navigation.navigate("Feedback")}
        rightPress={() => navigation.navigate("Main")}
        userId={userId}
      />
      {userId ? (
        loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"large"} color={colors.orange} />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <AppButton
              width={80}
              image={require("../assets/icons/clock.png")}
              title="Cambio orario"
              bgColor={colors.black}
              onPress={() => navigation.navigate("Approve",{data})}
            />
            <AppButton
              width={80}
              image={require("../assets/icons/thumbsUp.png")}
              title="Prenotazioni
          confermate"
              bgColor={colors.green}
              onPress={() => navigation.navigate("Confirm", { data })}
            />
            <AppButton
              width={80}
              image={require("../assets/icons/thumbsDown.png")}
              title="Prenotazioni
          rifiutate"
              bgColor={colors.red}
              onPress={() => navigation.navigate("Refuse", { data })}
            />
            <AppText style={{ fontSize: hp(2.9), color: "black" }}>
              In attesa di conferma
            </AppText>

            {data.success !== false ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: hp(55) }}
              >
                {data
                  .filter((item) => item.status === 0)
                  .map((item) => (
                    <View
                      style={{
                        marginVertical: hp(1),
                        // height: hp(17),
                        width: wp(90),
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: colors.pink,
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
                        Date: {item.event_date.split("T")[0]}
                      </AppText>

                      <AppText style={{ fontSize: hp(2), color: "black" }}>
                        Time: {parseInt(item.start.split(":")[0]) % 12}:
                        {item.start.split(":")[1]}{" "}
                        {item.start.split(":")[0] >= 12 ? "PM" : "AM"}
                      </AppText>
                      {/* {getRemainingDays(item.event_date) === 0 &&
                      getTime(item.start) === false ? (
                        <View></View>
                      ) : ( */}
                      <View
                        style={{
                          position: "absolute",
                          bottom: hp(1),
                          right: wp(7),
                          flexDirection: "row",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: 25,
                            height: 25,
                            borderRadius: 22,
                            // backgroundColor: colors.orange,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onPress={() => {
                            setEditModal(true);
                            setSeats(item.seats);
                            setOrderId(item.id);
                          }}
                        >
                          <Image
                            style={{ width: 25, height: 25 }}
                            source={require("../assets/icons/edit.png")}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ marginLeft: wp(3) }}
                          onPress={() => {
                            setDeleteModal(true);
                            setSeats(item.seats);
                            setOrderId(item.id);
                          }}
                        >
                          <Image
                            style={{ width: 25, height: 25 }}
                            source={require("../assets/icons/delete.png")}
                          />
                        </TouchableOpacity>
                      </View>
                      {/* )} */}

                      <Modal isOpen={editModal} transparent={true}>
                        <View
                          style={{
                            width: wp(70),
                            borderRadius: 15,
                            backgroundColor: "#F5F5F5",
                            paddingVertical: hp(5),
                            paddingHorizontal: wp(3),
                          }}
                        >
                          <Modal.CloseButton
                            onPress={() => {
                              setEditModal(false);
                              setUpdateLoading(false);
                            }}
                          />
                          <AppText
                            font="Montserrat_500Medium"
                            style={{ fontSize: hp(2.3), color: colors.orange }}
                          >
                            Edit Seats
                          </AppText>

                          <View style={{ marginTop: hp(1) }}>
                            <AppText
                              font="Montserrat_500Medium"
                              style={{ fontSize: hp(2), color: "black" }}
                            >
                              Previously Booked seats : {seats}
                            </AppText>
                          </View>

                          <View
                            style={{
                              marginTop: hp(3),
                            }}
                          >
                            <AppText
                              style={{ fontSize: hp(2), color: "black" }}
                            >
                              Select New Number of Seats:
                            </AppText>
                            <Picker
                              style={{
                                marginTop: hp(1),
                                width: wp(50),
                                backgroundColor: colors.white,
                              }}
                              selectedValue={newSeats}
                              onValueChange={(itemValue, itemIndex) =>
                                setNewSeats(itemValue)
                              }
                            >
                              {availableSeats
                                .filter((item) => item != seats)
                                .map((item, index) => {
                                  return (
                                    <Picker.Item label={item} value={item} />
                                  );
                                })}
                            </Picker>
                          </View>

                          {updateLoading ? (
                            updateMessage ? (
                              <View style={{ paddingTop: hp(2) }}>
                                <AppText
                                  font="Montserrat_500Medium"
                                  style={{
                                    textAlign: "center",
                                    fontSize: hp(2),
                                    color: colors.orange,
                                  }}
                                >
                                  {updateMessage}
                                </AppText>
                              </View>
                            ) : (
                              <View
                                style={{
                                  marginTop: hp(2),
                                  flexDirection: "row-reverse",
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
                            <TouchableOpacity
                              style={{
                                marginTop: hp(2),
                                flexDirection: "row-reverse",
                                paddingHorizontal: wp(4),
                              }}
                              onPress={() => {
                                setUpdateLoading(true);
                                updateBooking(orderId, newSeats);
                              }}
                            >
                              <AppText
                                style={{
                                  fontSize: hp(2.4),
                                  color: colors.orange,
                                }}
                              >
                                Edit
                              </AppText>
                            </TouchableOpacity>
                          )}
                        </View>
                      </Modal>
                      <Modal isOpen={deleteModal} transparent={true}>
                        <View
                          style={{
                            width: wp(70),
                            borderRadius: 15,
                            backgroundColor: "#F5F5F5",
                            paddingVertical: hp(5),
                            paddingHorizontal: wp(3),
                          }}
                        >
                          <Modal.CloseButton
                            onPress={() => {
                              setDeleteModal(false);
                              setDeleteLoading(false);
                            }}
                          />
                          <AppText
                            font="Montserrat_500Medium"
                            style={{ fontSize: hp(2.3), color: colors.orange }}
                          >
                            Delete Booking
                          </AppText>

                          <View style={{ marginTop: hp(1) }}>
                            <AppText
                              font="Montserrat_500Medium"
                              style={{ fontSize: hp(2), color: "black" }}
                            >
                              Previously Booked seats : {seats}
                            </AppText>
                          </View>

                          <View
                            style={{
                              // alignSelf: "center",
                              marginTop: hp(3),
                            }}
                          >
                            <AppText
                              style={{ fontSize: hp(2), color: "black" }}
                            >
                              Are You sure You want to delete this booking?
                            </AppText>
                          </View>

                          {deleteLoading ? (
                            deleteMessage ? (
                              <View style={{ paddingTop: hp(2) }}>
                                <AppText
                                  font="Montserrat_500Medium"
                                  style={{
                                    textAlign: "center",
                                    fontSize: hp(2),
                                    color: colors.orange,
                                  }}
                                >
                                  {deleteMessage}
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
                                  setDeleteModal(false);
                                  setDeleteLoading(false);
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
                                onPress={() => {
                                  deleteBooking(orderId);
                                  setDeleteLoading(true);
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
                          )}
                        </View>
                      </Modal>
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
        )
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppText
            size={6.5}
            style={{ color: colors.orange, textAlign: "center" }}
            font="Montserrat_600SemiBold"
          >
            Accedi Prima per verificare la tua prenotazione
          </AppText>
        </View>
      )}
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
