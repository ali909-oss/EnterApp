import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import InnerTop from "../components/InnerTop";
import icon from "../assets/user.png";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Modal, NativeBaseProvider } from "native-base";
import AppText from "../components/AppText";
import InnerListItem from "../components/InnerListItem";
import InnerModal from "../components/InnerModal";
import Loader from "../components/Loader";
import axios from "axios";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Filter from "../components/Filter";
export default function InnerHome({
  navigation,
  navigation: { goBack },
  route,
}) {
  const { title, id } = route.params;

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [FilterModalopen, setFilterModalOpen] = useState(false);

  const [val, setVal] = useState(false);
  const [arr, setArr] = useState([]);
  const [location, setLocation] = useState();
  const [fiteredArr, setFiteredArr] = useState([]);
  const [filter, setFilter] = useState(true);
  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("geolocation");
      setLocation(jsonValue != null ? JSON.parse(jsonValue) : null);
      console.log(jsonValue != null ? JSON.parse(jsonValue) : null);

      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      setVal(true);
    } catch (e) {
      // error reading value
    }
  };

 
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const fetchData = async () => {
    const response = await axios.get(
      `https://enterapi.herokuapp.com/api/events/category/${id}`
    );
    // setArr(response.data);
    setFiteredArr(response.data);
    setLoading(false);
    console.log(response.data);
    setArr(response.data);
    console.log(arr);
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      fetchData();
    });
  }, []);

  useEffect(() => {
    getData();
    console.log("first");
    if (!id) {
      console.log("no ID");
    }
    if (!location) {
      console.log("no location");
    }
    if (id && location) {
      console.log("second");
      fetchData();
    }
  }, [val]);
  const images = [
    require("../assets/images/nightlife.jpg"),
    require("../assets/images/fun.jpg"),
    require("../assets/images/sport.jpg"),
    require("../assets/images/restaurant.jpg"),
    require("../assets/images/sport.jpg"),
  ];
  return (
    <NativeBaseProvider>
      <View style={{ alignItems: "center", height: "90%" }}>
        <InnerTop
          rightIcon={icon}
          pageTitle={title}
          leftPress={() => goBack()}
          rightPress={() => navigation.navigate("Main")}
        />

        <TouchableOpacity
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            width: "100%",
          }}
          onPress={
            filter
              ? () => {
                  setFilterModalOpen(true);
                  setFilter(false);
                }
              : () => {
                  setFiteredArr(arr);
                  setFilter(true);
                }
          }
        >
          <View
            style={{
              backgroundColor: colors.orange,
              justifyContent: "space-evenly",
              alignItems: "center",
              // width: wp(30),
              height: 45,
              borderRadius: 6,
              flexDirection: "row",
              marginTop: hp(1),
              marginBottom: hp(1),
              marginRight: wp(4),
            }}
          >
            <Image
              source={require("../assets/icons/filter1.png")}
              style={{
                width: 25,
                height: 25,
                marginHorizontal: wp(2),
                tintColor: "white",
              }}
            />
            <AppText
              style={{
                color: colors.white,
                marginHorizontal: wp(2),
                fontSize: hp(2.2),
              }}
            >
              {filter ? "filtro" : "Rimuovi i filtri"}
            </AppText>
          </View>
        </TouchableOpacity>

        <Modal
          isOpen={FilterModalopen}
          animationPreset={"fade"}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: wp(85),
              height: hp(55),
              borderRadius: 12,
              backgroundColor: colors.white,
            }}
          >
            <View style={{ height: hp(4) }}>
              <Modal.CloseButton
                onPress={() => {
                  setFilterModalOpen(false), setFilter(true);
                }}
              />
            </View>
            <Filter
              onCancelPress={() => {
                setFilterModalOpen(false), setFilter(true);
              }}
              onApplyPress={() => {
                setFilterModalOpen(false);
              }}
              array={arr}
              setArray={setFiteredArr}
            />
          </View>
        </Modal>

        {loading ? (
          <Loader visible={loading} />
        ) : (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[colors.orange, colors.pink, colors.green]}
                />
              }
            >
              {fiteredArr.length > 0 ? (
                fiteredArr.map((item) => {
                  return (
                    <>
                      <InnerListItem
                        title={item.title}
                        subTitle={item.subTitle}
                        image={
                          item.img1
                            ? {
                                uri:
                                  "https://enterapi.herokuapp.com/images/" +
                                  item.img1,
                              }
                            : require("../assets/images/sport.jpg")
                        }
                        carPress={() => {
                          setOpen(true);
                        }}
                        onPress={() => {
                          navigation.navigate("InnerViewItem", {
                            id: item.id,
                            title: item.title,
                            address: item.address,
                            images: [
                              item.img1 &&
                                `https://enterapi.herokuapp.com/images/${item.img1}`,

                              item.img2 &&
                                `https://enterapi.herokuapp.com/images/${item.img2}`,

                              item.img3 &&
                                `https://enterapi.herokuapp.com/images/${item.img3}`,

                              item.img4 &&
                                `https://enterapi.herokuapp.com/images/${item.img4}`,

                              item.img5 &&
                                `https://enterapi.herokuapp.com/images/${item.img5}`,
                            ],
                            venue: item.venue,
                            location: item.location,
                            category: title,
                            description: item.subTitle,
                            price: item.price,
                            place: item.place,
                            start: item.start,
                            end: item.end,
                            date: item.date,
                            is_selectable: item.is_selectable,
                          });
                          console.log(item);
                        }}
                      />
                      <Modal
                        isOpen={open}
                        animationPreset={"slide"}
                        style={styles.right}
                      >
                        <InnerModal
                          onPress={() => setOpen(false)}
                          currentLocation={item.location}
                        />
                      </Modal>
                    </>
                  );
                })
              ) : (
                <View style={{ marginTop: hp(5) }}>
                  <AppText
                    font="Montserrat_600SemiBold"
                    size={9}
                    style={{ textAlign: "center", color: colors.orange }}
                  >
                    Sfortunatamente, nessun evento da mostrare
                  </AppText>
                </View>
              )}
            </ScrollView>
          </>
        )}
      </View>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    width: wp(100),
    height: hp(7),
    backgroundColor: "black",
  },
  right: {
    position: "absolute",
    left: 100,
    bottom: 60,
  },
});
