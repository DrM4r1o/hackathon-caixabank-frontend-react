// src/App.js

import React, { useState, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container, Alert } from '@mui/material';
import { lightTheme, darkTheme } from './theme'; // Import both themes
import { NavigationProvider } from './providers/NavigationContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import Analysis from './components/Analysis';
import Settings from './components/Settings';
import Footer from './components/Footer';
import SupportPage from './components/SupportPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import for route protection
import { authStore } from './stores/authStore'; // Import auth store for authentication state
import { useStore } from '@nanostores/react'; // Nanostores to track auth
import { alertStore, hideAlert } from './stores/alertStore';
import BudgetAlert from './components/BudgetAlert'; // Importar BudgetAlert

function App() {
    const auth = useStore(authStore);
    const alert = useStore(alertStore);
    const navigate = useNavigate();

    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setIsDarkMode(true);
        }
    }, []);

    useEffect(() => {
        if (!auth.isAuthenticated && window.location.pathname !== '/register') {
            navigate('/login');
            return;
        }
    }, [auth.isAuthenticated, navigate]);

    useEffect(() => {
        if (alert.showAlert) {
            setTimeout(() => {
                hideAlert();
            }, 10000);
        }
    }, [alert.showAlert]);

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline /> {/* Apply the correct baseline for the theme */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh', // Ensures footer is at the bottom
                }}
            >
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ flex: 1, mt: 4 }}>
                    <BudgetAlert /> {/* Mostrar BudgetAlert aquí */}
                    <NavigationProvider>
                            {/* Protected routes */}
                            <Route element={<ProtectedRoute isAuthenticated={auth.isAuthenticated} />}>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/transactions" element={<TransactionList />} />
                                <Route path="/analysis" element={<Analysis />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/support" element={<SupportPage />} />
                            </Route>

                            {/* Public routes */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                    </NavigationProvider>
                </Container>
                <Footer /> {/* Always stick footer to the bottom */}
            </Box>

            {alert.showAlert && (
                <Alert
                    severity={alert.severity}
                    sx={{ position: 'fixed', bottom: 16, left: 16, zIndex: 9999 }}
                    onClose={() => hideAlert()}
                >
                    {alert.alertMessage}
                </Alert>
            )}

        </ThemeProvider>
    );
}

export default App;
