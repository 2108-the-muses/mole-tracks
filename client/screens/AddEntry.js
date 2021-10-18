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
  Button,
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
// NEW
// import DateTimePicker from "@react-native-community/datetimepicker";
// NEW END

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
  const [asymmetryTag, setAsymmetryTag] = useState("");
  const [borderTag, setBorderTag] = useState("");
  const [colorTag, setColorTag] = useState("");
  const [elevationTag, setElevationTag] = useState("");
  const [diameterTag, setDiameterTag] = useState("");
  const asymmetryTagArray = ["Symmetric", "Asymmetric"];
  const borderTagArray = ["Defined", "Fuzzy"];
  const colorTagArray = ["Single Color", "Many Colors"];
  const elevationTagArray = ["Flat", "Raised"];
  const diameterTagArray = ["Under 6mm", "Over 6mm"];

  const asymmetryTagSelect = (value) => {
    value === asymmetryTag ? setAsymmetryTag("") : setAsymmetryTag(value);
  };
  const borderTagSelect = (value) => {
    value === borderTag ? setBorderTag("") : setBorderTag(value);
  };
  const colorTagSelect = (value) => {
    value === colorTag ? setColorTag("") : setColorTag(value);
  };
  const elevationTagSelect = (value) => {
    value === elevationTag ? setElevationTag("") : setElevationTag(value);
  };
  const diameterTagSelect = (value) => {
    value === diameterTag ? setDiameterTag("") : setDiameterTag(value);
  };

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
    dispatch(
      addEntry(
        notes,
        base64Img,
        moleId,
        asymmetryTag,
        borderTag,
        colorTag,
        elevationTag,
        diameterTag
      )
    );
  };

  // NEW
  // const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState("date");
  // const [show, setShow] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   // setShow(Platform.OS === "ios");
  //   setShow(false);
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode("date");
  // };
  // NEW END

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
        </View>
        {/* <View style={{ width: 300 }}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {show ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="default"
                onChange={onChange}
                textColor="spinner"
                style={styles.dropdown2BtnStyle}
              />
            ) : (
              <TouchableOpacity
                style={{
                  ...styles.dropdown2BtnStyle,
                  justifyContent: "center",
                }}
                onPress={showDatepicker}
              >
                <Text
                  style={{
                    ...styles.dropdown2BtnTxtStyle,
                    alignItems: "center",
                  }}
                >
                  {date}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View> */}
        <View style={{ width: 300 }}>
          <View style={styles.tagsInAddEntryContainer}>
            <View style={styles.tagsCategoryContainer}>
              <Text style={styles.tagsInAddEntryTitle}>Asymmetry:</Text>
              {asymmetryTagArray.map((tag, index) => {
                return (
                  <View key={index} style={styles.tagsInactiveButton}>
                    <TouchableOpacity
                      style={tag === asymmetryTag && styles.tagsActiveButton}
                      onPress={() => asymmetryTagSelect(tag)}
                    >
                      <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            <View style={styles.tagsCategoryContainer}>
              <Text style={styles.tagsInAddEntryTitle}>Border:</Text>
              {borderTagArray.map((tag, index) => {
                return (
                  <View key={index} style={styles.tagsInactiveButton}>
                    <TouchableOpacity
                      style={tag === borderTag && styles.tagsActiveButton}
                      onPress={() => borderTagSelect(tag)}
                    >
                      <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            <View style={styles.tagsCategoryContainer}>
              <Text style={styles.tagsInAddEntryTitle}>Color:</Text>
              {colorTagArray.map((tag, index) => {
                return (
                  <View key={index} style={styles.tagsInactiveButton}>
                    <TouchableOpacity
                      style={tag === colorTag && styles.tagsActiveButton}
                      onPress={() => colorTagSelect(tag)}
                    >
                      <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            <View style={styles.tagsCategoryContainer}>
              <Text style={styles.tagsInAddEntryTitle}>Elevation:</Text>
              {elevationTagArray.map((tag, index) => {
                return (
                  <View key={index} style={styles.tagsInactiveButton}>
                    <TouchableOpacity
                      style={tag === elevationTag && styles.tagsActiveButton}
                      onPress={() => elevationTagSelect(tag)}
                    >
                      <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            <View style={styles.tagsCategoryContainer}>
              <Text style={styles.tagsInAddEntryTitle}>Diameter:</Text>
              {diameterTagArray.map((tag, index) => {
                return (
                  <View key={index} style={styles.tagsInactiveButton}>
                    <TouchableOpacity
                      style={tag === diameterTag && styles.tagsActiveButton}
                      onPress={() => diameterTagSelect(tag)}
                    >
                      <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>

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
