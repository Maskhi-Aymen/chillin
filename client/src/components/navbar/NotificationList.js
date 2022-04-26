import * as React from 'react';
import Typography from '@mui/material/Typography';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CloseIcon from '@mui/icons-material/Close'; 
import axios from 'axios';
import { Button } from '@mui/material';


export default function NotificationList({id,notification,isSeen,date,setdata}) {

    const deleteNotif = () => {
        axios.delete(`http://127.0.0.1:8000/notification/${id}`)
        setdata(id)
    };

    return (

        
            <ListItem >
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
                                {notification}

                            </Typography>
                            <Typography>
                                {date}</Typography>
                        </React.Fragment>
                    }
                />
                <ListItemAvatar><Divider variant="inset" component="li"  />
                    <Button  onClick={deleteNotif} >
                        <CloseIcon sx={{ color: '#F4ACB7' }} />
                    </Button>
                </ListItemAvatar>
            </ListItem>
           

    );
}

/**
 * const deleteNotif = (id) => {
        axios.delete(`http://127.0.0.1:8000/notification/${id}`)
    nbNotification=nbNotification-1;
    for (let i = 0; i < dataNot.length; i++) {
      if(dataNot[i].id==id){setdataNot(dataNot.slice(dataNot[i]))}
    }
      
    };
 */