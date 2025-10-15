// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Bell,
    Search,
    User,
    Settings,
    LogOut,
    ChevronDown,
    Menu,
    HelpCircle,
    CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onMenuClick }) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const notifications = [
        { id: 1, title: 'New payment received', time: '2 mins ago', unread: true },
        { id: 2, title: 'Transaction completed', time: '1 hour ago', unread: true },
        { id: 3, title: 'Monthly report ready', time: '3 hours ago', unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6">
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={onMenuClick}
            >
                <Menu className="h-6 w-6" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
                {/* Help Button */}
                <button
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hidden sm:block"
                    title="Help"
                >
                    <HelpCircle className="h-5 w-5" />
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setNotificationsOpen(!notificationsOpen);
                            setUserMenuOpen(false);
                        }}
                        className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                    </button>

                    {notificationsOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setNotificationsOpen(false)}
                            ></div>
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                                <div className="px-4 py-2 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                                                notification.unread ? 'bg-blue-50' : ''
                                            }`}
                                        >
                                            <div className="flex items-start">
                                                {notification.unread && (
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                                                )}
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {notification.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="px-4 py-2 border-t border-gray-200">
                                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* User Menu */}
                <div className="relative hidden sm:block">
                    <button
                        onClick={() => {
                            setUserMenuOpen(!userMenuOpen);
                            setNotificationsOpen(false);
                        }}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                    >
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                            {user?.fullName?.charAt(0) || 'U'}
                        </div>
                        <span className="text-sm font-medium text-gray-700 hidden md:block">
                            {user?.fullName?.split(' ')[0] || 'User'}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                    </button>

                    {userMenuOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setUserMenuOpen(false)}
                            ></div>
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <p className="text-sm font-medium text-gray-900">
                                        {user?.fullName || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {user?.email || 'user@example.com'}
                                    </p>
                                </div>

                                <Link
                                    to="/dashboard/settings"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    onClick={() => setUserMenuOpen(false)}
                                >
                                    <User className="w-4 h-4 mr-3 text-gray-400" />
                                    Profile
                                </Link>

                                <Link
                                    to="/dashboard/settings"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    onClick={() => setUserMenuOpen(false)}
                                >
                                    <Settings className="w-4 h-4 mr-3 text-gray-400" />
                                    Settings
                                </Link>

                                <Link
                                    to="/dashboard/transactions"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    onClick={() => setUserMenuOpen(false)}
                                >
                                    <CreditCard className="w-4 h-4 mr-3 text-gray-400" />
                                    Billing
                                </Link>

                                <hr className="my-1 border-gray-200" />

                                <button
                                    onClick={() => {
                                        setUserMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                >
                                    <LogOut className="w-4 h-4 mr-3" />
                                    Sign Out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}