import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { TabNavigator, AuthNavigator } from "../navigation/index";
import { NavigationContainer } from "@react-navigation/native";

const Main = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <NavigationContainer style={styles.container}>
      {user.uid ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 150,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
