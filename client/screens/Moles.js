import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import BodyPartsList from "../components/bodyPartsList";

const AllMoles = () => {
  return (
    <SafeAreaView style={styles.scrollView}>
      <ScrollView>
        <View style={styles.container}>
          <BodyPartsList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
});

export default AllMoles;
