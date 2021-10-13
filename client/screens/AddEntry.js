import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../styles";

const AddEntry = ({ route }) => {
  const base64Img = route.params.base64Img;
  const [notes, setNotes] = useState(null);

  const handleSubmit = () => {
    //upload photo to cloudinary
    //axios request that includes creating mole (possibly),
    // create entry with image and notes
    //Redirect to that entry
    //NEED TO GET MOLEID
    //NOT IN HANDLE SUBMIT => RENDER DIFF TAKEPHOTO PROPS
    //Pass moleID through takephoto, then pass moleID and img to AddEntry
    //Add mole needs to connect w/ takephoto
    //AddEntry conditional render if moleID is present or not
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.background}
        />

        <View style={styles.content}>
          <View style={styles.imageBox}>
            <Image
              style={styles.entryImage}
              source={{ uri: base64Img }}
            ></Image>
          </View>
          <View style={styles.notesBox}>
            <TextInput
              placeholder="notes"
              style={styles.textInput}
              onChangeText={(notes) => setNotes(notes)}
              value={notes}
            ></TextInput>
          </View>
          <TouchableOpacity onPress={handleSubmit}>Submit</TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddEntry;

// let apiUrl = CLOUDINARY_URL;
//     let data = {
//       file: base64Img,
//       upload_preset: upload_preset,
//     };

//     fetch(apiUrl, {
//       body: JSON.stringify(data),
//       headers: {
//         "content-type": "application/json",
//       },
//       method: "POST",
//     })
//       .then(async (response) => {
//         let data = await response.json();
//         if (data.secure_url) {
//           alert("Upload to Cloudinary successful");
//           navigation.navigate("AddEntry", { imgUrl: data.secure_url });
//         }
//       })
//       .catch((err) => {
//         alert("Cannot upload");
//         console.log(err);
//       });
