import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (username: string, email: string, password: string) => Promise<any>;
    onLogin?: (username: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
    onUpdateUser?: (newUsername: string, newPassword: string) => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://127.0.0.1:8000/';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{ token: string | null, authenticated: boolean | null }>({
        token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem(TOKEN_KEY);
                console.log('Loaded token:', token);
                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setAuthState({ token, authenticated: true });
                } else {
                    setAuthState({ token: null, authenticated: false });
                }
            } catch (error) {
                console.error('Error loading token:', error);
            }
        };
        loadToken();
    }, []);

    const register = async (username: string, email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}register/`, { username, email, password });
            console.log(response);
            return response;
        } catch (err) {
            return { error: true, msg: (err as any).response.data.msg };
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}token/`, { username, password });
            setAuthState({
                token: response.data.access,
                authenticated: true,
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            await AsyncStorage.setItem(TOKEN_KEY, response.data.access);
            //Alert.alert("Login successful")
        } 
       
        catch (err) {
            return { error: true, msg: (err as any).response?.data?.msg || 'Login failed' };
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = '';
        setAuthState({
            token: null,
            authenticated: false
        });
        console.log('logged out');
    };

    const updateUser = async (username: string, password: string) => {
        try {
            const response = await axios.put(`${API_URL}api/update/`, { username, password });
            console.log(response);
            return { success: true };
        } catch (error) {
            console.error('Error updating user:', error);
            return { error: true, msg: 'Failed to update user' };
        }
    };

    

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        onUpdateUser: updateUser,
        authState: authState,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
