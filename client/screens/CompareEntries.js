/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../styles";
import { format } from "date-fns";

const CompareEntries = (props) => {
  const entries = props.route.params.entries;
  const name = props.route.params.name;
  const moleId = props.route.params.moleId;
  const [entryOne, setEntryOne] = useState(null);
  const [lastEntryChanged, setLastEntryChanged] = useState(null);
  const [entryTwo, setEntryTwo] = useState(null);

  // @todo turn this into an object so that id is not in the list
  const entryDictionary = {};
  entries.forEach((entry) => {
    if (entryDictionary[format(new Date(entry.date), "P")]) {
      let x = 1;
      while (entryDictionary[format(new Date(entry.date), "P") + ` (${x})`]) {
        x++;
      }
      return (entryDictionary[format(new Date(entry.date), "P") + ` (${x})`] =
        entry);
    } else {
      return (entryDictionary[format(new Date(entry.date), "P")] = entry);
    }
  });

  return (
    <View style={styles.containerFlexStart}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
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
            <View style={styles.screenTitle}>
              <Text style={styles.fontExtraLarge}>compare</Text>
            </View>
            <Image
              style={styles.moleSilhouette}
              source={require("../../assets/images/mole-silhouette.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              marginTop: 10,
            }}
          >
            <View style={{ width: "50%" }}>
              <SelectDropdown
                buttonStyle={{
                  ...styles.dropdownBtnStyle,
                  backgroundColor: "#FF7379",
                  borderRightColor: "white",
                  borderRightWidth: 2,
                  borderLeftColor: "white",
                  borderLeftWidth: 2,
                }}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                dropdownStyle={styles.dropdownDropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
                data={Object.keys(entryDictionary).filter(
                  (entry) => entry !== lastEntryChanged
                )}
                defaultButtonText={"select entry 1"}
                onSelect={(selected) => {
                  setLastEntryChanged(selected);
                  setEntryOne(entryDictionary[selected]);
                }}
              />
            </View>
            <View style={{ width: "50%" }}>
              <SelectDropdown
                buttonStyle={{
                  ...styles.dropdownBtnStyle,
                  backgroundColor: "#FF7379",
                  borderRightColor: "white",
                  borderRightWidth: 2,
                  borderLeftColor: "white",
                  borderLeftWidth: 2,
                }}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                dropdownStyle={styles.dropdownDropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
                data={Object.keys(entryDictionary).filter(
                  (entry) => entry !== lastEntryChanged
                )}
                defaultButtonText={"select entry 2"}
                onSelect={(selected) => {
                  setLastEntryChanged(selected);
                  setEntryTwo(entryDictionary[selected]);
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "50%", alignItems: "center", padding: 10 }}>
              {entryOne && (
                <>
                  <View style={styles.polaroidContainer}>
                    <Image
                    defaultSource={require('../../assets/images/spinninglogo.gif')}
                      source={{ uri: entryOne.imgUrl }}
                      style={styles.polaroidImage}
                    ></Image>
                    <View
                      style={{
                        ...styles.polaroidLabel,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.headerText}>
                        {format(new Date(entryOne.date), "PP")}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <Text style={styles.fontSmall}>{entryOne.notes}</Text>
                  </View>
                  <View>
                    {[
                      entryOne.asymmetryTag,
                      entryOne.borderTag,
                      entryOne.colorTag,
                      entryOne.elevationTag,
                      entryOne.diameterTag,
                    ].map((tag) => {
                      if (tag.length > 0) {
                        return (
                          <View
                            style={{
                              backgroundColor: "#FFDEDF",
                              borderColor: "black",
                              borderWidth: 1,
                              alignItems: "center",
                              justifyContent: "center",
                              margin: 5,
                            }}
                          >
                            <Text
                              style={
                                (styles.tagText, { fontSize: 15, padding: 5 })
                              }
                            >
                              {tag}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>

                  <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity
                      style={styles.buttonSmall}
                      onPress={() =>
                        props.navigation.navigate("Entry", {
                          entry: entryOne,
                          name: name,
                          moleId: moleId,
                        })
                      }
                    >
                      <Text style={styles.buttonSmallText}>see entry</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            <View style={{ width: "50%", alignItems: "center", padding: 10 }}>
              {entryTwo && (
                <>
                  <View style={styles.polaroidContainer}>
                    <Image
                      source={{ uri: entryTwo.imgUrl }}
                      style={styles.polaroidImage}
                    ></Image>
                    <View
                      style={{
                        ...styles.polaroidLabel,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.headerText}>
                        {format(new Date(entryTwo.date), "PP")}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <Text style={styles.fontSmall}>{entryTwo.notes}</Text>
                  </View>

                  <View>
                    {[
                      entryTwo.asymmetryTag,
                      entryTwo.borderTag,
                      entryTwo.colorTag,
                      entryTwo.elevationTag,
                      entryTwo.diameterTag,
                    ].map((tag) => {
                      if (tag.length > 0) {
                        return (
                          <View
                            style={{
                              backgroundColor: "#FFDEDF",
                              borderColor: "black",
                              borderWidth: 1,
                              alignItems: "center",
                              justifyContent: "center",
                              margin: 5,
                            }}
                          >
                            <Text
                              style={
                                (styles.tagText, { fontSize: 15, padding: 5 })
                              }
                            >
                              {tag}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity
                      style={styles.buttonSmall}
                      onPress={() =>
                        props.navigation.navigate("Entry", {
                          entry: entryTwo,
                          name: name,
                          moleId: moleId,
                        })
                      }
                    >
                      <Text style={styles.buttonSmallText}>see entry</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CompareEntries;
