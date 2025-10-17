// src/services/api.js
import axios from 'axios';

// Base API URL - change this to your backend URL
const BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
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
apiClient.interceptors.response.use(
    (response) => {
        // Return just the data from successful responses
        return response.data;
    },
    (error) => {
        // Handle different error scenarios
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    // Unauthorized - clear auth data and redirect to login
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    break;
                case 403:
                    // Forbidden - user doesn't have permission
                    console.error('Access forbidden');
                    break;
                case 404:
                    // Not found
                    console.error('Resource not found');
                    break;
                case 500:
                    // Server error
                    console.error('Server error occurred');
                    break;
                default:
                    console.error('An error occurred:', data?.message || error.message);
            }

            // Return error message from server or default message
            return Promise.reject({
                message: data?.message || `Error: ${status}`,
                status,
                data,
            });
        } else if (error.request) {
            // Request made but no response received
            return Promise.reject({
                message: 'No response from server. Please check your connection.',
                status: 0,
            });
        } else {
            // Something else happened
            return Promise.reject({
                message: error.message || 'An unexpected error occurred',
                status: 0,
            });
        }
    }
);

// API endpoints object
export const endpoints = {
    // Auth endpoints
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh',

    // User endpoints
    userProfile: '/auth/users/profile',
    updateProfile: '/auth/users/profile',
    changePassword: '/auth/users/change-password',

    // Dashboard endpoints
    dashboardStats: '/dashboard/stats',
    recentTransactions: '/dashboard/transactions/recent',
    revenueData: '/dashboard/revenue',

    // Transaction endpoints
    transactions: '/transactions',
    transactionById: (id) => `/transactions/${id}`,

    // QR Code endpoints
    generateQR: '/qr/generate',
    scanQR: '/qr/scan',
    qrHistory: '/qr/history',

    // Payment endpoints
    createPayment: '/payments/create',
    paymentHistory: '/payments/history',
    paymentById: (id) => `/payments/${id}`,
};

// API methods
const api = {
    // GET request
    get: async (endpoint, config = {}) => {
        try {
            return await apiClient.get(endpoint, config);
        } catch (error) {
            throw error;
        }
    },

    // POST request
    post: async (endpoint, data = {}, config = {}) => {
        try {
            return await apiClient.post(endpoint, data, config);
        } catch (error) {
            throw error;
        }
    },

    // PUT request
    put: async (endpoint, data = {}, config = {}) => {
        try {
            return await apiClient.put(endpoint, data, config);
        } catch (error) {
            throw error;
        }
    },

    // PATCH request
    patch: async (endpoint, data = {}, config = {}) => {
        try {
            return await apiClient.patch(endpoint, data, config);
        } catch (error) {
            throw error;
        }
    },

    // DELETE request
    delete: async (endpoint, config = {}) => {
        try {
            return await apiClient.delete(endpoint, config);
        } catch (error) {
            throw error;
        }
    },

    // Upload file
    upload: async (endpoint, formData, onUploadProgress) => {
        try {
            return await apiClient.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress,
            });
        } catch (error) {
            throw error;
        }
    },

    // Download file
    download: async (endpoint, filename) => {
        try {
            const response = await apiClient.get(endpoint, {
                responseType: 'blob',
            });

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();

            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default api;