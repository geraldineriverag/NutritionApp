import React from 'react';
import { View, Text } from 'react-native';
import ButtonApp from '../components/ButtonApp';
import globalStyles from '../styles/globalStyles';
import { useAuth } from '../context/AuthContext';
import FloatingMenu from "../components/FloatingMenu";

const HomeScreen = ({ navigation }: any) => {
    const { logout } = useAuth();

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Bienvenido a tu Panel</Text>
            <Text style={globalStyles.text}>Aquí podrás ver todas tus actividades y progreso.</Text>

            <ButtonApp title="Ir al perfil" onPress={() => navigation.navigate('Profile')} />
            <ButtonApp title="Mis datos" onPress={() => navigation.navigate('Step', {
                title: 'Mis Datos',
                stepIndex: 0,
                fields: [],
            })} />
            <ButtonApp title="Progreso" onPress={() => navigation.navigate('Progress')} />
            <ButtonApp title="Cerrar sesión" onPress={logout} />

            <FloatingMenu/>
        </View>
    );
};

export default HomeScreen;

