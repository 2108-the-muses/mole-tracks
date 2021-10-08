import React from "react";
import {StyleSheet, View, Text} from "react-native";
import BodyPartsList from '../components/bodyPartsList'

const AllMoles = () => {
  return (
    <View style={styles.container}>
      <BodyPartsList />
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
