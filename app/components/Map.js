import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { AnimatedRegion, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
const Map = ({ regions, style }) => {
  const [region, setRegion] = React.useState({
    latitude: regions[0] && regions[0].latitude,
    longitude: regions[0] && regions[0].longitude,
    latitudeDelta: 0.0922,  
    longitudeDelta: 0.0421,
  });

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        flex: 1, //the container will fill the whole screen.
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {/* {/Render our MapView/} */}
      <MapView
        initialRegion={region}
        style={[styles.map, style]}
        onRegionChangeComplete={(region) => setRegion(region)}
        provider={PROVIDER_GOOGLE}
      >
        {regions.map((data) => {
          return <Marker.Animated coordinate={data} />;
        })}
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
