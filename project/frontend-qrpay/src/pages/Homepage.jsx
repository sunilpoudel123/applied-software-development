import React, { useState } from 'react';
import { QrCode, Zap, Shield, Menu, X, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

export default function Homepage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Navbar */}
            <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <QrCode className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">QRPay</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Get Started
                            </Link>
                        </div>

                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-4 py-4 space-y-3">
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                                Sign In
                            </button>
                            <Link
                                to="/register"
                                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold">
                                <Sparkles className="w-4 h-4" />
                                Instant Payments Made Simple
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Accept Payments with{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    QR Codes
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Fast, secure, and contactless payments for modern businesses. Set up in minutes and start accepting payments today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/register"
                                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-lg
             bg-gradient-to-r from-blue-600 to-purple-600
             hover:from-blue-700 hover:to-purple-700
             transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
                                >
                                    <span>Get Started Free</span>
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Link>

                            </div>
                            <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>No credit card required</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Setup in 2 minutes</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl">
                                <div className="bg-white rounded-2xl p-8 space-y-6">
                                    <div className="flex justify-center">
                                        <div className="w-56 h-56 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-inner">
                                            <QrCode className="w-40 h-40 text-gray-800" />
                                        </div>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <p className="text-3xl font-bold text-gray-900">$125.00</p>
                                        <p className="text-gray-500 font-medium">Scan to pay instantly</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <div className="flex-1 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                                        <div className="flex-1 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                                        <div className="flex-1 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose QRPay?</h2>
                        <p className="text-xl text-gray-600">Everything you need to accept payments seamlessly</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Zap className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                            <p className="text-gray-600">Payments process in seconds. No delays, no hassle, just instant transactions.</p>
                        </div>

                        <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Shield className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Bank-Level Security</h3>
                            <p className="text-gray-600">Your transactions are protected with end-to-end encryption and fraud detection.</p>
                        </div>

                        <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <QrCode className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Integration</h3>
                            <p className="text-gray-600">Generate QR codes instantly. Print, display, or share them anywhere.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Payments?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of businesses already using QRPay
                    </p>
                    <Link
                        to="/register"
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <QrCode className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">QRPay</span>
                    </div>
                    <p className="text-gray-400">&copy; 2025 QRPay. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}