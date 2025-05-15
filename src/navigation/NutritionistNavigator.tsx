import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNutricionista from '../screens/NutritionistScreens/HomeNutricionista';
import DataScreen from "../screens/NutritionistScreens/DataScreen";

export type NutritionistStackParamList = {
    NutritionistHome: undefined;
    Profile: undefined;
    Setup: undefined;
};

const Stack = createNativeStackNavigator<NutritionistStackParamList>();

const NutritionistNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="NutritionistHome" component={HomeNutricionista} options={{ title: 'Inicio Nutricionista' }}/>
        <Stack.Screen name={"Profile"} component={DataScreen}/>
    </Stack.Navigator>
);

export default NutritionistNavigator;
