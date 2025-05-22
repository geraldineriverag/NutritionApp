import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Alert,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchAppointments, Appointment } from '../../services/AppointmentService';
import globalStyles from '../../styles/globalStyles';
import cardStyles from '../../styles/cardStyles';
import ButtonApp from '../../components/ButtonApp';

const AppointmentListScreen: React.FC = () => {
    const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
    const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    // filtros
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();

    // control de DatePickers
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    // carga inicial
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const list = await fetchAppointments();
                setAllAppointments(list);
                setFilteredAppointments(list);
            } catch (e) {
                console.error(e);
                Alert.alert('Error', 'No se pudieron cargar las citas.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // re-filtra cada vez que cambian startDate, endDate o todas las citas
    useEffect(() => {
        const filtered = allAppointments.filter(item => {
            const t = new Date(item.scheduled_for).getTime();
            if (startDate && t < startDate.getTime()) return false;
            if (endDate && t > endDate.getTime()) return false;
            return true;
        });
        setFilteredAppointments(filtered);
    }, [allAppointments, startDate, endDate]);

    if (loading) {
        return (
            <View style={[globalStyles.container, cardStyles.centered]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            {/* Filtros en columna */}
            <View>
                <View>
                    <ButtonApp
                        title={
                            startDate
                                ? `Desde: ${startDate.toLocaleDateString()}`
                                : 'Seleccionar inicio'
                        }
                        onPress={() => setShowStart(true)}
                    />
                    {showStart && (
                        <DateTimePicker
                            value={startDate || new Date()}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(_, date) => {
                                setShowStart(false);
                                if (date) {
                                    date.setHours(0, 0, 0, 0);
                                    setStartDate(date);
                                }
                            }}
                        />
                    )}
                </View>

                <View>
                    <ButtonApp
                        title={
                            endDate
                                ? `Hasta: ${endDate.toLocaleDateString()}`
                                : 'Seleccionar fin'
                        }
                        onPress={() => setShowEnd(true)}
                    />
                    {showEnd && (
                        <DateTimePicker
                            value={endDate || new Date()}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(_, date) => {
                                setShowEnd(false);
                                if (date) {
                                    date.setHours(23, 59, 59, 999);
                                    setEndDate(date);
                                }
                            }}
                        />
                    )}
                </View>
            </View>

            {/* Lista filtrada */}
            <FlatList
                data={filteredAppointments}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={cardStyles.card}>
                        <Text style={cardStyles.cardTitle}>
                            {item.patient_name} {item.patient_last_name}
                        </Text>
                        <Text style={cardStyles.cardValue}>
                            {new Date(item.scheduled_for).toLocaleString()}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

export default AppointmentListScreen;
