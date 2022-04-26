import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import logo from '../../assets/images/logo2.png'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SwipeableTemporaryDrawer from '../components/menu.js'
import LabelBottomNavigation from './BoutonNavigation';
import NavbarNotification from './notification.js';
const theme = createTheme({
  status: {
    danger: '#F4ACB7',
  },
  palette: {
    primary: {
      main: '#4493f',
      darker: '#053e85',
    },
    neutral: {
      main: '#F4ACB7',
      contrastText: '#D8E2DC',
    },
  },
});

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);



  
  const isMatch =useMediaQuery(theme.breakpoints.down('md'))
  

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Box sx={{
      flexGrow: 1, opacity: '0.8', position: 'sticky', flex: 'auto', margin: 'auto', maxWidth: '19%', borderRadius: 22,
      top: 10, zIndex: 0
    }}><NavbarNotification /></Box>
  );

  return (
    <ThemeProvider theme={theme}>

      <Box sx={{
        flexGrow: 1, opacity: '0.8', position:'relative' , maxWidth: '99%',
        top: 10, zIndex: 1
      }}>{
        isMatch?<>
        <AppBar  sx={{ backgroundColor: '#F4ACB7' ,maxHeight:50}} >
        <Toolbar  sx={{ backgroundColor: '#F4ACB7' }}>
        <Box position='sticky' sx={{ flexGrow: 1 }}><img src={logo} width="150" height="35" style={ {filter: "drop-shadow(8px 8px 10px gray)contrast(200%) brightness(150%)"}} /></Box> 
        <NavbarNotification />
        </Toolbar>
  
                <Toolbar sx={{ backgroundColor: '#F4ACB7' }}>
                  <SwipeableTemporaryDrawer />   <LabelBottomNavigation />
      
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
                  </Box>
                  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      
                  </Box>
                </Toolbar>
              </AppBar></>
        :<></>
      }
        {isMatch? <></>:
        <AppBar position='sticky' sx={{  maxHeight:50, borderRadius: 22,backgroundColor:'transparent'}} >
          <Toolbar sx={{ backgroundColor: '#F4ACB7' , borderRadius: 5}}>
            <SwipeableTemporaryDrawer />

            {isMatch? <></>:<Box sx={{ flexGrow: 1,marginLeft:3 }}><img src={logo} width="150" height="35" style={ {filter: "drop-shadow(8px 8px 10px gray)contrast(200%) brightness(150%)"}} /></Box>}
            <LabelBottomNavigation />

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
             {isMatch? <></>:<NavbarNotification />} 
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>

            </Box>
          </Toolbar>
        </AppBar>}


      </Box>
    </ThemeProvider>
  );
}

/*<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>         <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
           
            </IconButton>*/