import React, {useState, useEffect} from "react";
import {Provider} from "react-redux";
import store from "./client/store";
import Main from "./client/screens/Main";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      "SulphurPoint-Bold": require("./assets/fonts/SulphurPoint-Bold.ttf"),
      "SulphurPoint-Light": require("./assets/fonts/SulphurPoint-Light.ttf"),
      "SulphurPoint-Regular": require("./assets/fonts/SulphurPoint-Regular.ttf"),
      "SF-Pro": require("./assets/fonts/SF-Pro.ttf"),
    });
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
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
