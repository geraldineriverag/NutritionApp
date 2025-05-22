// src/services/PatientService.ts
import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PATIENT_ID_KEY = 'patient_id';

/** Perfil del paciente **/
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
    // añade aquí los campos extra que tu PatientSerializer expose si los necesitas
}

export const getMyPatients = async (): Promise<Patient[]> => {
    const { data } = await apiClient.get<Patient[]>('/patients/');
    return data;
};

/** Detalle de un paciente **/
export interface PatientProfile {
    id: number;
    user: {
        first_name: string;
        last_name: string;
        email: string;
        // puedes añadir aquí más campos de user si tu serializer los devuelve
    };
    height: number;
    current_weight: number;
    waist_circumference: number | null;
    hip_circumference: number | null;
    goal_type: string;
    medical_condition: string | null;
    allergies: string | null;
    medications: string | null;
    preexisting_condition: string | null;
    digestive_issues: string | null;
    past_surgeries: string | null;
    fitness_level: string;
    work_activity: string;
    exercise_frequency: number | null;
    exercise_type: string | null;
    meals_per_day: number;
    meal_schedule: string | null;
    dietary_preferences: string | null;
    favorite_foods: string | null;
    avoided_foods: string | null;
    water_intake: number;
    alcohol_caffeine_consumption: string | null;
    budget: number;
    cooking_time: string;
    nutritionist_id: number | null;
    created_at: string;
    age: number | null;
}

export const getPatientProfile = async (
    id: number
): Promise<PatientProfile> => {
    const { data } = await apiClient.get<PatientProfile>(`/patients/${id}/`);
    return data;
};
