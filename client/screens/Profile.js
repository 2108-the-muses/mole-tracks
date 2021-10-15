import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
  TextInput,
} from "react-native";
import styles from "../styles";
import { updateUserThunk, updatePassword } from "../store/auth";

const Profile = (props) => {
  const user = useSelector((state) => state.auth.user);

  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState("***");
  const [passwordDuplicate, setPasswordDuplicate] = useState("***");

  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(user.firstName);
  }, [user.firstName]);

  useEffect(() => {
    setLastName(user.lastName);
  }, [user.lastName]);

  const handleUpdateUser = async () => {
    try {
      const response = await dispatch(updateUserThunk({ firstName, lastName }));
      response && setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await updatePassword(password);
      console.log("HANDLE UPDATE PASSWORD: ", response);
      if (response !== true) {
        setError(response);
      } else {
        setIsEditPassword(false);
        setError(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.profileContainer}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Image
            style={styles.tinyImage}
            source={require("../../assets/images/face-with-mole.png")}
          ></Image>
        </View>
      </View>
      <View style={{ marginLeft: 20 }}>
        <View>
          {isEdit ? (
            <View style={styles.profileText}>
              <Text>Email: {user.email}</Text>
              <TextInput
                onChangeText={(firstName) => setFirstName(firstName)}
                value={firstName}
                style={{ borderBottomWidth: 1, borderColor: "black" }}
              ></TextInput>
              <TextInput
                onChangeText={(lastName) => setLastName(lastName)}
                value={lastName}
                style={{ borderBottomWidth: 1, borderColor: "black" }}
              ></TextInput>
              <TouchableOpacity onPress={handleUpdateUser}>
                <Text>Update</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.profileText}>
              <Text>Email: {user.email}</Text>
              <Text>First Name: {user.firstName}</Text>
              <Text>Last Name: {user.lastName}</Text>

              <TouchableOpacity onPress={() => setIsEdit(true)}>
                <Text>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          {isEditPassword ? (
            <View>
              <TextInput
                secureTextEntry
                onChangeText={(password) => setPassword(password)}
                value={password}
                style={{ borderBottomWidth: 1, borderColor: "black" }}
              ></TextInput>
              <TextInput
                secureTextEntry
                onChangeText={(passwordDuplicate) =>
                  setPasswordDuplicate(passwordDuplicate)
                }
                value={passwordDuplicate}
                style={{ borderBottomWidth: 1, borderColor: "black" }}
              ></TextInput>
              {error && (
                <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
              )}
              {password !== passwordDuplicate ? (
                <Text>Passwords must match!</Text>
              ) : (
                <TouchableOpacity onPress={handleUpdatePassword}>
                  <Text>Update Password</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View>
              <TouchableOpacity onPress={() => setIsEditPassword(true)}>
                <Text>Edit Password</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
