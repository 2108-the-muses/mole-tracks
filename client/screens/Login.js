import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { authenticateLogin } from "../store/auth";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("sally@moletracks.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await dispatch(
        authenticateLogin({ email: email, password: password })
      );
      if (response !== true) {
        setError(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/face-with-mole.png")}
          style={styles.image}
        />
        <View style={styles.form}>
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
          {error && (
            <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
          )}
          <View style={styles.buttonBox}>
            <TouchableOpacity onPress={handleLogin}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignUp")}
            >
              <View style={[styles.button, styles.fade]}>
                <Text style={styles.buttonText}>sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{ marginTop: 10 }}>or</Text>
          <View style={styles.googleButtonBox}>
            <TouchableOpacity>
              <View style={styles.googleButton}>
                <Image
                  style={styles.googleImage}
                  source={require("../../assets/images/google-logo.png")}
                />
                <Text style={styles.googleButtonText}>
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

Login.navigationOptions = {
  headerTitle: "login",
  headerLeft: null,
};

export default Login;

const heightConst = Dimensions.get("screen").height;
const styles = StyleSheet.create({
  container: {
    height: heightConst - 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    fontFamily: "OpenSans",
  },
  image: {
    width: 325,
    height: 325,
    position: "absolute",
    top: 20,
  },
  form: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "80%",
    height: "100%",
    bottom: 150,
    // paddingBottom: "5%",
  },
  textInput: {
    height: 40,
    width: 290,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginTop: 15,
    color: "black",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 22,
  },
  buttonBox: {
    flexDirection: "row",
    width: 260,
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 115,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 22,
  },
  fade: {
    opacity: 0.3,
  },
  googleButtonBox: {
    flexDirection: "row",
    width: 260,
    justifyContent: "center",
    marginTop: 10,
  },
  googleButton: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF7379",
    backgroundColor: "white",
    width: 260,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
    flexDirection: "row",
  },
  googleButtonText: {
    color: "black",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 16,
  },
  googleImage: {
    width: 25,
    height: 25,
    position: "absolute",
    left: 12,
  },
});
