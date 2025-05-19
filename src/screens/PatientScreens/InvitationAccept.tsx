// src/screens/AcceptInvitationScreen.tsx
import React, { useState } from 'react';
import { Text, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import ButtonApp from "../../components/ButtonApp";
import globalStyles from "../../styles/globalStyles";
import { acceptInvitation} from "../../services/InvitationService";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {AppStackParamList} from "../../navigation/PatientNavigator";

type Props = NativeStackScreenProps<AppStackParamList, 'Invitation'>;

const AcceptInvitationScreen: React.FC<Props> = ({ navigation }) => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAccept = async () => {
        if (!token.trim()) {
            return Alert.alert('Error', 'Por favor ingresa el código de invitación.');
        }
        setLoading(true);
        try {
            await acceptInvitation(token.trim());
            Alert.alert('Éxito', '¡Invitación aceptada!', [
                { text: 'OK', onPress: () => navigation.replace('Home') }
            ]);
        } catch (e: any) {
            console.error(e.response?.data || e);
            Alert.alert('Error', e.response?.data?.detail || 'Código inválido o ya usado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={[globalStyles.container, { justifyContent: 'center' }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Text style={globalStyles.title}>Aceptar Invitación</Text>
            <Text style={globalStyles.text}>
                Introduce el código que has recibido por correo para asociar tu perfil con tu nutricionista.
            </Text>
            <TextInput
                placeholder="Código de invitación"
                style={[globalStyles.input, { marginBottom: 20 }]}
                value={token}
                onChangeText={setToken}
                autoCapitalize="none"
            />
            {loading
                ? <ActivityIndicator size="large" />
                : <ButtonApp title="Aceptar" onPress={handleAccept} />
            }
        </KeyboardAvoidingView>
    );
};

export default AcceptInvitationScreen;
