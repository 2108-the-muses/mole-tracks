import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	SafeAreaView,
	Image,
	TextInput,
} from 'react-native';
import styles from '../styles';
import { updateUserThunk } from '../store/auth'

{
	/* <TouchableOpacity onPress={() => props.navigation.navigate("Entry")}> */
}
// </TouchableOpacity>

const Profile = (props) => {
	const user = useSelector((state) => state.auth.user);

	const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

	const dispatch = useDispatch();


  useEffect(() => {
    setFirstName(user.firstName);
  }, [user.firstName]);

  useEffect(() => {
    setLastName(user.lastName);
  }, [user.lastName]);

  useEffect(() => {
    setEmail(user.email);
  }, [user.email]);


	return (
		<SafeAreaView style={styles.profileContainer}>
			<View style={styles.userInfoSection}>
				<View style={{ flexDirection: 'row', marginTop: 15 }}>
					<Image
						style={styles.tinyImage}
						source={require('../../assets/images/face-with-mole.png')}
					></Image>
				</View>
			</View>
			<View style={{ marginLeft: 20}}>
				<View>
					<View style={styles.profileText}>
						<Text>
							First Name: {user.firstName} {'\n'}
						</Text>
						<Text>
							Last Name: {user.lastName} {'\n'}
						</Text>
						<Text>Email: {user.email} </Text>
						<TextInput
							onChangeText={(firstName)=> setFirstName(firstName)}
							value={firstName}
							placeholder= "Update here"
							style= {{backgroundColor: "pink"}}
						>
						</TextInput>
						<TouchableOpacity
							onPress={()=>{
								dispatch(updateUserThunk({firstName, lastName, email}))
							}}
							>
							<Text>
								Update
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Profile;
