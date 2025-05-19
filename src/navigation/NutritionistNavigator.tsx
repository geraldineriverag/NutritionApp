import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNutricionista from '../screens/NutritionistScreens/HomeNutricionista';
import DataScreen from "../screens/NutritionistScreens/ProfileNutricionista";
import PatientsListScreen from "../screens/NutritionistScreens/PatientsListScreen";

export type NutritionistStackParamList = {
    NutritionistHome: undefined;
    Profile: undefined;
    Setup: undefined;
    MyPatients: undefined;
};

const Stack = createNativeStackNavigator<NutritionistStackParamList>();

const NutritionistNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="NutritionistHome" component={HomeNutricionista} options={{ title: 'Inicio Nutricionista' }}/>
        <Stack.Screen name={"Profile"} component={DataScreen}/>
        <Stack.Screen name={"MyPatients"} component={PatientsListScreen}/>
    </Stack.Navigator>
);

export default NutritionistNavigator;
