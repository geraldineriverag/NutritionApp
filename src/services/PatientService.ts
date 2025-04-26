import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PATIENT_ID_KEY = 'patient_id';

export const getPatientId = async (): Promise<number> => {
    try {
        // Intentar leer el patient_id de AsyncStorage
        const cachedPatientId = await AsyncStorage.getItem(PATIENT_ID_KEY);

        if (cachedPatientId) {
            return parseInt(cachedPatientId, 10); // 👈 Ya lo tenemos
        }

        // Si no está cacheado, pedirlo al backend
        const response = await apiClient.get('/patients/me/');
        const patientId = response.data.id;

        // Guardarlo en AsyncStorage para próximas veces
        await AsyncStorage.setItem(PATIENT_ID_KEY, patientId.toString());

        return patientId;
    } catch (error) {
        console.error('Error al obtener el ID del paciente:', error);
        throw error;
    }
};

// Limpiar el cache al logout
export const clearPatientId = async () => {
    await AsyncStorage.removeItem(PATIENT_ID_KEY);
};
