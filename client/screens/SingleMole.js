/* eslint-disable react/prop-types */
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import SelectDropdown from "react-native-select-dropdown";
import {FontAwesome5} from "@expo/vector-icons";
import {Entypo} from "@expo/vector-icons";
import {ALLMOLES} from "../NavigationConstants";
import {deleteMoleThunk, updateMoleThunk, fetchSingleMole} from "../store/mole";
import {FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS} from "../store/mole";
import Loading from "./Loading";

const SingleMole = (props) => {
  const moleId = props.route.params.mole.id;

  const fetchStatus = useSelector((state) => state.allMoles.singleMoleFetchStatus);
  const mole = useSelector((state) => state.allMoles.singleMole);

  const [isEdit, setIsEdit] = useState(false);
  const [nickname, setNickname] = useState(mole.nickname);
  const [side, setSide] = useState(mole.side);
  const [bodyPart, setBodyPart] = useState(mole.bodyPart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleMole(moleId));
  }, []);

  useEffect(() => {
    setNickname(mole.nickname);
  }, [mole.nickname]);

  useEffect(() => {
    setSide(mole.side);
  }, [mole.side]);

  useEffect(() => {
    setBodyPart(mole.bodyPart);
  }, [mole.bodyPart]);

  const sides = ["front", "back"];
  let bodyParts = ["head", "torso", "arm-l", "arm-r", "leg-l", "leg-r"];
  side === "front" ? (bodyParts = [...bodyParts, "groin"]) : (bodyParts = [...bodyParts, "butt"]);

  let recentPhoto;
  const entries = mole.entries || [];
  entries.length
    ? (recentPhoto = entries[entries.length - 1].imgUrl)
    : (recentPhoto =
        "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/59232/mole-in-hole-clipart-xl.png");

  console.log("ENTRIES", entries);
  const date = (createdAt) => {
    const splitDate = createdAt.split("-");
    let orderedDate = [splitDate[1], splitDate[2].split("T")[0], splitDate[0]];
    orderedDate = orderedDate.join(" · ");
    return orderedDate;
  };

  const handleSubmit = () => {
    setIsEdit(false);
    dispatch(updateMoleThunk(mole.id, {nickname, bodyPart, side}));
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
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.background}
        />
        <Loading />
      </View>
    );
  } else if (fetchStatus === FETCH_SUCCESS) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.background}
        />
        <View style={styles.contentBox}>
          <View style={styles.headerBox}>
            <View style={{marginLeft: 10}}>
              {isEdit ? (
                <SafeAreaView>
                  <TextInput
                    autoCapitalize="none"
                    style={styles.nicknameInput}
                    placeholder={nickname}
                    onChangeText={(nickname) => setNickname(nickname)}
                    value={nickname}
                  ></TextInput>
                </SafeAreaView>
              ) : (
                <Text style={styles.nickname}>{nickname}</Text>
              )}
            </View>
            <View style={styles.iconBox}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  setIsEdit(true);
                }}
              >
                <Entypo name="edit" size={16} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={() => deleteAlert(mole.id)}>
                <FontAwesome5 name="minus" size={16} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: "row"}}>
            <View>
              <Image source={{uri: recentPhoto}} style={styles.image}></Image>
            </View>

            <View style={styles.infoColumn}>
              <View>
                {isEdit ? (
                  <SelectDropdown
                    buttonStyle={styles.dropdownBtnStyle}
                    buttonTextStyle={styles.dropdownBtnTxtStyle}
                    dropdownStyle={styles.dropdownDropdownStyle}
                    rowStyle={styles.dropdownRowStyle}
                    rowTextStyle={styles.dropdownRowTxtStyle}
                    data={sides}
                    defaultButtonText={side}
                    onSelect={(selected) => setSide(selected)}
                  />
                ) : (
                  <View style={styles.selectBox}>
                    <Text style={styles.select}>{side}</Text>
                  </View>
                )}
                <View style={styles.labelBox}>
                  <Text style={styles.label}>side</Text>
                </View>
              </View>
              <View>
                {isEdit ? (
                  <SelectDropdown
                    buttonStyle={styles.dropdownBtnStyle}
                    buttonTextStyle={styles.dropdownBtnTxtStyle}
                    dropdownStyle={styles.dropdownDropdownStyle}
                    rowStyle={styles.dropdownRowStyle}
                    rowTextStyle={styles.dropdownRowTxtStyle}
                    data={bodyParts}
                    defaultButtonText={bodyPart}
                    onSelect={(selected) => setBodyPart(selected)}
                  />
                ) : (
                  <View style={styles.selectBox}>
                    <Text style={styles.select}>{bodyPart}</Text>
                  </View>
                )}
                <View style={styles.labelBox}>
                  <Text style={styles.label}>location</Text>
                </View>
              </View>
              {isEdit && (
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{alignItems: "center", marginTop: 10}}
                >
                  <Text>UPDATE MOLE</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={styles.contentBox}>
          <View style={styles.headerBox}>
            <View style={{marginLeft: 10}}>
              <Text style={styles.nickname}>Entries</Text>
            </View>
            <View style={styles.iconBox}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => console.log("ADD ENTRY FUNCTION/ROUTE HERE")}
              >
                <FontAwesome5 name="plus" size={16} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {entries.length ? (
            <KeyboardAwareScrollView style={{width: "100%"}} showsVerticalScrollIndicator={false}>
              {entries.reverse().map((entry) => {
                return (
                  <TouchableOpacity
                    key={entry.id}
                    style={styles.entryBox}
                    onPress={() => props.navigation.push("Entry", {entry: entry, name: mole.name})}
                  >
                    <Text style={styles.entry}>{date(entry.createdAt)}</Text>
                  </TouchableOpacity>
                );
              })}
            </KeyboardAwareScrollView>
          ) : (
            <View style={styles.entryBox}>
              <Text style={styles.entry}> You have no entries! </Text>
            </View>
          )}
        </View>
      </View>
    );
  } else if (fetchStatus === FETCH_FAILED) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.background}
        />

        <Text>Uh oh! We were unable to fetch your mole!</Text>
      </View>
    );
  }
};

export default SingleMole;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
  },
  background: {
    width: "100%",
    height: "100%",
    opacity: 0.5,
    position: "absolute",
  },
  headerBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 35,
    alignItems: "center",
    backgroundColor: "#E59F71",
  },
  iconBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: 150,
  },
  icon: {
    marginHorizontal: 10,
  },
  contentBox: {
    width: "100%",
    borderRadius: 1,
    alignItems: "flex-start",
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
    backgroundColor: "white",
  },
  nickname: {
    fontFamily: "SF-Pro",
    color: "black",
    fontSize: 20,
    padding: 3,
    width: 160,
  },
  nicknameInput: {
    fontFamily: "SF-Pro",
    color: "black",
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: "white",
    padding: 3,
    paddingBottom: 2,
    width: 160,
  },
  infoColumn: {
    margin: 10,
    flex: 1,
  },
  entryBox: {
    width: "100%",
    height: 50,
    borderColor: "#E59F71",
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  entry: {
    fontFamily: "SF-Pro",
    color: "black",
    fontSize: 18,
  },
  labelBox: {
    borderTopWidth: 1,
    borderColor: "black",
    alignItems: "flex-start",
    paddingTop: 4,
  },
  label: {
    fontFamily: "SF-Pro",
    color: "gray",
    fontSize: 14,
  },
  selectBox: {
    width: "100%",
    height: 30,
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  select: {
    height: 30,
    fontSize: 18,
    flex: 1,

    fontFamily: "SF-Pro",
  },
  dropdownBtnStyle: {
    width: "100%",
    height: 30,
    alignSelf: "center",
  },
  dropdownBtnTxtStyle: {
    textAlign: "center",

    fontFamily: "SF-Pro",
    fontSize: 18,
  },
  dropdownDropdownStyle: {
    backgroundColor: "#E59F71",
  },
  dropdownRowStyle: {
    borderBottomColor: "#BA5A31",
    height: 30,
  },
  dropdownRowTxtStyle: {
    color: "#FFF",
    textAlign: "center",

    fontFamily: "SF-Pro",
    fontSize: 18,
    marginVertical: 6,
  },
});
