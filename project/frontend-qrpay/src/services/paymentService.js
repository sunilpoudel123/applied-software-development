// src/services/paymentService.js
import api, { endpoints } from './api';

const paymentService = {
    // Get all payments with filters
    getPayments: async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters).toString();
            const url = params ? `${endpoints.payments}?${params}` : endpoints.payments;
            return await api.get(url);
        } catch (error) {
            throw error;
        }
    },

    // Get payment by ID
    getPaymentById: async (id) => {
        try {
            return await api.get(endpoints.paymentById(id));
        } catch (error) {
            throw error;
        }
    },

    // Create new payment
    createPayment: async (paymentData) => {
        try {
            return await api.post(endpoints.createPayment, paymentData);
        } catch (error) {
            throw error;
        }
    },

    // Verify payment
    verifyPayment: async (paymentId, verificationData) => {
        try {
            return await api.post(endpoints.verifyPayment, {
                paymentId,
                ...verificationData,
            });
        } catch (error) {
            throw error;
        }
    },

    // Get transaction history
    getTransactionHistory: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams(params).toString();
            const url = queryParams
                ? `${endpoints.transactionHistory}?${queryParams}`
                : endpoints.transactionHistory;
            return await api.get(url);
        } catch (error) {
            throw error;
        }
    },

    // Get transaction by ID
    getTransactionById: async (id) => {
        try {
            return await api.get(endpoints.transactionById(id));
        } catch (error) {
            throw error;
        }
    },

    // Get dashboard statistics
    getDashboardStats: async () => {
        try {
            return await api.get(endpoints.dashboardStats);
        } catch (error) {
            throw error;
        }
    },

    // Get recent transactions
    getRecentTransactions: async (limit = 10) => {
        try {
            return await api.get(`${endpoints.recentTransactions}?limit=${limit}`);
        } catch (error) {
            throw error;
        }
    },

    // Get payment analytics
    getPaymentAnalytics: async (period = '30d') => {
        try {
            return await api.get(`${endpoints.paymentAnalytics}?period=${period}`);
        } catch (error) {
            throw error;
        }
    },
};

export default paymentService;