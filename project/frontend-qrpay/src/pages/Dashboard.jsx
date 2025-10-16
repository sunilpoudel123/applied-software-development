// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { QrCode, LogOut, User, Mail, Calendar, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api, { endpoints } from '../services/api';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await api.get(endpoints.userProfile);
            setProfile(data.user || data);
        } catch (err) {
            console.error('Profile fetch error:', err);
            setError('Failed to load profile data');
            // Use basic user data from auth context as fallback
            setProfile(user);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <QrCode className="w-8 h-8 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-900">QRPay</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center p-6" style={{ minHeight: 'calc(100vh - 88px)' }}>
                <div className="w-full max-w-2xl">
                    {/* Welcome Section */}
                    <div className="text-center mb-8">
                        <div className="mb-6">
                            <QrCode className="w-20 h-20 text-blue-600 mx-auto mb-4" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Hello, {profile?.username || user?.username || 'Admin'}!
                        </h1>
                        <p className="text-xl text-gray-600">
                            Welcome to QRPay Dashboard
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Login successful ✓
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-yellow-800">Profile Load Error</p>
                                <p className="text-sm text-yellow-700">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Profile Card */}
                    {loading ? (
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="flex items-center justify-center">
                                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                <span className="ml-3 text-gray-600">Loading profile...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

                            <div className="space-y-4">
                                {/* Username */}
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <User className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Username</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {profile?.username || 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                {profile?.email && (
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {profile.email}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* User ID */}
                                {profile?.userId && (
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <span className="text-lg font-bold text-purple-600">ID</span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">User ID</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {profile.userId}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Created At */}
                                {profile?.createdAt && (
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <Calendar className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Member Since</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {new Date(profile.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}