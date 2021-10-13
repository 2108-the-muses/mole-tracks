import React, {useEffect} from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {fetchAllMoles} from "../store/mole";
import {FETCH_FAILED, FETCH_PENDING, FETCH_SUCCESS} from "../store/mole";
import {useDispatch, useSelector} from "react-redux";
import Moles from "./Moles";
import Loading from "../screens/Loading";

const BodyPartsList = ({navigation}) => {
  let moles = useSelector((state) => state.allMoles.moles);
  const fetchStatus = useSelector((state) => state.allMoles.fetchStatus);

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

  if (fetchStatus === FETCH_PENDING) {
    return <Loading />;
  } else if (fetchStatus === FETCH_SUCCESS) {
    if (moles.length) {
      return <View>{list()}</View>;
    } else {
      return (
        <View style={{marginTop: 25}}>
          <Text style={styles.alertText}>You have no moles!</Text>
          <TouchableOpacity onPress={() => navigation.navigate("AddMole")} style={styles.button}>
            <Text style={styles.buttonText}>add a mole!</Text>
          </TouchableOpacity>
        </View>
      );
    }
  } else if (fetchStatus === FETCH_FAILED) {
    return (
      <View>
        <Text>FETCH STATUS FAILED</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
  buttonBox: {
    flexDirection: "row",
    width: 260,
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#FF7379",
    width: 250,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "gray",
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 1,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 22,
  },
  alertText: {
    color: "black",
    textAlign: "center",
    fontFamily: "SulphurPoint-Regular",
    fontSize: 22,
  },
});

export default BodyPartsList;
