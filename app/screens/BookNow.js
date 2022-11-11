import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../config/colors";
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AppText from "../components/AppText";
import { NativeBaseProvider, Modal } from "native-base";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setNestedObjectValues } from "formik";
import DatePicker from "react-native-datepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AdmintData({ navigation, route }) {
  const { title, id, price, category, start, end, date, is_selectable } = {
    ...route.params,
  };
  const availableSeats = ["1", "2", "3", "4", "5", "6", "7", '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50'];  
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [customDate, setCustomDate] = useState(new Date());
  const [customTime, setCustomTime] = useState(new Date().toLocaleTimeString());
  const [customTimeOut, setCustomTimeOut] = useState(
    new Date().toLocaleTimeString()
  );
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isTimeOutOpen, setIsTimeOutOpen] = useState(false);
  const [userData, setUserData] = useState();
  // const username = "talalnuman";
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [expoToken, setExpoToken] = useState("");
  const [val, setVal] = useState(false);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("USER");
      setUserData(jsonValue != null ? JSON.parse(jsonValue) : null);
      setVal(true);
    } catch (e) {
      // read error
      alert("Failed to Get the User Data from the storage");
    }
  };

  function generateUUID(digits) {
    let str = "0123456789";
    let uuid = [];
    for (let i = 0; i < digits; i++) {
      uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uuid.join("");
  }
  console.log(new Date().toLocaleTimeString());
  console.log("This is userUf", userId);
  console.log("This is SELECTABLE ", is_selectable);
  const sendData = async () => {
    const orderNo = Number(generateUUID(6) + "" + userId);
    console.log(orderNo);
    console.log(typeof orderNo);
    let order = {
      order_no: orderNo,
      event_id: id,
      user_id: Number(userId),
      user_name: username,
      category: category,
      seats: numberOfSeats,
      price_per_seat: price,
      total_price: numberOfSeats * price,
      date: date,
      time_in: start,
      time_out: end,
      status: 0,
    };
    console.log(order);
    const response = await axios.post(
      `https://benterapi.herokuapp.com/api/booking`,
      order
    );
    console.log(response.data.message);
    if (response.data.message === "Event was Successfully booked") {
      navigation.navigate("RequestSent");
    } else {
      alert("Booking not successful");
      setLoading(false);
    }
    setMessage(response.data.message);
  };
  const sendData2 = async () => {
    const orderNo = Number(generateUUID(6) + "" + userId);
    console.log(orderNo);
    console.log(typeof orderNo);
    let order = {
      order_no: orderNo,
      event_id: id,
      user_id: Number(userId),
      user_name: username,
      category: category,
      seats: numberOfSeats,
      price_per_seat: 0,
      total_price: 0,
      date: customDate,
      time_in: customTime,
      time_out: customTimeOut,
      status: 0,
    };
    console.log(order);
    const response = await axios.post(
      `https://benterapi.herokuapp.com/api/booking`,
      order
    );
    console.log(response.data.message);
    if (response.data.message === "Event was Successfully booked") {
      navigation.navigate("RequestSent");
    } else {
      alert("Booking not successful");
      setLoading(false);
    }
    setMessage(response.data.message);
  };

  useEffect(() => {
    getUserData();
    if (userData) {
      console.log(userData);
      setUserId(userData.id);
      setUsername(userData.name);
    }
  }, [val]);
  return (
    <NativeBaseProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.pink,
          // justifyContent: "center",
          paddingHorizontal: wp(4),
        }}
      >
        <AppText
          font="Montserrat_600SemiBold"
          style={{
            textAlign: "left",
            fontSize: hp(2.5),
            marginTop: hp(3),
            color: colors.orange,
          }}
        >
          Inserisci i Dettagli per la Prenotazione
          {expoToken}
        </AppText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(3),
            marginBottom: hp(2),
          }}
        >
          <AppText
            font="Montserrat_500Medium"
            style={{
              textAlign: "left",
              fontSize: hp(2.5),
              color: colors.orange,
            }}
          >
            Evento:
          </AppText>
          <AppText
            font="Montserrat_500Medium"
            style={{
              marginLeft: wp(2),
              textAlign: "left",
              fontSize: hp(2.5),
              color: colors.black,
            }}
          >
            {title}
          </AppText>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: hp(2),
          }}
        >
          <AppText
            font="Montserrat_500Medium"
            style={{
              textAlign: "left",
              fontSize: hp(2.5),
              color: colors.orange,
            }}
          >
            Date:
          </AppText>
          {is_selectable !== 1 ? (
            <AppText
              font="Montserrat_500Medium"
              style={{
                marginLeft: wp(2),
                textAlign: "left",
                fontSize: hp(2.5),
                color: colors.black,
              }}
            >
              {date.split("T")[0]}
            </AppText>
          ) : (
            <View>
              <DatePicker
                style={{ width: wp(60), marginLeft: wp(2) }}
                date={customDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2020-01-01"
                maxDate="2025-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{}}
                onDateChange={(date) => {
                  setCustomDate(date);
                  console.log(date, customDate);
                }}
              />
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: hp(2),
          }}
        >
          <AppText
            font="Montserrat_500Medium"
            style={{
              textAlign: "left",
              fontSize: hp(2.5),
              color: colors.orange,
            }}
          >
            volta in:
          </AppText>
          {is_selectable === 1 ? (
            <TouchableOpacity
              style={{
                marginLeft: wp(2),
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={() => setIsTimeOpen(true)}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "gray",
                  paddingHorizontal: wp(5),
                  paddingVertical: hp(1),
                }}
              >
                <AppText
                  font="Montserrat_500Medium"
                  style={{
                    marginLeft: wp(2),
                    textAlign: "left",
                    fontSize: hp(2.5),
                    color: colors.black,
                  }}
                >
                  {parseInt(customTime.split(":")[0]) % 12}:
                  {customTime.split(":")[1]}{" "}
                  {customTime.split(":")[0] >= 12 ? "PM" : "AM"}
                </AppText>
              </View>

              <Image
                style={{ width: 25, height: 25, marginLeft: wp(2) }}
                source={require("../assets/icons/clock.png")}
              />

              <DateTimePickerModal
                isVisible={isTimeOpen}
                mode="time"
                onConfirm={(time) => {
                  console.log(time.toLocaleTimeString());
                  setCustomTime(time.toLocaleTimeString());
                  setIsTimeOpen(false);
                }}
                onCancel={() => {
                  setIsTimeOpen(false);
                }}
              />
            </TouchableOpacity>
          ) : (
            <AppText
              font="Montserrat_500Medium"
              style={{
                marginLeft: wp(2),
                textAlign: "left",
                fontSize: hp(2.5),
                color: colors.black,
              }}
            >
              {parseInt(start.split(":")[0]) % 12}:{start.split(":")[1]}{" "}
              {start.split(":")[0] >= 12 ? "PM" : "AM"}
            </AppText>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: hp(5),
          }}
        >
          <AppText
            font="Montserrat_500Medium"
            style={{
              textAlign: "left",
              fontSize: hp(2.5),
              color: colors.orange,
            }}
          >
            volta out:
          </AppText>
          {is_selectable === 1 ? (
            <TouchableOpacity
              style={{
                marginLeft: wp(2),
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={() => setIsTimeOutOpen(true)}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "gray",
                  paddingHorizontal: wp(5),
                  paddingVertical: hp(1),
                }}
              >
                <AppText
                  font="Montserrat_500Medium"
                  style={{
                    marginLeft: wp(2),
                    textAlign: "left",
                    fontSize: hp(2.5),
                    color: colors.black,
                  }}
                >
                  {parseInt(customTimeOut.split(":")[0]) % 12}:
                  {customTimeOut.split(":")[1]}{" "}
                  {customTimeOut.split(":")[0] >= 12 ? "PM" : "AM"}
                </AppText>
              </View>

              <Image
                style={{ width: 25, height: 25, marginLeft: wp(2) }}
                source={require("../assets/icons/clock.png")}
              />

              <DateTimePickerModal
                isVisible={isTimeOutOpen}
                mode="time"
                onConfirm={(time) => {
                  console.log(time.toLocaleTimeString());
                  setCustomTimeOut(time.toLocaleTimeString());
                  setIsTimeOutOpen(false);
                }}
                onCancel={() => {
                  setIsTimeOutOpen(false);
                }}
              />
            </TouchableOpacity>
          ) : (
            <AppText
              font="Montserrat_500Medium"
              style={{
                marginLeft: wp(2),
                textAlign: "left",
                fontSize: hp(2.5),
                color: colors.black,
              }}
            >
              {parseInt(end.split(":")[0]) % 12}:{end.split(":")[1]}{" "}
              {end.split(":")[0] >= 12 ? "PM" : "AM"}
            </AppText>
          )}
        </View>
        <View style={{}}>
          <AppText
            font="Montserrat_500Medium"
            style={{
              fontSize: hp(2.3),

              color: colors.black,
            }}
          >
            Seleziona il numero di posti per cui vuoi prenotare per {title}
          </AppText>
          <View
            style={{
              alignSelf: "center",
              marginTop: hp(3),
            }}
          >
            <Picker
              style={{
                width: wp(60),
                backgroundColor: colors.white,
              }}
              selectedValue={numberOfSeats}
              onValueChange={(itemValue, itemIndex) =>
                setNumberOfSeats(itemValue)
              }
            >
              {availableSeats.map((item, index) => {
                return <Picker.Item label={item} value={item} />;
              })}
            </Picker>
          </View>
          {is_selectable !== 1 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: hp(5),
              }}
            >
              <AppText
                font="Montserrat_500Medium"
                style={{
                  textAlign: "left",
                  fontSize: hp(2.5),
                  color: colors.orange,
                }}
              >
                Prezzo:
              </AppText>

              <AppText
                font="Montserrat_500Medium"
                style={{
                  marginLeft: wp(2),
                  textAlign: "left",
                  fontSize: hp(2.5),
                  color: colors.black,
                }}
              >
                ${price * numberOfSeats}
              </AppText>
            </View>
          )}
        </View>
        {userId ? (
          <TouchableOpacity
            style={{
              bottom: 30,
              position: "absolute",
              alignSelf: "center",
            }}
            onPress={() => {
              setOpen(true);
            }}
          >
            <View
              style={{
                alignSelf: "center",
                width: wp(85),
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.orange,
                height: hp(6),
              }}
            >
              <AppText>Book Now</AppText>
            </View>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              bottom: 30,
              position: "absolute",
              alignSelf: "center",
            }}
          >
            <ActivityIndicator size="large" color={colors.orange} />
          </View>
        )}
        <Modal isOpen={open}>
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
              height: hp(22),
              width: wp(70),
              padding: wp(4),
              paddingVertical: hp(5),
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Modal.CloseButton
              onPress={() => setOpen(false)}
            ></Modal.CloseButton>
            <AppText style={{ color: "black" }}>
              Sei sicuro di voler prenotare {numberOfSeats} posti se questo
              Evento?
            </AppText>
            <View
              style={{
                alignSelf: "center",
                // height: hp(10),
                position: "absolute",
                bottom: hp(2),
                flexDirection: "row",
                // alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  setOpen(false);
                  setLoading(false);
                }}
              >
                <AppText
                  style={{
                    marginHorizontal: wp(6),
                    color: colors.black,
                  }}
                >
                  CANCEL
                </AppText>
              </TouchableOpacity>
              {loading ? (
                <View style={{ flex: 1 }}>
                  <ActivityIndicator size="small" color={colors.orange} />
                </View>
              ) : (
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    if (userId) {
                      {
                        is_selectable !== 1 ? sendData() : sendData2();
                      }
                      setLoading(true);
                    } else {
                      alert("NO ID");
                    }
                  }}
                >
                  <AppText
                    style={{
                      marginHorizontal: wp(8),
                      color: colors.orange,
                    }}
                  >
                    Okay
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
    alignSelf: "center",
  },
});
