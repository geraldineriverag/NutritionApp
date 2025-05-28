// src/screens/PatientScreens/NutritionistProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import globalStyles from '../../styles/globalStyles';
import cardStyles from '../../styles/cardStyles';
import { AppStackParamList } from '../../navigation/PatientNavigator';
import { getNutritionistById, NutritionistProfile } from '../../services/NutritionistService';

type Props = NativeStackScreenProps<AppStackParamList, 'NutritionistProfile'>;

const fieldsMap: Array<keyof NutritionistProfile> = [
    'bio',
    'education',
    'specialties',
    'years_of_experience',
    'languages',
    'accepts_new_patients',
    'max_patients',
    'session_duration_minutes',
    'website',
];

const NutritionistProfileScreen: React.FC<Props> = ({ route }) => {
    const { id } = route.params;
    const [profile, setProfile] = useState<NutritionistProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await getNutritionistById(id);
                setProfile(data);
            } catch (e) {
                console.error(e);
                Alert.alert('Error', 'No se pudo cargar el perfil del nutricionista.');
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading || !profile) {
        return (
            <View style={[globalStyles.container, cardStyles.centered]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>
                {profile.user.first_name} {profile.user.last_name}
            </Text>
            <FlatList
                data={fieldsMap}
                keyExtractor={(key) => key}
                renderItem={({ item: key }) => (
                    <View style={cardStyles.card}>
                        <Text style={cardStyles.cardTitle}>
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Text>
                        <Text style={cardStyles.cardValue}>
                            {String(profile[key])}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

export default NutritionistProfileScreen;
