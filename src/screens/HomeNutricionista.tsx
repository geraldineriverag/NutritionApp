// screens/HomeNutricionista.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonApp from '../components/ButtonApp';
import { useAuth } from '../context/AuthContext';

const HomeNutricionista = () => {
    const { logout } = useAuth();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido, Nutricionista</Text>
            <Text style={styles.subtitle}>Gestiona aquí a tus pacientes.</Text>
            <ButtonApp title="Cerrar sesión" onPress={logout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex:1, justifyContent:'center', padding:20 },
    title:    { fontSize:24, fontWeight:'700', textAlign:'center' },
    subtitle: { fontSize:16, textAlign:'center', marginBottom:20 }
});

export default HomeNutricionista;
