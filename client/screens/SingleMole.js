/* eslint-disable react/prop-types */
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {FontAwesome5} from "@expo/vector-icons";
import {Entypo} from "@expo/vector-icons";
import {deleteMoleThunk} from "../store/mole";
import {ALLMOLES} from "../NavigationConstants";

const SingleMole = (props) => {
  const dispatch = useDispatch();
  const mole = props.route.params.mole;

  const [isEdit, setIsEdit] = useState(false);
  const [nickname, setNickname] = useState(mole.nickname);
  const [side, setSide] = useState(mole.side);
  const [bodyPart, setBodyPart] = useState(mole.bodyPart);

  let recentPhoto;
  mole.entries.length
    ? (recentPhoto = mole.entries[mole.entries.length - 1].imgUrl)
    : (recentPhoto =
        "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/59232/mole-in-hole-clipart-xl.png");

  const date = (createdAt) => {
    const splitDate = createdAt.split("-");
    let orderedDate = [splitDate[1], splitDate[2].split("T")[0], splitDate[0]];
    orderedDate = orderedDate.join(" · ");
    return orderedDate;
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
          props.navigation.navigate(ALLMOLES);
        },
        style: "destructive",
      },
    ]);

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
            <TouchableOpacity style={styles.icon} onPress={() => setIsEdit(true)}>
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
            <TextInput
              autoCapitalize="none"
              // style={styles.textInput}
              onChangeText={(nickname) => setNickname(nickname)}
              value={nickname}
            >
              {mole.nickname}
            </TextInput>
            <TextInput
              autoCapitalize="none"
              // style={styles.textInput}
              onChangeText={(side) => setSide(side)}
              value={side}
            >
              {mole.side}
            </TextInput>
            <TextInput
              autoCapitalize="none"
              // style={styles.textInput}
              onChangeText={(bodyPart) => setBodyPart(bodyPart)}
              value={bodyPart}
            >
              {mole.bodyPart}
            </TextInput>
          </Text>
        ) : (
          <Text style={styles.location}>
            <Text>{mole.nickname}</Text>
            <Text>{mole.side}</Text>
            <Text>{mole.bodyPart}</Text>
          </Text>
        )}
      </View>
      {mole.entries.length ? (
        <KeyboardAwareScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          {mole.entries.map((entry) => {
            return (
              <TouchableOpacity
                key={entry.id}
                style={styles.entryBox}
                onPress={() => props.navigation.navigate("Entry", {entry: entry, name: mole.name})}
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
