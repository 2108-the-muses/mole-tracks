import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import styles from "../styles";

class Loading extends React.Component {
  render() {
    return (
      <View style={styles.containerCenter}>
        <ActivityIndicator size="large" color="#FF7379" />
      </View>
    );
  }
}
export default Loading;
