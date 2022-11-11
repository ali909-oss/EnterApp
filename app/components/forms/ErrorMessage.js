import { View, Text } from "react-native";
import React from "react";
import AppText from "../AppText";

export default function ErrorMessage({ message, visible }) {
  if (!visible || !message) return null;
  return (
    <AppText size={3} style={{ color: "red", marginLeft: 5 }}>
      {message}
    </AppText>
  );
}
