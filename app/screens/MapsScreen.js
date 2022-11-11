import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../config/colors";
import { Select, NativeBaseProvider } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppText from "../components/AppText";
import Map from "../components/MapScreenView";
import Loader from "../components/Loader";
import axios from "axios";
import Legend from "../components/Legend";

const MapsScreen = ({ navigation }) => {
  const [arr, setArr] = useState([]);

  const [categories, setCategories] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(
      "https://benterapi.herokuapp.com/api/events"
    );
    setArr(response.data);
    setNewArr(response.data);
    setLoading(false);

    console.log(response.data[0].images[0].img1);
    console.log(response.data);
  };

  const fetchLegends = async () => {
    const res = await axios.get(`https://benterapi.herokuapp.com/api/category`);
    console.log("This is the response", res.data);

    setCategories(res.data);
  };

  const [region, setRegion] = useState("");
  const [count, setCount] = useState(0);
  const [newArr, setNewArr] = useState(arr);
  // console.log(newArr);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    fetchLegends();
  }, []);

  const filterFun = (e) => {
    e === "all"
      ? (setNewArr(arr), fetchData())
      : setNewArr(arr.filter((item) => item.category == e));
  };

  const [value, setValue] = useState("");
  // FilterArr();
  return (
    <NativeBaseProvider>
      {loading ? <Loader visible={loading} /> : <Map regions={newArr} />}
      <>
        <StatusBar backgroundColor={colors.orange} />
        <View style={[styles.header, { backgroundColor: colors.orange }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Feedback")}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginRight: wp(8),
                  tintColor: colors.white,
                }}
                source={require("../assets/icons/feedback.png")}
              />
            </TouchableOpacity>
            <AppText
              size={6}
              style={{ textTransform: "uppercase", color: colors.white }}
            >
              Mappa
            </AppText>
          </View>
          <View>
            <Select
              shadow={"1"}
              borderColor={colors.orange}
              selectedValue={value}
              width={40}
              accessibilityLabel="Seleziona categoria"
              placeholder="Seleziona categoria"
              placeholderTextColor={colors.white}
              color={colors.white}
              onValueChange={(itemValue) => {
                setRegion(itemValue);
                setValue(itemValue);
                filterFun(itemValue);
              }}
            >
              {categories.map((item) => (
                <Select.Item label={item.name} value={item.id} />
              ))}

              <Select.Item label="ALL" value={"all"} />
            </Select>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            paddingVertical: hp(2),
            paddingRight: wp(7),
            paddingLeft: wp(1),
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((item) => (
              <Legend
                title={item.name}
                color={
                  item.id === 1
                    ? "green"
                    : "red" && item.id === 2
                    ? "blue"
                    : "yellow" && item.id === 3
                    ? "plum"
                    : "yellow" && item.id === 4
                    ? "aqua"
                    : "yellow" && item.id === 5
                    ? "tomato"
                    : "yellow"
                }
              />
            ))}
          </ScrollView>
        </View>
      </>
      {/* <MapTop leftPress={() => navigation.navigate("Feedback")} /> */}
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  right: {
    marginLeft: "auto",
    marginRight: 0,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(100),
    height: hp(10),
    elevation: 10,
  },
});
export default MapsScreen;
