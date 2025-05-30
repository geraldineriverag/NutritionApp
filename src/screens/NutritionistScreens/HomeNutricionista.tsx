import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonApp from '../../components/ButtonApp';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NutritionistStackParamList } from '../../navigation/NutritionistNavigator';

const HomeNutricionista = () => {
    const { logout } = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<NutritionistStackParamList>>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido, Nutricionista</Text>
            <Text style={styles.subtitle}>Gestiona aquí a tus pacientes.</Text>

            <ButtonApp
                title="Mi Perfil"
                onPress={() => navigation.navigate('Profile')}
            />
            <ButtonApp
                title="Mis Pacientes"
                onPress={() => navigation.navigate('Patients')}
            />
            <ButtonApp
                title="Mis Citas"
                onPress={() => navigation.navigate('Appointments')}
            />
            <ButtonApp
                title="Cerrar sesión"
                onPress={logout}
                isSecondary
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default HomeNutricionista;
