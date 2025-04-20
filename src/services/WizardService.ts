import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchFields = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/patients/form-schema/");

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener los campos del wizard:", error);
        throw error; // Re-lanzamos el error para que quien lo consuma pueda manejarlo
    }
};

export const postFormData = async (data: Record<string, any>) => {
    const token = await AsyncStorage.getItem('token');

    const response = await axios.post('http://localhost:8000/api/patients/register/', data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data; // aquí ya tienes la respuesta del backend
};
