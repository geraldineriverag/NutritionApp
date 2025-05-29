import { StyleSheet } from 'react-native';
import colors from './colors';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Montserrat_700Bold',
        textAlign: 'center',
        marginBottom: 15,
        color: colors.text,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Montserrat_700Bold',
        textAlign: 'center',
        color: colors.text,
        marginBottom: 15,
    },
    text: {
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        textAlign: 'center',
        color: colors.text,
        marginBottom: 15,
    },
    link: {
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        textAlign: 'center',
        color: colors.primary,
        marginTop: 15,
    },
    cardContainer: {
        backgroundColor: colors.background,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 14,
        color: colors.text,
    },
    cardSubtitle: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 4,
    },
    buttonEditText: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: colors.background,
        borderRadius: 20,
        padding: 20,
        width: '80%',
    },
    modalTitle: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: colors.text,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.textSecondary,
        borderRadius: 12,
        padding: 10,
        marginBottom: 20,
        fontFamily: 'Montserrat_400Regular',
        color: colors.text,
    },
    listContent: {
        paddingBottom: 30,
    },
});

export default globalStyles;
