import React from 'react'
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
  } from "../NavigationConstants";
  import Login from "../screens/Login";
  import Entry from "../screens/Entry";
  import Body from "../screens/Body";
  import Moles from "../screens/Moles";
  import SingleMole from "../screens/SingleMole";
  import Loading from "../screens/Loading";
  import SignUp from "../screens/SignUp";
  import Main from "../screens/Main";
  
  // this is a dummy component for now
  import Home from "../screens/Home";
  
  const Stack = createNativeStackNavigator();

  const AllScreenStack = () => {
      return(
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
      )}

const Tab = createBottomTabNavigator();

const TabNavigator = ()=>{
    return(
        <Tab.Navigator>
            <Tab.Screen name = 'screen1' component = {AllScreenStack} />
            <Tab.Screen name = 'screen2' component = {AllScreenStack} />
        </Tab.Navigator>
    )
}

      export default AllScreenStack