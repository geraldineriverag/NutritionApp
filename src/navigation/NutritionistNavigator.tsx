import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNutricionista from '../screens/HomeNutricionista'; // tu Home para nutricionistas

export type NutritionistStackParamList = {
    NutritionistHome: undefined;
    // aquí puedes añadir más pantallas de nutricionista:
    // PatientsList: undefined;
    // PatientDetail: { id: number };
};

const Stack = createNativeStackNavigator<NutritionistStackParamList>();

const NutritionistNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
            name="NutritionistHome"
            component={HomeNutricionista}
            options={{ title: 'Inicio Nutricionista' }}
        />
    </Stack.Navigator>
);

export default NutritionistNavigator;
