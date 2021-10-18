import React, { useEffect,useState } from "react";
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
import ToggleSideButtons from './frontBackToggle'

const ClickBody = ({ setBodyPart, setSide, sendCoords }) => {
  const [coords, setCoords] = useState({ x: false });
  const frontBody = "../../assets/images/body-front.png";
  const backBody = "../../assets/images/body-back.png";
  const [viewFront, setViewFront] = useState(true);
  
  const touchBody = (e) => {
    setCoords({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY });
  };
  const toggleSide = (front) => {
    if (viewFront !== front) setViewFront((viewFront) => !viewFront);
  };
  const whichBodyPart = (x, y) => {
   
    setSide(viewFront ? "front" : "back");
    sendCoords({x,y})
    if (y < 107 && y > 15 && x > 156 && x < 231) {
      setBodyPart("head");
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
      <TouchableWithoutFeedback onPress={touchBody}>
        <View>
          <View style={{ ...styles.moleDot, top: coords.y, left: coords.x }} />
          <Image
            style={{ marginTop: 10 }}
            source={viewFront ? require(frontBody) : require(backBody)}
          />
        </View>
      </TouchableWithoutFeedback>
      <ToggleSideButtons toggleSide={toggleSide} viewFront = {viewFront}/>
    </View>
  );
};

export default ClickBody;
