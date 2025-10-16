import React, { useState } from 'react';
import '../styles/globals.css';
import { QrCode, Zap, Shield, TrendingUp, Menu, X, ArrowRight, CheckCircle, Smartphone, CreditCard } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Homepage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <QrCode className="w-8 h-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">QRPay</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">How It Works</a>
                            <Link to="/login" className="px-4 py-2 text-blue-600 hover:text-blue-700 transition">
                                Sign In
                            </Link>
                            <a href="/register" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Get Started
                            </a>
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
                            <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600">How It Works</a>
                            <a href="/login" className="block w-full text-left text-blue-600">Sign In</a>
                            <a href="/register" className="block w-full px-6 py-2 bg-blue-600 text-white rounded-lg">Get Started</a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                Instant Payments Made Simple
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Accept Payments with <span className="text-blue-600">QR Codes</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Fast, secure, and contactless payments for modern businesses. Set up in minutes and start accepting payments today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="/register" className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2 text-lg font-semibold">
                                    <span>Start Free</span>
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                            <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>No credit card required</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                                <div className="bg-white rounded-xl p-6 space-y-4">
                                    <div className="flex justify-center">
                                        <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <QrCode className="w-32 h-32 text-gray-800" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-gray-900">$125.00</p>
                                        <p className="text-gray-600">Scan to pay</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <div className="flex-1 h-2 bg-green-500 rounded"></div>
                                        <div className="flex-1 h-2 bg-green-500 rounded"></div>
                                        <div className="flex-1 h-2 bg-green-500 rounded"></div>
                                        <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600">Get started in three simple steps</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Create Account</h3>
                            <p className="text-gray-600">Sign up in minutes and complete your business verification.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Generate QR Code</h3>
                            <p className="text-gray-600">Create custom QR codes for your products or services instantly.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Accept Payments</h3>
                            <p className="text-gray-600">Customers scan and pay securely in seconds.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4">

                <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p>&copy; 2025 QRPay. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}