import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import globalStyles from '../styles/globalStyles';
import cardStyles from '../styles/cardStyles';
import ProgressCard from '../components/ProgressCard';
import ProgressChart from '../components/ProgressChart';
import RegisterProgressModal from '../components/RegisterProgressModal';
import FloatingMenu from '../components/FloatingMenu';
import ButtonApp from '../components/ButtonApp';
import { getPatientId } from '../services/PatientService';
import { registerProgress } from '../services/ProgressRecordService';
import { useProgressData } from '../hooks/useProgressData';
import RangeFilter from "../components/RangeFilter";

const ProgressScreen = () => {
    const { progressData, loading, loadProgressData } = useProgressData();
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        weight: '',
        waist_circumference: '',
        hip_circumference: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    useEffect(() => {
        loadProgressData();
    }, []);

    const handleChange = (key: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
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
            await loadProgressData(startDate || undefined, endDate || undefined);
            setModalVisible(false);
            setFormData({ weight: '', waist_circumference: '', hip_circumference: '' });
        } catch (error) {
            console.error('Error al registrar progreso:', error);
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
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProgressCard item={item} />}
                ListHeaderComponent={
                    <>
                        <Text style={globalStyles.title}>Mis Progresos</Text>
                        <RangeFilter
                            startDate={startDate}
                            endDate={endDate}
                            onChangeStartDate={setStartDate}
                            onChangeEndDate={setEndDate}
                            onApply={() => loadProgressData(startDate || undefined, endDate || undefined)}
                            onClear={() => {
                                setStartDate(null);
                                setEndDate(null);
                                loadProgressData();
                            }}
                            title="Filtrar Progresos"
                            showSummary={true}
                        />
                        <ButtonApp title="Registrar Nuevo Progreso" onPress={() => setModalVisible(true)} />
                        <ProgressChart progressData={progressData} />
                    </>
                }
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

export default ProgressScreen;
