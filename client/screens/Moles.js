import React from "react";
import {StyleSheet, View, Text} from "react-native";
import Moles from '../components/moles'

const AllMoles = () => {
  return (
    <View style={styles.container}>
      <Moles />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AllMoles;
