// src/pages/WalletTransactions.jsx
import React, {useState, useEffect} from 'react';
import { Receipt, AlertCircle, Search, ArrowUpDown, ArrowUpCircle, ArrowDownCircle, Filter, Calendar, DollarSign } from 'lucide-react';
import api, {endpoints} from '../services/api';

export default function WalletTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
    const [filterType, setFilterType] = useState('ALL');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await api.get(`${endpoints.walletTransactionsByUser}/${userId}`);
            console.log('Transactions Response:', data);
            const transactionsData = Array.isArray(data) ? data : (data.transactions || []);
            setTransactions(transactionsData);
        } catch (err) {
            console.error('Transactions fetch error:', err);
            setError('Failed to load transactions');
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filter and sort transactions
    const filteredAndSortedTransactions = transactions
        .filter(transaction => {
            const matchesSearch =
                transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.transactionRefId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = filterType === 'ALL' || transaction.transactionType === filterType;
            const matchesStatus = filterStatus === 'ALL' || transaction.status === filterStatus;

            return matchesSearch && matchesType && matchesStatus;
        })
        .sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (sortConfig.key === 'timestamp') {
                return sortConfig.direction === 'asc'
                    ? new Date(aValue) - new Date(bValue)
                    : new Date(bValue) - new Date(aValue);
            }

            if (typeof aValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            return sortConfig.direction === 'asc'
                ? aValue - bValue
                : bValue - aValue;
        });

    // Calculate statistics
    const stats = transactions.reduce((acc, transaction) => {
        if (transaction.transactionType === 'CREDIT') {
            acc.totalCredit += transaction.amount;
            acc.creditCount++;
        } else if (transaction.transactionType === 'DEBIT') {
            acc.totalDebit += transaction.amount;
            acc.debitCount++;
        }
        return acc;
    }, { totalCredit: 0, totalDebit: 0, creditCount: 0, debitCount: 0 });

    return (
        <div className="max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet Transactions</h1>
                        <p className="text-gray-600">View and manage your transaction history</p>
                    </div>
                    <button
                        onClick={fetchTransactions}
                        className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                    >
                        <Receipt className="w-5 h-5" />
                        <span>Refresh</span>
                    </button>
                </div>

                {/* Stats Cards */}
                {transactions.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
                                    <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Receipt className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Credits</p>
                                    <p className="text-2xl font-bold text-green-600">${stats.totalCredit.toFixed(2)}</p>
                                    <p className="text-xs text-gray-500 mt-1">{stats.creditCount} transactions</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <ArrowDownCircle className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Debits</p>
                                    <p className="text-2xl font-bold text-red-600">${stats.totalDebit.toFixed(2)}</p>
                                    <p className="text-xs text-gray-500 mt-1">{stats.debitCount} transactions</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <ArrowUpCircle className="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Net Amount</p>
                                    <p className={`text-2xl font-bold ${stats.totalCredit - stats.totalDebit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        ${Math.abs(stats.totalCredit - stats.totalDebit).toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {stats.totalCredit - stats.totalDebit >= 0 ? 'Positive' : 'Negative'}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Error Alert */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                </div>
            )}

            {/* Main Content */}
            {loading ? (
                <div className="flex items-center justify-center py-12 bg-white rounded-xl shadow-sm">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-3 text-gray-600">Loading transactions...</span>
                </div>
            ) : transactions.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions yet</h3>
                    <p className="text-gray-600 mb-6">Your transaction history will appear here</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Filters and Search */}
                    <div className="p-4 border-b border-gray-200 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by description, transaction ID, or reference ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center space-x-2">
                                <Filter className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Filters:</span>
                            </div>

                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="ALL">All Types</option>
                                <option value="CREDIT">Credit Only</option>
                                <option value="DEBIT">Debit Only</option>
                            </select>

                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="ALL">All Status</option>
                                <option value="SUCCESS">Success</option>
                                <option value="PENDING">Pending</option>
                                <option value="FAILED">Failed</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <button
                                        onClick={() => handleSort('timestamp')}
                                        className="flex items-center space-x-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        <span>Date & Time</span>
                                        <ArrowUpDown className="w-4 h-4" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <button
                                        onClick={() => handleSort('transactionType')}
                                        className="flex items-center space-x-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                                    >
                                        <span>Type</span>
                                        <ArrowUpDown className="w-4 h-4" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <button
                                        onClick={() => handleSort('description')}
                                        className="flex items-center space-x-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                                    >
                                        <span>Description</span>
                                        <ArrowUpDown className="w-4 h-4" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left">
                                    <button
                                        onClick={() => handleSort('amount')}
                                        className="flex items-center space-x-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                                    >
                                        <span>Amount</span>
                                        <ArrowUpDown className="w-4 h-4" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Reference ID
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredAndSortedTransactions.map((transaction) => (
                                <tr key={transaction.transactionId || Math.random()} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Calendar className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {transaction.timestamp ? formatDate(transaction.timestamp) : '-'}
                                                </p>
                                                <p className="text-xs text-gray-500 font-mono">
                                                    {transaction.transactionId ? `${transaction.transactionId.slice(0, 8)}...` : '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        {transaction.transactionType === 'CREDIT' ? (
                                            <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                    <ArrowDownCircle className="w-4 h-4 text-green-600" />
                                                </div>
                                                <span className="text-sm font-medium text-green-700">Credit</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                                    <ArrowUpCircle className="w-4 h-4 text-red-600" />
                                                </div>
                                                <span className="text-sm font-medium text-red-700">Debit</span>
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-900 max-w-xs truncate">
                                            {transaction.description || '-'}
                                        </p>
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className={`text-sm font-semibold ${
                                            transaction.transactionType === 'CREDIT' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {transaction.transactionType === 'CREDIT' ? '+' : '-'}${transaction.amount?.toFixed(2) || '0.00'}
                                        </p>
                                    </td>

                                    <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            transaction.status === 'SUCCESS'
                ? 'bg-green-100 text-green-800'
                : transaction.status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
        }`}>
          {transaction.status || '-'}
        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="text-xs text-gray-500 font-mono">
                                            {transaction.transactionRefId ? `${transaction.transactionRefId.slice(0, 13)}...` : '-'}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* No Results */}
                    {filteredAndSortedTransactions.length === 0 && (searchTerm || filterType !== 'ALL' || filterStatus !== 'ALL') && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No transactions found matching your filters</p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilterType('ALL');
                                    setFilterStatus('ALL');
                                }}
                                className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Showing {filteredAndSortedTransactions.length} of {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}