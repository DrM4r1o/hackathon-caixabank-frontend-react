import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { useNavigation } from '../providers/NavigationContext';
import { login, getUser } from '../stores/authStore';
import { authStore } from '../stores/authStore';
import { showAlert } from '../stores/alertStore';
import { defaultUser } from '../constants/defaultUsers';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Grid,
} from '@mui/material';

function LoginPage() {
    const auth = useStore(authStore);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showCredentials, setShowCredentials] = useState(false);

    const navigate = useNavigation();

    useEffect(() => {        
        if (auth.isAuthenticated) {
            showAlert('You are already logged in', 'info');
            navigate('/');
            return
        }
    }, [auth.isAuthenticated, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please complete all fields');
            return;
        }

        const existingUser = getUser(email);
        const stringDefaultCredentials = JSON.stringify(defaultUser);
        const stringUserCredentials = JSON.stringify({ email, password });
        const stringExistingUser = JSON.stringify({ email: existingUser.email, password: existingUser.password });
        
        if (stringExistingUser !== stringUserCredentials && stringDefaultCredentials !== stringUserCredentials) {
            setError('Invalid credentials');
            return;
        }
        
        login(existingUser);
        navigate('/');
    };

    const handleShowDefaultCredentials = () => {
        // Show default credentials in case the user requests it
        setEmail(defaultUser.email);
        setPassword(defaultUser.password);
        setShowCredentials(true);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </form>

            {showCredentials && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    <strong>Email:</strong> {defaultUser.email}<br />
                    <strong>Password:</strong> {defaultUser.password}
                </Alert>
            )}

            {error && (
                <>
                    <Alert severity="error" sx={{ mt: 2 }}>
                        <strong>Error:</strong> { error }<br />
                    </Alert>
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'center',
                            gap: 2,
                            mt: 4,
                            '& button': {
                                backgroundColor: 'transparent',
                                border: '1px solid #007EAE'
                            },
                            '& button:hover': {
                                backgroundColor: 'rgba(0, 126, 174, 0.04)',
                            }
                        }}
                    >
                        <Button
                            type="submit"
                            variant="outlined"
                            fullWidth
                            color="inherit"
                            onClick={() => {
                                navigate('/register')
                            }}
                        >
                            Register
                        </Button>
                        <Button
                            type="submit"
                            variant="outlined"
                            fullWidth
                            color="inherit"
                        >
                            Forgot Password
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default LoginPage;
