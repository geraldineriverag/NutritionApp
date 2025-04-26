// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import StepScreen from "../screens/StepScreen";
import SuccessScreen from "../screens/SuccessScreen";
import ProgressScreen from "../screens/ProgressScreen";

export type AppStackParamList = {
    Home: undefined;
    Profile: undefined; // si tienes una pantalla de perfil
    Step: {
        title: string;
        stepIndex: number;
        fields: {
            key: string;
            label: string;
            keyboardType?: 'default' | 'numeric' | 'email-address';
        }[];
    };
    Success: undefined;
    Progress: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
                name="Step"
                component={StepScreen}
                options={({ route }) => ({
                    title: route.params?.title || 'Formulario' // Usamos el título del paso o 'Paso' como fallback
                })}
            />
            <Stack.Screen name={"Success"} component={SuccessScreen}/>
            <Stack.Screen name={"Progress"} component={ProgressScreen}/>
        </Stack.Navigator>
    );
};

export default AppNavigator;

