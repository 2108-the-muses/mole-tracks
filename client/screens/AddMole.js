import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addMoleThunk } from "../store/mole";
import BodyPartSelector from "../components/addMoleSelector";
import ClickBody from "../components/ClickBody";
import Buttons from "../components/BodyPartSelectorButtons";
import styles from "../styles";
import { SINGLEMOLE } from "../navigation/constants";

const AddMole = (props) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [side, setSide] = useState("");
  const singleMole = useSelector((state) => {
    return state.allMoles.singleMole;
  });
  const [coords, setCoords] = useState("");

  const nicknameAlert = () =>
    Alert.alert("Oops!", "Please write in a nickname for your mole", [
      {
        text: "Try Again",
        onPress: () => console.log("Try Again pressed"),
        style: "cancel",
      },
    ]);

  const handleSubmit = async () => {
    if (!nickname) {
      nicknameAlert();
    } else {
      const newMole = await dispatch(
        addMoleThunk({ nickname, bodyPart, side, coords })
      );
      if (newMole) {
        props.navigation.navigate(SINGLEMOLE, { mole: newMole });
        // COME BACK TO THE BELOW AFTER DEMO DAY
        // props.navigation.navigate("Moles", {
        //   screen: SINGLEMOLE,
        //   params: { mole: newMole },
        // });
      }
    }
  };

  return (
    <View style={styles.containerScroll}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            marginVertical: "3%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Image
            style={styles.moleSilhouette}
            source={require("../../assets/images/mole-silhouette-flipped.png")}
          />
          <View style={styles.screenTitle}>
            <Text style={styles.fontExtraLarge}>new mole</Text>
          </View>
          <Image
            style={styles.moleSilhouette}
            source={require("../../assets/images/mole-silhouette.png")}
          />
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
            <ClickBody
              setBodyPart={setBodyPart}
              setSide={setSide}
              sendCoords={setCoords}
            />
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
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddMole;
