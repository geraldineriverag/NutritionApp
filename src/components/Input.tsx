import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import colors from "../styles/colors";
import { typography } from '../styles/typography';

type Props = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: TextInputProps['keyboardType'];
    placeholder?: string;
};

const Input: React.FC<Props> = ({
                                    label,
                                    value,
                                    onChangeText,
                                    secureTextEntry = false,
                                    keyboardType = 'default',
                                    placeholder = '',
                                }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                placeholder={placeholder}
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
            />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        ...typography.body,
        color: colors.text,
        marginBottom: 6,
    },
    input: {
        height: 48,
        backgroundColor: colors.surface,
        borderRadius: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: colors.border,
        color: colors.text,
        ...typography.body,
    },
});
