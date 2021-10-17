import React, { useState } from "react";
import styles from "../styles";
import { TAKEPHOTO, ADDMOLE } from "../NavigationConstants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";

const Add = ({ navigation }) => {
  return (
    <View style={styles.containerCenter}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity
          style={styles.buttonLarge}
          onPress={() => navigation.navigate(TAKEPHOTO, { moleId: false })}
        >
          <Text style={styles.buttonLargeText}>entry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.buttonLarge, marginTop: 25 }}
          onPress={() => navigation.navigate(ADDMOLE)}
        >
          <Text style={styles.buttonLargeText}>mole</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Add;
