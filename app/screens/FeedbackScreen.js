import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ShadowLessBtn from "../components/ShadowLessBtn";
import colors from "../config/colors";
export default function FeedbackScreen({ navigation: { goBack } }) {
  const [show, setShow] = useState(true);
  return (
    <Screen style={styles.container}>
      {show ? (
        <>
          <AppText size={6}> Lascia il tuo feedback</AppText>

          <AppTextInput
            textAlignVertical="top"
            style={[styles.input]}
            placeholder="Enter Your Feedback"
            multiline={true}
            numberOfLines={4}
          />
          <ShadowLessBtn
            onPress={() => {
              setShow(false);
              setTimeout(() => {
                goBack();
              }, 700);
            }}
            style={styles.btn1}
            width={90}
            bgColor={colors.black}
            title="invia"
          />
        </>
      ) : (
        <View
          style={{
            marginVertical: 40,
          }}
        >
          <AppText font="Montserrat_600SemiBold" size={7}>
            Feedback submitted!
          </AppText>
        </View>
      )}

      <ShadowLessBtn
        onPress={() => goBack()}
        style={styles.btn2}
        width={15}
        textStyle={{ color: "gray" }}
        title="salta"
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.orange,
    padding: 20,
    paddingTop: 60,
  },
  btn1: {},
  btn2: {
    position: "absolute",
    bottom: hp(10),
  },
  input: {
    marginVertical: 40,
    alignItems: "flex-start",
  },
});
