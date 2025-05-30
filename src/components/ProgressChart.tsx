import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import globalStyles from '../styles/globalStyles';

const screenWidth = Dimensions.get('window').width;

interface ProgressItem {
    record_date: string;
    weight: number;
}

interface Props {
    progressData: ProgressItem[];
}

const ProgressChart = ({ progressData }: Props) => {
    if (progressData.length === 0) return null;

    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={globalStyles.subtitle}>Evolución del Peso</Text>
            <LineChart
                data={{
                    labels: progressData.map((p) => p.record_date.split('T')[0]),
                    datasets: [{ data: progressData.map((p) => p.weight || 0), strokeWidth: 2 }],
                }}
                width={screenWidth - 40}
                height={220}
                yAxisLabel="kg "
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { borderRadius: 16 },
                }}
                style={{ marginVertical: 8, borderRadius: 16 }}
            />
        </View>
    );
};

export default ProgressChart;
