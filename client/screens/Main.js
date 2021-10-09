import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ActivityIndicator, View, Text, StyleSheet, Button, TouchableOpacity} from "react-native";
import {firebaseAuth} from "../firebase-auth/config";
import {logout} from "../store/auth";

const Main = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState("");

  const onPressButton = async () => {
    try {
      await firebaseAuth.signOut();
      dispatch(logout());
      props.navigation.navigate("Login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user.email ? (
        <>
          <Text>
            Hi {user.firstName} at {user.email}!
          </Text>
          <View>
            <Button onPress={onPressButton} title="Sign Out" />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Home")}>
            <Text>Home</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>Loading</Text>
          <ActivityIndicator size="large" />
        </>
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
