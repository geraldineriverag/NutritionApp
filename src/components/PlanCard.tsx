import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from "../styles/homeStyles";

interface Props {
    level: string;
    title: string;
    subtitle1: string;
    subtitle2: string;
    backgroundColor: string;
    onPress: () => void;
}

const PlanCard: React.FC<Props> = ({ level, title, subtitle1, subtitle2, backgroundColor, onPress }) => {
    return (
        <TouchableOpacity style={[styles.planCard, { backgroundColor }]} onPress={onPress}>
            <Text style={styles.planCardLevel}>{level}</Text>
            <Text style={styles.planCardTitle}>{title}</Text>
            <Text style={styles.planCardDetail}>{subtitle1}</Text>
            <Text style={styles.planCardDetail}>{subtitle2}</Text>
        </TouchableOpacity>
    );
};

export default PlanCard;
