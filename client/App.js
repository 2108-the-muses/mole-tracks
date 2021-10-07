import React from "react";
import {Provider} from "react-redux";
import store from "./store";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {home, login, signup, body, moles, singleMole, entry} from "./NavigationConstants";
import Login from "./components/Login";
import Entry from "./components/Entry";
import Signup from "./components/Signup";
import Body from "./components/Body";
import Moles from "./components/Moles";
import SingleMole from "./components/SingleMole";

// this is a dummy component for now
import Home from "./components/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name={home} component={Home} />
          <Stack.Screen name={login} component={Login} />
          <Stack.Screen name={signup} component={Signup} />
          <Stack.Screen name={body} component={Body} />
          <Stack.Screen name={moles} component={Moles} />
          <Stack.Screen name={singleMole} component={SingleMole} />
          <Stack.Screen name={entry} component={Entry} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
