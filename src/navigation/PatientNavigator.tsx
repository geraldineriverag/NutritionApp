import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/PatientScreens/HomeScreen';
import StepScreen from "../screens/PatientScreens/StepScreen";
import SuccessScreen from "../screens/PatientScreens/SuccessScreen";
import ProgressScreen from "../screens/PatientScreens/ProgressScreen";
import ProfileScreen from "../screens/PatientScreens/ProfileScreen";
import ProgressDetailScreen from "../screens/PatientScreens/ProgressDetailScreen";
import InvitationAccept from "../screens/PatientScreens/InvitationAccept";
import PatientPlanScreen from "../screens/PatientScreens/PatientPlanScreen";
import NutritionistProfileScreen from "../screens/PatientScreens/NutritionistProfile";

export type AppStackParamList = {
    Home: undefined;
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
    ProgressDetail: undefined;
    Profile: undefined;
    Invitation: undefined;
    Plan: undefined
    NutritionistProfile: { id: number };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const PatientNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Step" component={StepScreen} options={({ route }) =>
                ({
                title: route.params?.title || 'Formulario'
                })}
            />
            <Stack.Screen name={"Success"} component={SuccessScreen}/>
            <Stack.Screen name={"Progress"} component={ProgressScreen}/>
            <Stack.Screen name={"Profile"} component={ProfileScreen}/>
            <Stack.Screen name={"ProgressDetail"} component={ProgressDetailScreen}/>
            <Stack.Screen name={"Invitation"} component={InvitationAccept}/>
            <Stack.Screen name={"Plan"} component={PatientPlanScreen}/>
            <Stack.Screen name={"NutritionistProfile"} component={NutritionistProfileScreen}/>

        </Stack.Navigator>
    );
};

export default PatientNavigator;

