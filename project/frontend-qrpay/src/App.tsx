import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { QrCode, DollarSign, CheckCircle } from 'lucide-react';

function App() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                            <QrCode className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome to QR Payment System
                        </h1>
                        <p className="text-gray-600">Fast, secure, and easy payments</p>
                    </div>
                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <p className="text-xs text-gray-500">
                            Secure payment processing • Instant transfers
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App;