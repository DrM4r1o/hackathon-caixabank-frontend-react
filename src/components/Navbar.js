import { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, Button, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Notifications, Logout, Login } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useStore } from '@nanostores/react'; 
import { authStore, logout } from '../stores/authStore';
import { useNavigation } from '../providers/NavigationContext';
import { allLinks } from '../constants/linkRoutes';

const Navbar = ({ toggleTheme, isDarkMode }) => {
    const auth = useStore(authStore);
    const navigate = useNavigation();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [links, setLinks] = useState([]);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    useEffect(() => {
        const authValue = auth.isAuthenticated ? "req" : "not";
        const selectedLinks = allLinks.filter(link => link.auth === authValue || !link.auth);

        setLinks(selectedLinks);
    }, [auth.isAuthenticated]);

    const renderAuthButton = () => {
        if (auth.isAuthenticated) {
            return <Logout />;
        }

        return (
            <Link to={"/login"}>
                <Login />
            </Link>
        );
    };

    return (
        <>
            <AppBar position="static"
                sx={{
                    borderRadius: 0,
                    color: 'primary.contrastText',
                }}
            >
                <Toolbar
                    sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '2rem',
                        }}
                    >
                        {links.map((link, index) => (
                            <Link key={index} to={link.to}>{link.text}</Link>
                        ))}
                    </Box>

                    {/* Navigation links */}
                    {/* Instructions:
                        - Implement navigation links for authenticated and unauthenticated users.
                        - If the user is authenticated, show links like "Dashboard", "Settings", and a "Logout" button.
                        - If the user is not authenticated, show "Login" and "Register" links. 
                        - Use the `Link` component from `react-router-dom`. */}

                    <Box>
                        <IconButton>
                            <Badge color="error" variant="dot">
                                <Notifications />
                            </Badge>
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                if (auth.isAuthenticated) {
                                    logout();
                                }
                            }}
                        >
                            {renderAuthButton()}
                        </IconButton>

                        {/* User avatar */}
                        {/* Instructions:
                            - Display the user's avatar if they are logged in.
                            - Use an Avatar component and display the user's email as a tooltip or alt text. */}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box>
                    {/* Drawer navigation links */}
                    {/* Instructions:
                        - Display navigation links inside the drawer.
                        - Links should be based on the user's authentication status.
                        - For example, show links like "Dashboard", "Transactions", "Settings" if authenticated.
                        - Use the `Link` component from `react-router-dom`. */}
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;