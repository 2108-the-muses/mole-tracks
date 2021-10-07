import React from "react";
import {StyleSheet, View, Text, StatusBar} from "react-native";

const Entry = () => {
  return (
    <View style={styles.container}>
      <Text>Entry</Text>
      <StatusBar style="auto" />
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

export default Entry;
