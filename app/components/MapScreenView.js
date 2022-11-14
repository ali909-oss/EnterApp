import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useRef, useMemo } from "react";
import MapView from "react-native-maps";
import {
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
  Callout,
} from "react-native-maps";
import AppText from "./AppText";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import TextField from "./TextField";
import axios from "axios";
const Map = ({ regions, style }) => {
  const bottomSheetRef = useRef();
  const navigation = useNavigation();
  const snapPoints = useMemo(() => ["20%", "70%"], []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  console.log("Category", category);
  const [region, setRegion] = React.useState({
    latitude: 41.8719,
    longitude: 12.5674,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });
  // console.log("MAP VIEW SCREEN REGIONS::", regions);
  const [show, setShow] = useState(-1);
  const [title, setTitle] = useState("");
  const [id, setId] = useState();
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [location, setLocation] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [venue, setVenue] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const [category, setCategory] = useState();

  const fetchCategory = async (id) => {
    const response = await axios.get(
      `https://enterapi.herokuapp.com/api/category/${id}`
    );
    setCategory(response.data[0].name);
    setCategoryLoading(false);
    console.log("CATEGORY::", response.data[0].name);
    console.log("CATEGORY ID ::", id);
  };

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        flex: 1, //the container will fill the whole screen.
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {/* {/Render our MapView/} */}
      <MapView
        initialRegion={region}
        zoomEnabled={true}
        style={[styles.map, style]}
        onRegionChangeComplete={(region) => setRegion(region)}
        provider={PROVIDER_GOOGLE}
      >
        {regions.map((data) => {
          console.log("This si sdata", data.images[0].img1);
          return (
            <Marker
              pinColor={
                data.category === 1
                  ? "green"
                  : "red" && data.category === 2
                  ? "blue"
                  : "yellow" && data.category === 3
                  ? "plum"
                  : "yellow" && data.category === 4
                  ? "aqua"
                  : "yellow" && data.category === 5
                  ? "tomato"
                  : "yellow"
              }
              coordinate={data.location}
            >
              <Callout
                style={{ marginTop: hp(13) }}
                tooltip={true}
                onPress={() => {
                  setShow(1);
                  setTitle(data.title);
                  setDescription(data.subTitle);
                  setPrice(data.price);
                  setVenue(data.venue);
                  setAddress(data.address);
                  setPlace(data.place);
                  setLocation(data.location);
                  setDate(data.date);
                  setStart(data.start);
                  setEnd(data.end);
                  fetchCategory(data.category);
                  setId(data.id);
                  setImg1(data.images[0].img1);
                  setImg2(data.images[0].img2);
                  setImg3(data.images[0].img3);
                  setImg4(data.images[0].img4);
                  setImg5(data.images[0].img5);
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignSelf: "flex-end",
                    backgroundColor: "white",
                    borderRadius: 6,
                    borderColor: "#ccc",
                    paddingHorizontal: 5,
                    width: wp(40),
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 15,
                  }}
                >
                  <Text style={styles.name}>{data.title}</Text>
                </View>
                <View style={styles.arrowBorder}></View>
                <View style={styles.arrow}></View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <BottomSheet
        enablePanDownToClose
        onClose={() => {
          setShow(-1);
          setCategoryLoading(true);
          setCategory("");
        }}
        ref={bottomSheetRef}
        index={show}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={{ paddingHorizontal: wp(5) }}>
          <Image
            style={{ width: "100%", height: hp(27), borderRadius: 5 }}
            source={{ uri: `https://enterapi.herokuapp.com/images/${img1}` }}
          />
          <TextField heading={"Title"} text={title} />
          <TextField heading={"Description"} text={description} />
          <TextField heading={"Prezza"} text={price} />
          {!categoryLoading ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("InnerViewItem", {
                  id,
                  title,
                  address,
                  images: [
                    img1 && `https://enterapi.herokuapp.com/images/${img1}`,

                    img2 && `https://enterapi.herokuapp.com/images/${img2}`,

                    img3 && `https://enterapi.herokuapp.com/images/${img3}`,

                    img4 && `https://enterapi.herokuapp.com/images/${img4}`,

                    img5 && `https://enterapi.herokuapp.com/images/${img5}`,
                  ],
                  venue,
                  location,
                  category,
                  description,
                  price,
                  place,
                  start,
                  end,
                  date,
                })
              }
            >
              <View
                style={{
                  alignSelf: "center",
                  width: wp(85),
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.orange,
                  height: hp(6),
                  marginTop: hp(2),
                }}
              >
                <AppText>View Details</AppText>
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                alignSelf: "center",
                width: wp(85),
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                height: hp(6),
                marginTop: hp(2),
              }}
            >
              <ActivityIndicator size="small" color={colors.orange} />
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: colors.white,
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    marginBottom: -15,
  },
  name: {
    fontSize: 16,
    justifyContent: "center",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 80,
  },
});

export default Map;
