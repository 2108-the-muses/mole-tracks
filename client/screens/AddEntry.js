import React, { useEffect } from "react";
mport {StyleSheet, View, Text, Image, ImageBackground} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const AddEntry = ()=>{
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
          <Text style={styles.notes}>{entry.notes}</Text>
        </View>
      </View>
    </View>
}
