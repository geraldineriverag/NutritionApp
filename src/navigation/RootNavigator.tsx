// navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator            from './AuthNavigator';
import AppNavigator             from './AppNavigator';
import NutritionistNavigator    from './NutritionistNavigator';
import { useAuth }              from '../context/AuthContext';

const RootNavigator = () => {
    const { isAuthenticated, role } = useAuth();

    return (
        <NavigationContainer>
            { !isAuthenticated
                ? <AuthNavigator />
                : role === 'nutricionista'
                    ? <NutritionistNavigator />
                    : <AppNavigator />
            }
        </NavigationContainer>
    );
};

export default RootNavigator;




