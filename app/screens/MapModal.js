import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import colors from "../config/colors";
import { Modal, Stack } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Formik } from "formik";
import { AppFormField } from "../components/forms";
import * as Yup from "yup";
import AppButton from "../components/ShadowLessBtn";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const validationSchema = Yup.object().shape({
  mapInput: Yup.string().required().label("Input"),
});

export default function MapModal({ onPress }) {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          borderRadius: 7,
          backgroundColor: "tomato",
          width: "90%",
          width: wp(90),
          height: "35%",
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Formik
          initialValues={{ mapInput: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <>
              <AppFormField
                title="zona di riecirca"
                name="mapInput"
                autoCaptitalize="none"
                autoCorrect={false}
                textContentType="text"
                placeholder="Cap a paese"
                keyboardType="text"
                width={80}
              />
              <View style={{ alignItems: "center" }}>
                <AppButton
                  onPress={() => navigation.navigate("Map")}
                  width={80}
                  style={{ paddingVertical: 12, marginTop: hp(5) }}
                  bgColor={colors.black}
                  title="Submit"
                />

                <AppButton
                  // onPress={onPress}
                  onPress={() => navigation.navigate("Home")}
                  width={80}
                  style={{
                    paddingVertical: 12,
                    marginTop: hp(1),
                  }}
                  textStyle={{
                    color: colors.gray,
                  }}
                  title="cancel"
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </>
  );
}

const styles = {
  right: {
    marginLeft: "auto",
    marginRight: 0,
  },
};
