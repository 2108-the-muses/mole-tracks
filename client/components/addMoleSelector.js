import React, { useState } from "react";
import {
  View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import styles from '../styles'

const Selector = ({side,setSide,bodyPart,setBodyPart}) => {
    const sides = ["front", "back"];
    let bodyParts = ["head", "torso", "arm-l", "arm-r", "leg-l", "leg-r"];
    side === "front"
      ? (bodyParts = [...bodyParts, "groin"])
      : (bodyParts = [...bodyParts, "butt"]);
  side === "front"
  ? (bodyParts = [...bodyParts, "groin"])
  : (bodyParts = [...bodyParts, "butt"]);
  return (
    <View>
      <SelectDropdown
        data={sides}
        defaultButtonText={"select side"}
        buttonStyle={styles.dropdown2BtnStyle}
        buttonTextStyle={styles.dropdown2BtnTxtStyle}
        dropdownStyle={styles.dropdown2DropdownStyle}
        rowStyle={styles.dropdown2RowStyle}
        rowTextStyle={styles.dropdown2RowTxtStyle}
        onSelect={(selected) => setSide(selected)}
      />
      {side !== "" && (
        <SelectDropdown
          data={bodyParts}
          defaultButtonText={"select body part"}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
          onSelect={(selected) => setBodyPart(selected)}
        />
      )}
    </View>
  );
};

export default Selector
