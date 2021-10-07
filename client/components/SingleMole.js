import React from "react";
import {StyleSheet, View, Text} from "react-native";

const SingleMole = () => {
  return (
    <View style={styles.container}>
      <Text>SingleMole</Text>
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

export default SingleMole;
