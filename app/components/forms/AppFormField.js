import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useFormikContext } from "formik";
import AppTextInput from "../AppTextInput";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ErrorMessage from "./ErrorMessage";
import AppText from "../AppText";
import colors from "../../config/colors";
export default function AppFormField({
  title,
  name,
  img = false,
  secure,
  width = 80,
  setSecure,
  ...otherProps
}) {
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext();
  return (
    <View style={styles.InputContainer}>
      <AppText size={4} style={{ color: colors.black }}>
        {title}
      </AppText>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: hp(1),
          borderWidth: 0.5,
          borderColor: "gray",
          borderRadius: 10,
          height: hp(7),
        }}
      >
        <AppTextInput
          style={{
            borderWidth: 0,
            width: wp(width),
          }}
          onChangeText={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
        />
        {img && (
          <TouchableOpacity
            onPress={() => {
              console.log("first");
              setSecure(!secure);
            }}
          >
            {secure ? (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  left: wp(2),
                  tintColor: colors.gray,
                }}
                source={require("../../assets/icons/invisible.png")}
              />
            ) : (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  left: wp(2),
                  tintColor: colors.orange,
                }}
                source={require("../../assets/icons/eye.png")}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      <ErrorMessage message={errors[name]} visible={touched[name]} />
    </View>
  );
}
const styles = StyleSheet.create({
  InputContainer: {
    marginTop: hp(2),
    paddingHorizontal: 15,
  },
});
