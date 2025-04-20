// App.tsx
import React from 'react';
import { View, Text } from 'react-native';
import useCustomFonts from './src/hooks/useCustomFonts';
import { WizardFormProvider } from './src/context/WizardFormContext';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
    const fontsLoaded = useCustomFonts();

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading fonts...</Text>
            </View>
        );
    }

    return (
        <AuthProvider>
            <WizardFormProvider>
                <RootNavigator /> {/* Aquí debe ir el único NavigationContainer */}
            </WizardFormProvider>
        </AuthProvider>
    );
}
