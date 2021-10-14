import React, { useState } from "react";
import styles from "../styles";
import { TAKEPHOTO ,ADDMOLE} from "../NavigationConstants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text, TouchableOpacity } from "react-native";

const Add = ({ navigation }) => {
  const [selected, setSelected] = useState("");

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(TAKEPHOTO, { moleId: undefined })
            }
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>entry</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(ADDMOLE)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>mole</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 10 }}>or</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Add;
