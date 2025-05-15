// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    isAuthenticated: boolean;
    role: string | null;
    login: (
        access: string,
        refresh: string,
        role: string
    ) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                          children,
                                                                      }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    // Al arrancar, comprobamos si hay tokens y rol guardados
    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('access_token');
            const storedRole = await AsyncStorage.getItem('user_role');
            if (token && storedRole) {
                setIsAuthenticated(true);
                setRole(storedRole);
            }
        })();
    }, []);

    const login = async (
        access: string,
        refresh: string,
        userRole: string
    ) => {
        // Guardamos access, refresh y rol
        await AsyncStorage.setItem('access_token', access);
        await AsyncStorage.setItem('refresh_token', refresh);
        await AsyncStorage.setItem('user_role', userRole);

        setIsAuthenticated(true);
        setRole(userRole);
    };

    const logout = async () => {
        await AsyncStorage.multiRemove([
            'access_token',
            'refresh_token',
            'user_role',
        ]);
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, role, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return ctx;
};
