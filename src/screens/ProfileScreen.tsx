// src/screens/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';

// Simulamos la solicitud al backend (reemplazar con tu lógica de API real)
const fetchUserData = async () => {
    try {
        // Aquí iría la lógica para hacer la solicitud al backend
        // Por ejemplo, usando fetch o axios
        // const response = await fetch('https://api.example.com/user');
        // const data = await response.json();

        // Simulamos una respuesta exitosa con datos ficticios
        return {
            fullName: 'Juan Pérez',
            age: '30',
            goalType: 'Perder peso',
            medicalCondition: 'Ninguna',
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch data');
    }
};

const ProfileScreen = ({ navigation }: any) => {
    const [userData, setUserData] = useState<any>(null); // Estado para almacenar los datos del usuario
    const [loading, setLoading] = useState<boolean>(true); // Estado para mostrar el cargando
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    useEffect(() => {
        // Simulamos la llamada a la API cuando el componente se monta
        const getUserData = async () => {
            try {
                const data = await fetchUserData(); // Aquí llamamos a la función que simula la API
                setUserData(data);
            } catch (err) {
                setError('Error al cargar los datos');
            } finally {
                setLoading(false); // Ya no estamos cargando
            }
        };

        getUserData();
    }, []); // Solo se ejecuta una vez al montar el componente

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>{error}</Text>
                <Button title="Reintentar" onPress={() => setLoading(true)} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil de Usuario</Text>

            <Text style={styles.label}>Nombre Completo: {userData.fullName}</Text>
            <Text style={styles.label}>Edad: {userData.age}</Text>
            <Text style={styles.label}>Objetivo: {userData.goalType}</Text>
            <Text style={styles.label}>Condición Médica: {userData.medicalCondition}</Text>

            {/* Botón de navegación para ir a la configuración */}
            <Button
                title="Ir a la Configuración"
                onPress={() => navigation.navigate('Settings')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginVertical: 5,
    },
});

export default ProfileScreen;
