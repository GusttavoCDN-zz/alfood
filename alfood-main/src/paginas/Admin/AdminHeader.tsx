import { AppBar, Container, Toolbar, Typography, Link, Box, Button, Paper } from '@mui/material';
import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Link component={RouterLink} to="restaurants">
                <Button sx={{ my: 2, color: 'white' }}>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to="restaurants/new">
                <Button sx={{ my: 2, color: 'white' }}>Novo Restaurante</Button>
              </Link>
              <Link component={RouterLink} to="pratos">
                <Button sx={{ my: 2, color: 'white' }}>Pratos</Button>
              </Link>
              <Link component={RouterLink} to="pratos/new">
                <Button sx={{ my: 2, color: 'white' }}>Novo Prato</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default AdminHeader;
