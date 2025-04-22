import { useEffect, useState } from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import { fetchSubmittedData } from '../services/WizardService';
import globalStyles from '../styles/globalStyles';
import cardStyles from '../styles/cardStyles'; //
import FloatingMenu from "../components/FloatingMenu";

const SuccessScreen = () => {
    const [formData, setFormData] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchSubmittedData();
                setFormData(data);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <View style={[globalStyles.container, cardStyles.centered]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!formData) {
        return (
            <View style={[globalStyles.container, cardStyles.centered]}>
                <Text>Error cargando datos.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={[globalStyles.container, cardStyles.content]}>
                    <Text style={[globalStyles.title, cardStyles.title]}>
                        ¡Formulario enviado exitosamente!
                    </Text>

                    {Object.entries(formData).map(([key, value]) => (
                        <View key={key} style={cardStyles.card}>
                            <Text style={cardStyles.cardTitle}>{key}</Text>
                            <Text style={cardStyles.cardValue}>{String(value)}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <FloatingMenu />

        </View>
    );
};

export default SuccessScreen;




