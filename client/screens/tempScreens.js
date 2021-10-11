import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MOLES, SINGLEMOLE } from "../NavigationConstants";
import styles from "../styles";

export const MolesTemp = () => {
    return(<View style = {styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(MOLES)}
    >
      <Text styles = {styles.buttonText}>Moles</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(SINGLEMOLE)}
    >
      <Text styles = {styles.buttonText}>SingleMole</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(ENTRY)}>
        <Text styles = {styles.buttonText}>Entry</Text>
      </TouchableOpacity>
  </View>)
};

export const BodyTemp = () => {
    return(<View>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(BODY)}
    >
      <Text styles = {styles.buttonText}>Body</Text>
    </TouchableOpacity>
  </View>)
};
