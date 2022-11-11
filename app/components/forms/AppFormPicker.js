import { View, Text } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";

export default function AppFormPicker({ items, name, placeholder }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  console.log(values)
  return (
    <>
      <AppPicker
        items={items}
        placeholder={placeholder}
        onSelectItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
      />
      {errors && (
        <ErrorMessage message={errors[name]} visible={touched[name]} />
      )}
    </>
  );
}
