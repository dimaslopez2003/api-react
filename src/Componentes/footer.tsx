import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const FooterBar = styled(AppBar)({
  top: 'auto',
  bottom: 0,
  width: '100%',
});

const Footer: React.FC = () => {
  return (
    <FooterBar position="fixed">
      <Toolbar>
        <Typography variant="body1" color="inherit" align="center" sx={{ flexGrow: 1 }}>
          © 2024 Dimas Arturo López Montalvo.
        </Typography>
      </Toolbar>
    </FooterBar>
  );
};

export default Footer;
