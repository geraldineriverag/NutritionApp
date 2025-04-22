import apiClient from './apiClient';

export const fetchFields = async () => {
    try {
        const { data } = await apiClient.get('/patients/form-schema/');
        return data;
    } catch (error: any) {
        console.error("Error al obtener los campos del wizard:", error.response?.data || error.message);
        throw error;
    }
};

export const postFormData = async (data: Record<string, any>) => {
    try {
        const response = await apiClient.post('/patients/register/', data);
        return response.data;
    } catch (error: any) {
        console.error("Error al enviar los datos:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchSubmittedData = async () => {
    const { data } = await apiClient.get('/patients/me/');
    return data;
};


