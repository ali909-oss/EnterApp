import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../config/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ListItem from "../components/ListItem";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Top from "../components/Top";
import axios from "axios";
import InnerListItem from "../components/InnerListItem";
import { Modal, NativeBaseProvider } from "native-base";
import { Colors } from "react-native/Libraries/NewAppScreen";
export default function NewHomeScreen({ navigation }) {
  const [FilterModalopen, setFilterModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const fetchData = async () => {
    const res = await axios.get(`https://enterapi.herokuapp.com/api/category`);
    console.log("This is the response", res.data);
    setListingArr(res.data);
    console.log(res.data);
    setRawArr(res.data);
    setLoading(false);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      fetchData();
    });
  }, []);

  const [rawArray, setRawArr] = useState([]);
  const [listingArr, setListingArr] = useState([]);

  const filterByCategory = (val) => {
    setListingArr(
      rawArray.filter((item) =>
        item.name.toLocaleLowerCase().includes(val.toLocaleLowerCase())
      )
    );
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          style={{
            height: 85,
            width: 310,
            marginTop: hp(6),
            marginBottom: hp(1),
          }}
          source={require("../assets/beenter.png")}
        />
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={colors.orange} />
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => setFilterModalOpen(true)}>
                <View style={{ marginTop: hp(2), marginBottom: hp(1) }}>
                  <AppText
                    font="Montserrat_600SemiBold"
                    style={{ fontSize: hp(3), color: colors.black }}
                  >
                    Cosa vuoi fare?
                  </AppText>
                </View>
              </TouchableOpacity>
              {visible ? (
                <TouchableOpacity
                  onPress={() => {
                    setListingArr(rawArray), setVisible(false), setCategory("");
                  }}
                >
                  <View
                    style={{
                      marginTop: hp(2),
                      marginLeft: wp(5),
                      marginBottom: hp(1),
                    }}
                  >
                    <AppText style={{ fontSize: hp(2), color: colors.orange }}>
                      Clear Filters?
                    </AppText>
                  </View>
                </TouchableOpacity>
              ) : (
                <View></View>
              )}
            </View>

            <View
              style={{
                height: hp(67),
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  flexDirection: "row",
                  marginHorizontal: wp(7),
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[colors.orange, colors.pink, colors.green]}
                  />
                }
              >
                {listingArr.length !== 1
                  ? listingArr.map((item) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("InnerHome", {
                              title: item.name,
                              id: item.id,
                            });
                          }}
                        >
                          <View
                            style={[
                              styles.card,
                              {
                                marginTop: hp(1),
                                borderWidth: 1,
                                backgroundColor: "red",
                                marginHorizontal: wp(1.3),
                              },
                            ]}
                          >
                            <Image
                              style={styles.card}
                              source={{
                                uri:
                                  "https://enterapi.herokuapp.com/images/" +
                                  item.main_image,
                              }}
                            />
                            <View
                              style={{
                                position: "absolute",
                                bottom: hp(1.5),
                                alignSelf: "center",
                              }}
                            >
                              <AppText
                                font="Montserrat_600SemiBold"
                                style={styles.cardText}
                              >
                                {item.name}
                              </AppText>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })
                  : listingArr.map((item) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("InnerHome", {
                              title: item.name,
                              id: item.id,
                            });
                          }}
                        >
                          <View
                            style={[
                              styles.singleCard,
                              { marginTop: hp(1), marginHorizontal: wp(1.3) },
                            ]}
                          >
                            <Image
                              style={styles.singleCard}
                              source={item.image}
                            />
                            <View
                              style={{
                                position: "absolute",
                                bottom: hp(1.5),
                                alignSelf: "center",
                              }}
                            >
                              <AppText
                                font="Montserrat_600SemiBold"
                                style={styles.singleCardText}
                              >
                                {item.name}{" "}
                              </AppText>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
              </ScrollView>
            </View>
          </>
        )}
      </View>
      <Modal
        isOpen={FilterModalopen}
        animationPreset={"fade"}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginLeft: wp(2),
            height: hp(24),
            borderRadius: 10,
            width: wp(80),
            backgroundColor: "white",
            paddingHorizontal: wp(3),
            paddingVertical: hp(3),
          }}
        >
          <AppText
            style={{
              fontSize: hp(2.1),
              color: colors.orange,
              marginBottom: hp(1),
            }}
          >
            Entra nella categoria
          </AppText>
          <TextInput
            style={{
              paddingHorizontal: wp(3),
              borderRadius: 5,
              height: 40,
              backgroundColor: "white",
              elevation: 5,
            }}
            onChangeText={(text) => {
              setCategory(text.toLocaleLowerCase());
            }}
          />
          <View
            style={{
              height: hp(10),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity onPress={() => setFilterModalOpen(false)}>
              <AppText
                style={{
                  fontSize: hp(2),
                  color: colors.gray,
                }}
              >
                Cancel
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                filterByCategory(category);
                setFilterModalOpen(false);
                setVisible(true);
              }}
            >
              <AppText
                style={{
                  fontSize: hp(2.2),
                  color: colors.orange,
                }}
              >
                Apply
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  card: {
    height: hp(20),
    width: wp(40),
    borderRadius: 12,
    resizeMode:'cover'
  },
  singleCard: {
    height: hp(50),
    width: wp(85),
    backgroundColor: "red",
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: hp(1),
    marginHorizontal: wp(2),
  },
  cardText: {
    textAlign: "center",
    fontSize: 19,

    color: colors.white,
  },
  singleCardText: {
    textAlign: "center",
    fontSize: 28,
    color: colors.white,
  },

  Liveholder: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignSelf: "center",
  },
});
