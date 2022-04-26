import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReportIcon from '@mui/icons-material/Report';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PublicationOption({pubId}) {

  const [reponse, setreponse] = React.useState('');
  const handleCloseA = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const [openA, setOpenA] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleAffiche = () => {
    setOpenA(false)
   setOpenAlert(true)
 };
 

  const user=localStorage.getItem('user');
  const addfav=()=>{
    axios.post("http://localhost:8000/favorite", JSON.stringify(
      {
        'author':user,
        'pub': pubId,
      }
    ),{
       headers: {
         "Content-Type": "application/json",
         "Authorization": "Bearer "
       }
     })
     .then((json) => {
      setreponse(json.data)
      handleClose()
      handleAffiche()

     })
     .catch((err) => console.log(err));
};
const addreport=()=>{
  axios.post("http://localhost:8000/reports", JSON.stringify(
    {
      'report_author':user,
      'report_pub': pubId,
      'report_message':document.getElementById('name').value
    }
  ),{
     headers: {
       "Content-Type": "application/json",
       "Authorization": "Bearer "
     }
   })
   .then((json) => {
    setreponse(json.data)
    handleClose()
    handleAffiche()
   })
   .catch((err) => console.log(err));
};
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
const report =(
  <div>
  
  
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Report</DialogTitle>
    <DialogContent>
      <DialogContentText>
      why are you going to report this post?
      </DialogContentText>
      <TextField
        id="name"
        label="Raison"
        type="text"
        rows={5}
        fullWidth
        required
        variant="standard"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={addreport}>Send</Button>
    </DialogActions>
  </Dialog>
</div>
)
  
  return (
    <div>
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
            <Typography sx={{ p: 2 }}>
              <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                aria-label="contacts"
              >
                <ListItem disablePadding> 
                  <ListItemButton onClick={addfav} >
                    <ListItemIcon>
                      <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add to Favorites" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleClickOpen}>
                    <ListItemIcon>
                      <ReportIcon />
                    </ListItemIcon>
                    <ListItemText  primary="Report the Post" />
                  </ListItemButton>
                </ListItem>
              </List>



            </Typography>
          </Popover>
        </div>
      )}
      
    </PopupState>
    {report}
    <Snackbar
          open={openAlert}
          autoHideDuration={4000}
          onClose={handleCloseA}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleCloseA} style={{ backgroundColor:"#F4ACB7"}}>
            {reponse}
          </Alert>
        </Snackbar>
    </div>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}