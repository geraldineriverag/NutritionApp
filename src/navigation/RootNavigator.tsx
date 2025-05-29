import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator            from './AuthNavigator';
import PatientNavigator             from './PatientNavigator';
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
                    : <PatientNavigator />
            }
        </NavigationContainer>
    );
};

export default RootNavigator;




