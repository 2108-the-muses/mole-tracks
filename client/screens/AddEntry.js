import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
  Text,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectDropdown from "react-native-select-dropdown";
import styles from "../styles";
import { fetchAllMoles } from "../store/mole";
import {
  addEntry,
  addStatus,
  ADD_FAILED,
  ADD_PENDING,
  ADD_SUCCESS,
} from "../store/entry";
import Loading from "./Loading";
import { ENTRY } from "../NavigationConstants";

const AddEntry = ({ route, navigation }) => {
  const base64Img = route.params.base64Img;
  const [bodyParts, setBodyParts] = useState([]);
  const [notes, setNotes] = useState(null);
  const [moleId, setMoleId] = useState(route.params.moleId);
  const [bodyPart, setBodyPart] = useState("");
  let moles = useSelector((state) => state.allMoles.moles);
  const [bodyPartMoles, setBodyPartMoles] = useState({});
  const status = useSelector((state) => state.entry.addStatus);
  const entryForEntryRouteParam = useSelector((state) => state.entry.entry);
  let moleNameForEntryRouteParam;
  const gotMoleId = route.params.moleId;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMoles());
  }, []);

  useEffect(() => {
    let bodyPartsArr = moles.map((mole) => {
      return mole.bodyPart;
    });
    setBodyParts(bodyPartsArr);
  }, [moles]);

  useEffect(() => {
    let molesArray = moles.filter((mole) => {
      return mole.bodyPart === bodyPart;
    });
    console.log("molesArray", molesArray.length);
    let molesDictionary = {};
    molesArray.forEach((mole) => {
      molesDictionary[mole.nickname] = mole.id;
    });
    setBodyPartMoles(molesDictionary);
  }, [bodyPart]);

  const handleSubmit = () => {
    dispatch(addEntry(notes, base64Img, moleId));
  };
  if (status === ADD_PENDING) {
    return <Loading />;
  } else if (status === ADD_SUCCESS) {
    navigation.navigate("Moles",{screen: ENTRY, params:{entry: entryForEntryRouteParam, name: moleNameForEntryRouteParam}})
  } else if (status === ADD_FAILED) {
    alert("Upload failed");
    dispatch(addStatus(null));
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.background}
      />
      <KeyboardAwareScrollView>
        <View style={styles.content}>
          <View style={styles.entryimageBox}>
            <Image style={styles.entryImage} source={{ uri: base64Img }} />
          </View>
          <View style={styles.notesBox}>
            <TextInput
              placeholder="notes"
              style={styles.textInput}
              onChangeText={(notes) => setNotes(notes)}
              value={notes}
            />
          </View>
          <View>
            {gotMoleId === false && (
              <SelectDropdown
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
                data={bodyParts}
                defaultButtonText={"Select Body Part"}
                onSelect={(selected) => {
                  setBodyPart(selected);
                }}
              />
            )}
            {/* Front butt bug */}
            {gotMoleId === false && Object.keys(bodyPartMoles).length > 0 && (
              <SelectDropdown
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
                data={Object.keys(bodyPartMoles)}
                defaultButtonText={"Select Mole"}
                onSelect={(selected) => {
                  setMoleId(bodyPartMoles[selected]);
                  moleNameForEntryRouteParam = selected;
                }}
              />
            )}
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.submitEntryButton}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddEntry;
