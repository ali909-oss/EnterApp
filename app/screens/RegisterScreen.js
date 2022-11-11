import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import AppText from "../components/AppText";
import ShadowLessBtn from "../components/ShadowLessBtn";
import { AppFormField } from "../components/forms";
import colors from "../config/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Screen from "../components/Screen";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import {
  VStack,
  HStack,
  Alert,
  NativeBaseProvider,
  ScrollView,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string()
    .required()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .label("Password"),
  user_name: Yup.string().required().label("Full Name"),
  phone: Yup.string().required().label("Numero di telefono"),
});

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      // saving error
      console.log("saving Error::", e);
    }
  };
  const sendData = async (data) => {
    const res = await axios.post("https://benterapi.herokuapp.com/auth", data);
    // storeData(data);
    console.log(res.status, res.data, res.data.message);
    setMessage(res.data.message);

    if (res.data.message === "User created") {
      navigation.navigate("Login");
      setStatus(0);
      setLoading(false);
    } else {
      setLoading(false);
      setStatus(1);
    }
  };
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor={colors.orange} />
      <Screen style={styles.container}>
        <ScrollView>
          <View style={styles.heading}>
            <AppText size={5} style={{ color: colors.black }}>
              Iscriviti
            </AppText>
          </View>
          <Formik
            initialValues={{
              email: "",
              password: "",
              user_name: "",
              phone: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              sendData(values);
              setLoading(true);
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <KeyboardAvoidingView>
                <AppFormField
                  title="email"
                  name="email"
                  autoCaptitalize="none"
                  autoCorrect={false}
                  textContentType="emailAddress"
                  placeholder="Email..."
                  keyboardType="email-address"
                />
                <AppFormField
                  title="password"
                  name="password"
                  autoCaptitalize="none"
                  autoCorrect={false}
                  textContentType="text"
                  placeholder="Password..."
                  keyboardType="password"
                />
                <AppFormField
                  title="full name"
                  name="user_name"
                  autoCaptitalize="none"
                  autoCorrect={false}
                  textContentType="text"
                  placeholder="Name e cognome"
                  keyboardType="text"
                />
                <AppFormField
                  title="numero di telefono"
                  name="phone"
                  textContentType=""
                  placeholder="Numero di telefono..."
                  keyboardType="numeric"
                />

                <View style={{ alignItems: "center" }}>
                  {loading ? (
                    <View style={{ paddingVertical: 12, marginTop: hp(8) }}>
                      <ActivityIndicator size="small" color={colors.orange} />
                    </View>
                  ) : (
                    <ShadowLessBtn
                      onPress={handleSubmit}
                      width={90}
                      style={{ paddingVertical: 12, marginTop: hp(8) }}
                      bgColor={colors.orange}
                      title="Iscrviti"
                    />
                  )}

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <AppText style={styles.text}>Hai GIa Un account?</AppText>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            )}
          </Formik>
        </ScrollView>
        {status === 1 ? (
          <Alert w="100%" status="" style={{ position: "absolute", top: 0 }}>
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
  container: {
    flex: 1,
  },
  heading: {
    alignItems: "center",
    marginTop: hp(5),
  },
  InputContainer: {
    marginTop: hp(5),
    paddingHorizontal: 20,
  },
  text: {
    color: colors.gray,
    marginTop: hp(2.5),
    marginBottom: hp(2.5),
  },
});
