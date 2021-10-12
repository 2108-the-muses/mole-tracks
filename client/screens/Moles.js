import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, ImageBackground } from "react-native";
import BodyPartsList from "../components/bodyPartsList";

const AllMoles = ({navigation}) => {
  return (
    <ImageBackground
    source={require("../../assets/images/genZbackgroundImage.png")}
    resizeMode="cover"
    style={styles.image}
    >
    <SafeAreaView style={styles.scrollView}>
      <ScrollView>
        <View style={styles.container}>
          <BodyPartsList navigation= {navigation}/>
        </View>
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  }
});

export default AllMoles;
