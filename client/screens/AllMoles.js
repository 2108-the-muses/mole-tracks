import React from "react";
import { View, Text, ScrollView, ImageBackground, Image } from "react-native";
import BodyPartsList from "../components/BodyPartsList";
import styles from "../styles";

const AllMoles = ({ navigation }) => {
  return (
    <View style={styles.containerScroll}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: "3%",
            flexDirection: "row",
          }}
        >
          <Image
            style={styles.moleSilhouette}
            source={require("../../assets/images/mole-silhouette-flipped.png")}
          />
          <View
            style={{ ...styles.buttonLarge, backgroundColor: "transparent" }}
          >
            <Text style={styles.fontExtraLarge}>moles</Text>
          </View>
          <Image
            style={styles.moleSilhouette}
            source={require("../../assets/images/mole-silhouette.png")}
          />
        </View>
        <BodyPartsList navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default AllMoles;
