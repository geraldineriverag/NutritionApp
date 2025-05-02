import React, { useState } from 'react';
import { Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Input from "../components/Input";
import ButtonApp from "../components/ButtonApp";
import globalStyles from "../styles/globalStyles";
import { loginFields } from "../constants/loginFields";
import { useAuth } from '../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AuthNavigator';
import {loginRequest} from "../services/AuthService";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [form, setForm] = useState<{ [key: string]: string }>({});
    const { login } = useAuth();

    const handleInputChange = (key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleLogin = async () => {
        try {
            const { access, refresh, role } = await loginRequest(form.username, form.password);
            await login(access, refresh, role);
        } catch (e: any) {
            Alert.alert('Error', e.message);
        }
    };


    const handleRegisterNavigation = () => {
        navigation.navigate('SignUp')
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

            <Text style={globalStyles.link} onPress={handleRegisterNavigation}>
                ¿No tienes cuenta? Regístrate
            </Text>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
