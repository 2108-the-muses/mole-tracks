/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { fetchSingleMole } from "../store/mole";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addStatus } from "../store/entry";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { format } from "date-fns";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../store/mole";
import Loading from "./Loading";
import styles from "../styles";

const Entry = (props) => {
  const { entry, name, moleId } = props.route.params;
  const mole = useSelector((state) => state.allMoles.singleMole);
  const fetchStatus = useSelector(
    (state) => state.allMoles.singleMoleFetchStatus
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleMole(moleId));
  }, []);

  dispatch(addStatus(null));

  if (fetchStatus === FETCH_PENDING) {
    return (
      <View style={styles.containerCenter}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.backgroundImage}
        />
        <Loading />
      </View>
    );
  } else if (fetchStatus === FETCH_SUCCESS) {
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
                {format(new Date(entry.date), "PP")}
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
                  marginVertical: 20,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.buttonLarge}
                  onPress={() => props.navigation.push("SingleMole", { mole })}
                >
                  <Text style={styles.buttonLargeText}>{mole.nickname}</Text>
                </TouchableOpacity>
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
              <View
                style={{
                  marginTop: 20,
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {[
                  entry.asymmetryTag,
                  entry.borderTag,
                  entry.colorTag,
                  entry.elevationTag,
                  entry.diameterTag,
                ].map((tag) => {
                  if (tag.length > 0)
                    return (
                      <View
                        style={{
                          backgroundColor: "#FF7379",
                          borderColor: "black",
                          borderWidth: 1,
                          alignItems: "center",
                          justifyContent: "center",
                          margin: 5,
                        }}
                      >
                        <Text
                          style={(styles.tagText, { fontSize: 15, padding: 5 })}
                        >
                          {tag}
                        </Text>
                      </View>
                    );
                })}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  } else if (fetchStatus === FETCH_FAILED) {
    return (
      <View style={styles.containerCenter}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.backgroundImage}
        />

        <Text style={{ ...styles.fontExtraLarge, alignText: "center" }}>
          Uh oh! We were unable to fetch your entry and mole!
        </Text>
      </View>
    );
  }
};

export default Entry;
