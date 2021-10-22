import React from "react";
import { View, Text, ImageBackground, ScrollView, Image } from "react-native";
import styles from "../styles";

const Info = () => {
  const title = "What Should I Look for? \n";

  const blurb =
    "Examine your skin with a mirror. Pay close attention to areas of your skin that are often exposed to the sun, such as the hands, arms, chest, and head.\n\nThe following ABCDEs are important signs of moles that could be skin cancer. If a mole displays any of the signs listed below, have it checked immediately by a dermatologist: \n";

  const blurb2 =
    "\nKeep in mind that some melanomas may be smaller or not fit other characteristics.You should always be suspicious of a new mole. If you do notice a new mole, see your dermatologist as soon as possible. They will examine the mole and take a skin biopsy (if appropriate). If it's skin cancer, a biopsy can show how deeply it has penetrated the skin. Your dermatologist needs this information to decide how to treat the mole. \n";

  return (
    <View style={styles.containerCenter}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 10 }}>
          <Text style={styles.fontLarge}>{title}</Text>
          <Text style={styles.fontMedium}>{blurb}</Text>

          <View style={styles.containerInfoTags}>
            <Image
              source={require("../../assets/images/ABCDE-Melanoma-A.png")}
              style={styles.infoTagsImgs}
            />
            <Text
              style={{ ...styles.fontMedium, flex: 1, alignSelf: "center" }}
            >
              One half of the mole does not match the other half
            </Text>
          </View>

          <View style={styles.containerInfoTags}>
            <Image
              source={require("../../assets/images/ABCDE-Melanoma-B.png")}
              style={styles.infoTagsImgs}
            />
            <Text
              style={{ ...styles.fontMedium, flex: 1, alignSelf: "center" }}
            >
              The border or edges of the mole are ragged, blurred, or irregular
            </Text>
          </View>

          <View style={styles.containerInfoTags}>
            <Image
              source={require("../../assets/images/ABCDE-Melanoma-C.png")}
              style={styles.infoTagsImgs}
            />
            <Text
              style={{ ...styles.fontMedium, flex: 1, alignSelf: "center" }}
            >
              The mole has different colors or it has shades of tan, brown,
              black, blue, white, or red
            </Text>
          </View>

          <View style={styles.containerInfoTags}>
            <Image
              source={require("../../assets/images/ABCDE-Melanoma-D.png")}
              style={styles.infoTagsImgs}
            />
            <Text
              style={{ ...styles.fontMedium, flex: 1, alignSelf: "center" }}
            >
              The diameter of the mole is larger than the eraser of a pencil
              (6mm)
            </Text>
          </View>

          <View style={styles.containerInfoTags}>
            <Image
              source={require("../../assets/images/ABCDE-Melanoma-E.png")}
              style={styles.infoTagsImgs}
            />
            <Text
              style={{ ...styles.fontMedium, flex: 1, alignSelf: "center" }}
            >
              The mole appears different from others and/or changing in size,
              color, shape
            </Text>
          </View>

          <Text style={styles.fontMedium}>{blurb2}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Info;
