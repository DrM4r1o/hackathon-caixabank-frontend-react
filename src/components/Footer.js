import React from 'react';
import { Box, Typography, Paper, IconButton, InputBase, Button } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box 
            component="footer"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px',
                padding: '1rem',
                gap: '20px',
                backgroundColor: 'primary.main',
                color: 'white',
                '& a': {
                    color: 'white',
                    textDecoration: 'none'
                }
            }}
        >
            {/* Search bar */}
            <Box>
                <Paper component="form">
                    <IconButton aria-label="search">
                        {/* Add the search icon here */}
                    </IconButton>
                    <InputBase placeholder="Find your branch..." />
                    <Button type="submit">Search</Button>
                </Paper>
            </Box>

            <Typography>
                © {new Date().getFullYear()} Personal Finance Assistant
            </Typography>

            {/* Social media icons */}
            {/* Instructions:
                - Add IconButtons for Facebook, Twitter, and Instagram.
                - Ensure each icon button links to the appropriate social media page.
                - Use the respective Material UI icons for Facebook, Twitter, and Instagram. */}
            <Box>
                {/* IconButton for Facebook */}
                {/* IconButton for Twitter */}
                {/* IconButton for Instagram */}
                <IconButton aria-label="facebook" href="https://www.facebook.com" target="_blank">
                    <Facebook />
                </IconButton>
                <IconButton aria-label="twitter" href="https://www.twitter.com" target="_blank">
                    <Twitter />
                </IconButton>
                <IconButton aria-label="instagram" href="https://www.instagram.com" target="_blank">
                    <Instagram />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Footer;
