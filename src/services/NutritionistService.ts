import apiClient from './apiClient';

export interface NutritionistProfile {
    id: number
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
    const { data } = await apiClient.get('/nutritionists/me/');
    return data;
};

/** PATCH */
export const updateNutritionistProfile = async (
    data: Partial<NutritionistProfile>
): Promise<NutritionistProfile> => {
    const { data: updated } = await apiClient.patch('/nutritionists/me/', data);
    return updated;
};

/** POST */
export const createNutritionistProfile = async (
    data: Partial<NutritionistProfile>
): Promise<NutritionistProfile> => {
    const { data: created } = await apiClient.post('/nutritionists/me/', data);
    return created;
};