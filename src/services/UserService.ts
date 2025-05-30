import apiClient from '../services/apiClient';

export const getProfile = async () => {
    const response = await apiClient.get('/accounts/profile/');
    return response.data;
};

export const updateProfileField = async (field: string, value: string) => {
    const data = { [field]: value };
    const response = await apiClient.patch('/accounts/profile/', data);
    return response.data;
};
