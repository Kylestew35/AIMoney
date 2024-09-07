// components/Header.js
"use client"
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '../public/1.jpg';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'gold' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Image src={logo} alt="AIMoney Logo" width={40} height={40} />
          <Typography variant="h6" component="div" sx={{ ml: 2, color: 'black' }}>
            AIMoney
          </Typography>
        </Box>
        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link href="/" passHref>
                  <Button sx={{ color: 'black' }}>Home</Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/dashboard" passHref>
                  <Button sx={{ color: 'black' }}>Dashboard</Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/login" passHref>
                  <Button sx={{ color: 'black' }}>Log In</Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/signup" passHref>
                  <Button sx={{ color: 'black' }}>Sign Up</Button>
                </Link>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Link href="/" passHref>
              <Button sx={{ color: 'black' }}>Home</Button>
            </Link>
            <Link href="/dashboard" passHref>
              <Button sx={{ color: 'black' }}>Dashboard</Button>
            </Link>
          </Box>
        )}
        {!isMobile && (
          <Box display="flex" alignItems="center">
            <Link href="/login" passHref>
              <Button sx={{ color: 'black' }}>Log In</Button>
            </Link>
            <Link href="/signup" passHref>
              <Button sx={{ color: 'black' }}>Sign Up</Button>
            </Link>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
