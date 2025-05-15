import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import globalStyles from '../../styles/globalStyles';
import cardStyles from '../../styles/cardStyles';
import { progressFields } from '../../constants/progressFields';

const ProgressDetailScreen = () => {
    const route = useRoute();
    const { progress } = route.params as { progress: any };

    const formatValue = (value: any) => {
        if (value === null || value === undefined) return '-';
        if (typeof value === 'number') return value.toFixed(2);
        return value;
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Detalle de Progreso</Text>

        <ScrollView>
            {progressFields.map((field) => (
                <View key={field.key} style={cardStyles.card}>
                    <Text style={cardStyles.cardTitle}>{field.label}</Text>
                    <Text style={cardStyles.cardValue}>
                        {field.key === 'record_date'
                            ? progress[field.key]?.split('T')[0] || '-'
                            : formatValue(progress[field.key])}
                    </Text>
                </View>
            ))}
        </ScrollView>
    </View>
    );
};

export default ProgressDetailScreen;
