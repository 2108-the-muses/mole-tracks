import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";
import {LOGIN, BODY, MOLES, SINGLEMOLE, ENTRY} from "../NavigationConstants";
import {logout} from "../store/auth";
import {firebaseAuth} from "../firebase-auth/config";

const Home = (props) => {
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
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(BODY)}>
        <Text>Body</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(MOLES)}>
        <Text>Moles</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(SINGLEMOLE)}>
        <Text>SingleMole</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(ENTRY)}>
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
