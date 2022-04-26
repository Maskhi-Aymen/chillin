import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import notificationicon from '../../assets/images/o.images/Asset_7icon_PCD.png';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useEffect, useState } from 'react';
import NotificationList from './NotificationList';
import axios from 'axios';



export default function PopoverPopupState() {
  const [dataNot, setdataNot] = useState([]);
  const user = localStorage.getItem('user');
  const [isLoaded, setIsLoaded] = useState(false);
  let nbNotification = dataNot.length;

  useEffect(() => {
    if (!isLoaded) {
      fetch(`http://localhost:8000/notification/${user}`).then(response =>
        response.json()
      )
        .then(dataS => {
          setIsLoaded(true)
          setdataNot(dataS)
        })
        .catch(err => {
          console.log(err)
        })
      
    }
  },[])
  const deleteNotif = (id) => {

    nbNotification = nbNotification - 1;
    for (let i = 0; i < dataNot.length; i++) {
      if (dataNot[i].id == id) { setdataNot(dataNot.splice(dataNot[i], dataNot.length-1)) }
    }

  };

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton variant="contained" {...bindTrigger(popupState)}>
            <IconButton
              size="large"
              aria-label="show new notifications"
              color="inherit"
            >
              <Badge badgeContent={nbNotification} color="error"  >
                <img src={notificationicon} className='notification-icon' />
              </Badge>
            </IconButton>
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >


            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 }, 
              }}
              subheader={<li />}
            >

              {isLoaded && nbNotification!=0 ? (<>
              {dataNot.filter((val) => {
                return val.user;
              }).map((val, key) => {
                return (<div key={val.pub_id} >
                  <NotificationList notification={val.notification} date={val.date} id={val.id} isSeen={val.is_seen} setdata={i => deleteNotif(i)} />
                </div>)
              })}
           
           </>): <ListItem >
                <ListItemAvatar>
                    <NotificationsNoneIcon />
                </ListItemAvatar>

                <ListItemText
                    primary="Chillin'"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                No New Notification 

                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>}
           
           
            </List>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

/**
 * 
 */