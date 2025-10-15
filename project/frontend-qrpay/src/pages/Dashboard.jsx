// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import {
    DollarSign,
    TrendingUp,
    CreditCard,
    Users,
    QrCode,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Calendar,
    Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const [timeRange, setTimeRange] = useState('7d');

    const stats = [
        {
            title: 'Total Revenue',
            value: '$45,231.89',
            change: '+20.1%',
            trend: 'up',
            icon: DollarSign,
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            title: 'Transactions',
            value: '2,345',
            change: '+15.3%',
            trend: 'up',
            icon: CreditCard,
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600',
        },
        {
            title: 'Active Customers',
            value: '1,234',
            change: '+8.2%',
            trend: 'up',
            icon: Users,
            bgColor: 'bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            title: 'QR Scans',
            value: '3,456',
            change: '-2.4%',
            trend: 'down',
            icon: QrCode,
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-600',
        },
    ];

    const chartData = [
        { date: 'Mon', revenue: 4000 },
        { date: 'Tue', revenue: 3000 },
        { date: 'Wed', revenue: 5000 },
        { date: 'Thu', revenue: 4500 },
        { date: 'Fri', revenue: 6000 },
        { date: 'Sat', revenue: 5500 },
        { date: 'Sun', revenue: 7000 },
    ];

    const recentTransactions = [
        { id: 'TXN001', customer: 'John Doe', amount: '$125.00', status: 'completed', time: '2 mins ago' },
        { id: 'TXN002', customer: 'Jane Smith', amount: '$89.50', status: 'completed', time: '15 mins ago' },
        { id: 'TXN003', customer: 'Bob Johnson', amount: '$250.00', status: 'pending', time: '1 hour ago' },
        { id: 'TXN004', customer: 'Alice Brown', amount: '$175.25', status: 'completed', time: '2 hours ago' },
        { id: 'TXN005', customer: 'Charlie Wilson', amount: '$99.99', status: 'failed', time: '3 hours ago' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Welcome back! Here's what's happening with your payments today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                                <div className="flex items-end justify-between">
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <div className={`flex items-center space-x-1 text-sm font-semibold ${
                                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {stat.trend === 'up' ? (
                                            <ArrowUpRight className="w-4 h-4" />
                                        ) : (
                                            <ArrowDownRight className="w-4 h-4" />
                                        )}
                                        <span>{stat.change}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Revenue Chart */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-1">Revenue Overview</h2>
                                <p className="text-sm text-gray-600">Last 7 days performance</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <select
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="7d">Last 7 days</option>
                                    <option value="30d">Last 30 days</option>
                                    <option value="90d">Last 90 days</option>
                                </select>
                                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Download className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="date" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip />
                                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2">
                                <QrCode className="w-5 h-5" />
                                <span>Generate QR Code</span>
                            </button>
                            <button className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition flex items-center justify-center space-x-2">
                                <CreditCard className="w-5 h-5" />
                                <span>New Payment</span>
                            </button>
                            <button className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition flex items-center justify-center space-x-2">
                                <Download className="w-5 h-5" />
                                <span>Export Report</span>
                            </button>
                        </div>

                        {/* Payment Methods */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Methods</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Credit Card</span>
                                    <span className="text-sm font-semibold text-gray-900">65%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-sm text-gray-600">QR Code</span>
                                    <span className="text-sm font-semibold text-gray-900">25%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-sm text-gray-600">Bank Transfer</span>
                                    <span className="text-sm font-semibold text-gray-900">10%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                            View All
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Transaction ID</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Customer</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Time</th>
                            </tr>
                            </thead>
                            <tbody>
                            {recentTransactions.map((transaction) => (
                                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{transaction.id}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{transaction.customer}</td>
                                    <td className="py-4 px-4 text-sm font-semibold text-gray-900">{transaction.amount}</td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(transaction.status)}`}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-600">{transaction.time}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}