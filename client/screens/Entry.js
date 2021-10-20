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

const Entry = (props, { navigation }) => {
  const { entry, name, moleId } = props.route.params;
  const mole = useSelector((state) => state.allMoles.singleMole);
  const fetchStatus = useSelector(
    (state) => state.allMoles.singleMoleFetchStatus
  );
  const [isEdit, setIsEdit] = useState(false);
  const [notes, setNotes] = useState(entry.notes);
  const [asymmetryTag, setAsymmetryTag] = useState(entry.asymmetryTag);
  const [borderTag, setBorderTag] = useState(entry.borderTag);
  const [colorTag, setColorTag] = useState(entry.colorTag);
  const [elevationTag, setElevationTag] = useState(entry.elevationTag);
  const [diameterTag, setDiameterTag] = useState(entry.diameterTag);
  const [date, setDate] = useState(entry.date);
  const [show, setShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState(format(new Date(), "PP"));

  const selectDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setFormattedDate(format(currentDate, "PP"));
  };

  const deleteAlert = (entryId) =>
    Alert.alert("Delete Entry", "Are you sure you want to delete this entry?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          dispatch(deleteEntry(entryId)),
            props.navigation.push("SingleMole", { mole });
        },
        style: "destructive",
      },
    ]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleMole(moleId));
  }, []);

  dispatch(addStatus(null));

  const handleSubmit = () => {
    setIsEdit(false);
    dispatch(
      updateEntry(entry.id, {
        notes,
        date,
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
                {format(new Date(date), "PP")}
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
                onPress={() => deleteAlert(entry.id)}
              >
                <FontAwesome5 name="minus" size={16} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, marginVertical: "3%", alignItems: "center" }}>
            <View style={styles.polaroidContainerLarge}>
              <Image
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
                    style={styles.textInputLarge}
                    onChangeText={(notes) => setNotes(notes)}
                    value={notes}
                    placeholder={"enter notes here"}
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
                    Notes: {notes}
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
                            backgroundColor: "#FF7379",
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
                  })
                )}
              </View>
            </View>
          </View>

          {isEdit && (
            <View>
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
                <TouchableOpacity
                  style={{
                    ...styles.dropdown2BtnStyle,
                    justifyContent: "center",
                  }}
                  onPress={() => setShow(true)}
                >
                  <Text
                    style={{
                      ...styles.dropdown2BtnTxtStyle,
                      alignItems: "center",
                    }}
                  >
                    Edit Date
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {isEdit && (
            <View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.buttonSmall}
              >
                <Text style={styles.buttonSmallText}>Update</Text>
              </TouchableOpacity>
            </View>
          )}
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
