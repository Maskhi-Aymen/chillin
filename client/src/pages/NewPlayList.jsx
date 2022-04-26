import * as React from 'react';
import { useState ,useEffect} from "react";
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {  styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import { MusicNote } from '@material-ui/icons';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#F4ACB7',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#F4ACB7',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#F4ACB7',
    },
    '&:hover fieldset': {
      borderColor: '#F4ACB7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#F4ACB7',
    },
  },
});
const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor: '#F4ACB7',
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));


export default function NewPlayList() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      fetch(`http://localhost:8000/song`).then(response =>
        response.json()
      )
        .then(dataM => {
          setIsLoaded(true)
          setData(dataM)
          console.log(dataM)
        })
        .catch(err => {
          console.log(err)
        })

    }
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post("http://localhost:8000/playlist", JSON.stringify(
      {
        'pl_name':data.get('title'),
        'songs': checked,
        'pl_imgurl': data.get('imgURL'),
      }
    ),{
       headers: {
         "Content-Type": "application/json",
         "Authorization": "Bearer "
       }
     })
     .then((json) => {
      alert(json.data)
      history.push('./playlists')
     })
     .catch((err) => console.log(err));
   };
  
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className="newPublication">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <h1 className="newUserTitle">New PlayList</h1>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, backgroundColor: 'transparent' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <CssTextField
                required
                id="title"
                name="title"
                label="Title"
                fullWidth
                autoComplete="given-name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                required
                id="imgURL"
                name="imgURL"
                label="Cover URL"
                fullWidth
                autoComplete="given-name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <List dense sx={{ width: '100%', bgcolor: 'transparent' }}>
                {data.map((value) => {
                  const labelId = `${value['id']}`;
                  return (
                    <ListItem
                      key={value['id']}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(value['id'])}
                          checked={checked.indexOf(value['id']) !== -1}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      }
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          <MusicNote className="sidebarIcon" />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={` ${value['name'] }`} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            <Grid item xs={12} md={6} margin='auto' sx={{ Border: '#FFCAD4 11px solid' }} >
              <CssButton
                type="submit"
                fullWidth
                variant="contained"
              >
                Submit
              </CssButton>
            </Grid>
          </Grid>
        </Paper>

      </Box>
    </div>
  );
}
/*
        <div className="addPublicationItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
*/
