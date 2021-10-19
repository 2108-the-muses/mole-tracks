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
  COMPAREENTRIES,
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
  CompareEntries,
} = sIndex;
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, Image, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "../styles";
import { FontAwesome5 } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const topHeaderLogo = () => {
  return (
    <Image
      source={require("../../assets/images/face-with-mole.png")}
      style={{
        width: 40,
        height: 40,
        position: "relative",
      }}
    ></Image>
  );
};
const BodyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={BODY}
      screenOptions={{
        headerStyle: { backgroundColor: "#BA5A31" },
        headerTitle: "mole tracks",
        headerTitleStyle: styles.navHeader,
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerRight: topHeaderLogo,
      }}
    >
      <Stack.Screen name={BODY} options={{ title: "Body" }} component={Body} />
      <Stack.Screen name={SINGLEMOLE} component={SingleMole} />
      <Stack.Screen name={LOADING} component={Loading} />
    </Stack.Navigator>
  );
};

const MolesStack = (props) => {
  return (
    <Stack.Navigator
      initialRouteName={ALLMOLES}
      screenOptions={{
        headerStyle: { backgroundColor: "#BA5A31" },
        headerTitle: "mole tracks",
        headerTitleStyle: styles.navHeader,
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerRight: topHeaderLogo,
      }}
    >
      <Stack.Screen name={ALLMOLES} component={AllMoles} />
      <Stack.Screen
        name={SINGLEMOLE}
        component={SingleMole}
        options={({ route, navigation }) => {
          return {
            headerLeft: () => (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <FontAwesome5 name="angle-left" size={30} color="white" />
                <Text
                  style={{
                    color: "white",
                    margin: 5,
                    fontFamily: "SulphurPoint-Regular",
                    fontSize: 20,
                  }}
                  onPress={() => {
                    navigation.navigate(ALLMOLES);
                  }}
                >
                  All Moles
                </Text>
              </View>
            ),
          };
        }}
        // @todo ideally don't want this here, tab should always be resetting
        // right now is needed because after adding an entry from the add button,
        // the tab default somehow becomes the new entry
        // options={({ route, navigation }) => {
        //   return {
        //     headerLeft: () => (
        //       <Text
        //         style={{ color: "white" }}
        //         onPress={() => {
        //           navigation.navigate(ALLMOLES);
        //         }}
        //       >
        //         back
        //       </Text>
        //     ),
        //   };
        // }}
      />
      <Stack.Screen
        name={ENTRY}
        component={Entry}
        options={({ route, navigation }) => {
          return {
            headerLeft: () => (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <FontAwesome5 name="angle-left" size={30} color="white" />
                <Text
                  style={{
                    color: "white",
                    margin: 5,
                    fontFamily: "SulphurPoint-Regular",
                    fontSize: 20,
                  }}
                  onPress={() => {
                    navigation.navigate(SINGLEMOLE, {
                      mole: { id: route.params.entry.moleId },
                    });
                  }}
                >
                  Mole
                </Text>
              </View>
            ),
          };
        }}
        // options={({ route, navigation }) => {
        //   return {
        //     headerLeft: () => (
        //       <Text
        //         onPress={() => {
        //           navigation.navigate(SINGLEMOLE, {
        //             mole: { id: route.params.entry.moleId },
        //           });
        //         }}
        //       >
        //         Back to mole
        //       </Text>
        //     ),
        //   };
        // }}
      />
      <Stack.Screen name={LOADING} component={Loading} />
      <Stack.Screen name={ADDMOLE} component={AddMole} />
      <Stack.Screen name={TAKEPHOTO} component={TakePhoto} />
      <Stack.Screen name={ADDENTRY} component={AddEntry} />
      <Stack.Screen name={COMPAREENTRIES} component={CompareEntries} />
    </Stack.Navigator>
  );
};

const AddStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ADD}
      screenOptions={{
        headerStyle: { backgroundColor: "#BA5A31" },
        headerTitle: "mole tracks",
        headerTitleStyle: styles.navHeader,
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerRight: topHeaderLogo,
        headerBackVisible: false,
      }}
    >
      <Stack.Screen name={ADD} component={Add} options={{ title: "Add" }} />
      <Stack.Screen name={ADDENTRY} component={AddEntry} />
      <Stack.Screen name={ADDMOLE} component={AddMole} />
      <Stack.Screen name={TAKEPHOTO} component={TakePhoto} />
      {/* this is NOT what we want below, but is a temporary fix */}
      <Stack.Screen name={SINGLEMOLE} component={SingleMole} />
      <Stack.Screen name={COMPAREENTRIES} component={CompareEntries} />
      <Stack.Screen name={ENTRY} component={Entry} />
      {/* do not want above either */}
      <Stack.Screen name={INFO} component={Info} />
      <Stack.Screen name={LOADING} component={Loading} />
    </Stack.Navigator>
  );
};

const UserStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={LOGOUT}
      screenOptions={{
        headerStyle: { backgroundColor: "#BA5A31" },
        headerTitle: "mole tracks",
        headerTitleStyle: styles.navHeader,
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerRight: topHeaderLogo,
      }}
    >
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
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { backgroundColor: "#BA5A31" },
      })}
    >
      <Tab.Screen
        name="Body"
        component={BodyStack}
        unmountOnBlur={true}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Moles"
        component={MolesStack}
        unmountOnBlur={true}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Add"
        component={AddStack}
        unmountOnBlur={true}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="User"
        component={UserStack}
        unmountOnBlur={true}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

const Auth = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Auth.Navigator
      initialRouteName={LOGIN}
      screenOptions={{
        headerStyle: { backgroundColor: "#BA5A31" },
        headerTitle: "mole tracks",
        headerTitleStyle: styles.navHeader,
        headerBackVisible: false,
      }}
    >
      <Auth.Screen name={LOGIN} component={Login} />
      <Auth.Screen name={SIGNUP} component={SignUp} />
      <Auth.Screen name={LOADING} component={Loading} />
      <Auth.Screen name={BODY} options={{ title: "Body" }} component={Body} />
    </Auth.Navigator>
  );
};
