import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { fetchAllMoles } from '../store/mole';
import { useDispatch, useSelector } from 'react-redux';
import Moles from './moles';

const BodyPartsList = () => {
	let moles = useSelector((state) => state.allMoles);
	console.log('getting moles', moles);

	let bodyParts = [
		'head',
		'torso',
		'arm-l',
		'arm-r',
		'leg-l',
		'leg-r',
		'groin',
		'butt',
	];

	const dispatch = useDispatch();

	//Currently hard coded for user 1. Add individual user functionality later.
	useEffect(() => {
		dispatch(fetchAllMoles(1));
	}, []);

	const list = () => {
		return bodyParts.map((bodyPart, index) => {
			console.log(bodyPart);
			let moleys = moles.filter((mole) => mole.bodyPart === bodyPart);
			console.log('moleys', moleys);

			return (
				<View key={index}>
					<Text style={styles.title}>{bodyPart}</Text>
					<Text>
						<Moles moles={moleys} />
					</Text>
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
	title: {
		flex: 1,
		fontSize: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default BodyPartsList;
