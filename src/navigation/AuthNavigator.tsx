import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

export type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name={"Login"} component={LoginScreen} />
        <Stack.Screen name={"SignUp"} component={SignUpScreen} />
    </Stack.Navigator>
);

export default AuthNavigator;
