import React from "react";
import { Provider } from "react-redux";
import store from "./client/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import {TabNavigator} from "./client/navigation/index";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
    </Provider>
  );
}
