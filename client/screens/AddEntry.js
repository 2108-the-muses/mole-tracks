import React, { useEffect } from "react";
import {StyleSheet, View, Text,TextInput, Image, ImageBackground} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles'
import * as ImagePicker from 'expo-image-picker'


const AddEntry = ()=>{
  return(
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.background}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.date}>Add a new entry</Text>
        </View>
        <View style={styles.imageBox}>
          <Image style={styles.image}></Image>
          
        </View>
        <View>
        <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.notesBox}>
          <TextInput style={styles.form} placeholder= "notes"/>
        </View>
      </View>
      <TouchableOpacity style>
        Update
      </TouchableOpacity>
    </View>)
}

export default AddEntry
