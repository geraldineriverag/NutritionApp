import apiClient from './apiClient'; // Asegúrate de tener este path correcto

interface ProgressData {
    patient: number;
    weight?: number;
    waist_circumference?: number;
    hip_circumference?: number;
}

export interface ProgressEntry {
    id: number;
    patient: number;
    record_date: string;
    weight: number | null;
    waist_circumference: number | null;
    hip_circumference: number | null;
    bmi: number | null;
    body_fat_percentage: number | null;
    muscle_mass: number | null;
}
// Obtener todos los progresos del usuario autenticado
export const fetchProgressData = async (startDate?: string, endDate?: string) => {
    const params: any = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    const response = await apiClient.get('/progress/', { params });
    return response.data;
};

// Registrar un nuevo progreso (puedes pasar los campos que necesites)
export const registerProgress = async (data: ProgressData) => {
    try {
        const response = await apiClient.post('/progress/', data);
        return response.data;
    } catch (error: any) {
        console.error('Error al registrar el progreso:', error);
        throw error;
    }
};

export const updateProgress = async (id: number, data: ProgressData) => {
    return apiClient.put(`/progress/${id}/`, data);
};

export const deleteProgress = async (id: number) => {
    return apiClient.delete(`/progress/${id}/`);
};

export const getPatientProgress = async (patientId: number): Promise<ProgressEntry[]> => {
    const { data } = await apiClient.get<ProgressEntry[]>(`/progress/?patient=${patientId}`);
    return data;
};