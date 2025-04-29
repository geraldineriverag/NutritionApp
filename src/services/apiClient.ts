import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 1. Agregar token a cada request
apiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token'); // token de acceso
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 2. Interceptar respuestas 401 y hacer refresh del token
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si es un error 401 y no estamos ya reintentando
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await AsyncStorage.getItem('refresh_token');
                if (!refreshToken) throw new Error('No refresh token');

                // Llama al endpoint para refrescar el token
                const response = await axios.post(`${baseURL}/token/refresh/`, {
                    refresh: refreshToken,
                });

                const newAccessToken = response.data.access;
                await AsyncStorage.setItem('token', newAccessToken);

                // Actualiza el header del request original
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Reintenta la petición original
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Si falla también el refresh, limpiamos sesión
                await AsyncStorage.clear();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
