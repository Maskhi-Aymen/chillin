import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import av1 from '../../assets/images/avatar/avatar1.png';
import av2 from '../../assets/images/avatar/avatar2.png';
import av3 from '../../assets/images/avatar/avatar3.png';
import av4 from '../../assets/images/avatar/avatar4.png';
import av0 from '../../assets/images/avatar/avatar0.jpg';
import av5 from '../../assets/images/avatar/avatar5.png';
import av6 from '../../assets/images/avatar/avatar6.png';
import av7 from '../../assets/images/avatar/avatar7.png';
import av8 from '../../assets/images/avatar/avatar8.png';
import av9 from '../../assets/images/avatar/avatar9.png';
import av10 from '../../assets/images/avatar/avatar10.png';
import av11 from '../../assets/images/avatar/avatar11.png';
import av12 from '../../assets/images/avatar/avatar12.png';
import { alpha, styled } from '@mui/material/styles';

const emails = [av0,av1,av2,av3,av4,av5,av6,av7,av8,av10,av9,av11,av12]; 
const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  color:'#ffff',
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>choose one</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <img src={email} width="200" height="200" ></img>
            </ListItemAvatar>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function SelectAvatar({setavatar,oldavatar}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState (oldavatar);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    setavatar(value);

  };

  return (
    <div>
      <Typography variant="subtitle1" component="div" >
        <img src={selectedValue} className="registration-image" ></img> 
      </Typography>
      <br />
      <CssButton variant="outlined" onClick={handleClickOpen}sx={{margin:30 }}>
      choose your avatar
      </CssButton>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
