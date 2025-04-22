import { StyleSheet } from 'react-native';

const menuStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0, // Aseguramos que se estire de lado a lado
        flexDirection: 'row', // 'row' para que los botones estén en fila
        justifyContent: 'center', // Centrado de los botones en el eje horizontal
        gap: 20, // Espacio entre los botones
    },
    button: {
        backgroundColor: '#007bff',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});

export default menuStyles;
