import apiClient from './apiClient';

export interface NutritionPlan {
    id: number;
    patient: number;
    nutritionist: number;
    created_at: string;
    updated_at: string;
    meal_plan: string;
    calories: number;
    caloric_needs: number;
    protein?: number;
    carbs?: number;
    fats?: number;
    pdf_plan?: string;      // URL al PDF
    review_date?: string;
}

// Crear un nuevo plan (incluye subida de PDF)
export const createNutritionPlan = async (
    patientId: number,
    nutritionistId: number,               // ← Nuevo parámetro
    payload: {
        meal_plan: string;
        calories: number;
        caloric_needs: number;
        protein?: number;
        carbs?: number;
        fats?: number;
        review_date?: string;
        pdf_file?: { uri: string; name: string; type: string };
    }
): Promise<NutritionPlan> => {
    const form = new FormData();

    // Campos obligatorios
    form.append('patient', String(patientId));
    form.append('nutritionist', String(nutritionistId));   // ← Aquí añadimos nutritionist
    form.append('meal_plan', payload.meal_plan);
    form.append('calories', String(payload.calories));
    form.append('caloric_needs', String(payload.caloric_needs));

    // Opcionales
    if (payload.protein != null) form.append('protein', String(payload.protein));
    if (payload.carbs   != null) form.append('carbs',   String(payload.carbs));
    if (payload.fats    != null) form.append('fats',    String(payload.fats));
    if (payload.review_date)     form.append('review_date', payload.review_date);

    if (payload.pdf_file) {
        form.append('pdf_plan', {
            uri: payload.pdf_file.uri,
            name: payload.pdf_file.name,
            type: payload.pdf_file.type,
        } as any);
    }

    const { data } = await apiClient.post<NutritionPlan>(
        '/plan/',
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data;
};

export const getMyNutritionPlan = async (): Promise<NutritionPlan> => {
    const { data } = await apiClient.get<NutritionPlan[]>('/plan/');
    if (!data.length) {
        throw new Error('Aún no tienes un plan nutricional asignado.');
    }
    return data[0];
};