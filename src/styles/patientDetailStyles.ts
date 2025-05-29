import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    iconButton: {
        backgroundColor: colors.primary,
        borderRadius: 40,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
    },
    iconLabel: {
        marginTop: 4,
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
    },
    value: {
        fontSize: 14,
        color: colors.text,
    },
});
