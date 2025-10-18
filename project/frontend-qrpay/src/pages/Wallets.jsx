// src/pages/Wallets.jsx
import React, {useState, useEffect} from 'react';
import { Wallet, Plus, AlertCircle, CheckCircle, Search, ArrowUpDown, DollarSign, TrendingUp, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import api, {endpoints} from '../services/api';

export default function Wallets() {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [transactionLoading, setTransactionLoading] = useState(false);
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'walletName', direction: 'asc' });
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [transactionType, setTransactionType] = useState('CREDIT');
    const userId = localStorage.getItem('userId');

    const [formData, setFormData] = useState({
        walletName: '',
        currency: 'USD',
        initialBalance: '0',
    });

    const [transactionData, setTransactionData] = useState({
        amount: '',
        description: '',
        transactionRefId: '',
    });

    useEffect(() => {
        fetchWallets();
    }, []);

    const fetchWallets = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await api.get(`${endpoints.wallets}/${userId}`);
            console.log('API Response:', data);
            const walletsData = Array.isArray(data) ? data : (data.wallets || []);
            setWallets(walletsData);
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

    const handleTransactionInputChange = (e) => {
        setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
    };

    const handleCreateWallet = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        setError('');
        setCreateSuccess(false);

        try {
            await api.post(endpoints.wallets, {
                walletName: formData.walletName,
                currency: formData.currency,
                initialBalance: parseFloat(formData.initialBalance) || 0,
                userId: userId,
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

    const openTransactionModal = (wallet, type) => {
        setSelectedWallet(wallet);
        setTransactionType(type);
        setTransactionData({
            amount: '',
            description: '',
            transactionRefId: '',
        });
        setShowTransactionModal(true);
        setError('');
        setTransactionSuccess(false);
    };

    const handleTransaction = async (e) => {
        e.preventDefault();
        setTransactionLoading(true);
        setError('');
        setTransactionSuccess(false);

        try {
            const endpoint = transactionType === 'CREDIT' ? endpoints.credit : endpoints.debit;

            const response = await api.post(endpoint, {
                amount: parseFloat(transactionData.amount),
                description: transactionData.description,
                transactionType: transactionType,
                walletId: selectedWallet.id,
                transactionRefId: transactionData.transactionRefId || crypto.randomUUID(),
                userId: userId,
            });

            console.log('Transaction response:', response);
            setTransactionSuccess(true);
            await fetchWallets();

            setTimeout(() => {
                setShowTransactionModal(false);
                setTransactionSuccess(false);
                setTransactionData({ amount: '', description: '', transactionRefId: '' });
            }, 1500);

        } catch (err) {
            setError(err.message || `Failed to ${transactionType.toLowerCase()} wallet`);
        } finally {
            setTransactionLoading(false);
        }
    };

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });
    };

    // Filter and sort wallets
    const filteredAndSortedWallets = wallets
        .filter(wallet =>
            wallet.walletName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wallet.currency.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (typeof aValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            return sortConfig.direction === 'asc'
                ? aValue - bValue
                : bValue - aValue;
        });

    // Calculate totals by currency
    const totalsByCurrency = wallets.reduce((acc, wallet) => {
        acc[wallet.currency] = (acc[wallet.currency] || 0) + wallet.balance;
        return acc;
    }, {});

    return (
        <div className="max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallets Dashboard</h1>
                        <p className="text-gray-600">Manage and monitor your payment wallets</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Create Wallet</span>
                    </button>
                </div>

                {/* Stats Cards */}
                {wallets.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Wallets</p>
                                    <p className="text-2xl font-bold text-gray-900">{wallets.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Wallet className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Currencies</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {Object.keys(totalsByCurrency).length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Balance</p>
                                    <div className="space-y-1">
                                        {Object.entries(totalsByCurrency).map(([currency, total]) => (
                                            <p key={currency} className="text-lg font-bold text-gray-900">
                                                {currency} {total.toFixed(2)}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Error Alert */}
            {error && !showCreateModal && !showTransactionModal && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                </div>
            )}

            {/* Main Content */}
            {loading ? (
                <div className="flex items-center justify-center py-12 bg-white rounded-xl shadow-sm">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-3 text-gray-600">Loading wallets...</span>
                </div>
            ) : wallets.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
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
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Search Bar */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search wallets by name or currency..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <button
                                        onClick={() => handleSort('walletName')}
                                        className="flex items-center space-x-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                                    >
                                        <span>Wallet Name</span>
                                        <ArrowUpDown className="w-4 h-4" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <button
                                        onClick={() => handleSort('currency')}
                                        className="flex items-center space-x-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                                    >
                                        <span>Currency</span>
                                        <ArrowUpDown className="w-4 h-4" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <button
                                        onClick={() => handleSort('balance')}
                                        className="flex items-center space-x-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                                    >
                                        <span>Balance</span>
                                        <ArrowUpDown className="w-4 h-4" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Wallet ID
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredAndSortedWallets.map((wallet) => (
                                <tr key={wallet.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Wallet className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {wallet.walletName}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {wallet.currency}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-gray-900">
                                            {wallet.currency} {wallet.balance.toFixed(2)}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-gray-500 font-mono">
                                            {wallet.id}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => openTransactionModal(wallet, 'CREDIT')}
                                                className="flex items-center space-x-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm font-medium"
                                            >
                                                <ArrowDownCircle className="w-4 h-4" />
                                                <span>Credit</span>
                                            </button>
                                            <button
                                                onClick={() => openTransactionModal(wallet, 'DEBIT')}
                                                className="flex items-center space-x-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium"
                                            >
                                                <ArrowUpCircle className="w-4 h-4" />
                                                <span>Debit</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* No Results */}
                    {filteredAndSortedWallets.length === 0 && searchTerm && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No wallets found matching "{searchTerm}"</p>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Showing {filteredAndSortedWallets.length} of {wallets.length} wallet{wallets.length !== 1 ? 's' : ''}
                        </p>
                    </div>
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
                                className="text-gray-400 hover:text-gray-600 text-xl"
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
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
                            >
                                {createLoading ? 'Creating...' : 'Create Wallet'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Transaction Modal (Credit/Debit) */}
            {showTransactionModal && selectedWallet && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                {transactionType === 'CREDIT' ? (
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <ArrowDownCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                        <ArrowUpCircle className="w-6 h-6 text-red-600" />
                                    </div>
                                )}
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {transactionType === 'CREDIT' ? 'Credit' : 'Debit'} Wallet
                                </h2>
                            </div>
                            <button
                                onClick={() => {
                                    setShowTransactionModal(false);
                                    setError('');
                                    setTransactionSuccess(false);
                                }}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Wallet Info */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Wallet</p>
                            <p className="font-semibold text-gray-900">{selectedWallet.walletName}</p>
                            <p className="text-sm text-gray-600 mt-2">Current Balance</p>
                            <p className="font-semibold text-gray-900">
                                {selectedWallet.currency} {selectedWallet.balance.toFixed(2)}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        {transactionSuccess && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <p className="text-sm text-green-800">
                                    Transaction completed successfully!
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleTransaction} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        {selectedWallet.currency}
                                    </span>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={transactionData.amount}
                                        onChange={handleTransactionInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0.01"
                                        className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={transactionData.description}
                                    onChange={handleTransactionInputChange}
                                    placeholder="Enter transaction description"
                                    rows="3"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={transactionLoading}
                                className={`w-full py-3 rounded-lg font-semibold disabled:opacity-50 transition ${
                                    transactionType === 'CREDIT'
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-red-600 hover:bg-red-700 text-white'
                                }`}
                            >
                                {transactionLoading
                                    ? 'Processing...'
                                    : `${transactionType === 'CREDIT' ? 'Credit' : 'Debit'} ${selectedWallet.currency} ${transactionData.amount || '0.00'}`}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}