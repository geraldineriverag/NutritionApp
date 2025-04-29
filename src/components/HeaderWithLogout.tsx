import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
import styles from "../styles/homeStyles";

interface Props {
    username: string;
    onLogout: () => void;
}

const HeaderWithLogout: React.FC<Props> = ({ username, onLogout }) => {
    const today = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', weekday: 'long' });

    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.greeting}>Hola, {username}</Text>
                <Text style={styles.date}>{today}</Text>
            </View>
            <TouchableOpacity onPress={onLogout} style={styles.logoutIconContainer}>
                <Ionicons name="log-out-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
        </View>
    );
};

export default HeaderWithLogout;
