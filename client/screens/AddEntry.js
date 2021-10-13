import React, { useEffect, useState, useRef } from "react";
import {useSelector} from 'react-redux'
import {
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
  Text
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectDropdown from "react-native-select-dropdown";
import styles from "../styles";

const AddEntry = ({ route }) => {
  console.log('help')
  const base64Img = route.params.base64Img
  const bodyParts = ["head", "torso", "arm-l", "arm-r", "leg-l", "leg-r"];
  const [notes, setNotes] = useState(null);
  const [moleId, setMoleId]= useState(route.params.moleId)
  const [bodyPart, setBodyPart]= useState("")
  let moles = useSelector((state) => state.allMoles)
  const [bodyPartMoles, setBodyPartMoles] = useState([])
 
  const handleSubmit = () => {
    //upload photo to cloudinary
    //axios request that includes creating mole (possibly),
    // create entry with image and notes
    //Redirect to that entry

    //NOT IN HANDLE SUBMIT => RENDER DIFF TAKEPHOTO PROPS
    ////Pass moleID through takephoto, then pass moleID and img to AddEntry
    //Add mole needs to connect w/ takephoto
    //AddEntry conditional render if moleID is present or not
  };
  useEffect(()=>{
    console.log('moles', typeof moles)
      const molesArray = moles.filter((mole) => {console.log(mole.bodyPart); return mole.bodyPart === bodyPart})
      console.log('molesArray',molesArray)
      setBodyPartMoles( molesArray)
  },[bodyPart])
  useEffect(()=>{console.log('bodypartmoles',bodyPartMoles)},[bodyPartMoles])
  return (
    <View style={{...styles.container, flex:1}}>
     
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.background}
        />

        <View style={styles.content}>
          <View style={styles.imageBox}>
            <Image
              style={styles.entryImage}
              source={{ uri: base64Img }}
            />
          </View>
          <View style={styles.notesBox}>
            <TextInput
              placeholder="notes"
              style={styles.textInput}
              onChangeText={(notes) => setNotes(notes)}
              value={notes}
            />
          </View>
          <View>
          {!moleId &&
          (<SelectDropdown
            data = {bodyParts}
            defaultButtonText= {"Select Body Part"}
            onSelect = {(selected)=>{setBodyPart(selected);}}
          />)}
          {/* {bodyPartMoles.length &&
            (<SelectDropdown
            data = {bodyPartMoles}
            defaultButtonText= {"Select Mole"}
            onSelect = {(selected)=>{setMoleId(selected.id)}}
          />)}  */}
          </View>
          <TouchableOpacity onPress={handleSubmit}></TouchableOpacity>
        </View>
  
    </View>
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
