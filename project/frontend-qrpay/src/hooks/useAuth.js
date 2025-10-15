import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Custom hook to access authentication context
 * Provides user data and auth methods throughout the app
 *
 * @returns {Object} Authentication state and methods
 * @throws {Error} If used outside AuthProvider
 *
 * @example
 * const { user, login, logout, isAuthenticated } = useAuth();
 *
 * // Login user
 * const handleLogin = async () => {
 *   const result = await login({ email, password });
 *   if (result.success) {
 *     navigate('/dashboard');
 *   }
 * };
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export default useAuth;