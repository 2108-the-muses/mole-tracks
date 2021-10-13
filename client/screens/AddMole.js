import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {StyleSheet, View, Text, ImageBackground, TextInput, TouchableOpacity} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import {useFonts} from "@use-expo/font";
import AppLoading from "expo-app-loading";
import {addMoleThunk} from "../store/mole";

const AddMole = (props) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [side, setSide] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  console.log(props);
  const sides = ["front", "back"];
  let bodyParts = ["head", "torso", "arm-l", "arm-r", "leg-l", "leg-r"];
  side === "front" ? (bodyParts = [...bodyParts, "groin"]) : (bodyParts = [...bodyParts, "butt"]);

  const handleSubmit = () => {
    dispatch(addMoleThunk({nickname, bodyPart, side}));
    props.navigation.navigate("AllMoles");
  };

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
          <SelectDropdown
            data={sides}
            defaultButtonText={"select side"}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
            onSelect={(selected) => setSide(selected)}
          />
          {side !== "" && (
            <SelectDropdown
              data={bodyParts}
              defaultButtonText={"select body part"}
              buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}
              onSelect={(selected) => setBodyPart(selected)}
            />
          )}
        </View>
        {bodyPart !== "" && (
          <TouchableOpacity style={styles.header} onPress={handleSubmit}>
            <Text style={styles.title}>add mole</Text>
          </TouchableOpacity>
        )}
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
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
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
    textAlign: "center",
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
  dropdown2BtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#E59F71",
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 20,
  },
  dropdown2BtnTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "SulphurPoint-Bold",
    fontSize: 22,
  },
  dropdown2DropdownStyle: {
    backgroundColor: "#E59F71",
    height: 50,
  },
  dropdown2RowStyle: {
    backgroundColor: "#E59F71",
    borderBottomColor: "#BA5A31",
    height: 50,
  },
  dropdown2RowTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "SulphurPoint-Bold",
    fontSize: 22,
    marginVertical: 12,
  },
});
