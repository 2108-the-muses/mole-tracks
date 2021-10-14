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
  const [bodyPartMoles, setBodyPartMoles] = useState({});
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
    //moles - an array of mole objects
    //bodyPartMoles - a dictionary of nicknames and ids
    let molesArray = moles.filter((mole) => {
      return mole.bodyPart === bodyPart;
    });
    console.log("molesArray", molesArray.length);
    let molesDictionary = {}
    molesArray.forEach((mole) => {
      molesDictionary[mole.nickname]=mole.id
    });
    setBodyPartMoles(molesDictionary);
  }, [bodyPart]);

  const handleSubmit = () => {
    console.log('notes',notes)
    console.log('moleId',moleId)
    dispatch(addEntry(notes,base64Img,moleId))
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

          {Object.keys(bodyPartMoles).length > 0 && (
            <SelectDropdown
            //create object {"bumpy":2}
            //data = thatobject.objectkeys
            //setmoleid object[selected]
              data={Object.keys(bodyPartMoles)}
              defaultButtonText={"Select Mole"}
              onSelect={(selected) => {
                setMoleId(bodyPartMoles[selected]);
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
