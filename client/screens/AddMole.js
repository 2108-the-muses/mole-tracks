import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addMoleThunk } from "../store/mole";
import BodyPartSelector from "../components/addMoleSelector";
import ClickBody from "../components/ClickBody";

const AddMole = (props) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [side, setSide] = useState("");
  const [moleLocationSelection, setMoleLocationSelection] = useState(null);
  const singleMole = useSelector((state) => {
    return state.allMoles.singleMole;
  });

  const handleSubmit = async () => {
    const newMole = await dispatch(addMoleThunk({ nickname, bodyPart, side }));
    if (newMole) {
      props.navigation.push("SingleMole", { mole: newMole });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.background}
      />
      <KeyboardAwareScrollView>
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
            <BodyPartSelector
              side={side}
              setSide={setSide}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
            />
            <ClickBody />
          </View>
          {bodyPart !== "" && (
            <TouchableOpacity style={styles.header} onPress={handleSubmit}>
              <Text style={styles.title}>add mole</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
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
    shadowOffset: { width: 0, height: 1 },
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
    height: 150,
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
