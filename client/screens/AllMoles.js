import React from "react";
import {StyleSheet, View, SafeAreaView, ScrollView, ImageBackground} from "react-native";
import BodyPartsList from "../components/BodyPartsList";

const AllMoles = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/genZbackgroundImage.png")}
        resizeMode="cover"
        style={styles.image}
      />
      <SafeAreaView style={styles.scrollView}>
        <ScrollView>
          <BodyPartsList navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  scrollView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.5,
  },
});

export default AllMoles;
