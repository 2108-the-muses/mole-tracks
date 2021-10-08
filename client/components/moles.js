import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { fetchAllMoles } from '../store/mole';
import { useDispatch, useSelector } from 'react-redux';

const Moles = ({ moles }) => {
	const list = () => {
		return moles.map((mole, index) => {
			return (
				<View key={index} style={styles.container}>
					<TouchableOpacity>
						<Text>{mole.nickname}</Text>
					</TouchableOpacity>
				</View>
			);
		});
	};
	return <View>{list()}</View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Moles;
