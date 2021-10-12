import React, {useState} from "react";
import {StyleSheet, View, Text, ImageBackground, TextInput, TouchableOpacity} from "react-native";

import {useFonts} from "@use-expo/font";
import AppLoading from "expo-app-loading";

const AddMole = (props) => {
  const [nickname, setNickname] = useState("");
  const [side, setSide] = useState("");
  const [bodyPart, setBodyPart] = useState("");

  const [isLoaded] = useFonts({
    "SulphurPoint-Bold": require("../../assets/fonts/SulphurPoint-Bold.ttf"),
    "SulphurPoint-Light": require("../../assets/fonts/SulphurPoint-Light.ttf"),
    "SulphurPoint-Regular": require("../../assets/fonts/SulphurPoint-Regular.ttf"),
  });

  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.background}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>new mole</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="nickname"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={(nickname) => setNickname(nickname)}
            value={nickname}
          />
        </View>
      </View>
    </View>
  );
};

export default AddMole;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  background: {
    width: "100%",
    height: "100%",
    opacity: 0.5,
    position: "absolute",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 195,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    shadowColor: "gray",
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 1,
  },
  title: {
    fontFamily: "SulphurPoint-Bold",
    color: "white",
    fontSize: 22,
  },
  form: {
    width: "80%",
    // height: "100%",
    bottom: 150,
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

  location: {
    fontFamily: "SulphurPoint-Bold",
    color: "black",
    fontSize: 22,
    marginTop: 12,
  },
  entryBox: {
    width: 300,
    height: 75,
    backgroundColor: "#E59F71",
    borderRadius: 15,
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  entry: {
    fontFamily: "SulphurPoint-Bold",
    color: "black",
    fontSize: 22,
    marginLeft: 25,
  },
});
