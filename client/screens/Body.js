import React,{useState} from "react";
import { Image,View, Text, ImageBackground, TouchableOpacity } from "react-native";
import styles from "../styles";
import ToggleSideView from '../components/frontBackToggle'

const Body = (props) => {
  const [viewFront, setViewFront] = useState(true);
  const toggleSide = (front) => {
    if (viewFront !== front) setViewFront((viewFront) => !viewFront);
  };
  
  return (
    <View style={{
      ...styles.flexStart,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <ToggleSideView toggleSide={toggleSide} viewFront={viewFront}/>
       <Image/>
    </View>
  );
};

export default Body;
