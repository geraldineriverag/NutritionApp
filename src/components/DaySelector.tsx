import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/homeStyles';

interface Props {
    selectedDay: number;
    onSelect: (dayIndex: number) => void;
}

const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const DaySelector: React.FC<Props> = ({ selectedDay, onSelect }) => {
    const today = new Date();
    const todayDayIndex = today.getDay(); // 0 (Domingo) a 6 (Sábado)

    const generateDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const diff = i - todayDayIndex;
            const date = new Date(today);
            date.setDate(today.getDate() + diff); // Ajustamos el día
            dates.push(date);
        }
        return dates;
    };

    const dates = generateDates(); // ahora tenemos la fecha real de cada día de la semana

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysContainer}>
            {days.map((day, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.dayButton, selectedDay === index && styles.daySelected]}
                    onPress={() => onSelect(index)}
                >
                    <Text style={[styles.dayText, selectedDay === index && styles.dayTextSelected]}>{day}</Text>
                    <Text style={[styles.dayNumber, selectedDay === index && styles.dayTextSelected]}>
                        {dates[index].getDate()}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default DaySelector;
