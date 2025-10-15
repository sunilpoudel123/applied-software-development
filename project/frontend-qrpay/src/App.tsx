import React from 'react';
import './styles/globals.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PaymentProvider } from './context/PaymentContext';

// Pages
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Layout Components
import DashboardLayout from './components/layout/DashboardLayout';

function App() {
    return (
        <Router>
            <PaymentProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Dashboard Routes - Auth Disabled */}
                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>

                    {/* 404 Not Found */}
                    <Route path="/not-found" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/not-found" replace />} />
                </Routes>
            </PaymentProvider>
        </Router>
    );
}

export default App;