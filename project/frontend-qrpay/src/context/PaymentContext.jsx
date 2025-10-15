// src/context/PaymentContext.jsx
import React, { createContext, useState, useContext } from 'react';
import paymentService from '../services/paymentService';
import qrService from '../services/qrService';

const PaymentContext = createContext(null);

export const PaymentProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch dashboard statistics
    const fetchDashboardStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await paymentService.getDashboardStats();
            setStats(data);
            return { success: true, data };
        } catch (err) {
            setError(err.message || 'Failed to fetch statistics');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Fetch transactions
    const fetchTransactions = async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const data = await paymentService.getTransactionHistory(filters);
            setTransactions(data.transactions || data);
            return { success: true, data };
        } catch (err) {
            setError(err.message || 'Failed to fetch transactions');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Get recent transactions
    const fetchRecentTransactions = async (limit = 10) => {
        setLoading(true);
        setError(null);
        try {
            const data = await paymentService.getRecentTransactions(limit);
            return { success: true, data };
        } catch (err) {
            setError(err.message || 'Failed to fetch recent transactions');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Create payment
    const createPayment = async (paymentData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await paymentService.createPayment(paymentData);
            return { success: true, data };
        } catch (err) {
            setError(err.message || 'Failed to create payment');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Generate QR code
    const generateQR = async (paymentData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await qrService.generateQRCode(paymentData);
            return { success: true, data };
        } catch (err) {
            setError(err.message || 'Failed to generate QR code');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Scan QR code
    const scanQR = async (qrData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await qrService.scanQRCode(qrData);
            return { success: true, data };
        } catch (err) {
            setError(err.message || 'Failed to scan QR code');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Verify payment
    const verifyPayment = async (paymentId, verificationData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await paymentService.verifyPayment(paymentId, verificationData);
            return { success: true, data };
        } catch (err) {
            setError(err.message || 'Failed to verify payment');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Get payment analytics
    const fetchAnalytics = async (period = '30d') => {
        setLoading(true);
        setError(null);
        try {
            const data = await paymentService.getPaymentAnalytics(period);
            return { success: true, data };
        } catch (err) {
            setError(err.message || 'Failed to fetch analytics');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const value = {
        transactions,
        stats,
        loading,
        error,
        fetchDashboardStats,
        fetchTransactions,
        fetchRecentTransactions,
        createPayment,
        generateQR,
        scanQR,
        verifyPayment,
        fetchAnalytics,
    };

    return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};

// Custom hook to use payment context
export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error('usePayment must be used within a PaymentProvider');
    }
    return context;
};

export default PaymentContext;