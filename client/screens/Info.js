import React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";

{/* <TouchableOpacity onPress={() => props.navigation.navigate("Entry")}> */}
// </TouchableOpacity>

const Info = (props) => {
  return (
    <View style={styles.container}>
      <Text>Info Page</Text>
      {/* <TouchableOpacity onPress={() => props.navigation.navigate("Entry")}> */}
        <View>
        </View>
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

export default Info;
