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
import { addEntry } from "../store/entry";

const AddEntry = ({ route }) => {
  const base64Img = route.params.base64Img;
  const [bodyParts, setBodyParts] = useState([]);
  const [notes, setNotes] = useState(null);
  const [moleId, setMoleId] = useState(route.params.moleId);
  const [bodyPart, setBodyPart] = useState("");
  let moles = useSelector((state) => state.allMoles.moles);
  const [bodyPartMoles, setBodyPartMoles] = useState([]);
  const fetchStatus = useSelector((state) => state.allMoles.fetchStatus);

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
    molesArray = molesArray.map((mole) => {
      return mole.nickname;
    });
    setBodyPartMoles(molesArray);
  }, [bodyPart]);

  const handleSubmit = () => {
    //upload photo to cloudinary
    //axios request that includes creating mole (possibly),
    // create entry with image and notes
    //Redirect to that entry
    //NOT IN HANDLE SUBMIT => RENDER DIFF TAKEPHOTO PROPS
    ////Pass moleID through takephoto, then pass moleID and img to AddEntry
    //Add mole needs to connect w/ takephoto
    //AddEntry conditional render if moleID is present or not
  };

  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.background}
      />

      <View style={styles.content}>
        <View style={styles.imageBox}>
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
          {!moleId && (
            <SelectDropdown
              data={bodyParts}
              defaultButtonText={"Select Body Part"}
              onSelect={(selected) => {
                setBodyPart(selected);
              }}
            />
          )}

          {bodyPartMoles.length > 0 && (
            <SelectDropdown
              data={bodyPartMoles}
              defaultButtonText={"Select Mole"}
              onSelect={(selected) => {
                setMoleId(selected.id);
              }}
            />
          )}
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddEntry;
