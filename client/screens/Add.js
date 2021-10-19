import React from "react";
import styles from "../styles";
import { TAKEPHOTO, ADDMOLE } from "../navigation/constants";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";

const Add = ({ navigation }) => {
  return (
    <View style={{ ...styles.containerCenter, justifyContent: "space-around" }}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <TouchableOpacity
        style={styles.buttonLarge}
        onPress={() => navigation.navigate(TAKEPHOTO, { moleId: false })}
      >
        <Text style={styles.buttonLargeText}>entry</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonLarge}
        onPress={() => navigation.navigate(ADDMOLE)}
      >
        <Text style={styles.buttonLargeText}>mole</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Add;
