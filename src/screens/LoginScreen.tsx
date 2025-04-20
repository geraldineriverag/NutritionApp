// LoginScreen.tsx
import React, { useState } from 'react';
import { Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Input from "../components/Input";
import ButtonApp from "../components/ButtonApp";
import globalStyles from "../styles/globalStyles";
import axios from 'axios';
import { loginFields } from "../constants/loginFields";
import { useAuth } from '../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AuthNavigator';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {wizardSteps} from "../constants/wizardSteps"; // Asegúrate de importar RootStackParamList

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [form, setForm] = useState<{ [key: string]: string }>({});
    const { login } = useAuth();

    const handleInputChange = (key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleLogin = async () => {
        try {
            const { data } = await axios.post('http://127.0.0.1:8000/api/accounts/token/', {
                username: form.username,
                password: form.password,
            });

            console.log("Token recibido:", data);
            await login(data.access, data.refresh);
            AsyncStorage.setItem('token', data.access);
        } catch (error: any) {
            Alert.alert("Error", "Credenciales inválidas o problema de conexión.");
            console.error(error.response?.data || error.message);
        }
    };

    const handleRegisterNavigation = () => {
        // Navegar al primer paso del wizard con sus campos correspondientes
        const initialStep = 0;
        /*  navigation.navigate('Step', {
            title: wizardSteps[initialStep].title,
            fields: wizardSteps[initialStep].fields,
            stepIndex: initialStep,
        }); */
    };

    return (
        <KeyboardAvoidingView
            style={globalStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Text style={globalStyles.title}>Iniciar sesión</Text>

            {loginFields.map((field) => (
                <Input
                    key={field.key}
                    label={field.label}
                    value={form[field.key] || ''}
                    onChangeText={(text) => handleInputChange(field.key, text)}
                    secureTextEntry={field.secureTextEntry || false}
                />
            ))}

            <ButtonApp title="Iniciar Sesión" onPress={handleLogin} />
/*
            <Text style={globalStyles.link} onPress={handleRegisterNavigation}>
                ¿No tienes cuenta? Regístrate
            </Text>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
