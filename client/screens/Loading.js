import React from "react";
import {ActivityIndicator, StyleSheet} from "react-native";

class Loading extends React.Component {
  render() {
    return <ActivityIndicator style={styles.loading} size="large" color="#FF7379" />;
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    marginTop: 100,
  },
});

export default Loading;
