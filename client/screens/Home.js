import React from "react";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";
import {login, signup, body, moles, singleMole, entry} from "../NavigationConstants";

const Home = (props) => {
  const navigation = props.navigation;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(login)}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(signup)}>
        <Text>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(body)}>
        <Text>Body</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(moles)}>
        <Text>Moles</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(singleMole)}>
        <Text>SingleMole</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(entry)}>
        <Text>Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    width: 150,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
