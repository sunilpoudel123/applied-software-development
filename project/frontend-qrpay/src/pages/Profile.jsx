// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { QrCode, LogOut, User, Mail, Calendar, AlertCircle, Phone, Shield, CheckCircle, XCircle, Clock, UserCog } from 'lucide-react';
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
            console.log('Profile data:', data);
            setProfile(data.user || data);
        } catch (err) {
            console.error('Profile fetch error:', err);
            setError('Failed to load profile data');
            setProfile(user);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login', { replace: true });
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getFullName = () => {
        if (profile?.firstName || profile?.lastName) {
            return `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
        }
        return profile?.username || 'User';
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            ACTIVE: { color: 'green', icon: CheckCircle },
            INACTIVE: { color: 'red', icon: XCircle },
            PENDING: { color: 'yellow', icon: Clock }
        };

        const config = statusConfig[status] || statusConfig.ACTIVE;
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${config.color}-100 text-${config.color}-800`}>
                <Icon className="w-4 h-4 mr-1" />
                {status}
            </span>
        );
    };

    const getUserTypeBadge = (userType) => {
        const typeConfig = {
            ADMIN: { color: 'purple', label: 'Administrator' },
            USER: { color: 'blue', label: 'User' },
            MERCHANT: { color: 'orange', label: 'Merchant' }
        };

        const config = typeConfig[userType] || { color: 'gray', label: userType };

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${config.color}-100 text-${config.color}-800`}>
                <Shield className="w-4 h-4 mr-1" />
                {config.label}
            </span>
        );
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
            <div className="max-w-7xl mx-auto p-6">
                {/* Welcome Section */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold mb-2">
                                    Welcome back, {profile?.firstName || profile?.username || 'User'}!
                                </h1>
                                <p className="text-blue-100 text-lg">
                                    {profile?.userType === 'ADMIN' ? 'Administrator Dashboard' : 'User Dashboard'}
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <QrCode className="w-24 h-24 text-white opacity-20" />
                            </div>
                        </div>
                    </div>
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

                {loading ? (
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="ml-3 text-gray-600">Loading profile...</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Profile Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                                    {profile?.status && getStatusBadge(profile.status)}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Username */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <User className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-600">Username</p>
                                            <p className="text-lg font-semibold text-gray-900 truncate">
                                                {profile?.username || 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Full Name */}
                                    {(profile?.firstName || profile?.lastName) && (
                                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <User className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm text-gray-600">Full Name</p>
                                                <p className="text-lg font-semibold text-gray-900 truncate">
                                                    {getFullName()}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Email */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-600 flex items-center">
                                                Email
                                                {profile?.emailVerified ? (
                                                    <CheckCircle className="w-4 h-4 text-green-600 ml-1" title="Verified" />
                                                ) : (
                                                    <XCircle className="w-4 h-4 text-red-600 ml-1" title="Not Verified" />
                                                )}
                                            </p>
                                            <p className="text-lg font-semibold text-gray-900 truncate">
                                                {profile?.email || 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-600 flex items-center">
                                                Phone Number
                                                {profile?.phoneVerified ? (
                                                    <CheckCircle className="w-4 h-4 text-green-600 ml-1" title="Verified" />
                                                ) : profile?.phoneNumber ? (
                                                    <XCircle className="w-4 h-4 text-red-600 ml-1" title="Not Verified" />
                                                ) : null}
                                            </p>
                                            <p className="text-lg font-semibold text-gray-900 truncate">
                                                {profile?.phoneNumber || 'Not Provided'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Details */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* User ID */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-lg font-bold text-indigo-600">ID</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-600">User ID</p>
                                            <p className="text-xs font-mono text-gray-900 truncate">
                                                {profile?.id || 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* User Type */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <UserCog className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-600">Account Type</p>
                                            <div className="mt-1">
                                                {profile?.userType && getUserTypeBadge(profile.userType)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Auth Provider */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Shield className="w-6 h-6 text-cyan-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-600">Auth Provider</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {profile?.authProvider || 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Created At */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Calendar className="w-6 h-6 text-teal-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-600">Member Since</p>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {formatDate(profile?.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Last Login */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6 text-pink-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-600">Last Login</p>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {formatDate(profile?.lastLogin)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Updated At */}
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Calendar className="w-6 h-6 text-amber-600" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-gray-600">Last Updated</p>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {formatDate(profile?.updatedAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Additional Info */}
                        <div className="space-y-6">
                            {/* Verification Status */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Verification Status</h3>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <Mail className="w-5 h-5 text-gray-600" />
                                            <span className="text-sm font-medium text-gray-900">Email</span>
                                        </div>
                                        {profile?.emailVerified ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <Phone className="w-5 h-5 text-gray-600" />
                                            <span className="text-sm font-medium text-gray-900">Phone</span>
                                        </div>
                                        {profile?.phoneVerified ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <User className="w-5 h-5 text-gray-600" />
                                            <span className="text-sm font-medium text-gray-900">Account</span>
                                        </div>
                                        {profile?.active ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Roles & Permissions */}
                            {profile?.roles && profile.roles.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Roles & Permissions</h3>

                                    <div className="space-y-3">
                                        {profile.roles.map((role) => (
                                            <div key={role.id} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <Shield className="w-5 h-5 text-purple-600" />
                                                    <span className="font-semibold text-gray-900">
                                                        {role.roleName}
                                                    </span>
                                                </div>
                                                {role.description && (
                                                    <p className="text-sm text-gray-600 ml-7">
                                                        {role.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quick Stats */}
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                                <h3 className="text-xl font-bold mb-4">Account Summary</h3>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-100">Status</span>
                                        <span className="font-semibold">{profile?.status || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-100">Type</span>
                                        <span className="font-semibold">{profile?.userType || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-100">Active</span>
                                        <span className="font-semibold">{profile?.active ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}