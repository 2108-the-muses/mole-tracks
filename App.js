import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./client/store";
import Main from "./client/screens/Main";

import { LogBox, SafeAreaView } from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context'

import { Asset } from "expo-asset";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
useEffect(()=>{console.log("loaded")},[isLoaded])
  const fonts = {
    "SulphurPoint-Bold": require("./assets/fonts/SulphurPoint-Bold.ttf"),
    "SulphurPoint-Light": require("./assets/fonts/SulphurPoint-Light.ttf"),
    "SulphurPoint-Regular": require("./assets/fonts/SulphurPoint-Regular.ttf"),
    "SF-Pro": require("./assets/fonts/SF-Pro.ttf"),
  };
  const images = [require("./assets/images/face-with-mole.png"),require("./assets/images/body-front.png"),require("./assets/images/body-back.png"),"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/59232/mole-in-hole-clipart-xl.png"];

const loadAssets = async()=>{
  console.log("in load asset")
    await Font.loadAsync(fonts)
    const imageAssets = images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
    await Promise.all([...imageAssets, fontAssets])
}

  if (!isLoaded) {
    return (
      <AppLoading
        startAsync={loadAssets}
        onFinish={() => setIsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
