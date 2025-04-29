import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import FloatingMenu from '../components/FloatingMenu';
import HeaderWithLogout from '../components/HeaderWithLogout';
import PlanCard from '../components/PlanCard';
import DaySelector from '../components/DaySelector';
import globalStyles from '../styles/globalStyles';
import styles from '../styles/homeStyles';
import colors from '../styles/colors';
import {getProfile} from "../services/UserService";

const todayIndex = new Date().getDay();

const HomeScreen = ({ navigation }: any) => {
    const { logout } = useAuth();
    const [selectedDay, setSelectedDay] = useState(todayIndex);
    const [firstName, setFirstName] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const handleDaySelect = (dayIndex: number) => {
        setSelectedDay(dayIndex);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setFirstName(data.first_name || ''); // 🔥 dinámico
            } catch (error) {
                console.error('Error al cargar perfil:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={[globalStyles.container, { paddingTop: 50 }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header dinámico */}
                <HeaderWithLogout username={firstName} onLogout={logout} />

                {/* Desafío Diario */}
                <View style={styles.mainCard}>
                    <Text style={styles.cardTitle}>Desafío Diario</Text>
                    <Text style={styles.cardSubtitle}>¡Completa tu desafío antes de las 09:00 AM!</Text>
                    <View style={styles.avatarGroup}>
                        <Image source={{ uri: 'https://i.pravatar.cc/100?img=5' }} style={styles.avatar} />
                        <Image source={{ uri: 'https://i.pravatar.cc/100?img=6' }} style={styles.avatar} />
                        <Image source={{ uri: 'https://i.pravatar.cc/100?img=7' }} style={styles.avatar} />
                        <View style={styles.avatarExtra}>
                            <Text style={styles.avatarExtraText}>+4</Text>
                        </View>
                    </View>
                </View>

                {/* Días */}
                <DaySelector selectedDay={selectedDay} onSelect={handleDaySelect} />

                {/* Tu Plan */}
                <View style={styles.planContainer}>
                    <Text style={styles.sectionTitle}>Tu plan</Text>

                    <View style={styles.planCards}>
                        <PlanCard
                            level="Datos"
                            title="Historia Clínica"
                            subtitle1="25 Nov. 14:00"
                            subtitle2="Sala A5"
                            backgroundColor={colors.error}
                            onPress={() => navigation.navigate('Step', {
                                title: 'Mis Datos',
                                stepIndex: 0,
                                fields: [],
                            })}
                        />
                        <PlanCard
                            level="Datos"
                            title="Progreso"
                            subtitle1="28 Nov. 18:00"
                            subtitle2="Sala A2"
                            backgroundColor={colors.secondary}
                            onPress={() => navigation.navigate('Progress')}
                        />
                    </View>

                    <View style={styles.planCards}>
                        <PlanCard
                            level="Plan"
                            title="Comidas"
                            subtitle1="29 Nov. 08:00"
                            subtitle2="Sala B1"
                            backgroundColor={colors.secondary}
                            onPress={() => console.log('Ir a Comidas')}
                        />
                        <PlanCard
                            level="Plan"
                            title="Recetas"
                            subtitle1="30 Nov. 10:00"
                            subtitle2="Sala C3"
                            backgroundColor={colors.error}
                            onPress={() => console.log('Ir a Recetas')}
                        />
                    </View>
                </View>
            </ScrollView>

            <FloatingMenu />
        </View>
    );
};

export default HomeScreen;
