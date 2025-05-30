import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Modal,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import cardStyles from '../../styles/cardStyles';
import ButtonApp from '../../components/ButtonApp';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';
import ModalSelect from "../../components/ModalSelector";
import {
    getNutritionistProfile,
    createNutritionistProfile,
    updateNutritionistProfile,
    NutritionistProfile,
} from '../../services/NutritionistService';
import { nutritionistFields, NutritionistField } from '../../constants/nutritionistFields';

const NutritionistProfileScreen: React.FC = () => {
    const [profile, setProfile] = useState<Partial<NutritionistProfile>>({});
    const [loading, setLoading] = useState(true);
    const [isFirstTime, setIsFirstTime] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState<NutritionistField | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                const data = await getNutritionistProfile();
                setProfile(data);
            } catch (e: any) {
                if (e.response?.status === 404) {
                    setProfile({});
                    setIsFirstTime(true);
                } else {
                    console.error(e);
                    Alert.alert('Error', 'No se pudo cargar el perfil.');
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleEdit = (field: NutritionistField) => {
        setSelectedField(field);
        const current = profile[field.key];
        setInputValue(current != null ? String(current) : '');
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!selectedField) return;

        let value: string | number | boolean = inputValue;
        if (selectedField.key === 'accepts_new_patients') {
            value = inputValue === 'true';
        } else if (selectedField.keyboardType === 'numeric') {
            value = Number(inputValue);
        }

        const payload: Partial<NutritionistProfile> = {
            [selectedField.key]: value,
        };

        setLoading(true);
        try {
            let updated: NutritionistProfile;
            if (isFirstTime) {
                updated = await createNutritionistProfile(payload);
                setIsFirstTime(false);
            } else {
                updated = await updateNutritionistProfile(payload);
            }
            setProfile(prev => ({ ...prev, ...updated }));
            setModalVisible(false);
        } catch (e: any) {
            console.error('Error guardando campo:', e.response?.data || e);
            Alert.alert('Error', 'No se pudo guardar el campo.');
        } finally {
            setLoading(false);
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
                data={nutritionistFields}
                keyExtractor={item => item.key}
                contentContainerStyle={{ paddingBottom: 80 }}
                ListHeaderComponent={() => (
                    <>
                        <Text style={globalStyles.title}>Mi Perfil Profesional</Text>
                        {isFirstTime && (
                            <View style={[cardStyles.card, { backgroundColor: '#e8f5e9' }]}>
                                <Text style={globalStyles.subtitle}>
                                    ¡Bienvenido! Empieza completando tu perfil profesional. Puedes guardar cada campo por separado y volver cuando quieras.
                                </Text>
                            </View>
                        )}
                    </>
                )}
                renderItem={({ item }) => (
                    <View
                        style={[
                            cardStyles.card,
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            },
                        ]}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={cardStyles.cardTitle}>{item.label}</Text>
                            <Text style={cardStyles.cardValue}>
                                {item.key === 'accepts_new_patients'
                                    ? profile.accepts_new_patients
                                        ? 'Sí'
                                        : 'No'
                                    : profile[item.key] != null
                                        ? String(profile[item.key])
                                        : '-'}
                            </Text>
                        </View>
                        {item.editable && (
                            <TouchableOpacity
                                onPress={() => handleEdit(item)}
                                style={{ padding: 8, marginLeft: 12 }}
                            >
                                <Feather name="edit-2" size={20} color={colors.primary} />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={cardStyles.modalOverlay}>
                    <View style={cardStyles.modalContainer}>
                        <Text style={cardStyles.modalTitle}>Editar {selectedField?.label}</Text>

                        {selectedField?.key === 'accepts_new_patients' ? (
                            <ModalSelect
                                label={selectedField.label}
                                options={[
                                    { label: 'Sí', value: 'true' },
                                    { label: 'No', value: 'false' },
                                ]}
                                value={inputValue}
                                onValueChange={setInputValue}
                            />
                        ) : (
                            <TextInput
                                value={inputValue}
                                onChangeText={setInputValue}
                                style={cardStyles.input}
                                placeholder={`Ingresa ${selectedField?.label.toLowerCase()}`}
                                keyboardType={
                                    selectedField?.key === 'website'
                                        ? 'url'
                                        : selectedField?.keyboardType || 'default'
                                }
                                autoCapitalize={
                                    selectedField?.key === 'website' ? 'none' : 'sentences'
                                }
                                autoCorrect={selectedField?.key === 'website' ? false : true}
                            />
                        )}

                        <ButtonApp title="Guardar" onPress={handleSave} />
                        <ButtonApp
                            title="Cancelar"
                            onPress={() => setModalVisible(false)}
                            isSecondary
                        />
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default NutritionistProfileScreen;
