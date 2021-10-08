import React from "react";
import {Provider} from "react-redux";
import store from "./store";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {home, login, signup, body, moles, singleMole, entry} from "./NavigationConstants";
import Login from "./screens/Login";
import Entry from "./screens/Entry";
import Signup from "./screens/Signup";
import Body from "./screens/Body";
import Moles from "./screens/Moles";
import SingleMole from "./screens/SingleMole";

// this is a dummy component for now
import Home from "./screens/Home";

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
