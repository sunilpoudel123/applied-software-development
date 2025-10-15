import React from 'react';
import { Home, ArrowLeft, Search, QrCode } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="text-9xl font-bold text-blue-600 opacity-20">404</div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <QrCode className="w-32 h-32 text-blue-600" />
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Page Not Found
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition flex items-center space-x-2 font-semibold"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Go Back</span>
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 font-semibold"
                    >
                        <Home className="w-5 h-5" />
                        <span>Back to Homepage</span>
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Looking for something specific?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                        <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-600 transition cursor-pointer">
                            <h3 className="font-semibold text-gray-900 mb-2">Dashboard</h3>
                            <p className="text-sm text-gray-600">View your payment analytics and stats</p>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-600 transition cursor-pointer">
                            <h3 className="font-semibold text-gray-900 mb-2">Transactions</h3>
                            <p className="text-sm text-gray-600">See your transaction history</p>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-600 transition cursor-pointer">
                            <h3 className="font-semibold text-gray-900 mb-2">QR Scanner</h3>
                            <p className="text-sm text-gray-600">Generate or scan QR codes</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <p className="text-sm text-gray-500">
                        Need help? Contact our{' '}
                        <button className="text-blue-600 hover:text-blue-700 font-semibold">
                            support team
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}