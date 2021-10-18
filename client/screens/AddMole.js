import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addMoleThunk } from "../store/mole";
import BodyPartSelector from "../components/addMoleSelector";
import ClickBody from "../components/ClickBody";
import Buttons from '../components/BodyPartSelectorButtons'
import styles from "../styles";
import { SINGLEMOLE } from "../navigation/constants";

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
      props.navigation.navigate("Moles", {
        screen: SINGLEMOLE,
        params: { mole: newMole },
      });
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
            <Buttons setMoleLocationSelection={setMoleLocationSelection}/>
            {moleLocationSelection === "dropdown" ? (
              <BodyPartSelector
                side={side}
                setSide={setSide}
                bodyPart={bodyPart}
                setBodyPart={setBodyPart}
              />
            ) : (
              moleLocationSelection === "body map" && <ClickBody />)}
            </View>
            {bodyPart !== "" && (
              <TouchableOpacity
                style={styles.buttonLarge}
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
