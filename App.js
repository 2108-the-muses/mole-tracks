import React from "react";
import {Provider} from "react-redux";
import store from "./client/store";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useFonts} from "@use-expo/font";
import {AppLoading} from "expo";

import {
  MAIN,
  LOGIN,
  SIGNUP,
  LOADING,
  HOME,
  BODY,
  MOLES,
  SINGLEMOLE,
  ENTRY,
} from "./client/NavigationConstants";
import Login from "./client/screens/Login";
import Entry from "./client/screens/Entry";
import Body from "./client/screens/Body";
import Moles from "./client/screens/Moles";
import SingleMole from "./client/screens/SingleMole";
import Loading from "./client/screens/Loading";
import SignUp from "./client/screens/SignUp";
import Main from "./client/screens/Main";

// this is a dummy component for now
import Home from "./client/screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={LOGIN}>
          <Stack.Screen name={LOADING} component={Loading} />
          <Stack.Screen name={MAIN} component={Main} />
          <Stack.Screen name={LOGIN} component={Login} />
          <Stack.Screen name={SIGNUP} component={SignUp} />
          <Stack.Screen name={HOME} component={Home} />
          <Stack.Screen name={BODY} component={Body} />
          <Stack.Screen name={MOLES} component={Moles} />
          <Stack.Screen name={SINGLEMOLE} component={SingleMole} />
          <Stack.Screen name={ENTRY} component={Entry} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
