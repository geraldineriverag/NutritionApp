import { StyleSheet } from 'react-native';
import colors from '../styles/colors';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    greeting: {
        fontSize: 22,
        fontFamily: 'Montserrat_700Bold',
        color: colors.text,
    },
    date: {
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        color: colors.text,
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 30,
    },
    mainCard: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontFamily: 'Montserrat_700Bold',
        color: '#fff',
    },
    cardSubtitle: {
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        color: '#fff',
        marginTop: 5,
    },
    avatarGroup: {
        flexDirection: 'row',
        marginTop: 15,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: -8,
        borderWidth: 2,
        borderColor: '#fff',
    },
    avatarExtra: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    avatarExtraText: {
        fontSize: 12,
        fontFamily: 'Montserrat_700Bold',
        color: colors.primary,
    },
    daysContainer: {
        marginVertical: 10,
        height: 80, // un poco más, pero muy controlado
        paddingVertical: 10, // agrega padding interno para que los botones respiren
    },
    dayButton: {
        alignItems: 'center',
        justifyContent: 'center', // 👈 ¡Esto es lo que te falta!
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        borderRadius: 10,
        minWidth: 60,
        height: 60, // 👈 altura fija a cada botón
    },
    daySelected: {
        backgroundColor: colors.primary,
    },
    dayText: {
        fontSize: 12,
        fontFamily: 'Montserrat_400Regular',
        color: colors.text,
    },
    dayNumber: {
        fontSize: 16,
        fontFamily: 'Montserrat_700Bold',
        color: colors.text,
    },
    dayTextSelected: {
        color: '#fff',
    },
    planContainer: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat_700Bold',
        color: colors.text,
        marginBottom: 10,
    },
    planCards: {
        flexDirection: 'row',
        gap: 10,
    },
    planCard: {
        flex: 1,
        padding: 15,
        borderRadius: 15,
        marginBottom: 10
    },
    planCardLevel: {
        fontSize: 12,
        fontFamily: 'Montserrat_700Bold',
        marginBottom: 5,
        color: colors.text,
    },
    planCardTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat_700Bold',
        color: colors.text,
        marginBottom: 5,
    },
    planCardDetail: {
        fontSize: 12,
        fontFamily: 'Montserrat_400Regular',
        color: colors.text,
    },
    logoutIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3, // sombra en Android
        shadowColor: "#000", // sombra en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

});

export default styles;
