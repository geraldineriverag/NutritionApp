// AuthNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StepScreen from "../screens/StepScreen";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Step: {
        title: string;
        stepIndex: number;
        fields: {
            key: string;
            label: string;
            keyboardType?: 'default' | 'numeric' | 'email-address';
        }[];
    };
    Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
            name="Step"
            component={StepScreen}
            options={({ route }) => ({
                title: route.params?.title || 'Formulario' // Usamos el título del paso o 'Paso' como fallback
            })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
);

export default AuthNavigator;
