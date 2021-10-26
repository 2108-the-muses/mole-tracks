import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import styles from "../styles";
import { updateUserThunk, updatePassword } from "../store/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Logout from "../components/Logout";
import { INFO } from "../navigation/constants";
import { firebaseAuth } from "../firebase-auth/config";

const Profile = (props) => {
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState("123456");
  const [passwordDuplicate, setPasswordDuplicate] = useState("123456");

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

  const onPressInfoButton = async () => {
    try {
      props.navigation.navigate(INFO);
    } catch (error) {
      setError(error.message);
    }
  };

  const currentUser = firebaseAuth.currentUser;
  const provider = currentUser.providerData[0].providerId;

  return (
    <View style={styles.containerScroll}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styles.backgroundImage}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{ ...styles.headerBoxLarge, paddingHorizontal: 20 }}>
          <Text style={styles.fontExtraLarge}>Welcome {user.firstName}</Text>
          <Image
            style={styles.logoSmall}
            source={require("../../assets/images/face-with-mole.png")}
          ></Image>
        </View>

        <View>
          <View>
            {isEdit ? (
              <View style={{ margin: 20 }}>
                <TextInput
                  editable={false}
                  style={{
                    ...styles.textInputLarge,
                    borderBottomWidth: 0,
                  }}
                >
                  Email: {user.email}
                </TextInput>
                <TextInput
                  editable={true}
                  onChangeText={(firstName) => setFirstName(firstName)}
                  value={firstName}
                  style={styles.textInputLarge}
                ></TextInput>
                <TextInput
                  editable={true}
                  onChangeText={(lastName) => setLastName(lastName)}
                  value={lastName}
                  style={styles.textInputLarge}
                ></TextInput>
                <TouchableOpacity
                  onPress={handleUpdateUser}
                  style={{ ...styles.buttonLarge, marginTop: 20 }}
                >
                  <Text style={styles.buttonLargeText}>Update</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ margin: 20 }}>
                <TextInput
                  editable={false}
                  style={{
                    ...styles.textInputLarge,
                    borderBottomWidth: 0,
                  }}
                >
                  Email: {user.email}
                </TextInput>
                <TextInput
                  editable={false}
                  style={{
                    ...styles.textInputLarge,
                    borderBottomWidth: 0,
                  }}
                >
                  First Name: {user.firstName}
                </TextInput>
                <TextInput
                  editable={false}
                  style={{
                    ...styles.textInputLarge,
                    borderBottomWidth: 0,
                  }}
                >
                  Last Name: {user.lastName}
                </TextInput>

                <TouchableOpacity
                  onPress={() => setIsEdit(true)}
                  style={{ ...styles.buttonLarge, marginTop: 20 }}
                >
                  <Text style={styles.buttonLargeText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View>
            {isEditPassword ? (
              <View style={{ margin: 20 }}>
                <TextInput
                  secureTextEntry
                  editable={true}
                  onChangeText={(password) => setPassword(password)}
                  value={password}
                  style={styles.textInputLarge}
                ></TextInput>
                <TextInput
                  secureTextEntry
                  editable={true}
                  onChangeText={(passwordDuplicate) =>
                    setPasswordDuplicate(passwordDuplicate)
                  }
                  value={passwordDuplicate}
                  style={styles.textInputLarge}
                ></TextInput>
                {error && (
                  <Text
                    style={{
                      ...styles.fontExtraSmall,
                      color: "red",
                      marginTop: 10,
                    }}
                  >
                    {error}
                  </Text>
                )}
                {password !== passwordDuplicate ? (
                  <Text
                    style={{
                      ...styles.fontExtraSmall,
                      color: "red",
                      marginTop: 10,
                    }}
                  >
                    Passwords must match!
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={handleUpdatePassword}
                    style={{ ...styles.buttonLarge, marginTop: 20 }}
                  >
                    <Text style={styles.buttonLargeText}>Update Password</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              provider !== "google.com" && (
                <View style={{ margin: 20 }}>
                  <TextInput
                    editable={false}
                    style={{
                      ...styles.textInputLarge,
                      borderBottomWidth: 0,
                    }}
                  >
                    Password
                  </TextInput>
                  <TextInput
                    editable={false}
                    secureTextEntry
                    style={{
                      ...styles.textInputLarge,
                      borderBottomColor: "none",
                    }}
                  >
                    {password}
                  </TextInput>
                  <TouchableOpacity
                    onPress={() => setIsEditPassword(true)}
                    style={{ ...styles.buttonLarge, marginTop: 20 }}
                  >
                    <Text style={styles.buttonLargeText}>Change Password</Text>
                  </TouchableOpacity>
                </View>
              )
            )}
          </View>
          <View
            style={{
              ...styles.buttonBox,
              alignContent: "center",
              paddingLeft: 20,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              style={styles.buttonLarge}
              onPress={onPressInfoButton}
            >
              <Text style={styles.buttonLargeText}>Info</Text>
            </TouchableOpacity>
            <Logout />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Profile;
