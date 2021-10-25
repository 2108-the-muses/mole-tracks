import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import { ADDENTRY } from "../navigation/constants";
import { Camera } from "expo-camera";
import styles from "../styles";
import {
  getModel,
  convertBase64ToTensor,
  startPrediction,
} from "../../assets/MachineLearning/tensorHelper";
import { cropPicture } from "../../assets/MachineLearning/imageHelper";
import { setMoleAnalysis } from "../store/entry";

const TakePhoto = ({ navigation, route }) => {
  const cameraRef = useRef();
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [sourceInfo, setSourceInfo] = useState(null);

  const RESULT_MAPPING = ["Unknown", "Malignant", "Benign"];

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

  const processImagePrediction = async (image) => {
    const croppedData = await cropPicture(image, 300); ///you need this to flatten
    const model = await getModel();
    const tensor = await convertBase64ToTensor(croppedData.base64);
    const prediction = await startPrediction(model, tensor);
    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction)
    );
    await dispatch(setMoleAnalysis(RESULT_MAPPING[highestPrediction]));
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
      await processImagePrediction(data);
    }
  };

  const onAcceptPhoto = async () => {
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <View style={styles.photoTopContainer}>
          <Text style={styles.photoCaptureDimeAdvice}>
            Please center your mole on the screen!
          </Text>
        </View>

        <View style={styles.photoGuide}>
          <Camera
            ref={cameraRef}
            style={styles.photoContainer}
            type={cameraType}
            onCameraReady={onCameraReady}
            useCamera2Api={true}
          />
        </View>

        {isPreview && (
          <View style={styles.photoBottomButtonsContainer}>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={onAcceptPhoto}
              style={{ ...styles.photoCapture, marginRight: 20 }}
            >
              <Text style={styles.photoCaptureText}>Accept Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={retakePic}
              style={{ ...styles.photoCapture, margingLeft: 20 }}
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
              style={{ ...styles.photoCapture, marginRight: 20 }}
            >
              <Text style={styles.photoCaptureText}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.3}
              disabled={!isCameraReady}
              onPress={onSnap}
              style={{ ...styles.photoCapture, margingLeft: 20 }}
            >
              <Text style={styles.photoCaptureText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default TakePhoto;
