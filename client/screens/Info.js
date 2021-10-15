import React from "react";
import {StyleSheet, View, Text, StatusBar, ImageBackground, ScrollView} from "react-native";


const Info = () => {
  return (
    <View style={styles.container}>
     <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.background}
      />
      <ScrollView>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.blurb}>{blurb}</Text>
      <Text style={styles.list}>{list}</Text>
      {/* <StatusBar style="auto" /> */}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    opacity: 0.5,
    position: "absolute",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

  },
  title: {
    marginTop: 20,
    marginLeft: 20,
    color: "black",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 30,
  },
  blurb:{
    fontSize: 22,
    fontFamily: "SulphurPoint-Regular",
    marginLeft: 20,
    marginRight: 20,
  },
  list:{
    fontFamily: "SulphurPoint-Regular",
    fontSize: 22,
    marginLeft: 20,
    marginRight: 20,
  }
});

export default Info;

//put in seed files later?

const title = "What Should I Look for? \n";

const blurb = " Examine your skin with a mirror. Pay close attention to areas of your skin that are often exposed to the sun, such as the hands, arms, chest, and head.\n\n The following ABCDEs are important signs of moles that could be skin cancer. If a mole displays any of the signs listed below, have it checked immediately by a dermatologist: \n"

const list = " Asymmetry: One half of the mole does not match the other half \n \nBorder: The border or edges of the mole are ragged, blurred, or irregular\n \nColor: The mole has different colors or it has shades of tan, brown, black, blue, white, or red \n \nDiameter: The diameter of the mole is larger than the eraser of a pencil \n \nEvolving: The mole appears different from others and/or changing in size, color, shape \n \nKeep in mind that some melanomas may be smaller or not fit other characteristics.You should always be suspicious of a new mole. If you do notice a new mole, see your dermatologist as soon as possible. They will examine the mole and take a skin biopsy (if appropriate). If it's skin cancer, a biopsy can show how deeply it has penetrated the skin. Your dermatologist needs this information to decide how to treat the mole. \n"
