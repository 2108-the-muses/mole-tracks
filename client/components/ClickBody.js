import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Touchable,
} from "react-native";
import styles from "../styles";
import ToggleSideButtons from "./frontBackToggle";
import BodyPartCoords from "../misc/bodyPartCoords";

const ClickBody = ({ setBodyPart, setSide, sendCoords }) => {
  const [coords, setCoords] = useState({ x: false });
  const frontBody = "../../assets/images/body-front.png";
  const backBody = "../../assets/images/body-back.png";
  const [viewFront, setViewFront] = useState(true);

  
  const toggleSide = (front) => {
    setViewFront(front);
  };
  
  const touchBody = (e) => {
    setCoords({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY });
  };
 
  const whichBodyPart = (x, y) => {
    setSide(viewFront ? "front" : "back");
    sendCoords({ x: Math.floor(x), y: Math.floor(y) });
    const BPC = Object.keys(BodyPartCoords);
    for (let bodyPart of BPC) {
      const part = BodyPartCoords[bodyPart];
      if (y < part.yMax && y > part.yMin && x < part.xMax && x > part.xMin) {
        setBodyPart(bodyPart);
      }
    }
  };
  useEffect(() => {
    whichBodyPart(coords.x, coords.y);
  }, [coords]);
  return (
    <View
      style={{
        ...styles.flexStart,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ToggleSideButtons toggleSide={toggleSide} viewFront={viewFront} />
      <TouchableWithoutFeedback onPress={touchBody}>
        <View>
          {coords.x&&<View style={{ ...styles.moleDot, top: coords.y, left: coords.x }} />}
          <Image
            style={{ marginTop: 10 }}
            source={viewFront ? require(frontBody) : require(backBody)}
          />
        </View>
      </TouchableWithoutFeedback>
      
    </View>
  );
};

export default ClickBody;
