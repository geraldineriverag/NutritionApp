import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface ModalSelectProps {
    label: string;
    options: { label: string; value: string }[];
    value: string;
    onValueChange: (value: string) => void;
}

const ModalSelect: React.FC<ModalSelectProps> = ({ label, options, value, onValueChange }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (item: { label: string; value: string }) => {
        onValueChange(item.value); // Pass selected value to the parent
        setModalVisible(false); // Close modal after selection
    };

    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{label}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.inputContainer}>
                <Text style={styles.selectedText}>{value || 'Selecciona...'}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={options}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.value}
                        />
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        padding: 10,
        backgroundColor: '#d5d0d0',
        borderRadius: 8,
    },
    selectedText: {
        color: '#333',
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
    },
    option: {
        paddingVertical: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        borderRadius: 8,
    },
    closeButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default ModalSelect;
