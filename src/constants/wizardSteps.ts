import { WizardFormData } from '../types/typeWizardFormData';

export const wizardSteps: {
    title: string;
    fields: {
        key: keyof WizardFormData;
        label: string;
        keyboardType?: 'default' | 'numeric' | 'email-address';
    }[];
}[] = [
    {
        title: 'Paso 1: Datos Básicos',
        fields: [
            { key: 'fullName', label: 'Nombre Completo' },
            { key: 'age', label: 'Edad', keyboardType: 'numeric' },
        ],
    },
    {
        title: 'Paso 2: Medidas',
        fields: [
            { key: 'height', label: 'Altura (cm)', keyboardType: 'numeric' },
            { key: 'waistCircumference', label: 'Cintura (cm)', keyboardType: 'numeric' },
            { key: 'hipCircumference', label: 'Cadera (cm)', keyboardType: 'numeric' },
        ],
    },
    {
        title: 'Paso 3: Salud',
        fields: [
            { key: 'medicalCondition', label: 'Condición médica' },
            { key: 'preexistingCondition', label: 'Condiciones preexistentes' },
            { key: 'allergies', label: 'Alergias' },
        ],
    },
    {
        title: 'Paso 4: Actividad Física',
        fields: [
            { key: 'workActivity', label: 'Actividad laboral' },
            { key: 'exerciseFrequency', label: 'Frecuencia de ejercicio' },
            { key: 'exerciseType', label: 'Tipo de ejercicio' },
            { key: 'fitnessLevel', label: 'Nivel de condición física' },
        ],
    },
    {
        title: 'Paso 5: Hábitos Alimenticios',
        fields: [
            { key: 'mealsPerDay', label: 'Comidas por día' },
            { key: 'mealSchedule', label: 'Horario de comidas' },
            { key: 'dietaryPreferences', label: 'Preferencias dietéticas' },
            { key: 'favoriteFoods', label: 'Comidas favoritas' },
            { key: 'avoidedFoods', label: 'Comidas evitadas' },
            { key: 'waterIntake', label: 'Ingesta de agua (litros)' },
        ],
    },
    {
        title: 'Paso 6: Cocina y Presupuesto',
        fields: [
            { key: 'budget', label: 'Presupuesto' },
            { key: 'cookingTime', label: 'Tiempo para cocinar' },
        ],
    },
];
