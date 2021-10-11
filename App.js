import React from "react";
import {Provider, useSelector} from "react-redux";
import store from "./client/store";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useFonts} from "@use-expo/font";
import {AppLoading} from "expo";
import {TabNavigator} from "./client/navigation/index";
import {LOGIN, SIGNUP, LOADING} from "./client/NavigationConstants";
import Login from "./client/screens/Login";

import Loading from "./client/screens/Loading";
import SignUp from "./client/screens/SignUp";

const Stack = createNativeStackNavigator();

export default function App() {
  const user = {
    // uid: "uHiPs9ZlgwPuLeLOIhdsfTUBqCM2",
    email: "cody@moletracks.com",
    firstName: "Cody",
    lastName: "Mole",
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        {user.uid ? (
          <TabNavigator />
        ) : (
          <Stack.Navigator headerMode="auto" initialRouteName={LOGIN}>
            <Stack.Screen name={LOGIN} component={Login} />
            <Stack.Screen name={SIGNUP} component={SignUp} />
            <Stack.Screen name={LOADING} component={Loading} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}
