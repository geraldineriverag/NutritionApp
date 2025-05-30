import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNutricionista from '../screens/NutritionistScreens/HomeNutricionista';
import DataScreen from "../screens/NutritionistScreens/ProfileNutricionista";
import PatientsListScreen from "../screens/NutritionistScreens/PatientsListScreen";
import PatientDetail from "../screens/NutritionistScreens/PatientDetailScreen";
import PatientDetailScreen from "../screens/NutritionistScreens/PatientDetailScreen";
import UploadPlan from "../screens/NutritionistScreens/UploadPlan";
import PatientProgressScreen from "../screens/NutritionistScreens/PatientProgressScreen";
import AppointmentListScreen from "../screens/NutritionistScreens/AppointmentListScreen";
import NewAppointmentScreen from "../screens/NutritionistScreens/NewAppointmentScreen";

export type NutritionistStackParamList = {
    NutritionistHome: undefined;
    Profile: undefined;
    Setup: undefined;
    Patients: undefined;
    PatientDetail: { id: number };
    UploadPlan: { patientId: number };
    PatientProgress: { patientId: number };
    Appointments: undefined;
    NewAppointments: { patientId: number };

};

const Stack = createNativeStackNavigator<NutritionistStackParamList>();

const NutritionistNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="NutritionistHome" component={HomeNutricionista} options={{ title: 'Inicio Nutricionista' }}/>
        <Stack.Screen name={"Profile"} component={DataScreen}/>
        <Stack.Screen name={"Patients"} component={PatientsListScreen}/>
        <Stack.Screen name={"PatientDetail"} component={PatientDetail}/>
        <Stack.Screen name="UploadPlan" component={UploadPlan}/>
        <Stack.Screen name="PatientProgress" component={PatientProgressScreen}/>
        <Stack.Screen name="Appointments" component={AppointmentListScreen}/>
        <Stack.Screen name="NewAppointments" component={NewAppointmentScreen}/>


    </Stack.Navigator>
);

export default NutritionistNavigator;
