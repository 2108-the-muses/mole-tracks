import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ActivityIndicator, View, Text, StyleSheet, Button, TouchableOpacity} from "react-native";
import {TabNavigator,AuthNavigator} from "../navigation/index";
const Main = (props) => {
  console.log('main')
  const user = useSelector((state) => state.auth.user);
  console.log(user.uid)
  return (
    <View style={styles.container}>
        {user.uid ? (
          <TabNavigator />
        ) : (
         <AuthNavigator/>
        )}
    </View>
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
