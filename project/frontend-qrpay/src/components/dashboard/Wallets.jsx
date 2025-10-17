// src/pages/Wallets.jsx
import React, { useState, useEffect } from 'react';
import { Wallet, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import api from '../../services/api';

export default function Wallets() {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);

    const [formData, setFormData] = useState({
        walletName: '',
        currency: 'USD',
        initialBalance: '0',
    });

    useEffect(() => {
        fetchWallets();
    }, []);

    const fetchWallets = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await api.get('/wallets');
            setWallets(data.wallets || []);
        } catch (err) {
            console.error('Wallets fetch error:', err);
            setError('Failed to load wallets');
            setWallets([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateWallet = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        setError('');
        setCreateSuccess(false);

        try {
            await api.post('/wallets', {
                walletName: formData.walletName,
                currency: formData.currency,
                initialBalance: parseFloat(formData.initialBalance) || 0
            });

            setCreateSuccess(true);
            setFormData({ walletName: '', currency: 'USD', initialBalance: '0' });
            await fetchWallets();

            setTimeout(() => {
                setShowCreateModal(false);
                setCreateSuccess(false);
            }, 1500);

        } catch (err) {
            setError(err.message || 'Failed to create wallet');
        } finally {
            setCreateLoading(false);
        }
    };

    return (
        <div className="max-w-6xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallets</h1>
                    <p className="text-gray-600">Manage your payment wallets</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus className="w-5 h-5" />
                    <span>Create Wallet</span>
                </button>
            </div>

            {/* Error Alert */}
            {error && !showCreateModal && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                </div>
            )}

            {/* Wallets List */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-3 text-gray-600">Loading wallets...</span>
                </div>
            ) : wallets.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No wallets yet</h3>
                    <p className="text-gray-600 mb-6">Create your first wallet to get started</p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Create Wallet</span>
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wallets.map((wallet) => (
                        <div key={wallet.id} className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Wallet className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{wallet.walletName}</h3>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Balance</span>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {wallet.currency} {wallet.balance.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Currency</span>
                                    <span className="text-sm font-semibold text-gray-900">{wallet.currency}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Wallet Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Create New Wallet</h2>
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setError('');
                                    setCreateSuccess(false);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        {createSuccess && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <p className="text-sm text-green-800">Wallet created successfully!</p>
                            </div>
                        )}

                        <form onSubmit={handleCreateWallet} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Wallet Name
                                </label>
                                <input
                                    type="text"
                                    name="walletName"
                                    value={formData.walletName}
                                    onChange={handleInputChange}
                                    placeholder="My Wallet"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Currency
                                </label>
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="USD">USD - US Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="GBP">GBP - British Pound</option>
                                    <option value="INR">INR - Indian Rupee</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Initial Balance
                                </label>
                                <input
                                    type="number"
                                    name="initialBalance"
                                    value={formData.initialBalance}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={createLoading}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                            >
                                {createLoading ? 'Creating...' : 'Create Wallet'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}