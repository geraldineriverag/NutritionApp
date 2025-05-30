// src/components/RangeFilter.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonApp from './ButtonApp';

interface RangeFilterProps {
    title?: string;
    startDate: string | null;
    endDate: string | null;
    onChangeStartDate: (iso: string) => void;
    onChangeEndDate: (iso: string) => void;
    onApply: () => void;
    onClear: () => void;
    showSummary?: boolean;
}

const RangeFilter: React.FC<RangeFilterProps> = ({
                                                     title = 'Filtrar por fecha',
                                                     startDate,
                                                     endDate,
                                                     onChangeStartDate,
                                                     onChangeEndDate,
                                                     onApply,
                                                     onClear,
                                                     showSummary = false,
                                                 }) => {
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}

            <View style={styles.buttonContainer}>
                <ButtonApp
                    title={startDate ? `Desde: ${new Date(startDate).toLocaleDateString()}` : 'Seleccionar desde'}
                    onPress={() => setShowStart(true)}
                />
                {showStart && (
                    <DateTimePicker
                        value={startDate ? new Date(startDate) : new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(_, date) => {
                            setShowStart(false);
                            if (date) {
                                // fijamos horas al inicio del día
                                date.setHours(0, 0, 0, 0);
                                onChangeStartDate(date.toISOString());
                            }
                        }}
                    />
                )}
            </View>

            <View style={styles.buttonContainer}>
                <ButtonApp
                    title={endDate ? `Hasta: ${new Date(endDate).toLocaleDateString()}` : 'Seleccionar hasta'}
                    onPress={() => setShowEnd(true)}
                />
                {showEnd && (
                    <DateTimePicker
                        value={endDate ? new Date(endDate) : new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(_, date) => {
                            setShowEnd(false);
                            if (date) {
                                // fijamos horas al final del día
                                date.setHours(23, 59, 59, 999);
                                onChangeEndDate(date.toISOString());
                            }
                        }}
                    />
                )}
            </View>

            <View style={styles.actions}>
                <ButtonApp title="Aplicar" onPress={onApply} />
                <ButtonApp title="Limpiar" onPress={onClear} isSecondary />
            </View>

            {showSummary && startDate && endDate && (
                <Text style={styles.summary}>
                    {`Mostrando de ${new Date(startDate).toLocaleDateString()} a ${new Date(endDate).toLocaleDateString()}`}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 8,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    summary: {
        marginTop: 8,
        fontStyle: 'italic',
        textAlign: 'center',
        color: '#555',
    },
});

export default RangeFilter;
