import React from 'react';
import { View, Text } from 'react-native';
import ButtonApp from '../components/ButtonApp';
import globalStyles from '../styles/globalStyles';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }: any) => {
    const { logout } = useAuth();

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Bienvenido a tu Panel</Text>
            <Text style={globalStyles.subtitle}>Aquí podrás ver todas tus actividades y progreso.</Text>

            <ButtonApp title="Ir al perfil" onPress={() => navigation.navigate('Profile')} />
            <ButtonApp title="Mis datos" onPress={() => navigation.navigate('Step', {
                title: 'Mis Datos',
                stepIndex: 0,
                fields: [],
            })} />
            <ButtonApp title="Cerrar sesión" onPress={logout} />
        </View>
    );
};

export default HomeScreen;

