import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
  const auth = useAuth();
  return ( 
    <AppBar sx={{bgcolor: "transparent", position: "static", boxShadow: "none"}}>
      <Toolbar sx={{display: "flex"}}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#64f3d5"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <NavigationLink
                bg="#64f3d5"
                textColor="black"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#64f3d5"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#64f3d5"
                textColor="black"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Header;