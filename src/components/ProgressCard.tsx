import React from 'react';
import { View, Text } from 'react-native';
import cardStyles from '../styles/cardStyles';

interface ProgressItem {
    record_date: string;
    weight: number;
    waist_circumference: number;
    hip_circumference: number;
}

interface Props {
    item: ProgressItem;
}

const ProgressCard = ({ item }: Props) => {
    return (
        <View style={cardStyles.card}>
            <Text style={cardStyles.cardTitle}>Fecha: {item.record_date.split('T')[0]}</Text>
            <Text style={cardStyles.cardValue}>Peso: {item.weight} kg</Text>
            <Text style={cardStyles.cardValue}>Cintura: {item.waist_circumference} cm</Text>
            <Text style={cardStyles.cardValue}>Cadera: {item.hip_circumference} cm</Text>
        </View>
    );
};

export default ProgressCard;
