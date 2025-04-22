import React, { useState } from 'react';
import {TouchableOpacity, StyleSheet, View, Keyboard} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Input from './Input';

interface DateInputProps {
    label: string;
    value: string;
    onChange: (date: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        Keyboard.dismiss(); // <-- CIERRA el teclado antes de abrir
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        const formattedDate = date.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
        onChange(formattedDate);
        hideDatePicker();
    };

    return (
        <View style={styles.touchable}>
            <TouchableOpacity onPress={showDatePicker} activeOpacity={1}>
                <View pointerEvents="none"> {/* <-- Aquí el truco */}
                    <Input
                        label={label}
                        value={value}
                        onChangeText={() => {}}
                        keyboardType="default"
                        secureTextEntry={false}
                        editable={false}
                    />
                </View>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    touchable: {
        width: '100%',
    },
});

export default DateInput;

