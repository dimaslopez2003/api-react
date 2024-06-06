import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import logo from '../img/yo.png';

const Logo = styled('img')({
  width: '40px',
  height: '40px',
  marginRight: '20px',
});

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ width: '100%' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Logo src={logo} alt="Logo" />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CRUD App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
