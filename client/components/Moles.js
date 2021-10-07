import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Moles = () => {
  return (
    <View style={styles.container}>
      <Text>Moles</Text>
    </View>
  );
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
