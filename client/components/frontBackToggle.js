import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Touchable,
} from "react-native";
import styles from "../styles";


const Toggle = ({toggleSide,viewFront}) => {
    const activeStyles = { ...styles.buttonSmall };
    const inactiveStyles = { ...styles.buttonSmall, opacity: 0.5 };
  return (
    <View style={styles.buttonBox}>
      <TouchableOpacity
        onPress={() => {
          toggleSide(true);
        }}
        style={viewFront ? activeStyles : inactiveStyles}
      >
        <Text style={styles.buttonSmallText}>Front</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={viewFront ? inactiveStyles : activeStyles}
        onPress={() => {
          toggleSide(false);
        }}
      >
        <Text style={styles.buttonSmallText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Toggle
