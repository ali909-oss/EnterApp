import { useState, useCallback } from "react";
import React from "react";
import DistanceRangeSlider from "./DistanceRangeSlider";
import PriceRangeSlider from "./PriceRangeSlider";

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { NativeBaseProvider } from "native-base";
import { Select, Box, Center } from "native-base";
import AppText from "./AppText";
import Compo from "./compo";
import colors from "../config/colors";
import { filter } from "lodash";

const Filter = ({ onCancelPress, array, setArray, onApplyPress }) => {
  const [Status, setStatus] = useState([]);

  let [service, setService] = React.useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  //   setArray(items);
  const [distance, setDistance] = useState(0);
  const [category, setCategory] = useState("");
  const [place, setPlace] = useState("");
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinP] = useState(10);
  const [maxPrice, setMaxP] = useState(29);
  const [minDistance, setMinD] = useState(12);
  const [maxDistance, setMaxD] = useState(31);
  console.log(array, "THIS IS ARRAY");

  const setMinPrice = (ss) => {
    setMinP(ss);
  };
  const setMaxPrice = (ss) => {
    setMaxP(ss);
  };
  const setMinDistance = (ss) => {
    setMinD(ss);
  };
  const setMaxDistance = (ss) => {
    setMaxD(ss);
  };

  const filterByDistance = (minVal, maxVal) => {
    if (maxVal) {
      return array.filter(
        (value) =>
          Number(maxVal) > Number(value.distance) &&
          Number(value.distance) > Number(minVal)
      );
    } else {
      return [];
    }
  };
  
  const filterByCategory = (val) => {
    if (val) {
      return array.filter((value) =>
        value.title.toLocaleLowerCase().includes(val)
      );
    } else {
      return [];
    }
  };
  const filterByPlace = (val) => {
    if (val) {
      return array.filter((value) =>
        value.place.toLocaleLowerCase().includes(val)
      );
    } else {
      return [];
    }
  };
  const filterByPrice = (minVal, maxVal) => {
    if (maxVal) {
      return array.filter((e) => e.price > minVal && e.price < maxVal);
    } else {
      return [];
    }
  };

  const filterByKeyword = (val) => {
    if (val) {
      return array.filter((value) => {
        return (
          value.title.toLocaleLowerCase().includes(val) ||
          value.subTitle.toLocaleLowerCase().includes(val)
        );
      });
    } else {
      return [];
    }
  };

  const onApply = (
    category,
    keyword,
    place,
    minPrice,
    maxPrice,
    minDistance,
    maxDistance
  ) => {
    let filtered = [];

    filtered = new Set([
      ...filterByCategory(category),

      ...filterByKeyword(keyword),
      ...filterByPlace(place),
      ...filterByPrice(minPrice, maxPrice),
      ...filterByDistance(minDistance, maxDistance),
    ]);
    // filtered = new Set([...filterByKeyword(keyword), ...filtered]);
    // filtered = new Set([
    //   ...filterByDistance(minDistance, maxDistance),
    //   ...filtered,
    // ]);
    // filtered = new Set([...filterByPrice(minPrice, maxPrice), ...filtered]);
    // filtered = new Set([...filterByPlace(place), ...filtered]);
    console.log([...filtered]);
    setArray([...filtered]);
    // setArray(
    //   array
    //     .filter(
    //       (value) =>
    //         Number(maxDistance) > Number(value.distance) &&
    //         Number(value.distance) > Number(minDistance)
    //     )
    //     .filter((value) => value.title.toLocaleLowerCase().includes(category))
    //     .filter((value) => value.place.toLocaleLowerCase().includes(place))
    //     .filter((e) => e.price > minPrice && e.price < maxPrice)
    //     .filter((value) => {
    //       return (
    //         value.title.toLocaleLowerCase().includes(keyword) ||
    //         value.subTitle.toLocaleLowerCase().includes(keyword)
    //       );
    //     })
    // );
    onApplyPress();
  };

  // console.log(minPrice, "price", maxPrice);
  // console.log(minDistance, "distance", maxDistance);
  // function Nestedifelse(value) {
  //   if (value === "Sub-Category") {
  //     return (
  //       <View style={{ marginTop: hp(2), paddingHorizontal: wp(3) }}>
  //         <AppText
  //           style={{
  //             fontSize: hp(2.1),
  //             color: colors.orange,
  //             marginBottom: hp(1),
  //           }}
  //         >
  //           Enter the Sub-Category
  //         </AppText>
  //         <TextInput
  //           style={{
  //             paddingHorizontal: wp(3),
  //             borderRadius: 5,
  //             height: 40,
  //             backgroundColor: "white",
  //             elevation: 5,
  //           }}
  //           onChangeText={(text) => setCategory(text.toLocaleLowerCase())}
  //         />
  //         <View
  //           style={{
  //             height: hp(10),
  //             flexDirection: "row",
  //             alignItems: "center",
  //             justifyContent: "space-around",
  //           }}
  //         >
  //           <TouchableOpacity onPress={onCancelPress}>
  //             <AppText
  //               style={{
  //                 //   marginHorizontal: wp(2),
  //                 fontSize: hp(2),
  //                 color: colors.gray,
  //               }}
  //             >
  //               Cancel
  //             </AppText>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             onPress={() => {
  //               filterByCategory(category), onApplyPress();
  //             }}
  //           >
  //             <AppText
  //               style={{
  //                 //   marginHorizontal: wp(6),
  //                 fontSize: hp(2.2),
  //                 color: colors.orange,
  //               }}
  //             >
  //               Apply
  //             </AppText>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     );
  //   } else if (value === "Budget") {
  //     return (
  //       <View style={{ marginTop: hp(2), paddingHorizontal: wp(3) }}>
  //         <AppText
  //           style={{
  //             fontSize: hp(2.1),
  //             color: colors.orange,
  //             marginBottom: hp(1),
  //           }}
  //         >
  //           Enter Your Budget ${minPrice} - ${maxPrice}
  //         </AppText>
  //         <RangeSlider
  //           boundaryMinP={10}
  //           boundaryMaxP={500}
  //           initValMinP={50}
  //           initValMaxP={380}
  //           setMinDistance={(e) => setMinDistance(e)}
  //           setMaxDistance={(e) => setMaxDistance(e)}
  //           setMinPrice={(e) => setMinPrice(e)}
  //           setMaxPrice={(e) => setMaxPrice(e)}
  //           minPrice={minPrice}
  //           prefix={"$"}
  //           ColorHighlight={colors.orange}
  //         />

  //         <View
  //           style={{
  //             height: hp(10),
  //             flexDirection: "row",
  //             alignItems: "center",
  //             justifyContent: "space-around",
  //           }}
  //         >
  //           <TouchableOpacity onPress={onCancelPress}>
  //             <AppText
  //               style={{
  //                 //   marginHorizontal: wp(2),
  //                 fontSize: hp(2),
  //                 color: colors.gray,
  //               }}
  //             >
  //               Cancel
  //             </AppText>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             onPress={() => {
  //               filterByPrice(minPrice, maxPrice), onApplyPress();
  //             }}
  //           >
  //             <AppText
  //               style={{
  //                 //   marginHorizontal: wp(6),
  //                 fontSize: hp(2.2),
  //                 color: colors.orange,
  //               }}
  //             >
  //               Apply
  //             </AppText>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     );
  //   } else if (value === "Distance") {
  //     return (
  //       <View style={{ marginTop: hp(2), paddingHorizontal: wp(3) }}>
  //         <AppText
  //           style={{
  //             fontSize: hp(2.1),
  //             color: colors.orange,
  //             marginBottom: hp(1),
  //           }}
  //         >
  //           Event Distance's Range is {minDistance} to {maxDistance}
  //         </AppText>
  //         <RangeSlider
  //           name="Distance"
  //           boundaryMinP={1}
  //           boundaryMaxP={100}
  //           initValMinP={12}
  //           initValMaxP={68}
  //           setMinDistance={(e) => setMinDistance(e)}
  //           setMaxDistance={(e) => setMaxDistance(e)}
  //           setMinPrice={(e) => setMinPrice(e)}
  //           setMaxPrice={(e) => setMaxPrice(e)}
  //           suffix={"kms"}
  //           ColorHighlight={colors.orange}
  //         />

  //         <View
  //           style={{
  //             height: hp(10),
  //             flexDirection: "row",
  //             alignItems: "center",
  //             justifyContent: "space-around",
  //           }}
  //         >
  //           <TouchableOpacity onPress={onCancelPress}>
  //             <AppText
  //               style={{
  //                 //   marginHorizontal: wp(2),
  //                 fontSize: hp(2),
  //                 color: colors.gray,
  //               }}
  //             >
  //               Cancel
  //             </AppText>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             onPress={() => {
  //               filterByDistance(minDistance, maxDistance), onApplyPress();
  //             }}
  //           >
  //             <AppText
  //               style={{
  //                 //   marginHorizontal: wp(6),
  //                 fontSize: hp(2.2),
  //                 color: colors.orange,
  //               }}
  //             >
  //               Apply
  //             </AppText>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     );
  //   } else if (value === "Places") {
  //     return (
  //       <View style={{ marginTop: hp(2), paddingHorizontal: wp(3) }}>
  //         <AppText
  //           style={{
  //             fontSize: hp(2.1),
  //             color: colors.orange,
  //             marginBottom: hp(1),
  //           }}
  //         >
  //           Enter your place
  //         </AppText>
  //         <TextInput
  //           style={{
  //             paddingHorizontal: wp(3),
  //             borderRadius: 5,
  //             height: 40,
  //             backgroundColor: "white",
  //             elevation: 5,
  //           }}
  //           onChangeText={(text) => setPlace(text.toLocaleLowerCase())}
  //         />
  //         <View
  //           style={{
  //             height: hp(10),
  //             flexDirection: "row",
  //             alignItems: "center",
  //             justifyContent: "space-around",
  //           }}
  //         >
  //           <TouchableOpacity onPress={onCancelPress}>
  //             <AppText
  //               style={{
  //                 fontSize: hp(2),
  //                 color: colors.gray,
  //               }}
  //             >
  //               Cancel
  //             </AppText>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             onPress={() => {
  //               filterByPlace(place), onApplyPress();
  //             }}
  //           >
  //             <AppText
  //               style={{
  //                 fontSize: hp(2.2),
  //                 color: colors.orange,
  //               }}
  //             >
  //               Apply
  //             </AppText>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     );
  //   } else {
  //     return (
  //       <View style={{ marginTop: hp(2), paddingHorizontal: wp(3) }}>
  //         <AppText
  //           style={{
  //             fontSize: hp(2.1),
  //             color: colors.orange,
  //             marginBottom: hp(1),
  //           }}
  //         >
  //           Enter the Keywords
  //         </AppText>
  //         <TextInput
  //           style={{
  //             paddingHorizontal: wp(3),
  //             borderRadius: 5,
  //             height: 40,
  //             backgroundColor: "white",
  //             elevation: 5,
  //           }}
  //           onChangeText={(text) => setKeyword(text.toLocaleLowerCase())}
  //         />
  //         <View
  //           style={{
  //             height: hp(10),
  //             flexDirection: "row",
  //             alignItems: "center",
  //             justifyContent: "space-around",
  //           }}
  //         >
  //           <TouchableOpacity onPress={onCancelPress}>
  //             <AppText
  //               style={{
  //                 //   marginHorizontal: wp(2),
  //                 fontSize: hp(2),
  //                 color: colors.gray,
  //               }}
  //             >
  //               Cancel
  //             </AppText>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             onPress={() => {
  //               filterByKeyword(keyword), onApplyPress();
  //             }}
  //           >
  //             <AppText
  //               style={{
  //                 //   marginHorizontal: wp(6),
  //                 fontSize: hp(2.2),
  //                 color: colors.orange,
  //               }}
  //             >
  //               Apply
  //             </AppText>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     );
  //   }
  // else {
  //   return (
  //     <TouchableOpacity
  //       style={{ marginTop: hp(15), marginLeft: wp(50) }}
  //       onPress={onCancelPress}
  //     >
  //       <AppText
  //         style={{
  //           //   marginHorizontal: wp(2),
  //           fontSize: hp(2.4),
  //           color: colors.orange,
  //         }}
  //       >
  //         Cancel
  //       </AppText>
  //     </TouchableOpacity>
  //   );
  // }
  // }

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={{ marginTop: hp("2%") }}>
          {/* <View style={styles.main}> */}
          <ScrollView>
            <AppText font="Montserrat_600SemiBold" style={styles.texta}>
              Filtra PER
            </AppText>
            <View style={{ marginTop: hp(2), paddingHorizontal: wp(3) }}>
              <AppText
                font="Montserrat_500Medium"
                style={{
                  fontSize: hp(2.1),
                  color: colors.orange,
                  marginBottom: hp(1),
                }}
              >
                sottocategoria
              </AppText>
              <TextInput
                style={{
                  paddingHorizontal: wp(3),
                  borderRadius: 5,
                  height: 40,
                  backgroundColor: "white",
                  elevation: 5,
                }}
                onChangeText={(text) => setCategory(text.toLocaleLowerCase())}
              />
              <View style={{ marginTop: hp(2) }}>
                <AppText
                  font="Montserrat_500Medium"
                  style={{
                    fontSize: hp(2.1),
                    color: colors.orange,
                    marginBottom: hp(1),
                  }}
                >
                  Parola chiave
                </AppText>
                <TextInput
                  style={{
                    paddingHorizontal: wp(3),
                    borderRadius: 5,
                    height: 40,
                    backgroundColor: "white",
                    elevation: 5,
                  }}
                  onChangeText={(text) => setKeyword(text.toLocaleLowerCase())}
                />
              </View>

              <View style={{ marginTop: hp(2) }}>
                <AppText
                  font="Montserrat_500Medium"
                  style={{
                    fontSize: hp(2.1),
                    color: colors.orange,
                    marginBottom: hp(1),
                  }}
                >
                  posto
                </AppText>
                <TextInput
                  style={{
                    paddingHorizontal: wp(3),
                    borderRadius: 5,
                    height: 40,
                    backgroundColor: "white",
                    elevation: 5,
                  }}
                  onChangeText={(text) => setPlace(text.toLocaleLowerCase())}
                />
              </View>
              <View style={{ marginTop: hp(2) }}>
                <AppText
                  font="Montserrat_500Medium"
                  style={{
                    fontSize: hp(2.1),
                    color: colors.orange,
                    marginBottom: hp(1),
                  }}
                >
                  bilancio ${minPrice} - ${maxPrice}
                </AppText>
                <PriceRangeSlider
                  boundaryMinP={10}
                  boundaryMaxP={500}
                  initValMinP={0}
                  initValMaxP={20}
                  setMinPrice={(e) => setMinPrice(e)}
                  setMaxPrice={(e) => setMaxPrice(e)}
                  minPrice={minPrice}
                  prefix={"$"}
                  ColorHighlight={colors.orange}
                />
              </View>
              <View style={{ marginTop: hp(2) }}>
                <AppText
                  font="Montserrat_500Medium"
                  style={{
                    fontSize: hp(2.1),
                    color: colors.orange,
                    marginBottom: hp(1),
                  }}
                >
                  Distanza {minDistance} kms to {maxDistance} kms
                </AppText>
                <View style={{ paddingHorizontal: wp(2) }}>
                  <DistanceRangeSlider
                    name="Distance"
                    boundaryMinP={0}
                    boundaryMaxP={100}
                    initValMinP={0}
                    initValMaxP={10}
                    setMinDistance={(e) => setMinDistance(e)}
                    setMaxDistance={(e) => setMaxDistance(e)}
                    suffix={"kms"}
                    ColorHighlight={colors.orange}
                  />
                </View>
              </View>
              <View
                style={{
                  height: hp(10),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity onPress={onCancelPress}>
                  <AppText
                    style={{
                      //   marginHorizontal: wp(2),
                      fontSize: hp(2),
                      color: colors.gray,
                    }}
                  >
                    Cancel
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onApply(
                      category,
                      keyword,
                      place,
                      minPrice,
                      maxPrice,
                      minDistance,
                      maxDistance
                    );
                  }}
                >
                  <AppText
                    font="Montserrat_600SemiBold"
                    style={{
                      //   marginHorizontal: wp(6),
                      fontSize: hp(2.2),
                      color: colors.orange,
                    }}
                  >
                    Apply
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      {/* </View> */}
    </NativeBaseProvider>
  );
};
export default Filter;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    // height: hp(60),
  },
  img: {
    width: wp("100%"),
    height: hp("8%"),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  text: {
    fontSize: 22,
    color: "white",
    padding: 5,
  },
  header: {
    flex: 1,
  },
  main: {
    width: wp("75%"),
    height: hp(60),
    borderRadius: 10,
    alignSelf: "center",
  },
  texta: {
    fontSize: 22,
    color: colors.orange,
    marginLeft: wp("3%"),
    padding: 1,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: "#ffffff",
    width: wp("80%"),
    height: hp("6%"),
    backgroundColor: "#ffffff",
    alignSelf: "center",
    textAlign: "left",
    borderWidth: 0.5,
    borderColor: "black",
    zIndex: 1,
  },
  textt: {
    color: "white",
    fontSize: 18,
  },
  btn1: {
    width: wp("70%"),
    height: hp("7%"),
    marginLeft: wp("15%"),
    marginTop: hp("5%"),
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
