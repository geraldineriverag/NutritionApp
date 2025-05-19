// src/services/PatientService.ts

import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PATIENT_ID_KEY = 'patient_id';

/** Cache del ID de “mi” paciente  **/

export const getPatientId = async (): Promise<number> => {
    try {
        const cached = await AsyncStorage.getItem(PATIENT_ID_KEY);
        if (cached) {
            return parseInt(cached, 10);
        }
        const { data } = await apiClient.get<{ id: number }>('/patients/me/');
        const patientId = data.id;
        await AsyncStorage.setItem(PATIENT_ID_KEY, patientId.toString());
        return patientId;
    } catch (error) {
        console.error('Error al obtener el ID del paciente:', error);
        throw error;
    }
};

export const clearPatientId = async () => {
    await AsyncStorage.removeItem(PATIENT_ID_KEY);
};

/** Listado de pacientes (para nutricionistas) **/

export interface Patient {
    id: number;
    user: {
        first_name: string;
        last_name: string;
        email: string;
    };
    // agrega aquí otros campos que exponga tu PatientSerializer
}

export const getMyPatients = async (): Promise<Patient[]> => {
    const { data } = await apiClient.get<Patient[]>('/patients/');
    return data;
};
