import React from "react";
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
  ADD,
} from "../NavigationConstants";
import Login from "../screens/Login";
import Entry from "../screens/Entry";
import Body from "../screens/Body";
import Moles from "../screens/Moles";
import SingleMole from "../screens/SingleMole";
import Loading from "../screens/Loading";
import SignUp from "../screens/SignUp";
import Main from "../screens/Main";
import Add from "../screens/Add";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// this is a dummy component for now
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

const BodyStack = () => {
  return (
    <Stack.Navigator headerMode="auto" initialRouteName={BODY}>
      <Stack.Screen name={LOADING} component={Loading} />
      <Stack.Screen name={BODY} component={Body} />
      <Stack.Screen name={SINGLEMOLE} component={SingleMole} />
    </Stack.Navigator>
  );
};

const MolesStack = () => {
  return (
    <Stack.Navigator headerMode="auto" initialRouteName={MOLES}>
      <Stack.Screen name={LOADING} component={Loading} />
      <Stack.Screen name={MOLES} component={Moles} />
      <Stack.Screen name={SINGLEMOLE} component={SingleMole} />
    </Stack.Navigator>
  );
};

const AddStack = () => {
  return (
    <Stack.Navigator headerMode="auto" initialRouteName={ADD}>
      <Stack.Screen name={LOADING} component={Loading} />
      <Stack.Screen name={ADD} component={Add} />
      <Stack.Screen name={SINGLEMOLE} component={SingleMole} />
      <Stack.Screen name={ENTRY} component={Entry} />
    </Stack.Navigator>
  );
};

const UserStack = () => {
  return (
    <Stack.Navigator headerMode="auto" initialRouteName={Profile}>
      <Stack.Screen name={LOADING} component={Loading} />
      {/* <Stack.Screen name={PROFILE} component={Profile} /> */}
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator headerMode="auto" initialRouteName={BODY}>
      <Tab.Screen name="Body" component={BodyStack} />
      <Tab.Screen name="Moles" component={MolesStack} />
      <Tab.Screen name="Add" component={Add} initialParams={{ selected: "" }} />
      <Tab.Screen name="User" component={UserStack} />
    </Tab.Navigator>
  );
};

const Auth = createNativeStackNavigator();

export const AuthNavigator = () => {
  return(<Auth.Navigator headerMode="auto" initialRouteName={LOGIN}>
    <Auth.Screen name={LOGIN} component={Login} />
    <Auth.Screen name={SIGNUP} component={SignUp} />
    <Auth.Screen name={LOADING} component={Loading} />
    <Auth.Screen name={BODY} component={Body} />
  </Auth.Navigator>)
};
