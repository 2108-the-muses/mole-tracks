import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
// import styles from "../styles"
import ADDENTRY from "../NavigationConstants";
import { Camera } from "expo-camera";
//This is the reducer to add to our DB. Currently not working.
import { addEntry } from "../store/addEntry";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

import { CLOUDINARY_URL, upload_preset } from "../../secrets";

const TakePhoto = ({ navigation, route }) => {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [sourceInfo, setSourceInfo] = useState(null);

  useEffect(() => {
    onHandlePermission();
  }, []);

  const onHandlePermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;

      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        setSourceInfo(source);
      }
    }
  };

  const onAcceptPhoto = async () => {
    let base64Img = `data:image/jpg;base64,${sourceInfo}`;

    
    navigation.navigate("AddEntry", { base64Img: base64Img, moleId: route.params.moleId });
  };
  // const onAcceptPhoto = async () => {
  //   let base64Img = `data:image/jpg;base64,${sourceInfo}`;
  //   let apiUrl = CLOUDINARY_URL;
  //   let data = {
  //     file: base64Img,
  //     upload_preset: upload_preset,
  //   };

  //   fetch(apiUrl, {
  //     body: JSON.stringify(data),
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     method: "POST",
  //   })
  //     .then(async (response) => {
  //       let data = await response.json();
  //       if (data.secure_url) {
  //         alert("Upload to Cloudinary successful");
  //         navigation.navigate("AddEntry", { imgUrl: data.secure_url });
  //       }
  //     })
  //     .catch((err) => {
  //       alert("Cannot upload");
  //       console.log(err);
  //     });
  // };

  const retakePic = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
        useCamera2Api={true}
      />
      <View style={styles.container}>
        {isPreview && (
          <View>
            <TouchableOpacity
              onPress={onAcceptPhoto}
              style={styles.closeButton}
              activeOpacity={0.7}
              style={styles.capture}
            >
              <Text>Accept Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={retakePic} activeOpacity={0.7}>
              <Text>Retake Image</Text>
            </TouchableOpacity>
          </View>
        )}
        {!isPreview && (
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
              <Text>FLIP CAMERA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!isCameraReady}
              onPress={onSnap}
              style={styles.capture}
            >
              <Text>TAKE PIC</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: "#fff",
  },
  bottomButtonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A45FF",
    opacity: 0.7,
  },
  capture: {
    backgroundColor: "#5A45FF",
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30,
  },
});

export default TakePhoto;
