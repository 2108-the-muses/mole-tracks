import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import styles from '../styles'
import { ADDENTRY } from "../NavigationConstants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { authenticate } from "../store/auth";

import { useFonts } from "@use-expo/font";
import AppLoading from "expo-app-loading";

const Add = ({ navigation }) => {
  const [selected, setSelected] = useState("");

  const [isLoaded] = useFonts({
    "SulphurPoint-Bold": require("../../assets/fonts/SulphurPoint-Bold.ttf"),
    "SulphurPoint-Light": require("../../assets/fonts/SulphurPoint-Light.ttf"),
    "SulphurPoint-Regular": require("../../assets/fonts/SulphurPoint-Regular.ttf"),
  });

  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={() => navigation.navigate(ADDENTRY)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>entry</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected("mole")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>mole</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 10 }}>or</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Add;

// const heightConst = Dimensions.get("screen").height;
// const styles = StyleSheet.create({
//   container: {
//     height: heightConst - 50,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//     fontFamily: "OpenSans",
//   },
//   image: {
//     width: 325,
//     height: 325,
//     position: "absolute",
//     top: 20,
//   },
//   form: {
//     alignItems: "center",
//     justifyContent: "flex-end",
//     width: "80%",
//     height: "100%",
//     bottom: 150,
//   },
//   textInput: {
//     height: 40,
//     width: 290,
//     borderBottomColor: "gray",
//     borderBottomWidth: 1,
//     marginTop: 15,
//     color: "black",
//     fontFamily: "SulphurPoint-Regular",
//     fontSize: 22,
//   },
//   buttonBox: {
//     flexDirection: "row",
//     width: 260,
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   button: {
//     borderRadius: 10,
//     backgroundColor: "#FF7379",
//     width: 115,
//     height: 45,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     shadowColor: "gray",
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 3,
//     elevation: 1,
//   },
//   buttonText: {
//     color: "white",
//     textAlign: "center",
//     fontFamily: "SulphurPoint-Regular",
//     fontSize: 22,
//   },
// });
