import React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";

const Body = (props) => {
  return (
    <View style={styles.container}>
      <Text>Body</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate("Entry")}>
        <View>
          <Text>Entry</Text>
        </View>
      </TouchableOpacity>
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

export default Body;
