import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar({ keycloak }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          🛡️ Secure Library
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/" >   Home  </Button>
          <Button color="inherit" component={Link} to="/books">    Books   </Button>
          <Button color="inherit" variant="outlined" sx={{ ml: 2, color: '#e74c3c' }} onClick={() => keycloak.logout()}>
            Logout ({keycloak.tokenParsed.preferred_username})
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;