import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ActivityIndicator, View, Text, StyleSheet} from "react-native";
import {firebaseAuth} from "../firebase-auth/config";
import {getAuth} from "firebase/auth";

class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
