import * as React from 'react';
import { Link, useHistory } from "react-router-dom";
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SegmentIcon from '@mui/icons-material/Segment';
import av0 from '../../assets/images/avatar/avatar0.jpg'
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import PolicyIcon from '@mui/icons-material/Policy';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import menuicon from '../../assets/images/o.images/Asset_1icon_PCD.png';
import FlagIcon from '@mui/icons-material/Flag';
import { Typography } from '@mui/material';
import { useState } from 'react';


export default function Menu() {
  const history = useHistory();
  const id=localStorage.getItem('user')
  const [user,setuser]=useState([]);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const [loading, setLoading] = React.useState(false);
  useEffect(()=>{
      if(!loading){
       fetch(`http://localhost:8000/getuser/${id}`).then(response=>
         response.json()
         )
       .then(data=>{
         setLoading(true)
         setuser(data)
         })
       .catch(err=>{
         console.log(err)
       })
      
     }
  
  },[])


  var anchor = 'left';
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListItem button key='Home'>
        {(!loading)? (<img src={av0} width="200px" />):<img src={user['user_avatar']} width="200px" /> }
      </ListItem>
      <ListItem button key='Home'>
        {(!loading)? <></>:<Typography variant="h6" sx={{ marginLeft: "25px" }}>{user['user_name'] + ' ' + user['user_Lastname']}</Typography>}
      </ListItem>
      <List>
        <Link to={"/home"}>
          <ListItem button key='Home'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to={"/Profile"}>
          <ListItem button key='Profile'>
            <ListItemIcon>
              <AccountCircleSharpIcon />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItem>
        </Link>
        <Link to={"/account"}>
          <ListItem button key="My Account" >
            <ListItemIcon>
              <ManageAccountsSharpIcon />
            </ListItemIcon>
            <ListItemText primary="My Account" />
          </ListItem>
        </Link>
        <Link to={"/myobjective"}>
          <ListItem button key="My Goals" >
            <ListItemIcon>
              <FlagIcon />
            </ListItemIcon>
            <ListItemText primary="My Goals" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to={"/contact"}>
          <ListItem button key="Contact Us" >
            <ListItemIcon>
              <EmailSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
          </ListItem>
        </Link>
        <Link to={"/general-conditions"}>
        <ListItem button key="General Conditions" >
          <ListItemIcon>
            <SegmentIcon />
          </ListItemIcon>
          <ListItemText primary="General Conditions" />
        </ListItem>
        </Link>
        <Link to={"/privacy"}>
          <ListItem button key="Privacy Policy" >
            <ListItemIcon>
              <PolicyIcon />
            </ListItemIcon>
            <ListItemText primary="Privacy Policy" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem button key="Log Out" onClick={() => {
          localStorage.clear()
          history.push('../');
        }} >
          <ListItemIcon>
            <LogoutSharpIcon sx={{ color: '#F4ACB7' }} />
          </ListItemIcon>
          <ListItemText primary="Log Out" sx={{ color: '#F4ACB7' }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>

      <React.Fragment key={anchor}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 1 }} onClick={toggleDrawer(anchor, true)}
        >
          <img src={menuicon} className='navbaricon' />
        </IconButton>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer>
      </React.Fragment>

    </div>
  );
}
