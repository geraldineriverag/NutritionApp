import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';

interface Option {
    label: string;
    value: string;
}

interface ModalSelectProps {
    label: string;
    options: Option[];
    value: string;
    onValueChange: (value: string) => void;
}

const ModalSelect: React.FC<ModalSelectProps> = ({
                                                     label,
                                                     options,
                                                     value,
                                                     onValueChange,
                                                 }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (item: Option) => {
        onValueChange(item.value);
        setModalVisible(false);
    };

    const selectedLabel =
        options.find(option => option.value === value)?.label || 'Selecciona...';

    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.inputContainer}
            >
                <Text style={styles.selectedText}>{selectedLabel}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={options}
                            keyExtractor={item => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
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
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 14,
    },
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
    },
    option: {
        paddingVertical: 12,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
    },
    closeButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default ModalSelect;
