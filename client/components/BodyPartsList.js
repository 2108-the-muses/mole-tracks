import React, {useEffect} from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {fetchAllMoles} from "../store/mole";
import {useDispatch, useSelector} from "react-redux";
import Moles from "./Moles";

const BodyPartsList = ({navigation}) => {
  let moles = useSelector((state) => state.allMoles);

  let bodyParts = ["head", "torso", "arm-l", "arm-r", "leg-l", "leg-r", "groin", "butt"];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMoles());
  }, []);

  const list = () => {
    return bodyParts.map((bodyPart, index) => {
      let molesInBodyPart = moles.filter((mole) => mole.bodyPart === bodyPart);

      if (molesInBodyPart.length)
        return (
          <View key={index} style={styles.bodyParts}>
            <TouchableOpacity>
              <View style={styles.titleBox}>
                <View style={styles.title}>
                  <Text style={styles.titleText}>{bodyPart}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <Text>
              <Moles navigation={navigation} moles={molesInBodyPart} />
            </Text>
          </View>
        );
    });
  };

  if (moles.length) {
    return <View>{list()}</View>;
  } else {
    return (
      <View>
        <Text>You have no moles!</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   // backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  titleBox: {
    flexDirection: "row",
    width: 260,
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 13,
  },
  title: {
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 115,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "gray",
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 1,
  },
  titleText: {
    color: "white",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 25,
  },
  scrollView: {
    flex: 1,
  },
  bodyParts: {},
});

export default BodyPartsList;
