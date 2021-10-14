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
} from "react-native";

const Moles = ({moles, navigation}) => {
  const list = () => {
    return moles.map((mole, index) => {
      let image;
      mole.entries.length
        ? (image = mole.entries[mole.entries.length - 1].imgUrl)
        : (image =
            "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/59232/mole-in-hole-clipart-xl.png");

      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SingleMole", {mole});
          }}
          key={index}
        >
          <View style={styles.container}>
            <Image style={styles.image} source={{uri: image}} />
            <Text style={styles.titleText}>{mole.nickname}</Text>
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
    alignSelf: "flex-end",
    marginTop: 5,
    marginRight: 10,
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
});

export default Moles;