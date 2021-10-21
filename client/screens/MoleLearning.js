import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableOpacity, Text, ImageBackground, ActivityIndicator} from "react-native";
import styles from "../styles.js";
import {
  getModel,
  convertBase64ToTensor,
  startPrediction,
} from '../../assets/MachineLearning/tensorHelper';
import {cropPicture} from '../../assets/MachineLearning/imageHelper'

const MoleLearning = ({photo}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [presentedShape, setPresentedShape] = useState('');
  const RESULT_MAPPING = ['Malignant', 'Benign', 'Unknown'];

  const handleImageCapture = async () => {
    setIsProcessing(true);
    processImagePrediction(photo);
  };


  const processImagePrediction = async (base64Image) => {
    const croppedData = await cropPicture(base64Image, 300);  ///you need this to flatten
    console.log("cropped data", croppedData)

    const model = await getModel();
    console.log("model", model)

    const tensor = await convertBase64ToTensor(croppedData.base64); /// this is where i got stuck
    console.log("tensor", tensor )


    const prediction = await startPrediction(model, tensor);

    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction),
    );
    setPresentedShape(RESULT_MAPPING[highestPrediction]);
  };



  return (

    <View>
      <View visible={isProcessing} transparent={true} animationType="slide">
        <View >
          <View>
            <Text>Your current shape is {presentedShape}</Text>
            {presentedShape === '' && <ActivityIndicator size="large" />}
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={() => {
                setPresentedShape('');
                setIsProcessing(false);
              }}>
              <Text>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonLarge} >
        <Text style={styles.buttonLargeText} onPress={handleImageCapture}> Check Mole </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoleLearning;

