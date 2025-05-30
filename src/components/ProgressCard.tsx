import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import cardStyles from '../styles/cardStyles';

interface ProgressItem {
    record_date: string;
    weight: number;
    waist_circumference: number;
    hip_circumference: number;
    bmi?: number;
    body_fat_percentage?: number;
    muscle_mass?: number;
}

interface Props {
    item: ProgressItem;
}

const ProgressCard = ({ item }: Props) => {
    const navigation = useNavigation<any>();

    const handlePress = () => {
        navigation.navigate('ProgressDetail', { progress: item });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={cardStyles.card}>
            <Text style={cardStyles.cardTitle}>Fecha: {item.record_date.split('T')[0]}</Text>
            <Text style={cardStyles.cardValue}>Peso: {item.weight} kg</Text>
            <Text style={cardStyles.cardValue}>Cintura: {item.waist_circumference} cm</Text>
        </TouchableOpacity>
    );
};

export default ProgressCard;
