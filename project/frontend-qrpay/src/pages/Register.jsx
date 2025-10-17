// src/pages/Register.jsx
import React, { useState } from 'react';
import {QrCode, Mail, Lock, User, Building, AlertCircle, Phone} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        phoneNumber: '',
        businessName: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: '',
            });
        }
        if (generalError) {
            setGeneralError('');
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setErrors({});
        setGeneralError('');

        try {
            const result = await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                username: formData.email,
                phoneNumber: formData.phoneNumber,
                businessName: formData.businessName,
                password: formData.password,
            });

            if (result.success) {
                // Clear form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    username: '',
                    phoneNumber: '',
                    businessName: '',
                    password: '',
                    confirmPassword: '',
                });

                // Redirect to login page
                navigate('/login', { replace: true });
            } else {
                // Show registration error
                setGeneralError(result.error || 'Registration failed');
            }
        } catch (err) {
            setGeneralError('An error occurred during registration. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <QrCode className="w-10 h-10 text-blue-600" />
                        <span className="text-3xl font-bold text-gray-900">QRPay</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                    <p className="text-gray-600">Start accepting payments in minutes</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {generalError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{generalError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    First Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        required
                                    />
                                </div>
                                {errors.firstName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        required
                                    />
                                </div>
                                {errors.lastName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 123-4567"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                            </div>
                            {errors.phoneNumber && (
                                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Business Name
                            </label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    placeholder="Your Business LLC"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                                        errors.businessName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                />
                            </div>
                            {errors.businessName && (
                                <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                required
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mt-1"
                            />
                            <label className="ml-2 text-sm text-gray-600">
                                I agree to the{' '}
                                <button type="button" className="text-blue-600 hover:text-blue-700 font-semibold">
                                    Terms of Service
                                </button>{' '}
                                and{' '}
                                <button type="button" className="text-blue-600 hover:text-blue-700 font-semibold">
                                    Privacy Policy
                                </button>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Creating Account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Sign in instead
                        </button>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                        ← Back to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
}