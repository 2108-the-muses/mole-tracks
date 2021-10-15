import React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";

{/* <TouchableOpacity onPress={() => props.navigation.navigate("Entry")}> */}
// </TouchableOpacity>

const Profile = (props) => {
  return (
    <View style={styles.container}>
      <Text>User Profile Page</Text>
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

export default Profile;
