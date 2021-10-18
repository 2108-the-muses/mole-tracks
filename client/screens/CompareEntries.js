/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import styles from "../styles";

const CompareEntries = (props) => {
  const entries = props.route.params.entries;
  const name = props.route.params.name;
  const [entryOne, setEntryOne] = useState(null);
  const [entryTwo, setEntryTwo] = useState(null);

  const dateTruncated = (createdAt) => {
    const splitDate = createdAt.split("-");
    let orderedDate = [
      splitDate[1],
      splitDate[2].split("T")[0],
      splitDate[0].slice(2),
    ];
    orderedDate = orderedDate.join("/");
    return orderedDate;
  };

  const entryLabels = entries.map(
    (entry) => `${dateTruncated(entry.createdAt)} (id: ${entry.id})`
  );

  const parseEntryLabel = (label) => {
    const id = +label.split(/[():\s]/)[4];
    const entry = entries.filter((entry) => entry.id === id)[0];
    return entry;
  };

  return (
    <View style={styles.containerFlexStart}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />

      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
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
            <Text style={styles.buttonLargeText}>compare</Text>
          </View>
          <Image
            style={styles.moleSilhouette}
            source={require("../../assets/images/mole-silhouette.png")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginTop: 10,
          }}
        >
          <View style={{ width: "50%" }}>
            <SelectDropdown
              buttonStyle={styles.dropdownBtnStyle}
              buttonTextStyle={styles.dropdownBtnTxtStyle}
              dropdownStyle={styles.dropdownDropdownStyle}
              rowStyle={styles.dropdownRowStyle}
              rowTextStyle={styles.dropdownRowTxtStyle}
              data={entryLabels}
              defaultButtonText={"entry 1"}
              onSelect={(selected) => setEntryOne(parseEntryLabel(selected))}
            />
          </View>
          <View style={{ width: "50%" }}>
            <SelectDropdown
              buttonStyle={styles.dropdownBtnStyle}
              buttonTextStyle={styles.dropdownBtnTxtStyle}
              dropdownStyle={styles.dropdownDropdownStyle}
              rowStyle={styles.dropdownRowStyle}
              rowTextStyle={styles.dropdownRowTxtStyle}
              data={entryLabels}
              defaultButtonText={"entry 2"}
              onSelect={(selected) => setEntryTwo(parseEntryLabel(selected))}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View style={{ width: "50%", alignItems: "center", padding: 10 }}>
            {entryOne && (
              <>
                <View style={styles.polaroidContainer}>
                  <Image
                    source={{ uri: entryOne.imgUrl }}
                    style={styles.polaroidImage}
                  ></Image>
                  <View style={styles.polaroidLabel}>
                    <Text style={styles.headerText}>
                      {dateTruncated(entryOne.createdAt)}
                    </Text>
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text style={styles.fontSmall}>{entryOne.notes}</Text>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <TouchableOpacity
                    style={styles.buttonSmall}
                    onPress={() =>
                      props.navigation.navigate("Entry", {
                        entry: entryOne,
                        name: name,
                      })
                    }
                  >
                    <Text style={styles.buttonSmallText}>see entry</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          <View style={{ width: "50%", alignItems: "center", padding: 10 }}>
            {entryTwo && (
              <>
                <View style={styles.polaroidContainer}>
                  <Image
                    source={{ uri: entryTwo.imgUrl }}
                    style={styles.polaroidImage}
                  ></Image>
                  <View style={styles.polaroidLabel}>
                    <Text style={styles.headerText}>
                      {dateTruncated(entryTwo.createdAt)}
                    </Text>
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text style={styles.fontSmall}>{entryTwo.notes}</Text>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <TouchableOpacity
                    style={styles.buttonSmall}
                    onPress={() =>
                      props.navigation.navigate("Entry", {
                        entry: entryTwo,
                        name: name,
                      })
                    }
                  >
                    <Text style={styles.buttonSmallText}>see entry</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CompareEntries;
