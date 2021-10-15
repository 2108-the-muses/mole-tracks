import React, { useReducer } from "react";
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet, View, Text, TouchableOpacity, ImageBackground, SafeAreaView} from "react-native";
import styles from "../styles";

{/* <TouchableOpacity onPress={() => props.navigation.navigate("Entry")}> */}
// </TouchableOpacity>

const Profile = (props) => {

  const user = useSelector((state) => state.auth.user);

  return (
    <SafeAreaView>
    <View style={styles.profileContainer}>
      <ImageBackground
          source={require("../../assets/images/face-with-mole.png")}
          style={styles.profileImage}
        />
        <View>
    <Text style={styles.profileText}>
      <Text style={{fontSize: 26}}>Account Information{"\n"}</Text>
      <Text>First Name: {user.firstName} {"\n"}</Text>
      <Text>Last Name: {user.firstName} {"\n"}</Text>
      <Text>Email: {user.email} </Text>
      {/* <TouchableOpacity onPress={() => props.navigation.navigate("Entry")}> */}
        </Text>
        </View>
    </View>
    </SafeAreaView>
  );
};

export default Profile;
