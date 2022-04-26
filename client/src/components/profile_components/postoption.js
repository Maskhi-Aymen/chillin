import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useState } from 'react';


export default function PostOption({id,page}) {
  const [isDeleted,setisDeleted]=useState(false);
  const user=localStorage.getItem('user');
  const deletePub =  ()=>{
    if(page==='mypub'){
    if(!isDeleted){
    fetch(`http://127.0.0.1:8000/publication/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
   }).then((resp)=>resp.json()).then((data) => {
    if(data==='Deleted Successfully'){
    window.location.reload();
  }
   })}}
   else{
    
      fetch("http://localhost:8000/favorite",{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pub: id,
          author: user,
        }),
      }).then((resp)=>resp.json()).then((data) => {
      if(data==='Deleted Successfully'){
      window.location.reload();
    }
     })
   }
  } 
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton variant="contained" {...bindTrigger(popupState)}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Typography sx={{ p: 1 }}>
              <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                aria-label="contacts"
              >
                <ListItem disablePadding>
                  <ListItemButton onClick={deletePub}>
                    <ListItemIcon>
                      <DeleteForeverIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                  </ListItemButton>
                </ListItem>
              </List>



            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

