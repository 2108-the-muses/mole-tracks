import React from "react";
import {Provider} from "react-redux";
import store from "./client/store";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AppRegistry} from "react-native";
import {name} from "./app.json";

import {home, login, signup, body, moles, singleMole, entry} from "./client/NavigationConstants";
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
        <Stack.Navigator initialRouteName="loading">
          <Stack.Screen name="loading" component={Loading} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name={home} component={Home} />
          <Stack.Screen name={body} component={Body} />
          <Stack.Screen name={moles} component={Moles} />
          <Stack.Screen name={singleMole} component={SingleMole} />
          <Stack.Screen name={entry} component={Entry} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

AppRegistry.registerComponent(name, () => Main);
