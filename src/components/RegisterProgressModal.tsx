import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import cardStyles from '../styles/cardStyles';

type FormFieldKey = 'weight' | 'waist_circumference' | 'hip_circumference';

interface Props {
    visible: boolean;
    formData: Record<FormFieldKey, string>;
    onChange: (key: FormFieldKey, value: string) => void;
    onSubmit: () => void;
    onClose: () => void;
    submitting: boolean;
}

const placeholderLabels: Record<FormFieldKey, string> = {
    weight: 'Peso (kg)',
    waist_circumference: 'Circunferencia cintura (cm)',
    hip_circumference: 'Circunferencia cadera (cm)',
};

const RegisterProgressModal = ({ visible, formData, onChange, onSubmit, onClose, submitting }: Props) => {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={cardStyles.modalOverlay}>
                <View style={cardStyles.modalContainer}>
                    <Text style={cardStyles.modalTitle}>Nuevo Progreso</Text>

                    {(['weight', 'waist_circumference', 'hip_circumference'] as FormFieldKey[]).map((field) => (
                        <TextInput
                            key={field}
                            placeholder={placeholderLabels[field]} // ✅ en español
                            value={formData[field]}
                            onChangeText={(value) => onChange(field, value)}
                            keyboardType="numeric"
                            style={cardStyles.input}
                        />
                    ))}

                    <TouchableOpacity style={cardStyles.submitButton} onPress={onSubmit} disabled={submitting}>
                        {submitting ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={cardStyles.submitButtonText}>Guardar</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose}>
                        <Text style={{ marginTop: 10, color: 'red', textAlign: 'center' }}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default RegisterProgressModal;
