/* eslint-disable react/prop-types */
import React from "react";
import {StyleSheet, View, Text, Image, ImageBackground} from "react-native";

import {useFonts} from "@use-expo/font";
import AppLoading from "expo-app-loading";

const Entry = (props) => {
  const {entry, name} = props.route.params;

  const [isLoaded] = useFonts({
    "SulphurPoint-Bold": require("../../assets/fonts/SulphurPoint-Bold.ttf"),
    "SulphurPoint-Light": require("../../assets/fonts/SulphurPoint-Light.ttf"),
    "SulphurPoint-Regular": require("../../assets/fonts/SulphurPoint-Regular.ttf"),
  });

  if (!isLoaded) {
    return <AppLoading />;
  }

  // renders fine on web, not in expo
  // const date = (createdAt) => {
  //   const newDate = new Date(createdAt);
  //   const stringDate = newDate.toString().slice(4,16);
  //   console.log(stringDate);
  //   return stringDate;
  // };

  //
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
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.date}>{date(entry.createdAt)}</Text>
        </View>
        <View style={styles.imageBox}>
          <Image source={{uri: entry.imgUrl}} style={styles.image}></Image>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.notesBox}>
          <Text style={styles.notes}>{entry.notes}</Text>
        </View>
      </View>
    </View>
  );
};

export default Entry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    alignItems: "center",
    justifyContent: "flex-start",
    top: 25,
  },
  header: {
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "gray",
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 1,
  },
  date: {
    fontFamily: "SulphurPoint-Bold",
    color: "white",
    fontSize: 22,
  },
  background: {
    width: "100%",
    height: "100%",
    opacity: 0.5,
    position: "absolute",
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
    color: "black",
    fontSize: 22,
    marginTop: 11,
    alignSelf: "flex-end",
    right: 25,
  },
  notes: {
    fontFamily: "SulphurPoint-Bold",
    color: "black",
    fontSize: 22,
  },
  notesBox: {
    width: 275,
  },
});
