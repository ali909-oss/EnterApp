import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import InnerTop from "../components/DetailsTop";
import Slider from "../components/Slider";
// import MapView from "react-native-maps";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import TextField from "../components/TextField";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import Map from "../components/Map";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setNestedObjectValues } from "formik";
import { set } from "lodash";
export default function ListItemViewScreen({
  navigation,
  navigation: { goBack },
  route,
}) {
  const getUserID = async (val) => {
    try {
      const id = await AsyncStorage.getItem("USER_ID");
      setUserId(id);
    } catch (e) {
      alert("Failed to get the data to the storage");
    }
  };
  const [userLocation, setUserLocation] = useState({});
  const [distance, setDistance] = useState(0);
  const [val, setVal] = useState(false);
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    id,
    title,
    address,
    venue,
    location,
    images,
    description,
    start,
    end,
    date,
    price,
    place,
    is_selectable,
    category,
  } = route.params;

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("geolocation");
      console.log(jsonValue, "json")
      setUserLocation(jsonValue != null ? JSON.parse(jsonValue) : null);

      setVal(true);
    } catch (e) {
      // error reading value
    }
  };
  const getDistance = async () => {


    console.log(userLocation, "location")
    const response = await axios.get(
      `https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix?origins=${userLocation.latitude},${userLocation.longitude}&destinations=${location.latitude},${location.longitude}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "0cb61e2826msh031b587a300f448p12ff88jsna372dc1d4dbb",
          "X-RapidAPI-Host": "trueway-matrix.p.rapidapi.com",
        },
      }
    );
    if (response) {
      console.log(response.data, "data")
      setDistance(response.data.distances[0][0]);
    }
  };
  console.log("this is images", images);
  console.log("this is User ", userId);
  console.log("this is Category", category);

  const region = [
    {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  ];
  useEffect(() => {
    getData();
    getUserID();
    if (val) {
      getDistance();
    }
  }, [val]);

  return (
    <>
      <InnerTop onPress={() => goBack()} title={"details"} />
      <ScrollView>
        <Slider
          images={images.filter(function (el) {
            return el != null;
          })}
        />
        <ScrollView style={styles.dataContainer}>
          <TextField heading={"Nome attività"} text={title} />
          <TextField heading={"Category"} text={category} />
          <TextField heading={"Indirizzo"} text={`${venue}\n${address}`} />

          {is_selectable !== 1 && <TextField heading={"Prezzo"} text={price} />}
          <TextField heading={"il luogo"} text={place} />
          <TextField
            heading={"Distanza"}
            text={(distance / 1000).toFixed(2) + " Km"}
          />
          <TextField heading={"Descrizione"} text={description} />
        </ScrollView>
        <View
          style={{
            alignItems: "center",
            marginTop: hp(1),
          }}
        >
          {userId ? (
            <AppButton
              onPress={() => {
                setLoading(true);
                navigation.navigate("BookNow", {
                  id,
                  user_id: userId,
                  title,
                  venue,
                  address,
                  description,
                  price,
                  place,
                  category,
                  start,
                  end,
                  date,
                  is_selectable,
                });
              }}
              title={"prenota ora"}
              width={50}
              bgColor={colors.orange}
            />
          ) : (
            <AppButton
              onPress={() => navigation.navigate("Register")}
              title={"ISCRIVITI"}
              width={50}
              bgColor={colors.orange}
            />
          )}
        </View>

        <View style={{ marginTop: hp(28), marginBottom: hp(2) }}>
          <Map regions={region} style={{ height: hp(27) }} />
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  dataContainer: {
    elevation: 6,
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
    width: wp(92),
    paddingBottom: hp(2),
    marginTop: hp(1),
  },
});
