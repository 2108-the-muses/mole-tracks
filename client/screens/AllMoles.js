import React from "react";
import { View, Text, ScrollView, ImageBackground, Image } from "react-native";
import BodyPartsList from "../components/BodyPartsList";
import styles from "../styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { ADDMOLE, INFO } from "../navigation/constants";

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
            justifyContent: "space-around",
            marginVertical: "3%",
            flexDirection: "row",
          }}
        >
          <Image
            style={styles.moleSilhouette}
            source={require("../../assets/images/mole-silhouette-flipped.png")}
          />
          <View style={styles.screenTitle}>
            <Text style={styles.fontExtraLarge}>moles</Text>
          </View>
          <View
            style={{
              ...styles.moleSilhouette,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome5
              onPress={() => {
                navigation.navigate(ADDMOLE);
              }}
              name="plus"
              size={24}
              color="black"
              style={{ marginHorizontal: 10 }}
            />
            <FontAwesome5
              name="info-circle"
              size={30}
              color="skyblue"
              style={{ marginHorizontal: 10 }}
              onPress={() => {
                navigation.navigate(INFO);
              }}
            />
          </View>
        </View>
        <BodyPartsList navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default AllMoles;
