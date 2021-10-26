import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../styles";
import ToggleSideButtons from "../components/frontBackToggle";
import {
  fetchAllMoles,
  FETCH_FAILED,
  FETCH_PENDING,
  FETCH_SUCCESS,
} from "../store/mole";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

const Body = ({ navigation }) => {
  const [viewFront, setViewFront] = useState(true);
  const frontBody = "../../assets/images/body-front.png";
  const backBody = "../../assets/images/body-back.png";
  let moles = useSelector((state) => state.allMoles.moles);
  const fetchStatus = useSelector((state) => state.allMoles.fetchStatus);

  const dispatch = useDispatch();
  const toggleSide = (front) => {
    setViewFront(front);
  };
  useEffect(() => {
    dispatch(fetchAllMoles());
  }, []);
  const goToMole = (mole) => {
    navigation.navigate("SingleMole", { mole });
  };
  if (fetchStatus === FETCH_PENDING) {
    return <Loading />;
  } else if (fetchStatus === FETCH_SUCCESS) {
    return (
      <View style={styles.containerScroll}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.backgroundImage}
        />

        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              ...styles.flexStart,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ToggleSideButtons toggleSide={toggleSide} viewFront={viewFront} />
            <View>
              <Image
                style={{ marginTop: 10 }}
                source={viewFront ? require(frontBody) : require(backBody)}
              />
              {moles.length === 0 && (
                <View style={styles.noMoles}>
                  <Text style={{ ...styles.fontExtraLarge, color: "white" }}>
                    You have no moles!
                  </Text>
                </View>
              )}
              {moles
                .filter((mole) => {
                  return (
                    mole.side === (viewFront ? "front" : "back") &&
                    mole.x &&
                    mole.y
                  );
                })
                .map((mole) => {
                  {
                    return (
                      <TouchableOpacity
                        key={mole.nickname}
                        style={{ ...styles.moleDot, top: mole.y, left: mole.x }}
                        onPress={() => goToMole(mole)}
                      />
                    );
                  }
                })}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  } else if (fetchStatus === FETCH_FAILED) {
    return (
      <View style={styles.containerCenter}>
        <Text style={{ ...styles.buttonLargeText, color: "black" }}>
          Uh oh! We were unable to fetch your moles!
        </Text>
      </View>
    );
  }
};

export default Body;
