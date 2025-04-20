import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import colors from "../styles/colors";
import { typography } from '../styles/typography';

type ButtonProps = {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    isSecondary?: boolean; // Si es un botón secundario, cambiará de color
    isDisabled?: boolean; // Para manejar el estado deshabilitado
};

const ButtonApp: React.FC<ButtonProps> = ({ title, onPress, isSecondary = false, isDisabled = false }) => {
    const buttonStyle = isSecondary ? styles.secondaryButton : styles.primaryButton;
    const textStyle = isSecondary ? styles.secondaryText : styles.primaryText;

    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle, isDisabled && styles.disabledButton]}
            onPress={onPress}
            disabled={isDisabled}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 24,
        marginVertical: 12,
    },
    primaryButton: {
        backgroundColor: colors.primary,
    },
    secondaryButton: {
        backgroundColor: colors.secondary,
    },
    disabledButton: {
        backgroundColor: colors.textSecondary, // Un color deshabilitado más suave
    },
    text: {
        ...typography.body,
        textAlign: 'center',
    },
    primaryText: {
        color: colors.background,
    },
    secondaryText: {
        color: colors.background,
    },
});

export default ButtonApp;
