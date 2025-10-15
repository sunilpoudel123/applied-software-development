// src/services/api.js
import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            // Handle specific status codes
            switch (error.response.status) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                    break;
                case 403:
                    console.error('Access forbidden');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error('API Error:', error.response.data);
            }
            return Promise.reject(error.response.data);
        } else if (error.request) {
            console.error('Network error - no response received');
            return Promise.reject({ message: 'Network error. Please check your connection.' });
        } else {
            console.error('Error:', error.message);
            return Promise.reject({ message: error.message });
        }
    }
);

// API endpoints
export const endpoints = {
    // Auth
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh',

    // User
    userProfile: '/user/profile',
    updateProfile: '/user/profile',

    // Payments
    payments: '/payments',
    paymentById: (id) => `/payments/${id}`,
    createPayment: '/payments/create',
    verifyPayment: '/payments/verify',

    // QR Code
    generateQR: '/qr/generate',
    scanQR: '/qr/scan',
    validateQR: '/qr/validate',

    // Dashboard
    dashboardStats: '/dashboard/stats',
    recentTransactions: '/dashboard/transactions/recent',
    paymentAnalytics: '/dashboard/analytics',

    // Transactions
    transactions: '/transactions',
    transactionById: (id) => `/transactions/${id}`,
    transactionHistory: '/transactions/history',
};

export default api;