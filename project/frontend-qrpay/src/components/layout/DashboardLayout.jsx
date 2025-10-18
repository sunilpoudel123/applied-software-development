// src/components/layout/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    CreditCard,
    QrCode,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    User,
    ChevronDown,
    Wallet,
    TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api, { endpoints } from '../../services/api';

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const data = await api.get(endpoints.userProfile);
            setProfile(data.user || data);
        } catch (err) {
            console.error('Profile fetch error:', err);
            // Use auth context user as fallback
            setProfile(user);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const navItems = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            name: 'Wallets',
            path: '/dashboard/wallets',
            icon: Wallet,
        },
        {
            name: 'Transactions',
            path: '/dashboard/wallet-transactions',
            icon: CreditCard,
        },
        {
            name: 'QR Scanner',
            path: '/dashboard/qr-scanner',
            icon: QrCode,
        },
    ];

    const isActive = (path) => {
        if (path === '/dashboard') {
            return location.pathname === '/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    // Get display name from profile
    const getDisplayName = () => {
        if (!profile) return 'User';

        if (profile.firstName || profile.lastName) {
            return `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
        }

        return profile.username || 'User';
    };

    // Get display email
    const getDisplayEmail = () => {
        return profile?.email || user?.email || 'user@example.com';
    };

    // Get initials for avatar
    const getInitials = () => {
        const name = getDisplayName();
        const words = name.split(' ');
        if (words.length >= 2) {
            return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
        }
        return name.charAt(0).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar for Desktop */}
            <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
                    {/* Logo */}
                    <div className="flex h-16 items-center px-6 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <QrCode className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">QRPay</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-3 py-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition ${
                                        active
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
                                        active ? 'text-blue-600' : 'text-gray-400'
                                    }`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Info */}
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                    {getInitials()}
                                </div>
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {getDisplayName()}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {getDisplayEmail()}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="lg:hidden">
                    <div className="fixed inset-0 z-40 flex">
                        {/* Overlay */}
                        <div
                            className="fixed inset-0 bg-gray-600 bg-opacity-75"
                            onClick={() => setSidebarOpen(false)}
                        ></div>

                        {/* Sidebar */}
                        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                            <div className="absolute top-0 right-0 -mr-12 pt-2">
                                <button
                                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <X className="h-6 w-6 text-white" />
                                </button>
                            </div>

                            {/* Logo */}
                            <div className="flex h-16 items-center px-6 border-b border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <QrCode className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-xl font-bold text-gray-900">QRPay</span>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="flex-1 space-y-1 px-3 py-4">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.path);
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition ${
                                                active
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                        >
                                            <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
                                                active ? 'text-blue-600' : 'text-gray-400'
                                            }`} />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* User Info Mobile */}
                            <div className="border-t border-gray-200 p-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                            {getInitials()}
                                        </div>
                                    </div>
                                    <div className="ml-3 flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {getDisplayName()}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {getDisplayEmail()}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Top Navbar */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6">
                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Page Title - Shows on larger screens */}
                    <div className="flex-1 hidden sm:block">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {navItems.find(item => isActive(item.path))?.name || 'Dashboard'}
                        </h2>
                    </div>

                    {/* Search Bar - Hidden on small screens */}
                    <div className="hidden md:block flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        {/* Notifications */}
                        <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User Menu */}
                        <div className="relative hidden sm:block">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                                    {getInitials()}
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden md:block">
                                    {getDisplayName().split(' ')[0]}
                                </span>
                                <ChevronDown className="w-4 h-4 text-gray-600" />
                            </button>

                            {userMenuOpen && (
                                <>
                                    {/* Overlay for closing menu */}
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setUserMenuOpen(false)}
                                    ></div>

                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                                        {/* User Info in Dropdown */}
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <p className="text-sm font-semibold text-gray-900 truncate">
                                                {getDisplayName()}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {getDisplayEmail()}
                                            </p>
                                        </div>

                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <User className="w-4 h-4 inline mr-2" />
                                            View Profile
                                        </Link>
                                        <Link
                                            to="/dashboard/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <Settings className="w-4 h-4 inline mr-2" />
                                            Settings
                                        </Link>
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                                        >
                                            <LogOut className="w-4 h-4 inline mr-2" />
                                            Sign Out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}