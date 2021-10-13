/* eslint-disable react/prop-types */
import React from "react";
import {StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import {useFonts} from "@use-expo/font";
import AppLoading from "expo-app-loading";

const SingleMole = (props) => {
  const mole = props.route.params.mole;

  let recentPhoto;
  mole.entries
    ? (recentPhoto = mole.entries[mole.entries.length - 1].imgUrl)
    : (recentPhoto =
        "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/59232/mole-in-hole-clipart-xl.png");

  // const recentPhoto = mole.entries[mole.entries.length - 1].imgUrl;

  const [isLoaded] = useFonts({
    "SulphurPoint-Bold": require("../../assets/fonts/SulphurPoint-Bold.ttf"),
    "SulphurPoint-Light": require("../../assets/fonts/SulphurPoint-Light.ttf"),
    "SulphurPoint-Regular": require("../../assets/fonts/SulphurPoint-Regular.ttf"),
  });

  if (!isLoaded) {
    return <AppLoading />;
  }

  const date = (createdAt) => {
    const splitDate = createdAt.split("-");
    let orderedDate = [splitDate[1], splitDate[2].split("T")[0], splitDate[0]];
    orderedDate = orderedDate.join(" · ");
    return orderedDate;
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.background}
      />
      <View style={styles.headerBox}>
        <View style={styles.header}>
          <Text style={styles.name}>{mole.nickname}</Text>
        </View>
        <View style={styles.edit}>
          <Text style={styles.name}>+</Text>
        </View>
      </View>
      <View style={styles.imageBox}>
        <Image source={{uri: recentPhoto}} style={styles.image}></Image>
        <Text style={styles.location}>
          {mole.side} || {mole.bodyPart}
        </Text>
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
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 195,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    shadowColor: "gray",
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 1,
  },
  edit: {
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 90,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    opacity: 0.5,
  },
  imageBox: {
    width: 300,
    height: 275,
    backgroundColor: "#E59F71",
    borderRadius: 15,
    alignItems: "center",
    marginVertical: 25,
  },
  image: {
    width: 250,
    height: 200,
    marginTop: 25,
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
    borderRadius: 15,
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
