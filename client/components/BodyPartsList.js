import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fetchAllMoles } from "../store/mole";
import { FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS } from "../store/mole";
import { useDispatch, useSelector } from "react-redux";
import Moles from "./Moles";
import Loading from "../screens/Loading";
import styles from "../styles";
import { Entypo } from "@expo/vector-icons";

const BodyPartsList = ({ navigation }) => {
  let moles = useSelector((state) => state.allMoles.moles);
  const fetchStatus = useSelector((state) => state.allMoles.fetchStatus);

  let bodyParts = [
    "head",
    "torso",
    "arm-l",
    "arm-r",
    "leg-l",
    "leg-r",
    "groin",
    "butt",
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMoles());
  }, []);

  const list = () => {
    return bodyParts.map((bodyPart, index) => {
      let molesInBodyPart = moles.filter((mole) => mole.bodyPart === bodyPart);

      if (molesInBodyPart.length)
        return (
          <View key={index} style={{ marginBottom: 0 }}>
            <View style={{ ...styles.headerBox, paddingHorizontal: "3%" }}>
              <Text style={styles.headerText}>{bodyPart}</Text>
              {/* @todo order the nicknames of moles alphabetically */}
              <TouchableOpacity
                onPress={() =>
                  console.log("Orders alphabetically, forward and reverse")
                }
              >
                <Entypo name="select-arrows" size={16} color="black" />
              </TouchableOpacity>
            </View>

            <View>
              <Moles navigation={navigation} moles={molesInBodyPart} />
            </View>
          </View>
        );
    });
  };

  if (fetchStatus === FETCH_PENDING) {
    return <Loading />;
  } else if (fetchStatus === FETCH_SUCCESS) {
    if (moles.length) {
      return list();
    } else {
      return (
        <View style={{ marginTop: 25 }}>
          <Text style={styles.headerText}>You have no moles!</Text>
          <TouchableOpacity
            onPress={() => navigation.push("AddMole")}
            style={styles.buttonLarge}
          >
            <Text style={styles.buttonLargeText}>add a mole!</Text>
          </TouchableOpacity>
        </View>
      );
    }
  } else if (fetchStatus === FETCH_FAILED) {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.fontExtraLarge}>
          Uh oh! We were unable to fetch your moles!
        </Text>
      </View>
    );
  }
};

export default BodyPartsList;
