import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { authenticateGoogleLogin, authenticateSignUp } from "../store/auth";
import styles from "../styles";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("Cody");
  const [lastName, setLastName] = useState("Mole");
  const [email, setEmail] = useState("cody@moletracks.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      const response = await dispatch(
        authenticateSignUp({ email, firstName, lastName, password })
      );
      if (response !== true) setError(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      <View style={styles.containerFlexStart}>
        <Image
          source={require("../../assets/images/face-with-mole.png")}
          style={{ ...styles.logoLarge, position: "absolute" }}
        />
        <View style={styles.authForm}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.textInputLarge}
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
          <TextInput
            placeholder="First Name"
            autoCapitalize="none"
            style={styles.textInputLarge}
            onChangeText={(firstName) => setFirstName(firstName)}
            value={firstName}
          />
          <TextInput
            placeholder="Last Name"
            autoCapitalize="none"
            style={styles.textInputLarge}
            onChangeText={(lastName) => setLastName(lastName)}
            value={lastName}
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
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <View
                style={{ ...styles.buttonLarge, opacity: 0.3, marginTop: 5 }}
              >
                <Text style={styles.buttonLargeText}>login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp}>
              <View style={{ ...styles.buttonLarge, marginTop: 5 }}>
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
            <TouchableOpacity
              onPress={() => dispatch(authenticateGoogleLogin())}
            >
              <View style={styles.googleButton}>
                <Image
                  style={styles.googleImage}
                  source={require("../../assets/images/google-logo.png")}
                />
                <Text style={styles.googleButtonText}>
                  Continue With Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
