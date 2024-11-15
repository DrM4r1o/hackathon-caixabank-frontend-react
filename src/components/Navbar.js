import { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Notifications, Logout, Login, Person2 } from '@mui/icons-material';
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

    const renderLinks = () => {
        return links.map((link, index) => (
            <Link key={index} to={link.to}>{link.text}</Link>
        ));
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
                            '& a': {
                                color: 'inherit',
                                textDecoration: 'none',
                                padding: '0.5rem',
                                transition: 'background-color 0.3s ease',
                                borderRadius: '0.5rem',
                            },
                            '& a:hover': {
                                backgroundColor: 'primary.light',
                            },
                            '@media (width <= 725px)': {
                                display: 'none',
                            },
                        }}
                    >
                        {renderLinks()}
                    </Box>

                    {/* Navigation links */}
                    {/* Instructions:
                        - Implement navigation links for authenticated and unauthenticated users.
                        - If the user is authenticated, show links like "Dashboard", "Settings", and a "Logout" button.
                        - If the user is not authenticated, show "Login" and "Register" links. 
                        - Use the `Link` component from `react-router-dom`. */}

                    <Box
                        sx={{ display: 'flex' }}
                    >
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
                        <IconButton
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'primary.light',
                                borderRadius: '50%'
                            }}
                        >
                            <Person2 />
                        </IconButton>

                        {/* User avatar */}
                        {/* Instructions:
                            - Display the user's avatar if they are logged in.
                            - Use an Avatar component and display the user's email as a tooltip or alt text. */}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer 
                anchor="left" 
                open={drawerOpen} 
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '0 1rem 1rem 0',
                    }
                }}
            >
                <Box
                    className="column-links"
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        gap: '1rem', 
                        padding: '1rem',
                        width: '200px',
                        '& a': {
                            color: 'inherit',
                            textDecoration: 'none',
                            padding: '0.5rem',
                            transition: 'background-color 0.3s ease',
                            width: '100%',
                            textAlign: 'center',
                        },
                        '& a:hover': {
                            backgroundColor: 'primary.light',
                        },
                    }}
                >
                    {/* Drawer navigation links */}
                    {/* Instructions:
                        - Display navigation links inside the drawer.
                        - Links should be based on the user's authentication status.
                        - For example, show links like "Dashboard", "Transactions", "Settings" if authenticated.
                        - Use the `Link` component from `react-router-dom`. */}
                    {renderLinks()}
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;