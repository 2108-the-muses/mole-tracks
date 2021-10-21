import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import { ADDENTRY } from "../navigation/constants";
import { Camera } from "expo-camera";
import styles from "../styles";
import MoleLearning from "./MoleLearning";
import { database } from "firebase-admin";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

const TakePhoto = ({ navigation, route }) => {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [sourceInfo, setSourceInfo] = useState(null);
  const [moleLearning, setMoleLearning] = useState(null);

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
        setMoleLearning(data)
      }
    }
  };

  const onAcceptPhoto = () => {
    let base64Img = `data:image/jpg;base64,${sourceInfo}`;
    navigation.push(ADDENTRY, {
      base64Img: base64Img,
      moleId: route.params.moleId,
      mole: route.params.mole,
    });
  };

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
    <View style={styles.photoContainer}>
      <Camera
        ref={cameraRef}
        style={styles.photoContainer}
        type={cameraType}
        onCameraReady={onCameraReady}
        useCamera2Api={true}
      />

      <View style={styles.photoGuide}></View>

      <View style={styles.photoTopContainer}>
        <Text style={styles.photoCaptureDimeAdvice}>
          Please line up your dime with the dime image!
        </Text>
        <View>
          <Image
            style={styles.dimeImage}
            source={require("../../assets/images/dime_image.png")}
          />
        </View>
      </View>

      {isPreview && (
        <View style={styles.photoBottomButtonsContainer}>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={onAcceptPhoto}
            style={styles.photoCapture}
          >
            <Text style={styles.photoCaptureText}>Accept Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={retakePic}
            style={styles.photoCapture}
          >
            <Text style={styles.photoCaptureText}>Retake Photo</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isPreview && (
        <View style={styles.photoBottomButtonsContainer}>
          <TouchableOpacity
            activeOpacity={0.3}
            disabled={!isCameraReady}
            onPress={switchCamera}
            style={styles.photoCapture}
          >
            <Text style={styles.photoCaptureText}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            disabled={!isCameraReady}
            onPress={onSnap}
            style={styles.photoCapture}
          >
            <Text style={styles.photoCaptureText}>Take Photo</Text>
          </TouchableOpacity>
          <MoleLearning photo={moleLearning} />
        </View>
      )}
    </View>
  );
};

export default TakePhoto;
