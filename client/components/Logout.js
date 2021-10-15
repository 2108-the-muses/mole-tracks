import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";
import {LOGIN, INFO, PROFILE} from "../NavigationConstants";
import {logout} from "../store/auth";
import {firebaseAuth} from "../firebase-auth/config";
import styles from "../styles.js";

const Logout = (props) => {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const onPressButton = async () => {
    try {
      await firebaseAuth.signOut();
      dispatch(logout());
      props.navigation.navigate(LOGIN);
    } catch (error) {
      setError(error.message);
    }
  };


  //Temporary Buttons for Profile Page and Info Page
  const onPressButton1 = async () => {
    try {
      props.navigation.navigate(PROFILE);
    } catch (error) {
      setError(error.message);
    }
  };

  const onPressButton2 = async () => {
    try {
      props.navigation.navigate(INFO);
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <View style={styles.container}>
      <Text>Hello {user.firstName} </Text>
      <Text>{user.email} </Text>
      {error && <Text style={{color: "red"}}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={onPressButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {/* TemporaryButtons for Profile and Info Page  */}
      <TouchableOpacity style={styles.button} onPress={onPressButton1}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onPressButton2}>
        <Text style={styles.buttonText}>Info</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
