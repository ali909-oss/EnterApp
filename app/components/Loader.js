import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import colors from "../config/colors";
function Loader({ visible = false }) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={colors.orange} />
      {/* // autoPlay
        // loop
        // source={require("../assets/animations/loader.json")} */}
      {/* /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    opacity: 0.7,
    width: "100%",
    zIndex: 1,
  },
});

export default Loader;
