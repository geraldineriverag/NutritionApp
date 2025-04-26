import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { fetchProgressData, registerProgress } from '../services/ProgressRecordService';
import globalStyles from '../styles/globalStyles';
import cardStyles from '../styles/cardStyles';
import RegisterProgressModal from '../components/RegisterProgressModal';
import ProgressCard from '../components/ProgressCard';
import ProgressChart from '../components/ProgressChart';
import { getPatientId } from '../services/PatientService';
import FloatingMenu from "../components/FloatingMenu";
import ButtonApp from "../components/ButtonApp"; // Asegúrate de importar esto

const ProgressScreen = () => {
    const [progressData, setProgressData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        weight: '',
        waist_circumference: '',
        hip_circumference: '',
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchProgressData();
                setProgressData(data);
            } catch (error) {
                console.error('Error al cargar los progresos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
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
            const updatedData = await fetchProgressData();
            setProgressData(updatedData);
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
                        <Text style={[globalStyles.title]}>Mis Progresos</Text>
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

            <FloatingMenu/>
        </View>
    );
};

export default ProgressScreen;
