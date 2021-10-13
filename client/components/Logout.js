import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";
import {LOGIN} from "../NavigationConstants";
import {logout} from "../store/auth";
import {firebaseAuth} from "../firebase-auth/config";
import styles from "../styles.js";

const Logout = (props) => {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const onPressButton = async () => {
    try {
      await firebaseAuth.signOut();
      dispatch(logout());
      props.navigation.navigate(LOGIN);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <View style={styles.container}>
      {error && <Text style={{color: "red"}}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={onPressButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
