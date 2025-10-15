// src/services/qrService.js
import api, { endpoints } from './api';

const qrService = {
    // Generate QR code for payment
    generateQRCode: async (paymentData) => {
        try {
            const response = await api.post(endpoints.generateQR, {
                amount: paymentData.amount,
                currency: paymentData.currency || 'USD',
                description: paymentData.description,
                merchantId: paymentData.merchantId,
                expiresIn: paymentData.expiresIn || 300, // 5 minutes default
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Scan and process QR code
    scanQRCode: async (qrData) => {
        try {
            return await api.post(endpoints.scanQR, { qrData });
        } catch (error) {
            throw error;
        }
    },

    // Validate QR code
    validateQRCode: async (qrCode) => {
        try {
            return await api.post(endpoints.validateQR, { qrCode });
        } catch (error) {
            throw error;
        }
    },
};

export default qrService;