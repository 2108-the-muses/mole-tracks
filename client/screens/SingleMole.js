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
        <View style={styles.imageBox}>
          <View style={styles.headerBox}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => console.log("ADD ENTRY FUNCTION/ROUTE HERE")}
              >
                <FontAwesome5 name="plus" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  setIsEdit(true);
                }}
              >
                <Entypo name="edit" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={() => deleteAlert(mole.id)}>
                <FontAwesome5 name="minus" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <Image source={{uri: recentPhoto}} style={styles.image}></Image>
          {isEdit ? (
            <Text style={styles.location}>
              <SafeAreaView>
                <TextInput
                  autoCapitalize="none"
                  // style={styles.textInput}
                  placeholder={nickname}
                  onChangeText={(nickname) => setNickname(nickname)}
                  value={nickname}
                ></TextInput>
              </SafeAreaView>
              <SelectDropdown
                data={sides}
                defaultButtonText={side}
                onSelect={(selected) => setSide(selected)}
              />
              <SelectDropdown
                data={bodyParts}
                defaultButtonText={bodyPart}
                onSelect={(selected) => setBodyPart(selected)}
              />
              <TouchableOpacity onPress={handleSubmit}>
                <Text>DONE</Text>
              </TouchableOpacity>
            </Text>
          ) : (
            <Text style={styles.location}>
              <Text>{nickname}</Text>
              <Text>{side}</Text>
              <Text>{bodyPart}</Text>
            </Text>
          )}
        </View>
        {entries.length ? (
          <KeyboardAwareScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {entries.map((entry) => {
              return (
                <TouchableOpacity
                  key={entry.id}
                  style={styles.entryBox}
                  onPress={() => props.navigation.push("Entry", {entry: entry, name: mole.name})}
                >
                  <Text style={styles.entry}>Entry: {date(entry.createdAt)}</Text>
                </TouchableOpacity>
              );
            })}
          </KeyboardAwareScrollView>
        ) : (
          <View>
            <Text> You have no entries! </Text>
          </View>
        )}
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
  },
  header: {
    backgroundColor: "#FF7379",
    flexDirection: "row",
    width: "100%",
    height: 35,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  icon: {
    marginHorizontal: 10,
  },
  edit: {
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    opacity: 0.5,
  },
  imageBox: {
    width: 350,
    height: 350,
    backgroundColor: "#E59F71",
    borderRadius: 1,
    alignItems: "center",
    marginVertical: 25,
  },
  image: {
    width: 350,
    height: 250,
    // marginTop: 25,
  },
  name: {
    fontFamily: "SulphurPoint-Bold",
    color: "white",
    fontSize: 22,
  },
  location: {
    fontFamily: "SulphurPoint-Bold",
    color: "black",
    fontSize: 22,
    marginTop: 12,
  },
  entryBox: {
    width: 300,
    height: 75,
    backgroundColor: "#E59F71",
    borderRadius: 1,
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  entry: {
    fontFamily: "SulphurPoint-Bold",
    color: "black",
    fontSize: 22,
    marginLeft: 25,
  },
});
