import { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Modal, TextInput, TouchableOpacity } from 'react-native';
import { fetchSubmittedData, updateWizardField } from '../../services/WizardService';
import globalStyles from '../../styles/globalStyles';
import cardStyles from '../../styles/cardStyles';
import FloatingMenu from "../../components/FloatingMenu";
import ButtonApp from "../../components/ButtonApp";
import { submittedFields} from "../../constants/SubmittedFields";

const SuccessScreen = () => {
    const [formData, setFormData] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await fetchSubmittedData();
            setFormData(data);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (field: string) => {
        setSelectedField(field);
        setInputValue(formData?.[field] || '');
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!selectedField) return;
        try {
            await updateWizardField(selectedField, inputValue);
            setFormData((prev) => prev ? { ...prev, [selectedField]: inputValue } : prev);
            setModalVisible(false);
        } catch (error) {
            console.error('Error updating field:', error);
        }
    };

    if (loading) {
        return (
            <View style={[globalStyles.container, cardStyles.centered]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!formData) {
        return (
            <View style={[globalStyles.container, cardStyles.centered]}>
                <Text>Error cargando datos.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={[globalStyles.container, cardStyles.content]}>
                    <Text style={[globalStyles.title, cardStyles.title]}>
                        Resumen de tu Historia Clínica
                    </Text>

                    {submittedFields.map((item) => (
                        <View key={item.key} style={cardStyles.card}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={cardStyles.cardTitle}>{item.label}</Text>
                                    <Text style={cardStyles.cardValue}>{formData?.[item.key] || '-'}</Text>
                                </View>
                                {(item.key !== 'algo_no_editable') && (
                                    <TouchableOpacity onPress={() => handleEdit(item.key)}>
                                        <Text style={globalStyles.buttonEditText}>Editar</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                    ))}
                </View>
            </ScrollView>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={globalStyles.modalOverlay}>
                    <View style={globalStyles.modalContainer}>
                        <Text style={globalStyles.modalTitle}>
                            Editar {selectedField && submittedFields.find(f => f.key === selectedField)?.label}
                        </Text>
                        <TextInput
                            value={inputValue}
                            onChangeText={setInputValue}
                            style={globalStyles.input}
                            placeholder="Nuevo valor"
                            placeholderTextColor="#aaa"
                        />
                        <ButtonApp title="Guardar" onPress={handleSave} />
                        <ButtonApp title="Cancelar" onPress={() => setModalVisible(false)} isSecondary />
                    </View>
                </View>
            </Modal>

            <FloatingMenu />
        </View>
    );
};

export default SuccessScreen;
