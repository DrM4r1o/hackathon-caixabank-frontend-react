import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, Button, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Notifications, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { logout } from '../stores/authStore';

const Navbar = ({ toggleTheme, isDarkMode }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>

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
                            onClick={() =>logout()}
                        >
                            <Logout />
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