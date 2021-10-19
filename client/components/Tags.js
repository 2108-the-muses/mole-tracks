import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../styles";

const Tags = ({
  route,
  navigation,
  setAsymmetryTag,
  setBorderTag,
  setColorTag,
  setElevationTag,
  setDiameterTag,
  asymmetryTag,
  borderTag,
  colorTag,
  elevationTag,
  diameterTag,
}) => {
  const asymmetryTagArray = ["Symmetric", "Asymmetric"];
  const borderTagArray = ["Defined", "Fuzzy"];
  const colorTagArray = ["Single Color", "Many Colors"];
  const elevationTagArray = ["Flat", "Raised"];
  const diameterTagArray = ["Under 6mm", "Over 6mm"];

  const asymmetryTagSelect = (value) => {
    value === asymmetryTag ? setAsymmetryTag("") : setAsymmetryTag(value);
  };
  const borderTagSelect = (value) => {
    value === borderTag ? setBorderTag("") : setBorderTag(value);
  };
  const colorTagSelect = (value) => {
    value === colorTag ? setColorTag("") : setColorTag(value);
  };
  const elevationTagSelect = (value) => {
    value === elevationTag ? setElevationTag("") : setElevationTag(value);
  };
  const diameterTagSelect = (value) => {
    value === diameterTag ? setDiameterTag("") : setDiameterTag(value);
  };

  return (
    <View style={styles.tagsInAddEntryContainer}>
      <View style={styles.tagsCategoryContainer}>
        <Text style={styles.tagsInAddEntryTitle}>Asymmetry:</Text>
        <View style={{ flexDirection: "row" }}>
          {asymmetryTagArray.map((tag, index) => {
            return (
              <View key={index} style={styles.tagsInactiveButton}>
                <TouchableOpacity
                  style={tag === asymmetryTag && styles.tagsActiveButton}
                  onPress={() => asymmetryTagSelect(tag)}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.tagsCategoryContainer}>
        <Text style={styles.tagsInAddEntryTitle}>Border:</Text>
        <View style={{ flexDirection: "row" }}>
          {borderTagArray.map((tag, index) => {
            return (
              <View key={index} style={styles.tagsInactiveButton}>
                <TouchableOpacity
                  style={tag === borderTag && styles.tagsActiveButton}
                  onPress={() => borderTagSelect(tag)}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.tagsCategoryContainer}>
        <Text style={styles.tagsInAddEntryTitle}>Color:</Text>
        <View style={{ flexDirection: "row" }}>
          {colorTagArray.map((tag, index) => {
            return (
              <View key={index} style={styles.tagsInactiveButton}>
                <TouchableOpacity
                  style={tag === colorTag && styles.tagsActiveButton}
                  onPress={() => colorTagSelect(tag)}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.tagsCategoryContainer}>
        <Text style={styles.tagsInAddEntryTitle}>Elevation:</Text>
        <View style={{ flexDirection: "row" }}>
          {elevationTagArray.map((tag, index) => {
            return (
              <View key={index} style={styles.tagsInactiveButton}>
                <TouchableOpacity
                  style={tag === elevationTag && styles.tagsActiveButton}
                  onPress={() => elevationTagSelect(tag)}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.tagsCategoryContainer}>
        <Text style={styles.tagsInAddEntryTitle}>Diameter:</Text>
        <View style={{ flexDirection: "row" }}>
          {diameterTagArray.map((tag, index) => {
            return (
              <View key={index} style={styles.tagsInactiveButton}>
                <TouchableOpacity
                  style={tag === diameterTag && styles.tagsActiveButton}
                  onPress={() => diameterTagSelect(tag)}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Tags;
