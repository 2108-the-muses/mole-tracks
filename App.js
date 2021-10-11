import React from "react";
import {Provider, useSelector} from "react-redux";
import store from "./client/store";
import {NavigationContainer} from "@react-navigation/native";
import {useFonts} from "@use-expo/font";
import {AppLoading} from "expo";
import {LOGIN, SIGNUP, LOADING} from "./client/NavigationConstants";
import Login from "./client/screens/Login";
import Main from "./client/screens/Main"
import Loading from "./client/screens/Loading";
import SignUp from "./client/screens/SignUp";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Main/>
      </NavigationContainer>
    </Provider>
  );
}
