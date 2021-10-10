import React, {useState} from "react";
import {useDispatch} from "react-redux";
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
import {authenticate} from "../store/auth";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("cody@moletracks.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await dispatch(
        authenticate({email: email, password: password, method: "login"})
      );
      response === true ? props.navigation.navigate("Main") : setError(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground style={{width: "100%", height: "100%", backgroundColor: "black"}}>
      <View style={styles.container}>
        <View style={styles.headingSection}>
          <Image style={{width: 100, height: 100}} />
        </View>
        <Text style={styles.heading}>Login</Text>
        {error && <Text style={{color: "red"}}>{error}</Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.signupBtn}>
            <Text style={styles.buttonText}>Log In</Text>
          </View>
        </TouchableOpacity>
        <Button
          title="Don't have an account? Sign Up"
          color="white"
          onPress={() => props.navigation.navigate("SignUp")}
        />
      </View>
    </ImageBackground>
  );
};

export default Login;

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
