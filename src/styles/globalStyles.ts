// src/styles/globalStyles.ts
import { StyleSheet } from 'react-native';
import colors from './colors'; // asegúrate de que el path sea correcto

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
});

export default globalStyles;
