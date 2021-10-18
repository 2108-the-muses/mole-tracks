import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import styles from '../styles'

const Buttons = ({setMoleLocationSelection}) => {
  return (
    <View style = {styles.buttonBox}>
      <TouchableOpacity style = {styles.button}
        onPress={() => {
          setMoleLocationSelection("dropdown");
        }}
      >
        <Text style={styles.buttonText}>Dropdown</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setMoleLocationSelection("body map");
        }}
      >
        <Text style={styles.buttonText}>body map</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Buttons