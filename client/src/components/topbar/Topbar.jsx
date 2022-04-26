import React from "react";
import logo from '../../assets/images/logo2.png'
import { useEffect,useState } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function Topbar() {
  const user=localStorage.getItem('user')
  const[isLoaded,setIsLoaded]=React.useState(false);
  const[datas,setdatas]=React.useState([]);
  useEffect(()=>{
    if(!isLoaded){
     fetch(`http://localhost:8000/getuser/${user}`).then(response=>
       response.json()
       )
     .then(data=>{
       setIsLoaded(true)
       setdatas(data)
       })
     .catch(err=>{
       console.log(err)
     })
    
   }
  })
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo"><img src={logo} width="150" height="35" style={ {filter: "drop-shadow(8px 8px 10px gray)contrast(200%) brightness(150%)"}} /></span>
        </div>
        <div className="topRight">
        <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
          <img src={datas["user_avatar"]} alt="" className="topAvatar" /></StyledBadge>
        </div>
      </div>
    </div>
  );
}
