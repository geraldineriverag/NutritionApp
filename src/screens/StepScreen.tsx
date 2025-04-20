// src/screens/StepScreen.tsx
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Input from '../components/Input';
import ButtonApp from '../components/ButtonApp';
import globalStyles from '../styles/globalStyles';
import { useWizardForm } from '../context/WizardFormContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AuthNavigator';
import {fetchFields, postFormData} from "../services/WizardService";
import {AppStackParamList} from "../navigation/AppNavigator";

type StepScreenProps = NativeStackScreenProps<AppStackParamList, 'Step'>;

type Step = {
    title: string;
    fields: {
        key: string;
        label: string;
        keyboardType?: 'default' | 'numeric' | 'email-address';
    }[];
};

const StepScreen: React.FC<StepScreenProps> = ({ navigation, route }) => {
    const { stepIndex } = route.params;
    const { data, updateData, setAllData, wizardSteps, setWizardSteps } = useWizardForm();
    const [loading, setLoading] = useState(true);

    const getFields = async () => {
        try {
            const stepsData = await fetchFields();
            setWizardSteps(stepsData);

            const initialData: Record<string, any> = {};
            stepsData.forEach((step: Step) => {
                step.fields.forEach((field) => {
                    initialData[field.key] = '';
                });
            });
            setAllData(initialData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (wizardSteps.length === 0) {
            getFields();
        } else {
            setLoading(false);
        }
    }, []);

    const handleNextStep = async () => {
        const currentStep = wizardSteps[stepIndex];
        if (!currentStep) return;

        const emptyFields = currentStep.fields.filter(field => !data[field.key]);
        if (emptyFields.length > 0) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        const nextIndex = stepIndex + 1;
        const nextStep = wizardSteps[nextIndex];

        if (nextStep) {
            navigation.push('Step', { // 👈 VOLVEMOS A USAR PUSH
                title: nextStep.title,
                fields: nextStep.fields,
                stepIndex: nextIndex,
            });
        } else {
            try {
                // 🚀 POST de la data
                await postFormData(data);

                // ✅ Si todo sale bien
                navigation.navigate('Home');
            } catch (error) {
                console.error('Error al enviar datos:', error);
                Alert.alert('Error', 'No se pudo enviar el formulario.');
            }
        }
    };

    if (loading) {
        return null; // loader opcional
    }

    const currentStep = wizardSteps[stepIndex];
    if (!currentStep) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={globalStyles.container}
                keyboardShouldPersistTaps="handled"
            >
                {currentStep.fields.map((field) => (
                    <Input
                        key={field.key}
                        label={field.label}
                        value={data[field.key] || ''}
                        onChangeText={(text) => updateData({ [field.key]: text })}
                        keyboardType={field.keyboardType || 'default'}
                    />
                ))}
                <ButtonApp title="Siguiente" onPress={handleNextStep} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default StepScreen;


