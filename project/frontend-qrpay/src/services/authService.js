// src/services/authService.js
import api, { endpoints } from './api';

const authService = {
    // Login user
    login: async (credentials) => {
        try {
            const response = await api.post(endpoints.login, credentials);
            if (response.token) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Register new user
    register: async (userData) => {
        try {
            const response = await api.post(endpoints.register, userData);
            if (response.token) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Logout user
    logout: async () => {
        try {
            await api.post(endpoints.logout);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = '/';
        }
    },

    // Get current user
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },

    // Get user profile
    getProfile: async () => {
        try {
            const response = await api.get(endpoints.userProfile);
            localStorage.setItem('user', JSON.stringify(response.user));
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Update user profile
    updateProfile: async (profileData) => {
        try {
            const response = await api.put(endpoints.updateProfile, profileData);
            localStorage.setItem('user', JSON.stringify(response.user));
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default authService;