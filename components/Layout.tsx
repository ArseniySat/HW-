// src/components/Layout.tsx — корневой маршрут с навигацией и Outlet
import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';

const Layout: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              <Button color="inherit">Главная</Button>
            </Link>
            <NavLink
              to="/promo"
              style={({ isActive }) => ({
                color: isActive ? '#ffeb3b' : 'white',
                textDecoration: 'none',
              })}
            >
              <Button color="inherit">Промокод</Button>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
