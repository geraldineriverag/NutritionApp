// src/styles/globalStyles.ts
import { StyleSheet } from 'react-native';
import colors from './colors'; // asegúrate de que el path sea correcto

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Montserrat_700Bold',
        textAlign: 'center',
        marginBottom: 30,
        color: colors.text,
    },
    subtitle: {
        fontSize: 18,
        color: colors.text,
        marginBottom: 20,
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
