/* eslint-disable react/prop-types */
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { deleteMoleThunk } from "../store/mole";
import { useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "../styles";

const Moles = ({ moles, navigation }) => {
  const dispatch = useDispatch();

  const deleteAlert = (moleId) =>
    Alert.alert("Delete Mole", "Are you sure you want to delete this mole?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          dispatch(deleteMoleThunk(moleId));
          navigation.push("Allmoles");
        },
        style: "destructive",
      },
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
            navigation.push("SingleMole", { mole });
          }}
          key={index}
        >
          <View style={{ ...styles.polaroidContainer, marginRight: 10 }}>
            <Image style={styles.polaroidImage} source={{ uri: image }} />
            <View style={styles.polaroidLabel}>
              <Text style={styles.headerText}>{mole.nickname}</Text>
              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => deleteAlert(mole.id)}
              >
                <FontAwesome5 name="minus" size={12} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    <ScrollView
      horizontal={true}
      style={styles.horizontalScroll}
      showsHorizontalScrollIndicator={false}
    >
      {list()}
    </ScrollView>
  );
};

export default Moles;
