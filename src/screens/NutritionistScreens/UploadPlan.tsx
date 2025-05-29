import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    Alert,
    StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from '../../styles/globalStyles';
import { createNutritionPlan } from '../../services/NutritionPlanService';
import { NutritionistStackParamList } from '../../navigation/NutritionistNavigator';
import ButtonApp from '../../components/ButtonApp';
import {getNutritionistProfile} from "../../services/NutritionistService";

type Props = NativeStackScreenProps<NutritionistStackParamList, 'UploadPlan'>;

interface PdfFile {
    uri: string;
    name: string;
    type: string;
}

const UploadPlanScreen: React.FC<Props> = ({ navigation, route }) => {
    const { patientId } = route.params;

    const [mealPlan, setMealPlan] = useState('');
    const [calories, setCalories] = useState('');
    const [basal, setBasal] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');
    const [reviewDate, setReviewDate] = useState<Date>();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [pdfFile, setPdfFile] = useState<PdfFile | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const pickPdf = async () => {
        const res = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
            copyToCacheDirectory: true,
        });
        if (!res.canceled && res.assets && res.assets.length > 0) {
            const asset = res.assets[0];
            setPdfFile({
                uri: asset.uri,
                name: asset.name,
                type: asset.mimeType ?? 'application/pdf',
            });
        }
    };

    const onDateChange = (_: any, date?: Date) => {
        setShowDatePicker(false);
        if (date) setReviewDate(date);
    };

    const handleSubmit = async () => {
        if (!mealPlan || !calories || !basal) {
            Alert.alert('Error', 'Complete al menos plan, calorías y necesidades basales.');
            return;
        }
        setSubmitting(true);
        try {
            const { id: nutritionistId } = await getNutritionistProfile();
            await createNutritionPlan(patientId, nutritionistId, {
                meal_plan: mealPlan,
                calories: Number(calories),
                caloric_needs: Number(basal),
                protein: protein ? Number(protein) : undefined,
                carbs: carbs ? Number(carbs) : undefined,
                fats: fats ? Number(fats) : undefined,
                review_date: reviewDate?.toISOString(),
                pdf_file: pdfFile
                    ? { uri: pdfFile.uri, name: pdfFile.name, type: pdfFile.type }
                    : undefined,
            });
            Alert.alert('¡Listo!', 'El plan se ha subido correctamente.');
            navigation.goBack();
        } catch (e: any) {
            console.error(e);
            Alert.alert('Error', 'No se pudo subir el plan.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitting) {
        return (
            <View style={[globalStyles.container, styles.loading]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Nuevo Plan Nutricional</Text>

            <Text style={styles.label}>Plan de comidas</Text>
            <TextInput
                style={styles.textArea}
                multiline
                placeholder="Describe aquí el plan..."
                value={mealPlan}
                onChangeText={setMealPlan}
            />

            <Text style={styles.label}>Calorías diarias</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="e.g. 2000"
                value={calories}
                onChangeText={setCalories}
            />

            <Text style={styles.label}>Necesidades basales</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="e.g. 1500"
                value={basal}
                onChangeText={setBasal}
            />

            <Text style={styles.label}>Proteína (g)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={protein}
                onChangeText={setProtein}
            />

            <Text style={styles.label}>Carbohidratos (g)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={carbs}
                onChangeText={setCarbs}
            />

            <Text style={styles.label}>Grasas (g)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={fats}
                onChangeText={setFats}
            />

            <Text style={styles.label}>Fecha de revisión</Text>
            <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}
            >
                <Text>
                    {reviewDate ? reviewDate.toLocaleDateString() : 'Seleccionar fecha'}
                </Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={reviewDate || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                />
            )}

            <Text style={styles.label}>Subir PDF</Text>
            <Button
                title={pdfFile?.name || 'Seleccionar PDF'}
                onPress={pickPdf}
            />

            <ButtonApp
                title="Subir Plan"
                onPress={handleSubmit}
                isDisabled={submitting}
            />
        </View>
    );
};

export default UploadPlanScreen;

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        marginTop: 12,
        marginBottom: 4,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        height: 100,
    },
    dateButton: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        alignItems: 'center',
    },
});
