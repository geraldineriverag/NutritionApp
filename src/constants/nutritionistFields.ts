export interface NutritionistField {
    key: keyof import('../services/NutritionistService').NutritionistProfile;
    label: string;
    keyboardType?: 'default' | 'numeric' | 'email-address';
    editable?: boolean;
}

export const nutritionistFields: NutritionistField[] = [
    { key: 'bio', label: 'Biografía', editable: true },
    { key: 'education', label: 'Formación académica', editable: true },
    { key: 'specialties', label: 'Especialidades', editable: true },
    { key: 'years_of_experience', label: 'Años de experiencia', keyboardType: 'numeric', editable: true },
    { key: 'languages', label: 'Idiomas', editable: true },
    { key: 'accepts_new_patients', label: 'Acepta nuevos pacientes', editable: true },
    { key: 'max_patients', label: 'Máx. Pacientes', keyboardType: 'numeric', editable: true },
    { key: 'session_duration_minutes', label: 'Duración sesión (min)', keyboardType: 'numeric', editable: true },
    { key: 'website', label: 'Web / LinkedIn', editable: true },
];
