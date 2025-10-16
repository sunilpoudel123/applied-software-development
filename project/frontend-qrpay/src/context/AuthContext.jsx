// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is logged in on mount
    useEffect(() => {
        const initAuth = () => {
            try {
                const currentUser = authService.getCurrentUser();
                const authenticated = authService.isAuthenticated();

                if (authenticated && currentUser) {
                    setUser(currentUser);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    // Login function
    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            console.log("#### login requested: ### ")
            setUser(response.user);
            setIsAuthenticated(true);
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message || 'Login failed' };
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            setUser(response.user);
            setIsAuthenticated(true);
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message || 'Registration failed' };
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Update user profile
    const updateProfile = async (profileData) => {
        try {
            const response = await authService.updateProfile(profileData);
            setUser(response.user);
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message || 'Update failed' };
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;