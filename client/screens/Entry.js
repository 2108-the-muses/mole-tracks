/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ImageBackground,
  Alert,
  TextInput,
} from "react-native";
import { fetchSingleMole } from "../store/mole";
import { deleteEntry, updateEntry } from "../store/entry";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addStatus } from "../store/entry";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { format } from "date-fns";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../store/mole";
import Loading from "./Loading";
import styles from "../styles";
import Tags from "../components/Tags";
import DateTimePicker from "@react-native-community/datetimepicker";
import { INFO } from "../navigation/constants";

const Entry = (props, { navigation }) => {
  const { entry, name, moleId } = props.route.params;
  const mole = useSelector((state) => state.allMoles.singleMole);
  const fetchStatus = useSelector(
    (state) => state.allMoles.singleMoleFetchStatus
  );
  const [isEdit, setIsEdit] = useState(false);
  const [isInspect, setIsInspect] = useState(false);
  const [notes, setNotes] = useState(entry.notes);
  const [asymmetryTag, setAsymmetryTag] = useState(entry.asymmetryTag);
  const [borderTag, setBorderTag] = useState(entry.borderTag);
  const [colorTag, setColorTag] = useState(entry.colorTag);
  const [elevationTag, setElevationTag] = useState(entry.elevationTag);
  const [diameterTag, setDiameterTag] = useState(entry.diameterTag);
  const [formattedDate, setFormattedDate] = useState(format(new Date(), "PP"));

  const deleteAlert = (entry) =>
    Alert.alert("Delete Entry", "Are you sure you want to delete this entry?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          dispatch(deleteEntry(entry)),
            props.navigation.push("SingleMole", { mole });
        },
        style: "destructive",
      },
    ]);

  const onPressLearnMore = async () => {
    try {
      props.navigation.navigate(INFO);
    } catch (error) {
      setError(error.message);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleMole(moleId));
  }, []);

  dispatch(addStatus(null));
  const handleInspect = () => {
    setIsInspect(true);
  };
  const handleSubmit = () => {
    setIsEdit(false);
    dispatch(
      updateEntry(entry.id, {
        notes,
        asymmetryTag,
        borderTag,
        colorTag,
        elevationTag,
        diameterTag,
      })
    );
  };

  if (fetchStatus === FETCH_PENDING) {
    return (
      <View style={styles.containerCenter}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.backgroundImage}
        />
        <Loading />
      </View>
    );
  } else if (fetchStatus === FETCH_SUCCESS) {
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
            <View style={styles.screenTitle}>
              <Text style={styles.fontExtraLarge}>entry</Text>
            </View>
            <Image
              style={styles.moleSilhouette}
              source={require("../../assets/images/mole-silhouette.png")}
            />
          </View>

          <View style={styles.headerBox}>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ ...styles.headerText, width: 160 }}>
                {formattedDate}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: 150,
              }}
            >
              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => {
                  setIsEdit(true);
                }}
              >
                <Entypo name="edit" size={16} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => deleteAlert(entry)}
              >
                <FontAwesome5 name="minus" size={16} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, marginVertical: "3%", alignItems: "center" }}>
            <View style={styles.polaroidContainerLarge}>
              <Image
              defaultSource={require('../../assets/images/face-with-mole.png')}
                source={{ uri: entry.imgUrl }}
                style={styles.polaroidImageLarge}
              ></Image>
              <View
                style={{
                  ...styles.polaroidLabelLarge,
                  marginVertical: 20,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.buttonLarge}
                  onPress={() => props.navigation.push("SingleMole", { mole })}
                >
                  <Text style={styles.buttonLargeText}>{mole.nickname}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginVertical: "3%",
                alignItems: "flex-start",
                width: "80%",
              }}
            >
              {isEdit ? (
                <View>
                  <Text
                    style={{
                      fontFamily: "SulphurPoint-Bold",
                      color: "black",
                      fontSize: 22,
                    }}
                  >
                    Notes:
                  </Text>
                  <TextInput
                    style={styles.textInputNotes}
                    onChangeText={(notes) => setNotes(notes)}
                    value={notes}
                    placeholder={"enter notes here"}
                    multiline={true}
                  ></TextInput>
                </View>
              ) : (
                notes && (
                  <Text
                    style={{
                      fontFamily: "SulphurPoint-Bold",
                      color: "black",
                      fontSize: 22,
                    }}
                  >
                    Notes:
                    <Text style={styles.textInputNotes}> {notes}</Text>
                  </Text>
                )
              )}
              <View
                style={{
                  marginTop: 20,
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {isEdit ? (
                  <View
                    style={{
                      justifyContent: "center",
                      aligntItems: "center",
                      width: "115%",
                    }}
                  >
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
                  </View>
                ) : (
                  [
                    asymmetryTag,
                    borderTag,
                    colorTag,
                    elevationTag,
                    diameterTag,
                  ].map((tag) => {
                    if (tag.length > 0)
                      return (
                        <View
                          style={{
                            backgroundColor: "#FFDEDF",
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
                  })
                )}
              </View>
            </View>
          </View>

          {isEdit && (
            <View
              style={{
                marginVertical: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.buttonLarge}
              >
                <Text style={styles.buttonLargeText}>Update</Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            {entry.moleAnalysis ? (
              isInspect === false && (
                <TouchableOpacity
                  style={styles.buttonLarge}
                  onPress={handleInspect}
                >
                  <Text style={styles.buttonLargeText}>Inspect Mole</Text>
                </TouchableOpacity>
              )
            ) : (
              <Text></Text>
            )}
            {isInspect && entry.moleAnalysis === "Unknown" && (
              <Text style={{ ...styles.fontExtraSmall, margin: 10 }}>
                Sorry, our machine learning inspection could not analyze this
                mole.
                <TouchableOpacity onPress={onPressLearnMore}>
                <Text
                    style={{
                      ...styles.fontExtraSmall,
                      margin: 10,
                      color: "blue",
                      textDecorationLine: "underline",
                    }}
                  >
                    {" "}
                    Learn More{" "}
                  </Text>
                </TouchableOpacity>
              </Text>
            )}

            {isInspect && entry.moleAnalysis === "Malignant" && (
              <Text style={{ ...styles.fontExtraSmall, margin: 10 }}>
                According to our machine learning inspection, this mole shows
                signs of malignancy/cancer. Disclaimer: This is NOT a medical
                diagnosis.
                <TouchableOpacity onPress={onPressLearnMore}>
                  <Text
                    style={{
                      ...styles.fontExtraSmall,
                      margin: 10,
                      color: "blue",
                      textDecorationLine: "underline",
                    }}
                  >
                    {" "}
                    Learn More{" "}
                  </Text>
                </TouchableOpacity>
              </Text>
            )}

            {isInspect && entry.moleAnalysis === "Benign" && (
              <View>
                <Text style={{ ...styles.fontExtraSmall, margin: 10 }}>
                  According to our machine learning inspection, this mole
                  appears to be benign/noncancerous. Disclaimer: This is NOT a
                  medical diagnosis.
                </Text>
                <TouchableOpacity onPress={onPressLearnMore}>
                  <Text
                    style={{
                      ...styles.fontExtraSmall,
                      margin: 10,
                      color: "blue",
                      textDecorationLine: "underline",
                    }}
                  >
                    {" "}
                    Learn More{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  } else if (fetchStatus === FETCH_FAILED) {
    return (
      <View style={styles.containerCenter}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.backgroundImage}
        />

        <Text style={{ ...styles.fontExtraLarge, alignText: "center" }}>
          Uh oh! We were unable to fetch your entry and mole!
        </Text>
      </View>
    );
  }
};

export default Entry;
