import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	SafeAreaView,
	Image,
} from 'react-native';
import styles from '../styles';
import { Avatar } from 'react-native-paper';

{
	/* <TouchableOpacity onPress={() => props.navigation.navigate("Entry")}> */
}
// </TouchableOpacity>

const Profile = (props) => {
	const user = useSelector((state) => state.auth.user);

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
				<Text>
					<Text style={styles.profileText}>
						<Text>
							First Name: {user.firstName} {'\n'}
						</Text>
						<Text>
							Last Name: {user.firstName} {'\n'}
						</Text>
						<Text>Email: {user.email} </Text>
					</Text>
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default Profile;
