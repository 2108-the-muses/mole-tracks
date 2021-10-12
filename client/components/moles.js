import { WellArchitected } from "aws-sdk";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const Moles = ({ moles }) => {
  const list = () => {
    return moles.map((mole, index) => {
      return (
        <TouchableOpacity key={index}>
        <View style={styles.container}>

          <Text style={styles.titleText}>{mole.nickname}</Text>
          <Image
            style={styles.image}
            source={require("../../assets/images/naked_mole_rat.png")}
          />

        </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    <ScrollView horizontal={true} style={styles.scrollview}>
      {list()}
    </ScrollView>
  );
};

const widthConst = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E59F71",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 150,
    height: 150,
    justifyContent: "space-between",
    marginRight: 10,
    marginTop: 1,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
  },
  titleText: {
    color: "black",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 15,
    position: "absolute",
    right: 15,
    bottom: "5%",
  },
  image: {
    flex: 1,
    alignItems: "center",
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  scrollview: { padding: 10, backgroundColor: "#FFB6C1", width: widthConst, opacity: 0.8 },
});

export default Moles;
