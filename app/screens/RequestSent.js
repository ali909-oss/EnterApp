import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import colors from "../config/colors";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import AppText from "../components/AppText";

export default function RequestSent({ navigation }) {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          style={{ width: wp(20), height: hp(10) }}
          source={require("../assets/animation.json")}
          autoPlay
          loop={false}
        />
        <Text
          style={{
            fontSize: 24,
            // fontWeight: "700",
            marginTop: hp(5),
            textAlign: "center",
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          La tua richiesta è stata inviata con successo
        </Text>
      </View>
      <TouchableOpacity
        style={{
          bottom: 30,
          position: "absolute",
          alignSelf: "center",
        }}
        onPress={() => navigation.navigate("Prenotazioni")}
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
          <AppText style={{ fontSize: 16, color: colors.white }}>
            Vedi la tua prenotazione
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
}
