import { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { fetchSubmittedData } from '../services/WizardService'; // función que ahora vamos a crear
import globalStyles from '../styles/globalStyles';

const SuccessScreen = () => {
    const [formData, setFormData] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchSubmittedData(); // hacemos GET de lo enviado
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
        return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }

    if (!formData) {
        return (
            <View style={globalStyles.container}>
                <Text>Error cargando datos.</Text>
            </View>
        );
    }

    //Revisar ScrollView, hay una opción que es para listas y permite un mejor renderizado.
    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <Text style={globalStyles.title}>¡Formulario enviado exitosamente!</Text>
            {Object.entries(formData).map(([key, value]) => (
                <View key={key} style={{ marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>{key}:</Text>
                    <Text>{String(value)}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

export default SuccessScreen;
