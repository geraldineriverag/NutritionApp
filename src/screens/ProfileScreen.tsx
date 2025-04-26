import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity } from 'react-native';
import { getProfile, updateProfileField} from "../services/UserService";
import globalStyles from '../styles/globalStyles';
import {UserProfile} from "../types/UserProfile";
import {profileFields} from "../constants/ProfileFields";
import ButtonApp from '../components/ButtonApp';

const ProfileScreen = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState<keyof UserProfile | null>(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await getProfile();
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile', error);
        }
    };

    const handleEdit = (field: keyof UserProfile) => {
        setSelectedField(field);
        setInputValue(profile?.[field] || '');
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!selectedField) return;

        try {
            await updateProfileField(selectedField, inputValue);
            setProfile((prev) => prev ? { ...prev, [selectedField]: inputValue } : prev);
            setModalVisible(false);
        } catch (error) {
            console.error('Error updating field', error);
        }
    };

    const renderItem = ({ item }: { item: typeof profileFields[number] }) => (
        <View style={globalStyles.cardContainer}>
            <View>
                <Text style={globalStyles.cardTitle}>{item.label}</Text>
                <Text style={globalStyles.cardSubtitle}>{profile?.[item.key] || '-'}</Text>
            </View>
            {(item.key !== 'email' && item.key !== 'username' && item.key !== 'role') && (
                <TouchableOpacity onPress={() => handleEdit(item.key)}>
                    <Text style={globalStyles.buttonEditText}>Editar</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Mi Perfil</Text>

            <FlatList
                data={profileFields}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                contentContainerStyle={globalStyles.listContent}
            />

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={globalStyles.modalOverlay}>
                    <View style={globalStyles.modalContainer}>
                        <Text style={globalStyles.modalTitle}>
                            Editar {selectedField && profileFields.find(f => f.key === selectedField)?.label}
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
        </View>
    );
};

export default ProfileScreen;
