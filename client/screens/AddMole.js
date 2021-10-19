import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addMoleThunk } from "../store/mole";
import styles from "../styles";
import { SINGLEMOLE } from "../NavigationConstants";

const AddMole = (props) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [side, setSide] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const singleMole = useSelector((state) => {
    return state.allMoles.singleMole;
  });

  const sides = ["front", "back"];
  let bodyParts = ["head", "torso", "arm-l", "arm-r", "leg-l", "leg-r"];
  side === "front"
    ? (bodyParts = [...bodyParts, "groin"])
    : (bodyParts = [...bodyParts, "butt"]);

  const handleSubmit = async () => {
    const newMole = await dispatch(addMoleThunk({ nickname, bodyPart, side }));
    if (newMole) {
      props.navigation.navigate(SINGLEMOLE, { mole: newMole });
      // COME BACK TO THE BELOW AFTER DEMO DAY
      // props.navigation.navigate("Moles", {
      //   screen: SINGLEMOLE,
      //   params: { mole: newMole },
      // });
    }
  };

  return (
    <View style={styles.containerScroll}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginVertical: "3%", alignItems: "center" }}>
          <View style={styles.buttonLarge}>
            <Text style={styles.buttonLargeText}>new mole</Text>
          </View>

          <View style={{ flex: 1, marginVertical: "3%", alignItems: "center" }}>
            <View style={{ width: 300 }}>
              <TextInput
                placeholder="nickname"
                autoCapitalize="none"
                style={styles.textInputLarge}
                onChangeText={(nickname) => setNickname(nickname)}
                value={nickname}
              />
            </View>
            <View style={{ width: 300 }}>
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
              <TouchableOpacity
                style={{ ...styles.buttonLarge, marginTop: 20 }}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonLargeText}>add mole</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddMole;
