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
  Alert,
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
import { ENTRY } from "../navigation/constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import Tags from "../components/Tags";

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

  const moleAnalysis = useSelector((state) => state.entry.moleAnalysis);

  let moleNameForEntryRouteParam;
  const gotMoleId = route.params.moleId;
  const dispatch = useDispatch();
  const [asymmetryTag, setAsymmetryTag] = useState("");
  const [borderTag, setBorderTag] = useState("");
  const [colorTag, setColorTag] = useState("");
  const [elevationTag, setElevationTag] = useState("");
  const [diameterTag, setDiameterTag] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState(format(new Date(), "PP"));
  const [isSubmitReady, setIsSubmitReady] = useState(false);

  useEffect(() => {
    dispatch(fetchAllMoles());
  }, []);

  console.log("ANALYSIS", moleAnalysis.length);

  useEffect(() => {
    setIsSubmitReady(true);
  }, [moleAnalysis]);

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

  const selectDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setFormattedDate(format(currentDate, "PP"));
  };

  const submitAlert = () =>
    Alert.alert(
      "Whoops!",
      "Please make sure to select a Body Part or a Corresponding Mole",
      [
        {
          text: "Try Again",
          onPress: () => console.log("Try Again pressed"),
          style: "cancel",
        },
      ]
    );

  const handleSubmit = () => {
    console.log("IN HANDLE SUBMIT", moleAnalysis);
    if (!moleId || (!bodyPart && !moleId)) {
      submitAlert();
    } else {
      dispatch(
        addEntry(
          notes,
          date,
          base64Img,
          moleId,
          asymmetryTag,
          borderTag,
          colorTag,
          elevationTag,
          diameterTag,
          moleAnalysis
        )
      );
    }
  };

  if (status === ADD_PENDING || moleAnalysis.length === 0) {
    return (
      <View style={styles.containerCenter}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.backgroundImage}
        />
        <Loading />
      </View>
    );
  } else if (status === ADD_SUCCESS) {
    navigation.push(ENTRY, {
      entry: entryForEntryRouteParam,
      name: moleNameForEntryRouteParam,
      moleId: moleId,
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
          <View>
            <Text style={styles.fontLarge}>new entry</Text>
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
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {show ? (
                <>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={selectDate}
                    textColor="default"
                    style={{ width: 300 }}
                  />
                  <TouchableOpacity
                    style={{
                      ...styles.dropdown2BtnStyle,
                      justifyContent: "center",
                    }}
                    onPress={() => setShow(false)}
                  >
                    <Text
                      style={{
                        ...styles.dropdown2BtnTxtStyle,
                        alignItems: "center",
                      }}
                    >
                      Select Date
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View
                  style={{
                    ...styles.dropdown2BtnStyle,
                    justifyContent: "center",
                  }}
                  // onPress={() => setShow(true)}
                >
                  <Text
                    style={{
                      ...styles.dropdown2BtnTxtStyle,
                      alignItems: "center",
                    }}
                  >
                    {formattedDate}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={{ width: 300 }}>
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
          <View style={{ width: 300 }}>
            <TextInput
              placeholder="notes"
              style={styles.textInputLarge}
              onChangeText={(notes) => setNotes(notes)}
              value={notes}
            />
          </View>

          <Tags
            navigation={navigation}
            setAsymmetryTag={setAsymmetryTag}
            setBorderTag={setBorderTag}
            setColorTag={setColorTag}
            setElevationTag={setElevationTag}
            setDiameterTag={setDiameterTag}
            asymmetryTag={asymmetryTag}
            borderTag={borderTag}
            colorTag={colorTag}
            elevationTag={elevationTag}
            diameterTag={diameterTag}
          />

          <TouchableOpacity
            style={styles.moreInfoButton}
            onPress={() => navigation.navigate("Info")}
          >
            <Text style={styles.tagsInAddEntryTitle}>More Information</Text>
          </TouchableOpacity>

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
