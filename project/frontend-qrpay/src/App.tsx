import React from 'react';
import './styles/globals.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import DashboardLayout from './components/layout/DashboardLayout';
import {AuthProvider} from "./context/AuthContext";
import Wallets from "./pages/Wallets";
import QRScanner from "./pages/QRScanner";
import WalletTransactions from "./pages/WalletTransactions";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>

                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>

                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard/wallets" element={<Wallets />} />
                    </Route>

                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard/qr-scanner" element={< QRScanner />} />
                    </Route>

                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard/wallet-transactions" element={<WalletTransactions />} />
                    </Route>

                    <Route path="/not-found" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/not-found" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;