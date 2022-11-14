import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import AppText from "../components/AppText";
import ShadowLessBtn from "../components/ShadowLessBtn";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  VStack,
  HStack,
  Alert,
  NativeBaseProvider,
  IconButton,
  CloseIcon,
  StatusBar,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import colors from "../config/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Screen from "../components/Screen";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const [token, setToken] = useState();
  const [secure, setSecure] = useState(false);
  const [loading, setLoading] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  const setExpoToken = async (val) => {
    try {
      await AsyncStorage.setItem("Expo_Token", `${val}`);
      console.log("Expo_Token", val);
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };

  const setUserID = async (val) => {
    try {
      await AsyncStorage.setItem("USER_ID", `${val}`);
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };
  const storeUserData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("USER", jsonValue);
    } catch (e) {
      // saving error
      alert("Failed to save the data to the storage");
      // console.log("saving Error::", e);
    }
  };
  const sendExpoToken = async (id, token) => {
    const response = await axios.post(
      "https://enterapi.herokuapp.com/api/device",
      {
        user_id: id,
        device_id: token,
      }
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    console.log("Expo Token", response.data);
  };

  const fetchData = async (data) => {
    const res = await axios.post(
      "https://enterapi.herokuapp.com/auth/login",
      data
    );
    console.log(res.data);
    setUserID(res.data.data.id);
    storeUserData(res.data.data);
    setMessage(res.data.message);
    if (res.data.message === "Logged in") {
      navigation.navigate("TabNavigator");
      setExpoToken(token);
      sendExpoToken(res.data.data.id, token);

      setLoading(false);
      console.log("LOGGED IN EXPO TOKEN ", token);
    } else {
      setLoading(false);
      setStatus(1);
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    setToken(token);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        showBadge: true,
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      console.log(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor={colors.orange} />
      <Screen style={styles.container}>
        <ScrollView>
          <View style={styles.heading}>
            <AppText size={6} style={{ color: colors.black }}>
              Login
            </AppText>
          </View>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              fetchData(values);
              setLoading(true);
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <View style={styles.InputContainer}>
                <AppFormField
                  name="email"
                  title={"Email"}
                  autoCaptitalize="none"
                  autoCorrect={false}
                  textContentType="emailAddress"
                  placeholder="Email..."
                  keyboardType="email-address"
                />
                <AppFormField
                  name="password"
                  title={"password"}
                  autoCaptitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  placeholder="Password..."
                  secureTextEntry={secure}
                  keyboardType="default"
                  img={true}
                  setSecure={setSecure}
                  secure={secure}
                />

                <View style={{ alignItems: "center" }}>
                  {loading ? (
                    <View style={{ paddingVertical: 12, marginTop: hp(5) }}>
                      <ActivityIndicator size="small" color={colors.orange} />
                    </View>
                  ) : (
                    <ShadowLessBtn
                      onPress={handleSubmit}
                      width={90}
                      style={{ paddingVertical: 12, marginTop: hp(5) }}
                      bgColor={colors.orange}
                      title="Login"
                    />
                  )}
                  <TouchableWithoutFeedback
                    style={styles.textBtn}
                    onPress={() => navigation.navigate("ForgetPassword")}
                  >
                    <AppText style={styles.text}>password dimenticata?</AppText>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate("Register")}
                  >
                    <AppText style={styles.text}>ISCRIVITI</AppText>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
        {status === 1 ? (
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
  container: {
    flex: 1,
  },
  heading: {
    alignItems: "center",
    marginTop: hp(5),
  },
  InputContainer: {
    marginVertical: hp(5),
  },
  text: {
    color: colors.gray,
    marginTop: hp(2.5),
  },
});
