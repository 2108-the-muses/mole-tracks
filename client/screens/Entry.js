/* eslint-disable react/prop-types */
import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addStatus } from "../store/entry";
import { useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import styles from "../styles";

const Entry = (props) => {
  const { entry, name } = props.route.params;

  const dispatch = useDispatch();
  dispatch(addStatus(null));

  const date = (createdAt) => {
    const splitDate = createdAt.split("-");
    let orderedDate = [splitDate[1], splitDate[2].split("T")[0], splitDate[0]];
    orderedDate = orderedDate.join(" · ");
    return orderedDate;
  };

  return (
    <View style={styles.containerScroll}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />

      <KeyboardAwareScrollView>
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
          <View style={styles.buttonLarge}>
            <Text style={styles.buttonLargeText}>entry</Text>
          </View>
          <Image
            style={styles.moleSilhouette}
            source={require("../../assets/images/mole-silhouette.png")}
          />
        </View>

        <View style={styles.headerBox}>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ ...styles.headerText, width: 160 }}>
              {date(entry.createdAt)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: 150,
            }}
          >
            {/* @todo ability to edit entry */}
            <TouchableOpacity
              style={{ marginHorizontal: 10 }}
              onPress={() => {
                console.log("Do a setIsEdit(true) here");
              }}
            >
              <Entypo name="edit" size={16} color="black" />
            </TouchableOpacity>
            {/* @todo ability to delete entry */}
            <TouchableOpacity
              style={{ marginHorizontal: 10 }}
              onPress={() => console.log("Do a deleteAlert(entry.id) here")}
            >
              <FontAwesome5 name="minus" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1, marginVertical: "3%", alignItems: "center" }}>
          <View style={styles.polaroidContainerLarge}>
            <Image
              source={{ uri: entry.imgUrl }}
              style={styles.polaroidImageLarge}
            ></Image>
            <View
              style={{
                ...styles.polaroidLabelLarge,
                marginVertical: 27,
                justifyContent: "flex-end",
              }}
            >
              <Text style={styles.fontExtraLarge}>{name}</Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: "3%",
              alignItems: "flex-start",
              width: "80%",
            }}
          >
            <Text
              style={{
                fontFamily: "SulphurPoint-Bold",
                color: "black",
                fontSize: 22,
              }}
            >
              Notes: {entry.notes}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Entry;
