import React from 'react';
import { View, Text } from 'react-native';
import FloatingMenu from "../components/FloatingMenu";

const SettingsScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings Screen</Text>
            <FloatingMenu/>
        </View>
    );
};

export default SettingsScreen;
