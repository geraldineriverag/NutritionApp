import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Alert,
    StyleSheet,
    Modal,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import ButtonApp from '../../components/ButtonApp';
import { getMyPatients, Patient } from '../../services/PatientService';
import globalStyles from '../../styles/globalStyles';
import cardStyles from '../../styles/cardStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NutritionistStackParamList } from '../../navigation/NutritionistNavigator';
import {createInvitation, Invitation} from "../../services/InvitationService";

type Props = NativeStackScreenProps<NutritionistStackParamList, 'Patients'>;

const PatientsScreen: React.FC<Props> = ({ navigation }) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);

    // Para la modal de invitación
    const [modalVisible, setModalVisible] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const list = await getMyPatients();
                setPatients(list);
            } catch (e) {
                console.error(e);
                Alert.alert('Error', 'No se pudo cargar la lista de pacientes.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleSendInvite = async () => {
        if (!inviteEmail) return;
        setSending(true);
        try {
            const inv: Invitation = await createInvitation(inviteEmail);
            Alert.alert('Invitación enviada', `Token: ${inv.token}`);
            setModalVisible(false);
            setInviteEmail('');
        } catch (e: any) {
            console.error(e);
            Alert.alert('Error', 'No se pudo enviar la invitación.');
        } finally {
            setSending(false);
        }
    };

    const handleCardPress = (p: Patient) => {
        navigation.navigate('PatientDetail', { id: p.id });
    };

    if (loading) {
        return (
            <View style={[globalStyles.container, cardStyles.centered]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            <ButtonApp
                title="Generar invitación"
                onPress={() => setModalVisible(true)}
            />

            {patients.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={globalStyles.text}>Aún no tienes pacientes asignados.</Text>
                </View>
            ) : (
                <FlatList
                    data={patients}
                    keyExtractor={p => p.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleCardPress(item)}>
                            <View style={cardStyles.card}>
                                <Text style={cardStyles.cardTitle}>
                                    {item.user.first_name} {item.user.last_name}
                                </Text>
                                <Text style={cardStyles.cardValue}>{item.user.email}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* Modal para crear invitación */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Nueva Invitación</Text>
                        <TextInput
                            placeholder="Correo del paciente"
                            value={inviteEmail}
                            onChangeText={setInviteEmail}
                            style={cardStyles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <ButtonApp
                            title={sending ? 'Enviando...' : 'Enviar'}
                            onPress={handleSendInvite}
                            isDisabled={sending || !inviteEmail}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
    },
    cancelText: {
        marginTop: 10,
        textAlign: 'center',
        color: 'red',
    },
});

export default PatientsScreen;
