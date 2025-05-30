import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Alert,
    StyleSheet,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from '../../styles/globalStyles';
import cardStyles from '../../styles/cardStyles';
import ProgressCard from '../../components/ProgressCard';
import ProgressChart from '../../components/ProgressChart';
import RegisterProgressModal from '../../components/RegisterProgressModal';
import FloatingMenu from '../../components/FloatingMenu';
import ButtonApp from '../../components/ButtonApp';
import { getPatientId } from '../../services/PatientService';
import { registerProgress } from '../../services/ProgressRecordService';
import { useProgressData } from '../../hooks/useProgressData';

const ProgressScreen: React.FC = () => {
    const { progressData, loading, loadProgressData } = useProgressData();
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        weight: '',
        waist_circumference: '',
        hip_circumference: '',
    });
    const [submitting, setSubmitting] = useState(false);

    // filtros
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    useEffect(() => {
        loadProgressData();
    }, []);

    const handleChange = (key: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const patientId = await getPatientId();
            await registerProgress({
                patient: patientId,
                weight: parseFloat(formData.weight),
                waist_circumference: parseFloat(formData.waist_circumference),
                hip_circumference: parseFloat(formData.hip_circumference),
            });
            await loadProgressData(
                startDate ? startDate.toISOString().split('T')[0] : undefined,
                endDate ? endDate.toISOString().split('T')[0] : undefined
            );
            setModalVisible(false);
            setFormData({ weight: '', waist_circumference: '', hip_circumference: '' });
        } catch (error) {
            console.error('Error al registrar progreso:', error);
            Alert.alert('Error', 'No se pudo registrar el progreso.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <View style={[globalStyles.container, cardStyles.centered]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={progressData}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <ProgressCard item={item} />}
                ListHeaderComponent={() => (
                    <>
                        <Text style={globalStyles.title}>Mis Progresos</Text>

                        {/* Filtros de fecha */}
                        <View style={styles.filtersColumn}>
                            <ButtonApp
                                title={
                                    startDate
                                        ? `Desde: ${startDate.toLocaleDateString()}`
                                        : 'Seleccionar desde'
                                }
                                onPress={() => setShowStart(true)}
                            />
                            {showStart && (
                                <DateTimePicker
                                    value={startDate || new Date()}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={(_, date) => {
                                        setShowStart(false);
                                        if (date) setStartDate(date);
                                    }}
                                />
                            )}

                            <ButtonApp
                                title={
                                    endDate
                                        ? `Hasta: ${endDate.toLocaleDateString()}`
                                        : 'Seleccionar hasta'
                                }
                                onPress={() => setShowEnd(true)}
                            />
                            {showEnd && (
                                <DateTimePicker
                                    value={endDate || new Date()}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={(_, date) => {
                                        setShowEnd(false);
                                        if (date) setEndDate(date);
                                    }}
                                />
                            )}
                        </View>

                        {/* Acciones de filtro */}
                        <View style={styles.filtersRow}>
                            <View style={styles.smallBtn}>
                                <ButtonApp
                                    title="Aplicar"
                                    onPress={() =>
                                        loadProgressData(
                                            startDate ? startDate.toISOString().split('T')[0] : undefined,
                                            endDate ? endDate.toISOString().split('T')[0] : undefined
                                        )
                                    }
                                />
                            </View>
                            <View style={styles.smallBtn}>
                                <ButtonApp
                                    title="Limpiar"
                                    onPress={() => {
                                        setStartDate(null);
                                        setEndDate(null);
                                        loadProgressData();
                                    }}
                                    isSecondary
                                />
                            </View>
                        </View>

                        {/* Botón principal */}
                        <View style={styles.largeBtn}>
                            <ButtonApp
                                title="Registrar Nuevo Progreso"
                                onPress={() => setModalVisible(true)}
                            />
                        </View>

                        <ProgressChart progressData={progressData} />
                    </>
                )}
            />

            <RegisterProgressModal
                visible={modalVisible}
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onClose={() => setModalVisible(false)}
                submitting={submitting}
            />

            <FloatingMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    filtersColumn: {
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        marginVertical: 8,
    },
    filtersRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    smallBtn: {
        flex: 0.48,
    },
    largeBtn: {
        marginVertical: 12,
    },
});

export default ProgressScreen;

