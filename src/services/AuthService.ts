import apiClient from "./apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = async (userData: Record<string, string>) => {
    try {
        const payload = {
            username: userData.username,
            email: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone: userData.phone || '',
            birth_date: userData.birth_date || '',
            role: userData.role,
            password: userData.password,
            confirm_password: userData.confirm_password,
        };

        const { data } = await apiClient.post('/accounts/register/', payload);

        console.log("Usuario registrado correctamente:", data);

        // Opcionalmente guardar el token directamente si el backend lo devuelve
        // await AsyncStorage.setItem('token', data.access);

        return data;
    } catch (error: any) {
        console.error("Error en registro:", error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || "No se pudo registrar el usuario.");
    }
};

export const loginRequest = async (username: string, password: string) => {
    try {
        const { data } = await apiClient.post('/accounts/token/', {
            username,
            password,
        });

        console.log("Token recibido:", data);
        await AsyncStorage.setItem('token', data.access);

        return {
            access: data.access,
            refresh: data.refresh,
            role: data.role as 'paciente' | 'nutricionista',
        };
    } catch (error: any) {
        console.error("Login error:", error.response?.data || error.message);
        throw new Error("Credenciales inválidas o problema de conexión.");
    }
};

