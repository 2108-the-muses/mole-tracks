import React, { useEffect,useState } from "react";
import {StyleSheet, View, Text,TextInput,TouchableOpacity, Image, ImageBackground} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles'
import * as ImagePicker from "expo-image-picker";
import { app } from "../firebase-auth/config";
import { v4 as uuidv4 } from "uuid";
import * as MediaLibrary from "expo-media-library";
import * as Camera from "expo-camera";


const AddEntry = ()=>{
  const [image, setImage] = useState(null)
  const [uploading,setUploading] = useState(false)

  const uploadImageAsync= async (uri) =>{
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = app
      .storage()
      .ref()
      .child(uuidv4());

    const snapshot = await ref.put(blob);
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  }

  const handleImagePicked = async pickerResult => {
		try {
      setUpload(true)
			if (!pickerResult.cancelled) {
				uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(uploadUrl)
			}
		} catch (e) {
			console.log(e);
			alert('Upload failed, sorry :(');
		} finally {
			setUploading(false)
		}
	};
  const takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});
		handleImagePicked(pickerResult);
    
	};

  useEffect(async ()=>{
    await MediaLibrary.requestPermissionsAsync()
    await Camera.requestPermissionsAsync();
  },[])

  return(
    <View style={styles.container}>
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.background}
    />
    <TouchableOpacity onPress= {takePhoto}>
    <View style={styles.content}>
      <View style={styles.imageBox}>
        <Text style={styles.name}>click here to upload</Text>
      </View>
      <View style={styles.notesBox}>
        <TextInput placeholder= 'notes'></TextInput>
      </View>
    </View>
    </TouchableOpacity>
  </View>)
}

export default AddEntry
