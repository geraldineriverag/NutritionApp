import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import menuStyles from '../styles/menuStyles'; // 👈 Estilos separados

const FloatingMenu = () => {
    const navigation = useNavigation();

    return (
        <View style={menuStyles.container}>
            <TouchableOpacity
                style={menuStyles.button}
                onPress={() => navigation.navigate('Home' as never)}
            >
                <Feather name="home" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
                style={menuStyles.button}
                onPress={() => navigation.navigate('Profile' as never)}
            >
                <Feather name="user" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
                style={menuStyles.button}
                onPress={() => navigation.navigate('Invitation' as never)}
            >
                <Feather name="users" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
                style={menuStyles.button}
                onPress={() => navigation.navigate('Settings' as never)}
            >
                <Feather name="settings" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default FloatingMenu;
