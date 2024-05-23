import React from "react";
import {Linking, View, Text} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import setUpScreen from '../screens/setUpScreen';
import AreaForm from "../screens/AreaForm";
import LoadingScreen from "../screens/LoadingScreen";
import Settings from "../screens/Settings";
import LogInExtern from "../screens/LogInLoading/LogInExtern";

const Stack = createNativeStackNavigator();

export default function Navigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="LoadingScreen" component={LoadingScreen}></Stack.Screen>
                <Stack.Screen name= "SetUpScreen" component={setUpScreen} />
                <Stack.Screen name="AreaLogin" component={SignInScreen} />
                <Stack.Screen name="AreaCreateAccount" component={SignUpScreen} />
                <Stack.Screen name="LogInExtern" component={LogInExtern} />

                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="AreaForm" component={AreaForm} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
