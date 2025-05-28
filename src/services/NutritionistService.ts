import apiClient from './apiClient';

export interface NutritionistProfile {
    id: number
    user: {
        first_name: string;
        last_name: string;
        email: string;
    };
    bio: string;
    education: string;
    specialties: string;
    years_of_experience: number;
    languages: string;
    accepts_new_patients: boolean;
    max_patients: number;
    session_duration_minutes: number;
    website: string;
}

export const getNutritionistProfile = async (): Promise<NutritionistProfile> => {
    const { data } = await apiClient.get<NutritionistProfile>('/nutritionists/me/');
    return data;
};

// GET /nutritionists/{id}/
export const getNutritionistById = async (id: number): Promise<NutritionistProfile> => {
    const { data } = await apiClient.get<NutritionistProfile>(`/nutritionists/${id}/`);
    return data;
};

// PATCH y POST igual, pero devolviendo NutritionistProfile
export const updateNutritionistProfile = async (
    payload: Partial<Omit<NutritionistProfile, 'user' | 'id'>>
): Promise<NutritionistProfile> => {
    const { data } = await apiClient.patch<NutritionistProfile>('/nutritionists/me/', payload);
    return data;
};

export const createNutritionistProfile = async (
    payload: Partial<Omit<NutritionistProfile, 'user' | 'id'>>
): Promise<NutritionistProfile> => {
    const { data } = await apiClient.post<NutritionistProfile>('/nutritionists/me/', payload);
    return data;
};