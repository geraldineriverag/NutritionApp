import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, Alert, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootStackParamList} from "../../navigation/AuthNavigator";
import { signUpFields, roleOptions } from '../../constants/SignUpFields';
import { registerUser } from '../../services/AuthService';
import Input from '../../components/Input';
import ButtonApp from '../../components/ButtonApp';
import ModalSelector from "../../components/ModalSelector";
import globalStyles from '../../styles/globalStyles';
import { ScrollView } from 'react-native';
import DateInput from '../../components/DateInput';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
    const [form, setForm] = useState<Record<string, string>>({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        birth_date: '',
        role: '',
        password: '',
        confirm_password: '',
    });

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const { username, email, first_name, last_name, role, password, confirm_password } = form;

        if (!username || !email || !first_name || !last_name || !role || !password || !confirm_password) {
            Alert.alert('Error', 'Por favor completa todos los campos obligatorios.');
            return;
        }

        if (password !== confirm_password) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        try {
            await registerUser(form);
            Alert.alert('Éxito', 'Cuenta creada correctamente.', [
                { text: 'OK', onPress: () => navigation.navigate('Login') }
            ]);
        } catch (error: any) {
            console.error('Error en registro:', error);
            Alert.alert('Error', error.message || 'No se pudo crear la cuenta.');
        }
    };

    const renderFields = () => {
        const fieldsToRender = signUpFields.filter(field => field.key !== 'role'); // role lo manejamos aparte
        const fieldPairs = [];

        for (let i = 0; i < fieldsToRender.length; i += 2) {
            const firstField = fieldsToRender[i];
            const secondField = fieldsToRender[i + 1];

            fieldPairs.push(
                <View key={firstField.key} style={styles.row}>
                    <View style={styles.halfInput}>
                        {firstField.key === 'birth_date' ? (
                            <DateInput
                                label={firstField.label}
                                value={form[firstField.key] || ''}
                                onChange={(date) => handleChange(firstField.key, date)}
                            />
                        ) : (
                            <Input
                                label={firstField.label}
                                value={form[firstField.key] || ''}
                                onChangeText={text => handleChange(firstField.key, text)}
                                keyboardType={firstField.keyboardType}
                                secureTextEntry={firstField.secureTextEntry}
                            />
                        )}
                    </View>

                    {secondField && (
                        <View style={styles.halfInput}>
                            {secondField.key === 'birth_date' ? (
                                <DateInput
                                    label={secondField.label}
                                    value={form[secondField.key] || ''}
                                    onChange={(date) => handleChange(secondField.key, date)}
                                />
                            ) : (
                                <Input
                                    label={secondField.label}
                                    value={form[secondField.key] || ''}
                                    onChangeText={text => handleChange(secondField.key, text)}
                                    keyboardType={secondField.keyboardType}
                                    secureTextEntry={secondField.secureTextEntry}
                                />
                            )}
                        </View>
                    )}
                </View>
            );
        }

        return fieldPairs;
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={globalStyles.container}>
                <Text style={globalStyles.title}>Crear cuenta</Text>

                {renderFields()}

                <ModalSelector
                    label="Rol"
                    options={roleOptions}
                    value={form.role}
                    onValueChange={(value) => handleChange('role', value)}
                />

                <ButtonApp title="Crear cuenta" onPress={handleSubmit} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    halfInput: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default SignUpScreen;
