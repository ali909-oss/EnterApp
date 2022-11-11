import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import axios from "axios";
import Screen from "../components/Screen";
import { VStack, HStack, Alert, NativeBaseProvider } from "native-base";
import AppText from "../components/AppText";
import { AppFormField } from "../components/forms";
import colors from "../config/colors";
import ShadowLessBtn from "../components/ShadowLessBtn";
import { NavigationContainer } from "@react-navigation/native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const validationSchema = Yup.object().shape({
  user_email: Yup.string().required().email().label("Email"),
});

export default function ForgetPassword({ navigation: { goBack } }) {
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const sendData = async (data) => {
    const res = await axios.post("https://benterapi.herokuapp.com/api/reset", {
      email_id: data,
    });
    setMessage(res.data.message);
    if (res.data.message === "Sent") {
      setStatus(1);
      setLoading(false);
    } else if (res.data.message === "User Not Found") {
      setStatus(2);
      setLoading(false);
    }
    console.log(res.data.message);
  };
  return (
    <NativeBaseProvider>
      <Screen>
        <View style={{ padding: 18, marginTop: hp(5) }}>
          <AppText size={8} style={styles.heading}>
            Password Reset
          </AppText>
          <AppText size={4} style={styles.text}>
            Enter Your email address and we'll send you intruction on how to
            reset your password.
          </AppText>
        </View>
        <View style={{ alignItems: "center" }}>
          <Formik
            initialValues={{ user_email: "" }}
            onSubmit={(values) => {
              console.log(values);
              setLoading(true);
              sendData(values.user_email);
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <>
                <AppFormField
                  title="email"
                  name="user_email"
                  autoCaptitalize="none"
                  autoCorrect={false}
                  width={90}
                  textContentType="emailAddress"
                  placeholder="Email..."
                  keyboardType="email-address"
                />
                {loading ? (
                  <View style={{ paddingVertical: 12, marginTop: hp(5) }}>
                    <ActivityIndicator size="small" color="black" />
                  </View>
                ) : (
                  <ShadowLessBtn
                    onPress={handleSubmit}
                    width={90}
                    style={{ paddingVertical: 12, marginTop: hp(5) }}
                    bgColor={colors.black}
                    title="Submit"
                  />
                )}
                <ShadowLessBtn
                  onPress={() => goBack()}
                  width={90}
                  style={{
                    paddingVertical: 12,
                    marginTop: hp(1),
                  }}
                  textStyle={{
                    color: colors.gray,
                  }}
                  bgColor={colors.white}
                  title="cancel"
                />
              </>
            )}
          </Formik>
        </View>
        {status === 1 ? (
          <Alert w="100%" status="success" style={{ position: "absolute" }}>
            <VStack space={2} flexShrink={1} w="100%">
              <TouchableOpacity onPress={() => setStatus(0)}>
                <HStack
                  flexShrink={1}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                      {message}
                    </Text>
                  </HStack>
                </HStack>
              </TouchableOpacity>
            </VStack>
          </Alert>
        ) : (
          <View></View>
        )}
        {status === 2 ? (
          <Alert w="100%" status="error" style={{ position: "absolute" }}>
            <VStack space={2} flexShrink={1} w="100%">
              <TouchableOpacity onPress={() => setStatus(0)}>
                <HStack
                  flexShrink={1}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                      {message}
                    </Text>
                  </HStack>
                </HStack>
              </TouchableOpacity>
            </VStack>
          </Alert>
        ) : (
          <View></View>
        )}
      </Screen>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  heading: {
    color: colors.black,
  },
  text: {
    color: colors.gray,
    width: wp(85),
    marginTop: hp(1),
    marginBottom: hp(2),
  },
});
