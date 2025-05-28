import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import ButtonApp from '../../components/ButtonApp';
import globalStyles from '../../styles/globalStyles';
import { acceptInvitation, Invitation } from '../../services/InvitationService';
import {getMyPatientProfile} from '../../services/PatientService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/PatientNavigator';

type Props = NativeStackScreenProps<AppStackParamList, 'Invitation'>;

const AcceptInvitationScreen: React.FC<Props> = ({ navigation }) => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const me = await getMyPatientProfile();
                // Si ya tiene nutricionista, vamos directo al perfil
                if (me.nutritionist_id) {
                    navigation.replace('NutritionistProfile', { id: me.nutritionist_id });
                    return;
                }
            } catch (err) {
                console.error(err);
                Alert.alert(
                    'Error',
                    'No pudimos comprobar tu nutricionista. Intenta de nuevo más tarde.'
                );
            } finally {
                setInitialLoading(false);
            }
        })();
    }, [navigation]);

    const handleAccept = async () => {
        if (!token.trim()) {
            return Alert.alert('Error', 'Por favor ingresa el código de invitación.');
        }
        setLoading(true);
        try {
            const result: Invitation = await acceptInvitation(token.trim());
            Alert.alert('¡Éxito!', 'Invitación aceptada.', [
                {
                    text: 'Ver perfil',
                    onPress: () =>
                        navigation.replace('NutritionistProfile', {
                            id: result.nutritionist,
                        }),
                },
            ]);
        } catch (e: any) {
            console.error(e.response?.data || e);
            Alert.alert('Error', e.response?.data?.detail || 'Código inválido o ya usado.');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

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
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <ButtonApp title="Aceptar" onPress={handleAccept} />
            )}
        </KeyboardAvoidingView>
    );
};

export default AcceptInvitationScreen;
