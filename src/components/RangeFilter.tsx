import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import ButtonApp from "./ButtonApp";
import globalStyles from "../styles/globalStyles";
import cardStyles from "../styles/cardStyles";

interface Props {
    startDate: string | null;
    endDate: string | null;
    onChangeStartDate: (text: string) => void;
    onChangeEndDate: (text: string) => void;
    onApply: () => void;
    onClear: () => void;
    title?: string;
    showSummary?: boolean;
}

const RangeFilter: React.FC<Props> = ({
                                              startDate,
                                              endDate,
                                              onChangeStartDate,
                                              onChangeEndDate,
                                              onApply,
                                              onClear,
                                              title = 'Filtrar por fecha',
                                              showSummary = true,
                                          }) => {
    const isActive = startDate || endDate;

    return (
        <View style={styles.container}>
            <Text style={globalStyles.subtitle}>{title}</Text>

            <View style={styles.inputRow}>
                <TextInput
                    placeholder="Desde (YYYY-MM-DD)"
                    style={[cardStyles.input, styles.input]}
                    value={startDate || ''}
                    onChangeText={onChangeStartDate}
                />
                <TextInput
                    placeholder="Hasta (YYYY-MM-DD)"
                    style={[cardStyles.input, styles.input]}
                    value={endDate || ''}
                    onChangeText={onChangeEndDate}
                />
            </View>

            <ButtonApp title="Aplicar Filtro" onPress={onApply} />

            {isActive && showSummary && (
                <>
                    <Text style={styles.rangeText}>
                        Mostrando desde <Text style={styles.rangeHighlight}>{startDate || '...'}</Text> hasta <Text style={styles.rangeHighlight}>{endDate || '...'}</Text>
                    </Text>
                    <ButtonApp title="Limpiar Filtro" onPress={onClear} isSecondary />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    inputRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        textAlign: 'center',
    },
    rangeText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#555',
        marginTop: 8,
        marginBottom: 4,
    },
    rangeHighlight: {
        fontWeight: 'bold',
    },
});

export default RangeFilter;
