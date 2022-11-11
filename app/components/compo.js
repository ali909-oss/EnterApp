import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function compo({ minPrice = 100, setMinP }) {
  return (
    <View>
      <Text>compo</Text>
      <Text>THis is the {minPrice}</Text>
      <TouchableOpacity onPress={() => setMinP(500)}>
        <View
          style={{ backgroundColor: "orange", width: 50, height: 50 }}
        ></View>
      </TouchableOpacity>
    </View>
  );
}
