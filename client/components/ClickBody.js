import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text, Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from '../styles'

const ClickBody = ()=>{
  return(<View style = {styles.containerCenter}>
    <Image style = {styles.backgroundImage} source ='../../assets/background.png' />
    <Text>where the body goes</Text>
  </View>)
}

export default ClickBody

