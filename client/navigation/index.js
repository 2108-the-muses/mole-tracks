import React from "react";
import {
  LOGIN,
  SIGNUP,
  LOADING,
  BODY,
  ALLMOLES,
  SINGLEMOLE,
  ENTRY,
  ADD,
  LOGOUT,
  ADDENTRY,
  TAKEPHOTO,
  ADDMOLE,
  INFO,
  PROFILE,
} from "../NavigationConstants";
import cIndex from "../components";
const { Logout } = cIndex;
import sIndex from "../screens";
const {
  Add,
  AddMole,
  AllMoles,
  Body,
  Entry,
  Loading,
  Login,
  SignUp,
  SingleMole,
  TakePhoto,
  AddEntry,
  Info,
  Profile,
} = sIndex;
import Ionicons from "@expo/vector-icons/Ionicons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// this is a dummy component for now

const Stack = createNativeStackNavigator();

const BodyStack = () => {
  return (
    <Stack.Navigator initialRouteName={BODY}>
      <Stack.Screen name={BODY} options={{ title: "Body" }} component={Body} />
      <Stack.Screen name={SINGLEMOLE} component={SingleMole} />
      <Stack.Screen name={LOADING} component={Loading} />
    </Stack.Navigator>
  );
};

const MolesStack = () => {
  return (
    <Stack.Navigator initialRouteName={ALLMOLES}>
      <Stack.Screen name={ALLMOLES} component={AllMoles} />
      <Stack.Screen name={SINGLEMOLE} component={SingleMole} />
      <Stack.Screen name={ENTRY} component={Entry} />
      <Stack.Screen name={LOADING} component={Loading} />
      <Stack.Screen name={ADDMOLE} component={AddMole} />
      <Stack.Screen name={TAKEPHOTO} component={TakePhoto} />
      <Stack.Screen name={ADDENTRY} component={AddEntry} />
    </Stack.Navigator>
  );
};

const AddStack = () => {
  return (
    <Stack.Navigator initialRouteName={ADD}>
      <Stack.Screen name={ADD} component={Add} options={{ title: "Add" }} />
      <Stack.Screen name={SINGLEMOLE} component={SingleMole} />
      <Stack.Screen name={ADDENTRY} component={AddEntry} />
      <Stack.Screen name={ADDMOLE} component={AddMole} />
      <Stack.Screen name={TAKEPHOTO} component={TakePhoto} />
      <Stack.Screen name={ENTRY} component={Entry} />
      <Stack.Screen name={LOADING} component={Loading} />
      <Stack.Screen name={ALLMOLES} component={AllMoles} />
    </Stack.Navigator>
  );
};

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName={LOGOUT}>
      <Stack.Screen name={LOADING} component={Loading} />
      <Stack.Screen name={LOGOUT} component={Logout} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={INFO} component={Info} />
      <Stack.Screen name={PROFILE} component={Profile} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Body") {
            iconName = focused ? "body" : "body-outline";
          } else if (route.name === "Moles") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Add") {
            iconName = focused ? "add" : "add-outline";
          } else {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Body" component={BodyStack} />
      <Tab.Screen name="Moles" component={MolesStack} />
      <Tab.Screen name="Add" component={AddStack} />
      <Tab.Screen name="User" component={UserStack} />
    </Tab.Navigator>
  );
};

const Auth = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Auth.Navigator initialRouteName={LOGIN}>
      <Auth.Screen name={LOGIN} component={Login} />
      <Auth.Screen
        name={SIGNUP}
        options={{ headerShown: false }}
        component={SignUp}
      />
      <Auth.Screen name={LOADING} component={Loading} />
      <Auth.Screen name={BODY} options={{ title: "Body" }} component={Body} />
    </Auth.Navigator>
  );
};
