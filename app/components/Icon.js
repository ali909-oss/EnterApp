import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Icon({
  name,
  size = 40,
  backgroundColor = "#ffffff00",
  innerColor = "black",
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        color: innerColor,
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MaterialCommunityIcons
        name={name}
        size={size * 0.5}
        color={innerColor}
      />
    </View>
  );
}
