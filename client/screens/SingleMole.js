/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { ALLMOLES } from "../navigation/constants";
import {
  deleteMoleThunk,
  updateMoleThunk,
  fetchSingleMole,
} from "../store/mole";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../store/mole";
import Loading from "./Loading";
import styles from "../styles";
import { format, compareAsc, compareDesc } from "date-fns";

const SingleMole = (props) => {
  const moleId = props.route.params.mole.id;

  const fetchStatus = useSelector(
    (state) => state.allMoles.singleMoleFetchStatus
  );
  const mole = useSelector((state) => state.allMoles.singleMole);

  const [isEdit, setIsEdit] = useState(false);
  const [nickname, setNickname] = useState(mole.nickname);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleMole(moleId));
  }, []);

  const nicknameAlert = () =>
    Alert.alert("Oops!", "Mole nicknames must have 1 to 12 characters!", [
      {
        text: "Try Again",
        onPress: () => console.log("Try Again pressed"),
        style: "cancel",
      },
    ]);

  useEffect(() => {
    setNickname(mole.nickname);
  }, [mole.nickname]);

  let firstPhoto;
  const entries = mole.entries || [];
  entries.length
    ? (firstPhoto = entries[0].imgUrl)
    : (firstPhoto =
        "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/59232/mole-in-hole-clipart-xl.png");

  let initialSortedEntries = entries.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const handleSubmit = () => {
    if (nickname.length < 1 || nickname.length > 12) {
      nicknameAlert();
    } else {
      setIsEdit(false);
      dispatch(updateMoleThunk(mole.id, { nickname }));
    }
  };

  const deleteAlert = (moleId) =>
    Alert.alert("Delete Mole", "Are you sure you want to delete this mole?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          dispatch(deleteMoleThunk(moleId));
          props.navigation.push(ALLMOLES);
        },
        style: "destructive",
      },
    ]);

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

        <KeyboardAwareScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={styles.headerBox}>
              <View style={{ marginLeft: 10 }}>
                {isEdit ? (
                  <View style={{ flexDirection: "row" }}>
                    <SafeAreaView>
                      <TextInput
                        autoCapitalize="none"
                        style={styles.headerInput}
                        placeholder={nickname}
                        onChangeText={(nickname) => setNickname(nickname)}
                        value={nickname}
                      ></TextInput>
                    </SafeAreaView>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={{
                        ...styles.buttonSmall,
                        backgroundColor: "transparent",
                      }}
                    >
                      <Text style={styles.buttonSmallText}>update</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={{ ...styles.headerText, width: 160 }}>
                    {nickname}
                  </Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: 100,
                }}
              >
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                    width: 30,
                    alignItems: "center",
                  }}
                  onPress={() => {
                    setIsEdit(true);
                  }}
                >
                  <Entypo name="edit" size={16} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                    width: 30,
                    alignItems: "center",
                  }}
                  onPress={() => deleteAlert(mole.id)}
                >
                  <FontAwesome5 name="minus" size={16} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                padding: "2%",
              }}
            >
              <View style={styles.polaroidContainer}>
                <Image
                  defaultSource={require("../../assets/images/face-with-mole.png")}
                  source={{ uri: firstPhoto }}
                  style={styles.polaroidImage}
                ></Image>
                <View
                  style={{ ...styles.polaroidLabel, justifyContent: "center" }}
                >
                  {entries.length ? (
                    <Text style={styles.headerText}>
                      {format(new Date(entries[0].date), "PP")}
                    </Text>
                  ) : (
                    <Text style={styles.headerText}></Text>
                  )}
                </View>
              </View>

              <View style={{ margin: 10, flex: 1, alignItems: "center" }}>
                <View style={{ width: "90%" }}>
                  <View style={styles.selectBox}>
                    <Text style={styles.select}>Side: {mole.side}</Text>
                  </View>
                </View>
                <View style={{ width: "90%" }}>
                  <View style={styles.selectBox}>
                    <Text style={styles.select}>Location: {mole.bodyPart}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ width: "100%", alignItems: "flex-start" }}>
            <View style={styles.headerBox}>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ ...styles.headerText, width: 160 }}>
                  Entries
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: 100,
                }}
              >
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                    width: 30,
                    alignItems: "center",
                  }}
                  onPress={() => props.navigation.push("TakePhoto", { moleId })}
                >
                  <FontAwesome5 name="plus" size={16} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            {entries.length ? (
              <KeyboardAwareScrollView
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
              >
                {initialSortedEntries.map((entry) => {
                  const notes = entry.notes || [];
                  return (
                    <TouchableOpacity
                      key={entry.id}
                      style={styles.entryBox}
                      onPress={() =>
                        props.navigation.push("Entry", {
                          entry: entry,
                          name: mole.nickname,
                          moleId: mole.id,
                        })
                      }
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          paddingHorizontal: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={{ uri: entry.imgUrl }}
                            style={{
                              height: 41,
                              width: 49,
                              resizeMode: "cover",
                              marginRight: 10,
                            }}
                          />

                          {notes.length > 20 ? (
                            <Text style={styles.entryText}>
                              {notes.slice(0, 20)}...
                            </Text>
                          ) : (
                            <Text style={styles.entryText}>
                              {notes.slice(0, 20)}
                            </Text>
                          )}
                        </View>
                        <Text style={styles.entryText}>
                          {format(new Date(entry.date), "P")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </KeyboardAwareScrollView>
            ) : (
              <View style={styles.entryBox}>
                <Text style={styles.fontSmall}> You have no entries! </Text>
              </View>
            )}
          </View>

          {entries.length > 1 && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <TouchableOpacity
                style={styles.buttonLarge}
                onPress={() =>
                  props.navigation.push("CompareEntries", {
                    entries,
                    name: mole.nickname,
                    moleId: mole.id,
                  })
                }
              >
                <Text style={styles.buttonLargeText}>compare entries</Text>
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
          Uh oh! We were unable to fetch your mole!
        </Text>
      </View>
    );
  }
};

export default SingleMole;
