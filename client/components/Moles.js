/* eslint-disable react/prop-types */
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import {deleteMoleThunk} from "../store/mole";
import {useDispatch} from "react-redux";

const Moles = ({moles, navigation}) => {
  const dispatch = useDispatch();

  const deleteAlert = (moleId) =>
    Alert.alert("Delete Mole", "Are you sure you want to delete this mole?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {text: "Delete", onPress: () => dispatch(deleteMoleThunk(moleId)), style: "destructive"},
    ]);

  const list = () => {
    return moles.map((mole, index) => {
      let image;
      const entries = mole.entries || [];
      entries.length
        ? (image = entries[entries.length - 1].imgUrl)
        : (image =
            "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/59232/mole-in-hole-clipart-xl.png");

      return (
        <TouchableOpacity
          onPress={() => {
            navigation.push("SingleMole", {mole});
          }}
          key={index}
        >
          <View style={styles.container}>
            <Image style={styles.image} source={{uri: image}} />
            <View style={styles.label}>
              <Text style={styles.titleText}>{mole.nickname}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAlert(mole.id)}>
                <Text style={styles.deleteText}>delete</Text>
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
    borderRadius: 1,
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
    height: 170,
    // opacity: 0.8,
  },
  label: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
  deleteButton: {
    width: 36,
    height: 18,
    backgroundColor: "#BC2020",
    borderRadius: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default Moles;
