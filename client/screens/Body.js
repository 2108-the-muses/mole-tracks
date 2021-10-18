import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import styles from "../styles";

const Body = (props) => {
  return (
    <View style={styles.containerCenter}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.buttonLarge}>
        <Text style={styles.buttonLargeText}>Coming Soon!</Text>
      </View>
    </View>
  );
};

export default Body;
