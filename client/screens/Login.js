import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { authenticateLogin } from "../store/auth";
import styles from "../styles";

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
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerFlexStart}>
        <Image
          source={require("../../assets/images/face-with-mole.png")}
          style={{ ...styles.logoLarge, position: "absolute" }}
        />
        <View style={{ ...styles.authForm, top: styles.authForm.top + 110 }}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.textInputLarge}
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={styles.textInputLarge}
            onChangeText={(password) => setPassword(password)}
            value={password}
          />
          {error && (
            <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
          )}
          <View
            style={{
              flexDirection: "row",
              width: "85%",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={handleLogin}>
              <View style={{ ...styles.buttonLarge, marginTop: 5 }}>
                <Text style={styles.buttonLargeText}>login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignUp")}
            >
              <View
                style={{ ...styles.buttonLarge, opacity: 0.3, marginTop: 5 }}
              >
                <Text style={styles.buttonLargeText}>sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{ marginTop: 10 }}>or</Text>
          <View
            style={{
              flexDirection: "row",
              width: "85%",
              marginTop: 10,
            }}
          >
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

export default Login;
