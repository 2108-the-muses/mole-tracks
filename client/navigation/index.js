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
} from "../NavigationConstants";
import Ionicons from "@expo/vector-icons/Ionicons";
import Login from "../screens/Login";
import Entry from "../screens/Entry";
import Body from "../screens/Body";
import AllMoles from "../screens/AllMoles";
import SingleMole from "../screens/SingleMole";
import Loading from "../screens/Loading";
import SignUp from "../screens/SignUp";
import Logout from "../components/Logout";
import Add from "../screens/Add";
import AddEntry from "../screens/AddEntry";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// this is a dummy component for now

const Stack = createNativeStackNavigator();

const BodyStack = () => {
  return (
    <Stack.Navigator initialRouteName={BODY}>
      <Stack.Screen name={BODY} component={Body} />
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
    </Stack.Navigator>
  );
};

const AddStack = () => {
  return (
    <Stack.Navigator initialRouteName={ADD}>
      <Stack.Screen
        name={ADD}
        component={Add}
        initialParams={{ selected: "" }}
      />
      <Stack.Screen name={SINGLEMOLE} component={SingleMole} />
      <Stack.Screen name={ADDENTRY} component={AddEntry} />
      <Stack.Screen name={ENTRY} component={Entry} />
      <Stack.Screen name={LOADING} component={Loading} />
    </Stack.Navigator>
  );
};

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName={LOGOUT}>
      <Stack.Screen name={LOADING} component={Loading} />
      <Stack.Screen name={LOGOUT} component={Logout} />
      <Stack.Screen name={LOGIN} component={Login} />
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
      <Auth.Screen name={SIGNUP} component={SignUp} />
      <Auth.Screen name={LOADING} component={Loading} />
      <Auth.Screen name={BODY} component={Body} />
    </Auth.Navigator>
  );
};
