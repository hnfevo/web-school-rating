import React, { useState, useEffect } from 'react';
import GlobalStyles from './components/atoms/GlobalStyles';
import LoginPage from './components/pages/LoginPage';
import CreateAccountPage from './components/pages/CreateAccountPage';
import AdminDashboardPage from './components/pages/AdminDashboardPage';
import PublicLandingPage from './components/pages/PublicLandingPage';
import { authAPI } from './services/api';

export default function App() {
    const [currentPage, setCurrentPage] = useState('public');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check authentication
        setIsAuthenticated(authAPI.isAuthenticated());

        // Handle URL hash routing
        const hash = window.location.hash.slice(1); // Remove #
        if (hash === '/login') {
            setCurrentPage('login');
        } else if (hash === '/create') {
            setCurrentPage('create');
        }

        // Listen for hash changes
        const handleHashChange = () => {
            const newHash = window.location.hash.slice(1);
            if (newHash === '/login') {
                setCurrentPage('login');
            } else if (newHash === '/create') {
                setCurrentPage('create');
            } else if (newHash === '' || newHash === '/') {
                if (!authAPI.isAuthenticated()) {
                    setCurrentPage('public');
                }
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        setCurrentPage('dashboard');
    };

    const handleLogout = () => {
        authAPI.logout();
        setIsAuthenticated(false);
        setCurrentPage('public');
    };

    const renderPage = () => {
        if (isAuthenticated) {
            return <AdminDashboardPage onLogout={handleLogout} />;
        }
        switch (currentPage) {
            case 'login':
                return <LoginPage setPage={setCurrentPage} onLogin={handleLogin} />;
            case 'create':
                return <CreateAccountPage setPage={setCurrentPage} />;
            case 'public':
                return <PublicLandingPage setPage={setCurrentPage} />;
            default:
                return <PublicLandingPage setPage={setCurrentPage} />;
        }
    };

    return (
        <>
            <GlobalStyles />
            {renderPage()}
        </>
    );
}
