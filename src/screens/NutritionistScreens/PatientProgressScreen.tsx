import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, ActivityIndicator, Alert, StyleSheet
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NutritionistStackParamList } from '../../navigation/NutritionistNavigator';
import globalStyles from '../../styles/globalStyles';
import cardStyles from '../../styles/cardStyles';
import { getPatientProgress, ProgressEntry} from "../../services/ProgressRecordService";

type Props = NativeStackScreenProps<NutritionistStackParamList, 'PatientProgress'>;

const PatientProgressScreen: React.FC<Props> = ({ route }) => {
    const { patientId } = route.params;
    const [entries, setEntries] = useState<ProgressEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const list = await getPatientProgress(patientId);
                setEntries(list);
            } catch (e: any) {
                console.error(e);
                Alert.alert('Error', 'No se pudo cargar el progreso del paciente.');
            } finally {
                setLoading(false);
            }
        })();
    }, [patientId]);

    if (loading) {
        return (
            <View style={[globalStyles.container, cardStyles.centered]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Historial de Progreso</Text>

            {entries.length === 0 ? (
                <View style={styles.empty}>
                    <Text>No hay registros aún.</Text>
                </View>
            ) : (
                <FlatList
                    data={entries}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={cardStyles.card}>
                            <Text style={cardStyles.cardTitle}>
                                {new Date(item.record_date).toLocaleDateString()}
                            </Text>
                            {item.weight != null && (
                                <Text style={cardStyles.cardValue}>Peso: {item.weight} kg</Text>
                            )}
                            {item.waist_circumference != null && (
                                <Text style={styles.subValue}>
                                    Cintura: {item.waist_circumference} cm
                                </Text>
                            )}
                            {item.hip_circumference != null && (
                                <Text style={styles.subValue}>
                                    Cadera: {item.hip_circumference} cm
                                </Text>
                            )}
                            {item.bmi != null && (
                                <Text style={styles.subValue}>IMC: {item.bmi}</Text>
                            )}
                            {item.body_fat_percentage != null && (
                                <Text style={styles.subValue}>
                                    Grasa corporal: {item.body_fat_percentage}%
                                </Text>
                            )}
                            {item.muscle_mass != null && (
                                <Text style={styles.subValue}>
                                    Masa muscular: {item.muscle_mass} kg
                                </Text>
                            )}
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    subValue: {
        marginTop: 4,
        fontSize: 14,
        color: '#555',
    },
});

export default PatientProgressScreen;
