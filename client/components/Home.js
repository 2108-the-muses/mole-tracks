import React from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { login, entry } from '../NavigationConstants';

const Home = (props) => {
  const navigation = props.navigation;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(login)}>
        Login
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(entry)}>
        Entry
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    width: 150,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
