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
import { format } from "date-fns";

const CompareEntries = (props) => {
  const entries = props.route.params.entries;
  const name = props.route.params.name;
  const moleId = props.route.params.moleId;
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

  // @todo turn this into an object so that id is not in the list
  const entryLabels = entries.map(
    (entry) => `${format(new Date(entry.date), "P")} (id: ${entry.id})`
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
          <View style={styles.screenTitle}>
            <Text style={styles.fontExtraLarge}>compare</Text>
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
                  <View
                    style={{
                      ...styles.polaroidLabel,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.headerText}>
                      {format(new Date(entryOne.date), "PP")}
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
                        moleId: moleId,
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
                  <View
                    style={{
                      ...styles.polaroidLabel,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.headerText}>
                      {format(new Date(entryTwo.date), "PP")}
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
                        moleId: moleId,
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
