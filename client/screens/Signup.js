import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {firebaseAuth} from "../../firebase-auth/config";
import {authenticate} from "../store/auth";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    await dispatch(authenticate(username, email, password, "signup"));
    props.navigation.navigate("Main");
    console.log(firebaseAuth)
  };

  console.log(email, password);
  return (
    <ImageBackground style={{width: "100%", height: "100%", backgroundColor: "black"}}>
      <View style={styles.container}>
        <View style={styles.headingSection}>
          <Image style={{width: 100, height: 100}} />
        </View>
        <Text style={styles.heading}>Sign Up</Text>
        {/* @todo check for error on auth */}
        {error && <Text style={{color: "red"}}>{error}</Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(username) => setUsername(username)}
          value={username}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <TouchableOpacity onPress={handleSignUp}>
          <View style={styles.signupBtn}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </View>
        </TouchableOpacity>
        <Button
          color="transparent"
          title="Already have an account? Login "
          onPress={() => props.navigation.navigate("Login")}
        />
      </View>
    </ImageBackground>
  );
};

export default SignUp;

const heightConst = Dimensions.get("screen").height;
const styles = StyleSheet.create({
  container: {
    height: heightConst - 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headingSection: {
    borderColor: 1,
    textAlign: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  heading: {
    color: "#fff",
    fontSize: 26,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "#fff",
    borderWidth: 1,
    marginTop: 8,
    color: "#fff",
  },
  signupBtn: {
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    width: 100,
    height: 35,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});