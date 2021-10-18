/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
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
    navigation.navigate("Moles", {
      screen: ENTRY,
      params: {
        entry: entryForEntryRouteParam,
        name: moleNameForEntryRouteParam,
      },
    });
  } else if (status === ADD_FAILED) {
    alert("Upload failed");
    dispatch(addStatus(null));
  }

  ////////////////////////////TAGS STUFF (below)////////////////////////////
  const tagsMemo = {
    Symmetric: false,
    Asymmetric: false,
    Defined: false,
    Fuzzy: false,
    Solid: false,
    "Multiple Colors": false,
    Flat: false,
    Raised: false,
    "Under 6mm": false,
    "Above 6mm": false,
  };

  const tagSelect = () => {
    tagsMemo.Symmetric = !tagsMemo.Symmetric;
  };

  ////////////////////////////TAGS STUFF (above)////////////////////////////
  return (
    <View style={styles.containerScroll}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <KeyboardAwareScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: "3%",
            flexDirection: "row",
          }}
        >
          <Image
            style={styles.moleSilhouette}
            source={require("../../assets/images/mole-silhouette-flipped.png")}
          />
          <View style={styles.buttonLarge}>
            <Text style={styles.buttonLargeText}>new entry</Text>
          </View>
          <Image
            style={styles.moleSilhouette}
            source={require("../../assets/images/mole-silhouette.png")}
          />
        </View>

        <View style={{ flex: 1, marginVertical: "3%", alignItems: "center" }}>
          <View style={styles.polaroidContainerLarge}>
            <Image
              style={styles.polaroidImageLarge}
              source={{ uri: base64Img }}
            />
          </View>
          <View style={{ width: 300 }}>
            <TextInput
              placeholder="notes"
              style={styles.textInputLarge}
              onChangeText={(notes) => setNotes(notes)}
              value={notes}
            />
          </View>

          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~TAGS (below) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    */}
          {/* onPress for tags => 
              1. make button appear active =>
                not working, but set up styles => styles.tagsInAddEntryButtons vs styles.tagsActiveButton;
              2. change to true or false => 
                this is currently working using tagSelect 
          */}

          <View style={styles.tagsInAddEntryContainer}>
            <View style={styles.tagsCategoryContainer}>
              <Text style={styles.tagsInAddEntryTitle}>Asymmetry:</Text>
              <TouchableOpacity
                style={styles.tagsInAddEntryButtons}
                onPress={tagSelect}
                value="Symmetric"
              >
                <Text>Symmetric</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tagsInAddEntryButtons}>
                <Text>Asymmetric</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tagsCategoryContainer}>
              <Text style={styles.tagsInAddEntryTitle}>Border:</Text>
              <TouchableOpacity style={styles.tagsInAddEntryButtons}>
                <Text>Defined</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tagsInAddEntryButtons}>
                <Text>Fuzzy</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tagsCategoryContainer}>
              <Text style={styles.tagsInAddEntryTitle}>Color:</Text>
              <TouchableOpacity style={styles.tagsInAddEntryButtons}>
                <Text>Solid/One Color</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tagsInAddEntryButtons}>
                <Text>Many Colors</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tagsCategoryContainer}>
              <Text style={styles.tagsInAddEntryTitle}>Elevation:</Text>
              <TouchableOpacity style={styles.tagsInAddEntryButtons}>
                <Text>Flat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tagsInAddEntryButtons}>
                <Text>Raised</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tagsCategoryContainer}>
              <Text style={styles.tagsInAddEntryTitle}>Diameter:</Text>
              <TouchableOpacity style={styles.tagsInAddEntryButtons}>
                <Text>Under 6mm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tagsInAddEntryButtons}>
                <Text>Above 6mm</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~TAGS (above)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    */}
          <TouchableOpacity
            style={styles.moreInfoButton}
            onPress={() => navigation.push("Info")}
          >
            <Text style={styles.tagsInAddEntryTitle}>More Information</Text>
          </TouchableOpacity>

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
          <View style={{ marginVertical: 25 }}>
            <TouchableOpacity onPress={handleSubmit} style={styles.buttonLarge}>
              <Text style={styles.buttonLargeText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddEntry;
