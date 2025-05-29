import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert, FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import { getPatientProfile, PatientProfile } from '../../services/PatientService';
import globalStyles from '../../styles/globalStyles';
import detailStyles from '../../styles/patientDetailStyles'; // ver más abajo
import { NutritionistStackParamList } from '../../navigation/NutritionistNavigator';

type Props = NativeStackScreenProps<NutritionistStackParamList, 'PatientDetail'>;

const PatientDetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const { id } = route.params;
    const [patient, setPatient] = useState<PatientProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await getPatientProfile(id);
                setPatient(data);
            } catch (e) {
                console.error(e);
                Alert.alert('Error', 'No se pudo cargar los datos del paciente.');
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading || !patient) {
        return (
            <View style={[globalStyles.container, detailStyles.centered]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const fields: { key: string; label: string; value: string }[] = [
        // Datos de usuario
        { key: 'email', label: 'Email', value: patient.user.email },
        { key: 'first_name', label: 'Nombre', value: patient.user.first_name },
        { key: 'last_name', label: 'Apellido', value: patient.user.last_name },

        // Medidas
        { key: 'height', label: 'Altura', value: `${patient.height} cm` },
        { key: 'current_weight', label: 'Peso', value: `${patient.current_weight} kg` },
        {
            key: 'waist_circumference',
            label: 'Cintura',
            value: patient.waist_circumference != null
                ? `${patient.waist_circumference} cm`
                : '-',
        },
        {
            key: 'hip_circumference',
            label: 'Cadera',
            value: patient.hip_circumference != null
                ? `${patient.hip_circumference} cm`
                : '-',
        },

        // Objetivos y salud
        { key: 'goal_type', label: 'Objetivo', value: patient.goal_type },
        {
            key: 'medical_condition',
            label: 'Condición médica',
            value: patient.medical_condition || '-',
        },
        {
            key: 'preexisting_condition',
            label: 'Condición preexistente',
            value: patient.preexisting_condition || '-',
        },
        {
            key: 'allergies',
            label: 'Alergias',
            value: patient.allergies || '-',
        },
        {
            key: 'medications',
            label: 'Medicaciones',
            value: patient.medications || '-',
        },
        {
            key: 'digestive_issues',
            label: 'Problemas digestivos',
            value: patient.digestive_issues || '-',
        },
        {
            key: 'past_surgeries',
            label: 'Cirugías previas',
            value: patient.past_surgeries || '-',
        },
        {
            key: 'fitness_level',
            label: 'Nivel físico',
            value: patient.fitness_level || '-',
        },

        // Actividad física
        {
            key: 'work_activity',
            label: 'Actividad laboral',
            value: patient.work_activity || '-',
        },
        {
            key: 'exercise_frequency',
            label: 'Frecuencia de ejercicio (veces/semana)',
            value: patient.exercise_frequency != null
                ? String(patient.exercise_frequency)
                : '-',
        },
        {
            key: 'exercise_type',
            label: 'Tipo de ejercicio',
            value: patient.exercise_type || '-',
        },

        // Hábitos alimenticios
        {
            key: 'meals_per_day',
            label: 'Comidas al día',
            value: String(patient.meals_per_day),
        },
        {
            key: 'meal_schedule',
            label: 'Horario de comidas',
            value: patient.meal_schedule || '-',
        },
        {
            key: 'dietary_preferences',
            label: 'Preferencias dietéticas',
            value: patient.dietary_preferences || '-',
        },
        {
            key: 'favorite_foods',
            label: 'Alimentos favoritos',
            value: patient.favorite_foods || '-',
        },
        {
            key: 'avoided_foods',
            label: 'Alimentos evitados',
            value: patient.avoided_foods || '-',
        },
        {
            key: 'water_intake',
            label: 'Consumo de agua (L/día)',
            value: patient.water_intake != null
                ? `${patient.water_intake} L`
                : '-',
        },
        {
            key: 'alcohol_caffeine_consumption',
            label: 'Consumo alcohol/cafeína',
            value: patient.alcohol_caffeine_consumption || '-',
        },

        // Recursos y estilo de vida
        {
            key: 'budget',
            label: 'Presupuesto',
            value: patient.budget != null ? `$${patient.budget}` : '-',
        },
        {
            key: 'cooking_time',
            label: 'Tiempo de cocina',
            value: patient.cooking_time || '-',
        },
    ];


    return (
        <View style={[globalStyles.container, { flex: 1 }]}>
            {/* Header fijo */}
            <View style={detailStyles.header}>
                <Text style={globalStyles.title}>
                    {patient.user.first_name} {patient.user.last_name}
                </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Botones de acción fijos con íconos */}
            <View style={detailStyles.actions}>
                <TouchableOpacity
                    style={detailStyles.iconButton}
                    onPress={() => navigation.navigate('UploadPlan', { patientId: id })}
                >
                    <Feather name="file-text" size={28} color="#fff" />
                    <Text style={detailStyles.iconLabel}>Plan</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={detailStyles.iconButton}
                    onPress={() => navigation.navigate('PatientProgress', { patientId: id })}
                >
                    <Feather name="bar-chart-2" size={28} color="#fff" />
                    <Text style={detailStyles.iconLabel}>Progreso</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={detailStyles.iconButton}
                    onPress={() => navigation.navigate('NewAppointments', { patientId: id })}
                >
                    <Feather name="calendar" size={28} color="#fff" />
                    <Text style={detailStyles.iconLabel}>Cita</Text>
                </TouchableOpacity>
            </View>

            {/* Lista scrollable de detalles */}
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 20 }}
                data={fields}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <View style={detailStyles.row}>
                        <Text style={detailStyles.label}>{item.label}</Text>
                        <Text style={detailStyles.value}>{item.value}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default PatientDetailScreen;