/* eslint-disable react/prop-types */
import React, {useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";
import { deleteMoleThunk } from "../store/mole";
import {useDispatch} from "react-redux"

const Moles = ({moles, navigation}) => {
  const dispatch = useDispatch();

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  const list = () => {
    return moles.map((mole, index) => {
      let image;
      mole.entries.length
        ? (image = mole.entries[mole.entries.length - 1].imgUrl)
        : (image =
            "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/59232/mole-in-hole-clipart-xl.png");

              console.log ("mole id in list before return statement", mole.id)
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SingleMole", {mole});
          }}
          key={index}
        >
          <View style={styles.container}>
            <Image style={styles.image} source={{uri: image}} />
            <View style={styles.label}>
            <Text style={styles.titleText}>{mole.nickname}</Text>
            <TouchableOpacity style={styles.deleteButton}
            //  onPress={() => dispatch(deleteMoleThunk(mole.id))}
            onPress={createTwoButtonAlert}
             >
               <Text style={styles.deleteText}>-</Text>
             </TouchableOpacity>
             </View>
          </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    <ScrollView horizontal={true} style={styles.scrollview} showsHorizontalScrollIndicator={false}>
      {list()}
    </ScrollView>
  );
};

const widthConst = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E59F71",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  titleText: {
    color: "black",
    fontFamily: "SulphurPoint-Bold",
    fontSize: 20,
  },
  image: {
    alignItems: "center",
    width: 130,
    height: 110,
    resizeMode: "cover",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  scrollview: {
    padding: 10,
    // backgroundColor: "#FFB6C1",
    width: widthConst,
    // opacity: 0.8,
  },
  label:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
  deleteButton:{
    width: 17,
    height: 17,
    backgroundColor: "red",
    color: "white",
    borderRadius: 17,
    justifyContent: "center",
  },
  deleteText:{
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  }
});

export default Moles;
